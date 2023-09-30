const std = @import("std");

test "hello" {
    const S = struct {
        hello: i32 = undefined,
    };
    inline for (@typeInfo(S).Struct.fields) |field| {
        if (field.default_value) |ptr| {
            const i_ptr: *const i32 = @ptrCast(@alignCast(ptr));
            std.debug.print("\n{d}\n", .{i_ptr.*});
        }
    }
}
