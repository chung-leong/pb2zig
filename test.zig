pub fn Kernel(comptime Image: type, comptime sampler: anytype) type {
    return struct {
        // parameter fields
        n0: f32 = parameters.n0.defaultValue,
        n1: f32 = parameters.n1.defaultValue,
        n2: f32 = parameters.n2.defaultValue,

        // input image(s)
        src: Image,

        // parameter info
        const parameters = .{
            .n0 = .{
                .minValue = 0.0,
                .maxValue = 1.0,
                .defaultValue = 0.0,
            },
            .n1 = .{
                .minValue = 0.0,
                .maxValue = 1.5,
                .defaultValue = 0.6,
            },
            .n2 = .{
                .minValue = -0.5,
                .maxValue = 0.5,
                .defaultValue = 0.11,
            },
        };

        // pixel type info
        const SrcType = @Vector(4, f32);
        const DstType = @Vector(4, f32);

        fn sampleNearest(src: Image, coord: @Vector(2, f32)) SrcType {
            return sampler(src, coord);
        }

        fn anyLessThan(vector: anytype, value: anytype) bool {
            _ = value;
            _ = vector;
        }

        fn allLessThan(vector: anytype, value: anytype) bool {
            _ = value;
            _ = vector;
        }

        fn evaluatePixel(self: @This(), outCoord: @Vector(2, f32)) DstType {
            var dst: DstType = undefined;
            var n0 = self.n0;
            var n1 = self.n1;
            var n2 = self.n2;

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

            c = @Vector(4, f32){ n0, n0, n0, 1.0 };

            //-- no loops.

            dist = n1 * 1.0;
            offset[0] = 0.0;
            offset[1] = 0.0;
            p0 = sampleNearest(self.src, p + offset);
            offset[0] = -dist;
            offset[1] = -dist;
            p1 = sampleNearest(self.src, p + offset);
            offset[0] = 0.0;
            offset[1] = -dist;
            p2 = sampleNearest(self.src, p + offset);
            offset[0] = dist;
            offset[1] = -dist;
            p3 = sampleNearest(self.src, p + offset);
            offset[0] = dist;
            offset[1] = 0.0;
            p4 = sampleNearest(self.src, p + offset);
            offset[0] = dist;
            offset[1] = dist;
            p5 = sampleNearest(self.src, p + offset);
            offset[0] = 0.0;
            offset[1] = dist;
            p6 = sampleNearest(self.src, p + offset);
            offset[0] = -dist;
            offset[1] = dist;
            p7 = sampleNearest(self.src, p + offset);
            offset[0] = -dist;
            offset[1] = 0.0;
            p8 = sampleNearest(self.src, p + offset);

            if (anyLessThan(c, p0)) {
                c = p0;
            }
            if (anyLessThan(c, p1)) {
                c = p1;
            }
            if (anyLessThan(c, p2)) {
                c = p2;
            }
            if (anyLessThan(c, p3)) {
                c = p3;
            }
            if (anyLessThan(c, p4)) {
                c = p4;
            }
            if (anyLessThan(c, p5)) {
                c = p5;
            }
            if (anyLessThan(c, p6)) {
                c = p6;
            }
            if (anyLessThan(c, p7)) {
                c = p7;
            }
            if (anyLessThan(c, p8)) {
                c = p8;
            }

            temp = (p1 + p2 + p3 + p4 + p5 + p6 + p7 + p8) / 7.0;

            dist = n1 * 2.0;
            offset[0] = 0.0;
            offset[1] = 0.0;
            p0 = sampleNearest(self.src, p + offset);
            offset[0] = -dist;
            offset[1] = -dist;
            p1 = sampleNearest(self.src, p + offset);
            offset[0] = 0.0;
            offset[1] = -dist;
            p2 = sampleNearest(self.src, p + offset);
            offset[0] = dist;
            offset[1] = -dist;
            p3 = sampleNearest(self.src, p + offset);
            offset[0] = dist;
            offset[1] = 0.0;
            p4 = sampleNearest(self.src, p + offset);
            offset[0] = dist;
            offset[1] = dist;
            p5 = sampleNearest(self.src, p + offset);
            offset[0] = 0.0;
            offset[1] = dist;
            p6 = sampleNearest(self.src, p + offset);
            offset[0] = -dist;
            offset[1] = dist;
            p7 = sampleNearest(self.src, p + offset);
            offset[0] = -dist;
            offset[1] = 0.0;
            p8 = sampleNearest(self.src, p + offset);

            if (allLessThan(c, temp)) {
                c.rgb += n2;
            } else {
                c.rgb -= n2;
            }

            if (anyLessThan(c, p0)) {
                c = p0;
            }
            if (anyLessThan(c, p1)) {
                c = p1;
            }
            if (anyLessThan(c, p2)) {
                c = p2;
            }
            if (anyLessThan(c, p3)) {
                c = p3;
            }
            if (anyLessThan(c, p4)) {
                c = p4;
            }
            if (anyLessThan(c, p5)) {
                c = p5;
            }
            if (anyLessThan(c, p6)) {
                c = p6;
            }
            if (anyLessThan(c, p7)) {
                c = p7;
            }
            if (anyLessThan(c, p8)) {
                c = p8;
            }

            dist = n1 * 3.0;
            offset[0] = 0.0;
            offset[1] = 0.0;
            p0 = sampleNearest(self.src, p + offset);
            offset[0] = -dist;
            offset[1] = -dist;
            p1 = sampleNearest(self.src, p + offset);
            offset[0] = 0.0;
            offset[1] = -dist;
            p2 = sampleNearest(self.src, p + offset);
            offset[0] = dist;
            offset[1] = -dist;
            p3 = sampleNearest(self.src, p + offset);
            offset[0] = dist;
            offset[1] = 0.0;
            p4 = sampleNearest(self.src, p + offset);
            offset[0] = dist;
            offset[1] = dist;
            p5 = sampleNearest(self.src, p + offset);
            offset[0] = 0.0;
            offset[1] = dist;
            p6 = sampleNearest(self.src, p + offset);
            offset[0] = -dist;
            offset[1] = dist;
            p7 = sampleNearest(self.src, p + offset);
            offset[0] = -dist;
            offset[1] = 0.0;
            p8 = sampleNearest(self.src, p + offset);

            if (anyLessThan(c, p0)) {
                c = p0;
            }
            if (anyLessThan(c, p1)) {
                c = p1;
            }
            if (anyLessThan(c, p2)) {
                c = p2;
            }
            if (anyLessThan(c, p3)) {
                c = p3;
            }
            if (anyLessThan(c, p4)) {
                c = p4;
            }
            if (anyLessThan(c, p5)) {
                c = p5;
            }
            if (anyLessThan(c, p6)) {
                c = p6;
            }
            if (anyLessThan(c, p7)) {
                c = p7;
            }
            if (anyLessThan(c, p8)) {
                c = p8;
            }

            dst = c;
            return dst;
        }
    };
}

test "hello" {
    const sampler = struct {
        fn sampleNearest(image: void, x: f32, y: f32, T: type) T {
            _ = y;
            _ = x;
            _ = image;
            return T{ 1.0, 1.0, 1.0, 1.0 };
        }
    };
    const image: u32 = 1;
    const instance = comptime Kernel(u32, sampler){ .src = image, .n1 = 1 };
    const coord = @Vector(2, f32){ 0, 0 };
    _ = instance.evaluatePixel(coord);
}
