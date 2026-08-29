// Pixel Bender kernel "QuaternionJulia" (translated using pb2zig)
const std = @import("std");

pub const kernel = struct {
    // constants
    const BOUNDING_RADIUS_2: f32 = 3.0;
    const ESCAPE_THRESHOLD: f32 = 10.0;
    const DEL: f32 = 0.0001;
    const EPSILON: f32 = 0.001;

    // kernel information
    pub const namespace = "com.subblue.filters";
    pub const vendor = "Tom Beddard";
    pub const version = 1;
    pub const description = "Quaternion Julia Ray Tracer";
    pub const parameters = .{
        .antialiasing = .{
            .type = bool,
            .defaultValue = false,
            .description = "Average 4 sample rays per pixel.",
        },
        .ambientLight = .{
            .type = f32,
            .minValue = 0.0,
            .maxValue = 1.0,
            .defaultValue = 0.64,
        },
        .ambientOcclusion = .{
            .type = f32,
            .minValue = 0.0,
            .maxValue = 3.0,
            .defaultValue = 1.3,
        },
        .shadows = .{
            .type = f32,
            .minValue = 0.0,
            .maxValue = 1.0,
            .defaultValue = 0.0,
        },
        .mu = .{
            .type = @Vector(4, f32),
            .minValue = .{
                -2.1,
                -3.0,
                -3.0,
                -1.5,
            },
            .maxValue = .{ 2.1, 3.0, 3.0, 1.5 },
            .defaultValue = .{
                -0.04,
                0.0,
                0.72,
                0.0,
            },
        },
        .camera = .{
            .type = @Vector(4, f32),
            .minValue = .{
                -180.0,
                -180.0,
                -180.0,
                0.0,
            },
            .maxValue = .{
                180.0,
                180.0,
                180.0,
                20.0,
            },
            .defaultValue = .{
                -30.0,
                0.0,
                -20.0,
                3.0,
            },
        },
        .light = .{
            .type = @Vector(3, f32),
            .minValue = .{ -10.0, -10.0, -10.0 },
            .maxValue = .{ 10.0, 10.0, 10.0 },
            .defaultValue = .{ 2.0, 2.0, 2.0 },
        },
        .background = .{
            .type = @Vector(3, f32),
            .minValue = .{ 0.0, 0.0, 0.0 },
            .maxValue = .{ 1.0, 1.0, 1.0 },
            .defaultValue = .{ 0.3, 0.33, 0.35 },
            .aeUIControl = "aeColor",
        },
        .backgroundTransparency = .{
            .type = f32,
            .minValue = 0.0,
            .maxValue = 1.0,
            .defaultValue = 1.0,
            .description = "Background transparency.",
        },
        .color = .{
            .type = @Vector(3, f32),
            .minValue = .{ 0.0, 0.0, 0.0 },
            .maxValue = .{ 1.0, 1.0, 1.0 },
            .defaultValue = .{ 0.63, 0.08, 0.0 },
            .aeUIControl = "aeColor",
        },
        .colorSpread = .{
            .type = f32,
            .minValue = 0.0,
            .maxValue = 1.0,
            .defaultValue = 0.13,
        },
        .specularity = .{
            .type = f32,
            .minValue = 0.0,
            .maxValue = 1.0,
            .defaultValue = 0.5,
            .description = "specularity",
        },
        .specularExponent = .{
            .type = f32,
            .minValue = 0.1,
            .maxValue = 50.0,
            .defaultValue = 7.0,
            .description = "shininess",
        },
        .maxIterations = .{
            .type = i32,
            .minValue = 2,
            .maxValue = 14,
            .defaultValue = 8,
        },
        .size = .{
            .type = @Vector(2, i32),
            .minValue = .{ 100, 100 },
            .maxValue = .{ 2048, 2048 },
            .defaultValue = .{ 600, 400 },
        },
    };
    pub const inputImages = .{};
    pub const outputImages = .{
        .dst = .{ .channels = 4 },
    };

    // generic kernel instance type
    fn Instance(comptime InputStruct: type, comptime OutputStruct: type, comptime ParameterStruct: type) type {
        return struct {
            params: ParameterStruct,
            input: InputStruct,
            output: OutputStruct,
            outputCoord: @Vector(2, f32) = @splat(0.0),

            // output pixel
            dst: @Vector(4, f32) = undefined,

            // dependent variables
            aspectRatio: f32 = undefined,
            sampleStep: f32 = undefined,
            sampleContribution: f32 = undefined,
            eye: @Vector(3, f32) = undefined,
            lightSource: @Vector(3, f32) = undefined,
            viewRotation: [3]@Vector(3, f32) = undefined,
            viewRotationX: [3]@Vector(3, f32) = undefined,
            viewRotationY: [3]@Vector(3, f32) = undefined,
            viewRotationZ: [3]@Vector(3, f32) = undefined,

            // functions defined in kernel
            fn quatMult(q1: @Vector(4, f32), q2: @Vector(4, f32)) @Vector(4, f32) {
                var r: @Vector(4, f32) = undefined;
                r[0] = q1[0] * q2[0] - q1[1] * q2[1] - q1[2] * q2[2] - q1[3] * q2[3];
                r[1] = q1[0] * q2[1] + q1[1] * q2[0] + q1[2] * q2[3] - q1[3] * q2[2];
                r[2] = q1[0] * q2[2] - q1[1] * q2[3] + q1[2] * q2[0] - q1[3] * q2[1];
                r[3] = q1[0] * q2[3] + q1[1] * q2[2] - q1[2] * q2[1] - q1[3] * q2[0];
                return r;
            }

            fn quatSq(q: @Vector(4, f32)) @Vector(4, f32) {
                var r: @Vector(4, f32) = undefined;
                r[0] = q[0] * q[0] - q[1] * q[1] - q[2] * q[2] - q[3] * q[3];
                r[1] = 2.0 * q[0] * q[1];
                r[2] = 2.0 * q[0] * q[2];
                r[3] = 2.0 * q[0] * q[3];
                return r;
            }

            fn iterateIntersect(q: *@Vector(4, f32), qp: *@Vector(4, f32), c: @Vector(4, f32), maxIterations: i32) void {
                {
                    var i: i32 = 0;
                    while (i < maxIterations) {
                        qp.* = @as(@Vector(4, f32), @splat(2.0)) * quatMult(q.*, qp.*);
                        q.* = quatSq(q.*) + c;
                        if (dot(q.*, q.*) > ESCAPE_THRESHOLD) break;
                        i += 1;
                    }
                }
            }

            fn normEstimate(self: *@This(), p: @Vector(3, f32), c: @Vector(4, f32)) @Vector(3, f32) {
                const maxIterations = self.params.maxIterations;
                var N: @Vector(3, f32) = undefined;
                const qP: @Vector(4, f32) = .{
                    p[0],
                    p[1],
                    p[2],
                    0.0,
                };
                var gradX: f32 = undefined;
                var gradY: f32 = undefined;
                var gradZ: f32 = undefined;
                var gx1: @Vector(4, f32) = qP - @Vector(4, f32){ DEL, 0.0, 0.0, 0.0 };
                var gx2: @Vector(4, f32) = qP + @Vector(4, f32){ DEL, 0.0, 0.0, 0.0 };
                var gy1: @Vector(4, f32) = qP - @Vector(4, f32){ 0.0, DEL, 0.0, 0.0 };
                var gy2: @Vector(4, f32) = qP + @Vector(4, f32){ 0.0, DEL, 0.0, 0.0 };
                var gz1: @Vector(4, f32) = qP - @Vector(4, f32){ 0.0, 0.0, DEL, 0.0 };
                var gz2: @Vector(4, f32) = qP + @Vector(4, f32){ 0.0, 0.0, DEL, 0.0 };
                {
                    var i: i32 = 0;
                    while (i < maxIterations) {
                        gx1 = quatSq(gx1) + c;
                        gx2 = quatSq(gx2) + c;
                        gy1 = quatSq(gy1) + c;
                        gy2 = quatSq(gy2) + c;
                        gz1 = quatSq(gz1) + c;
                        gz2 = quatSq(gz2) + c;
                        i += 1;
                    }
                }
                gradX = length(gx2) - length(gx1);
                gradY = length(gy2) - length(gy1);
                gradZ = length(gz2) - length(gz1);
                N = normalize(@Vector(3, f32){ gradX, gradY, gradZ });
                return N;
            }

            fn intersectQJulia(self: *@This(), rO: *@Vector(3, f32), rD: *@Vector(3, f32), c: @Vector(4, f32)) @Vector(2, f32) {
                const ambientOcclusion = self.params.ambientOcclusion;
                const maxIterations = self.params.maxIterations;
                var dist: @Vector(2, f32) = undefined;
                var n: i32 = 0;
                while (n < 150) {
                    var z: @Vector(4, f32) = .{
                        rO.*[0],
                        rO.*[1],
                        rO.*[2],
                        0.0,
                    };
                    var zp: @Vector(4, f32) = .{ 1.0, 0.0, 0.0, 0.0 };
                    iterateIntersect(&z, &zp, c, maxIterations);
                    const normZ: f32 = length(z);
                    dist[0] = 0.5 * normZ * log(normZ) / length(zp);
                    rO.* += rD.* * @as(@Vector(3, f32), @splat(dist[0]));
                    if (dist[0] < EPSILON or dot(rO.*, rO.*) > BOUNDING_RADIUS_2) break;
                    n += 1;
                }
                dist[1] = 1.0 - clamp((@as(f32, @floatFromInt(n)) / 150.0) * ambientOcclusion, 0.0, 1.0);
                return dist;
            }

            fn Phong(self: *@This(), light: @Vector(3, f32), eye: @Vector(3, f32), pt: @Vector(3, f32), N: @Vector(3, f32), ao: f32) @Vector(3, f32) {
                const ambientLight = self.params.ambientLight;
                const color = self.params.color;
                const colorSpread = self.params.colorSpread;
                const specularity = self.params.specularity;
                const specularExponent = self.params.specularExponent;
                var diffuse: @Vector(3, f32) = color;
                const L: @Vector(3, f32) = normalize(light - pt);
                const E: @Vector(3, f32) = normalize(eye - pt);
                const NdotL: f32 = dot(N, L);
                const R: @Vector(3, f32) = L - @as(@Vector(3, f32), @splat(2.0 * NdotL)) * N;
                diffuse += abs(N) * @as(@Vector(3, f32), @splat(colorSpread));
                diffuse = (diffuse * @as(@Vector(3, f32), @splat(max(NdotL, ambientLight))) + @as(@Vector(3, f32), @splat(specularity * pow(max(dot(E, R), 0.0), specularExponent)))) * @as(@Vector(3, f32), @splat(ao));
                return diffuse;
            }

            fn intersectSphere(_rO: @Vector(3, f32), rD: @Vector(3, f32)) @Vector(3, f32) {
                var rO = _rO;
                var B: f32 = undefined;
                var C: f32 = undefined;
                var d: f32 = undefined;
                var t0: f32 = undefined;
                var t1: f32 = undefined;
                var t: f32 = undefined;
                B = 2.0 * dot(rO, rD);
                C = dot(rO, rO) - BOUNDING_RADIUS_2;
                d = sqrt(B * B - 4.0 * C);
                t0 = (-B + d) * 0.5;
                t1 = (-B - d) * 0.5;
                t = min(t0, t1);
                rO += @as(@Vector(3, f32), @splat(t)) * rD;
                return rO;
            }

            fn rayDirection(self: *@This(), p: @Vector(2, f32)) @Vector(3, f32) {
                const size = self.params.size;
                const aspectRatio = self.aspectRatio;
                const viewRotation = self.viewRotation;
                const direction: @Vector(3, f32) = .{
                    2.0 * aspectRatio * p[0] / @as(f32, @floatFromInt(size[0])) - aspectRatio,
                    -2.0 * p[1] / @as(f32, @floatFromInt(size[1])) + 1.0,
                    -2.0,
                };
                return @"V * M"(direction, viewRotation);
            }

            fn renderPoint(self: *@This(), p: @Vector(2, f32)) @Vector(4, f32) {
                const shadows = self.params.shadows;
                const mu = self.params.mu;
                const background = self.params.background;
                const backgroundTransparency = self.params.backgroundTransparency;
                const eye = self.eye;
                const lightSource = self.lightSource;
                var color: @Vector(4, f32) = undefined;
                color = @shuffle(f32, color, background, @Vector(4, i32){ -1, -2, -3, 3 });
                color[3] = backgroundTransparency;
                var rO: @Vector(3, f32) = eye;
                var rD: @Vector(3, f32) = self.rayDirection(p);
                rD = normalize(rD);
                rO = intersectSphere(rO, rD);
                if (dot(rO, rO) < BOUNDING_RADIUS_2 + 0.01) {
                    var dist: @Vector(2, f32) = self.intersectQJulia(&rO, &rD, mu);
                    if (dist[0] < EPSILON) {
                        const N: @Vector(3, f32) = self.normEstimate(rO, mu);
                        color = @shuffle(f32, color, self.Phong(lightSource, rD, rO, N, dist[1]), @Vector(4, i32){ -1, -2, -3, 3 });
                        color[3] = 1.0;
                        if (shadows > 0.0) {
                            var L: @Vector(3, f32) = normalize(lightSource - rO);
                            rO += N * @as(@Vector(3, f32), @splat(EPSILON)) * @as(@Vector(3, f32), @splat(2.0));
                            dist = self.intersectQJulia(&rO, &L, mu);
                            if (dist[0] < EPSILON) {
                                color = @shuffle(f32, color, @shuffle(f32, color, undefined, @Vector(3, i32){ 0, 1, 2 }) * @as(@Vector(3, f32), @splat(1.0 - shadows)), @Vector(4, i32){ -1, -2, -3, 3 });
                            }
                        }
                    }
                }
                return color;
            }

            pub fn evaluateDependents(self: *@This()) void {
                const camera = self.params.camera;
                const light = self.params.light;
                const size = self.params.size;
                self.aspectRatio = @as(f32, @floatFromInt(size[0])) / @as(f32, @floatFromInt(size[1]));
                const c1: f32 = cos(radians(-camera[0]));
                const s1: f32 = sin(radians(-camera[0]));
                self.viewRotationY = [3]@Vector(3, f32){
                    .{ c1, 0.0, s1 },
                    .{ 0.0, 1.0, 0.0 },
                    .{ -s1, 0.0, c1 },
                };
                const c2: f32 = cos(radians(-camera[1]));
                const s2: f32 = sin(radians(-camera[1]));
                self.viewRotationZ = [3]@Vector(3, f32){
                    .{ c2, -s2, 0.0 },
                    .{ s2, c2, 0.0 },
                    .{ 0.0, 0.0, 1.0 },
                };
                const c3: f32 = cos(radians(-camera[2]));
                const s3: f32 = sin(radians(-camera[2]));
                self.viewRotationX = [3]@Vector(3, f32){
                    .{ 1.0, 0.0, 0.0 },
                    .{ 0.0, c3, -s3 },
                    .{ 0.0, s3, c3 },
                };
                self.viewRotation = @"M * M"(@"M * M"(self.viewRotationX, self.viewRotationY), self.viewRotationZ);
                self.eye = @"V * M"(@Vector(3, f32){ 0.0, 0.0, camera[3] }, self.viewRotation);
                self.lightSource = @"V * M"(light, self.viewRotation);
            }

            pub fn evaluatePixel(self: *@This()) void {
                const antialiasing = self.params.antialiasing;
                const dst = self.output.dst;
                self.dst = @splat(0.0);

                var c: @Vector(4, f32) = .{ 0.0, 0.0, 0.0, 0.0 };
                if (antialiasing) {
                    {
                        var i: f32 = 0.0;
                        while (i < 1.0) {
                            var j: f32 = 0.0;
                            while (j < 1.0) {
                                c += @as(@Vector(4, f32), @splat(0.25)) * self.renderPoint(@Vector(2, f32){
                                    self.outCoord()[0] + i,
                                    self.outCoord()[1] + j,
                                });
                                j += 0.5;
                            }
                            i += 0.5;
                        }
                    }
                } else {
                    c = self.renderPoint(self.outCoord());
                }
                self.dst = c;

                dst.writePixel(self.outputCoord, self.dst);
            }

            pub fn outCoord(self: *@This()) @Vector(2, f32) {
                return self.outputCoord;
            }
        };
    }

    // kernel instance creation function
    pub fn create(input: anytype, output: anytype, params: anytype) Instance(@TypeOf(input), @TypeOf(output), @TypeOf(params)) {
        return .{
            .input = input,
            .output = output,
            .params = params,
        };
    }

    // built-in Pixel Bender functions
    fn radians(v: anytype) @TypeOf(v) {
        const multiplier = std.math.pi / 180.0;
        return switch (@typeInfo(@TypeOf(v))) {
            .vector => v * @as(@TypeOf(v), @splat(multiplier)),
            else => v * multiplier,
        };
    }

    fn sin(v: anytype) @TypeOf(v) {
        return @sin(v);
    }

    fn cos(v: anytype) @TypeOf(v) {
        return @cos(v);
    }

    fn pow(v1: anytype, v2: anytype) @TypeOf(v1) {
        return switch (@typeInfo(@TypeOf(v1))) {
            .vector => calc: {
                var result: @TypeOf(v1) = undefined;
                inline for (0..@typeInfo(@TypeOf(v1)).vector.len) |i| {
                    result[i] = pow(v1[i], v2[i]);
                }
                break :calc result;
            },
            else => std.math.pow(@TypeOf(v1), v1, v2),
        };
    }

    fn log(v: anytype) @TypeOf(v) {
        return @log(v);
    }

    fn sqrt(v: anytype) @TypeOf(v) {
        return @sqrt(v);
    }

    fn abs(v: anytype) @TypeOf(v) {
        return @abs(v);
    }

    fn min(v1: anytype, v2: anytype) @TypeOf(v1) {
        return switch (@typeInfo(@TypeOf(v2))) {
            .vector => @min(v1, v2),
            else => switch (@typeInfo(@TypeOf(v1))) {
                .vector => @min(v1, @as(@TypeOf(v1), @splat(v2))),
                else => @min(v1, v2),
            },
        };
    }

    fn max(v1: anytype, v2: anytype) @TypeOf(v1) {
        return switch (@typeInfo(@TypeOf(v2))) {
            .vector => @max(v1, v2),
            else => switch (@typeInfo(@TypeOf(v1))) {
                .vector => @max(v1, @as(@TypeOf(v1), @splat(v2))),
                else => @max(v1, v2),
            },
        };
    }

    fn clamp(v: anytype, min_val: anytype, max_val: anytype) @TypeOf(v) {
        return switch (@typeInfo(@TypeOf(min_val))) {
            .vector => calc: {
                const T = @typeInfo(@TypeOf(v)).vector.child;
                const result1 = @select(T, v < min_val, min_val, v);
                const result2 = @select(T, result1 > max_val, max_val, result1);
                break :calc result2;
            },
            else => switch (@typeInfo(@TypeOf(v))) {
                .vector => clamp(v, @as(@TypeOf(v), @splat(min_val)), @as(@TypeOf(v), @splat(max_val))),
                else => calc: {
                    if (v < min_val) {
                        break :calc min_val;
                    } else if (v > max_val) {
                        break :calc max_val;
                    } else {
                        break :calc v;
                    }
                },
            },
        };
    }

    fn length(v: anytype) f32 {
        return switch (@typeInfo(@TypeOf(v))) {
            .vector => @sqrt(@reduce(.Add, v * v)),
            else => @abs(v),
        };
    }

    fn dot(v1: anytype, v2: anytype) f32 {
        return switch (@typeInfo(@TypeOf(v1))) {
            .vector => @reduce(.Add, v1 * v2),
            else => v1 * v2,
        };
    }

    fn normalize(v: anytype) @TypeOf(v) {
        return switch (@typeInfo(@TypeOf(v))) {
            .vector => v / @as(@TypeOf(v), @splat(@sqrt(@reduce(.Add, v * v)))),
            else => if (v > 0) 1 else -1,
        };
    }

    fn @"M * M"(m1: anytype, m2: anytype) @TypeOf(m1) {
        const ar = @typeInfo(@TypeOf(m2)).array;
        var result: @TypeOf(m2) = undefined;
        inline for (0..ar.len) |r| {
            var row: ar.child = undefined;
            inline for (m1, 0..) |column, c| {
                row[c] = column[r];
            }
            inline for (m2, 0..) |column, c| {
                result[c][r] = @reduce(.Add, row * column);
            }
        }
        return result;
    }

    fn @"V * M"(v1: anytype, m2: anytype) @TypeOf(v1) {
        var result: @TypeOf(v1) = undefined;
        inline for (m2, 0..) |column, c| {
            result[c] = @reduce(.Add, column * v1);
        }
        return result;
    }
};

