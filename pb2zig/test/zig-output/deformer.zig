// Pixel Bender kernel "deformer" (translated using pb2zig)
const std = @import("std");

pub const kernel = struct {
    // kernel information
    pub const namespace = "deformer";
    pub const vendor = "Frank Reitberger";
    pub const version = 1;
    pub const description = "deforms whatever get�s in the way.";
    pub const parameters = .{
        .center_x = .{
            .type = f32,
            .minValue = 182.0,
            .maxValue = 249.0,
            .defaultValue = 204.64,
            .description = "center point x",
        },
        .center_y = .{
            .type = f32,
            .minValue = 158.0,
            .maxValue = 249.0,
            .defaultValue = 182.16,
            .description = "center point y",
        },
        .imageHeight = .{
            .type = f32,
            .minValue = 1.0,
            .maxValue = 2024.0,
            .defaultValue = 323.0,
            .description = "set image height",
        },
        .stretch = .{
            .type = i32,
            .minValue = 1,
            .maxValue = 3,
            .defaultValue = 2,
            .description = "calculate stretch(es)",
        },
    };
    pub const inputImages = .{
        .src = .{ .channels = 4 },
    };
    pub const outputImages = .{
        .pxl = .{ .channels = 4 },
    };

    // generic kernel instance type
    fn Instance(comptime InputStruct: type, comptime OutputStruct: type, comptime ParameterStruct: type) type {
        return struct {
            params: ParameterStruct,
            input: InputStruct,
            output: OutputStruct,
            outputCoord: @Vector(2, f32) = @splat(0.0),

            // output pixel
            pxl: @Vector(4, f32) = undefined,

            // functions defined in kernel
            pub fn evaluatePixel(self: *@This()) void {
                const center_x = self.params.center_x;
                const center_y = self.params.center_y;
                const imageHeight = self.params.imageHeight;
                const stretch = self.params.stretch;
                const src = self.input.src;
                const pxl = self.output.pxl;
                self.pxl = @splat(0.0);

                var center: @Vector(2, f32) = undefined;
                center[0] = center_x;
                center[1] = center_y;
                const pi: f32 = 3.141592653589793;
                var pos: @Vector(2, f32) = self.outCoord() - center;
                pos *= @as(@Vector(2, f32), @splat(cos(pi / 1.5 / imageHeight * pos[0])));
                const stepY: f32 = length(pos) / center[1];
                const stepX: f32 = length(pos) / center[0];
                if (stretch == 1) {
                    pos *= @as(@Vector(2, f32), @splat((stepY * stepX)));
                }
                if (stretch == 2) {
                    pos *= @as(@Vector(2, f32), @splat((sin(stepY) * cos(stepX))));
                }
                if (stretch == 3) {
                    pos *= @as(@Vector(2, f32), @splat(tan(stepY * stepX) / pi));
                }
                if (stretch == 4) {
                    pos += @as(@Vector(2, f32), @splat(atan(cos(stepY) * sin(stepX))));
                }
                self.pxl = src.sampleLinear(center + pos);

                pxl.writePixel(self.outputCoord, self.pxl);
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
    fn sin(v: anytype) @TypeOf(v) {
        return @sin(v);
    }

    fn cos(v: anytype) @TypeOf(v) {
        return @cos(v);
    }

    fn tan(v: anytype) @TypeOf(v) {
        return @tan(v);
    }

    fn atan(v: anytype) @TypeOf(v) {
        return switch (@typeInfo(@TypeOf(v))) {
            .vector => calc: {
                var result: @TypeOf(v) = undefined;
                inline for (0..@typeInfo(@TypeOf(v)).vector.len) |i| {
                    result[i] = atan(v[i]);
                }
                break :calc result;
            },
            else => std.math.atan(v),
        };
    }

    fn length(v: anytype) f32 {
        return switch (@typeInfo(@TypeOf(v))) {
            .vector => @sqrt(@reduce(.Add, v * v)),
            else => @abs(v),
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
