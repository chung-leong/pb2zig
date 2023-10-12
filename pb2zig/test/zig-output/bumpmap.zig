// Pixel Bender kernel "Bumpmap" (translated using pb2zig)
const std = @import("std");

pub const kernel = struct {
    // kernel information
    pub const namespace = "com.shader";
    pub const vendor = "Elias Stehle";
    pub const version = 1;
    pub const description = "Bumpmap Shader - Stunning effects on texture-like inputs";
    pub const parameters = .{
        .on = .{
            .type = i32,
            .minValue = 0,
            .maxValue = 1,
            .defaultValue = 1,
            .description = "Only while on is 1, the shader will be applied to the input image",
        },
        .light = .{
            .type = @Vector(3, f32),
            .minValue = -@Vector(3, f32){
                2560.0,
                2560.0,
                10000.0,
            },
            .maxValue = .{
                2560.0,
                2560.0,
                10000.0,
            },
            .defaultValue = .{ 250.0, 250.0, 800.0 },
            .description = "The light coordinates (x,y,z). The z-coordinate always needs to be positive to be in front of the image",
        },
        .lightcolor = .{
            .type = @Vector(3, f32),
            .minValue = .{ 0.0, 0.0, 0.0 },
            .maxValue = .{ 1.0, 1.0, 1.0 },
            .defaultValue = .{ 1.0, 1.0, 1.0 },
            .description = "Color of the light source [R,G,B]",
        },
        .heightmap_multi = .{
            .type = f32,
            .minValue = 1.0,
            .maxValue = 10.0,
            .defaultValue = 1.0,
            .description = "A factor by which the heightmap differences will be multiplied",
        },
        .invert = .{
            .type = i32,
            .minValue = 0,
            .maxValue = 1,
            .defaultValue = 1,
            .description = "Invert heightmap",
        },
        .lightwidth = .{
            .type = f32,
            .minValue = 0.0,
            .maxValue = 10000.0,
            .defaultValue = 1300.0,
            .description = "The maximum reach/length of a light ray",
        },
        .reflection = .{
            .type = f32,
            .minValue = 0.0,
            .maxValue = 2.0,
            .defaultValue = 0.6,
            .description = "The strength of the surface reflection",
        },
        .refl_tolerance = .{
            .type = f32,
            .minValue = 0.0,
            .maxValue = 1000.0,
            .defaultValue = 9.0,
            .description = "The lower the value, the more exactly the reflection ray needs to reflected streight back towards the light source",
        },
    };
    pub const inputImages = .{
        .src = .{ .channels = 4 },
        .img = .{ .channels = 4 },
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
            const chann: i32 = 0;
            const use_ps: i32 = 0;

            // functions defined in kernel
            pub fn evaluatePixel(self: *@This()) void {
                const on = self.params.on;
                const light = self.params.light;
                const lightcolor = self.params.lightcolor;
                const heightmap_multi = self.params.heightmap_multi;
                const invert = self.params.invert;
                const lightwidth = self.params.lightwidth;
                const reflection = self.params.reflection;
                const refl_tolerance = self.params.refl_tolerance;
                const src = self.input.src;
                const img = self.input.img;
                const dst = self.output.dst;
                self.dst = @splat(0.0);

                if (!(on != 0)) {
                    self.dst = img.sampleNearest(self.outCoord());
                } else {
                    var height: f32 = undefined;
                    var hvec: @Vector(3, f32) = undefined;
                    var yvec: @Vector(3, f32) = undefined;
                    var fac: f32 = undefined;
                    height = src.sampleNearest(self.outCoord())[chann];
                    if (invert == 0) {
                        height = 1.0 - height;
                    }
                    var ray: @Vector(3, f32) = @Vector(3, f32){
                        self.outCoord()[0],
                        self.outCoord()[1],
                        height,
                    } - light;
                    var tmp_ray_len: f32 = length(ray);
                    if (tmp_ray_len > lightwidth) {
                        self.dst = @Vector(4, f32){
                            0.0,
                            0.0,
                            0.0,
                            img.sampleNearest(self.outCoord())[3],
                        };
                    } else {
                        hvec[2] = src.sampleNearest(self.outCoord() - @Vector(2, f32){ 2.0, 0.0 })[chann];
                        hvec[2] += src.sampleNearest(self.outCoord() - @Vector(2, f32){ 1.0, 0.0 })[chann];
                        hvec[2] -= src.sampleNearest(self.outCoord() + @Vector(2, f32){ 1.0, 0.0 })[chann];
                        hvec[2] -= src.sampleNearest(self.outCoord() + @Vector(2, f32){ 2.0, 0.0 })[chann];
                        hvec[0] = 4.0;
                        hvec[1] = 0.0;
                        hvec[2] *= heightmap_multi;
                        yvec[2] = src.sampleNearest(self.outCoord() - @Vector(2, f32){ 0.0, 2.0 })[chann];
                        yvec[2] += src.sampleNearest(self.outCoord() - @Vector(2, f32){ 0.0, 1.0 })[chann];
                        yvec[2] -= src.sampleNearest(self.outCoord() + @Vector(2, f32){ 0.0, 1.0 })[chann];
                        yvec[2] -= src.sampleNearest(self.outCoord() + @Vector(2, f32){ 0.0, 2.0 })[chann];
                        yvec[0] = 0.0;
                        yvec[1] = 4.0;
                        yvec[2] *= heightmap_multi;
                        if (invert == 1) {
                            yvec[2] = -yvec[2];
                            hvec[2] = -hvec[2];
                        }
                        var norm: @Vector(3, f32) = cross(hvec, yvec);
                        var tmp_dot: f32 = dot(ray, norm);
                        var refl_low: f32 = 0.99 - refl_tolerance / 10000.0;
                        var clightrefl: @Vector(3, f32) = .{ 0.0, 0.0, 0.0 };
                        if (tmp_dot < 0.0) {
                            fac = 1.0 - fract(tmp_dot / (tmp_ray_len * length(norm)));
                            if (fac > refl_low) {
                                if (fac > 1.0) {
                                    fac = 1.0;
                                }
                                clightrefl = @as(@Vector(3, f32), @splat(-1.0 / (refl_low * refl_low * refl_low - 3.0 * refl_low * refl_low + 3.0 * refl_low - 1.0) * (fac - refl_low) * (fac - refl_low) * (fac - refl_low) * reflection)) * lightcolor;
                            }
                            fac = fac * fac * fac * 1.1;
                            fac = fac * fac * fac * fac;
                            if (fac > 0.0) {
                                hvec = clightrefl + @as(@Vector(3, f32), @splat((lightwidth - tmp_ray_len) / lightwidth * fac)) * @shuffle(f32, img.sampleNearest(self.outCoord()), undefined, @Vector(3, i32){ 0, 1, 2 });
                                self.dst = @Vector(4, f32){
                                    hvec[0],
                                    hvec[1],
                                    hvec[2],
                                    img.sampleNearest(self.outCoord())[3],
                                };
                            } else {
                                self.dst = @Vector(4, f32){
                                    0.0,
                                    0.0,
                                    0.0,
                                    img.sampleNearest(self.outCoord())[3],
                                };
                            }
                        } else {
                            self.dst = @Vector(4, f32){
                                0.0,
                                0.0,
                                0.0,
                                img.sampleNearest(self.outCoord())[3],
                            };
                        }
                    }
                }

                dst.setPixel(self.outputCoord[0], self.outputCoord[1], self.dst);
            }

            pub fn outCoord(self: *@This()) @Vector(2, f32) {
                return .{ @as(f32, @floatFromInt(self.outputCoord[0])) + 0.5, @as(f32, @floatFromInt(self.outputCoord[1])) + 0.5 };
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

    // built-in Pixel Bender functions
    fn fract(v: anytype) @TypeOf(v) {
        return v - @floor(v);
    }

    fn length(v: anytype) f32 {
        // return switch (@typeInfo(@TypeOf(v))) {
            //     .Vector => @sqrt(@reduce(.Add, v * v)),
            //     else => @abs(v),
            // };
        return switch (@typeInfo(@TypeOf(v))) {
            .Vector => @sqrt(@reduce(.Add, v * v)),
            else => @fabs(v),
        };
    }

    fn dot(v1: anytype, v2: anytype) f32 {
        return switch (@typeInfo(@TypeOf(v1))) {
            .Vector => @reduce(.Add, v1 * v2),
            else => v1 * v2,
        };
    }

    fn cross(v1: anytype, v2: anytype) @TypeOf(v1) {
        const CT = @typeInfo(@TypeOf(v1)).Vector.child;
        const p1 = @shuffle(CT, v1, undefined, @Vector(3, i32){ 1, 2, 0 }) * @shuffle(CT, v2, undefined, @Vector(3, i32){ 2, 0, 1 });
        const p2 = @shuffle(CT, v1, undefined, @Vector(3, i32){ 2, 0, 1 }) * @shuffle(CT, v2, undefined, @Vector(3, i32){ 1, 2, 0 });
        return p1 - p2;
    }
};

pub const Input = KernelInput(u8, kernel);
pub const Output = KernelOutput(u8, kernel);
pub const Parameters = KernelParameters(kernel);

pub fn createOutput(allocator: std.mem.Allocator, width: u32, height: u32, input: Input, params: Parameters) !Output {
    return createPartialOutputOf(u8, allocator, width, height, 0, height, input, params);
}

pub fn createPartialOutput(allocator: std.mem.Allocator, width: u32, height: u32, start: u32, count: u32, input: Input, params: Parameters) !Output {
    return createPartialOutputOf(u8, allocator, width, height, start, count, input, params);
}

fn createPartialOutputOf(comptime T: type, allocator: std.mem.Allocator, width: u32, height: u32, start: u32, count: u32, input: KernelInput(T, kernel), params: Parameters) !KernelOutput(u8, kernel) {
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
    if (@hasDecl(@TypeOf(instance), "evaluateDependents")) {
        instance.evaluateDependents();
    }
    instance.outputCoord[1] = start;
    while (instance.outputCoord[1] < height) : (instance.outputCoord[1] += 1) {
        instance.outputCoord[0] = 0;
        while (instance.outputCoord[0] < width) : (instance.outputCoord[0] += 1) {
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
            // requires newest version of zig, which has issues
            //
            // const numerator: FPixel = switch (len) {
                //     1 => @floatFromInt(@shuffle(T, pixel, undefined, @Vector(1, i32){0})),
                //     2 => @floatFromInt(@shuffle(T, pixel, undefined, @Vector(2, i32){ 0, 3 })),
                //     3 => @floatFromInt(@shuffle(T, pixel, undefined, @Vector(3, i32){ 0, 1, 2 })),
                //     4 => @floatFromInt(pixel),
                //     else => @compileError("Unsupported number of channels: " ++ len),
                // };
            // const denominator: FPixel = @splat(@floatFromInt(std.math.maxInt(T)));
            // return numerator / denominator;
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
            // const max: f32 = @floatFromInt(std.math.maxInt(T));
            // const multiplier: FPixel = @splat(max);
            // const product: FPixel = contrain(pixel * multiplier, max);
            // const maxAlpha: @Vector(1, f32) = .{std.math.maxInt(T)};
            // const result: Pixel = switch (len) {
                //     1 => @intFromFloat(@shuffle(f32, product, maxAlpha, @Vector(4, i32){ 0, 0, 0, -1 })),
                //     2 => @intFromFloat(@shuffle(f32, product, undefined, @Vector(4, i32){ 0, 0, 0, 1 })),
                //     3 => @intFromFloat(@shuffle(f32, product, maxAlpha, @Vector(4, i32){ 0, 1, 2, -1 })),
                //     4 => @intFromFloat(product),
                //     else => @compileError("Unsupported number of channels: " ++ len),
                // };
            // return result;
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

        fn getPixel(self: @This(), ix: i32, iy: i32) FPixel {
            const x = unsign(ix);
            const y = unsign(iy);
            if (x >= self.width or y >= self.height) {
                return @as(FPixel, @splat(0));
            }
            const index = (y * self.width) + x - self.offset;
            const src_pixel = self.data[index];
            const pixel: FPixel = switch (@typeInfo(T)) {
                .Float => pbPixelFromFloatPixel(src_pixel),
                .Int => pbPixelFromIntPixel(src_pixel),
                else => @compileError("Unsupported type: " ++ @typeName(T)),
            };
            return pixel;
        }

        fn setPixel(self: @This(), x: u32, y: u32, pixel: FPixel) void {
            if (comptime !writable) {
                return;
            }
            const index = (y * self.width) + x - self.offset;
            const dst_pixel: Pixel = switch (@typeInfo(T)) {
                .Float => floatPixelFromPBPixel(pixel),
                .Int => intPixelFromPBPixel(pixel),
                else => @compileError("Unsupported type: " ++ @typeName(T)),
            };
            self.data[index] = dst_pixel;
        }

        fn pixelSize(self: @This()) @Vector(2, f32) {
            _ = self;
            return .{ 1, 1 };
        }

        fn pixelAspectRatio(self: @This()) f32 {
            _ = self;
            return 1;
        }

        fn sampleNearest(self: @This(), coord: @Vector(2, f32)) FPixel {
            const x: i32 = @intFromFloat(coord[0]);
            const y: i32 = @intFromFloat(coord[1]);
            return self.getPixel(x, y);
        }

        fn sampleLinear(self: @This(), coord: @Vector(2, f32)) FPixel {
            const c = coord - @as(@Vector(2, f32), @splat(0.5));
            const x: i32 = @intFromFloat(c[0]);
            const y: i32 = @intFromFloat(c[1]);
            const f0 = c - @floor(c);
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
