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
            .minValue = .{ -5.0, -5.0 },
            .maxValue = .{ 5.0, 5.0 },
            .defaultValue = .{ -0.3, -1.1 },
        },
        .b = .{
            .type = @Vector(2, f32),
            .minValue = .{ -5.0, -5.0 },
            .maxValue = .{ 5.0, 5.0 },
            .defaultValue = .{ 2.1, 0.1 },
        },
        .c = .{
            .type = @Vector(2, f32),
            .minValue = .{ -5.0, -5.0 },
            .maxValue = .{ 5.0, 5.0 },
            .defaultValue = .{ 0.6, 0.0 },
        },
        .d = .{
            .type = @Vector(2, f32),
            .minValue = .{ -2.0, -2.0 },
            .maxValue = .{ 2.0, 2.0 },
            .defaultValue = .{ 0.2, -1.12 },
        },
        .distort = .{
            .type = @Vector(2, f32),
            .minValue = .{ 0.1, 0.1 },
            .maxValue = .{ 20.0, 20.0 },
            .defaultValue = .{ 3.0, 1.7320508 },
        },
        .imagesize = .{
            .type = @Vector(2, f32),
            .minValue = .{ 1.0, 1.0 },
            .maxValue = .{ 500.0, 400.0 },
            .defaultValue = .{ 250.0, 188.0 },
        },
        .center = .{
            .type = @Vector(2, f32),
            .minValue = .{ 1.0, 1.0 },
            .maxValue = .{ 1000.0, 1000.0 },
            .defaultValue = .{ 220.0, 380.0 },
        },
        .focus = .{
            .type = f32,
            .minValue = -6.0,
            .maxValue = 10.0,
            .defaultValue = 0.0,
        },
        .scale = .{
            .type = f32,
            .minValue = 1.0,
            .maxValue = 1000.0,
            .defaultValue = 200.0,
        },
        .fill = .{
            .type = f32,
            .minValue = 0.01,
            .maxValue = 0.5,
            .defaultValue = 0.2,
        },
        .bgcolor = .{
            .type = @Vector(4, f32),
            .minValue = .{ 0.0, 0.0, 0.0, 0.0 },
            .maxValue = .{ 1.0, 1.0, 1.0, 1.0 },
            .defaultValue = .{ 0.0, 0.0, 0.0, 0.0 },
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
            
            // constants
            const sqr3: f32 = 1.7320508;
            const halfPixel: @Vector(2, f32) = @Vector(2, f32){ 0.5, 0.5 };
            
            // functions defined in kernel
            pub fn evaluatePixel(self: *@This()) void {
                self.dst = @splat(0);
                const center = self.params.center;
                const scale = self.params.scale;
                const a = self.params.a;
                const b = self.params.b;
                const c = self.params.c;
                const d = self.params.d;
                const focus = self.params.focus;
                const distort = self.params.distort;
                const fill = self.params.fill;
                const imagesize = self.params.imagesize;
                const src = self.input.src;
                const bgcolor = self.params.bgcolor;
                
                var po: @Vector(2, f32) = (self.outCoord() - center) / @as(@Vector(2, f32), @splat(scale));
                var po2: @Vector(2, f32) = po - a;
                var po3: @Vector(2, f32) = po - b;
                po2 = complexMult(po2, po3);
                po3 = po - c;
                po2 = complexMult(po2, po3);
                po = self.complexDiv(d, po2);
                var tmp: f32 = undefined;
                var alf: f32 = 0.0;
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
                self.dst = src.sampleNearest(po);
                self.dst = mix(bgcolor, self.dst, alf);
                
                self.output.dst.setPixel(self.outputCoord[0], self.outputCoord[1], self.dst);
            }
            
            // macros
            fn complexMult(a: @Vector(2, f32), b: @Vector(2, f32)) @Vector(2, f32) {
                return @Vector(2, f32){ a[0] * b[0] - a[1] * b[1], a[0] * b[1] + a[1] * b[0] };
            }
            
            fn complexDiv(self: *@This(), a: @Vector(2, f32), b: @Vector(2, f32)) @Vector(2, f32) {
                const focus = self.params.focus;
                return @Vector(2, f32){ a[0] * b[0] + a[1] * b[1], -a[0] * b[1] + a[1] * b[0] } / @as(@Vector(2, f32), @splat((b[0] * b[0] + b[1] * b[1] + focus)));
            }
            
            // built-in Pixel Bender functions
            fn outCoord(self: *@This()) @Vector(2, f32) {
                const x = self.outputCoord[0];
                const y = self.outputCoord[1];
                return .{ @floatFromInt(x), @floatFromInt(y) };
            }
            
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

pub fn createOutput(
allocator: std.mem.Allocator,
width: u32,
height: u32,
input: Input,
params: Parameters,
) !Output {
    return createPartialOutputOf(u8, allocator, width, height, 0, height, input, params);
}

pub fn createPartialOutput(
allocator: std.mem.Allocator,
width: u32,
height: u32,
start: u32,
count: u32,
input: Input,
params: Parameters,
) !Output {
    return createPartialOutputOf(u8, allocator, width, height, start, count, input, params);
}

fn createPartialOutputOf(
comptime T: type,
allocator: std.mem.Allocator,
width: u32,
height: u32,
start: u32,
count: u32,
input: KernelInput(T, kernel),
params: Parameters,
) !KernelOutput(u8, kernel) {
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
    var y: u32 = 0;
    while (y < height) : (y += 1) {
        var x: u32 = 0;
        instance.outputCoord[1] = y;
        while (x < width) : (x += 1) {
            instance.outputCoord[0] = x;
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
            // https://github.com/ziglang/zig/issues/16267
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
        
        pub fn getPixel(self: @This(), x: i32, y: i32) FPixel {
            const ux = unsign(x);
            const uy = unsign(y);
            if (ux >= self.width or uy >= self.height) {
                return @as(FPixel, @splat(0));
            }
            const index = (uy * self.width) + ux;
            const pixel = self.data[index];
            return switch (@typeInfo(T)) {
                .Float => pbPixelFromFloatPixel(pixel),
                .Int => pbPixelFromIntPixel(pixel),
                else => @compileError("Unsupported type: " ++ @typeName(T)),
            };
        }
        
        pub fn setPixel(self: @This(), x: u32, y: u32, pixel: FPixel) void {
            if (comptime !writable) {
                return;
            }
            const index = (y * self.width) + x - self.offset;
            self.data[index] = switch (@typeInfo(T)) {
                .Float => floatPixelFromPBPixel(pixel),
                .Int => intPixelFromPBPixel(pixel),
                else => @compileError("Unsupported type: " ++ @typeName(T)),
            };
        }
        
        pub fn pixelSize(self: @This()) @Vector(2, f32) {
            _ = self;
            return .{ 1, 1 };
        }
        
        pub fn pixelAspectRatio(self: @This()) f32 {
            _ = self;
            return 1;
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