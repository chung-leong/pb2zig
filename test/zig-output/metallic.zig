// Pixel Bender "VertexRenderer" (translated using pb2zig)
const std = @import("std");

pub const kernel = struct {
    // kernel information
    pub const namespace = "Metallic";
    pub const vendor = "Petri Leskinen";
    pub const version = 1;
    pub const description = "Metallic -effect";
    pub const parameters = .{
        .lightsource = .{
            .type = @Vector(3, f32),
            .minValue = .{ -1000.0, -1000.0, -1000.0 },
            .maxValue = .{ 1000.0, 1000.0, 1000.0 },
            .defaultValue = .{ 200.0, 60.0, 40.0 },
            .description = "xyz-location of the light source",
        },
        .shininess = .{
            .type = i32,
            .minValue = 2,
            .maxValue = 64,
            .defaultValue = 40,
            .description = "shininess",
        },
        .shadow = .{
            .type = f32,
            .minValue = 0.0,
            .maxValue = 1.0,
            .defaultValue = 0.4,
            .description = "depth of shadow areas",
        },
        .relief = .{
            .type = f32,
            .minValue = 1.0,
            .maxValue = 10.0,
            .defaultValue = 2.0,
            .description = "the height of 3D effect",
        },
        .stripesize = .{
            .type = @Vector(2, f32),
            .minValue = .{ 1.0, 1.0 },
            .maxValue = .{ 256.0, 200.0 },
            .defaultValue = .{ 256.0, 10.0 },
            .description = "the size for input 'stripe'",
        },
        .viewDirection = .{
            .type = @Vector(3, f32),
            .minValue = .{ -1.0, -1.0, -1.0 },
            .maxValue = .{ 1.0, 1.0, 1.0 },
            .defaultValue = .{ 0.0, 0.0, 1.0 },
        },
    };
    pub const inputImages = .{
        .source = .{ .channels = 4 },
        .stripe = .{ .channels = 4 },
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
            
            // functions defined in kernel
            pub fn evaluatePixel(self: *@This()) void {
                self.clearOutputPixel();
                const relief = self.input.relief;
                const lightsource = self.input.lightsource;
                const shadow = self.input.shadow;
                const viewDirection = self.input.viewDirection;
                const shininess = self.input.shininess;
                const stripesize = self.input.stripesize;
                
                var po: @Vector(2, f32) = self.outCoord();
                var tmp4: @Vector(4, f32) = undefined;
                self.dst = self.input.source.sampleLinear(po);
                if (self.dst[3] > 0.01) {
                    var sourcesample: @Vector(4, f32) = self.dst;
                    tmp4 = self.input.source.sampleLinear(po + @Vector(2, f32){ -3.0, 0.0 });
                    const tmp1 = tmp4;
                    tmp4 = self.input.source.sampleLinear(po + @Vector(2, f32){ -2.0, 0.0 });
                    const tmp2 = tmp4;
                    tmp4 = self.input.source.sampleLinear(po + @Vector(2, f32){ -1.0, 0.0 });
                    const tmp3 = tmp4;
                    tmp4 = self.input.source.sampleLinear(po + @Vector(2, f32){ 1.0, 0.0 });
                    const tmp5 = tmp4;
                    tmp4 = self.input.source.sampleLinear(po + @Vector(2, f32){ 2.0, 0.0 });
                    const tmp6 = tmp4;
                    tmp4 = self.input.source.sampleLinear(po + @Vector(2, f32){ 3.0, 0.0 });
                    const tmp7 = tmp4;
                    tmp4 = self.input.source.sampleLinear(po + @Vector(2, f32){ 0.0, -3.0 });
                    const tmp8 = tmp4;
                    tmp4 = self.input.source.sampleLinear(po + @Vector(2, f32){ 0.0, -2.0 });
                    const tmp9 = tmp4;
                    tmp4 = self.input.source.sampleLinear(po + @Vector(2, f32){ 0.0, -1.0 });
                    const tmp10 = tmp4;
                    tmp4 = self.input.source.sampleLinear(po + @Vector(2, f32){ 0.0, 1.0 });
                    const tmp11 = tmp4;
                    tmp4 = self.input.source.sampleLinear(po + @Vector(2, f32){ 0.0, 2.0 });
                    const tmp12 = tmp4;
                    tmp4 = self.input.source.sampleLinear(po + @Vector(2, f32){ 0.0, 3.0 });
                    const tmp13 = tmp4;
                    var normal: @Vector(3, f32) = @Vector(3, f32){ (0.7 * tmp1[1] + 0.2 * tmp4[0] + 0.1 * tmp4[2]) + (0.7 * tmp2[1] + 0.2 * tmp4[0] + 0.1 * tmp4[2]) + (0.7 * tmp3[1] + 0.2 * tmp4[0] + 0.1 * tmp4[2]) - (0.7 * tmp5[1] + 0.2 * tmp4[0] + 0.1 * tmp4[2]) - (0.7 * tmp6[1] + 0.2 * tmp4[0] + 0.1 * tmp4[2]) - (0.7 * tmp7[1] + 0.2 * tmp4[0] + 0.1 * tmp4[2]), (0.7 * tmp8[1] + 0.2 * tmp4[0] + 0.1 * tmp4[2]) + (0.7 * tmp9[1] + 0.2 * tmp4[0] + 0.1 * tmp4[2]) + (0.7 * tmp10[1] + 0.2 * tmp4[0] + 0.1 * tmp4[2]) - (0.7 * tmp11[1] + 0.2 * tmp4[0] + 0.1 * tmp4[2]) - (0.7 * tmp12[1] + 0.2 * tmp4[0] + 0.1 * tmp4[2]) - (0.7 * tmp13[1] + 0.2 * tmp4[0] + 0.1 * tmp4[2]), 12.0 / relief };
                    var len: f32 = 1.0 / sqrt(normal[0] * normal[0] + normal[1] * normal[1] + normal[2] * normal[2] + 0.0);
                    normal *= @as(@Vector(3, f32), @splat(len));
                    var lightbeam: @Vector(3, f32) = lightsource;
                    lightbeam = @shuffle(f32, lightbeam, @shuffle(f32, lightbeam, undefined, @Vector(2, i32){ 0, 1 }) - po, @Vector(3, i32){ -1, -2, 2 });
                    tmp4 = sourcesample;
                    const tmp14 = tmp4;
                    lightbeam[2] -= 5.0 * relief * ((0.7 * tmp14[1] + 0.2 * tmp4[0] + 0.1 * tmp4[2]) - 1.0);
                    len = 1.0 / sqrt(lightbeam[0] * lightbeam[0] + lightbeam[1] * lightbeam[1] + lightbeam[2] * lightbeam[2] + 0.0);
                    lightbeam *= @as(@Vector(3, f32), @splat(len));
                    var refl: f32 = shadow + (1.0 - shadow) * dot(normal, lightbeam);
                    var v: @Vector(3, f32) = (@as(@Vector(3, f32), @splat(2.0)) * normal * @as(@Vector(3, f32), @splat(dot(viewDirection, normal))) / @as(@Vector(3, f32), @splat((normal[0] * normal[0] + normal[1] * normal[1] + normal[2] * normal[2]))) - viewDirection);
                    var spec: f32 = dot(v, lightbeam);
                    if (spec > 0.0) {
                        spec = pow(spec, @as(f32, @floatFromInt(shininess)));
                        refl += spec;
                    }
                    refl = clamp(refl, 0.0, 1.0);
                    self.dst = self.input.stripe.sampleLinear(@Vector(2, f32){ 0.5 + (stripesize[0] - 1.0) * refl, stripesize[1] });
                    self.dst[3] *= sourcesample[3];
                }
                
                self.setOutputPixel();
            }
            
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