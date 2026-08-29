const std = @import("std");

const kernel = struct {};

//---start of code
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
    const fields = std.meta.fields(@TypeOf(Kernel.inputImages));
    var field_names: [fields.len][]const u8 = undefined;
    var field_types: [fields.len]type = undefined;
    var field_attrs: [fields.len]std.builtin.Type.StructField.Attributes = undefined;
    inline for (fields, 0..) |field, index| {
        field_names[index] = field.name;
        field_types[index] = zigar.image.Any(.ro);
        field_attrs[index] = .{};
    }
    return @Struct(.auto, null, &field_names, &field_types, &field_attrs);
}

pub fn KernelInputImpl(comptime Impl: type, comptime Kernel: type) type {
    const fields = std.meta.fields(@TypeOf(Kernel.inputImages));
    var field_names: [fields.len][]const u8 = undefined;
    var field_types: [fields.len]type = undefined;
    var field_attrs: [fields.len]std.builtin.Type.StructField.Attributes = undefined;
    inline for (fields, 0..) |field, index| {
        const input = @field(Kernel.inputImages, field.name);
        field_names[index] = field.name;
        field_types[index] = KernelImage(Impl, input.channels, false);
        field_attrs[index] = .{};
    }
    return @Struct(.auto, null, &field_names, &field_types, &field_attrs);
}

pub fn KernelOutput(comptime Kernel: type) type {
    const fields = std.meta.fields(@TypeOf(Kernel.outputImages));
    var field_names: [fields.len][]const u8 = undefined;
    var field_types: [fields.len]type = undefined;
    var field_attrs: [fields.len]std.builtin.Type.StructField.Attributes = undefined;
    inline for (fields, 0..) |field, index| {
        field_names[index] = field.name;
        field_types[index] = zigar.image.Any(.rw);
        field_attrs[index] = .{};
    }
    return @Struct(.auto, null, &field_names, &field_types, &field_attrs);
}

pub fn KernelOutputImpl(comptime Impl: type, comptime Kernel: type) type {
    const fields = std.meta.fields(@TypeOf(Kernel.outputImages));
    var field_names: [fields.len][]const u8 = undefined;
    var field_types: [fields.len]type = undefined;
    var field_attrs: [fields.len]std.builtin.Type.StructField.Attributes = undefined;
    inline for (fields, 0..) |field, index| {
        const output = @field(Kernel.outputImages, field.name);
        field_names[index] = field.name;
        field_types[index] = KernelImage(Impl, output.channels, true);
        field_attrs[index] = .{};
    }
    return @Struct(.auto, null, &field_names, &field_types, &field_attrs);
}

pub fn KernelParameters(comptime Kernel: type) type {
    const fields = std.meta.fields(@TypeOf(Kernel.parameters));
    var field_names: [fields.len][]const u8 = undefined;
    var field_types: [fields.len]type = undefined;
    var field_attrs: [fields.len]std.builtin.Type.StructField.Attributes = undefined;
    inline for (fields, 0..) |field, index| {
        const param = @field(Kernel.parameters, field.name);
        const default_value_ptr: ?*const anyopaque = get_def: {
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
        field_names[index] = field.name;
        field_types[index] = param.type;
        field_attrs[index] = .{
            .default_value_ptr = default_value_ptr,
        };
    }
    return @Struct(.auto, null, &field_names, &field_types, &field_attrs);
}
