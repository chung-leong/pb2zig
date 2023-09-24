
// Pixel Bender "SmartNormalMap" (translated using pb2zig)
const std = @import("std");

pub const kernel = struct {
    // kernel information
    pub const namespace = "com.smartpage.filters";
    pub const vendor = "smart-page.net - Jan-C. Frischmuth";
    pub const version = 1;
    pub const description = "Generates a normalmap using condensed or sobel-edge.";
    pub const parameters = .{
        .soft_sobel = .{
            .type = i32,
            .min_value = 0,
            .max_value = 1,
            .default_value = 0,
        },
        .amount = .{
            .type = f32,
            .min_value = 0.0,
            .max_value = 5.0,
            .default_value = 1.0,
        },
        .invert_red = .{
            .type = f32,
            .min_value = -1.0,
            .max_value = 1.0,
            .default_value = 1.0,
        },
        .invert_green = .{
            .type = f32,
            .min_value = -1.0,
            .max_value = 1.0,
            .default_value = 1.0,
        },
    };
    pub const input = .{
        .src = .{ .channels = 4 },
    };
    pub const output = .{
        .dst = .{ .channels = 4 },
    };
    
    // generic kernel instance type
    fn Instance(comptime InputStruct: type) type {
        return struct {
            // parameter and input image fields
            soft_sobel: i32,
            amount: f32,
            invert_red: f32,
            invert_green: f32,
            src: std.meta.fieldInfo(InputStruct, .src).type,
            
            // functions defined in kernel
            pub fn evaluatePixel(self: @This(), outCoord: @Vector(2, f32)) @Vector(4, f32) {
                // input variables
                const soft_sobel = self.soft_sobel;
                const amount = self.amount;
                const invert_red = self.invert_red;
                const invert_green = self.invert_green;
                const src = self.src;
                
                // output variable
                var dst: @Vector(4, f32) = undefined;
                
                var dx: f32 = undefined;
                var dy: f32 = undefined;
                if (soft_sobel == 0) {
                    dx = src.sampleNearest(@Vector(2, f32){ outCoord[0] + 1.0, outCoord[1] })[0] - src.sampleNearest(@Vector(2, f32){ outCoord[0] - 1.0, outCoord[1] })[0];
                    dy = src.sampleNearest(@Vector(2, f32){ outCoord[0], outCoord[1] - 1.0 })[0] - src.sampleNearest(@Vector(2, f32){ outCoord[0], outCoord[1] + 1.0 })[0];
                } else {
                    dx = src.sampleNearest(@Vector(2, f32){ outCoord[0] - 1.0, outCoord[1] - 1.0 })[0] / -1.0;
                    dx += src.sampleNearest(@Vector(2, f32){ outCoord[0] - 1.0, outCoord[1] })[0] / -2.0;
                    dx += src.sampleNearest(@Vector(2, f32){ outCoord[0] - 1.0, outCoord[1] + 1.0 })[0] / -1.0;
                    dx += src.sampleNearest(@Vector(2, f32){ outCoord[0] + 1.0, outCoord[1] - 1.0 })[0] / 1.0;
                    dx += src.sampleNearest(@Vector(2, f32){ outCoord[0] + 1.0, outCoord[1] })[0] / 2.0;
                    dx += src.sampleNearest(@Vector(2, f32){ outCoord[0] + 1.0, outCoord[1] + 1.0 })[0] / 1.0;
                    dy = src.sampleNearest(@Vector(2, f32){ outCoord[0] - 1.0, outCoord[1] + 1.0 })[0] / -1.0;
                    dy += src.sampleNearest(@Vector(2, f32){ outCoord[0], outCoord[1] + 1.0 })[0] / -2.0;
                    dy += src.sampleNearest(@Vector(2, f32){ outCoord[0] + 1.0, outCoord[1] + 1.0 })[0] / -1.0;
                    dy += src.sampleNearest(@Vector(2, f32){ outCoord[0] - 1.0, outCoord[1] - 1.0 })[0] / 1.0;
                    dy += src.sampleNearest(@Vector(2, f32){ outCoord[0], outCoord[1] - 1.0 })[0] / 2.0;
                    dy += src.sampleNearest(@Vector(2, f32){ outCoord[0] + 1.0, outCoord[1] - 1.0 })[0] / 1.0;
                }
                var normal: @Vector(3, f32) = @Vector(3, f32){ dx * invert_red * (amount / (1.0 + @as(f32, @floatFromInt(soft_sobel)))), -(dy * invert_green) * (amount / (1.0 + @as(f32, @floatFromInt(soft_sobel)))), 1.0 };
                normal = ((normal + @as(@Vector(3, f32), @splat(1.0))) / @as(@Vector(3, f32), @splat(2.0)));
                dst = @Vector(4, f32){ normal[0], normal[1], normal[2], 1.0 };
                return dst;
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
        
        inline fn toUnsigned(value: i32) u32 {
            // allow negative value to be interpreted as large integers to simplify bound-checking
            @setRuntimeSafety(false);
            return @as(u32, @intCast(value));
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
        
        pub fn getPixel(self: @This(), x: i32, y: i32) FPixel {
            const ux = toUnsigned(x);
            const uy = toUnsigned(y);
            if (ux >= self.width or uy >= self.height) {
                return @as(FPixel, @splat(0));
            }
            const index = (uy * self.width) + ux;
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
            const x: i32 = @intFromFloat(coord[0]);
            const y: i32 = @intFromFloat(coord[1]);
            return self.getPixel(x, y);
        }
        
        pub fn sampleLinear(self: @This(), coord: @Vector(2, f32)) FPixel {
            const c = coord - @as(@Vector(2, f32), @splat(0.5));
            const x: i32 = @intFromFloat(c[0]);
            const y: i32 = @intFromFloat(c[1]);
            const f0 = c - @floor(c);
            if (@reduce(.Add, f0) == 0) {
                return self.getPixel(x, y);
            } else {
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