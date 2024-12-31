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
    const Promise = zigar.function.PromiseOf(thread_ns.createOutput);
    const AbortSignal = zigar.function.AbortSignal;
    const JobQueue = zigar.thread.JobQueue;

    var job_queue: JobQueue(thread_ns) = .{};
    var thread_pool: std.Thread.Pool = undefined;
    var thread_count: u32 = 0;

    pub fn startThreadPool(count: u32) !void {
        const allocator = zigar.mem.getDefaultAllocator();
        try job_queue.init(.{ .allocator = allocator, .n_jobs = count });
        try zigar.thread.use(true);
        if (count > 1) {
            try thread_pool.init(.{ .n_jobs = count, .allocator = allocator });
        }
        thread_count = count;
    }

    pub fn stopThreadPool() !void {
        // remove queued jobs
        job_queue.clear();
        // use helper thread to shut down thread pool
        if (thread_count > 1) {
            try job_queue.push(thread_ns.stopThreadPool, .{}, null);
        }
        job_queue.deinit();
        try zigar.thread.use(false);
        thread_count = 0;
    }

    pub fn createOutputAsync(allocator: Allocator, promise: Promise, signal: AbortSignal, width: u32, height: u32, input: Input, params: Parameters) !void {
        if (thread_count == 0) {
            return error.NoThreadsAvailable;
        }
        return job_queue.push(thread_ns.createOutput, .{ allocator, signal, width, height, input, params }, promise);
    }

    const thread_ns = struct {
        pub fn stopThreadPool() void {
            thread_pool.deinit();
        }

        pub fn createOutput(allocator: Allocator, signal: AbortSignal, width: u32, height: u32, input: Input, params: Parameters) !Output {
            var output: Output = undefined;
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
            return if (signal.off()) output else error.Aborted;
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
};
