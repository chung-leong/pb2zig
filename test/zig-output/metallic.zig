
// Pixel Bender "VertexRenderer" (translated using pb2zig)
// namespace: Metallic
// vendor: Petri Leskinen
// version: 1
// description: Metallic -effect

const std = @import("std");

pub const kernel = struct {
    // kernel information
    pub const parameters = .{
        .lightsource = .{
            .type = @Vector(3, f32),
            .min_value = .{ -1000.0, -1000.0, -1000.0 },
            .max_value = .{ 1000.0, 1000.0, 1000.0 },
            .default_value = .{ 200.0, 60.0, 40.0 },
            .description = "xyz-location of the light source",
        },
        .shininess = .{
            .type = i32,
            .min_value = 2,
            .max_value = 64,
            .default_value = 40,
            .description = "shininess",
        },
        .shadow = .{
            .type = f32,
            .min_value = 0.0,
            .max_value = 1.0,
            .default_value = 0.4,
            .description = "depth of shadow areas",
        },
        .relief = .{
            .type = f32,
            .min_value = 1.0,
            .max_value = 10.0,
            .default_value = 2.0,
            .description = "the height of 3D effect",
        },
        .stripesize = .{
            .type = @Vector(2, f32),
            .min_value = .{ 1.0, 1.0 },
            .max_value = .{ 256.0, 200.0 },
            .default_value = .{ 256.0, 10.0 },
            .description = "the size for input 'stripe'",
        },
        .viewDirection = .{
            .type = @Vector(3, f32),
            .min_value = .{ -1.0, -1.0, -1.0 },
            .max_value = .{ 1.0, 1.0, 1.0 },
            .default_value = .{ 0.0, 0.0, 1.0 },
        },
    };
    pub const input = .{
        .source = .{ .channels = 4 },
        .stripe = .{ .channels = 4 },
    };
    pub const output = .{
        .dst = .{ .channels = 4 },
    };
    
    // generic kernel instance type
    fn Instance(comptime InputStruct: type) type {
        return struct {
            // parameter and input image fields
            lightsource: @Vector(3, f32),
            shininess: i32,
            shadow: f32,
            relief: f32,
            stripesize: @Vector(2, f32),
            viewDirection: @Vector(3, f32),
            source: std.meta.fieldInfo(InputStruct, .source).type,
            stripe: std.meta.fieldInfo(InputStruct, .stripe).type,
            
            // built-in Pixel Bender functions
            fn pow(v1: anytype, v2: anytype) @TypeOf(v1) {
                return switch (@typeInfo(@TypeOf(v1))) {
                    .Vector => calc: {
                        var result: @TypeOf(v1) = undefined;
                        comptime var i = 0;
                        inline while (i < @typeInfo(@TypeOf(v1)).Vector.len) : (i += 1) {
                            result[i] = pow(v1[i], v2[i]);
                        }
                        break :calc result;
                    },
                    else => std.math.pow(@TypeOf(v1), v1, v2),
                };
            }
            
            fn sqrt(v: anytype) @TypeOf(v) {
                return @sqrt(v);
            }
            
            fn clamp(v: anytype, min_val: anytype, max_val: anytype) @TypeOf(v) {
                return switch (@typeInfo(@TypeOf(min_val))) {
                    .Vector => calc: {
                        const T = @typeInfo(@TypeOf(v)).Vector.child;
                        const result1 = @select(T, v < min_val, min_val, v);
                        const result2 = @select(T, result1 > max_val, max_val, result1);
                        break :calc result2;
                    },
                    else => switch (@typeInfo(@TypeOf(v))) {
                        .Vector => clamp(v, @as(@TypeOf(v), @splat(min_val)), @as(@TypeOf(v), @splat(max_val))),
                        else => calc: {
                            if (v < min_val) {
                                break :calc min_val;
                            } else if (v > max_val) {
                                break :calc max_val;
                            } else {
                                break :calc v;
                            }
                        },
                    },
                };
            }
            
            fn dot(v1: anytype, v2: anytype) f32 {
                return switch (@typeInfo(@TypeOf(v1))) {
                    .Vector => @reduce(.Add, v1 * v2),
                    else => v1 * v2,
                };
            }
            
            // functions defined in kernel
            pub fn evaluatePixel(self: @This(), outCoord: @Vector(2, f32)) @Vector(4, f32) {
                // input variables
                const lightsource = self.lightsource;
                const shininess = self.shininess;
                const shadow = self.shadow;
                const relief = self.relief;
                const stripesize = self.stripesize;
                const viewDirection = self.viewDirection;
                const source = self.source;
                const stripe = self.stripe;
                
                // output variable
                var dst: @Vector(4, f32) = undefined;
                
                var po: @Vector(2, f32) = outCoord;
                var tmp4: @Vector(4, f32) = undefined;
                dst = source.sampleLinear(po);
                if (dst[3] > 0.01) {
                    var sourcesample: @Vector(4, f32) = dst;
                    tmp4 = source.sampleLinear(po + @Vector(2, f32){ -3.0, 0.0 });
                    const tmp1 = tmp4;
                    tmp4 = source.sampleLinear(po + @Vector(2, f32){ -2.0, 0.0 });
                    const tmp2 = tmp4;
                    tmp4 = source.sampleLinear(po + @Vector(2, f32){ -1.0, 0.0 });
                    const tmp3 = tmp4;
                    tmp4 = source.sampleLinear(po + @Vector(2, f32){ 1.0, 0.0 });
                    const tmp5 = tmp4;
                    tmp4 = source.sampleLinear(po + @Vector(2, f32){ 2.0, 0.0 });
                    const tmp6 = tmp4;
                    tmp4 = source.sampleLinear(po + @Vector(2, f32){ 3.0, 0.0 });
                    const tmp7 = tmp4;
                    tmp4 = source.sampleLinear(po + @Vector(2, f32){ 0.0, -3.0 });
                    const tmp8 = tmp4;
                    tmp4 = source.sampleLinear(po + @Vector(2, f32){ 0.0, -2.0 });
                    const tmp9 = tmp4;
                    tmp4 = source.sampleLinear(po + @Vector(2, f32){ 0.0, -1.0 });
                    const tmp10 = tmp4;
                    tmp4 = source.sampleLinear(po + @Vector(2, f32){ 0.0, 1.0 });
                    const tmp11 = tmp4;
                    tmp4 = source.sampleLinear(po + @Vector(2, f32){ 0.0, 2.0 });
                    const tmp12 = tmp4;
                    tmp4 = source.sampleLinear(po + @Vector(2, f32){ 0.0, 3.0 });
                    const tmp13 = tmp4;
                    var normal: @Vector(3, f32) = @Vector(3, f32){ (0.7 * tmp1[1] + 0.2 * tmp1[0] + 0.1 * tmp1[2]) + (0.7 * tmp2[1] + 0.2 * tmp2[0] + 0.1 * tmp2[2]) + (0.7 * tmp3[1] + 0.2 * tmp3[0] + 0.1 * tmp3[2]) - (0.7 * tmp5[1] + 0.2 * tmp5[0] + 0.1 * tmp5[2]) - (0.7 * tmp6[1] + 0.2 * tmp6[0] + 0.1 * tmp6[2]) - (0.7 * tmp7[1] + 0.2 * tmp7[0] + 0.1 * tmp7[2]), (0.7 * tmp8[1] + 0.2 * tmp8[0] + 0.1 * tmp8[2]) + (0.7 * tmp9[1] + 0.2 * tmp9[0] + 0.1 * tmp9[2]) + (0.7 * tmp10[1] + 0.2 * tmp10[0] + 0.1 * tmp10[2]) - (0.7 * tmp11[1] + 0.2 * tmp11[0] + 0.1 * tmp11[2]) - (0.7 * tmp12[1] + 0.2 * tmp12[0] + 0.1 * tmp12[2]) - (0.7 * tmp13[1] + 0.2 * tmp13[0] + 0.1 * tmp13[2]), 12.0 / relief };
                    var len: f32 = 1.0 / sqrt(normal[0] * normal[0] + normal[1] * normal[1] + normal[2] * normal[2] + 0.0);
                    normal *= @as(@Vector(3, f32), @splat(len));
                    var lightbeam: @Vector(3, f32) = lightsource;
                    lightbeam = @shuffle(f32, lightbeam, @shuffle(f32, lightbeam, undefined, @Vector(2, i32){ 0, 1 }) - po, @Vector(3, i32){ -1, -2, 2 });
                    tmp4 = sourcesample;
                    const tmp14 = tmp4;
                    lightbeam[2] -= 5.0 * relief * ((0.7 * tmp14[1] + 0.2 * tmp14[0] + 0.1 * tmp14[2]) - 1.0);
                    len = 1.0 / sqrt(lightbeam[0] * lightbeam[0] + lightbeam[1] * lightbeam[1] + lightbeam[2] * lightbeam[2] + 0.0);
                    lightbeam *= @as(@Vector(3, f32), @splat(len));
                    var refl: f32 = shadow + (1.0 - shadow) * dot(normal, lightbeam);
                    var v: @Vector(3, f32) = (@as(@Vector(3, f32), @splat(2.0)) * normal * @as(@Vector(3, f32), @splat(dot(viewDirection, normal))) / @as(@Vector(3, f32), @splat((normal[0] * normal[0] + normal[1] * normal[1] + normal[2] * normal[2]))) - viewDirection);
                    var spec: f32 = dot(v, lightbeam);
                    if (spec > 0.0) {
                        spec = pow(spec, @floatFromInt(shininess));
                        refl += spec;
                    }
                    refl = clamp(refl, 0.0, 1.0);
                    dst = stripe.sampleLinear(@Vector(2, f32){ 0.5 + (stripesize[0] - 1.0) * refl, stripesize[1] });
                    dst[3] *= sourcesample[3];
                }
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