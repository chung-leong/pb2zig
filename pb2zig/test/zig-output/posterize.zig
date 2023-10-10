// Pixel Bender kernel "Posterizer" (translated using pb2zig)
const std = @import("std");

pub const kernel = struct {
    // kernel information
    pub const namespace = "Posterizer";
    pub const vendor = "Petri Leskinen";
    pub const version = 1;
    pub const description = "Posterizes an image using 2 to 8 specified colors";
    pub const parameters = .{
        .color1 = .{
            .type = @Vector(4, f32),
            .minValue = @as(@Vector(4, f32), @splat(0.0)),
            .maxValue = @as(@Vector(4, f32), @splat(1.0)),
            .defaultValue = .{
                0.441,
                0.5859375,
                0.62109375,
                1,
            },
            .parameterType = "colorRGBA",
        },
        .color2 = .{
            .type = @Vector(4, f32),
            .minValue = @as(@Vector(4, f32), @splat(0.0)),
            .maxValue = @as(@Vector(4, f32), @splat(1.0)),
            .defaultValue = .{
                0.839,
                0.101,
                0.1289,
                1,
            },
            .parameterType = "colorRGBA",
        },
        .color3 = .{
            .type = @Vector(4, f32),
            .minValue = @as(@Vector(4, f32), @splat(0.0)),
            .maxValue = @as(@Vector(4, f32), @splat(1.0)),
            .defaultValue = .{ 0, 0.195, 0.3, 1 },
            .parameterType = "colorRGBA",
        },
        .color4 = .{
            .type = @Vector(4, f32),
            .minValue = @as(@Vector(4, f32), @splat(0.0)),
            .maxValue = @as(@Vector(4, f32), @splat(1.0)),
            .defaultValue = .{
                0.983,
                0.89,
                0.656,
                1,
            },
            .parameterType = "colorRGBA",
        },
        .color5 = .{
            .type = @Vector(4, f32),
            .minValue = @as(@Vector(4, f32), @splat(0.0)),
            .maxValue = @as(@Vector(4, f32), @splat(1.0)),
            .defaultValue = .{ 0, 0, 0, 1 },
            .parameterType = "colorRGBA",
        },
        .color6 = .{
            .type = @Vector(4, f32),
            .minValue = @as(@Vector(4, f32), @splat(0.0)),
            .maxValue = @as(@Vector(4, f32), @splat(1.0)),
            .defaultValue = .{ 1, 0, 0, 1 },
            .parameterType = "colorRGBA",
        },
        .color7 = .{
            .type = @Vector(4, f32),
            .minValue = @as(@Vector(4, f32), @splat(0.0)),
            .maxValue = @as(@Vector(4, f32), @splat(1.0)),
            .defaultValue = .{ 0, 1, 0, 1 },
            .parameterType = "colorRGBA",
        },
        .color8 = .{
            .type = @Vector(4, f32),
            .minValue = @as(@Vector(4, f32), @splat(0.0)),
            .maxValue = @as(@Vector(4, f32), @splat(1.0)),
            .defaultValue = .{ 0, 0, 1, 1 },
            .parameterType = "colorRGBA",
        },
        .numColors = .{
            .type = i32,
            .minValue = 2,
            .maxValue = 8,
            .defaultValue = 4,
        },
        .blur = .{
            .type = f32,
            .minValue = 0.0,
            .maxValue = 4.0,
            .defaultValue = 0.5,
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

            // functions defined in kernel
            pub fn evaluatePixel(self: *@This()) void {
                const color1 = self.params.color1;
                const color2 = self.params.color2;
                const color3 = self.params.color3;
                const color4 = self.params.color4;
                const color5 = self.params.color5;
                const color6 = self.params.color6;
                const color7 = self.params.color7;
                const color8 = self.params.color8;
                const numColors = self.params.numColors;
                const blur = self.params.blur;
                const src = self.input.src;
                const dst = self.output.dst;
                self.dst = @splat(0.0);

                var dist: f32 = undefined;
                var minDist: f32 = undefined;
                var tmp: f32 = undefined;
                var po: @Vector(4, f32) = src.sampleLinear(self.outCoord());
                po += src.sampleLinear(self.outCoord() + @Vector(2, f32){ blur, 0 }) + src.sampleLinear(self.outCoord() + @Vector(2, f32){ -blur, 0 });
                po += src.sampleLinear(self.outCoord() + @Vector(2, f32){ 0, blur }) + src.sampleLinear(self.outCoord() + @Vector(2, f32){ 0, -blur });
                if (po[3] < 0.01) {
                    self.dst = @Vector(4, f32){ 0.0, 0.0, 0.0, 0.0 };
                } else {
                    po /= @as(@Vector(4, f32), @splat(po[3]));
                    self.dst = color1;
                    tmp = po[0] - self.dst[0];
                    const tmp1 = tmp;
                    tmp = po[1] - self.dst[1];
                    const tmp2 = tmp;
                    tmp = po[2] - self.dst[2];
                    const tmp3 = tmp;
                    minDist = tmp1 * tmp1 + tmp2 * tmp2 + tmp3 * tmp3;
                    tmp = po[0] - color2[0];
                    const tmp4 = tmp;
                    tmp = po[1] - color2[1];
                    const tmp5 = tmp;
                    tmp = po[2] - color2[2];
                    const tmp6 = tmp;
                    dist = tmp4 * tmp4 + tmp5 * tmp5 + tmp6 * tmp6;
                    const tmp7 = dist;
                    if (tmp7 < minDist) {
                        minDist = dist;
                        self.dst = color2;
                    }
                    tmp = po[0] - color3[0];
                    const tmp8 = tmp;
                    tmp = po[1] - color3[1];
                    const tmp9 = tmp;
                    tmp = po[2] - color3[2];
                    const tmp10 = tmp;
                    dist = tmp8 * tmp8 + tmp9 * tmp9 + tmp10 * tmp10;
                    const tmp11 = dist;
                    if (numColors > 2 and tmp11 < minDist) {
                        minDist = dist;
                        self.dst = color3;
                    }
                    tmp = po[0] - color4[0];
                    const tmp12 = tmp;
                    tmp = po[1] - color4[1];
                    const tmp13 = tmp;
                    tmp = po[2] - color4[2];
                    const tmp14 = tmp;
                    dist = tmp12 * tmp12 + tmp13 * tmp13 + tmp14 * tmp14;
                    const tmp15 = dist;
                    if (numColors > 3 and tmp15 < minDist) {
                        minDist = dist;
                        self.dst = color4;
                    }
                    tmp = po[0] - color5[0];
                    const tmp16 = tmp;
                    tmp = po[1] - color5[1];
                    const tmp17 = tmp;
                    tmp = po[2] - color5[2];
                    const tmp18 = tmp;
                    dist = tmp16 * tmp16 + tmp17 * tmp17 + tmp18 * tmp18;
                    const tmp19 = dist;
                    if (numColors > 4 and tmp19 < minDist) {
                        minDist = dist;
                        self.dst = color5;
                    }
                    tmp = po[0] - color6[0];
                    const tmp20 = tmp;
                    tmp = po[1] - color6[1];
                    const tmp21 = tmp;
                    tmp = po[2] - color6[2];
                    const tmp22 = tmp;
                    dist = tmp20 * tmp20 + tmp21 * tmp21 + tmp22 * tmp22;
                    const tmp23 = dist;
                    if (numColors > 5 and tmp23 < minDist) {
                        minDist = dist;
                        self.dst = color6;
                    }
                    tmp = po[0] - color7[0];
                    const tmp24 = tmp;
                    tmp = po[1] - color7[1];
                    const tmp25 = tmp;
                    tmp = po[2] - color7[2];
                    const tmp26 = tmp;
                    dist = tmp24 * tmp24 + tmp25 * tmp25 + tmp26 * tmp26;
                    const tmp27 = dist;
                    if (numColors > 6 and tmp27 < minDist) {
                        minDist = dist;
                        self.dst = color7;
                    }
                    tmp = po[0] - color8[0];
                    const tmp28 = tmp;
                    tmp = po[1] - color8[1];
                    const tmp29 = tmp;
                    tmp = po[2] - color8[2];
                    const tmp30 = tmp;
                    dist = tmp28 * tmp28 + tmp29 * tmp29 + tmp30 * tmp30;
                    const tmp31 = dist;
                    if (numColors > 7 and tmp31 < minDist) {
                        self.dst = color8;
                    }
                }

                dst.setPixel(self.outputCoord[0], self.outputCoord[1], self.dst);
            }

            pub fn outCoord(self: *@This()) @Vector(2, f32) {
                return @as(@Vector(2, f32), @floatFromInt(self.outputCoord)) + @as(@Vector(2, f32), @splat(0.5));
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
};

pub const Input = KernelInput(u8, kernel);
pub const Output = KernelOutput(u8, kernel);
pub const Parameters = KernelParameters(kernel);

pub fn createOutput(allocator: std.mem.Allocator, width: u32, height: u32, input: Input, params: Parameters) !Output {
    return createPartialOutputOf(u8, allocator, width, height, 0, height, input, params);
}

pub fn createPartialOutput(allocator: std.mem.Allocator, width: u32, height: u32, start: u32, count: u32, input: Input, params: Parameters) !Output {
    return createPartialOutputOf(u8, allocator, width, height, start, count, input, params);
}

fn createPartialOutputOf(comptime T: type, allocator: std.mem.Allocator, width: u32, height: u32, start: u32, count: u32, input: KernelInput(T, kernel), params: Parameters) !KernelOutput(u8, kernel) {
    var output: KernelOutput(u8, kernel) = undefined;
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
    instance.outputCoord[1] = start;
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
        premultiplied: bool = false,
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

        fn contrain(pixel: FPixel, max: f32) FPixel {
            const lower: FPixel = @splat(0);
            const upper: FPixel = @splat(max);
            const pixel2 = @select(f32, pixel > lower, pixel, lower);
            const pixel3 = @select(f32, pixel2 < upper, pixel2, upper);
            return pixel3;
        }

        fn intPixelFromPBPixel(pixel: FPixel) Pixel {
            const max: f32 = @floatFromInt(std.math.maxInt(T));
            const multiplier: FPixel = @splat(max);
            const product: FPixel = contrain(pixel * multiplier, max);
            const maxAlpha: @Vector(1, f32) = .{std.math.maxInt(T)};
            const result: Pixel = switch (len) {
                1 => @intFromFloat(@shuffle(f32, product, maxAlpha, @Vector(4, i32){ 0, 0, 0, -1 })),
                2 => @intFromFloat(@shuffle(f32, product, undefined, @Vector(4, i32){ 0, 0, 0, 1 })),
                3 => @intFromFloat(@shuffle(f32, product, maxAlpha, @Vector(4, i32){ 0, 1, 2, -1 })),
                4 => @intFromFloat(product),
                else => @compileError("Unsupported number of channels: " ++ len),
            };
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
            .layout = .Auto,
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
            .layout = .Auto,
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
            .layout = .Auto,
            .fields = &struct_fields,
            .decls = &.{},
            .is_tuple = false,
        },
    });
}
