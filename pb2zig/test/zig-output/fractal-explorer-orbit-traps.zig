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
            outputCoord: @Vector(2, u32) = @splat(0),

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

                dst.setPixel(self.outputCoord[0], self.outputCoord[1], self.dst);
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

    fn atan2(v1: anytype, v2: anytype) @TypeOf(v1) {
        return switch (@typeInfo(@TypeOf(v1))) {
            .Vector => calc: {
                var result: @TypeOf(v1) = undefined;
                inline for (0..@typeInfo(@TypeOf(v1)).Vector.len) |i| {
                    result[i] = atan2(v1[i], v2[i]);
                }
                break :calc result;
            },
            else => switch (@typeInfo(@TypeOf(std.math.atan2)).Fn.params.len) {
                2 => std.math.atan2(v1, v2),
                else => std.math.atan2(@TypeOf(v1), v1, v2),
            },
        };
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

    fn exp(v: anytype) @TypeOf(v) {
        return @exp(v);
    }

    fn log(v: anytype) @TypeOf(v) {
        return @log(v);
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

    fn mix(v1: anytype, v2: anytype, p: anytype) @TypeOf(v1) {
        return switch (@typeInfo(@TypeOf(p))) {
            .Vector => v1 * (@as(@TypeOf(p), @splat(1)) - p) + v2 * p,
            else => switch (@typeInfo(@TypeOf(v1))) {
                .Vector => mix(v1, v2, @as(@TypeOf(v1), @splat(p))),
                else => v1 * (1 - p) + v2 * p,
            },
        };
    }

    fn length(v: anytype) f32 {
        return switch (@typeInfo(@TypeOf(v))) {
            .Vector => @sqrt(@reduce(.Add, v * v)),
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

    fn floatVectorFromIntVector(v: anytype) @Vector(@typeInfo(@TypeOf(v)).Vector.len, f32) {
        const len = @typeInfo(@TypeOf(v)).Vector.len;
        var result: @Vector(len, f32) = undefined;
        inline for (0..len) |i| {
            result[i] = @floatFromInt(v[i]);
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
    const Promise = zigar.function.Promise(OutputError!Output);
    const AbortSignal = zigar.function.AbortSignal;
    const JobQueue = zigar.thread.JobQueue;

    pub const OutputError = error{
        OutOfMemory,
        NoThreadsAvailable,
        Aborted,
    };

    var job_queue: JobQueue(.{
        .create = createOutputInThreads,
        .stop = stopThreadPoolInThread,
    }) = undefined;
    var thread_pool: std.Thread.Pool = undefined;
    var thread_count: u32 = 0;
    var thread_start_count: u32 = 0;

    pub fn startThreadPool(count: u32) !void {
        thread_start_count += 1;
        if (thread_start_count == 1) {
            const allocator = zigar.mem.getDefaultAllocator();
            try zigar.thread.use(true);
            if (count > 1) {
                try job_queue.init(allocator, &thread_pool);
                try thread_pool.init(.{ .n_jobs = count, .allocator = allocator });
            } else {
                try job_queue.init(allocator, null);
            }
            thread_count = count;
        }
    }

    pub fn stopThreadPool() !void {
        if (thread_start_count == 0) {
            return;
        }
        thread_start_count -= 1;
        if (thread_start_count == 0) {
            thread_count = 0;
            // remove queued jobs and detached thread pool
            if (job_queue.detach()) {
                // use helper thread to shut down thread pool
                try job_queue.push(.stop, .{});
            }
            job_queue.deinit();
            try zigar.thread.use(false);
        }
    }

    fn stopThreadPoolInThread() void {
        thread_pool.deinit();
    }

    pub fn createOutputAsync(allocator: Allocator, promise: Promise, signal: AbortSignal, width: u32, height: u32, input: Input, params: Parameters) !void {
        if (thread_count == 0) {
            return OutputError.NoThreadsAvailable;
        }
        return job_queue.push(.create, .{ allocator, promise, signal, width, height, input, params });
    }

    fn createOutputInThreads(allocator: Allocator, promise: Promise, signal: AbortSignal, width: u32, height: u32, input: Input, params: Parameters) void {
        var output: Output = undefined;
        const fields = std.meta.fields(Output);
        inline for (fields, 0..) |field, i| {
            const ImageT = @TypeOf(@field(output, field.name));
            const data = allocator.alloc(ImageT.Pixel, width * height) catch {
                inline for (0..i) |j| {
                    allocator.free(@field(output, fields[j].name).data);
                }
                promise.resolve(OutputError.OutOfMemory);
                return;
            };
            @field(output, field.name) = .{
                .data = data,
                .width = width,
                .height = height,
            };
        }
        const scanlines: u32 = if (thread_count > 0) height / thread_count else 0;
        if (thread_count > 1 and scanlines > 0) {
            const child_count: u32 = thread_count - 1;
            var wg: std.Thread.WaitGroup = .{};
            var thread_num: u32 = 0;
            while (thread_num < child_count) : (thread_num += 1) {
                thread_pool.spawnWg(&wg, processSlice, .{
                    signal,
                    width,
                    scanlines * thread_num,
                    scanlines,
                    input,
                    output,
                    params,
                });
            }
            const remaining_start = scanlines * child_count;
            const remaining_count = height - remaining_start;
            processSlice(signal, width, remaining_start, remaining_count, input, output, params);
            wg.wait();
        } else {
            processSlice(signal, width, 0, height, input, output, params);
        }
        if (signal.off()) {
            promise.resolve(output);
        } else {
            inline for (std.meta.fields(Output)) |field| {
                allocator.free(@field(output, field.name).data);
            }
            promise.resolve(OutputError.Aborted);
        }
    }

    fn processSlice(signal: AbortSignal, width: u32, start: u32, count: u32, input: Input, output: Output, params: Parameters) void {
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
                if (signal.on()) return;
            }
        }
    }
};
