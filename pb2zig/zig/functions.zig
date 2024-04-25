const std = @import("std");
const assert = std.debug.assert;

pub fn any(v: anytype) bool {
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

pub fn all(v: anytype) bool {
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

pub fn not(v: anytype) @TypeOf(v) {
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

pub fn equal(v1: anytype, v2: anytype) @Vector(@typeInfo(@TypeOf(v1)).Vector.len, bool) {
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

pub fn notEqual(v1: anytype, v2: anytype) @Vector(@typeInfo(@TypeOf(v1)).Vector.len, bool) {
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

pub fn lessThan(v1: anytype, v2: anytype) @Vector(@typeInfo(@TypeOf(v1)).Vector.len, bool) {
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

pub fn lessThanEqual(v1: anytype, v2: anytype) @Vector(@typeInfo(@TypeOf(v1)).Vector.len, bool) {
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

pub fn greaterThan(v1: anytype, v2: anytype) @Vector(@typeInfo(@TypeOf(v1)).Vector.len, bool) {
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

pub fn greaterThanEqual(v1: anytype, v2: anytype) @Vector(@typeInfo(@TypeOf(v1)).Vector.len, bool) {
    return v1 >= v2;
}

test "greaterThanEqual" {
    const vector1: @Vector(3, f32) = .{ 6, 6, 7 };
    const vector2: @Vector(3, f32) = .{ 1, 2, 3 };
    const vector3: @Vector(3, f32) = .{ 6, 0, 2 };
    assert(all(greaterThanEqual(vector1, vector2)) == true);
    assert(all(greaterThanEqual(vector3, vector2)) == false);
    assert(any(greaterThanEqual(vector3, vector2)) == true);
}

pub fn radians(v: anytype) @TypeOf(v) {
    const multiplier = std.math.pi / 180.0;
    return switch (@typeInfo(@TypeOf(v))) {
        .Vector => v * @as(@TypeOf(v), @splat(multiplier)),
        else => v * multiplier,
    };
}

test "radians" {
    const vector1: f32 = 360;
    const vector2: @Vector(2, f32) = .{ 180, 270 };
    assert(radians(vector1) == std.math.pi * 2);
    assert(all(radians(vector2) == @Vector(2, f32){ std.math.pi, std.math.pi * 1.5 }));
}

pub fn degrees(v: anytype) @TypeOf(v) {
    const multiplier = 180.0 / std.math.pi;
    return switch (@typeInfo(@TypeOf(v))) {
        .Vector => v * @as(@TypeOf(v), @splat(multiplier)),
        else => v * multiplier,
    };
}

test "degrees" {
    const vector1: f32 = std.math.pi * 2;
    const vector2: @Vector(2, f32) = .{ std.math.pi, std.math.pi * 1.5 };
    assert(degrees(vector1) == 360);
    assert(all(degrees(vector2) == @Vector(2, f32){ 180, 270 }));
}

pub fn sin(v: anytype) @TypeOf(v) {
    return @sin(v);
}

test "sin" {
    const vector1: f32 = 0;
    const vector2: @Vector(2, f32) = .{ 0, std.math.pi * 1.5 };
    assert(sin(vector1) == 0);
    assert(all(sin(vector2) == @Vector(2, f32){ 0, -1 }));
}

pub fn cos(v: anytype) @TypeOf(v) {
    return @cos(v);
}

test "cos" {
    const vector1: f32 = 0;
    const vector2: @Vector(2, f32) = .{ 0, 0 };
    assert(cos(vector1) == 1);
    assert(all(cos(vector2) == @Vector(2, f32){ 1, 1 }));
}

pub fn tan(v: anytype) @TypeOf(v) {
    return @tan(v);
}

test "tan" {
    const vector1: f32 = 0;
    const vector2: @Vector(2, f32) = .{ 0, 0 };
    assert(tan(vector1) == 0);
    assert(all(tan(vector2) == @Vector(2, f32){ 0, 0 }));
}

pub fn asin(v: anytype) @TypeOf(v) {
    return switch (@typeInfo(@TypeOf(v))) {
        .Vector => calc: {
            var result: @TypeOf(v) = undefined;
            comptime var i = 0;
            inline while (i < @typeInfo(@TypeOf(v)).Vector.len) : (i += 1) {
                result[i] = asin(v[i]);
            }
            break :calc result;
        },
        else => std.math.asin(v),
    };
}

test "asin" {
    const vector1: f32 = 0;
    const vector2: @Vector(2, f32) = .{ 0, 0 };
    assert(asin(vector1) == 0);
    assert(all(asin(vector2) == @Vector(2, f32){ 0, 0 }));
}

pub fn acos(v: anytype) @TypeOf(v) {
    return switch (@typeInfo(@TypeOf(v))) {
        .Vector => calc: {
            var result: @TypeOf(v) = undefined;
            comptime var i = 0;
            inline while (i < @typeInfo(@TypeOf(v)).Vector.len) : (i += 1) {
                result[i] = acos(v[i]);
            }
            break :calc result;
        },
        else => std.math.acos(v),
    };
}

test "acos" {
    const vector1: f32 = 1;
    const vector2: @Vector(2, f32) = .{ 1, 1 };
    assert(acos(vector1) == 0);
    assert(all(acos(vector2) == @Vector(2, f32){ 0, 0 }));
}

pub fn atan(v: anytype) @TypeOf(v) {
    return switch (@typeInfo(@TypeOf(v))) {
        .Vector => calc: {
            var result: @TypeOf(v) = undefined;
            comptime var i = 0;
            inline while (i < @typeInfo(@TypeOf(v)).Vector.len) : (i += 1) {
                result[i] = atan(v[i]);
            }
            break :calc result;
        },
        else => std.math.atan(v),
    };
}

test "atan" {
    const vector1: f32 = 0;
    const vector2: @Vector(2, f32) = .{ 0, 0 };
    assert(atan(vector1) == 0);
    assert(all(atan(vector2) == @Vector(2, f32){ 0, 0 }));
}

pub fn atan2(v1: anytype, v2: anytype) @TypeOf(v1) {
    return switch (@typeInfo(@TypeOf(v1))) {
        .Vector => calc: {
            var result: @TypeOf(v1) = undefined;
            comptime var i = 0;
            inline while (i < @typeInfo(@TypeOf(v1)).Vector.len) : (i += 1) {
                result[i] = atan2(v1[i], v2[i]);
            }
            break :calc result;
        },
        else => switch (@typeInfo(@TypeOf(std.math.atan2)).Fn.params.len) {
            2 => std.math.atan2(v1, v2),
            else => std.math.atan2(@TypeOf(v1), v1, v2),
        },
    };
}

test "atan2" {
    const pair1: [2]f32 = .{ 0, 1 };
    const pair2: [2]@Vector(2, f32) = .{ .{ 0, 1 }, .{ 1, 1 } };
    assert(atan2(pair1[0], pair1[1]) == 0);
    assert(all(atan2(pair2[0], pair2[1]) == @Vector(2, f32){ 0, 0.78539816339 }));
}

pub fn pow(v1: anytype, v2: anytype) @TypeOf(v1) {
    return switch (@typeInfo(@TypeOf(v1))) {
        .Vector => calc: {
            var result: @TypeOf(v1) = undefined;
            comptime var i = 0;
            inline while (i < @typeInfo(@TypeOf(v1)).Vector.len) : (i += 1) {
                result[i] = pow(v1[i], v2[i]);
            }
            break :calc result;
        },
        else => std.math.pow(@TypeOf(v1), v1, v2),
    };
}

test "pow" {
    const vector1: f32 = 2;
    const vector2: @Vector(2, f32) = .{ 2, 2 };
    assert(pow(vector1, vector1) == 4);
    assert(all(pow(vector2, vector2) == @Vector(2, f32){ 4, 4 }));
}

pub fn exp(v: anytype) @TypeOf(v) {
    return @exp(v);
}

test "exp" {
    const vector1: f32 = 0;
    const vector2: @Vector(2, f32) = .{ 0, 0 };
    assert(exp(vector1) == 1);
    assert(all(exp(vector2) == @Vector(2, f32){ 1, 1 }));
}

pub fn exp2(v: anytype) @TypeOf(v) {
    return @exp2(v);
}

test "exp2" {
    const vector1: f32 = 1;
    const vector2: @Vector(2, f32) = .{ 1, 1 };
    assert(exp2(vector1) == 2);
    assert(all(exp2(vector2) == @Vector(2, f32){ 2, 2 }));
}

pub fn log(v: anytype) @TypeOf(v) {
    return @log(v);
}

test "log" {
    const vector1: f32 = 1;
    const vector2: @Vector(2, f32) = .{ 1, 1 };
    assert(log(vector1) == 0);
    assert(all(log(vector2) == @Vector(2, f32){ 0, 0 }));
}

pub fn log2(v: anytype) @TypeOf(v) {
    return @log2(v);
}

test "log2" {
    const vector1: f32 = 2;
    const vector2: @Vector(2, f32) = .{ 2, 2 };
    assert(log2(vector1) == 1);
    assert(all(log2(vector2) == @Vector(2, f32){ 1, 1 }));
}

pub fn sqrt(v: anytype) @TypeOf(v) {
    return @sqrt(v);
}

test "sqrt" {
    const vector1: f32 = 4;
    const vector2: @Vector(2, f32) = .{ 4, 4 };
    assert(sqrt(vector1) == 2);
    assert(all(sqrt(vector2) == @Vector(2, f32){ 2, 2 }));
}

pub fn inverseSqrt(v: anytype) @TypeOf(v) {
    return switch (@typeInfo(@TypeOf(v))) {
        .Vector => @as(@TypeOf(v), @splat(1)) / @sqrt(v),
        else => 1 / @sqrt(v),
    };
}

test "inverseSqrt" {
    const vector1: f32 = 4;
    const vector2: @Vector(2, f32) = .{ 4, 4 };
    assert(inverseSqrt(vector1) == 0.5);
    assert(all(inverseSqrt(vector2) == @Vector(2, f32){ 0.5, 0.5 }));
}

pub fn abs(v: anytype) @TypeOf(v) {
    // avoiding @abs() for the sake of Zig 0.11.0
    return if (@hasDecl(std.math, "fabs")) std.math.fabs(v) else std.math.sign(v) * v;
}

test "abs" {
    const vector1: f32 = -4;
    const vector2: @Vector(2, f32) = .{ -4, 4 };
    assert(abs(vector1) == 4);
    assert(all(abs(vector2) == @Vector(2, f32){ 4, 4 }));
}

pub fn sign(v: anytype) @TypeOf(v) {
    return std.math.sign(v);
}

test "sign" {
    const vector1: f32 = -4;
    const vector2: @Vector(2, f32) = .{ -4, 4 };
    const vector3: @Vector(3, f32) = .{ -4, 0, 4 };
    assert(sign(vector1) == -1);
    assert(all(sign(vector2) == @Vector(2, f32){ -1, 1 }));
    assert(all(sign(vector3) == @Vector(3, f32){ -1, 0, 1 }));
}

pub fn floor(v: anytype) @TypeOf(v) {
    return @floor(v);
}

test "floor" {
    const vector1: f32 = 0.25;
    const vector2: @Vector(2, f32) = .{ 1.23, 2.99 };
    assert(floor(vector1) == 0);
    assert(all(floor(vector2) == @Vector(2, f32){ 1, 2 }));
}

pub fn ceil(v: anytype) @TypeOf(v) {
    return @ceil(v);
}

test "ceil" {
    const vector1: f32 = 0.25;
    const vector2: @Vector(2, f32) = .{ 1.23, 2.99 };
    assert(ceil(vector1) == 1);
    assert(all(ceil(vector2) == @Vector(2, f32){ 2, 3 }));
}

pub fn fract(v: anytype) @TypeOf(v) {
    return v - @floor(v);
}

test "fract" {
    const vector1: f32 = 0.25;
    const vector2: @Vector(2, f32) = .{ 1.5, 2.75 };
    assert(fract(vector1) == 0.25);
    assert(all(fract(vector2) == @Vector(2, f32){ 0.5, 0.75 }));
}

pub fn mod(v1: anytype, v2: anytype) @TypeOf(v1) {
    return switch (@typeInfo(@TypeOf(v2))) {
        .Vector => @mod(v1, v2),
        else => switch (@typeInfo(@TypeOf(v1))) {
            .Vector => @mod(v1, @as(@TypeOf(v1), @splat(v2))),
            else => @mod(v1, v2),
        },
    };
}

test "mod" {
    const vector1: f32 = 5;
    const vector2: @Vector(2, f32) = .{ 5, 6 };
    assert(mod(vector1, 3) == 2);
    assert(all(mod(vector2, 3) == @Vector(2, f32){ 2, 0 }));
    assert(all(mod(vector2, @Vector(2, f32){ 3, 4 }) == @Vector(2, f32){ 2, 2 }));
}

pub fn min(v1: anytype, v2: anytype) @TypeOf(v1) {
    return switch (@typeInfo(@TypeOf(v2))) {
        .Vector => @min(v1, v2),
        else => switch (@typeInfo(@TypeOf(v1))) {
            .Vector => @min(v1, @as(@TypeOf(v1), @splat(v2))),
            else => @min(v1, v2),
        },
    };
}

test "min" {
    const vector1: f32 = 5;
    const vector2: @Vector(2, f32) = .{ 5, 6 };
    assert(min(vector1, 3) == 3);
    assert(all(min(vector2, 5.5) == @Vector(2, f32){ 5, 5.5 }));
    assert(all(min(vector2, @Vector(2, f32){ 4.5, 5.5 }) == @Vector(2, f32){ 4.5, 5.5 }));
}

pub fn max(v1: anytype, v2: anytype) @TypeOf(v1) {
    return switch (@typeInfo(@TypeOf(v2))) {
        .Vector => @max(v1, v2),
        else => switch (@typeInfo(@TypeOf(v1))) {
            .Vector => @max(v1, @as(@TypeOf(v1), @splat(v2))),
            else => @max(v1, v2),
        },
    };
}

test "max" {
    const vector1: f32 = 5;
    const vector2: @Vector(2, f32) = .{ 5, 6 };
    assert(max(vector1, 3) == 5);
    assert(all(max(vector2, 5.5) == @Vector(2, f32){ 5.5, 6 }));
    assert(all(max(vector2, @Vector(2, f32){ 4.5, 5.5 }) == @Vector(2, f32){ 5, 6 }));
}

pub fn step(v1: anytype, v2: anytype) @TypeOf(v2) {
    return switch (@typeInfo(@TypeOf(v1))) {
        .Vector => calc: {
            const ones: @TypeOf(v2) = @splat(1);
            const zeros: @TypeOf(v2) = @splat(0);
            break :calc @select(@typeInfo(@TypeOf(v2)).Vector.child, v2 < v1, zeros, ones);
        },
        else => switch (@typeInfo(@TypeOf(v2))) {
            .Vector => step(@as(@TypeOf(v2), @splat(v1)), v2),
            else => if (v2 < v1) 0 else 1,
        },
    };
}

test "step" {
    const pair1: [2]f32 = .{ 1, 2 };
    const pair2: [2]@Vector(2, f32) = .{ .{ 3, 4 }, .{ 5, 2 } };
    assert(step(pair1[0], pair1[1]) == 1);
    assert(all(step(3.5, pair2[0]) == @Vector(2, f32){ 0, 1 }));
    assert(all(step(pair2[0], pair2[1]) == @Vector(2, f32){ 1, 0 }));
}

pub fn clamp(v: anytype, min_val: anytype, max_val: anytype) @TypeOf(v) {
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

test "clamp" {
    const vector1: f32 = -1;
    const vector2: f32 = 1.5;
    const vector3: f32 = 0.5;
    assert(clamp(vector1, 0, 1) == 0);
    assert(clamp(vector2, 0, 1) == 1);
    assert(clamp(vector3, 0, 1) == 0.5);
    const vector4: @Vector(2, f32) = .{ -1, 0.5 };
    const vector5: @Vector(2, f32) = .{ 0.25, 1.5 };
    const vector6: @Vector(2, f32) = .{ 0.5, 0.75 };
    assert(all(clamp(vector4, 0, 1) == @Vector(2, f32){ 0, 0.5 }));
    assert(all(clamp(vector5, 0, 1) == @Vector(2, f32){ 0.25, 1 }));
    assert(all(clamp(vector6, 0, 1) == @Vector(2, f32){ 0.5, 0.75 }));
    const min_val: @Vector(2, f32) = .{ 0, 0 };
    const max_val: @Vector(2, f32) = .{ 1, 0.5 };
    assert(all(clamp(vector4, min_val, max_val) == @Vector(2, f32){ 0, 0.5 }));
    assert(all(clamp(vector5, min_val, max_val) == @Vector(2, f32){ 0.25, 0.5 }));
    assert(all(clamp(vector6, min_val, max_val) == @Vector(2, f32){ 0.5, 0.5 }));
}

pub fn mix(v1: anytype, v2: anytype, p: anytype) @TypeOf(v1) {
    return switch (@typeInfo(@TypeOf(p))) {
        .Vector => v1 * (@as(@TypeOf(p), @splat(1)) - p) + v2 * p,
        else => switch (@typeInfo(@TypeOf(v1))) {
            .Vector => mix(v1, v2, @as(@TypeOf(v1), @splat(p))),
            else => v1 * (1 - p) + v2 * p,
        },
    };
}

test "mix" {
    const pair1: [2]f32 = .{ 0, 0.5 };
    assert(mix(pair1[0], pair1[1], 0.5) == 0.25);
    assert(mix(pair1[0], pair1[1], 0.25) == 0.125);
    const pair2: [2]@Vector(2, f32) = .{ .{ 0, 1 }, .{ 1, 0 } };
    assert(all(mix(pair2[0], pair2[1], 0.5) == @Vector(2, f32){ 0.5, 0.5 }));
    assert(all(mix(pair2[0], pair2[1], 0.25) == @Vector(2, f32){ 0.25, 0.75 }));
}

pub fn smoothStep(edge0: anytype, edge1: anytype, v: anytype) @TypeOf(v) {
    return switch (@typeInfo(@TypeOf(edge0))) {
        .Vector => calc: {
            const T = @TypeOf(v);
            const ET = @typeInfo(T).Vector.child;
            const zeros: T = @splat(0);
            const ones: T = @splat(1);
            const twos: T = @splat(2);
            const threes: T = @splat(3);
            const value = (v - edge0) / (edge1 - edge0);
            const interpolated = value * value * (threes - twos * value);
            const result1 = @select(ET, v <= edge0, zeros, interpolated);
            const result2 = @select(ET, v >= edge1, ones, result1);
            break :calc result2;
        },
        else => switch (@typeInfo(@TypeOf(v))) {
            .Vector => smoothStep(@as(@TypeOf(v), @splat(edge0)), @as(@TypeOf(v), @splat(edge1)), v),
            else => calc: {
                if (v <= edge0) {
                    break :calc 0;
                } else if (v >= edge1) {
                    break :calc 1;
                } else {
                    const value = (v - edge0) / (edge1 - edge0);
                    const interpolated = value * value * (3 - 2 * value);
                    break :calc interpolated;
                }
            },
        },
    };
}

test "smoothStep" {
    assert(smoothStep(0.4, 1.6, 1.5) == @as(f32, 0.9803240740740741));
    assert(smoothStep(0.4, 1.6, 0.45) == @as(f32, 0.005063657407407407));
    assert(smoothStep(0.4, 1.6, 1.61) == @as(f32, 1));
    assert(smoothStep(0.4, 1.6, 0.39) == @as(f32, 0));
    const vector: @Vector(4, f32) = .{ 1.5, 0.45, 1.61, 0.39 };
    const expected: @Vector(4, f32) = .{ 0.9803240895271301, 0.005063652992248535, 1, 0 };
    assert(all(smoothStep(0.4, 1.6, vector) == expected));
}

pub fn length(v: anytype) f32 {
    return switch (@typeInfo(@TypeOf(v))) {
        .Vector => @sqrt(@reduce(.Add, v * v)),
        else => if (@hasDecl(std.math, "fabs")) std.math.fabs(v) else std.math.sign(v) * v,
    };
}

test "length" {
    const vector1: @Vector(3, f32) = .{ 3, 3, 3 };
    const vector2: @Vector(2, f32) = .{ 1, 2 };
    const vector3: f32 = -4;
    assert(length(vector1) == @sqrt(27.0));
    assert(length(vector2) == @sqrt(5.0));
    assert(length(vector3) == 4);
}

pub fn distance(v1: anytype, v2: anytype) f32 {
    return switch (@typeInfo(@TypeOf(v1))) {
        .Vector => @sqrt(@reduce(.Add, (v1 - v2) * (v1 - v2))),
        else => if (@hasDecl(std.math, "fabs")) std.math.fabs(v1 - v2) else std.math.sign(v1 - v2) * (v1 - v2),
    };
}

test "distance" {
    const pair1: [2]f32 = .{ 1, 4 };
    const pair2: [2]@Vector(2, f32) = .{ .{ 1, 2 }, .{ 4, 5 } };
    const pair3: [2]@Vector(3, f32) = .{ .{ 1, 2, 3 }, .{ 4, 5, 6 } };
    assert(distance(pair1[0], pair1[1]) == 3);
    assert(distance(pair2[0], pair2[1]) == 4.242640495300293);
    assert(distance(pair3[0], pair3[1]) == 5.196152210235596);
}

pub fn dot(v1: anytype, v2: anytype) f32 {
    return switch (@typeInfo(@TypeOf(v1))) {
        .Vector => @reduce(.Add, v1 * v2),
        else => v1 * v2,
    };
}

test "dot" {
    const pair1: [2]f32 = .{ 1, 4 };
    const pair2: [2]@Vector(2, f32) = .{ .{ 1, 2 }, .{ 4, 5 } };
    const pair3: [2]@Vector(3, f32) = .{ .{ 1, 2, 3 }, .{ 4, 5, 6 } };
    assert(dot(pair1[0], pair1[1]) == 4);
    assert(dot(pair2[0], pair2[1]) == 14);
    assert(dot(pair3[0], pair3[1]) == 32);
}

pub fn cross(v1: anytype, v2: anytype) @TypeOf(v1) {
    const CT = @typeInfo(@TypeOf(v1)).Vector.child;
    const p1 = @shuffle(CT, v1, undefined, @Vector(3, i32){ 1, 2, 0 }) * @shuffle(CT, v2, undefined, @Vector(3, i32){ 2, 0, 1 });
    const p2 = @shuffle(CT, v1, undefined, @Vector(3, i32){ 2, 0, 1 }) * @shuffle(CT, v2, undefined, @Vector(3, i32){ 1, 2, 0 });
    return p1 - p2;
}

test "cross" {
    const pair: [2]@Vector(3, f32) = .{ .{ 1, 2, 3 }, .{ 4, 5, 6 } };
    assert(all(cross(pair[0], pair[1]) == @Vector(3, f32){ -3, 6, -3 }));
}

pub fn normalize(v: anytype) @TypeOf(v) {
    return switch (@typeInfo(@TypeOf(v))) {
        .Vector => v / @as(@TypeOf(v), @splat(@sqrt(@reduce(.Add, v * v)))),
        else => if (v > 0) 1 else -1,
    };
}

test "normalize" {
    const vector1: f32 = 4;
    const vector2: @Vector(2, f32) = .{ 1, 2 };
    const vector3: @Vector(3, f32) = .{ 1, 2, 3 };
    assert(normalize(vector1) == 1);
    assert(all(normalize(vector2) == @Vector(2, f32){ 0.4472135901451111, 0.8944271802902222 }));
    assert(all(normalize(vector3) == @Vector(3, f32){ 0.26726123690605164, 0.5345224738121033, 0.8017836809158325 }));
}

pub fn matrixCompMult(m1: anytype, m2: anytype) @TypeOf(m1) {
    var result: @TypeOf(m2) = undefined;
    inline for (m1, 0..) |column, c| {
        result[c] = column * m2[c];
    }
    return result;
}

test "matrixCompMult" {
    const matrix: [2]@Vector(2, f32) = .{
        .{ 1, 2 },
        .{ 3, 4 },
    };
    const result = matrixCompMult(matrix, matrix);
    assert(all(result[0] == @Vector(2, f32){ 1, 4 }));
    assert(all(result[1] == @Vector(2, f32){ 9, 16 }));
}

pub fn @"M * M"(m1: anytype, m2: anytype) @TypeOf(m1) {
    const ar = @typeInfo(@TypeOf(m2)).Array;
    var result: @TypeOf(m2) = undefined;
    comptime var r = 0;
    inline while (r < ar.len) : (r += 1) {
        var row: ar.child = undefined;
        inline for (m1, 0..) |column, c| {
            row[c] = column[r];
        }
        inline for (m2, 0..) |column, c| {
            result[c][r] = @reduce(.Add, row * column);
        }
    }
    return result;
}

pub fn @"V * M"(v1: anytype, m2: anytype) @TypeOf(v1) {
    var result: @TypeOf(v1) = undefined;
    inline for (m2, 0..) |column, c| {
        result[c] = @reduce(.Add, column * v1);
    }
    return result;
}

pub fn @"M * V"(m1: anytype, v2: anytype) @TypeOf(v2) {
    const ar = @typeInfo(@TypeOf(m1)).Array;
    var t1: @TypeOf(m1) = undefined;
    inline for (m1, 0..) |column, c| {
        comptime var r = 0;
        inline while (r < ar.len) : (r += 1) {
            t1[r][c] = column[r];
        }
    }
    var result: @TypeOf(v2) = undefined;
    inline for (t1, 0..) |column, c| {
        result[c] = @reduce(.Add, column * v2);
    }
    return result;
}

pub fn @"M * S"(m1: anytype, s2: anytype) @TypeOf(m1) {
    var result: @TypeOf(m1) = undefined;
    inline for (m1, 0..) |column, c| {
        result[c] = column * @as(@typeInfo(@TypeOf(m1)).Array.child, @splat(s2));
    }
    return result;
}

pub fn @"S * M"(s1: anytype, m2: anytype) @TypeOf(m2) {
    var result: @TypeOf(m2) = undefined;
    inline for (m2, 0..) |column, c| {
        result[c] = column * @as(@typeInfo(@TypeOf(m2)).Array.child, @splat(s1));
    }
    return result;
}

pub fn @"M + M"(m1: anytype, m2: anytype) @TypeOf(m1) {
    var result: @TypeOf(m2) = undefined;
    inline for (m1, 0..) |column, c| {
        result[c] = column + m2[c];
    }
    return result;
}

pub fn @"M + S"(m1: anytype, s2: anytype) @TypeOf(m1) {
    var result: @TypeOf(m1) = undefined;
    inline for (m1, 0..) |column, c| {
        result[c] = column + @as(@typeInfo(@TypeOf(m1)).Array.child, @splat(s2));
    }
    return result;
}

pub fn @"S + M"(s1: anytype, m2: anytype) @TypeOf(m2) {
    var result: @TypeOf(m2) = undefined;
    inline for (m2, 0..) |column, c| {
        result[c] = column + @as(@typeInfo(@TypeOf(m2)).Array.child, @splat(s1));
    }
    return result;
}

pub fn @"M - M"(m1: anytype, m2: anytype) @TypeOf(m1) {
    var result: @TypeOf(m2) = undefined;
    inline for (m1, 0..) |column, c| {
        result[c] = column - m2[c];
    }
    return result;
}

pub fn @"M - S"(m1: anytype, s2: anytype) @TypeOf(m1) {
    var result: @TypeOf(m1) = undefined;
    inline for (m1, 0..) |column, c| {
        result[c] = column - @as(@typeInfo(@TypeOf(m1)).Array.child, @splat(s2));
    }
    return result;
}

pub fn @"S - M"(s1: anytype, m2: anytype) @TypeOf(m2) {
    var result: @TypeOf(m2) = undefined;
    inline for (m2, 0..) |column, c| {
        result[c] = @as(@typeInfo(@TypeOf(m2)).Array.child, @splat(s1)) - column;
    }
    return result;
}

pub fn @"M / M"(m1: anytype, m2: anytype) @TypeOf(m1) {
    var result: @TypeOf(m2) = undefined;
    inline for (m1, 0..) |column, c| {
        result[c] = column / m2[c];
    }
    return result;
}

pub fn @"M / S"(m1: anytype, s2: anytype) @TypeOf(m1) {
    var result: @TypeOf(m1) = undefined;
    inline for (m1, 0..) |column, c| {
        result[c] = column / @as(@typeInfo(@TypeOf(m1)).Array.child, @splat(s2));
    }
    return result;
}

pub fn @"S / M"(s1: anytype, m2: anytype) @TypeOf(m2) {
    var result: @TypeOf(m2) = undefined;
    inline for (m2, 0..) |column, c| {
        result[c] = @as(@typeInfo(@TypeOf(m2)).Array.child, @splat(s1)) / column;
    }
    return result;
}

pub fn @"M == M"(m1: anytype, m2: anytype) bool {
    inline for (m1, 0..) |column, c| {
        if (!@reduce(.And, column == m2[c])) {
            return false;
        }
    }
    return true;
}

pub fn @"M != M"(m1: anytype, m2: anytype) bool {
    inline for (m1, 0..) |column, c| {
        if (!@reduce(.And, column == m2[c])) {
            return true;
        }
    }
    return false;
}

test "matrix functions" {
    const m1: [2]@Vector(2, f32) = .{
        .{ 1, 2 },
        .{ 3, 4 },
    };
    const m2: [2]@Vector(2, f32) = .{
        .{ 5, 6 },
        .{ 7, 8 },
    };
    const v1: @Vector(2, f32) = .{ 10, 20 };
    const result1 = @"M + M"(m1, m2);
    assert(all(result1[0] == @Vector(2, f32){ 6, 8 }));
    assert(all(result1[1] == @Vector(2, f32){ 10, 12 }));
    const result2 = @"M - M"(m1, m2);
    assert(all(result2[0] == @Vector(2, f32){ -4, -4 }));
    assert(all(result2[1] == @Vector(2, f32){ -4, -4 }));
    const result3 = @"M / M"(m1, m1);
    assert(all(result3[0] == @Vector(2, f32){ 1, 1 }));
    assert(all(result3[1] == @Vector(2, f32){ 1, 1 }));
    const result4 = @"M == M"(m1, m1);
    const result5 = @"M == M"(m1, m2);
    assert(result4 == true);
    assert(result5 == false);
    const result6 = @"M != M"(m1, m1);
    const result7 = @"M != M"(m1, m2);
    assert(result6 == false);
    assert(result7 == true);
    const result9 = @"M * V"(m1, v1);
    assert(all(result9 == @Vector(2, f32){ 70, 100 }));
    const result10 = @"V * M"(v1, m1);
    assert(all(result10 == @Vector(2, f32){ 50, 110 }));
    const result11 = @"M * M"(m1, m2);
    assert(all(result11[0] == @Vector(2, f32){ 23, 34 }));
    assert(all(result11[1] == @Vector(2, f32){ 31, 46 }));
    const result12 = @"M * M"(m2, m1);
    assert(all(result12[0] == @Vector(2, f32){ 19, 22 }));
    assert(all(result12[1] == @Vector(2, f32){ 43, 50 }));
    const result13 = @"M * S"(m1, 2);
    assert(all(result13[0] == @Vector(2, f32){ 2, 4 }));
    assert(all(result13[1] == @Vector(2, f32){ 6, 8 }));
    const result14 = @"M + S"(m1, 0.5);
    assert(all(result14[0] == @Vector(2, f32){ 1.5, 2.5 }));
    assert(all(result14[1] == @Vector(2, f32){ 3.5, 4.5 }));
    const result15 = @"M - S"(m1, 0.5);
    assert(all(result15[0] == @Vector(2, f32){ 0.5, 1.5 }));
    assert(all(result15[1] == @Vector(2, f32){ 2.5, 3.5 }));
    const result16 = @"S - M"(0, m1);
    assert(all(result16[0] == @Vector(2, f32){ -1, -2 }));
    assert(all(result16[1] == @Vector(2, f32){ -3, -4 }));
    const result17 = @"M / S"(m1, 0.5);
    assert(all(result17[0] == @Vector(2, f32){ 2, 4 }));
    assert(all(result17[1] == @Vector(2, f32){ 6, 8 }));
    const result18 = @"S / M"(60, m1);
    assert(all(result18[0] == @Vector(2, f32){ 60, 30 }));
    assert(all(result18[1] == @Vector(2, f32){ 20, 15 }));
}

pub fn floatVectorFromIntVector(v: anytype) @Vector(@typeInfo(@TypeOf(v)).Vector.len, f32) {
    const len = @typeInfo(@TypeOf(v)).Vector.len;
    var result: @Vector(len, f32) = undefined;
    comptime var i = 0;
    inline while (i < len) : (i += 1) {
        result[i] = @floatFromInt(v[i]);
    }
    return result;
}

pub fn intVectorFromFloatVector(v: anytype) @Vector(@typeInfo(@TypeOf(v)).Vector.len, i32) {
    const len = @typeInfo(@TypeOf(v)).Vector.len;
    var result: @Vector(len, f32) = undefined;
    comptime var i = 0;
    inline while (i < len) : (i += 1) {
        result[i] = @intFromFloat(v[i]);
    }
    return result;
}

pub fn intVectorFromBoolVector(v: anytype) @Vector(@typeInfo(@TypeOf(v)).Vector.len, i32) {
    const len = @typeInfo(@TypeOf(v)).Vector.len;
    var result: @Vector(len, f32) = undefined;
    comptime var i = 0;
    inline while (i < len) : (i += 1) {
        result[i] = @intFromBool(v[i]);
    }
    return result;
}