// keep auto-formatter from moving statement
const zigar = if (true) @import("zigar") else unreachable;

pub const Input = KernelInput(kernel);
pub const Output = KernelOutput(kernel);
pub const Parameters = KernelParameters(kernel);

pub fn process(input: Input, output: Output, params: Parameters) !void {
    // use inline loop to generate code for each image implementation (WebImage or GD)
    inline for (zigar.image.formats) |tag| {
        const input_field_names = comptime std.meta.fieldNames(Input);
        const output_field_names = comptime std.meta.fieldNames(Output);
        const output_image_0 = @field(output, output_field_names[0]);
        if (output_image_0 == tag) {
            // copy fields from zigar.image.Any to implementation-specific structs
            var input_impl: KernelInputImpl(tag.Type(.ro), kernel) = undefined;
            inline for (input_field_names) |name| {
                const input_image = @field(input, name);
                if (input_image != tag) unreachable;
                @field(input_impl, name).impl = input_image.getField(tag);
            }
            var output_impl: KernelOutputImpl(tag.Type(.rw), kernel) = undefined;
            inline for (output_field_names) |name| {
                const output_image = @field(output, name);
                if (output_image != tag) unreachable;
                @field(output_impl, name).impl = output_image.getField(tag);
            }
            // get the output dimensions (multiple outputs are possible but unlikely)
            var output_width: usize = 0;
            var output_height: usize = 0;
            inline for (output_field_names) |name| {
                const output_image = @field(output, name);
                var out = output_image.getField(tag);
                const w = out.getWidth();
                const h = out.getHeight();
                if (w > output_width) output_width = w;
                if (h > output_height) output_height = h;
            }
            // create the implementation-specific kernel instance
            var instance = kernel.create(input_impl, output_impl, params);
            // calculate variables that are dependent on kernel parameters
            if (@hasDecl(@TypeOf(instance), "evaluateDependents")) {
                instance.evaluateDependents();
            }
            // loop through all coordinates, starting from (0.5, 0.5)
            const width: f32 = @floatFromInt(output_width);
            const height: f32 = @floatFromInt(output_height);
            while (instance.outputCoord[1] < height) : (instance.outputCoord[1] += 1) {
                instance.outputCoord[0] = 0.5;
                while (instance.outputCoord[0] < width) : (instance.outputCoord[0] += 1) {
                    instance.evaluatePixel();
                }
            }
        }
    }
}

