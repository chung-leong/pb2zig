// Pixel Bender kernel "Hue" (translated using pb2zig)
const std = @import("std");

pub const kernel = struct {
    // kernel information
    pub const namespace = "Flame";
    pub const vendor = "Adobe";
    pub const version = 1;
    pub const description = "Hue blend mode";
    pub const parameters = .{};
    pub const inputImages = .{
        .dst = .{ .channels = 4 },
        .src = .{ .channels = 4 },
    };
    pub const outputImages = .{
        .result = .{ .channels = 4 },
    };

    // generic kernel instance type
    fn Instance(comptime InputStruct: type, comptime OutputStruct: type, comptime ParameterStruct: type) type {
        return struct {
            params: ParameterStruct,
            input: InputStruct,
            output: OutputStruct,
            outputCoord: @Vector(2, u32) = @splat(0),

            // output pixel
            result: @Vector(4, f32) = undefined,

            // functions defined in kernel
            pub fn evaluatePixel(self: *@This()) void {
                const dst = self.input.dst;
                const src = self.input.src;
                const result = self.output.result;
                self.result = @splat(0.0);

                const a: @Vector(4, f32) = dst.sampleNearest(self.outCoord());
                const b: @Vector(4, f32) = src.sampleNearest(self.outCoord());
                var cb: @Vector(3, f32) = undefined;
                var cs: @Vector(3, f32) = undefined;
                if (a[3] > 0.0) {
                    cb = @shuffle(f32, cb, @shuffle(f32, a, undefined, @Vector(3, i32){ 0, 1, 2 }) / @as(@Vector(3, f32), @splat(a[3])), @Vector(3, i32){ -1, -2, -3 });
                }
                if (b[3] > 0.0) {
                    cs = @shuffle(f32, cs, @shuffle(f32, b, undefined, @Vector(3, i32){ 0, 1, 2 }) / @as(@Vector(3, f32), @splat(b[3])), @Vector(3, i32){ -1, -2, -3 });
                }
                self.result[3] = (1.0 - b[3]) * a[3] + b[3];
                var color: @Vector(3, f32) = @shuffle(f32, cs, undefined, @Vector(3, i32){ 0, 1, 2 });
                const satVal: f32 = saturation(cb);
                if (color[0] <= color[1]) {
                    if (color[1] <= color[2]) {
                        color[1] -= color[0];
                        color[2] -= color[0];
                        color[0] = 0.0;
                        if (color[2] > 0.0) {
                            color[1] *= satVal / max(color[2], 0.0);
                            color[2] = satVal;
                        }
                    } else {
                        if (color[0] <= color[2]) {
                            color[2] -= color[0];
                            color[1] -= color[0];
                            color[0] = 0.0;
                            if (color[1] > 0.0) {
                                color[2] *= satVal / max(color[1], 0.0);
                                color[1] = satVal;
                            }
                        } else {
                            color[0] -= color[2];
                            color[1] -= color[2];
                            color[2] = 0.0;
                            if (color[1] > 0.0) {
                                color[0] *= satVal / max(color[1], 0.0);
                                color[1] = satVal;
                            }
                        }
                    }
                } else {
                    if (color[0] <= color[2]) {
                        color[0] -= color[1];
                        color[2] -= color[1];
                        color[1] = 0.0;
                        if (color[2] > 0.0) {
                            color[0] *= satVal / max(color[2], 0.0);
                            color[2] = satVal;
                        }
                    } else {
                        if (color[1] <= color[2]) {
                            color[2] -= color[1];
                            color[0] -= color[1];
                            color[1] = 0.0;
                            if (color[0] > 0.0) {
                                color[2] *= satVal / max(color[0], 0.0);
                                color[0] = satVal;
                            }
                        } else {
                            color[1] -= color[2];
                            color[0] -= color[2];
                            color[2] = 0.0;
                            if (color[0] > 0.0) {
                                color[1] *= satVal / max(color[0], 0.0);
                                color[0] = satVal;
                            }
                        }
                    }
                }
                const adjVec: @Vector(3, f32) = (cb - color);
                const adjustment: f32 = luminance(adjVec);
                const adjustedcs: @Vector(3, f32) = color + @as(@Vector(3, f32), @splat(adjustment));
                var color_cl: @Vector(3, f32) = adjustedcs;
                const lum_cl: f32 = luminance(color_cl);
                const lumVec: @Vector(3, f32) = .{
                    lum_cl,
                    lum_cl,
                    lum_cl,
                };
                var mini: f32 = min3v(color_cl);
                var maxi: f32 = max3v(color_cl);
                if (mini < 0.0) {
                    mini = lum_cl - mini;
                    color_cl = lumVec + (color_cl - lumVec) * @as(@Vector(3, f32), @splat(lum_cl)) / @as(@Vector(3, f32), @splat(max(mini, 0.0)));
                }
                if (maxi > 1.0) {
                    maxi = maxi - lum_cl;
                    color_cl = lumVec + (color_cl - lumVec) * @as(@Vector(3, f32), @splat((1.0 - lum_cl))) / @as(@Vector(3, f32), @splat(max(maxi, 0.0)));
                }
                self.result = @shuffle(f32, self.result, (@as(@Vector(3, f32), @splat((1.0 - b[3]))) * @shuffle(f32, a, undefined, @Vector(3, i32){ 0, 1, 2 })) + (@as(@Vector(3, f32), @splat((1.0 - a[3]))) * @shuffle(f32, b, undefined, @Vector(3, i32){ 0, 1, 2 })) + @as(@Vector(3, f32), @splat(b[3] * a[3])) * @shuffle(f32, color_cl, undefined, @Vector(3, i32){ 0, 1, 2 }), @Vector(4, i32){ -1, -2, -3, 3 });

                result.setPixel(self.outputCoord[0], self.outputCoord[1], self.result);
            }

            // macros
            fn max3(x: f32, y: f32, z: f32) f32 {
                return max(x, max(y, z));
            }

            fn min3(x: f32, y: f32, z: f32) f32 {
                return min(x, min(y, z));
            }

            fn max3v(C: @Vector(3, f32)) f32 {
                return max3((C[0]), (C[1]), (C[2]));
            }

            fn min3v(C: @Vector(3, f32)) f32 {
                return min3((C[0]), (C[1]), (C[2]));
            }

            fn saturation(C: @Vector(3, f32)) f32 {
                return ((max3((C[0]), (C[1]), (C[2])) - min3((C[0]), (C[1]), (C[2]))));
            }

            fn luminance(C: @Vector(3, f32)) f32 {
                return ((((C[0]) * 0.3) + ((C[1]) * 0.59) + ((C[2]) * 0.11)));
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
};

pub const Input = KernelInput(u8, kernel);
pub const Output = KernelOutput(u8, kernel);
pub const Parameters = KernelParameters(kernel);

pub fn createOutput(allocator: std.mem.Allocator, width: u32, height: u32, input: Input, params: Parameters) !Output {
    return createPartialOutput(allocator, width, height, 0, height, input, params);
}

pub fn createPartialOutput(allocator: std.mem.Allocator, width: u32, height: u32, start: u32, count: u32, input: Input, params: Parameters) !Output {
    var output: Output = undefined;
    inline for (std.meta.fields(Output)) |field| {
        const ImageT = @TypeOf(@field(output, field.name));
        @field(output, field.name) = .{
            .data = try allocator.alloc(ImageT.Pixel, count * width),
            .width = width,
            .height = height,
            .offset = start * width,
        };
    }
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
        offset: usize = 0,

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
            const index = (y * self.width) + x - self.offset;
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
            const index = (y * self.width) + x - self.offset;
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
            const value: param.type = if (@hasField(@TypeOf(param), "defaultValue"))
            param.defaultValue
            else switch (@typeInfo(param.type)) {
                .Int, .Float => 0,
                .Bool => false,
                .Vector => @splat(0),
                else => @compileError("Unrecognized parameter type: " ++ @typeName(param.type)),
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
