
// Pixel Bender "modPixelation" (translated using pb2zig)
// namespace: complex rational
// vendor: pixelero
// version: 1
// description: complex mapping f(z)= (az2+b)/(cz2+d)

const std = @import("std");

pub const kernel = struct {
    // kernel information
    pub const parameters = .{
        .a = .{
            .type = @Vector(2, f32),
            .min_value = .{ -10.0, -10.0 },
            .max_value = .{ 10.0, 10.0 },
            .default_value = .{ 1.0, 0.62 },
        },
        .b = .{
            .type = @Vector(2, f32),
            .min_value = .{ -500.0, -500.0 },
            .max_value = .{ 500.0, 500.0 },
            .default_value = .{ -86.0, 22.0 },
        },
        .c = .{
            .type = @Vector(2, f32),
            .min_value = .{ -1.0, -1.0 },
            .max_value = .{ 1.0, 1.0 },
            .default_value = .{ -0.02, -0.02 },
        },
        .d = .{
            .type = @Vector(2, f32),
            .min_value = .{ -100.0, -100.0 },
            .max_value = .{ 100.0, 100.0 },
            .default_value = .{ -2.0, 10.0 },
        },
        .size = .{
            .type = @Vector(2, f32),
            .min_value = .{ 1.0, 1.0 },
            .max_value = .{ 1000.0, 1000.0 },
            .default_value = .{ 368.0, 285.0 },
        },
        .center = .{
            .type = @Vector(2, f32),
            .min_value = .{ 1.0, 1.0 },
            .max_value = .{ 1000.0, 1000.0 },
            .default_value = .{ 168.0, 185.0 },
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
            a: @Vector(2, f32),
            b: @Vector(2, f32),
            c: @Vector(2, f32),
            d: @Vector(2, f32),
            size: @Vector(2, f32),
            center: @Vector(2, f32),
            src: std.meta.fieldInfo(InputStruct, .src).type,
            
            // built-in Pixel Bender functions
            fn fract(v: anytype) @TypeOf(v) {
                return v - @floor(v);
            }
            
            // macro functions
            fn complexMult(a: anytype, b: anytype) float2 {
                return @Vector(2, f32){ @floatFromInt(a[0] * b[0] - a[1] * b[1]), @floatFromInt(a[0] * b[1] + a[1] * b[0]) };
            }
            fn complexSquared(a: anytype) float2 {
                return @Vector(2, f32){ @floatFromInt(a[0] * a[0] - a[1] * a[1]), 2.0 * a[0] * a[1] };
            }
            fn complexDiv(a: anytype, b: anytype) float2 {
                return @Vector(2, f32){ @floatFromInt(a[0] * b[0] + a[1] * b[1]), @floatFromInt(-a[0] * b[1] + a[1] * b[0]) } / @as(@Vector(2, f32), @splat(@floatFromInt((b[0] * b[0] + b[1] * b[1]))));
            }
            
            // functions defined in kernel
            pub fn evaluatePixel(self: @This(), outCoord: @Vector(2, f32)) @Vector(4, f32) {
                // input variables
                const a = self.a;
                const b = self.b;
                const c = self.c;
                const d = self.d;
                const size = self.size;
                const center = self.center;
                const src = self.src;
                
                // output variable
                var dst: @Vector(4, f32) = undefined;
                
                var po: @Vector(2, f32) = outCoord - center;
                po = @Vector(2, f32){ po[0] * po[0] - po[1] * po[1], 2.0 * po[0] * po[1] };
                var po2: @Vector(2, f32) = d + @Vector(2, f32){ c[0] * po[0] - c[1] * po[1], c[0] * po[1] + c[1] * po[0] };
                po = b + @Vector(2, f32){ a[0] * po[0] - a[1] * po[1], a[0] * po[1] + a[1] * po[0] };
                po = @Vector(2, f32){ po[0] * po2[0] + po[1] * po2[1], -po[0] * po2[1] + po[1] * po2[0] } / @as(@Vector(2, f32), @splat((po2[0] * po2[0] + po2[1] * po2[1])));
                dst = src.sampleLinear(size * fract(po / size));
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