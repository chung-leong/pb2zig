// Pixel Bender kernel "ZoomBlurFocus" (translated using pb2zig)
const std = @import("std");

pub const kernel = struct {
    // kernel information
    pub const namespace = "com.abril";
    pub const vendor = "Daniel Allegretti";
    pub const version = 1;
    pub const description = "Ajustable zoom blur, you can control focal size, edge hardness and light. Based on ZoomBlur by Ryan Phelan.";
    pub const parameters = .{
        .amount = .{
            .type = f32,
            .minValue = 0.0,
            .maxValue = 0.5,
            .defaultValue = 0.25,
        },
        .center = .{
            .type = @Vector(2, f32),
            .minValue = .{ 0.0, 0.0 },
            .maxValue = .{ 900.0, 900.0 },
            .defaultValue = .{ 200.0, 200.0 },
        },
        .focalSize = .{
            .type = f32,
            .minValue = 0.0,
            .maxValue = 500.0,
            .defaultValue = 100.0,
        },
        .invert = .{
            .type = i32,
            .minValue = 0,
            .maxValue = 1,
            .defaultValue = 0,
        },
        .vignette = .{
            .type = f32,
            .minValue = 0.0,
            .maxValue = 1.0,
            .defaultValue = 0.6,
        },
        .edgeHardness = .{
            .type = f32,
            .minValue = 0.0,
            .maxValue = 1.0,
            .defaultValue = 0.0,
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

            // functions defined in kernel
            pub fn evaluatePixel(self: *@This()) void {
                const amount = self.params.amount;
                const center = self.params.center;
                const focalSize = self.params.focalSize;
                const invert = self.params.invert;
                const vignette = self.params.vignette;
                const edgeHardness = self.params.edgeHardness;
                const src = self.input.src;
                const dst = self.output.dst;
                self.dst = @splat(0.0);

                const str: f32 = 1.0 - vignette;
                _ = str;
                var coord: @Vector(2, f32) = self.outCoord();
                const cur_radius: f32 = length(coord - center);
                const color: @Vector(4, f32) = src.sampleNearest(coord);
                var cond1: i32 = if ((cur_radius > focalSize)) 1 else 0;
                if (invert == 1) {
                    if (cond1 == 0) {
                        cond1 = 1;
                    } else {
                        cond1 = 0;
                    }
                }
                var strength: f32 = undefined;
                if (invert == 1) {
                    strength = cur_radius / focalSize;
                } else {
                    strength = focalSize / cur_radius;
                }
                const tmpAmount: f32 = strength * amount;
                coord -= center;
                var tmpDst: @Vector(4, f32) = .{ 0.0, 0.0, 0.0, 0.0 };
                var scale: f32 = undefined;
                scale = 1.0;
                tmpDst += src.sampleNearest(coord * @as(@Vector(2, f32), @splat(scale)) + center);
                scale = 1.0 + tmpAmount * (1.0 / 14.0);
                tmpDst += src.sampleNearest(coord * @as(@Vector(2, f32), @splat(scale)) + center);
                scale = 1.0 + tmpAmount * (2.0 / 14.0);
                tmpDst += src.sampleNearest(coord * @as(@Vector(2, f32), @splat(scale)) + center);
                scale = 1.0 + tmpAmount * (3.0 / 14.0);
                tmpDst += src.sampleNearest(coord * @as(@Vector(2, f32), @splat(scale)) + center);
                scale = 1.0 + tmpAmount * (4.0 / 14.0);
                tmpDst += src.sampleNearest(coord * @as(@Vector(2, f32), @splat(scale)) + center);
                scale = 1.0 + tmpAmount * (5.0 / 14.0);
                tmpDst += src.sampleNearest(coord * @as(@Vector(2, f32), @splat(scale)) + center);
                scale = 1.0 + tmpAmount * (6.0 / 14.0);
                tmpDst += src.sampleNearest(coord * @as(@Vector(2, f32), @splat(scale)) + center);
                scale = 1.0 + tmpAmount * (7.0 / 14.0);
                tmpDst += src.sampleNearest(coord * @as(@Vector(2, f32), @splat(scale)) + center);
                scale = 1.0 + tmpAmount * (8.0 / 14.0);
                tmpDst += src.sampleNearest(coord * @as(@Vector(2, f32), @splat(scale)) + center);
                scale = 1.0 + tmpAmount * (9.0 / 14.0);
                tmpDst += src.sampleNearest(coord * @as(@Vector(2, f32), @splat(scale)) + center);
                scale = 1.0 + tmpAmount * (10.0 / 14.0);
                tmpDst += src.sampleNearest(coord * @as(@Vector(2, f32), @splat(scale)) + center);
                scale = 1.0 + tmpAmount * (11.0 / 14.0);
                tmpDst += src.sampleNearest(coord * @as(@Vector(2, f32), @splat(scale)) + center);
                scale = 1.0 + tmpAmount * (12.0 / 14.0);
                tmpDst += src.sampleNearest(coord * @as(@Vector(2, f32), @splat(scale)) + center);
                scale = 1.0 + tmpAmount * (13.0 / 14.0);
                tmpDst += src.sampleNearest(coord * @as(@Vector(2, f32), @splat(scale)) + center);
                scale = 1.0 + tmpAmount * (14.0 / 14.0);
                tmpDst += src.sampleNearest(coord * @as(@Vector(2, f32), @splat(scale)) + center);
                tmpDst /= @as(@Vector(4, f32), @splat(15.0));
                if (cond1 == 1) {
                    self.dst = (@as(@Vector(4, f32), @splat((1.0 - edgeHardness))) * ((color * @as(@Vector(4, f32), @splat(strength))) + (tmpDst * @as(@Vector(4, f32), @splat((1.0 - strength)))))) + (tmpDst * @as(@Vector(4, f32), @splat(edgeHardness)));
                    self.dst = @shuffle(f32, self.dst, (@as(@Vector(3, f32), @splat(vignette)) * @shuffle(f32, self.dst, undefined, @Vector(3, i32){ 0, 1, 2 }) * @as(@Vector(3, f32), @splat(strength))) + (@shuffle(f32, self.dst, undefined, @Vector(3, i32){ 0, 1, 2 }) * @as(@Vector(3, f32), @splat((1.0 - vignette)))), @Vector(4, i32){ -1, -2, -3, 3 });
                } else {
                    self.dst = color;
                }
                self.dst[3] = color[3];

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
