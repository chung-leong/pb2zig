// Pixel Bender "CirclePacking" (translated using pb2zig)
const std = @import("std");

pub const kernel = struct {
    // kernel information
    pub const namespace = "CirclePattern";
    pub const vendor = "Petri Leskinen";
    pub const version = 1;
    pub const description = "CirclePattern";
    pub const parameters = .{
        .fill = .{
            .type = f32,
            .minValue = 0.0,
            .maxValue = 0.33,
            .defaultValue = 0.23,
        },
        .scale = .{
            .type = f32,
            .minValue = 1.0,
            .maxValue = 20.0,
            .defaultValue = 1.0,
        },
        .distort = .{
            .type = @Vector(2, f32),
            .minValue = .{ 0.1, 0.1 },
            .maxValue = .{ 8.0, 8.0 },
            .defaultValue = .{ 3.0, 1.7320508 },
        },
        .center = .{
            .type = @Vector(2, f32),
            .minValue = .{ -20.0, -20.0 },
            .maxValue = .{ 400.0, 400.0 },
            .defaultValue = .{ 120.0, 130.0 },
        },
        .minSolid = .{
            .type = f32,
            .minValue = 0.001,
            .maxValue = 0.1,
            .defaultValue = 0.005,
        },
        .maxSolid = .{
            .type = f32,
            .minValue = 0.001,
            .maxValue = 1.0,
            .defaultValue = 0.05,
        },
    };
    pub const inputImages = .{
        .src = .{ .channels = 4 },
    };
    pub const outputImages = .{
        .dst = .{ .channels = 4 },
    };
    
    // generic kernel instance type
    fn Instance(comptime InputStruct: type, comptime OutputStruct: type) type {
        return struct {
            input: InputStruct,
            output: OutputStruct,
            outputCoord: @Vector(2, u32) = @splat(0),
            
            // output pixel
            dst: @Vector(4, f32) = undefined,
            
            fn clearOutputPixel(self: *@This()) void {
                self.dst = @splat(0);
            }
            
            fn setOutputPixel(self: *@This()) void {
                const x = self.outputCoord[0];
                const y = self.outputCoord[1];
                self.output.dst.setPixel(x, y, self.dst);
            }
            
            fn outCoord(self: *@This()) @Vector(2, f32) {
                const x = self.outputCoord[0];
                const y = self.outputCoord[1];
                return .{ @floatFromInt(x), @floatFromInt(y) };
            }
            
            // constants
            const sqr3: f32 = 1.7320508;
            const halfPixel: @Vector(2, f32) = @Vector(2, f32){ 0.5, 0.5 };
            
            // functions defined in kernel
            pub fn evaluatePixel(self: *@This()) void {
                self.clearOutputPixel();
                const scale = self.input.scale;
                const center = self.input.center;
                const distort = self.input.distort;
                const fill = self.input.fill;
                const minSolid = self.input.minSolid;
                const maxSolid = self.input.maxSolid;
                
                var z: @Vector(2, f32) = @as(@Vector(2, f32), @splat(scale * 0.001)) * (self.outCoord() - center);
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
                    if (tmp1 * tmp + tmp2 * tmp < fill) {
                        alf = 1.0;
                    } else {
                        tmp = z[1] - sqr3;
                        const tmp3 = tmp;
                        if (z[0] * z[0] + tmp3 * tmp < fill) {
                            alf = 1.0;
                            znew[0] -= 0.5;
                            znew[1] += 0.5;
                        } else {
                            tmp = z[0] - 1.0;
                            const tmp4 = tmp;
                            tmp = z[1] - sqr3;
                            const tmp5 = tmp;
                            if (tmp4 * tmp + tmp5 * tmp < fill) {
                                alf = 1.0;
                                znew += halfPixel;
                            } else {
                                tmp = z[0] - 1.0;
                                const tmp6 = tmp;
                                if (tmp6 * tmp + z[1] * z[1] < fill) {
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
                self.dst = self.input.src.sampleNearest(z + center);
                self.dst[3] *= alf;
                
                self.setOutputPixel();
            }
            
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
        };
    }
    
    // kernel instance creation function
    pub fn create(input: anytype, output: anytype) Instance(@TypeOf(input), @TypeOf(output)) {
        return .{
            .input = input,
            .output = output,
        };
    }
};

pub const Input = KernelInput(u8, kernel);
pub const Output = KernelOutput(u8, kernel);

pub fn apply(input: Input, output: Output) void {
    processImage(kernel, input, output);
}

pub fn allocate(allocator: std.mem.Allocator, width: u32, height: u32) !Output {
    var output: Output = undefined;
    inline for (std.meta.fields(Output)) |field| {
        const ImageT = @TypeOf(@field(output, field.name));
        @field(output, field.name) = .{
            .pixels = try allocator.alloc(ImageT.Pixel, height * width),
            .width = width,
            .height = height,
        };
    }
    return output;
}

pub fn Image(comptime T: type, comptime len: comptime_int, comptime writable: bool) type {
    return struct {
        pub const Pixel = @Vector(4, T);
        pub const FPixel = @Vector(len, f32);
        pub const channels = len;
        
        pixels: if (writable) []Pixel else []const Pixel,
        width: u32,
        height: u32,
        
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
            const pixel = self.pixels[index];
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
            const index = (y * self.width) + x;
            self.pixels[index] = switch (@typeInfo(T)) {
                .Float => floatPixelFromPBPixel(pixel),
                .Int => intPixelFromPBPixel(pixel),
                else => @compileError("Unsupported type: " ++ @typeName(T)),
            };
        }
        
        pub fn pixelSize(self: @This()) @Vector(2, f32) {
            return .{ @floatFromInt(self.width), @floatFromInt(self.height) };
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

const ImageSize = struct {
    x: u32,
    y: u32,
};

pub fn KernelInput(comptime T: type, comptime Kernel: type) type {
    const param_fields = std.meta.fields(@TypeOf(Kernel.parameters));
    const input_fields = std.meta.fields(@TypeOf(Kernel.inputImages));
    const field_count = param_fields.len + input_fields.len;
    comptime var struct_fields: [field_count]std.builtin.Type.StructField = undefined;
    inline for (param_fields, 0..) |field, index| {
        const param = @field(Kernel.parameters, field.name);
        const default_value: ?*const anyopaque = get_def: {
            if (@hasField(@TypeOf(param), "defaultValue")) {
                const value: param.type = param.defaultValue;
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
        const input = @field(Kernel.inputImages, field.name);
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
    const output_fields = std.meta.fields(@TypeOf(Kernel.outputImages));
    comptime var struct_fields: [output_fields.len]std.builtin.Type.StructField = undefined;
    inline for (output_fields, 0..) |field, index| {
        const output = @field(Kernel.outputImages, field.name);
        const ImageT = Image(T, output.channels, true);
        struct_fields[index] = .{
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

pub fn processImage(comptime Kernel: type, input: anytype, output: anytype) void {
    var instance = Kernel.create(input, output);
    const width: u32 = get: {
        inline for (std.meta.fields(@TypeOf(output))) |field| {
            const image = @field(output, field.name);
            break :get image.width;
        }
        break :get 0;
    };
    const height: u32 = get: {
        inline for (std.meta.fields(@TypeOf(output))) |field| {
            const image = @field(output, field.name);
            break :get image.height;
        }
        break :get 0;
    };
    var y: u32 = 0;
    while (y < height) : (y += 1) {
        var x: u32 = 0;
        instance.outputCoord[1] = y;
        while (x < width) : (x += 1) {
            instance.outputCoord[0] = x;
            instance.evaluatePixel();
        }
    }
}