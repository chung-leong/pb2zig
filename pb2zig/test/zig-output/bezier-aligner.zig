// Pixel Bender kernel "BezierAligner" (translated using pb2zig)
const std = @import("std");

pub const kernel = struct {
    // kernel information
    pub const namespace = "BezierAligner";
    pub const vendor = "Petri Leskinen";
    pub const version = 1;
    pub const description = "Draws an Image along a Bezier Curve";
    pub const parameters = .{
        .startpoint = .{
            .type = @Vector(2, f32),
            .minValue = .{ -300.0, -300.0 },
            .maxValue = .{ 900.0, 900.0 },
            .defaultValue = .{ 50.0, 200.0 },
            .description = "start point for bezier sequence",
        },
        .control1 = .{
            .type = @Vector(2, f32),
            .minValue = .{ -300.0, -300.0 },
            .maxValue = .{ 900.0, 900.0 },
            .defaultValue = .{ 200.0, 100.0 },
            .description = "first control point for bezier sequence",
        },
        .control2 = .{
            .type = @Vector(2, f32),
            .minValue = .{ -300.0, -300.0 },
            .maxValue = .{ 900.0, 900.0 },
            .defaultValue = .{ 400.0, 300.0 },
            .description = "first control point for bezier sequence",
        },
        .endpoint = .{
            .type = @Vector(2, f32),
            .minValue = .{ -300.0, -300.0 },
            .maxValue = .{ 900.0, 900.0 },
            .defaultValue = .{ 550.0, 200.0 },
            .description = "end point for bezier sequence",
        },
        .scale = .{
            .type = @Vector(2, f32),
            .minValue = .{ 0.5, 0.5 },
            .maxValue = .{ 2.5, 2.5 },
            .defaultValue = .{ 1.0, 1.0 },
            .description = "Scales the texture image",
        },
        .imagewidth = .{
            .type = f32,
            .minValue = 0.0,
            .maxValue = 500.0,
            .defaultValue = 200.0,
            .description = "imagewidth: how wide the repeating part is",
        },
        .offset = .{
            .type = @Vector(2, f32),
            .minValue = .{ -300.0, -300.0 },
            .maxValue = .{ 300.0, 300.0 },
            .defaultValue = .{ 0.0, 0.0 },
            .description = "offset.x=Displacement along the curve, offset.y=Displacement perpendicular to the curve",
        },
        .tstart = .{
            .type = f32,
            .minValue = 0.0,
            .maxValue = 1.0,
            .defaultValue = 0.0,
            .description = "the default 0 means that the curve starts from the startpoint",
        },
        .tend = .{
            .type = f32,
            .minValue = 0.0,
            .maxValue = 1.0,
            .defaultValue = 1.0,
            .description = "the default 1 means that the curve ends at the endpoint",
        },
        .rotation = .{
            .type = [2]@Vector(2, f32),
            .minValue = .{
                .{ -1.0, -1.0 },
                .{ -1.0, -1.0 },
            },
            .maxValue = .{
                .{ 1.0, 1.0 },
                .{ 1.0, 1.0 },
            },
            .defaultValue = .{
                .{ 1.0, 0.0 },
                .{ 0.0, 1.0 },
            },
            .description = "Rotation around the axis",
        },
    };
    pub const inputImages = .{
        .background = .{ .channels = 4 },
        .texture = .{ .channels = 4 },
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
                const startpoint = self.params.startpoint;
                const control1 = self.params.control1;
                const control2 = self.params.control2;
                const endpoint = self.params.endpoint;
                const scale = self.params.scale;
                const imagewidth = self.params.imagewidth;
                const offset = self.params.offset;
                const tstart = self.params.tstart;
                const tend = self.params.tend;
                const rotation = self.params.rotation;
                const background = self.input.background;
                const texture = self.input.texture;
                const dst = self.output.dst;
                self.dst = @splat(0.0);

                const p: @Vector(2, f32) = self.outCoord();
                self.dst = background.sampleLinear(p);
                const fx: @Vector(4, f32) = .{
                    startpoint[0],
                    3.0 * (control1[0] - startpoint[0]),
                    3.0 * (startpoint[0] - 2.0 * control1[0] + control2[0]),
                    endpoint[0] - startpoint[0] + 3.0 * (control1[0] - control2[0]),
                };
                const fy: @Vector(4, f32) = .{
                    startpoint[1],
                    3.0 * (control1[1] - startpoint[1]),
                    3.0 * (startpoint[1] - 2.0 * control1[1] + control2[1]),
                    endpoint[1] - startpoint[1] + 3.0 * (control1[1] - control2[1]),
                };
                const dfx: @Vector(4, f32) = derivative(fx);
                const dfy: @Vector(4, f32) = derivative(fy);
                var ta: f32 = tstart;
                var tb: f32 = tend;
                var d: @Vector(2, f32) = @"M * V"(rotation, @Vector(2, f32){
                    eval(dfx, ta),
                    eval(dfy, ta),
                });
                d /= @as(@Vector(2, f32), @splat(length(d)));
                var p0: @Vector(2, f32) = @"M * V"([2]@Vector(2, f32){
                    .{ d[0], -d[1] },
                    .{ d[1], d[0] },
                }, (p - @Vector(2, f32){
                    eval(fx, ta),
                    eval(fy, ta),
                }));
                d = @"M * V"(rotation, @Vector(2, f32){
                    eval(dfx, tb),
                    eval(dfy, tb),
                });
                var p1: @Vector(2, f32) = @"M * V"([2]@Vector(2, f32){
                    .{ d[0], -d[1] },
                    .{ d[1], d[0] },
                }, (p - @Vector(2, f32){
                    eval(fx, tb),
                    eval(fy, tb),
                }));
                if ((p0[0] < 0.0 and p1[0] > 0.0) or (p0[0] > 0.0 and p1[0] < 0.0)) {
                    p1 /= @as(@Vector(2, f32), @splat(length(d)));
                    var t: f32 = undefined;
                    var tmp: f32 = undefined;
                    var p2: @Vector(2, f32) = undefined;
                    {
                        var i: i32 = 0;
                        while (i < 2) {
                            t = ta + p0[0] / (p0[0] - p1[0]) * (tb - ta);
                            d = @"M * V"(rotation, @Vector(2, f32){
                                eval(dfx, t),
                                eval(dfy, t),
                            });
                            d /= @as(@Vector(2, f32), @splat(length(d)));
                            p2 = @"M * V"([2]@Vector(2, f32){
                                .{ d[0], -d[1] },
                                .{ d[1], d[0] },
                            }, (p - @Vector(2, f32){
                                eval(fx, t),
                                eval(fy, t),
                            }));
                            if (sign(p2[0]) == sign(p0[0])) {
                                p0 = p2;
                                ta = t;
                            } else {
                                p1 = p2;
                                tb = t;
                            }
                            i += 1;
                        }
                    }
                    t = ta + p0[0] / (p0[0] - p1[0]) * (tb - ta);
                    d = @"M * V"(rotation, @Vector(2, f32){
                        eval(dfx, t),
                        eval(dfy, t),
                    });
                    d /= @as(@Vector(2, f32), @splat(length(d)));
                    p2 = @"M * V"([2]@Vector(2, f32){
                        .{ d[0], -d[1] },
                        .{ d[1], d[0] },
                    }, (p - @Vector(2, f32){
                        eval(fx, t),
                        eval(fy, t),
                    }));
                    tmp = length(@Vector(2, f32){
                        eval(dfx, 0.0),
                        eval(dfy, 0.0),
                    }) + 3.0 * (length(@Vector(2, f32){
                        eval(dfx, 0.33333333 * t),
                        eval(dfy, 0.33333333 * t),
                    }) + length(@Vector(2, f32){
                        eval(dfx, 0.66666666 * t),
                        eval(dfy, 0.66666666 * t),
                    })) + length(@Vector(2, f32){
                        eval(dfx, t),
                        eval(dfy, t),
                    });
                    p2[0] = 0.125 * t * tmp;
                    p2 /= scale;
                    p2 += offset;
                    if (imagewidth > 0.1) {
                        p2[0] = mod(p2[0], imagewidth);
                    }
                    const dst2: @Vector(4, f32) = texture.sampleLinear(p2);
                    self.dst += @as(@Vector(4, f32), @splat(dst2[3])) * (dst2 - self.dst);
                }

                dst.writePixel(self.outputCoord, self.dst);
            }

            // macros
            fn derivative(f: @Vector(4, f32)) @Vector(4, f32) {
                return @Vector(4, f32){
                    f[1],
                    2.0 * f[2],
                    3.0 * f[3],
                    0.0,
                };
            }

            fn eval(f: @Vector(4, f32), t: f32) f32 {
                return (f[0] + t * (f[1] + t * (f[2] + t * f[3])));
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
    fn sign(v: anytype) @TypeOf(v) {
        return std.math.sign(v);
    }

    fn mod(v1: anytype, v2: anytype) @TypeOf(v1) {
        return switch (@typeInfo(@TypeOf(v2))) {
            .vector => @mod(v1, v2),
            else => switch (@typeInfo(@TypeOf(v1))) {
                .vector => @mod(v1, @as(@TypeOf(v1), @splat(v2))),
                else => @mod(v1, v2),
            },
        };
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
