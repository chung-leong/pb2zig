const std = @import("std");
const functions = @import("./functions.zig");

pub const kernel = struct {
    // parameter info
    pub const parameters = .{
        .n0 = .{
            .type = f32,
            .min_value = 0.0,
            .max_value = 1.0,
            .default_value = 0.0,
        },
        .n1 = .{
            .type = f32,
            .min_value = 0.0,
            .max_value = 1.5,
            .default_value = 0.6,
        },
        .n2 = .{
            .type = f32,
            .min_value = -0.5,
            .max_value = 0.5,
            .default_value = 0.11,
        },
    };
    pub const input = .{
        .src = .{ .channels = 4 },
    };
    pub const output = .{
        .dst = .{ .channels = 4 },
    };

    fn Instance(InputStruct: type) type {
        return struct {
            // parameter fields
            n0: f32,
            n1: f32,
            n2: f32,

            // input image(s)
            src: std.meta.fieldInfo(InputStruct, .src).type,

            // built-in PB functions
            const any = functions.any;
            const all = functions.all;
            const lessThan = functions.lessThan;

            fn evaluatePixel(self: @This(), outCoord: @Vector(2, f32)) @Vector(4, f32) {
                // input variables
                const n0 = self.n0;
                const n1 = self.n1;
                const n2 = self.n2;
                const src = self.src;

                // output variable
                var dst: @Vector(4, f32) = undefined;

                var p: @Vector(2, f32) = outCoord;
                var offset: @Vector(2, f32) = undefined;
                var dist: f32 = undefined;
                var c: @Vector(4, f32) = undefined;
                var temp: @Vector(4, f32) = undefined;
                var p0: @Vector(4, f32) = undefined;
                var p1: @Vector(4, f32) = undefined;
                var p2: @Vector(4, f32) = undefined;
                var p3: @Vector(4, f32) = undefined;
                var p4: @Vector(4, f32) = undefined;
                var p5: @Vector(4, f32) = undefined;
                var p6: @Vector(4, f32) = undefined;
                var p7: @Vector(4, f32) = undefined;
                var p8: @Vector(4, f32) = undefined;

                c = @Vector(4, f32){ n0, n0, n0, 1.0 };

                //-- no loops.

                dist = n1 * 1.0;
                offset[0] = 0.0;
                offset[1] = 0.0;
                p0 = src.sampleNearest(p + offset);
                offset[0] = -dist;
                offset[1] = -dist;
                p1 = src.sampleNearest(p + offset);
                offset[0] = 0.0;
                offset[1] = -dist;
                p2 = src.sampleNearest(p + offset);
                offset[0] = dist;
                offset[1] = -dist;
                p3 = src.sampleNearest(p + offset);
                offset[0] = dist;
                offset[1] = 0.0;
                p4 = src.sampleNearest(p + offset);
                offset[0] = dist;
                offset[1] = dist;
                p5 = src.sampleNearest(p + offset);
                offset[0] = 0.0;
                offset[1] = dist;
                p6 = src.sampleNearest(p + offset);
                offset[0] = -dist;
                offset[1] = dist;
                p7 = src.sampleNearest(p + offset);
                offset[0] = -dist;
                offset[1] = 0.0;
                p8 = src.sampleNearest(p + offset);

                if (any(lessThan(c, p0))) {
                    c = p0;
                }
                if (any(lessThan(c, p1))) {
                    c = p1;
                }
                if (any(lessThan(c, p2))) {
                    c = p2;
                }
                if (any(lessThan(c, p3))) {
                    c = p3;
                }
                if (any(lessThan(c, p4))) {
                    c = p4;
                }
                if (any(lessThan(c, p5))) {
                    c = p5;
                }
                if (any(lessThan(c, p6))) {
                    c = p6;
                }
                if (any(lessThan(c, p7))) {
                    c = p7;
                }
                if (any(lessThan(c, p8))) {
                    c = p8;
                }

                temp = (p1 + p2 + p3 + p4 + p5 + p6 + p7 + p8) / @as(@Vector(4, f32), @splat(7.0));

                dist = n1 * 2.0;
                offset[0] = 0.0;
                offset[1] = 0.0;
                p0 = src.sampleNearest(p + offset);
                offset[0] = -dist;
                offset[1] = -dist;
                p1 = src.sampleNearest(p + offset);
                offset[0] = 0.0;
                offset[1] = -dist;
                p2 = src.sampleNearest(p + offset);
                offset[0] = dist;
                offset[1] = -dist;
                p3 = src.sampleNearest(p + offset);
                offset[0] = dist;
                offset[1] = 0.0;
                p4 = src.sampleNearest(p + offset);
                offset[0] = dist;
                offset[1] = dist;
                p5 = src.sampleNearest(p + offset);
                offset[0] = 0.0;
                offset[1] = dist;
                p6 = src.sampleNearest(p + offset);
                offset[0] = -dist;
                offset[1] = dist;
                p7 = src.sampleNearest(p + offset);
                offset[0] = -dist;
                offset[1] = 0.0;
                p8 = src.sampleNearest(p + offset);

                if (all(lessThan(c, temp))) {
                    c[0] += n2;
                    c[1] += n2;
                    c[2] += n2;
                } else {
                    c[0] -= n2;
                    c[1] -= n2;
                    c[2] -= n2;
                }

                if (any(lessThan(c, p0))) {
                    c = p0;
                }
                if (any(lessThan(c, p1))) {
                    c = p1;
                }
                if (any(lessThan(c, p2))) {
                    c = p2;
                }
                if (any(lessThan(c, p3))) {
                    c = p3;
                }
                if (any(lessThan(c, p4))) {
                    c = p4;
                }
                if (any(lessThan(c, p5))) {
                    c = p5;
                }
                if (any(lessThan(c, p6))) {
                    c = p6;
                }
                if (any(lessThan(c, p7))) {
                    c = p7;
                }
                if (any(lessThan(c, p8))) {
                    c = p8;
                }

                dist = n1 * 3.0;
                offset[0] = 0.0;
                offset[1] = 0.0;
                p0 = src.sampleNearest(p + offset);
                offset[0] = -dist;
                offset[1] = -dist;
                p1 = src.sampleNearest(p + offset);
                offset[0] = 0.0;
                offset[1] = -dist;
                p2 = src.sampleNearest(p + offset);
                offset[0] = dist;
                offset[1] = -dist;
                p3 = src.sampleNearest(p + offset);
                offset[0] = dist;
                offset[1] = 0.0;
                p4 = src.sampleNearest(p + offset);
                offset[0] = dist;
                offset[1] = dist;
                p5 = src.sampleNearest(p + offset);
                offset[0] = 0.0;
                offset[1] = dist;
                p6 = src.sampleNearest(p + offset);
                offset[0] = -dist;
                offset[1] = dist;
                p7 = src.sampleNearest(p + offset);
                offset[0] = -dist;
                offset[1] = 0.0;
                p8 = src.sampleNearest(p + offset);

                if (any(lessThan(c, p0))) {
                    c = p0;
                }
                if (any(lessThan(c, p1))) {
                    c = p1;
                }
                if (any(lessThan(c, p2))) {
                    c = p2;
                }
                if (any(lessThan(c, p3))) {
                    c = p3;
                }
                if (any(lessThan(c, p4))) {
                    c = p4;
                }
                if (any(lessThan(c, p5))) {
                    c = p5;
                }
                if (any(lessThan(c, p6))) {
                    c = p6;
                }
                if (any(lessThan(c, p7))) {
                    c = p7;
                }
                if (any(lessThan(c, p8))) {
                    c = p8;
                }

                dst = c;
                return dst;
            }
        };
    }

    pub fn create(inputStruct: anytype) Instance(@TypeOf(inputStruct)) {
        var instance: Instance(@TypeOf(inputStruct)) = undefined;
        inline for (std.meta.fields(inputStruct)) |field| {
            @field(instance, field.name) = @field(inputStruct, field.name);
        }
        return instance;
    }
};

