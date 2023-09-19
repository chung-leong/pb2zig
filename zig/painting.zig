// Pixel Bender "Painting" (translated using pb2zig)
// namespace: ar.shader.painting
// vendor: Alan Ross
// version: 1
// description: Painting

const std = @import("std");

pub const kernel = struct {
    // kernel information
    pub const parameters = .{
        .n0 = .{
            .type = f32,
            .min_value = 0.0,
            .max_value = 1.0,
            .default_value = 0.0,
        },
        .n1 = .{
            .type = f32,
            .min_value = 0.0,
            .max_value = 1.5,
            .default_value = 0.6,
        },
        .n2 = .{
            .type = f32,
            .min_value = 0.5,
            .max_value = 0.5,
            .default_value = 0.11,
        },
    };
    pub const input = .{
        .src = .{ .channels = 4 },
    };
    pub const output = .{
        .dst = .{ .channels = 4 },
    };

    // generic kernel instance type
    fn Instance(comptime InputStruct: type) type {
        return struct {
            // parameter and input image fields
            n0: f32,
            n1: f32,
            n2: f32,
            src: std.meta.fieldInfo(InputStruct, .src).type,

            // built-in Pixel Bender functions
            fn any(v: anytype) bool {
                return @reduce(.Or, v);
            }

            fn all(v: anytype) bool {
                return @reduce(.And, v);
            }

            fn lessThan(v1: anytype, v2: anytype) @Vector(@typeInfo(@TypeOf(v1)).Vector.len, bool) {
                return v1 < v2;
            }

            // functions defined in kernel
            pub fn evaluatePixel(self: @This(), outCoord: @Vector(2, f32)) @Vector(4, f32) {
                // input variables
                const n0 = self.n0;
                const n1 = self.n1;
                const n2 = self.n2;
                const src = self.src;

                // output variable
                var dst: @Vector(4, f32) = undefined;

                var p: @Vector(2, f32) = outCoord;
                var offset: @Vector(2, f32) = undefined;
                var dist: f32 = undefined;
                var c: @Vector(4, f32) = undefined;
                var temp: @Vector(4, f32) = undefined;
                var p0: @Vector(4, f32) = undefined;
                var p1: @Vector(4, f32) = undefined;
                var p2: @Vector(4, f32) = undefined;
                var p3: @Vector(4, f32) = undefined;
                var p4: @Vector(4, f32) = undefined;
                var p5: @Vector(4, f32) = undefined;
                var p6: @Vector(4, f32) = undefined;
                var p7: @Vector(4, f32) = undefined;
                var p8: @Vector(4, f32) = undefined;
                c = @Vector(4, f32){ n0, n0, n0, 1 };
                //-- no loops.
                dist = n1 * 1;
                offset[0] = 0;
                offset[1] = 0;
                p0 = src.sampleNearest(p + offset);
                offset[0] = -dist;
                offset[1] = -dist;
                p1 = src.sampleNearest(p + offset);
                offset[0] = 0;
                offset[1] = -dist;
                p2 = src.sampleNearest(p + offset);
                offset[0] = dist;
                offset[1] = -dist;
                p3 = src.sampleNearest(p + offset);
                offset[0] = dist;
                offset[1] = 0;
                p4 = src.sampleNearest(p + offset);
                offset[0] = dist;
                offset[1] = dist;
                p5 = src.sampleNearest(p + offset);
                offset[0] = 0;
                offset[1] = dist;
                p6 = src.sampleNearest(p + offset);
                offset[0] = -dist;
                offset[1] = dist;
                p7 = src.sampleNearest(p + offset);
                offset[0] = -dist;
                offset[1] = 0;
                p8 = src.sampleNearest(p + offset);
                if (any(lessThan(c, p0))) {
                    c = p0;
                }
                if (any(lessThan(c, p1))) {
                    c = p1;
                }
                if (any(lessThan(c, p2))) {
                    c = p2;
                }
                if (any(lessThan(c, p3))) {
                    c = p3;
                }
                if (any(lessThan(c, p4))) {
                    c = p4;
                }
                if (any(lessThan(c, p5))) {
                    c = p5;
                }
                if (any(lessThan(c, p6))) {
                    c = p6;
                }
                if (any(lessThan(c, p7))) {
                    c = p7;
                }
                if (any(lessThan(c, p8))) {
                    c = p8;
                }
                temp = (p1 + p2 + p3 + p4 + p5 + p6 + p7 + p8) / @as(@Vector(4, f32), @splat(7));
                dist = n1 * 2;
                offset[0] = 0;
                offset[1] = 0;
                p0 = src.sampleNearest(p + offset);
                offset[0] = -dist;
                offset[1] = -dist;
                p1 = src.sampleNearest(p + offset);
                offset[0] = 0;
                offset[1] = -dist;
                p2 = src.sampleNearest(p + offset);
                offset[0] = dist;
                offset[1] = -dist;
                p3 = src.sampleNearest(p + offset);
                offset[0] = dist;
                offset[1] = 0;
                p4 = src.sampleNearest(p + offset);
                offset[0] = dist;
                offset[1] = dist;
                p5 = src.sampleNearest(p + offset);
                offset[0] = 0;
                offset[1] = dist;
                p6 = src.sampleNearest(p + offset);
                offset[0] = -dist;
                offset[1] = dist;
                p7 = src.sampleNearest(p + offset);
                offset[0] = -dist;
                offset[1] = 0;
                p8 = src.sampleNearest(p + offset);
                if (all(lessThan(c, temp))) {
                    c = @shuffle(f32, c, c + @as(@Vector(4, f32), @splat(n2)), @Vector(4, i32){ -1, -2, -3, 3 });
                } else {
                    c = @shuffle(f32, c, c - @as(@Vector(4, f32), @splat(n2)), @Vector(4, i32){ -1, -2, -3, 3 });
                }
                if (any(lessThan(c, p0))) {
                    c = p0;
                }
                if (any(lessThan(c, p1))) {
                    c = p1;
                }
                if (any(lessThan(c, p2))) {
                    c = p2;
                }
                if (any(lessThan(c, p3))) {
                    c = p3;
                }
                if (any(lessThan(c, p4))) {
                    c = p4;
                }
                if (any(lessThan(c, p5))) {
                    c = p5;
                }
                if (any(lessThan(c, p6))) {
                    c = p6;
                }
                if (any(lessThan(c, p7))) {
                    c = p7;
                }
                if (any(lessThan(c, p8))) {
                    c = p8;
                }
                dist = n1 * 3;
                offset[0] = 0;
                offset[1] = 0;
                p0 = src.sampleNearest(p + offset);
                offset[0] = -dist;
                offset[1] = -dist;
                p1 = src.sampleNearest(p + offset);
                offset[0] = 0;
                offset[1] = -dist;
                p2 = src.sampleNearest(p + offset);
                offset[0] = dist;
                offset[1] = -dist;
                p3 = src.sampleNearest(p + offset);
                offset[0] = dist;
                offset[1] = 0;
                p4 = src.sampleNearest(p + offset);
                offset[0] = dist;
                offset[1] = dist;
                p5 = src.sampleNearest(p + offset);
                offset[0] = 0;
                offset[1] = dist;
                p6 = src.sampleNearest(p + offset);
                offset[0] = -dist;
                offset[1] = dist;
                p7 = src.sampleNearest(p + offset);
                offset[0] = -dist;
                offset[1] = 0;
                p8 = src.sampleNearest(p + offset);
                if (any(lessThan(c, p0))) {
                    c = p0;
                }
                if (any(lessThan(c, p1))) {
                    c = p1;
                }
                if (any(lessThan(c, p2))) {
                    c = p2;
                }
                if (any(lessThan(c, p3))) {
                    c = p3;
                }
                if (any(lessThan(c, p4))) {
                    c = p4;
                }
                if (any(lessThan(c, p5))) {
                    c = p5;
                }
                if (any(lessThan(c, p6))) {
                    c = p6;
                }
                if (any(lessThan(c, p7))) {
                    c = p7;
                }
                if (any(lessThan(c, p8))) {
                    c = p8;
                }
                dst = c;
                return dst;
            }
        };
    }

    // kernel instance creation function
    pub fn create(inputStruct: anytype) Instance(@TypeOf(inputStruct)) {
        var instance: Instance(@TypeOf(inputStruct)) = undefined;
        inline for (std.meta.fields(@TypeOf(inputStruct))) |field| {
            @field(instance, field.name) = @field(inputStruct, field.name);
        }
        return instance;
    }
};
