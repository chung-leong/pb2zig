// Pixel Bender kernel "sphereSection" (translated using pb2zig)
const std = @import("std");

pub const kernel = struct {
    // kernel information
    pub const namespace = "AIF";
    pub const vendor = "omino.com";
    pub const version = 2;
    pub const description = "spheresection";
    pub const parameters = .{
        .xAxisColor = .{
            .type = @Vector(3, f32),
            .defaultValue = .{ 1.0, 0.3, 0.4 },
        },
        .yAxisColor = .{
            .type = @Vector(3, f32),
            .defaultValue = .{ 0.3, 0.8, 0.4 },
        },
        .zAxisColor = .{
            .type = @Vector(3, f32),
            .defaultValue = .{ 0.1, 0.3, 1.0 },
        },
        .center = .{
            .type = @Vector(2, f32),
            .minValue = .{ 0.0, 0.0 },
            .maxValue = .{ 800.0, 800.0 },
            .defaultValue = .{ 300.0, 300.0 },
        },
        .spin = .{
            .type = @Vector(3, f32),
            .minValue = .{ -10.0, -10.0, -10.0 },
            .maxValue = .{ 10.0, 10.0, 10.0 },
            .defaultValue = .{ 0.1, 0.02, 0.3 },
        },
        .plunge = .{
            .type = f32,
            .minValue = 0.0,
            .maxValue = 20.0,
            .defaultValue = 0.0,
        },
        .cellDensity = .{
            .type = f32,
            .minValue = 0.005,
            .maxValue = 0.1,
            .defaultValue = 0.03,
        },
        .radius = .{
            .type = f32,
            .minValue = 5.0,
            .maxValue = 200.0,
            .defaultValue = 100.0,
        },
    };
    pub const inputImages = .{
        .unused = .{ .channels = 3 },
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
                const xAxisColor = self.params.xAxisColor;
                const yAxisColor = self.params.yAxisColor;
                const zAxisColor = self.params.zAxisColor;
                const center = self.params.center;
                const spin = self.params.spin;
                const plunge = self.params.plunge;
                const cellDensity = self.params.cellDensity;
                const radius = self.params.radius;
                const dst = self.output.dst;
                self.dst = @splat(0.0);

                var axis1: @Vector(3, f32) = .{ 1.0, 0.0, 0.0 };
                var axis2: @Vector(3, f32) = .{ 0.0, 1.0, 0.0 };
                const elevR: [3]@Vector(3, f32) = .{
                    .{ 1.0, 0.0, 0.0 },
                    .{
                        0.0,
                        cos(spin[0]),
                        sin(spin[0]),
                    },
                    .{
                        0.0,
                        -sin(spin[0]),
                        cos(spin[0]),
                    },
                };
                const bearR: [3]@Vector(3, f32) = .{
                    .{
                        cos(spin[1]),
                        sin(spin[1]),
                        0.0,
                    },
                    .{
                        -sin(spin[1]),
                        cos(spin[1]),
                        0.0,
                    },
                    .{ 0.0, 0.0, 1.0 },
                };
                const yamR: [3]@Vector(3, f32) = .{
                    .{
                        cos(spin[2]),
                        0.0,
                        sin(spin[2]),
                    },
                    .{ 0.0, 1.0, 0.0 },
                    .{
                        -sin(spin[2]),
                        0.0,
                        cos(spin[2]),
                    },
                };
                axis1 = @"V * M"(axis1, @"M * M"(@"M * M"(elevR, bearR), yamR));
                axis2 = @"V * M"(axis2, @"M * M"(@"M * M"(elevR, bearR), yamR));
                const oc: @Vector(2, f32) = (self.outCoord() - center) * @as(@Vector(2, f32), @splat(cellDensity));
                var p: @Vector(3, f32) = @as(@Vector(3, f32), @splat(oc[0])) * axis1 + @as(@Vector(3, f32), @splat(oc[1])) * axis2;
                var perp: @Vector(3, f32) = cross(axis1, axis2);
                var plungeMore: f32 = radius * radius * cellDensity * cellDensity - oc[0] * oc[0] - oc[1] * oc[1];
                if (plungeMore < 0.0) {
                    plungeMore = 0.0;
                }
                plungeMore = sqrt(plungeMore);
                p += @as(@Vector(3, f32), @splat((plunge - plungeMore))) * perp;
                const pCell: @Vector(3, f32) = floor(p);
                _ = pCell;
                p = mod(p, 1.0);
                const perpStep: @Vector(3, f32) = @as(@Vector(3, f32), @splat(1.0)) - step(0.0, perp);
                p = perpStep - p;
                p = abs(p);
                perp = abs(perp);
                const t: @Vector(3, f32) = p / perp;
                var co: @Vector(3, f32) = .{ 0.0, 0.0, 0.0 };
                var z: f32 = undefined;
                if (t[0] >= 0.0) {
                    co = xAxisColor;
                    z = t[0];
                }
                if (t[1] >= 0.0 and t[1] < t[0]) {
                    co = yAxisColor;
                    z = t[1];
                }
                if (t[2] >= 0.0 and t[2] < t[0] and t[2] < t[1]) {
                    co = zAxisColor;
                    z = t[2];
                }
                self.dst = @shuffle(f32, self.dst, co * @as(@Vector(3, f32), @splat((1.0 - z / 1.2))), @Vector(4, i32){ -1, -2, -3, 3 });
                self.dst[3] = 1.0;
                if (plungeMore == 0.0) {
                    self.dst = @shuffle(f32, self.dst, @shuffle(f32, self.dst, undefined, @Vector(3, i32){ 0, 1, 2 }) * @as(@Vector(3, f32), @splat(0.0)), @Vector(4, i32){ -1, -2, -3, 3 });
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
    fn sin(v: anytype) @TypeOf(v) {
        return @sin(v);
    }

    fn cos(v: anytype) @TypeOf(v) {
        return @cos(v);
    }

    fn sqrt(v: anytype) @TypeOf(v) {
        return @sqrt(v);
    }

    fn abs(v: anytype) @TypeOf(v) {
        return @abs(v);
    }

    fn floor(v: anytype) @TypeOf(v) {
        return @floor(v);
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

    fn step(v1: anytype, v2: anytype) @TypeOf(v2) {
        return switch (@typeInfo(@TypeOf(v1))) {
            .Vector => calc: {
                const ones: @TypeOf(v2) = @splat(1);
                const zeros: @TypeOf(v2) = @splat(0);
                break :calc @select(@typeInfo(@TypeOf(v2)).Vector.child, v2 < v1, zeros, ones);
            },
            else => switch (@typeInfo(@TypeOf(v2))) {
                .Vector => step(@as(@TypeOf(v2), @splat(v1)), v2),
                else => if (v2 < v1) 0 else 1,
            },
        };
    }

    fn cross(v1: anytype, v2: anytype) @TypeOf(v1) {
        const CT = @typeInfo(@TypeOf(v1)).Vector.child;
        const p1 = @shuffle(CT, v1, undefined, @Vector(3, i32){ 1, 2, 0 }) * @shuffle(CT, v2, undefined, @Vector(3, i32){ 2, 0, 1 });
        const p2 = @shuffle(CT, v1, undefined, @Vector(3, i32){ 2, 0, 1 }) * @shuffle(CT, v2, undefined, @Vector(3, i32){ 1, 2, 0 });
        return p1 - p2;
    }

    fn @"M * M"(m1: anytype, m2: anytype) @TypeOf(m1) {
        const ar = @typeInfo(@TypeOf(m2)).Array;
        var result: @TypeOf(m2) = undefined;
        inline for (0..ar.len) |r| {
            var row: ar.child = undefined;
            inline for (m1, 0..) |column, c| {
                row[c] = column[r];
            }
            inline for (m2, 0..) |column, c| {
                result[c][r] = @reduce(.Add, row * column);
            }
        }
        return result;
    }

    fn @"V * M"(v1: anytype, m2: anytype) @TypeOf(v1) {
        var result: @TypeOf(v1) = undefined;
        inline for (m2, 0..) |column, c| {
            result[c] = @reduce(.Add, column * v1);
        }
        return result;
    }
};

pub const Input = KernelInput(u8, kernel);
pub const Output = KernelOutput(u8, kernel);
pub const Parameters = KernelParameters(kernel);

pub fn createOutput(allocator: std.mem.Allocator, width: u32, height: u32, input: Input, params: Parameters) !Output {
    return createPartialOutput(allocator, width, height, 0, height, input, params);
}

pub fn createPartialOutput(allocator: std.mem.Allocator, width: u32, height: u32, start: u32, count: u32, input: Input, params: Parameters) !Output {
    var output: Output = undefined;
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
    const end = start + count;
    instance.outputCoord[1] = start;
    while (instance.outputCoord[1] < end) : (instance.outputCoord[1] += 1) {
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
        offset: usize = 0,

        fn constrain(v: anytype, min: f32, max: f32) @TypeOf(v) {
            const lower: @TypeOf(v) = @splat(min);
            const upper: @TypeOf(v) = @splat(max);
            const v2 = @select(f32, v > lower, v, lower);
            return @select(f32, v2 < upper, v2, upper);
        }

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
                1 => @floatFromInt(@shuffle(T, pixel, undefined, @Vector(1, i32){0})),
                2 => @floatFromInt(@shuffle(T, pixel, undefined, @Vector(2, i32){ 0, 3 })),
                3 => @floatFromInt(@shuffle(T, pixel, undefined, @Vector(3, i32){ 0, 1, 2 })),
                4 => @floatFromInt(pixel),
                else => @compileError("Unsupported number of channels: " ++ len),
            };
            const denominator: FPixel = @splat(@floatFromInt(std.math.maxInt(T)));
            return numerator / denominator;
        }

        fn intPixelFromPBPixel(pixel: FPixel) Pixel {
            const max: f32 = @floatFromInt(std.math.maxInt(T));
            const multiplier: FPixel = @splat(max);
            const product: FPixel = constrain(pixel * multiplier, 0, max);
            const maxAlpha: @Vector(1, f32) = .{std.math.maxInt(T)};
            return switch (len) {
                1 => @intFromFloat(@shuffle(f32, product, maxAlpha, @Vector(4, i32){ 0, 0, 0, -1 })),
                2 => @intFromFloat(@shuffle(f32, product, undefined, @Vector(4, i32){ 0, 0, 0, 1 })),
                3 => @intFromFloat(@shuffle(f32, product, maxAlpha, @Vector(4, i32){ 0, 1, 2, -1 })),
                4 => @intFromFloat(product),
                else => @compileError("Unsupported number of channels: " ++ len),
            };
        }

        fn getPixel(self: @This(), x: u32, y: u32) FPixel {
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

        inline fn getPixelAt(self: @This(), coord: @Vector(2, f32)) FPixel {
            const left_top: @Vector(2, f32) = .{ 0, 0 };
            const bottom_right: @Vector(2, f32) = .{ @floatFromInt(self.width - 1), @floatFromInt(self.height - 1) };
            if (@reduce(.And, coord >= left_top) and @reduce(.And, coord <= bottom_right)) {
                const ic: @Vector(2, u32) = @intFromFloat(coord);
                return self.getPixel(ic[0], ic[1]);
            } else {
                return @splat(0);
            }
        }

        fn sampleNearest(self: @This(), coord: @Vector(2, f32)) FPixel {
            return self.getPixelAt(@floor(coord));
        }

        fn sampleLinear(self: @This(), coord: @Vector(2, f32)) FPixel {
            const c = coord - @as(@Vector(2, f32), @splat(0.5));
            const c0 = @floor(c);
            const f0 = c - c0;
            const f1 = @as(@Vector(2, f32), @splat(1)) - f0;
            const w: @Vector(4, f32) = .{
                f1[0] * f1[1],
                f0[0] * f1[1],
                f1[0] * f0[1],
                f0[0] * f0[1],
            };
            const p00 = self.getPixelAt(c0);
            const p01 = self.getPixelAt(c0 + @as(@Vector(2, f32), .{ 0, 1 }));
            const p10 = self.getPixelAt(c0 + @as(@Vector(2, f32), .{ 1, 0 }));
            const p11 = self.getPixelAt(c0 + @as(@Vector(2, f32), .{ 1, 1 }));
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
            .layout = .auto,
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
            .layout = .auto,
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
            .layout = .auto,
            .fields = &struct_fields,
            .decls = &.{},
            .is_tuple = false,
        },
    });
}