fn Image(comptime T: type, comptime len: comptime_int) type {
    return struct {
        pub const Pixel = @Vector(len, T);
        pub const FPixel = @Vector(len, f32);
        pub const channels = len;

        pixels: []const Pixel,
        width: u32,
        height: u32,

        inline fn getPixel(self: @This(), x: u32, y: u32) FPixel {
            return if (x < self.width and y < self.height)
                self.pixels[(y * self.height) + x]
            else
                @as(FPixel, @splat(0));
        }

        inline fn setPixel(self: @This(), x: u32, y: u32, pixel: FPixel) void {
            self.pixels[(y * self.height) + x] = pixel;
        }

        fn sampleNearest(self: @This(), coord: @Vector(2, f32)) FPixel {
            const x: u32 = @intFromFloat(coord[0]);
            const y: u32 = @intFromFloat(coord[1]);
            return self.getPixel(x, y);
        }

        fn sampleLinear(self: @This(), coord: @Vector(2, f32)) FPixel {
            const x: u32 = @intFromFloat(@floor(coord[0] - 0.5));
            const y: u32 = @intFromFloat(@floor(coord[1] - 0.5));
            const fx = (coord[0] - 0.5) - @floor(coord[0] - 0.5);
            const fy = (coord[1] - 0.5) - @floor(coord[1] - 0.5);
            if (fx + fy == 0) {
                if (x < self.width and y < self.height) {
                    return self.pixels[(y * self.height) + x];
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

fn KernelInput(comptime T: type, comptime Kernel: type) type {
    const param_fields = std.meta.fields(Kernel.parameters);
    const input_fields = std.meta.fields(Kernel.output);
    const field_count = param_fields.len + input_fields.len;
    comptime var struct_fields: [field_count]std.builtin.Type.StructField = undefined;
    inline for (param_fields, 0..) |field, index| {
        const param = @field(Kernel.parameters, field.name);
        const has_def = @hasField(param, "default_value");
        struct_fields[index] = .{
            .name = field.name,
            .type = param.type,
            .default_value = if (has_def) @ptrCast(&param.default_value) else null,
            .is_comptime = false,
            .alignment = @alignOf(param.type),
        };
    }
    const offset = param_fields.len;
    inline for (param_fields, 0..) |field, index| {
        const input = @field(Kernel.input, field.name);
        const ImageT = Image(T, input.channels);
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

fn KernelOutput(comptime T: type, comptime Kernel: type) type {
    const output_fields = std.meta.fields(Kernel.output);
    if (output_fields.len > 1) {
        @compileError("Cannot handle multiple output: " ++ output_fields.len);
    }
    const output = @field(kernel.output, output_fields[0].name);
    return Image(T, output.channels);
}

fn processImage(comptime T: type, comptime Kernel: type, input: KernelInput(T, Kernel), output: KernelOutput(T, Kernel)) void {
    const instance = Kernel.create(input);
    var coords: @Vector(2, f32) = .{ 0, 0 };
    var y = 0;
    while (y < output.height) : (y += 1) {
        var x = 0;
        coords[0] = 0;
        while (x < output.width) : (x += 1) {
            const pixel = instance.evaluatePixel(coords);
            output.setPixel(x, y, pixel);
            coords[0] += 1;
        }
        coords[1] += 1;
    }
}

test "hello" {}
