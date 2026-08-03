// Pixel Bender kernel "Crystallize" (translated using pb2zig)
const std = @import("std");

pub const kernel = struct {
    // kernel information
    pub const namespace = "by Petri Leskinen";
    pub const vendor = "";
    pub const version = 1;
    pub const description = "Crystallize -filter";
    pub const parameters = .{
        .size = .{
            .type = f32,
            .minValue = 1.0,
            .maxValue = 300.0,
            .defaultValue = 20.0,
            .description = "size",
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
            outputCoord: @Vector(2, f32) = @splat(0.0),

            // output pixel
            dst: @Vector(4, f32) = undefined,

            // constants
            const rot1: [2]@Vector(2, f32) = [2]@Vector(2, f32){
                .{ 0.951, 0.309 },
                .{ -0.309, 0.951 },
            };
            const rot1r: [2]@Vector(2, f32) = [2]@Vector(2, f32){
                .{ 0.951, -0.309 },
                .{ 0.309, 0.951 },
            };
            const base1: @Vector(2, f32) = @Vector(2, f32){ 2400.0, -100.0 };
            const rot2: [2]@Vector(2, f32) = [2]@Vector(2, f32){
                .{ 0.866, 0.5 },
                .{ -0.5, 0.866 },
            };
            const rot2r: [2]@Vector(2, f32) = [2]@Vector(2, f32){
                .{ 0.866, -0.5 },
                .{ 0.5, 0.866 },
            };
            const base2: @Vector(2, f32) = @Vector(2, f32){ -100.0, 2400.0 };

            // functions defined in kernel
            pub fn evaluatePixel(self: *@This()) void {
                const size = self.params.size;
                const src = self.input.src;
                const dst = self.output.dst;
                self.dst = @splat(0.0);

                var div: f32 = size;
                var newP: @Vector(2, f32) = base1 + @"M * V"(@"M * S"(rot1r, div), (floor(@"M * V"(rot1, (self.outCoord() - base1)) / @as(@Vector(2, f32), @splat(div))) + @as(@Vector(2, f32), @splat(0.5))));
                div = 21.0 / 20.0 * size;
                var p: @Vector(2, f32) = base2 + @"M * V"(@"M * S"(rot2r, div), (floor(@"M * V"(rot2, (self.outCoord() - base2)) / @as(@Vector(2, f32), @splat(div))) + @as(@Vector(2, f32), @splat(0.5))));
                newP = if (length(p - self.outCoord()) < length(newP - self.outCoord())) p else newP;
                div = 19.0 / 20.0 * size;
                p = @as(@Vector(2, f32), @splat(div)) * (floor(self.outCoord() / @as(@Vector(2, f32), @splat(div))) + @as(@Vector(2, f32), @splat(0.5)));
                newP = if (length(p - self.outCoord()) < length(newP - self.outCoord())) p else newP;
                self.dst = src.sampleNearest(newP);

                dst.writePixel(self.outputCoord, self.dst);
            }

            pub fn outCoord(self: *@This()) @Vector(2, f32) {
                return self.outputCoord;
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
    fn floor(v: anytype) @TypeOf(v) {
        return @floor(v);
    }

    fn length(v: anytype) f32 {
        return switch (@typeInfo(@TypeOf(v))) {
            .vector => @sqrt(@reduce(.Add, v * v)),
            else => @abs(v),
        };
    }

    fn @"M * V"(m1: anytype, v2: anytype) @TypeOf(v2) {
        const ar = @typeInfo(@TypeOf(m1)).array;
        var t1: @TypeOf(m1) = undefined;
        inline for (m1, 0..) |column, c| {
            inline for (0..ar.len) |r| {
                t1[r][c] = column[r];
            }
        }
        var result: @TypeOf(v2) = undefined;
        inline for (t1, 0..) |column, c| {
            result[c] = @reduce(.Add, column * v2);
        }
        return result;
    }

    fn @"M * S"(m1: anytype, s2: anytype) @TypeOf(m1) {
        var result: @TypeOf(m1) = undefined;
        inline for (m1, 0..) |column, c| {
            result[c] = column * @as(@typeInfo(@TypeOf(m1)).array.child, @splat(s2));
        }
        return result;
    }
};

// keep auto-formatter from moving statement
const zigar = if (true) @import("zigar") else unreachable;

pub const Input = KernelInput(kernel);
pub const Output = KernelOutput(kernel);
pub const Parameters = KernelParameters(kernel);

pub fn process(input: Input, output: Output, params: Parameters) !void {
    // use inline loop to generate code for each image implementation (WebImage or GD)
    inline for (zigar.image.formats) |tag| {
        const input_field_names = comptime std.meta.fieldNames(Input);
        const output_field_names = comptime std.meta.fieldNames(Output);
        const output_image_0 = @field(output, output_field_names[0]);
        if (output_image_0 == tag) {
            // copy fields from zigar.image.Any to implementation-specific structs
            var input_impl: KernelInputImpl(tag.Type(.ro), kernel) = undefined;
            inline for (input_field_names) |name| {
                const input_image = @field(input, name);
                if (input_image != tag) unreachable;
                @field(input_impl, name).impl = input_image.getField(tag);
            }
            var output_impl: KernelOutputImpl(tag.Type(.rw), kernel) = undefined;
            inline for (output_field_names) |name| {
                const output_image = @field(output, name);
                if (output_image != tag) unreachable;
                @field(output_impl, name).impl = output_image.getField(tag);
            }
            // get the output dimensions (multiple outputs are possible but unlikely)
            var output_width: usize = 0;
            var output_height: usize = 0;
            inline for (output_field_names) |name| {
                const output_image = @field(output, name);
                var out = output_image.getField(tag);
                const w = out.getWidth();
                const h = out.getHeight();
                if (w > output_width) output_width = w;
                if (h > output_height) output_height = h;
            }
            // create the implementation-specific kernel instance
            var instance = kernel.create(input_impl, output_impl, params);
            // calculate variables that are dependent on kernel parameters
            if (@hasDecl(@TypeOf(instance), "evaluateDependents")) {
                instance.evaluateDependents();
            }
            // loop through all coordinates, starting from (0.5, 0.5)
            const width: f32 = @floatFromInt(output_width);
            const height: f32 = @floatFromInt(output_height);
            while (instance.outputCoord[1] < height) : (instance.outputCoord[1] += 1) {
                instance.outputCoord[0] = 0.5;
                while (instance.outputCoord[0] < width) : (instance.outputCoord[0] += 1) {
                    instance.evaluatePixel();
                }
            }
        }
    }
}

pub fn KernelImage(comptime Impl: type, comptime channels: comptime_int, comptime writable: bool) type {
    const Pixel = @Vector(channels, f32);
    const Coord = @Vector(2, f32);
    return struct {
        impl: Impl,

        fn writePixel(self: @This(), coord: Coord, pixel: Pixel) void {
            if (comptime !writable) unreachable;
            const pos: @Vector(2, usize) = @intFromFloat(coord);
            self.impl.setPixel(Pixel, pos[0], pos[1], pixel);
        }

        fn pixelSize(self: @This()) Coord {
            _ = self;
            return .{ 1, 1 };
        }

        fn pixelAspectRatio(self: @This()) f32 {
            _ = self;
            return 1;
        }

        fn sampleNearest(self: @This(), coord: Coord) Pixel {
            return self.impl.sampleNearest(Pixel, coord);
        }

        fn sampleLinear(self: @This(), coord: Coord) Pixel {
            return self.impl.sampleLinear(Pixel, coord);
        }
    };
}

pub fn KernelInput(comptime Kernel: type) type {
    const input_fields = std.meta.fields(@TypeOf(Kernel.inputImages));
    comptime var struct_fields: [input_fields.len]std.builtin.Type.StructField = undefined;
    inline for (input_fields, 0..) |field, index| {
        struct_fields[index] = .{
            .name = field.name,
            .type = zigar.image.Any(.ro),
            .default_value_ptr = null,
            .is_comptime = false,
            .alignment = @alignOf(zigar.image.Any(.ro)),
        };
    }
    return @Type(.{
        .@"struct" = .{
            .layout = .auto,
            .fields = &struct_fields,
            .decls = &.{},
            .is_tuple = false,
        },
    });
}

pub fn KernelInputImpl(comptime Impl: type, comptime Kernel: type) type {
    const input_fields = std.meta.fields(@TypeOf(Kernel.inputImages));
    comptime var struct_fields: [input_fields.len]std.builtin.Type.StructField = undefined;
    inline for (input_fields, 0..) |field, index| {
        const input = @field(Kernel.inputImages, field.name);
        const KernelImageImpl = KernelImage(Impl, input.channels, false);
        struct_fields[index] = .{
            .name = field.name,
            .type = KernelImageImpl,
            .default_value_ptr = null,
            .is_comptime = false,
            .alignment = @alignOf(KernelImageImpl),
        };
    }
    return @Type(.{
        .@"struct" = .{
            .layout = .auto,
            .fields = &struct_fields,
            .decls = &.{},
            .is_tuple = false,
        },
    });
}

pub fn KernelOutput(comptime Kernel: type) type {
    const output_fields = std.meta.fields(@TypeOf(Kernel.outputImages));
    comptime var struct_fields: [output_fields.len]std.builtin.Type.StructField = undefined;
    inline for (output_fields, 0..) |field, index| {
        struct_fields[index] = .{
            .name = field.name,
            .type = zigar.image.Any(.rw),
            .default_value_ptr = null,
            .is_comptime = false,
            .alignment = @alignOf(zigar.image.Any(.rw)),
        };
    }
    return @Type(.{
        .@"struct" = .{
            .layout = .auto,
            .fields = &struct_fields,
            .decls = &.{},
            .is_tuple = false,
        },
    });
}

pub fn KernelOutputImpl(comptime Impl: type, comptime Kernel: type) type {
    const output_fields = std.meta.fields(@TypeOf(Kernel.outputImages));
    comptime var struct_fields: [output_fields.len]std.builtin.Type.StructField = undefined;
    inline for (output_fields, 0..) |field, index| {
        const output = @field(Kernel.outputImages, field.name);
        const KernelImageImpl = KernelImage(Impl, output.channels, true);
        const default_value: KernelImageImpl = undefined;
        struct_fields[index] = .{
            .name = field.name,
            .type = KernelImageImpl,
            .default_value_ptr = @ptrCast(&default_value),
            .is_comptime = false,
            .alignment = @alignOf(KernelImageImpl),
        };
    }
    return @Type(.{
        .@"struct" = .{
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
            const value: param.type = switch (@hasField(@TypeOf(param), "defaultValue")) {
                true => param.defaultValue,
                false => switch (@typeInfo(param.type)) {
                    .int, .float => 0,
                    .bool => false,
                    .vector => @splat(0),
                    else => @compileError("Unrecognized parameter type: " ++ @typeName(param.type)),
                },
            };
            break :get_def @ptrCast(&value);
        };
        struct_fields[index] = .{
            .name = field.name,
            .type = param.type,
            .default_value_ptr = default_value,
            .is_comptime = false,
            .alignment = @alignOf(param.type),
        };
    }
    return @Type(.{
        .@"struct" = .{
            .layout = .auto,
            .fields = &struct_fields,
            .decls = &.{},
            .is_tuple = false,
        },
    });
}
