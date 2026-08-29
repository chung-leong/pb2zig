// Pixel Bender kernel "channelThreshold" (translated using pb2zig)
const std = @import("std");

pub const kernel = struct {
    // kernel information
    pub const namespace = "net.onthewings.filters";
    pub const vendor = "Andy Li";
    pub const version = 1;
    pub const description = "Thresholding bases on the channels. Only the pixels passed ALL thresholds will be white (or color you configed).";
    pub const parameters = .{
        .threshold0 = .{
            .type = @Vector(2, f32),
            .defaultValue = .{ 0.0, 1.0 },
            .description = "For red channel.",
        },
        .threshold1 = .{
            .type = @Vector(2, f32),
            .defaultValue = .{ 0.0, 1.0 },
            .description = "For green channel.",
        },
        .threshold2 = .{
            .type = @Vector(2, f32),
            .defaultValue = .{ 0.0, 1.0 },
            .description = "For blue channel.",
        },
        .threshold3 = .{
            .type = @Vector(2, f32),
            .defaultValue = .{ 0.0, 1.0 },
            .description = "For alpha channel.",
        },
        .outputColor1 = .{
            .type = @Vector(4, f32),
            .defaultValue = .{ 0.0, 0.0, 0.0, 1.0 },
            .description = "Color for thresholded area.colorForAllPassedArea",
        },
        .outputColor2 = .{
            .type = @Vector(4, f32),
            .defaultValue = .{ 1.0, 1.0, 1.0, 1.0 },
            .description = "Color for all passed area",
        },
    };
    pub const inputImages = .{
        .source = .{ .channels = 4 },
    };
    pub const outputImages = .{
        .target = .{ .channels = 4 },
    };

    // generic kernel instance type
    fn Instance(comptime InputStruct: type, comptime OutputStruct: type, comptime ParameterStruct: type) type {
        return struct {
            params: ParameterStruct,
            input: InputStruct,
            output: OutputStruct,
            outputCoord: @Vector(2, f32) = @splat(0.0),

            // output pixel
            target: @Vector(4, f32) = undefined,

            // functions defined in kernel
            pub fn evaluatePixel(self: *@This()) void {
                const threshold0 = self.params.threshold0;
                const threshold1 = self.params.threshold1;
                const threshold2 = self.params.threshold2;
                const threshold3 = self.params.threshold3;
                const outputColor1 = self.params.outputColor1;
                const outputColor2 = self.params.outputColor2;
                const source = self.input.source;
                const target = self.output.target;
                self.target = @splat(0.0);

                const ori: @Vector(4, f32) = source.sampleNearest(self.outCoord());
                if (ori[0] < threshold0[0] or ori[0] > threshold0[1] or ori[1] < threshold1[0] or ori[1] > threshold1[1] or ori[2] < threshold2[0] or ori[2] > threshold2[1] or ori[3] < threshold3[0] or ori[3] > threshold3[1]) {
                    self.target = outputColor1;
                } else {
                    self.target = outputColor2;
                }

                target.writePixel(self.outputCoord, self.target);
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

const builtin = if (true) @import("builtin") else unreachable;
const Allocator = if (true) std.mem.Allocator else unreachable;
const Promise = zigar.function.PromiseOf(worker.processSlice);
const AbortSignal = zigar.function.AbortSignal;
const WorkQueue = zigar.thread.WorkQueue;

var work_queue: WorkQueue(worker) = .{};
var gpa = switch (builtin.target.cpu.arch.isWasm()) {
    true => {},
    false => std.heap.DebugAllocator(.{}){},
};
const internal_allocator = switch (builtin.target.cpu.arch.isWasm()) {
    true => std.heap.wasm_allocator,
    false => gpa.allocator(),
};

pub fn startThreadPool(count: u32) !void {
    if (builtin.single_threaded) @panic("Unavailable");
    try work_queue.init(.{
        .allocator = internal_allocator,
        .stack_size = 65536,
        .n_jobs = count,
    });
}

pub fn stopThreadPoolAsync(promise: zigar.function.Promise(void)) void {
    if (builtin.single_threaded) @panic("Unavailable");
    work_queue.deinitAsync(promise);
}

pub fn processAsync(input: Input, output: Output, params: Parameters, promise: Promise, signal: AbortSignal) !void {
    if (builtin.single_threaded) @panic("Unavailable");
    // get the output dimensions (multiple outputs are possible but unlikely)
    var output_width: usize = 0;
    var output_height: usize = 0;
    inline for (zigar.image.formats) |tag| {
        const output_field_names = comptime std.meta.fieldNames(Output);
        const output_image_0 = @field(output, output_field_names[0]);
        if (output_image_0 == tag) {
            inline for (output_field_names) |name| {
                const output_image = @field(output, name);
                var out = output_image.getField(tag);
                const w = out.getWidth();
                const h = out.getHeight();
                if (w > output_width) output_width = w;
                if (h > output_height) output_height = h;
            }
        }
    }
    // add work units to queue
    const workers: usize = @max(1, work_queue.thread_count);
    const scanlines: usize = output_height / workers;
    const slices: usize = if (scanlines > 0) workers else 1;
    const multipart_promise = try promise.partition(internal_allocator, slices);
    var slice_num: usize = 0;
    while (slice_num < slices) : (slice_num += 1) {
        const start = scanlines * slice_num;
        const count = if (slice_num < slices - 1) scanlines else output_height - (scanlines * slice_num);
        try work_queue.push(worker.processSlice, .{ signal, output_width, start, count, input, output, params }, multipart_promise);
    }
}

const worker = struct {
    pub fn processSlice(signal: AbortSignal, width: usize, start: usize, count: usize, input: Input, output: Output, params: Parameters) !void {
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
                // create the implementation-specific kernel instance
                var instance = kernel.create(input_impl, output_impl, params);
                // calculate variables that are dependent on kernel parameters
                if (@hasDecl(@TypeOf(instance), "evaluateDependents")) {
                    instance.evaluateDependents();
                }
                // loop through all coordinates, starting from (0.5, 0.5)
                const last_x: f32 = @floatFromInt(width);
                const last_y: f32 = @floatFromInt(start + count);
                const first_y: f32 = @floatFromInt(start);
                instance.outputCoord[1] = first_y + 0.5;
                while (instance.outputCoord[1] < last_y) : (instance.outputCoord[1] += 1) {
                    instance.outputCoord[0] = 0.5;
                    while (instance.outputCoord[0] < last_x) : (instance.outputCoord[0] += 1) {
                        instance.evaluatePixel();
                    }
                    if (signal.on()) return error.Aborted;
                }
            }
        }
    }
};
