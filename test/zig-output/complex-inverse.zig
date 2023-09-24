
// Pixel Bender "modPixelation" (translated using pb2zig)
const std = @import("std");

pub const kernel = struct {
    // kernel information
    pub const namespace = "complex rational 3";
    pub const vendor = "pixelero";
    pub const version = 1;
    pub const description = "complex mapping z = d/[(z-a)(z-b)(z-c)]";
    pub const parameters = .{
        .a = .{
            .type = @Vector(2, f32),
            .min_value = .{ -5.0, -5.0 },
            .max_value = .{ 5.0, 5.0 },
            .default_value = .{ -0.3, -1.1 },
        },
        .b = .{
            .type = @Vector(2, f32),
            .min_value = .{ -5.0, -5.0 },
            .max_value = .{ 5.0, 5.0 },
            .default_value = .{ 2.1, 0.1 },
        },
        .c = .{
            .type = @Vector(2, f32),
            .min_value = .{ -5.0, -5.0 },
            .max_value = .{ 5.0, 5.0 },
            .default_value = .{ 0.6, 0.0 },
        },
        .d = .{
            .type = @Vector(2, f32),
            .min_value = .{ -2.0, -2.0 },
            .max_value = .{ 2.0, 2.0 },
            .default_value = .{ 0.2, -1.12 },
        },
        .distort = .{
            .type = @Vector(2, f32),
            .min_value = .{ 0.1, 0.1 },
            .max_value = .{ 20.0, 20.0 },
            .default_value = .{ 3.0, 1.7320508 },
        },
        .imagesize = .{
            .type = @Vector(2, f32),
            .min_value = .{ 1.0, 1.0 },
            .max_value = .{ 500.0, 400.0 },
            .default_value = .{ 250.0, 188.0 },
        },
        .center = .{
            .type = @Vector(2, f32),
            .min_value = .{ 1.0, 1.0 },
            .max_value = .{ 1000.0, 1000.0 },
            .default_value = .{ 220.0, 380.0 },
        },
        .focus = .{
            .type = f32,
            .min_value = -6.0,
            .max_value = 10.0,
            .default_value = 0.0,
        },
        .scale = .{
            .type = f32,
            .min_value = 1.0,
            .max_value = 1000.0,
            .default_value = 200.0,
        },
        .fill = .{
            .type = f32,
            .min_value = 0.01,
            .max_value = 0.5,
            .default_value = 0.2,
        },
        .bgcolor = .{
            .type = @Vector(4, f32),
            .min_value = .{ 0.0, 0.0, 0.0, 0.0 },
            .max_value = .{ 1.0, 1.0, 1.0, 1.0 },
            .default_value = .{ 0.0, 0.0, 0.0, 0.0 },
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
            distort: @Vector(2, f32),
            imagesize: @Vector(2, f32),
            center: @Vector(2, f32),
            focus: f32,
            scale: f32,
            fill: f32,
            bgcolor: @Vector(4, f32),
            src: std.meta.fieldInfo(InputStruct, .src).type,
            
            // constants
            const sqr3: f32 = 1.7320508;
            const halfPixel: @Vector(2, f32) = @Vector(2, f32){ 0.5, 0.5 };
            
            // macro functions
            fn complexMult(a: anytype, b: anytype) @Vector(2, f32) {
                return @Vector(2, f32){ @as(f32, @floatFromInt(a[0] * b[0] - a[1] * b[1])), @as(f32, @floatFromInt(a[0] * b[1] + a[1] * b[0])) };
            }
            fn complexSquared(a: anytype) @Vector(2, f32) {
                return @Vector(2, f32){ @as(f32, @floatFromInt(a[0] * a[0] - a[1] * a[1])), 2.0 * a[0] * a[1] };
            }
            fn complexInverse(b: anytype) @Vector(2, f32) {
                return @Vector(2, f32){ @as(f32, @floatFromInt(b[0])), @as(f32, @floatFromInt(-b[1])) } / @as(@Vector(2, f32), @splat(@as(f32, @floatFromInt((b[0] * b[0] + b[1] * b[1])))));
            }
            
            
            pub fn evaluatePixel(self: @This(), outCoord: @Vector(2, f32)) @Vector(4, f32) {
                // input variables
                const a = self.a;
                const b = self.b;
                const c = self.c;
                const d = self.d;
                const distort = self.distort;
                const imagesize = self.imagesize;
                const center = self.center;
                const focus = self.focus;
                const scale = self.scale;
                const fill = self.fill;
                const bgcolor = self.bgcolor;
                const src = self.src;
                
                // output variable
                var dst: @Vector(4, f32) = undefined;
                
                var po: @Vector(2, f32) = (outCoord - center) / @as(@Vector(2, f32), @splat(scale));
                var po2: @Vector(2, f32) = po - a;
                var po3: @Vector(2, f32) = po - b;
                po2 = @Vector(2, f32){ po2[0] * po3[0] - po2[1] * po3[1], po2[0] * po3[1] + po2[1] * po3[0] };
                po3 = po - c;
                po2 = @Vector(2, f32){ po2[0] * po3[0] - po2[1] * po3[1], po2[0] * po3[1] + po2[1] * po3[0] };
                po = @Vector(2, f32){ d[0] * po2[0] + d[1] * po2[1], -d[0] * po2[1] + d[1] * po2[0] } / @as(@Vector(2, f32), @splat((po2[0] * po2[0] + po2[1] * po2[1] + focus)));
                var tmp: f32 = undefined;
                var alf: f32 = 0.0;
                var sqr3: f32 = 1.732;
                po = (distort * po);
                var z: @Vector(2, f32) = fract(po);
                po = floor(po);
                z[1] *= sqr3;
                tmp = z[0] * z[0] + z[1] * z[1];
                if (tmp < fill) {
                    alf = 1.0;
                    po -= halfPixel;
                } else {
                    tmp = z[0] - 0.5;
                    const tmp1 = tmp;
                    tmp = z[1] - 0.5 * sqr3;
                    const tmp2 = tmp;
                    tmp = tmp1 * tmp1 + 1.0 * tmp2 * tmp2;
                    const tmp3 = tmp;
                    if (tmp3 < fill) {
                        alf = 1.0;
                    } else {
                        tmp = z[1] - sqr3;
                        const tmp4 = tmp;
                        if (z[0] * z[0] + tmp4 * tmp4 < fill) {
                            alf = 1.0;
                            po[0] -= 0.5;
                            po[1] += 0.5;
                        } else {
                            tmp = z[0] - 1.0;
                            const tmp5 = tmp;
                            tmp = z[1] - sqr3;
                            const tmp6 = tmp;
                            if (tmp5 * tmp5 + tmp6 * tmp6 < fill) {
                                alf = 1.0;
                                po += halfPixel;
                            } else {
                                tmp = z[0] - 1.0;
                                const tmp7 = tmp;
                                if (tmp7 * tmp7 + z[1] * z[1] < fill) {
                                    alf = 1.0;
                                    po[0] += 0.5;
                                    po[1] += -0.5;
                                }
                            }
                        }
                    }
                }
                po = mod(po, imagesize);
                dst = src.sampleNearest(po);
                dst = mix(bgcolor, dst, alf);
                return dst;
            }
            
            // built-in Pixel Bender functions
            fn floor(v: anytype) @TypeOf(v) {
                return @floor(v);
            }
            
            fn fract(v: anytype) @TypeOf(v) {
                return v - @floor(v);
            }
            
            fn mod(v1: anytype, v2: anytype) @TypeOf(v1) {
                return switch (@typeInfo(@TypeOf(v2))) {
                    .Vector => @mod(v1, v2),
                    else => switch (@typeInfo(@TypeOf(v1))) {
                        .Vector => @mod(v1, @as(@TypeOf(v1), @splat(v2))),
                        else => @mod(v1, v2),
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