pub fn KernelImage(comptime Impl: type, comptime channels: comptime_int, comptime writable: bool) type {
    const Pixel = @Vector(channels, f32);
    const Coord = @Vector(2, f32);
    return struct {
        impl: Impl,

        fn writePixel(self: @This(), coord: Coord, pixel: Pixel) void {
            if (comptime !writable) unreachable;
            const pos: @Vector(2, usize) = @intFromFloat(coord);
            self.impl.setPixel(Pixel, pos[0], pos[1], pixel);
        }

        fn pixelSize(self: @This()) Coord {
            _ = self;
            return .{ 1, 1 };
        }

        fn pixelAspectRatio(self: @This()) f32 {
            _ = self;
            return 1;
        }

        fn sampleNearest(self: @This(), coord: Coord) Pixel {
            return self.impl.sampleNearest(Pixel, coord);
        }

        fn sampleLinear(self: @This(), coord: Coord) Pixel {
            return self.impl.sampleLinear(Pixel, coord);
        }
    };
}

pub fn KernelInput(comptime Kernel: type) type {
    const fields = std.meta.fields(@TypeOf(Kernel.inputImages));
    var field_names: [fields.len][]const u8 = undefined;
    var field_types: [fields.len]type = undefined;
    var field_attrs: [fields.len]std.builtin.Type.StructField.Attributes = undefined;
    inline for (fields, 0..) |field, index| {
        field_names[index] = field.name;
        field_types[index] = zigar.image.Any(.ro);
        field_attrs[index] = .{};
    }
    return @Struct(.auto, null, &field_names, &field_types, &field_attrs);
}

