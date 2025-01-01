const std = @import("std");
const process = @import("process.zig");

const kernel = struct {};
const Input = process.Input;
const Output = process.Output;
const Parameters = process.Parameters;

//---start of code
pub usingnamespace switch (@import("builtin").single_threaded) {
    false => async_support,
    true => struct {},
};

const async_support = struct {
    const zigar = @import("zigar");
    const Allocator = std.mem.Allocator;
    const Promise = zigar.function.PromiseOf(thread_ns.processSlice);
    const AbortSignal = zigar.function.AbortSignal;
    const WorkQueue = zigar.thread.WorkQueue;

    var work_queue: WorkQueue(thread_ns) = .{};

    pub fn startThreadPool(count: u32) !void {
        const allocator = zigar.mem.getDefaultAllocator();
        try work_queue.init(.{ .allocator = allocator, .n_jobs = count });
        try zigar.thread.use();
    }

    pub fn stopThreadPool() !void {
        work_queue.deinit();
        zigar.thread.end();
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
        const workers: u32 = @intCast(work_queue.thread_count);
        const scanlines: u32 = height / workers;
        const slices: u32 = if (scanlines > 0) workers else 1;
        const multipart_promise = try promise.partition(zigar.mem.getDefaultAllocator(), slices);
        var slice_num: u32 = 0;
        while (slice_num < slices) : (slice_num += 1) {
            const start = scanlines * slice_num;
            const count = if (slice_num < slices - 1) scanlines else height - (scanlines * slice_num);
            try work_queue.push(thread_ns.processSlice, .{
                signal,
                width,
                start,
                count,
                input,
                output,
                params,
            }, multipart_promise);
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
