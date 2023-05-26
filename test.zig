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

        fn evaluatePixel(self: @This(), outCoord: @Vector(2, f32)) DstType {
            var dst: DstType = undefined;
            var n0 = self.n0;
            var n1 = self.n1;
            _ = n1;
            var n2 = self.n2;
            _ = n2;

            var p: @Vector(2, f32) = outCoord;
            _ = p;
            var offset: f32 = undefined;
            _ = offset;
            var dist: f32 = undefined;
            var c: @Vector(4, f32) = undefined;
            var temp: @Vector(4, f32) = undefined;
            _ = temp;
            var p0: @Vector(4, f32) = undefined;
            _ = p0;
            var p1: @Vector(4, f32) = undefined;
            _ = p1;
            var p2: @Vector(4, f32) = undefined;
            _ = p2;
            var p3: @Vector(4, f32) = undefined;
            _ = p3;
            var p4: @Vector(4, f32) = undefined;
            _ = p4;
            var p5: @Vector(4, f32) = undefined;
            _ = p5;
            var p6: @Vector(4, f32) = undefined;
            _ = p6;
            var p7: @Vector(4, f32) = undefined;
            _ = p7;
            var p8: @Vector(4, f32) = undefined;
            _ = p8;

            c = @Vector(4, f32){ n0, n0, n0, 1.0 };

            sampler.sampleNearest(self.src, x, y, T);

            //-- no loops.

            dist = self.n1 * 1.0;

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
