// Pixel Bender kernel "Dilate_circle" (translated using pb2zig)
const std = @import("std");

pub const kernel = struct {
    // kernel information
    pub const namespace = "com.gasubasu";
    pub const vendor = "gasubasu";
    pub const version = 1;
    pub const description = "flash compatible dilate filter 'circle'";
    pub const parameters = .{};
    pub const inputImages = .{
        .i = .{ .channels = 4 },
    };
    pub const outputImages = .{
        .o = .{ .channels = 4 },
    };

    // generic kernel instance type
    fn Instance(comptime InputStruct: type, comptime OutputStruct: type, comptime ParameterStruct: type) type {
        return struct {
            params: ParameterStruct,
            input: InputStruct,
            output: OutputStruct,
            outputCoord: @Vector(2, u32) = @splat(0),

            // output pixel
            o: @Vector(4, f32) = undefined,

            // functions defined in kernel
            pub fn evaluatePixel(self: *@This()) void {
                const i = self.input.i;
                const o = self.output.o;
                self.o = @splat(0.0);

                const c: @Vector(2, f32) = self.outCoord();
                var p: @Vector(2, f32) = undefined;
                var n: @Vector(4, f32) = undefined;
                self.o = @Vector(4, f32){ 0.0, 0.0, 0.0, 1.0 };
                p = @Vector(2, f32){ -2.0, -1.0 };
                n = i.sampleNearest(c + p);
                if (self.o[0] < n[0]) {
                    self.o[0] = n[0];
                }
                if (self.o[1] < n[1]) {
                    self.o[1] = n[1];
                }
                if (self.o[2] < n[2]) {
                    self.o[2] = n[2];
                }
                p = @Vector(2, f32){ -2.0, 0.0 };
                n = i.sampleNearest(c + p);
                if (self.o[0] < n[0]) {
                    self.o[0] = n[0];
                }
                if (self.o[1] < n[1]) {
                    self.o[1] = n[1];
                }
                if (self.o[2] < n[2]) {
                    self.o[2] = n[2];
                }
                p = @Vector(2, f32){ -2.0, 1.0 };
                n = i.sampleNearest(c + p);
                if (self.o[0] < n[0]) {
                    self.o[0] = n[0];
                }
                if (self.o[1] < n[1]) {
                    self.o[1] = n[1];
                }
                if (self.o[2] < n[2]) {
                    self.o[2] = n[2];
                }
                p = @Vector(2, f32){ 2.0, -1.0 };
                n = i.sampleNearest(c + p);
                if (self.o[0] < n[0]) {
                    self.o[0] = n[0];
                }
                if (self.o[1] < n[1]) {
                    self.o[1] = n[1];
                }
                if (self.o[2] < n[2]) {
                    self.o[2] = n[2];
                }
                p = @Vector(2, f32){ 2.0, 0.0 };
                n = i.sampleNearest(c + p);
                if (self.o[0] < n[0]) {
                    self.o[0] = n[0];
                }
                if (self.o[1] < n[1]) {
                    self.o[1] = n[1];
                }
                if (self.o[2] < n[2]) {
                    self.o[2] = n[2];
                }
                p = @Vector(2, f32){ 2.0, 1.0 };
                n = i.sampleNearest(c + p);
                if (self.o[0] < n[0]) {
                    self.o[0] = n[0];
                }
                if (self.o[1] < n[1]) {
                    self.o[1] = n[1];
                }
                if (self.o[2] < n[2]) {
                    self.o[2] = n[2];
                }
                p = @Vector(2, f32){ -1.0, -2.0 };
                n = i.sampleNearest(c + p);
                if (self.o[0] < n[0]) {
                    self.o[0] = n[0];
                }
                if (self.o[1] < n[1]) {
                    self.o[1] = n[1];
                }
                if (self.o[2] < n[2]) {
                    self.o[2] = n[2];
                }
                p = @Vector(2, f32){ 0.0, -2.0 };
                n = i.sampleNearest(c + p);
                if (self.o[0] < n[0]) {
                    self.o[0] = n[0];
                }
                if (self.o[1] < n[1]) {
                    self.o[1] = n[1];
                }
                if (self.o[2] < n[2]) {
                    self.o[2] = n[2];
                }
                p = @Vector(2, f32){ 1.0, -2.0 };
                n = i.sampleNearest(c + p);
                if (self.o[0] < n[0]) {
                    self.o[0] = n[0];
                }
                if (self.o[1] < n[1]) {
                    self.o[1] = n[1];
                }
                if (self.o[2] < n[2]) {
                    self.o[2] = n[2];
                }
                p = @Vector(2, f32){ -1.0, 2.0 };
                n = i.sampleNearest(c + p);
                if (self.o[0] < n[0]) {
                    self.o[0] = n[0];
                }
                if (self.o[1] < n[1]) {
                    self.o[1] = n[1];
                }
                if (self.o[2] < n[2]) {
                    self.o[2] = n[2];
                }
                p = @Vector(2, f32){ 0.0, 2.0 };
                n = i.sampleNearest(c + p);
                if (self.o[0] < n[0]) {
                    self.o[0] = n[0];
                }
                if (self.o[1] < n[1]) {
                    self.o[1] = n[1];
                }
                if (self.o[2] < n[2]) {
                    self.o[2] = n[2];
                }
                p = @Vector(2, f32){ 1.0, 2.0 };
                n = i.sampleNearest(c + p);
                if (self.o[0] < n[0]) {
                    self.o[0] = n[0];
                }
                if (self.o[1] < n[1]) {
                    self.o[1] = n[1];
                }
                if (self.o[2] < n[2]) {
                    self.o[2] = n[2];
                }

                o.setPixel(self.outputCoord[0], self.outputCoord[1], self.o);
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
            const numerator: FPixel = if (@hasDecl(std.math, "fabs")) switch (len) {
                // Zig 0.11.0
                1 => .{
                    @floatFromInt(pixel[0]),
                },
                2 => .{
                    @floatFromInt(pixel[0]),
                    @floatFromInt(pixel[3]),
                },
                3 => .{
                    @floatFromInt(pixel[0]),
                    @floatFromInt(pixel[1]),
                    @floatFromInt(pixel[2]),
                },
                4 => .{
                    @floatFromInt(pixel[0]),
                    @floatFromInt(pixel[1]),
                    @floatFromInt(pixel[2]),
                    @floatFromInt(pixel[3]),
                },
                else => @compileError("Unsupported number of channels: " ++ len),
            } else switch (len) {
                // Zig 0.12.0
                1 => @floatFromInt(@shuffle(T, pixel, undefined, @Vector(1, i32){0})),
                2 => @floatFromInt(@shuffle(T, pixel, undefined, @Vector(2, i32){ 0, 3 })),
                3 => @floatFromInt(@shuffle(T, pixel, undefined, @Vector(3, i32){ 0, 1, 2 })),
                4 => @floatFromInt(pixel),
                else => @compileError("Unsupported number of channels: " ++ len),
            };
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
            const max: f32 = @floatFromInt(std.math.maxInt(T));
            const multiplier: FPixel = @splat(max);
            const product: FPixel = constrain(pixel * multiplier, max);
            const maxAlpha: @Vector(1, f32) = .{std.math.maxInt(T)};
            return if (@hasDecl(std.math, "fabs")) switch (len) {
                // Zig 0.11.0
                1 => .{
                    @intFromFloat(product[0]),
                    @intFromFloat(product[0]),
                    @intFromFloat(product[0]),
                    maxAlpha[0],
                },
                2 => .{
                    @intFromFloat(product[0]),
                    @intFromFloat(product[0]),
                    @intFromFloat(product[0]),
                    @intFromFloat(product[1]),
                },
                3 => .{
                    @intFromFloat(product[0]),
                    @intFromFloat(product[1]),
                    @intFromFloat(product[2]),
                    maxAlpha[0],
                },
                4 => .{
                    @intFromFloat(product[0]),
                    @intFromFloat(product[1]),
                    @intFromFloat(product[2]),
                    @intFromFloat(product[3]),
                },
                else => @compileError("Unsupported number of channels: " ++ len),
            } else switch (len) {
                // Zig 0.12.0
                1 => @intFromFloat(@shuffle(f32, product, maxAlpha, @Vector(4, i32){ 0, 0, 0, -1 })),
                2 => @intFromFloat(@shuffle(f32, product, undefined, @Vector(4, i32){ 0, 0, 0, 1 })),
                3 => @intFromFloat(@shuffle(f32, product, maxAlpha, @Vector(4, i32){ 0, 1, 2, -1 })),
                4 => @intFromFloat(product),
                else => @compileError("Unsupported number of channels: " ++ len),
            };
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
