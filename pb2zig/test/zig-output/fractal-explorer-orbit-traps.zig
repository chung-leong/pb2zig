// Pixel Bender kernel "FractalExplorerOrbitTraps" (translated using pb2zig)
const std = @import("std");

pub const kernel = struct {
    // constants
    const BAILOUT: f32 = 4.0;
    const LOG2: f32 = log(@as(f32, 2.0));
    const I: @Vector(2, f32) = @Vector(2, f32){ 0.0, 1.0 };

    // kernel information
    pub const namespace = "com.subblue.filters";
    pub const vendor = "Tom Beddard";
    pub const version = 1;
    pub const description = "Fractal explorer with orbit traps";
    pub const displayName = "Fractal Explorer with Orbit Traps";
    pub const category = "Pixel Bender";
    pub const parameters = .{
        .antialiasing = .{
            .type = i32,
            .minValue = 1,
            .maxValue = 3,
            .defaultValue = 1,
            .description = "Super sampling quality. Number of samples squared per pixel.",
        },
        .center = .{
            .type = @Vector(2, f32),
            .minValue = .{ -2.0, -1.0 },
            .maxValue = .{ 2.0, 1.0 },
            .defaultValue = .{ 0.0, 0.0 },
            .description = "The center of the fractal.",
        },
        .centerFineTune = .{
            .type = @Vector(2, f32),
            .minValue = .{ -1.0, -1.0 },
            .maxValue = .{ 1.0, 1.0 },
            .defaultValue = .{ 0.0, 0.0 },
            .description = "Fine tune the center position.",
        },
        .sizeInput = .{
            .type = @Vector(2, i32),
            .minValue = .{ 100, 100 },
            .maxValue = .{ 4096, 4096 },
            .defaultValue = .{ 300, 300 },
            .description = "The input size of the source image",
        },
        .sizeOutput = .{
            .type = @Vector(2, i32),
            .minValue = .{ 100, 100 },
            .maxValue = .{ 4096, 4096 },
            .defaultValue = .{ 640, 480 },
            .description = "The output size of the rendered fractal.",
        },
        .mandelbrot = .{
            .type = bool,
            .defaultValue = false,
            .description = "Use the standard Mandelbrot equation.",
        },
        .power = .{
            .type = f32,
            .minValue = -12.0,
            .maxValue = 12.0,
            .defaultValue = 3.0,
            .description = "Raise z to the power e in the fractal formula: z' = z^e + mu",
        },
        .powerFineTune = .{
            .type = f32,
            .minValue = -0.1,
            .maxValue = 0.1,
            .defaultValue = 0.0,
            .description = "Fine tune the exponent.",
        },
        .mu = .{
            .type = @Vector(2, f32),
            .minValue = .{ -1.0, -1.0 },
            .maxValue = .{ 1.0, 1.0 },
            .defaultValue = .{ 0.5, 0.0 },
            .description = "The complex parameter of the fractal formula: z' = z^e + mu",
        },
        .muFineTune = .{
            .type = @Vector(2, f32),
            .minValue = .{ -0.01, -0.01 },
            .maxValue = .{ 0.01, 0.01 },
            .defaultValue = .{ 0.0, 0.0 },
            .description = "Fine tune mu.",
        },
        .iterations = .{
            .type = i32,
            .minValue = 1,
            .maxValue = 100,
            .defaultValue = 10,
            .description = "The maximum number of iterations for each pixel before bailout. Use to increase detail at the fractal edges.",
        },
        .iterationsOffset = .{
            .type = i32,
            .minValue = 0,
            .maxValue = 20,
            .defaultValue = 0,
            .description = "Offset the start of the iteration count",
        },
        .colorBackground = .{
            .type = @Vector(3, f32),
            .minValue = .{ 0.0, 0.0, 0.0 },
            .maxValue = .{ 1.0, 1.0, 1.0 },
            .defaultValue = .{ 0.0, 0.0, 0.0 },
            .description = "The background colour.",
            .aeUIControl = "aeColor",
        },
        .colorAlpha = .{
            .type = f32,
            .minValue = 0.0,
            .maxValue = 1.0,
            .defaultValue = 1.0,
            .description = "Separate alpha channel for After Effects compatibility.",
        },
        .orbitTrap = .{
            .type = bool,
            .defaultValue = true,
            .description = "Use the source image as an orbit trap.",
        },
        .orbitTrapEdgeDetail = .{
            .type = f32,
            .minValue = 0.2,
            .maxValue = 0.99,
            .defaultValue = 0.9,
            .description = "Fine tune the masking at the transparent edge of the source image.",
        },
        .orbitTrapScale = .{
            .type = f32,
            .minValue = 0.01,
            .maxValue = 5.0,
            .defaultValue = 0.6,
            .description = "The relative scale of the source image.",
        },
        .orbitTrapRotation = .{
            .type = f32,
            .minValue = -180.0,
            .maxValue = 180.0,
            .defaultValue = 0.0,
            .description = "Rotate the image map.",
        },
        .orbitTrapSpin = .{
            .type = f32,
            .minValue = -180.0,
            .maxValue = 180.0,
            .defaultValue = 0.0,
            .description = "Rotate mapped image.",
        },
        .orbitTrapOffset = .{
            .type = @Vector(2, f32),
            .minValue = .{ -2.0, -2.0 },
            .maxValue = .{ 2.0, 2.0 },
            .defaultValue = .{ 0.5, 0.0 },
            .description = "The relative position of the source image.",
        },
        .iterationColorBlend = .{
            .type = f32,
            .minValue = 0.0,
            .maxValue = 1.0,
            .defaultValue = 0.0,
            .description = "Add the illusion of depth by blending subsequent iterations into the background.",
        },
        .rotate = .{
            .type = f32,
            .minValue = -180.0,
            .maxValue = 180.0,
            .defaultValue = 0.0,
            .description = "Rotate the fractal.",
        },
        .zoom = .{
            .type = f32,
            .minValue = -1.0,
            .maxValue = 13.0,
            .defaultValue = 0.1,
            .description = "Primary zoom.",
        },
        .zoomFineTune = .{
            .type = f32,
            .minValue = -1.0,
            .maxValue = 1.0,
            .defaultValue = 0.0,
            .description = "Fine tune the zoom.",
        },
    };
    pub const inputImages = .{
        .src = .{ .channels = 4 },
    };
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
            x1: f32 = undefined,
            x2: f32 = undefined,
            y1: f32 = undefined,
            zoomFactor: f32 = undefined,
            spanX: f32 = undefined,
            spanY: f32 = undefined,
            sampleStep: f32 = undefined,
            sampleContribution: f32 = undefined,
            scale: @Vector(2, f32) = undefined,
            bitmap2complex: @Vector(2, f32) = undefined,
            orbitRotation: [2]@Vector(2, f32) = undefined,
            orbitSpin: [2]@Vector(2, f32) = undefined,
            minIterations: i32 = undefined,
            rotation: [2]@Vector(2, f32) = undefined,
            color_background: @Vector(4, f32) = undefined,

            // functions defined in kernel
            pub fn evaluateDependents(self: *@This()) void {
                const antialiasing = self.params.antialiasing;
                const center = self.params.center;
                const centerFineTune = self.params.centerFineTune;
                const sizeInput = self.params.sizeInput;
                const sizeOutput = self.params.sizeOutput;
                const iterations = self.params.iterations;
                const iterationsOffset = self.params.iterationsOffset;
                const colorBackground = self.params.colorBackground;
                const colorAlpha = self.params.colorAlpha;
                const orbitTrapScale = self.params.orbitTrapScale;
                const orbitTrapRotation = self.params.orbitTrapRotation;
                const orbitTrapSpin = self.params.orbitTrapSpin;
                const rotate = self.params.rotate;
                const zoom = self.params.zoom;
                const zoomFineTune = self.params.zoomFineTune;
                const x0: f32 = center[0];
                const y0: f32 = center[1];
                self.minIterations = if (iterationsOffset >= iterations) iterations - 1 else iterationsOffset;
                self.zoomFactor = exp(zoom + zoomFineTune);
                self.x1 = x0 - 2.0 / self.zoomFactor;
                self.x2 = x0 + 2.0 / self.zoomFactor;
                self.spanX = self.x2 - self.x1;
                self.spanY = self.spanX * (@as(f32, @floatFromInt(sizeOutput[1])) / @as(f32, @floatFromInt(sizeOutput[0])));
                self.y1 = y0 - self.spanY / 2.0;
                self.x1 += centerFineTune[0] * self.spanX;
                self.y1 += centerFineTune[1] * self.spanY;
                if (rotate != 0.0) {
                    const rc: f32 = cos(radians(rotate));
                    const rs: f32 = sin(radians(rotate));
                    self.rotation = [2]@Vector(2, f32){
                        .{ rc, rs },
                        .{ -rs, rc },
                    };
                    const xy: @Vector(2, f32) = @"V * M"(@Vector(2, f32){ self.x1, self.y1 }, self.rotation);
                    self.x1 = xy[0];
                    self.y1 = xy[1];
                }
                self.scale = @Vector(2, f32){
                    self.spanX / @as(f32, @floatFromInt(sizeOutput[0])),
                    self.spanY / @as(f32, @floatFromInt(sizeOutput[1])),
                };
                self.bitmap2complex = @as(@Vector(2, f32), @splat(min(@as(f32, @floatFromInt(sizeInput[0])), @as(f32, @floatFromInt(sizeInput[1]))) / 2.0)) / @as(@Vector(2, f32), @splat(orbitTrapScale));
                const otrc: f32 = cos(radians(orbitTrapRotation));
                const otrs: f32 = sin(radians(orbitTrapRotation));
                self.orbitRotation = [2]@Vector(2, f32){
                    .{ otrc, otrs },
                    .{ -otrs, otrc },
                };
                const otsc: f32 = cos(radians(orbitTrapSpin));
                const otss: f32 = sin(radians(orbitTrapSpin));
                self.orbitSpin = [2]@Vector(2, f32){
                    .{ otsc, otss },
                    .{ -otss, otsc },
                };
                self.color_background = @Vector(4, f32){
                    colorBackground[0],
                    colorBackground[1],
                    colorBackground[2],
                    colorAlpha,
                };
                self.sampleStep = 1.0 / @as(f32, @floatFromInt(antialiasing));
                self.sampleContribution = 1.0 / pow(@as(f32, @floatFromInt(antialiasing)), 2.0);
            }

            fn orbitMapping(self: *@This(), c: @Vector(4, f32), w: @Vector(2, f32)) @Vector(4, f32) {
                const sizeInput = self.params.sizeInput;
                const orbitTrapOffset = self.params.orbitTrapOffset;
                const src = self.input.src;
                const bitmap2complex = self.bitmap2complex;
                const orbitRotation = self.orbitRotation;
                const orbitSpin = self.orbitSpin;
                var color: @Vector(4, f32) = .{ 0.0, 0.0, 0.0, 0.0 };
                const sp: @Vector(2, f32) = floatVectorFromIntVector(sizeInput / @as(@Vector(2, i32), @splat(2))) + @"V * M"((@"V * M"(w, orbitSpin) + orbitTrapOffset), orbitRotation) * bitmap2complex;
                const s: @Vector(4, f32) = src.sampleLinear(sp);
                if (s[3] > 0.0) {
                    color = mix(c, s, s[3]);
                }
                return color;
            }

            fn colorMapping(self: *@This(), n: f32, z: @Vector(2, f32)) @Vector(4, f32) {
                const iterations = self.params.iterations;
                const color_background = self.color_background;
                _ = z;
                var p: f32 = 1.0 - n / @as(f32, @floatFromInt(iterations));
                p = pow(p, 2.0);
                return mix(color_background, @Vector(4, f32){ 1.0, 1.0, 1.0, 1.0 }, p);
            }

            fn renderPoint(self: *@This(), p: @Vector(2, f32)) @Vector(4, f32) {
                const mandelbrot = self.params.mandelbrot;
                const power = self.params.power;
                const powerFineTune = self.params.powerFineTune;
                const mu = self.params.mu;
                const muFineTune = self.params.muFineTune;
                const iterations = self.params.iterations;
                const orbitTrap = self.params.orbitTrap;
                const orbitTrapEdgeDetail = self.params.orbitTrapEdgeDetail;
                const iterationColorBlend = self.params.iterationColorBlend;
                const rotate = self.params.rotate;
                const x1 = self.x1;
                const y1 = self.y1;
                const scale = self.scale;
                const minIterations = self.minIterations;
                const rotation = self.rotation;
                const color_background = self.color_background;
                var color: @Vector(4, f32) = color_background;
                color[3] = orbitTrapEdgeDetail;
                var z: @Vector(2, f32) = undefined;
                if (rotate != 0.0) {
                    z = @Vector(2, f32){ x1, y1 } + @"V * M"(p * scale, rotation);
                } else {
                    z = @Vector(2, f32){ x1, y1 } + p * scale;
                }
                const e: f32 = power + powerFineTune;
                const c: @Vector(2, f32) = if (mandelbrot) z else (mu + muFineTune);
                var n: i32 = 0;
                var blend: f32 = 1.0;
                while (n < iterations) {
                    z = complexPower(z, e) + c;
                    if (n >= minIterations) {
                        if (orbitTrap) {
                            color = self.orbitMapping(color, z / @as(@Vector(2, f32), @splat(2.0)));
                            if (color[3] > orbitTrapEdgeDetail) break;
                        } else if ((pow(z[0], 2.0) + pow(z[1], 2.0)) > BAILOUT) {
                            color = self.colorMapping(@as(f32, @floatFromInt(n)), z);
                            break;
                        }
                    }
                    n += 1;
                }
                if (iterationColorBlend > 0.0) {
                    blend = clamp(1.0 - (@as(f32, @floatFromInt(n - minIterations)) / @as(f32, @floatFromInt(iterations - minIterations))) * iterationColorBlend, 0.0, 1.0);
                }
                color = mix(color_background, color, color[3] * blend);
                return color;
            }

            pub fn evaluatePixel(self: *@This()) void {
                const antialiasing = self.params.antialiasing;
                const dst = self.output.dst;
                const sampleStep = self.sampleStep;
                const sampleContribution = self.sampleContribution;
                self.dst = @splat(0.0);

                var c: @Vector(4, f32) = .{ 0.0, 0.0, 0.0, 1.0 };
                if (antialiasing > 1) {
                    {
                        var i: f32 = 0.0;
                        while (i < 1.0) {
                            var j: f32 = 0.0;
                            while (j < 1.0) {
                                c += @as(@Vector(4, f32), @splat(sampleContribution)) * self.renderPoint(@Vector(2, f32){
                                    self.outCoord()[0] + i,
                                    self.outCoord()[1] + j,
                                });
                                j += sampleStep;
                            }
                            i += sampleStep;
                        }
                    }
                } else {
                    c = self.renderPoint(self.outCoord());
                }
                self.dst = c;

                dst.writePixel(self.outputCoord, self.dst);
            }

            // macros
            fn complexArg(z: @Vector(2, f32)) f32 {
                return atan2(z[1], z[0]);
            }

            fn polar(r: f32, a: f32) @Vector(2, f32) {
                return @Vector(2, f32){
                    cos(a) * r,
                    sin(a) * r,
                };
            }

            fn complexPower(z: @Vector(2, f32), p: f32) @Vector(2, f32) {
                return polar(pow(length(z), p), p * complexArg(z));
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

    fn atan2(v1: anytype, v2: anytype) @TypeOf(v1) {
        return switch (@typeInfo(@TypeOf(v1))) {
            .vector => calc: {
                var result: @TypeOf(v1) = undefined;
                inline for (0..@typeInfo(@TypeOf(v1)).vector.len) |i| {
                    result[i] = atan2(v1[i], v2[i]);
                }
                break :calc result;
            },
            else => switch (@typeInfo(@TypeOf(std.math.atan2)).@"fn".params.len) {
                2 => std.math.atan2(v1, v2),
                else => std.math.atan2(@TypeOf(v1), v1, v2),
            },
        };
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

    fn exp(v: anytype) @TypeOf(v) {
        return @exp(v);
    }

    fn log(v: anytype) @TypeOf(v) {
        return @log(v);
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

    fn mix(v1: anytype, v2: anytype, p: anytype) @TypeOf(v1) {
        return switch (@typeInfo(@TypeOf(p))) {
            .vector => v1 * (@as(@TypeOf(p), @splat(1)) - p) + v2 * p,
            else => switch (@typeInfo(@TypeOf(v1))) {
                .vector => mix(v1, v2, @as(@TypeOf(v1), @splat(p))),
                else => v1 * (1 - p) + v2 * p,
            },
        };
    }

    fn length(v: anytype) f32 {
        return switch (@typeInfo(@TypeOf(v))) {
            .vector => @sqrt(@reduce(.Add, v * v)),
            else => @abs(v),
        };
    }

    fn @"V * M"(v1: anytype, m2: anytype) @TypeOf(v1) {
        var result: @TypeOf(v1) = undefined;
        inline for (m2, 0..) |column, c| {
            result[c] = @reduce(.Add, column * v1);
        }
        return result;
    }

    fn floatVectorFromIntVector(v: anytype) @Vector(@typeInfo(@TypeOf(v)).vector.len, f32) {
        const len = @typeInfo(@TypeOf(v)).vector.len;
        var result: @Vector(len, f32) = undefined;
        inline for (0..len) |i| {
            result[i] = @floatFromInt(v[i]);
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
    const input_fields = std.meta.fields(@TypeOf(Kernel.inputImages));
    comptime var struct_fields: [input_fields.len]std.builtin.Type.StructField = undefined;
    inline for (input_fields, 0..) |field, index| {
        struct_fields[index] = .{
            .name = field.name,
            .type = zigar.image.Any(.ro),
            .default_value_ptr = null,
            .is_comptime = false,
            .alignment = @alignOf(zigar.image.Any(.ro)),
        };
    }
    return @Type(.{
        .@"struct" = .{
            .layout = .auto,
            .fields = &struct_fields,
            .decls = &.{},
            .is_tuple = false,
        },
    });
}

pub fn KernelInputImpl(comptime Impl: type, comptime Kernel: type) type {
    const input_fields = std.meta.fields(@TypeOf(Kernel.inputImages));
    comptime var struct_fields: [input_fields.len]std.builtin.Type.StructField = undefined;
    inline for (input_fields, 0..) |field, index| {
        const input = @field(Kernel.inputImages, field.name);
        const KernelImageImpl = KernelImage(Impl, input.channels, false);
        struct_fields[index] = .{
            .name = field.name,
            .type = KernelImageImpl,
            .default_value_ptr = null,
            .is_comptime = false,
            .alignment = @alignOf(KernelImageImpl),
        };
    }
    return @Type(.{
        .@"struct" = .{
            .layout = .auto,
            .fields = &struct_fields,
            .decls = &.{},
            .is_tuple = false,
        },
    });
}

pub fn KernelOutput(comptime Kernel: type) type {
    const output_fields = std.meta.fields(@TypeOf(Kernel.outputImages));
    comptime var struct_fields: [output_fields.len]std.builtin.Type.StructField = undefined;
    inline for (output_fields, 0..) |field, index| {
        struct_fields[index] = .{
            .name = field.name,
            .type = zigar.image.Any(.rw),
            .default_value_ptr = null,
            .is_comptime = false,
            .alignment = @alignOf(zigar.image.Any(.rw)),
        };
    }
    return @Type(.{
        .@"struct" = .{
            .layout = .auto,
            .fields = &struct_fields,
            .decls = &.{},
            .is_tuple = false,
        },
    });
}

pub fn KernelOutputImpl(comptime Impl: type, comptime Kernel: type) type {
    const output_fields = std.meta.fields(@TypeOf(Kernel.outputImages));
    comptime var struct_fields: [output_fields.len]std.builtin.Type.StructField = undefined;
    inline for (output_fields, 0..) |field, index| {
        const output = @field(Kernel.outputImages, field.name);
        const KernelImageImpl = KernelImage(Impl, output.channels, true);
        const default_value: KernelImageImpl = undefined;
        struct_fields[index] = .{
            .name = field.name,
            .type = KernelImageImpl,
            .default_value_ptr = @ptrCast(&default_value),
            .is_comptime = false,
            .alignment = @alignOf(KernelImageImpl),
        };
    }
    return @Type(.{
        .@"struct" = .{
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
                    .int, .float => 0,
                    .bool => false,
                    .vector => @splat(0),
                    else => @compileError("Unrecognized parameter type: " ++ @typeName(param.type)),
                },
            };
            break :get_def @ptrCast(&value);
        };
        struct_fields[index] = .{
            .name = field.name,
            .type = param.type,
            .default_value_ptr = default_value,
            .is_comptime = false,
            .alignment = @alignOf(param.type),
        };
    }
    return @Type(.{
        .@"struct" = .{
            .layout = .auto,
            .fields = &struct_fields,
            .decls = &.{},
            .is_tuple = false,
        },
    });
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
