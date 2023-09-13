const std = @import("std");
const assert = std.debug.assert;

pub inline fn any(v: anytype) bool {
    return @reduce(.Or, v);
}

test "any" {
    const vector1: @Vector(4, bool) = .{ false, false, false, false };
    const vector2: @Vector(4, bool) = .{ false, false, false, true };
    const vector3: @Vector(2, bool) = .{ false, true };
    assert(any(vector1) == false);
    assert(any(vector2) == true);
    assert(any(vector3) == true);
}

pub inline fn all(v: anytype) bool {
    return @reduce(.And, v);
}

test "all" {
    const vector1: @Vector(4, bool) = .{ true, true, true, false };
    const vector2: @Vector(4, bool) = .{ true, true, true, true };
    const vector3: @Vector(2, bool) = .{ false, true };
    assert(all(vector1) == false);
    assert(all(vector2) == true);
    assert(all(vector3) == false);
}

pub inline fn not(v: anytype) @TypeOf(v) {
    return v != @as(@TypeOf(v), @splat(true));
}

test "not" {
    const vector1: @Vector(4, bool) = .{ true, true, true, false };
    const vector2: @Vector(4, bool) = .{ true, true, true, true };
    const vector3: @Vector(2, bool) = .{ false, true };
    const not_vector1 = not(vector1);
    const not_vector2 = not(vector2);
    const not_vector3 = not(vector3);
    assert(all(not_vector1 == @Vector(4, bool){ false, false, false, true }));
    assert(all(not_vector2 == @Vector(4, bool){ false, false, false, false }));
    assert(all(not_vector3 == @Vector(2, bool){ true, false }));
}

fn BoolOf(comptime T: type) type {
    const len = @typeInfo(T).Vector.len;
    return @Vector(len, bool);
}

pub inline fn equal(v1: anytype, v2: anytype) BoolOf(@TypeOf(v1)) {
    return v1 == v2;
}

test "equal" {
    const vector1: @Vector(3, f32) = .{ 1, 2, 3 };
    const vector2: @Vector(3, f32) = .{ 1, 2, 3 };
    const vector3: @Vector(3, f32) = .{ 2, 2, 6 };
    assert(all(equal(vector1, vector2)) == true);
    assert(all(equal(vector3, vector2)) == false);
    assert(any(equal(vector3, vector2)) == true);
}

pub inline fn notEqual(v1: anytype, v2: anytype) BoolOf(@TypeOf(v1)) {
    return v1 != v2;
}

test "notEqual" {
    const vector1: @Vector(3, f32) = .{ 1, 2, 3 };
    const vector2: @Vector(3, f32) = .{ 2, 3, 4 };
    const vector3: @Vector(3, f32) = .{ 2, 3, 5 };
    assert(all(notEqual(vector1, vector2)) == true);
    assert(all(notEqual(vector3, vector2)) == false);
    assert(any(notEqual(vector3, vector2)) == true);
}

pub inline fn lessThan(v1: anytype, v2: anytype) BoolOf(@TypeOf(v1)) {
    return v1 < v2;
}

test "lessThan" {
    const vector1: @Vector(3, f32) = .{ 1, 2, 3 };
    const vector2: @Vector(3, f32) = .{ 4, 5, 6 };
    const vector3: @Vector(3, f32) = .{ 99, 99, 2 };
    assert(all(lessThan(vector1, vector2)) == true);
    assert(all(lessThan(vector3, vector2)) == false);
    assert(any(lessThan(vector3, vector2)) == true);
}

pub inline fn lessThanEqual(v1: anytype, v2: anytype) BoolOf(@TypeOf(v1)) {
    return v1 <= v2;
}

test "lessThanEqual" {
    const vector1: @Vector(3, f32) = .{ 1, 2, 3 };
    const vector2: @Vector(3, f32) = .{ 2, 2, 4 };
    const vector3: @Vector(3, f32) = .{ 99, 99, 4 };
    assert(all(lessThanEqual(vector1, vector2)) == true);
    assert(all(lessThanEqual(vector3, vector2)) == false);
    assert(any(lessThanEqual(vector3, vector2)) == true);
}

pub inline fn greaterThan(v1: anytype, v2: anytype) BoolOf(@TypeOf(v1)) {
    return v1 > v2;
}

test "greaterThan" {
    const vector1: @Vector(3, f32) = .{ 5, 6, 7 };
    const vector2: @Vector(3, f32) = .{ 4, 5, 6 };
    const vector3: @Vector(3, f32) = .{ 5, 0, 0 };
    assert(all(greaterThan(vector1, vector2)) == true);
    assert(all(greaterThan(vector3, vector2)) == false);
    assert(any(greaterThan(vector3, vector2)) == true);
}

pub inline fn greatThanEqual(v1: anytype, v2: anytype) BoolOf(@TypeOf(v1)) {
    return v1 >= v2;
}

test "greatThanEqual" {
    const vector1: @Vector(3, f32) = .{ 6, 6, 7 };
    const vector2: @Vector(3, f32) = .{ 1, 2, 3 };
    const vector3: @Vector(3, f32) = .{ 6, 0, 2 };
    assert(all(greatThanEqual(vector1, vector2)) == true);
    assert(all(greatThanEqual(vector3, vector2)) == false);
    assert(any(greatThanEqual(vector3, vector2)) == true);
}

pub inline fn length(v: anytype) f32 {
    _ = v;
}
