// Pixel Bender kernel "randomPixelation" (translated using pb2zig)
const std = @import("std");

pub const kernel = struct {
    // kernel information
    pub const namespace = "random size pixelation";
    pub const vendor = "pixelero";
    pub const version = 1;
    pub const description = "random size pixelation";
    pub const parameters = .{
        .n0 = .{
            .type = f32,
            .minValue = 1.0,
            .maxValue = 100.0,
            .defaultValue = 13.0,
        },
        .n1 = .{
            .type = f32,
            .minValue = 1.0,
            .maxValue = 100.0,
            .defaultValue = 17.0,
        },
        .n2 = .{
            .type = f32,
            .minValue = 1.0,
            .maxValue = 100.0,
            .defaultValue = 19.0,
        },
        .n3 = .{
            .type = f32,
            .minValue = 1.0,
            .maxValue = 100.0,
            .defaultValue = 21.0,
        },
        .n4 = .{
            .type = f32,
            .minValue = 1.0,
            .maxValue = 100.0,
            .defaultValue = 23.0,
        },
        .randomPoint = .{
            .type = @Vector(2, f32),
            .minValue = .{ -100.0, -100.0 },
            .maxValue = .{ 1000.0, 1000.0 },
            .defaultValue = .{ 217.5, 781.6 },
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
                const n0 = self.params.n0;
                const n1 = self.params.n1;
                const n2 = self.params.n2;
                const n3 = self.params.n3;
                const n4 = self.params.n4;
                const randomPoint = self.params.randomPoint;
                const src = self.input.src;
                const dst = self.output.dst;
                self.dst = @splat(0.0);

                var p: @Vector(2, f32) = self.outCoord() + randomPoint;
                p += mod(p, n4) - mod(p, n3);
                const ds: @Vector(2, f32) = mod(p, n0) + mod(p, n1) + mod(p, n2) - @as(@Vector(2, f32), @splat(0.5 * (n0 + n1 + n2)));
                self.dst = src.sampleLinear(self.outCoord() - @as(@Vector(2, f32), @splat(0.333333)) * ds);

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
    fn mod(v1: anytype, v2: anytype) @TypeOf(v1) {
        return switch (@typeInfo(@TypeOf(v2))) {
            .Vector => @mod(v1, v2),
            else => switch (@typeInfo(@TypeOf(v1))) {
                .Vector => @mod(v1, @as(@TypeOf(v1), @splat(v2))),
                else => @mod(v1, v2),
            },
        };
    }
};

pub const Input = KernelInput(u8, kernel);
pub const Output = KernelOutput(u8, kernel);
pub const Parameters = KernelParameters(kernel);

pub fn createOutput(allocator: std.mem.Allocator, width: u32, height: u32, input: Input, params: Parameters) !Output {
    var output: Output = undefined;
    inline for (std.meta.fields(Output)) |field| {
        const ImageT = @TypeOf(@field(output, field.name));
        @field(output, field.name) = .{
            .data = try allocator.alloc(ImageT.Pixel, width * height),
            .width = width,
            .height = height,
        };
    }
    var instance = kernel.create(input, output, params);
    if (@hasDecl(@TypeOf(instance), "evaluateDependents")) {
        instance.evaluateDependents();
    }
    while (instance.outputCoord[1] < height) : (instance.outputCoord[1] += 1) {
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
            const index = (y * self.width) + x;
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
            const index = (y * self.width) + x;
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
            const value: param.type = switch (@hasField(@TypeOf(param), "defaultValue")) {
                true => param.defaultValue,
                false => switch (@typeInfo(param.type)) {
                    .Int, .Float => 0,
                    .Bool => false,
                    .Vector => @splat(0),
                    else => @compileError("Unrecognized parameter type: " ++ @typeName(param.type)),
                },
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

pub usingnamespace switch (@import("builtin").single_threaded) {
    false => async_support,
    true => struct {},
};

const async_support = struct {
    const zigar = @import("zigar");
    const Allocator = std.mem.Allocator;
    const Promise = zigar.function.Promise(OutputError!Output);
    const AbortSignal = zigar.function.AbortSignal;
    const JobQueue = zigar.thread.JobQueue;

    pub const OutputError = error{
        OutOfMemory,
        NoThreadsAvailable,
        Aborted,
    };

    var job_queue: JobQueue(.{
        .create = createOutputInThreads,
        .stop = stopThreadPoolInThread,
    }) = undefined;
    var start_count: u32 = 0;
    var thread_pool: std.Thread.Pool = undefined;
    var thread_count: u32 = 0;

    pub fn startThreadPool(count: u32) !void {
        start_count += 1;
        if (start_count == 1) {
            const allocator = zigar.mem.getDefaultAllocator();
            try zigar.thread.use(true);
            try job_queue.init(allocator);
            if (count > 1) {
                try thread_pool.init(.{ .n_jobs = count, .allocator = allocator });
            }
            thread_count = count;
        }
    }

    pub fn stopThreadPool() !void {
        if (start_count == 0) {
            return;
        }
        start_count -= 1;
        if (start_count == 0) {
            const count = thread_count;
            thread_count = 0;
            // remove queued jobs
            job_queue.clear();
            // use helper thread to shut down thread pool
            if (count > 1) {
                try job_queue.push(.stop, .{});
            }
            job_queue.deinit();
            try zigar.thread.use(false);
        }
    }

    fn stopThreadPoolInThread() void {
        thread_pool.deinit();
    }

    pub fn createOutputAsync(allocator: Allocator, promise: Promise, signal: AbortSignal, width: u32, height: u32, input: Input, params: Parameters) !void {
        if (thread_count == 0) {
            return OutputError.NoThreadsAvailable;
        }
        return job_queue.push(.create, .{ allocator, promise, signal, width, height, input, params });
    }

    fn createOutputInThreads(allocator: Allocator, promise: Promise, signal: AbortSignal, width: u32, height: u32, input: Input, params: Parameters) void {
        var output: Output = undefined;
        const fields = std.meta.fields(Output);
        inline for (fields, 0..) |field, i| {
            const ImageT = @TypeOf(@field(output, field.name));
            const data = allocator.alloc(ImageT.Pixel, width * height) catch {
                inline for (0..i) |j| {
                    allocator.free(@field(output, fields[j].name).data);
                }
                promise.resolve(OutputError.OutOfMemory);
                return;
            };
            @field(output, field.name) = .{
                .data = data,
                .width = width,
                .height = height,
            };
        }
        const scanlines: u32 = if (thread_count > 0) height / thread_count else 0;
        if (thread_count > 1 and scanlines > 0) {
            const child_count: u32 = thread_count - 1;
            var wg: std.Thread.WaitGroup = .{};
            var thread_num: u32 = 0;
            while (thread_num < child_count) : (thread_num += 1) {
                thread_pool.spawnWg(&wg, processSlice, .{
                    signal,
                    width,
                    scanlines * thread_num,
                    scanlines,
                    input,
                    output,
                    params,
                });
            }
            const remaining_start = scanlines * child_count;
            const remaining_count = height - remaining_start;
            processSlice(signal, width, remaining_start, remaining_count, input, output, params);
            wg.wait();
        } else {
            processSlice(signal, width, 0, height, input, output, params);
        }
        if (signal.off()) {
            promise.resolve(output);
        } else {
            inline for (std.meta.fields(Output)) |field| {
                allocator.free(@field(output, field.name).data);
            }
            promise.resolve(OutputError.Aborted);
        }
    }

    fn processSlice(signal: AbortSignal, width: u32, start: u32, count: u32, input: Input, output: Output, params: Parameters) void {
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
                if (signal.on()) return;
            }
        }
    }
};
