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

fn BoolOf(comptime T: type) type {
    const len = @typeInfo(T).Vector.len;
    return @Vector(len, bool);
}

pub fn equal(v1: anytype, v2: anytype) BoolOf(@TypeOf(v1)) {
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

pub fn notEqual(v1: anytype, v2: anytype) BoolOf(@TypeOf(v1)) {
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

pub fn lessThan(v1: anytype, v2: anytype) BoolOf(@TypeOf(v1)) {
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

pub fn lessThanEqual(v1: anytype, v2: anytype) BoolOf(@TypeOf(v1)) {
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

pub fn greaterThan(v1: anytype, v2: anytype) BoolOf(@TypeOf(v1)) {
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

pub fn greatThanEqual(v1: anytype, v2: anytype) BoolOf(@TypeOf(v1)) {
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

pub fn radians(v: anytype) @TypeOf(v) {
    const multiplier = std.math.pi / 180.0;
    return switch (@typeInfo(@TypeOf(v))) {
        .Float => v * multiplier,
        .Vector => v * @as(@TypeOf(v), @splat(multiplier)),
        else => unreachable,
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
        .Float => v * multiplier,
        .Vector => v * @as(@TypeOf(v), @splat(multiplier)),
        else => unreachable,
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
        .Float => std.math.asin(v),
        .Vector => calc: {
            var result: @TypeOf(v) = undefined;
            comptime var i = 0;
            inline while (i < @typeInfo(@TypeOf(v)).Vector.len) : (i += 1) {
                result[i] = asin(v[i]);
            }
            break :calc result;
        },
        else => unreachable,
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
        .Float => std.math.acos(v),
        .Vector => calc: {
            var result: @TypeOf(v) = undefined;
            comptime var i = 0;
            inline while (i < @typeInfo(@TypeOf(v)).Vector.len) : (i += 1) {
                result[i] = acos(v[i]);
            }
            break :calc result;
        },
        else => unreachable,
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
        .Float => std.math.atan(v),
        .Vector => calc: {
            var result: @TypeOf(v) = undefined;
            comptime var i = 0;
            inline while (i < @typeInfo(@TypeOf(v)).Vector.len) : (i += 1) {
                result[i] = atan(v[i]);
            }
            break :calc result;
        },
        else => unreachable,
    };
}

test "atan" {
    const vector1: f32 = 0;
    const vector2: @Vector(2, f32) = .{ 0, 0 };
    assert(atan(vector1) == 0);
    assert(all(atan(vector2) == @Vector(2, f32){ 0, 0 }));
}

pub fn pow(v1: anytype, v2: anytype) @TypeOf(v1) {
    return switch (@typeInfo(@TypeOf(v1))) {
        .Float => std.math.pow(@TypeOf(v1), v1, v2),
        .Vector => calc: {
            var result: @TypeOf(v1) = undefined;
            comptime var i = 0;
            inline while (i < @typeInfo(@TypeOf(v1)).Vector.len) : (i += 1) {
                result[i] = pow(v1[i], v2[i]);
            }
            break :calc result;
        },
        else => unreachable,
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
        .Float => 1 / @sqrt(v),
        .Vector => @as(@TypeOf(v), @splat(1)) / @sqrt(v),
        else => unreachable,
    };
}

test "inverseSqrt" {
    const vector1: f32 = 4;
    const vector2: @Vector(2, f32) = .{ 4, 4 };
    assert(inverseSqrt(vector1) == 0.5);
    assert(all(inverseSqrt(vector2) == @Vector(2, f32){ 0.5, 0.5 }));
}

pub fn abs(v: anytype) @TypeOf(v) {
    return @fabs(v);
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

pub fn length(v: anytype) f32 {
    return @typeInfo(@TypeOf(v)).Vector.len;
}

test "length" {
    const vector1: @Vector(3, f32) = .{ 6, 6, 7 };
    const vector2: @Vector(2, f32) = .{ 1, 2 };
    assert(length(vector1) == 3);
    assert(length(vector2) == 2);
}

pub fn distance(v1: anytype, v2: anytype) f32 {
    return switch (@typeInfo(@TypeOf(v1))) {
        .Float => std.math.fabs(v1 - v2),
        .Vector => @sqrt(@reduce(.Add, (v1 - v2) * (v1 - v2))),
        else => unreachable,
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
        .Float => v1 * v2,
        .Vector => @reduce(.Add, v1 * v2),
        else => unreachable,
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
    return v1 * v2;
}

test "cross" {
    const pair1: [2]f32 = .{ 1, 4 };
    const pair2: [2]@Vector(2, f32) = .{ .{ 1, 2 }, .{ 4, 5 } };
    const pair3: [2]@Vector(3, f32) = .{ .{ 1, 2, 3 }, .{ 4, 5, 6 } };
    assert(cross(pair1[0], pair1[1]) == 4);
    assert(all(cross(pair2[0], pair2[1]) == @Vector(2, f32){ 4, 10 }));
    assert(all(cross(pair3[0], pair3[1]) == @Vector(3, f32){ 4, 10, 18 }));
}

pub fn normalize(v: anytype) @TypeOf(v) {
    return switch (@typeInfo(@TypeOf(v))) {
        .Float => if (v > 0) 1 else -1,
        .Vector => v / @as(@TypeOf(v), @splat(@sqrt(@reduce(.Add, v * v)))),
        else => unreachable,
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
