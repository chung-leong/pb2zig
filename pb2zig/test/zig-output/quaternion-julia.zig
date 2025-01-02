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
            outputCoord: @Vector(2, u32) = @splat(0),

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

                dst.setPixel(self.outputCoord[0], self.outputCoord[1], self.dst);
            }

            pub fn outCoord(self: *@This()) @Vector(2, f32) {
                return .{ @as(f32, @floatFromInt(self.outputCoord[0])) + 0.5, @as(f32, @floatFromInt(self.outputCoord[1])) + 0.5 };
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
            .Vector => v * @as(@TypeOf(v), @splat(multiplier)),
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
            .Vector => calc: {
                var result: @TypeOf(v1) = undefined;
                inline for (0..@typeInfo(@TypeOf(v1)).Vector.len) |i| {
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
            .Vector => @min(v1, v2),
            else => switch (@typeInfo(@TypeOf(v1))) {
                .Vector => @min(v1, @as(@TypeOf(v1), @splat(v2))),
                else => @min(v1, v2),
            },
        };
    }

    fn max(v1: anytype, v2: anytype) @TypeOf(v1) {
        return switch (@typeInfo(@TypeOf(v2))) {
            .Vector => @max(v1, v2),
            else => switch (@typeInfo(@TypeOf(v1))) {
                .Vector => @max(v1, @as(@TypeOf(v1), @splat(v2))),
                else => @max(v1, v2),
            },
        };
    }

    fn clamp(v: anytype, min_val: anytype, max_val: anytype) @TypeOf(v) {
        return switch (@typeInfo(@TypeOf(min_val))) {
            .Vector => calc: {
                const T = @typeInfo(@TypeOf(v)).Vector.child;
                const result1 = @select(T, v < min_val, min_val, v);
                const result2 = @select(T, result1 > max_val, max_val, result1);
                break :calc result2;
            },
            else => switch (@typeInfo(@TypeOf(v))) {
                .Vector => clamp(v, @as(@TypeOf(v), @splat(min_val)), @as(@TypeOf(v), @splat(max_val))),
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
            .Vector => @sqrt(@reduce(.Add, v * v)),
            else => @abs(v),
        };
    }

    fn dot(v1: anytype, v2: anytype) f32 {
        return switch (@typeInfo(@TypeOf(v1))) {
            .Vector => @reduce(.Add, v1 * v2),
            else => v1 * v2,
        };
    }

    fn normalize(v: anytype) @TypeOf(v) {
        return switch (@typeInfo(@TypeOf(v))) {
            .Vector => v / @as(@TypeOf(v), @splat(@sqrt(@reduce(.Add, v * v)))),
            else => if (v > 0) 1 else -1,
        };
    }

    fn @"M * M"(m1: anytype, m2: anytype) @TypeOf(m1) {
        const ar = @typeInfo(@TypeOf(m2)).Array;
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

pub const Input = KernelInput(u8, kernel);
pub const Output = KernelOutput(u8, kernel);
pub const Parameters = KernelParameters(kernel);

pub fn createOutput(allocator: std.mem.Allocator, width: u32, height: u32, input: Input, params: Parameters) !Output {
    var output: Output = undefined;
    inline for (std.meta.fields(Output)) |field| {
        const ImageT = @TypeOf(@field(output, field.name));
        @field(output, field.name) = .{
            .data = try allocator.alloc(ImageT.Pixel, width * height),
            .width = width,
            .height = height,
        };
    }
    var instance = kernel.create(input, output, params);
    if (@hasDecl(@TypeOf(instance), "evaluateDependents")) {
        instance.evaluateDependents();
    }
    while (instance.outputCoord[1] < height) : (instance.outputCoord[1] += 1) {
        instance.outputCoord[0] = 0;
        while (instance.outputCoord[0] < width) : (instance.outputCoord[0] += 1) {
            instance.evaluatePixel();
        }
    }
    return output;
}

const ColorSpace = enum { srgb, @"display-p3" };

pub fn Image(comptime T: type, comptime len: comptime_int, comptime writable: bool) type {
    return struct {
        pub const Pixel = @Vector(4, T);
        pub const FPixel = @Vector(len, f32);
        pub const channels = len;

        data: if (writable) []Pixel else []const Pixel,
        width: u32,
        height: u32,
        colorSpace: ColorSpace = .srgb,

        fn constrain(v: anytype, min: f32, max: f32) @TypeOf(v) {
            const lower: @TypeOf(v) = @splat(min);
            const upper: @TypeOf(v) = @splat(max);
            const v2 = @select(f32, v > lower, v, lower);
            return @select(f32, v2 < upper, v2, upper);
        }

        fn pbPixelFromFloatPixel(pixel: Pixel) FPixel {
            if (len == 4) {
                return pixel;
            }
            const mask: @Vector(len, i32) = switch (len) {
                1 => .{0},
                2 => .{ 0, 3 },
                3 => .{ 0, 1, 2 },
                else => @compileError("Unsupported number of channels: " ++ len),
            };
            return @shuffle(f32, pixel, undefined, mask);
        }

        fn floatPixelFromPBPixel(pixel: FPixel) Pixel {
            if (len == 4) {
                return pixel;
            }
            const alpha: @Vector(1, T) = if (len == 1 or len == 3) .{1} else undefined;
            const mask: @Vector(len, i32) = switch (len) {
                1 => .{ 0, 0, 0, -1 },
                2 => .{ 0, 0, 0, 1 },
                3 => .{ 0, 1, 2, -1 },
                else => @compileError("Unsupported number of channels: " ++ len),
            };
            return @shuffle(T, pixel, alpha, mask);
        }

        fn pbPixelFromIntPixel(pixel: Pixel) FPixel {
            const numerator: FPixel = switch (len) {
                1 => @floatFromInt(@shuffle(T, pixel, undefined, @Vector(1, i32){0})),
                2 => @floatFromInt(@shuffle(T, pixel, undefined, @Vector(2, i32){ 0, 3 })),
                3 => @floatFromInt(@shuffle(T, pixel, undefined, @Vector(3, i32){ 0, 1, 2 })),
                4 => @floatFromInt(pixel),
                else => @compileError("Unsupported number of channels: " ++ len),
            };
            const denominator: FPixel = @splat(@floatFromInt(std.math.maxInt(T)));
            return numerator / denominator;
        }

        fn intPixelFromPBPixel(pixel: FPixel) Pixel {
            const max: f32 = @floatFromInt(std.math.maxInt(T));
            const multiplier: FPixel = @splat(max);
            const product: FPixel = constrain(pixel * multiplier, 0, max);
            const maxAlpha: @Vector(1, f32) = .{std.math.maxInt(T)};
            return switch (len) {
                1 => @intFromFloat(@shuffle(f32, product, maxAlpha, @Vector(4, i32){ 0, 0, 0, -1 })),
                2 => @intFromFloat(@shuffle(f32, product, undefined, @Vector(4, i32){ 0, 0, 0, 1 })),
                3 => @intFromFloat(@shuffle(f32, product, maxAlpha, @Vector(4, i32){ 0, 1, 2, -1 })),
                4 => @intFromFloat(product),
                else => @compileError("Unsupported number of channels: " ++ len),
            };
        }

        fn getPixel(self: @This(), x: u32, y: u32) FPixel {
            const index = (y * self.width) + x;
            const src_pixel = self.data[index];
            const pixel: FPixel = switch (@typeInfo(T)) {
                .Float => pbPixelFromFloatPixel(src_pixel),
                .Int => pbPixelFromIntPixel(src_pixel),
                else => @compileError("Unsupported type: " ++ @typeName(T)),
            };
            return pixel;
        }

        fn setPixel(self: @This(), x: u32, y: u32, pixel: FPixel) void {
            if (comptime !writable) {
                return;
            }
            const index = (y * self.width) + x;
            const dst_pixel: Pixel = switch (@typeInfo(T)) {
                .Float => floatPixelFromPBPixel(pixel),
                .Int => intPixelFromPBPixel(pixel),
                else => @compileError("Unsupported type: " ++ @typeName(T)),
            };
            self.data[index] = dst_pixel;
        }

        fn pixelSize(self: @This()) @Vector(2, f32) {
            _ = self;
            return .{ 1, 1 };
        }

        fn pixelAspectRatio(self: @This()) f32 {
            _ = self;
            return 1;
        }

        inline fn getPixelAt(self: @This(), coord: @Vector(2, f32)) FPixel {
            const left_top: @Vector(2, f32) = .{ 0, 0 };
            const bottom_right: @Vector(2, f32) = .{ @floatFromInt(self.width - 1), @floatFromInt(self.height - 1) };
            if (@reduce(.And, coord >= left_top) and @reduce(.And, coord <= bottom_right)) {
                const ic: @Vector(2, u32) = @intFromFloat(coord);
                return self.getPixel(ic[0], ic[1]);
            } else {
                return @splat(0);
            }
        }

        fn sampleNearest(self: @This(), coord: @Vector(2, f32)) FPixel {
            return self.getPixelAt(@floor(coord));
        }

        fn sampleLinear(self: @This(), coord: @Vector(2, f32)) FPixel {
            const c = coord - @as(@Vector(2, f32), @splat(0.5));
            const c0 = @floor(c);
            const f0 = c - c0;
            const f1 = @as(@Vector(2, f32), @splat(1)) - f0;
            const w: @Vector(4, f32) = .{
                f1[0] * f1[1],
                f0[0] * f1[1],
                f1[0] * f0[1],
                f0[0] * f0[1],
            };
            const p00 = self.getPixelAt(c0);
            const p01 = self.getPixelAt(c0 + @as(@Vector(2, f32), .{ 0, 1 }));
            const p10 = self.getPixelAt(c0 + @as(@Vector(2, f32), .{ 1, 0 }));
            const p11 = self.getPixelAt(c0 + @as(@Vector(2, f32), .{ 1, 1 }));
            var result: FPixel = undefined;
            comptime var i = 0;
            inline while (i < len) : (i += 1) {
                const p: @Vector(4, f32) = .{ p00[i], p10[i], p01[i], p11[i] };
                result[i] = @reduce(.Add, p * w);
            }
            return result;
        }
    };
}

pub fn KernelInput(comptime T: type, comptime Kernel: type) type {
    const input_fields = std.meta.fields(@TypeOf(Kernel.inputImages));
    comptime var struct_fields: [input_fields.len]std.builtin.Type.StructField = undefined;
    inline for (input_fields, 0..) |field, index| {
        const input = @field(Kernel.inputImages, field.name);
        const ImageT = Image(T, input.channels, false);
        const default_value: ImageT = undefined;
        struct_fields[index] = .{
            .name = field.name,
            .type = ImageT,
            .default_value = @ptrCast(&default_value),
            .is_comptime = false,
            .alignment = @alignOf(ImageT),
        };
    }
    return @Type(.{
        .Struct = .{
            .layout = .auto,
            .fields = &struct_fields,
            .decls = &.{},
            .is_tuple = false,
        },
    });
}

pub fn KernelOutput(comptime T: type, comptime Kernel: type) type {
    const output_fields = std.meta.fields(@TypeOf(Kernel.outputImages));
    comptime var struct_fields: [output_fields.len]std.builtin.Type.StructField = undefined;
    inline for (output_fields, 0..) |field, index| {
        const output = @field(Kernel.outputImages, field.name);
        const ImageT = Image(T, output.channels, true);
        const default_value: ImageT = undefined;
        struct_fields[index] = .{
            .name = field.name,
            .type = ImageT,
            .default_value = @ptrCast(&default_value),
            .is_comptime = false,
            .alignment = @alignOf(ImageT),
        };
    }
    return @Type(.{
        .Struct = .{
            .layout = .auto,
            .fields = &struct_fields,
            .decls = &.{},
            .is_tuple = false,
        },
    });
}

pub fn KernelParameters(comptime Kernel: type) type {
    const param_fields = std.meta.fields(@TypeOf(Kernel.parameters));
    comptime var struct_fields: [param_fields.len]std.builtin.Type.StructField = undefined;
    inline for (param_fields, 0..) |field, index| {
        const param = @field(Kernel.parameters, field.name);
        const default_value: ?*const anyopaque = get_def: {
            const value: param.type = switch (@hasField(@TypeOf(param), "defaultValue")) {
                true => param.defaultValue,
                false => switch (@typeInfo(param.type)) {
                    .Int, .Float => 0,
                    .Bool => false,
                    .Vector => @splat(0),
                    else => @compileError("Unrecognized parameter type: " ++ @typeName(param.type)),
                },
            };
            break :get_def @ptrCast(&value);
        };
        struct_fields[index] = .{
            .name = field.name,
            .type = param.type,
            .default_value = default_value,
            .is_comptime = false,
            .alignment = @alignOf(param.type),
        };
    }
    return @Type(.{
        .Struct = .{
            .layout = .auto,
            .fields = &struct_fields,
            .decls = &.{},
            .is_tuple = false,
        },
    });
}

pub usingnamespace switch (@import("builtin").single_threaded) {
    false => async_support,
    true => struct {},
};

const async_support = struct {
    const zigar = @import("zigar");
    const Allocator = std.mem.Allocator;
    const Promise = zigar.function.PromiseOf(thread_ns.processSlice);
    const AbortSignal = zigar.function.AbortSignal;
    const WorkQueue = zigar.thread.WorkQueue;

    var work_queue: WorkQueue(thread_ns) = .{};

    pub fn startThreadPool(count: u32) !void {
        const allocator = zigar.mem.getDefaultAllocator();
        try work_queue.init(.{ .allocator = allocator, .n_jobs = count });
        try zigar.thread.use();
    }

    pub fn stopThreadPool() void {
        work_queue.deinit();
        zigar.thread.end();
    }

    pub fn stopThreadPoolAsync(promise: zigar.function.Promise(void)) void {
        work_queue.deinitAsync(promise);
    }

    pub fn createOutputAsync(allocator: Allocator, promise: Promise, signal: AbortSignal, width: u32, height: u32, input: Input, params: Parameters) !void {
        var output: Output = undefined;
        // allocate memory for output image
        const fields = std.meta.fields(Output);
        var allocated: usize = 0;
        errdefer inline for (fields, 0..) |field, i| {
            if (i < allocated) {
                allocator.free(@field(output, field.name).data);
            }
        };
        inline for (fields) |field| {
            const ImageT = @TypeOf(@field(output, field.name));
            const data = try allocator.alloc(ImageT.Pixel, width * height);
            @field(output, field.name) = .{
                .data = data,
                .width = width,
                .height = height,
            };
            allocated += 1;
        }
        // add work units to queue
        const workers: u32 = @intCast(@max(1, work_queue.thread_count));
        const scanlines: u32 = height / workers;
        const slices: u32 = if (scanlines > 0) workers else 1;
        const multipart_promise = try promise.partition(zigar.mem.getDefaultAllocator(), slices);
        var slice_num: u32 = 0;
        while (slice_num < slices) : (slice_num += 1) {
            const start = scanlines * slice_num;
            const count = if (slice_num < slices - 1) scanlines else height - (scanlines * slice_num);
            try work_queue.push(thread_ns.processSlice, .{ signal, width, start, count, input, output, params }, multipart_promise);
        }
    }

    const thread_ns = struct {
        pub fn processSlice(signal: AbortSignal, width: u32, start: u32, count: u32, input: Input, output: Output, params: Parameters) !Output {
            var instance = kernel.create(input, output, params);
            if (@hasDecl(@TypeOf(instance), "evaluateDependents")) {
                instance.evaluateDependents();
            }
            const end = start + count;
            instance.outputCoord[1] = start;
            while (instance.outputCoord[1] < end) : (instance.outputCoord[1] += 1) {
                instance.outputCoord[0] = 0;
                while (instance.outputCoord[0] < width) : (instance.outputCoord[0] += 1) {
                    instance.evaluatePixel();
                    if (signal.on()) return error.Aborted;
                }
            }
            return output;
        }
    };
};