pub fn KernelInputImpl(comptime Impl: type, comptime Kernel: type) type {
    const fields = std.meta.fields(@TypeOf(Kernel.inputImages));
    var field_names: [fields.len][]const u8 = undefined;
    var field_types: [fields.len]type = undefined;
    var field_attrs: [fields.len]std.builtin.Type.StructField.Attributes = undefined;
    inline for (fields, 0..) |field, index| {
        const input = @field(Kernel.inputImages, field.name);
        field_names[index] = field.name;
        field_types[index] = KernelImage(Impl, input.channels, false);
        field_attrs[index] = .{};
    }
    return @Struct(.auto, null, &field_names, &field_types, &field_attrs);
}

pub fn KernelOutput(comptime Kernel: type) type {
    const fields = std.meta.fields(@TypeOf(Kernel.outputImages));
    var field_names: [fields.len][]const u8 = undefined;
    var field_types: [fields.len]type = undefined;
    var field_attrs: [fields.len]std.builtin.Type.StructField.Attributes = undefined;
    inline for (fields, 0..) |field, index| {
        field_names[index] = field.name;
        field_types[index] = zigar.image.Any(.rw);
        field_attrs[index] = .{};
    }
    return @Struct(.auto, null, &field_names, &field_types, &field_attrs);
}

