
// Pixel Bender "CirclePacking" (translated using pb2zig)
// namespace: CirclePattern
// vendor: Petri Leskinen
// version: 1
// description: CirclePattern

const std = @import("std");

pub const kernel = struct {
    // kernel information
    pub const parameters = .{
        .fill = .{
            .type = f32,
            .min_value = 0.0,
            .max_value = 0.33,
            .default_value = 0.23,
        },
        .scale = .{
            .type = f32,
            .min_value = 1.0,
            .max_value = 20.0,
            .default_value = 1.0,
        },
        .distort = .{
            .type = @Vector(2, f32),
            .min_value = .{ 0.1, 0.1 },
            .max_value = .{ 8.0, 8.0 },
            .default_value = .{ 3.0, 1.7320508 },
        },
        .center = .{
            .type = @Vector(2, f32),
            .min_value = .{ -20.0, -20.0 },
            .max_value = .{ 400.0, 400.0 },
            .default_value = .{ 120.0, 130.0 },
        },
        .minSolid = .{
            .type = f32,
            .min_value = 0.001,
            .max_value = 0.1,
            .default_value = 0.005,
        },
        .maxSolid = .{
            .type = f32,
            .min_value = 0.001,
            .max_value = 1.0,
            .default_value = 0.05,
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
            fill: f32,
            scale: f32,
            distort: @Vector(2, f32),
            center: @Vector(2, f32),
            minSolid: f32,
            maxSolid: f32,
            src: std.meta.fieldInfo(InputStruct, .src).type,
            
            // constants
            const sqr3: f32 = 1.7320508;
            const halfPixel: @Vector(2, f32) = @Vector(2, f32){ 0.5, 0.5 };
            
            // built-in Pixel Bender functions
            fn floor(v: anytype) @TypeOf(v) {
                return @floor(v);
            }
            
            fn fract(v: anytype) @TypeOf(v) {
                return v - @floor(v);
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
            
            fn smoothStep(edge0: anytype, edge1: anytype, v: anytype) @TypeOf(v) {
                return switch (@typeInfo(@TypeOf(edge0))) {
                    .Vector => calc: {
                        const T = @TypeOf(v);
                        const ET = @typeInfo(T).Vector.child;
                        const zeros: T = @splat(0);
                        const ones: T = @splat(1);
                        const twos: T = @splat(2);
                        const threes: T = @splat(3);
                        const value = (v - edge0) / (edge1 - edge0);
                        const interpolated = value * value * (threes - twos * value);
                        const result1 = @select(ET, v <= edge0, zeros, interpolated);
                        const result2 = @select(ET, v >= edge1, ones, result1);
                        break :calc result2;
                    },
                    else => switch (@typeInfo(@TypeOf(v))) {
                        .Vector => smoothStep(@as(@TypeOf(v), @splat(edge0)), @as(@TypeOf(v), @splat(edge1)), v),
                        else => calc: {
                            if (v <= edge0) {
                                break :calc 0;
                            } else if (v >= edge1) {
                                break :calc 1;
                            } else {
                                const value = (v - edge0) / (edge1 - edge0);
                                const interpolated = value * value * (3 - 2 * value);
                                break :calc interpolated;
                            }
                        },
                    },
                };
            }
            
            // functions defined in kernel
            pub fn evaluatePixel(self: @This(), outCoord: @Vector(2, f32)) @Vector(4, f32) {
                // input variables
                const fill = self.fill;
                const scale = self.scale;
                const distort = self.distort;
                const center = self.center;
                const minSolid = self.minSolid;
                const maxSolid = self.maxSolid;
                const src = self.src;
                
                // output variable
                var dst: @Vector(4, f32) = undefined;
                
                var z: @Vector(2, f32) = @as(@Vector(2, f32), @splat(scale * 0.001)) * (outCoord - center);
                var pixelCheck: f32 = z[0] * z[0] + z[1] * z[1];
                z /= @as(@Vector(2, f32), @splat(pixelCheck));
                var znew: @Vector(2, f32) = distort * z;
                z = fract(znew);
                z[1] *= sqr3;
                znew = floor(znew);
                var tmp: f32 = z[0] * z[0] + z[1] * z[1];
                var alf: f32 = 0.0;
                if (tmp < fill) {
                    alf = 1.0;
                    znew -= halfPixel;
                } else {
                    tmp = z[0] - 0.5;
                    const tmp1 = tmp;
                    tmp = z[1] - 0.5 * sqr3;
                    const tmp2 = tmp;
                    if (tmp1 * tmp1 + tmp2 * tmp2 < fill) {
                        alf = 1.0;
                    } else {
                        tmp = z[1] - sqr3;
                        const tmp3 = tmp;
                        if (z[0] * z[0] + tmp3 * tmp3 < fill) {
                            alf = 1.0;
                            znew[0] -= 0.5;
                            znew[1] += 0.5;
                        } else {
                            tmp = z[0] - 1.0;
                            const tmp4 = tmp;
                            tmp = z[1] - sqr3;
                            const tmp5 = tmp;
                            if (tmp4 * tmp4 + tmp5 * tmp5 < fill) {
                                alf = 1.0;
                                znew += halfPixel;
                            } else {
                                tmp = z[0] - 1.0;
                                const tmp6 = tmp;
                                if (tmp6 * tmp6 + z[1] * z[1] < fill) {
                                    alf = 1.0;
                                    znew[0] += 0.5;
                                    znew[1] += -0.5;
                                }
                            }
                        }
                    }
                }
                z = znew / distort * @as(@Vector(2, f32), @splat(scale)) * @as(@Vector(2, f32), @splat(0.001));
                z /= @as(@Vector(2, f32), @splat(z[0] * z[0] + z[1] * z[1]));
                tmp = 1.0 - smoothStep(minSolid, maxSolid, pixelCheck / scale);
                alf = max(tmp, alf);
                dst = src.sampleNearest(z + center);
                dst[3] *= alf;
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
            const x: i32 = @intFromFloat(coord[0]);
            const y: i32 = @intFromFloat(coord[1]);
            const fx = (coord[0] - 0.5) - @floor(coord[0] - 0.5);
            const fy = (coord[1] - 0.5) - @floor(coord[1] - 0.5);
            if (fx + fy == 0) {
                return self.getPixel(x, y);
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