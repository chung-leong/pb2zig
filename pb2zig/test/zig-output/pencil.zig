// Pixel Bender kernel "Pencil" (translated using pb2zig)
const std = @import("std");

pub const kernel = struct {
    // kernel information
    pub const namespace = "ar.shader.pencil";
    pub const vendor = "Alan Ross";
    pub const version = 1;
    pub const description = "Pencil";
    pub const parameters = .{
        .n0 = .{
            .type = f32,
            .minValue = 0.0,
            .maxValue = 100.0,
            .defaultValue = 97.0,
        },
        .n1 = .{
            .type = f32,
            .minValue = 0.0,
            .maxValue = 100.0,
            .defaultValue = 15.0,
        },
        .n2 = .{
            .type = f32,
            .minValue = 0.0,
            .maxValue = 100.0,
            .defaultValue = 97.0,
        },
        .n3 = .{
            .type = f32,
            .minValue = 0.0,
            .maxValue = 10.0,
            .defaultValue = 9.7,
        },
    };
    pub const inputImages = .{
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
                const n0 = self.params.n0;
                const n1 = self.params.n1;
                const n2 = self.params.n2;
                const n3 = self.params.n3;
                const src = self.input.src;
                const result = self.output.result;
                self.result = @splat(0.0);

                const p: @Vector(2, f32) = self.outCoord();
                var offset: @Vector(2, f32) = undefined;
                var dist: f32 = undefined;
                var temp: f32 = undefined;
                var c: @Vector(4, f32) = undefined;
                var m: @Vector(4, f32) = undefined;
                var p0: @Vector(4, f32) = undefined;
                var p1: @Vector(4, f32) = undefined;
                var p2: @Vector(4, f32) = undefined;
                var p3: @Vector(4, f32) = undefined;
                var p4: @Vector(4, f32) = undefined;
                var p5: @Vector(4, f32) = undefined;
                var p6: @Vector(4, f32) = undefined;
                var p7: @Vector(4, f32) = undefined;
                var p8: @Vector(4, f32) = undefined;
                dist = n3;
                offset[0] = 0.0;
                offset[1] = 0.0;
                p0 = src.sampleNearest(p + offset);
                offset[0] = -dist;
                offset[1] = -dist;
                p1 = src.sampleNearest(p + offset);
                offset[0] = dist;
                offset[1] = -dist;
                p2 = src.sampleNearest(p + offset);
                offset[0] = dist;
                offset[1] = dist;
                p3 = src.sampleNearest(p + offset);
                offset[0] = -dist;
                offset[1] = dist;
                dist = n3 * 2.0;
                p4 = src.sampleNearest(p + offset);
                offset[0] = -dist;
                offset[1] = -dist;
                p5 = src.sampleNearest(p + offset);
                offset[0] = dist;
                offset[1] = -dist;
                p6 = src.sampleNearest(p + offset);
                offset[0] = dist;
                offset[1] = dist;
                p7 = src.sampleNearest(p + offset);
                offset[0] = -dist;
                offset[1] = dist;
                p8 = src.sampleNearest(p + offset);
                m = ((p0 * @as(@Vector(4, f32), @splat(n2))) + (p1 * @as(@Vector(4, f32), @splat(n0))) + (p2 * @as(@Vector(4, f32), @splat(n0))) + (p3 * @as(@Vector(4, f32), @splat(n0))) + (p4 * @as(@Vector(4, f32), @splat(n0))) + (p5 * @as(@Vector(4, f32), @splat(n1))) + (p6 * @as(@Vector(4, f32), @splat(n1))) + (p7 * @as(@Vector(4, f32), @splat(n1))) + (p8 * @as(@Vector(4, f32), @splat(n1)))) / @as(@Vector(4, f32), @splat((n2 + (4.0 * n0) + (4.0 * n1))));
                temp = (p0[0] + p0[1] + p0[2]) / 3.0;
                p0[2] = temp;
                const tmp1 = p0[2];
                p0[1] = tmp1;
                const tmp2 = p0[1];
                p0[0] = tmp2;
                temp = (m[0] + m[1] + m[2]) / 3.0;
                m[2] = temp;
                const tmp3 = m[2];
                m[1] = tmp3;
                const tmp4 = m[1];
                m[0] = tmp4;
                m[0] = 1.0 - m[0];
                m[1] = 1.0 - m[1];
                m[2] = 1.0 - m[2];
                if (m[0] >= 0.9995) {
                    c[0] = 1.0;
                } else {
                    c[0] = min(p0[0] * 1.0 / (1.0 - m[0]), 1.0);
                }
                if (m[1] >= 0.9995) {
                    c[1] = 1.0;
                } else {
                    c[1] = min(p0[1] * 1.0 / (1.0 - m[1]), 1.0);
                }
                if (m[2] >= 0.9995) {
                    c[2] = 1.0;
                } else {
                    c[2] = min(p0[2] * 1.0 / (1.0 - m[2]), 1.0);
                }
                c[3] = 1.0;
                self.result = c;

                result.setPixel(self.outputCoord[0], self.outputCoord[1], self.result);
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
};

pub const Input = KernelInput(u8, kernel);
pub const Output = KernelOutput(u8, kernel);
pub const Parameters = KernelParameters(kernel);

// support both 0.11 and 0.12
const enum_auto = if (@hasField(std.builtin.Type.ContainerLayout, "Auto")) .Auto else .auto;

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
            // requires newest version of zig, which has issues
            //
            // const numerator: FPixel = switch (len) {
                //     1 => @floatFromInt(@shuffle(T, pixel, undefined, @Vector(1, i32){0})),
                //     2 => @floatFromInt(@shuffle(T, pixel, undefined, @Vector(2, i32){ 0, 3 })),
                //     3 => @floatFromInt(@shuffle(T, pixel, undefined, @Vector(3, i32){ 0, 1, 2 })),
                //     4 => @floatFromInt(pixel),
                //     else => @compileError("Unsupported number of channels: " ++ len),
                // };
            // const denominator: FPixel = @splat(@floatFromInt(std.math.maxInt(T)));
            // return numerator / denominator;
            var numerator: FPixel = undefined;
            switch (len) {
                1 => numerator[0] = @floatFromInt(pixel[0]),
                2 => {
                    numerator[0] = @floatFromInt(pixel[0]);
                    numerator[3] = @floatFromInt(pixel[3]);
                },
                3 => {
                    numerator[0] = @floatFromInt(pixel[0]);
                    numerator[1] = @floatFromInt(pixel[1]);
                    numerator[2] = @floatFromInt(pixel[2]);
                },
                4 => {
                    numerator[0] = @floatFromInt(pixel[0]);
                    numerator[1] = @floatFromInt(pixel[1]);
                    numerator[2] = @floatFromInt(pixel[2]);
                    numerator[3] = @floatFromInt(pixel[3]);
                },
                else => @compileError("Unsupported number of channels: " ++ len),
            }
            const denominator: FPixel = @splat(@floatFromInt(std.math.maxInt(T)));
            return numerator / denominator;
        }

        fn constrain(pixel: FPixel, max: f32) FPixel {
            const lower: FPixel = @splat(0);
            const upper: FPixel = @splat(max);
            const pixel2 = @select(f32, pixel > lower, pixel, lower);
            const pixel3 = @select(f32, pixel2 < upper, pixel2, upper);
            return pixel3;
        }

        fn intPixelFromPBPixel(pixel: FPixel) Pixel {
            // const max: f32 = @floatFromInt(std.math.maxInt(T));
            // const multiplier: FPixel = @splat(max);
            // const product: FPixel = constrain(pixel * multiplier, max);
            // const maxAlpha: @Vector(1, f32) = .{std.math.maxInt(T)};
            // const result: Pixel = switch (len) {
                //     1 => @intFromFloat(@shuffle(f32, product, maxAlpha, @Vector(4, i32){ 0, 0, 0, -1 })),
                //     2 => @intFromFloat(@shuffle(f32, product, undefined, @Vector(4, i32){ 0, 0, 0, 1 })),
                //     3 => @intFromFloat(@shuffle(f32, product, maxAlpha, @Vector(4, i32){ 0, 1, 2, -1 })),
                //     4 => @intFromFloat(product),
                //     else => @compileError("Unsupported number of channels: " ++ len),
                // };
            // return result;
            const max: f32 = @floatFromInt(std.math.maxInt(T));
            const multiplier: FPixel = @splat(max);
            const product: FPixel = constrain(pixel * multiplier, max);
            var result: Pixel = undefined;
            switch (len) {
                1 => {
                    result[0] = @intFromFloat(product[0]);
                    result[1] = @intFromFloat(product[0]);
                    result[2] = @intFromFloat(product[0]);
                    result[3] = std.math.maxInt(T);
                },
                2 => {
                    result[0] = @intFromFloat(product[0]);
                    result[1] = @intFromFloat(product[0]);
                    result[2] = @intFromFloat(product[0]);
                    result[3] = @intFromFloat(product[1]);
                },
                3 => {
                    result[0] = @intFromFloat(product[0]);
                    result[1] = @intFromFloat(product[1]);
                    result[2] = @intFromFloat(product[2]);
                    result[3] = std.math.maxInt(T);
                },
                4 => {
                    result[0] = @intFromFloat(product[0]);
                    result[1] = @intFromFloat(product[1]);
                    result[2] = @intFromFloat(product[2]);
                    result[3] = @intFromFloat(product[3]);
                },
                else => @compileError("Unsupported number of channels: " ++ len),
            }
            return result;
        }

        inline fn unsign(value: i32) u32 {
            // allow negative values to be interpreted as large integers to simplify bound-checking
            @setRuntimeSafety(false);
            return @as(u32, @intCast(value));
        }

        fn getPixel(self: @This(), ix: i32, iy: i32) FPixel {
            const x = unsign(ix);
            const y = unsign(iy);
            if (x >= self.width or y >= self.height) {
                return @as(FPixel, @splat(0));
            }
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

        fn sampleNearest(self: @This(), coord: @Vector(2, f32)) FPixel {
            const x: i32 = @intFromFloat(coord[0]);
            const y: i32 = @intFromFloat(coord[1]);
            return self.getPixel(x, y);
        }

        fn sampleLinear(self: @This(), coord: @Vector(2, f32)) FPixel {
            const c = coord - @as(@Vector(2, f32), @splat(0.5));
            const x: i32 = @intFromFloat(c[0]);
            const y: i32 = @intFromFloat(c[1]);
            const f0 = c - @floor(c);
            const f1 = @as(@Vector(2, f32), @splat(1)) - f0;
            const w: @Vector(4, f32) = .{
                f1[0] * f1[1],
                f0[0] * f1[1],
                f1[0] * f0[1],
                f0[0] * f0[1],
            };
            const p00 = self.getPixel(x, y);
            const p01 = self.getPixel(x, y + 1);
            const p10 = self.getPixel(x + 1, y);
            const p11 = self.getPixel(x + 1, y + 1);
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
            .layout = enum_auto,
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
            .layout = enum_auto,
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
            .layout = enum_auto,
            .fields = &struct_fields,
            .decls = &.{},
            .is_tuple = false,
        },
    });
}