pub fn KernelOutputImpl(comptime Impl: type, comptime Kernel: type) type {
    const fields = std.meta.fields(@TypeOf(Kernel.outputImages));
    var field_names: [fields.len][]const u8 = undefined;
    var field_types: [fields.len]type = undefined;
    var field_attrs: [fields.len]std.builtin.Type.StructField.Attributes = undefined;
    inline for (fields, 0..) |field, index| {
        const output = @field(Kernel.outputImages, field.name);
        field_names[index] = field.name;
        field_types[index] = KernelImage(Impl, output.channels, true);
        field_attrs[index] = .{};
    }
    return @Struct(.auto, null, &field_names, &field_types, &field_attrs);
}

pub fn KernelParameters(comptime Kernel: type) type {
    const fields = std.meta.fields(@TypeOf(Kernel.parameters));
    var field_names: [fields.len][]const u8 = undefined;
    var field_types: [fields.len]type = undefined;
    var field_attrs: [fields.len]std.builtin.Type.StructField.Attributes = undefined;
    inline for (fields, 0..) |field, index| {
        const param = @field(Kernel.parameters, field.name);
        const default_value_ptr: ?*const anyopaque = get_def: {
            const value: param.type = switch (@hasField(@TypeOf(param), "defaultValue")) {
                true => param.defaultValue,
                false => switch (@typeInfo(param.type)) {
                    .int, .float => 0,
                    .bool => false,
                    .vector => @splat(0),
                    else => @compileError("Unrecognized parameter type: " ++ @typeName(param.type)),
                },
            };
            break :get_def @ptrCast(&value);
        };
        field_names[index] = field.name;
        field_types[index] = param.type;
        field_attrs[index] = .{
            .default_value_ptr = default_value_ptr,
        };
    }
    return @Struct(.auto, null, &field_names, &field_types, &field_attrs);
}

