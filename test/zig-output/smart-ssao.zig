// Pixel Bender "SmartSSAO" (translated using pb2zig)
const std = @import("std");

pub const kernel = struct {
    // kernel information
    pub const namespace = "com.smart-page-net.shaders";
    pub const vendor = "smart-page.net - Jan Frischmuth";
    pub const version = 2;
    pub const description = "Computes screen space ambien occlusion from a depth buffer";
    pub const parameters = .{
        .A_bias = .{
            .type = f32,
            .minValue = 0.0,
            .maxValue = 100.0,
            .defaultValue = 10.0,
        },
        .B_radius = .{
            .type = f32,
            .minValue = 0.0,
            .maxValue = 10.0,
            .defaultValue = 1.0,
        },
        .C_bleed = .{
            .type = f32,
            .minValue = 0.01,
            .maxValue = 3.0,
            .defaultValue = 2.0,
        },
        .D_lightxy = .{
            .type = @Vector(2, f32),
            .minValue = .{ -1.0, -1.0 },
            .maxValue = .{ 1.0, 1.0 },
            .defaultValue = .{ 0.0, 0.0 },
        },
        .E_noise = .{
            .type = f32,
            .minValue = -0.1,
            .maxValue = 0.1,
            .defaultValue = 0.02,
        },
        .F_brightness = .{
            .type = f32,
            .minValue = 0.0,
            .maxValue = 2.0,
            .defaultValue = 1.0,
        },
        .G_contrast = .{
            .type = f32,
            .minValue = 0.0,
            .maxValue = 5.0,
            .defaultValue = 1.0,
        },
    };
    pub const inputImages = .{
        .depthmap = .{ .channels = 4 },
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
            
            // dependent variables
            sphere_x: [12]f32 = undefined,
            sphere_y: [12]f32 = undefined,
            
            // constants
            const unpack: @Vector(3, f32) = @Vector(3, f32){ 255.0 / 256.0, 255.0 / (256.0 * 256.0), 255.0 / (256.0 * 256.0 * 256.0) };
            
            // functions defined in kernel
            pub fn evaluateDependents(self: *@This()) void {
                self.sphere_x[0] = -0.326212;
                self.sphere_y[0] = -0.405805;
                self.sphere_x[1] = -0.840144;
                self.sphere_y[1] = -0.07358;
                self.sphere_x[2] = -0.695914;
                self.sphere_y[2] = 0.457137;
                self.sphere_x[3] = -0.203345;
                self.sphere_y[3] = 0.620716;
                self.sphere_x[4] = 0.96234;
                self.sphere_y[4] = -0.194983;
                self.sphere_x[5] = 0.473434;
                self.sphere_y[5] = -0.480026;
                self.sphere_x[6] = 0.519456;
                self.sphere_y[6] = 0.767022;
                self.sphere_x[7] = 0.185461;
                self.sphere_y[7] = -0.893124;
                self.sphere_x[8] = 0.507431;
                self.sphere_y[8] = 0.064425;
                self.sphere_x[9] = 0.89642;
                self.sphere_y[9] = 0.412458;
                self.sphere_x[10] = -0.32194;
                self.sphere_y[10] = -0.932615;
                self.sphere_x[11] = -0.791559;
                self.sphere_y[11] = -0.597705;
            }
            
            fn random(arg: @Vector(2, f32)) f32 {
                return 0.5 + (fract(sin(dot(@shuffle(f32, arg, undefined, @Vector(2, i32){ 0, 1 }), @Vector(2, f32){ 12.9898, 78.233 })) * 43758.5453)) * 0.5;
            }
            
            pub fn evaluatePixel(self: *@This()) void {
                self.dst = @splat(0);
                const depthmap = self.input.depthmap;
                const sphere_x = self.sphere_x;
                const sphere_y = self.sphere_y;
                const D_lightxy = self.input.D_lightxy;
                const B_radius = self.input.B_radius;
                const E_noise = self.input.E_noise;
                const A_bias = self.input.A_bias;
                const C_bleed = self.input.C_bleed;
                const F_brightness = self.input.F_brightness;
                const G_contrast = self.input.G_contrast;
                
                var zbu: f32 = undefined;
                var pd: f32 = undefined;
                var bl: f32 = undefined;
                var sd: f32 = undefined;
                var dc: f32 = undefined;
                var zd: f32 = undefined;
                var tmp: f32 = undefined;
                var pt: @Vector(2, f32) = undefined;
                var rnd: @Vector(2, f32) = undefined;
                rnd = @Vector(2, f32){ random(self.outCoord()), random(self.outCoord()) };
                zbu = dot(@shuffle(f32, depthmap.sampleNearest(self.outCoord()), undefined, @Vector(3, i32){ 0, 1, 2 }), unpack);
                if (zbu == 0.0) {
                    zbu = 0.0001;
                }
                {
                    var i: i32 = 0;
                    while (i < 12) {
                        pt = @Vector(2, f32){ sphere_x[@intCast(i)], sphere_y[@intCast(i)] } + rnd + @Vector(2, f32){ D_lightxy[0] - 1.0, D_lightxy[1] * -1.0 - 1.0 };
                        sd = (dot(@shuffle(f32, depthmap.sampleNearest(@shuffle(f32, self.outCoord(), undefined, @Vector(2, i32){ 0, 1 }) + pt * @as(@Vector(2, f32), @splat(B_radius)) / @as(@Vector(2, f32), @splat(zbu))), undefined, @Vector(3, i32){ 0, 1, 2 }), unpack) + E_noise * rnd[0]) * (A_bias * 10.0);
                        dc = zbu * (A_bias * 10.0) - sd;
                        if (zbu == 0.0) {
                            dc = 0.0;
                        }
                        if (sd == 0.0) {
                            dc = 0.0;
                        }
                        dc = dc * (2.0 - (dc / C_bleed));
                        zd = 0.5 * max(dc + F_brightness, 0.0);
                        bl += 1.0 / (1.0 + zd * zd);
                        i += 1;
                    }
                }
                bl /= 12.0;
                tmp = pow(bl, G_contrast);
                self.dst = @Vector(4, f32){ tmp, tmp, tmp, 1.0 };
                
                self.output.dst.setPixel(self.outputCoord[0], self.outputCoord[1], self.dst);
                _ = pd;
            }
            
            // built-in Pixel Bender functions
            fn outCoord(self: *@This()) @Vector(2, f32) {
                const x = self.outputCoord[0];
                const y = self.outputCoord[1];
                return .{ @floatFromInt(x), @floatFromInt(y) };
            }
            
            fn sin(v: anytype) @TypeOf(v) {
                return @sin(v);
            }
            
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