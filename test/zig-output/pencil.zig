
// Pixel Bender "Pencil" (translated using pb2zig)
// namespace: ar.shader.pencil
// vendor: Alan Ross
// version: 1
// description: Pencil

const std = @import("std");

pub const kernel = struct {
    // kernel information
    pub const parameters = .{
        .n0 = .{
            .type = f32,
            .min_value = 0.0,
            .max_value = 100.0,
            .default_value = 97.0,
        },
        .n1 = .{
            .type = f32,
            .min_value = 0.0,
            .max_value = 100.0,
            .default_value = 15.0,
        },
        .n2 = .{
            .type = f32,
            .min_value = 0.0,
            .max_value = 100.0,
            .default_value = 97.0,
        },
        .n3 = .{
            .type = f32,
            .min_value = 0.0,
            .max_value = 10.0,
            .default_value = 9.7,
        },
    };
    pub const input = .{
        .src = .{ .channels = 4 },
    };
    pub const output = .{
        .result = .{ .channels = 4 },
    };
    
    // generic kernel instance type
    fn Instance(comptime InputStruct: type) type {
        return struct {
            // parameter and input image fields
            n0: f32,
            n1: f32,
            n2: f32,
            n3: f32,
            src: std.meta.fieldInfo(InputStruct, .src).type,
            
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
            
            // functions defined in kernel
            pub fn evaluatePixel(self: @This(), outCoord: @Vector(2, f32)) @Vector(4, f32) {
                // input variables
                const n0 = self.n0;
                const n1 = self.n1;
                const n2 = self.n2;
                const n3 = self.n3;
                const src = self.src;
                
                // output variable
                var result: @Vector(4, f32) = undefined;
                
                var p: @Vector(2, f32) = outCoord;
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
                result = c;
                return result;
            }
        };
    }
    
    // kernel instance creation function
    pub fn create(inputStruct: anytype) Instance(@TypeOf(inputStruct)) {
        var instance: Instance(@TypeOf(inputStruct)) = undefined;
        inline for (std.meta.fields(@TypeOf(inputStruct))) |field| {
            @field(instance, field.name) = @field(inputStruct, field.name);
        }
        return instance;
    }
};

pub const Input = KernelInput(u8, kernel);
pub const Output = KernelOutput(u8, kernel);

pub fn apply(input: Input, output: Output) void {
    processImage(kernel, input, output);
}

