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
            outputCoord: @Vector(2, u32) = @splat(0),

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

                dst.setPixel(self.outputCoord[0], self.outputCoord[1], self.dst);
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
                .float => pbPixelFromFloatPixel(src_pixel),
                .int => pbPixelFromIntPixel(src_pixel),
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
                .float => floatPixelFromPBPixel(pixel),
                .int => intPixelFromPBPixel(pixel),
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
            .default_value_ptr = @ptrCast(&default_value),
            .is_comptime = false,
            .alignment = @alignOf(ImageT),
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
            .default_value_ptr = @ptrCast(&default_value),
            .is_comptime = false,
            .alignment = @alignOf(ImageT),
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

pub usingnamespace switch (@import("builtin").single_threaded) {
    false => async_support,
    true => struct {},
};

const async_support = struct {
    const builtin = @import("builtin");
    const zigar = @import("zigar");
    const Allocator = std.mem.Allocator;
    const Promise = zigar.function.PromiseOf(thread_ns.processSlice);
    const AbortSignal = zigar.function.AbortSignal;
    const WorkQueue = zigar.thread.WorkQueue;

    var work_queue: WorkQueue(thread_ns) = .{};
    var gpa = switch (builtin.target.isWasm()) {
        true => {},
        false => std.heap.DebugAllocator(.{}){},
    };
    const internal_allocator = switch (builtin.target.isWasm()) {
        true => std.heap.wasm_allocator,
        false => gpa.allocator(),
    };

    pub fn startThreadPool(count: u32) !void {
        try work_queue.init(.{
            .allocator = internal_allocator,
            .stack_size = 65536,
            .n_jobs = count,
        });
    }

    pub fn stopThreadPool() void {
        work_queue.deinit();
    }

    pub fn stopThreadPoolAsync(promise: zigar.function.Promise(void)) void {
        work_queue.deinitAsync(promise);
    }

    pub fn createOutputAsync(allocator: Allocator, promise: Promise, signal: AbortSignal, width: u32, height: u32, input: Input, params: Parameters) !void {
        var output: Output = undefined;
        // allocate memory for output image
        const fields = std.meta.fields(Output);
        var allocated: usize = 0;
        errdefer inline for (fields, 0..) |field, i| {
            if (i < allocated) {
                allocator.free(@field(output, field.name).data);
            }
        };
        inline for (fields) |field| {
            const ImageT = @TypeOf(@field(output, field.name));
            const data = try allocator.alloc(ImageT.Pixel, width * height);
            @field(output, field.name) = .{
                .data = data,
                .width = width,
                .height = height,
            };
            allocated += 1;
        }
        // add work units to queue
        const workers: u32 = @intCast(@max(1, work_queue.thread_count));
        const scanlines: u32 = height / workers;
        const slices: u32 = if (scanlines > 0) workers else 1;
        const multipart_promise = try promise.partition(internal_allocator, slices);
        var slice_num: u32 = 0;
        while (slice_num < slices) : (slice_num += 1) {
            const start = scanlines * slice_num;
            const count = if (slice_num < slices - 1) scanlines else height - (scanlines * slice_num);
            try work_queue.push(thread_ns.processSlice, .{ signal, width, start, count, input, output, params }, multipart_promise);
        }
    }

    const thread_ns = struct {
        pub fn processSlice(signal: AbortSignal, width: u32, start: u32, count: u32, input: Input, output: Output, params: Parameters) !Output {
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
                    if (signal.on()) return error.Aborted;
                }
            }
            return output;
        }
    };
};
