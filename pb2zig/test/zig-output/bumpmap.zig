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
            outputCoord: @Vector(2, f32) = @splat(0.0),

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
                    const ray: @Vector(3, f32) = @Vector(3, f32){
                        self.outCoord()[0],
                        self.outCoord()[1],
                        height,
                    } - light;
                    const tmp_ray_len: f32 = length(ray);
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
                        const norm: @Vector(3, f32) = cross(hvec, yvec);
                        const tmp_dot: f32 = dot(ray, norm);
                        const refl_low: f32 = 0.99 - refl_tolerance / 10000.0;
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
    fn fract(v: anytype) @TypeOf(v) {
        return v - @floor(v);
    }

    fn length(v: anytype) f32 {
        return switch (@typeInfo(@TypeOf(v))) {
            .vector => @sqrt(@reduce(.Add, v * v)),
            else => @abs(v),
        };
    }

    fn dot(v1: anytype, v2: anytype) f32 {
        return switch (@typeInfo(@TypeOf(v1))) {
            .vector => @reduce(.Add, v1 * v2),
            else => v1 * v2,
        };
    }

    fn cross(v1: anytype, v2: anytype) @TypeOf(v1) {
        const CT = @typeInfo(@TypeOf(v1)).vector.child;
        const p1 = @shuffle(CT, v1, undefined, @Vector(3, i32){ 1, 2, 0 }) * @shuffle(CT, v2, undefined, @Vector(3, i32){ 2, 0, 1 });
        const p2 = @shuffle(CT, v1, undefined, @Vector(3, i32){ 2, 0, 1 }) * @shuffle(CT, v2, undefined, @Vector(3, i32){ 1, 2, 0 });
        return p1 - p2;
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