const builtin = if (true) @import("builtin") else unreachable;
const Allocator = if (true) std.mem.Allocator else unreachable;
const Promise = zigar.function.PromiseOf(worker.processSlice);
const AbortSignal = zigar.function.AbortSignal;
const WorkQueue = zigar.thread.WorkQueue;

var work_queue: WorkQueue(worker) = .{};
var gpa = switch (builtin.target.cpu.arch.isWasm()) {
    true => {},
    false => std.heap.DebugAllocator(.{}){},
};
const internal_allocator = switch (builtin.target.cpu.arch.isWasm()) {
    true => std.heap.wasm_allocator,
    false => gpa.allocator(),
};

pub fn startThreadPool(count: u32) !void {
    if (builtin.single_threaded) @panic("Unavailable");
    try work_queue.init(.{
        .allocator = internal_allocator,
        .stack_size = 65536,
        .n_jobs = count,
    });
}

pub fn stopThreadPoolAsync(promise: zigar.function.Promise(void)) void {
    if (builtin.single_threaded) @panic("Unavailable");
    work_queue.deinitAsync(promise);
}

pub fn processAsync(input: Input, output: Output, params: Parameters, promise: Promise, signal: AbortSignal) !void {
    if (builtin.single_threaded) @panic("Unavailable");
    // get the output dimensions (multiple outputs are possible but unlikely)
    var output_width: usize = 0;
    var output_height: usize = 0;
    inline for (zigar.image.formats) |tag| {
        const output_field_names = comptime std.meta.fieldNames(Output);
        const output_image_0 = @field(output, output_field_names[0]);
        if (output_image_0 == tag) {
            inline for (output_field_names) |name| {
                const output_image = @field(output, name);
                var out = output_image.getField(tag);
                const w = out.getWidth();
                const h = out.getHeight();
                if (w > output_width) output_width = w;
                if (h > output_height) output_height = h;
            }
        }
    }
    // add work units to queue
    const workers: usize = @max(1, work_queue.thread_count);
    const scanlines: usize = output_height / workers;
    const slices: usize = if (scanlines > 0) workers else 1;
    const multipart_promise = try promise.partition(internal_allocator, slices);
    var slice_num: usize = 0;
    while (slice_num < slices) : (slice_num += 1) {
        const start = scanlines * slice_num;
        const count = if (slice_num < slices - 1) scanlines else output_height - (scanlines * slice_num);
        try work_queue.push(worker.processSlice, .{ signal, output_width, start, count, input, output, params }, multipart_promise);
    }
}

