// Pixel Bender kernel "VertexRenderer" (translated using pb2zig)
const std = @import("std");

pub const kernel = struct {
    // kernel information
    pub const namespace = "Metallic";
    pub const vendor = "Petri Leskinen";
    pub const version = 1;
    pub const description = "Metallic -effect";
    pub const parameters = .{
        .lightsource = .{
            .type = @Vector(3, f32),
            .minValue = .{
                -1000.0,
                -1000.0,
                -1000.0,
            },
            .maxValue = .{
                1000.0,
                1000.0,
                1000.0,
            },
            .defaultValue = .{ 200.0, 60.0, 40.0 },
            .description = "xyz-location of the light source",
        },
        .shininess = .{
            .type = i32,
            .minValue = 2,
            .maxValue = 64,
            .defaultValue = 40,
            .description = "shininess",
        },
        .shadow = .{
            .type = f32,
            .minValue = 0.0,
            .maxValue = 1.0,
            .defaultValue = 0.4,
            .description = "depth of shadow areas",
        },
        .relief = .{
            .type = f32,
            .minValue = 1.0,
            .maxValue = 10.0,
            .defaultValue = 2.0,
            .description = "the height of 3D effect",
        },
        .stripesize = .{
            .type = @Vector(2, f32),
            .minValue = .{ 1.0, 1.0 },
            .maxValue = .{ 256.0, 200.0 },
            .defaultValue = .{ 256.0, 10.0 },
            .description = "the size for input 'stripe'",
        },
        .viewDirection = .{
            .type = @Vector(3, f32),
            .minValue = .{ -1.0, -1.0, -1.0 },
            .maxValue = .{ 1.0, 1.0, 1.0 },
            .defaultValue = .{ 0.0, 0.0, 1.0 },
        },
    };
    pub const inputImages = .{
        .source = .{ .channels = 4 },
        .stripe = .{ .channels = 4 },
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
                const lightsource = self.params.lightsource;
                const shininess = self.params.shininess;
                const shadow = self.params.shadow;
                const relief = self.params.relief;
                const stripesize = self.params.stripesize;
                const viewDirection = self.params.viewDirection;
                const source = self.input.source;
                const stripe = self.input.stripe;
                const dst = self.output.dst;
                self.dst = @splat(0.0);

                const po: @Vector(2, f32) = self.outCoord();
                var tmp4: @Vector(4, f32) = undefined;
                self.dst = source.sampleLinear(po);
                if (self.dst[3] > 0.01) {
                    const sourcesample: @Vector(4, f32) = self.dst;
                    tmp4 = source.sampleLinear(po + @Vector(2, f32){ -3.0, 0.0 });
                    const tmp1 = tmp4;
                    tmp4 = source.sampleLinear(po + @Vector(2, f32){ -2.0, 0.0 });
                    const tmp2 = tmp4;
                    tmp4 = source.sampleLinear(po + @Vector(2, f32){ -1.0, 0.0 });
                    const tmp3 = tmp4;
                    tmp4 = source.sampleLinear(po + @Vector(2, f32){ 1.0, 0.0 });
                    const tmp5 = tmp4;
                    tmp4 = source.sampleLinear(po + @Vector(2, f32){ 2.0, 0.0 });
                    const tmp6 = tmp4;
                    tmp4 = source.sampleLinear(po + @Vector(2, f32){ 3.0, 0.0 });
                    const tmp7 = tmp4;
                    tmp4 = source.sampleLinear(po + @Vector(2, f32){ 0.0, -3.0 });
                    const tmp8 = tmp4;
                    tmp4 = source.sampleLinear(po + @Vector(2, f32){ 0.0, -2.0 });
                    const tmp9 = tmp4;
                    tmp4 = source.sampleLinear(po + @Vector(2, f32){ 0.0, -1.0 });
                    const tmp10 = tmp4;
                    tmp4 = source.sampleLinear(po + @Vector(2, f32){ 0.0, 1.0 });
                    const tmp11 = tmp4;
                    tmp4 = source.sampleLinear(po + @Vector(2, f32){ 0.0, 2.0 });
                    const tmp12 = tmp4;
                    tmp4 = source.sampleLinear(po + @Vector(2, f32){ 0.0, 3.0 });
                    const tmp13 = tmp4;
                    var normal: @Vector(3, f32) = .{
                        (0.7 * tmp1[1] + 0.2 * tmp4[0] + 0.1 * tmp4[2]) + (0.7 * tmp2[1] + 0.2 * tmp4[0] + 0.1 * tmp4[2]) + (0.7 * tmp3[1] + 0.2 * tmp4[0] + 0.1 * tmp4[2]) - (0.7 * tmp5[1] + 0.2 * tmp4[0] + 0.1 * tmp4[2]) - (0.7 * tmp6[1] + 0.2 * tmp4[0] + 0.1 * tmp4[2]) - (0.7 * tmp7[1] + 0.2 * tmp4[0] + 0.1 * tmp4[2]),
                        (0.7 * tmp8[1] + 0.2 * tmp4[0] + 0.1 * tmp4[2]) + (0.7 * tmp9[1] + 0.2 * tmp4[0] + 0.1 * tmp4[2]) + (0.7 * tmp10[1] + 0.2 * tmp4[0] + 0.1 * tmp4[2]) - (0.7 * tmp11[1] + 0.2 * tmp4[0] + 0.1 * tmp4[2]) - (0.7 * tmp12[1] + 0.2 * tmp4[0] + 0.1 * tmp4[2]) - (0.7 * tmp13[1] + 0.2 * tmp4[0] + 0.1 * tmp4[2]),
                        12.0 / relief,
                    };
                    var len: f32 = 1.0 / sqrt(normal[0] * normal[0] + normal[1] * normal[1] + normal[2] * normal[2] + 0.0);
                    normal *= @as(@Vector(3, f32), @splat(len));
                    var lightbeam: @Vector(3, f32) = lightsource;
                    lightbeam = @shuffle(f32, lightbeam, @shuffle(f32, lightbeam, undefined, @Vector(2, i32){ 0, 1 }) - po, @Vector(3, i32){ -1, -2, 2 });
                    tmp4 = sourcesample;
                    const tmp14 = tmp4;
                    lightbeam[2] -= 5.0 * relief * ((0.7 * tmp14[1] + 0.2 * tmp4[0] + 0.1 * tmp4[2]) - 1.0);
                    len = 1.0 / sqrt(lightbeam[0] * lightbeam[0] + lightbeam[1] * lightbeam[1] + lightbeam[2] * lightbeam[2] + 0.0);
                    lightbeam *= @as(@Vector(3, f32), @splat(len));
                    var refl: f32 = shadow + (1.0 - shadow) * dot(normal, lightbeam);
                    const v: @Vector(3, f32) = reflectVector(viewDirection, normal);
                    var spec: f32 = dot(v, lightbeam);
                    if (spec > 0.0) {
                        spec = pow(spec, @as(f32, @floatFromInt(shininess)));
                        refl += spec;
                    }
                    refl = clamp(refl, 0.0, 1.0);
                    self.dst = stripe.sampleLinear(@Vector(2, f32){
                        0.5 + (stripesize[0] - 1.0) * refl,
                        stripesize[1],
                    });
                    self.dst[3] *= sourcesample[3];
                }

                dst.setPixel(self.outputCoord[0], self.outputCoord[1], self.dst);
            }

            // macros
            fn reflectVector(v: @Vector(3, f32), n: @Vector(3, f32)) @Vector(3, f32) {
                return (@as(@Vector(3, f32), @splat(2.0)) * n * @as(@Vector(3, f32), @splat(dot(v, n))) / @as(@Vector(3, f32), @splat((n[0] * n[0] + n[1] * n[1] + n[2] * n[2]))) - v);
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
    fn pow(v1: anytype, v2: anytype) @TypeOf(v1) {
        return switch (@typeInfo(@TypeOf(v1))) {
            .Vector => calc: {
                var result: @TypeOf(v1) = undefined;
                inline for (0..@typeInfo(@TypeOf(v1)).Vector.len) |i| {
                    result[i] = pow(v1[i], v2[i]);
                }
                break :calc result;
            },
            else => std.math.pow(@TypeOf(v1), v1, v2),
        };
    }

    fn sqrt(v: anytype) @TypeOf(v) {
        return @sqrt(v);
    }

    fn clamp(v: anytype, min_val: anytype, max_val: anytype) @TypeOf(v) {
        return switch (@typeInfo(@TypeOf(min_val))) {
            .Vector => calc: {
                const T = @typeInfo(@TypeOf(v)).Vector.child;
                const result1 = @select(T, v < min_val, min_val, v);
                const result2 = @select(T, result1 > max_val, max_val, result1);
                break :calc result2;
            },
            else => switch (@typeInfo(@TypeOf(v))) {
                .Vector => clamp(v, @as(@TypeOf(v), @splat(min_val)), @as(@TypeOf(v), @splat(max_val))),
                else => calc: {
                    if (v < min_val) {
                        break :calc min_val;
                    } else if (v > max_val) {
                        break :calc max_val;
                    } else {
                        break :calc v;
                    }
                },
            },
        };
    }

    fn dot(v1: anytype, v2: anytype) f32 {
        return switch (@typeInfo(@TypeOf(v1))) {
            .Vector => @reduce(.Add, v1 * v2),
            else => v1 * v2,
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

    var job_queue: JobQueue(createOutputInThreads) = undefined;
    var job_queue_initialized: bool = false;

    pub fn startThreadPool(count: u32) !void {
        if (!job_queue_initialized) {
            job_queue_initialized = true;
            try zigar.thread.use(true);
            try job_queue.init(.{
                .n_jobs = count,
                .allocator = zigar.mem.getDefaultAllocator(),
            });
        }
    }

    pub fn stopThreadPool() !void {
        if (job_queue_initialized) {
            job_queue.deinit();
            try zigar.thread.use(false);
            job_queue_initialized = false;
        }
    }

    pub fn createOutputAsync(allocator: Allocator, promise: Promise, signal: AbortSignal, width: u32, height: u32, input: Input, params: Parameters) !void {
        if (!job_queue_initialized) {
            return OutputError.NoThreadsAvailable;
        }
        return job_queue.push(.{ allocator, promise, signal, width, height, input, params });
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
        const n_jobs = job_queue.n_jobs;
        const scanlines: u32 = if (n_jobs > 0) height / n_jobs else 0;
        if (n_jobs > 1 and scanlines > 0) {
            const child_count: u32 = n_jobs - 1;
            var wg: std.Thread.WaitGroup = .{};
            var thread_num: u32 = 0;
            while (thread_num < child_count) : (thread_num += 1) {
                job_queue.pool.spawnWg(&wg, processSlice, .{
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
