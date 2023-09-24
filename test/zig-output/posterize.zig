
// Pixel Bender "Posterizer" (translated using pb2zig)
// namespace: Posterizer
// vendor: Petri Leskinen
// version: 1
// description: Posterizes an image using 2 to 8 specified colors

const std = @import("std");

pub const kernel = struct {
    // kernel information
    pub const parameters = .{
        .color1 = .{
            .type = @Vector(4, f32),
            .min_value = .{ 0.0, 0.0, 0.0, 0.0 },
            .max_value = .{ 1.0, 1.0, 1.0, 1.0 },
            .default_value = .{ 0.441, 0.5859375, 0.62109375, 1.0 },
            .parameter_type = "colorRGBA",
        },
        .color2 = .{
            .type = @Vector(4, f32),
            .min_value = .{ 0.0, 0.0, 0.0, 0.0 },
            .max_value = .{ 1.0, 1.0, 1.0, 1.0 },
            .default_value = .{ 0.839, 0.101, 0.1289, 1.0 },
            .parameter_type = "colorRGBA",
        },
        .color3 = .{
            .type = @Vector(4, f32),
            .min_value = .{ 0.0, 0.0, 0.0, 0.0 },
            .max_value = .{ 1.0, 1.0, 1.0, 1.0 },
            .default_value = .{ 0.0, 0.195, 0.3, 1.0 },
            .parameter_type = "colorRGBA",
        },
        .color4 = .{
            .type = @Vector(4, f32),
            .min_value = .{ 0.0, 0.0, 0.0, 0.0 },
            .max_value = .{ 1.0, 1.0, 1.0, 1.0 },
            .default_value = .{ 0.983, 0.89, 0.656, 1.0 },
            .parameter_type = "colorRGBA",
        },
        .color5 = .{
            .type = @Vector(4, f32),
            .min_value = .{ 0.0, 0.0, 0.0, 0.0 },
            .max_value = .{ 1.0, 1.0, 1.0, 1.0 },
            .default_value = .{ 0.0, 0.0, 0.0, 1.0 },
            .parameter_type = "colorRGBA",
        },
        .color6 = .{
            .type = @Vector(4, f32),
            .min_value = .{ 0.0, 0.0, 0.0, 0.0 },
            .max_value = .{ 1.0, 1.0, 1.0, 1.0 },
            .default_value = .{ 1.0, 0.0, 0.0, 1.0 },
            .parameter_type = "colorRGBA",
        },
        .color7 = .{
            .type = @Vector(4, f32),
            .min_value = .{ 0.0, 0.0, 0.0, 0.0 },
            .max_value = .{ 1.0, 1.0, 1.0, 1.0 },
            .default_value = .{ 0.0, 1.0, 0.0, 1.0 },
            .parameter_type = "colorRGBA",
        },
        .color8 = .{
            .type = @Vector(4, f32),
            .min_value = .{ 0.0, 0.0, 0.0, 0.0 },
            .max_value = .{ 1.0, 1.0, 1.0, 1.0 },
            .default_value = .{ 0.0, 0.0, 1.0, 1.0 },
            .parameter_type = "colorRGBA",
        },
        .numColors = .{
            .type = i32,
            .min_value = 2,
            .max_value = 8,
            .default_value = 4,
        },
        .blur = .{
            .type = f32,
            .min_value = 0.0,
            .max_value = 4.0,
            .default_value = 0.5,
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
            color1: @Vector(4, f32),
            color2: @Vector(4, f32),
            color3: @Vector(4, f32),
            color4: @Vector(4, f32),
            color5: @Vector(4, f32),
            color6: @Vector(4, f32),
            color7: @Vector(4, f32),
            color8: @Vector(4, f32),
            numColors: i32,
            blur: f32,
            src: std.meta.fieldInfo(InputStruct, .src).type,
            
            // functions defined in kernel
            pub fn evaluatePixel(self: @This(), outCoord: @Vector(2, f32)) @Vector(4, f32) {
                // input variables
                const color1 = self.color1;
                const color2 = self.color2;
                const color3 = self.color3;
                const color4 = self.color4;
                const color5 = self.color5;
                const color6 = self.color6;
                const color7 = self.color7;
                const color8 = self.color8;
                const numColors = self.numColors;
                const blur = self.blur;
                const src = self.src;
                
                // output variable
                var dst: @Vector(4, f32) = undefined;
                
                var dist: f32 = undefined;
                var minDist: f32 = undefined;
                var tmp: f32 = undefined;
                var po: @Vector(4, f32) = src.sampleLinear(outCoord);
                po += src.sampleLinear(outCoord + @Vector(2, f32){ blur, 0.0 }) + src.sampleLinear(outCoord + @Vector(2, f32){ -blur, 0.0 });
                po += src.sampleLinear(outCoord + @Vector(2, f32){ 0.0, blur }) + src.sampleLinear(outCoord + @Vector(2, f32){ 0.0, -blur });
                if (po[3] < 0.01) {
                    dst = @Vector(4, f32){ 0.0, 0.0, 0.0, 0.0 };
                } else {
                    po /= @as(@Vector(4, f32), @splat(po[3]));
                    dst = color1;
                    tmp = po[0] - dst[0];
                    const tmp1 = tmp;
                    tmp = po[1] - dst[1];
                    const tmp2 = tmp;
                    tmp = po[2] - dst[2];
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
                        minDist = tmp7;
                        dst = color2;
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
                        minDist = tmp11;
                        dst = color3;
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
                        minDist = tmp15;
                        dst = color4;
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
                        minDist = tmp19;
                        dst = color5;
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
                        minDist = tmp23;
                        dst = color6;
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
                        minDist = tmp27;
                        dst = color7;
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
                        dst = color8;
                    }
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