const worker = struct {
    pub fn processSlice(signal: AbortSignal, width: usize, start: usize, count: usize, input: Input, output: Output, params: Parameters) !void {
        // use inline loop to generate code for each image implementation (WebImage or GD)
        inline for (zigar.image.formats) |tag| {
            const input_field_names = comptime std.meta.fieldNames(Input);
            const output_field_names = comptime std.meta.fieldNames(Output);
            const output_image_0 = @field(output, output_field_names[0]);
            if (output_image_0 == tag) {
                // copy fields from zigar.image.Any to implementation-specific structs
                var input_impl: KernelInputImpl(tag.Type(.ro), kernel) = undefined;
                inline for (input_field_names) |name| {
                    const input_image = @field(input, name);
                    if (input_image != tag) unreachable;
                    @field(input_impl, name).impl = input_image.getField(tag);
                }
                var output_impl: KernelOutputImpl(tag.Type(.rw), kernel) = undefined;
                inline for (output_field_names) |name| {
                    const output_image = @field(output, name);
                    if (output_image != tag) unreachable;
                    @field(output_impl, name).impl = output_image.getField(tag);
                }
                // create the implementation-specific kernel instance
                var instance = kernel.create(input_impl, output_impl, params);
                // calculate variables that are dependent on kernel parameters
                if (@hasDecl(@TypeOf(instance), "evaluateDependents")) {
                    instance.evaluateDependents();
                }
                // loop through all coordinates, starting from (0.5, 0.5)
                const last_x: f32 = @floatFromInt(width);
                const last_y: f32 = @floatFromInt(start + count);
                const first_y: f32 = @floatFromInt(start);
                instance.outputCoord[1] = first_y + 0.5;
                while (instance.outputCoord[1] < last_y) : (instance.outputCoord[1] += 1) {
                    instance.outputCoord[0] = 0.5;
                    while (instance.outputCoord[0] < last_x) : (instance.outputCoord[0] += 1) {
                        instance.evaluatePixel();
                    }
                    if (signal.on()) return error.Aborted;
                }
            }
        }
    }
};
