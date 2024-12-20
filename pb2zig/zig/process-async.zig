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
