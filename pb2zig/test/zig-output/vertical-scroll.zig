// Pixel Bender kernel "Scroll" (translated using pb2zig)
const std = @import("std");

pub const kernel = struct {
    // kernel information
    pub const namespace = "www.tbyrne.org";
    pub const vendor = "Tom Byrne";
    pub const version = 1;
    pub const parameters = .{
        .topRollRadius = .{
            .type = f32,
            .minValue = 0.0,
            .maxValue = 1000.0,
            .defaultValue = 100.0,
            .displayName = "Top Roll Radius",
        },
        .bottomRollRadius = .{
            .type = f32,
            .minValue = 0.0,
            .maxValue = 1000.0,
            .defaultValue = 100.0,
            .displayName = "Bottom Roll Radius",
        },
        .rollHeight = .{
            .type = f32,
            .minValue = 0.0,
            .maxValue = 1000.0,
            .defaultValue = 500.0,
            .displayName = "Roll Height",
        },
        .rollOffsetY = .{
            .type = f32,
            .minValue = 0.0,
            .maxValue = 1000.0,
            .defaultValue = 0.0,
            .displayName = "Roll Offset Y",
        },
        .rollWidth = .{
            .type = f32,
            .minValue = 0.0,
            .maxValue = 1000.0,
            .defaultValue = 500.0,
            .displayName = "Roll Width",
        },
        .rollOffsetX = .{
            .type = f32,
            .minValue = 0.0,
            .maxValue = 1000.0,
            .defaultValue = 0.0,
            .displayName = "Roll Offset X",
        },
        .fogColour = .{
            .type = @Vector(3, f32),
            .minValue = .{ 0, 0, 0 },
            .maxValue = .{ 0, 0, 0 },
            .defaultValue = .{ 0, 0, 0 },
            .parameterType = "colorRGB",
            .displayName = "Fog Colour",
        },
        .fogInfluence = .{
            .type = f32,
            .minValue = 0.0,
            .maxValue = 10.0,
            .defaultValue = 1.0,
            .displayName = "Fog Influence",
        },
        .fade = .{
            .type = f32,
            .minValue = 0.0,
            .maxValue = 10.0,
            .defaultValue = 1.0,
            .displayName = "Fade",
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

            // functions defined in kernel
            pub fn evaluatePixel(self: *@This()) void {
                const topRollRadius = self.params.topRollRadius;
                const bottomRollRadius = self.params.bottomRollRadius;
                const rollHeight = self.params.rollHeight;
                const rollOffsetY = self.params.rollOffsetY;
                const rollWidth = self.params.rollWidth;
                const rollOffsetX = self.params.rollOffsetX;
                const fogColour = self.params.fogColour;
                const fogInfluence = self.params.fogInfluence;
                const fade = self.params.fade;
                const src = self.input.src;
                const dst = self.output.dst;
                self.dst = @splat(0.0);

                var pi: f32 = 3.14159265358979;
                var pos: @Vector(2, f32) = self.outCoord();
                var yFract: f32 = undefined;
                var xFract: f32 = undefined;
                var yDir: f32 = undefined;
                var rollRadius: f32 = undefined;
                var doRoll: bool = undefined;
                if (pos[1] < rollOffsetY or pos[1] > rollOffsetY + rollHeight or pos[0] < rollOffsetX or pos[0] > rollOffsetX + rollWidth) {
                    self.dst = @Vector(4, f32){ 0.0, 0.0, 0.0, 0.0 };
                    doRoll = true;
                } else if (pos[1] < rollOffsetY + topRollRadius) {
                    doRoll = true;
                    yFract = 1.0 - ((pos[1] - rollOffsetY) / topRollRadius);
                    xFract = (pos[0] - rollOffsetX - rollWidth / 2.0) / (rollWidth / 2.0);
                    yDir = -1.0;
                    rollRadius = topRollRadius;
                } else if (pos[1] > rollOffsetY + rollHeight - bottomRollRadius) {
                    doRoll = true;
                    yFract = ((pos[1] - (rollOffsetY + rollHeight - bottomRollRadius)) / bottomRollRadius);
                    xFract = (pos[0] - rollOffsetX - rollWidth / 2.0) / (rollWidth / 2.0);
                    yDir = 1.0;
                    rollRadius = bottomRollRadius;
                } else {
                    doRoll = true;
                    self.dst = src.sampleNearest(pos);
                }
                if (doRoll) {
                    var ySin: f32 = 1.0 - sqrt(1.0 - (yFract * yFract));
                    var rollVisible: f32 = rollRadius * pi / 2.0;
                    var posX: f32 = pos[0] + (xFract * ySin * rollRadius);
                    if (posX > rollOffsetX and posX < rollOffsetX + rollWidth) {
                        var colour: @Vector(4, f32) = src.sampleNearest(@Vector(2, f32){
                            posX,
                            pos[1] + ySin * rollVisible * yDir,
                        });
                        if (fogInfluence > 0.0) {
                            var inf: f32 = fogInfluence * ySin;
                            var invInf: f32 = 1.0 - inf;
                            colour[0] = colour[0] * invInf + fogColour[0] * inf;
                            colour[1] = colour[1] * invInf + fogColour[1] * inf;
                            colour[2] = colour[2] * invInf + fogColour[2] * inf;
                        }
                        if (fade > 0.0) {
                            colour[3] *= (1.0 - fade * ySin);
                        }
                        self.dst = colour;
                    } else {
                        self.dst = @Vector(4, f32){ 0.0, 0.0, 0.0, 0.0 };
                    }
                }

                dst.setPixel(self.outputCoord[0], self.outputCoord[1], self.dst);
            }

            // built-in Pixel Bender functions
            fn outCoord(self: *@This()) @Vector(2, f32) {
                const x = self.outputCoord[0];
                const y = self.outputCoord[1];
                return .{ @floatFromInt(x), @floatFromInt(y) };
            }

            fn sqrt(v: anytype) @TypeOf(v) {
                return @sqrt(v);
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
            const numerator: FPixel = switch (len) {
                1 => @as(pixel, @floatFromInt(@shuffle(FPixel, pixel, undefined, @Vector(1, i32){0}))),
                2 => @as(pixel, @floatFromInt(@shuffle(FPixel, pixel, undefined, @Vector(2, i32){ 0, 3 }))),
                3 => @as(pixel, @floatFromInt(@shuffle(FPixel, pixel, undefined, @Vector(3, i32){ 0, 1, 2 }))),
                4 => @floatFromInt(pixel),
                else => @compileError("Unsupported number of channels: " ++ len),
            };
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
            const maxAlpha: @Vector(1, T) = .{std.math.maxInt(T)};
            const result: Pixel = switch (len) {
                1 => @intFromFloat(@shuffle(Pixel, product, maxAlpha, @Vector(4, i32){ 0, 0, 0, ~0 })),
                2 => @intFromFloat(@shuffle(Pixel, product, undefined, @Vector(4, i32){ 0, 0, 0, 1 })),
                3 => @intFromFloat(@shuffle(Pixel, product, maxAlpha, @Vector(4, i32){ 0, 1, 2, ~0 })),
                4 => @intFromFloat(product),
                else => @compileError("Unsupported number of channels: " ++ len),
            };
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