pub fn Image(comptime T: type, comptime len: comptime_int, comptime writable: bool) type {
    return struct {
        pub const Pixel = @Vector(len, T);
        pub const FPixel = @Vector(len, f32);
        pub const channels = len;
        
        pixels: if (writable) []Pixel else []const Pixel,
        width: u32,
        height: u32,
        
        pub fn create(allocator: std.mem.Allocator, width: u32, height: u32) !@This() {
            return .{
                .pixels = try allocator.alloc(Pixel, width * height),
                .width = width,
                .height = height,
            };
        }
        
        inline fn toUnsigned(value: f32) u32 {
            // allow negative value to be interpreted as large integers
            // to simplify bound-checking
            @setRuntimeSafety(false);
            return @intFromFloat(value);
        }
        
        fn contrain(pixel: FPixel, max: f32) FPixel {
            const lower: FPixel = @splat(0);
            const upper: FPixel = @splat(max);
            const pixel2 = @select(f32, pixel > lower, pixel, lower);
            const pixel3 = @select(f32, pixel2 < upper, pixel2, upper);
            return pixel3;
        }
        
        fn floatPixelFromInt(pixel: Pixel) FPixel {
            // https://github.com/ziglang/zig/issues/16267
            var numerator: FPixel = undefined;
            comptime var i = 0;
            inline while (i < len) : (i += 1) {
                numerator[i] = @floatFromInt(pixel[i]);
            }
            const denominator: FPixel = @splat(@floatFromInt(std.math.maxInt(T)));
            return numerator / denominator;
        }
        
        fn intPixelFromFloat(pixel: FPixel) Pixel {
            const max: f32 = @floatFromInt(std.math.maxInt(T));
            const multiplier: FPixel = @splat(max);
            const product: FPixel = contrain(pixel * multiplier, max);
            var result: Pixel = undefined;
            comptime var i = 0;
            inline while (i < len) : (i += 1) {
                result[i] = @intFromFloat(product[i]);
            }
            return result;
        }
        
        pub fn getPixel(self: @This(), x: u32, y: u32) FPixel {
            if (x >= self.width or y >= self.height) {
                return @as(FPixel, @splat(0));
            }
            const index = (y * self.width) + x;
            const pixel = self.pixels[index];
            return switch (@typeInfo(T)) {
                .Float => pixel,
                .Int => floatPixelFromInt(pixel),
                else => @compileError("Unsupported type: " ++ @typeName(T)),
            };
        }
        
        pub fn setPixel(self: @This(), x: u32, y: u32, pixel: FPixel) void {
            if (comptime !writable) {
                return;
            }
            const index = (y * self.width) + x;
            switch (@typeInfo(T)) {
                .Float => {
                    self.pixels[index] = pixel;
                },
                .Int => {
                    self.pixels[index] = intPixelFromFloat(pixel);
                },
                else => @compileError("Unsupported type: " ++ @typeName(T)),
            }
        }
        
        pub fn sampleNearest(self: @This(), coord: @Vector(2, f32)) FPixel {
            const x = toUnsigned(coord[0]);
            const y = toUnsigned(coord[1]);
            return self.getPixel(x, y);
        }
        
        pub fn sampleLinear(self: @This(), coord: @Vector(2, f32)) FPixel {
            const x = toUnsigned(coord[0]);
            const y = toUnsigned(coord[1]);
            const fx = (coord[0] - 0.5) - @floor(coord[0] - 0.5);
            const fy = (coord[1] - 0.5) - @floor(coord[1] - 0.5);
            if (fx + fy == 0) {
                if (x < self.width and y < self.height) {
                    return self.getPixel(x, y);
                } else {
                    return @as(FPixel, @splat(0));
                }
            } else {
                const fx1: f32 = 1.0 - fx;
                const fy1: f32 = 1.0 - fy;
                const w00: f32 = fx1 * fy1;
                const w10: f32 = fx * fy1;
                const w01: f32 = fx1 * fy;
                const w11: f32 = fx * fy;
                const p00 = self.getPixel(x, y);
                const p01 = self.getPixel(x, y + 1);
                const p10 = self.getPixel(x + 1, y);
                const p11 = self.getPixel(x + 1, y + 1);
                var result: FPixel = undefined;
                comptime var i = 0;
                inline while (i < len) : (i += 1) {
                    result[i] = p00[i] * w00 + p10[i] * w10 + p01[i] * w01 + p11[i] * w11;
                }
                return result;
            }
        }
    };
}

pub fn KernelInput(comptime T: type, comptime Kernel: type) type {
    const param_fields = std.meta.fields(@TypeOf(Kernel.parameters));
    const input_fields = std.meta.fields(@TypeOf(Kernel.input));
    const field_count = param_fields.len + input_fields.len;
    comptime var struct_fields: [field_count]std.builtin.Type.StructField = undefined;
    inline for (param_fields, 0..) |field, index| {
        const param = @field(Kernel.parameters, field.name);
        const default_value: ?*const anyopaque = get_def: {
            if (@hasField(@TypeOf(param), "default_value")) {
                const value: param.type = param.default_value;
                break :get_def @ptrCast(&value);
            } else {
                break :get_def null;
            }
        };
        struct_fields[index] = .{
            .name = field.name,
            .type = param.type,
            .default_value = default_value,
            .is_comptime = false,
            .alignment = @alignOf(param.type),
        };
    }
    const offset = param_fields.len;
    inline for (input_fields, 0..) |field, index| {
        const input = @field(Kernel.input, field.name);
        const ImageT = Image(T, input.channels, false);
        struct_fields[offset + index] = .{
            .name = field.name,
            .type = ImageT,
            .default_value = null,
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
    const output_fields = std.meta.fields(@TypeOf(Kernel.output));
    if (output_fields.len > 1) {
        @compileError("Cannot handle multiple output: " ++ output_fields.len);
    }
    const output = @field(kernel.output, output_fields[0].name);
    return Image(T, output.channels, true);
}

pub fn processImage(comptime Kernel: type, input: anytype, output: anytype) void {
    const instance = Kernel.create(input);
    var coord: @Vector(2, f32) = .{ 0, 0 };
    var y: u32 = 0;
    while (y < output.height) : (y += 1) {
        var x: u32 = 0;
        coord[0] = 0;
        while (x < output.width) : (x += 1) {
            const pixel = instance.evaluatePixel(coord);
            output.setPixel(x, y, pixel);
            coord[0] += 1;
        }
        coord[1] += 1;
    }
}