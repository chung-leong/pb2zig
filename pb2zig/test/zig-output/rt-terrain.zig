// Pixel Bender kernel "TerrainRaytracer" (translated using pb2zig)
const std = @import("std");

pub const kernel = struct {
    // kernel information
    pub const namespace = "derschmale.com";
    pub const vendor = "Der Schmale";
    pub const version = 1;
    pub const description = "Performs raytracing on a height map.";
    pub const parameters = .{
        .width = .{
            .type = f32,
            .defaultValue = 800.0,
        },
        .height = .{
            .type = f32,
            .defaultValue = 600.0,
        },
        .fogDist = .{
            .type = f32,
            .minValue = 1.0,
            .maxValue = 5000.0,
            .defaultValue = 1100.0,
        },
        .minFogDist = .{
            .type = f32,
            .minValue = 1.0,
            .maxValue = 5000.0,
            .defaultValue = 400.0,
        },
        .elevation = .{
            .type = f32,
            .minValue = 1.0,
            .maxValue = 1000.0,
            .defaultValue = 130.0,
        },
        .mapScale = .{
            .type = @Vector(2, f32),
            .minValue = .{ 0.01, 0.01 },
            .maxValue = .{ 20.0, 20.0 },
            .defaultValue = .{ 1.0, 1.0 },
        },
        .camPosition = .{
            .type = @Vector(3, f32),
            .minValue = @as(@Vector(3, f32), @splat(-1000.0)),
            .maxValue = @as(@Vector(3, f32), @splat(1000.0)),
            .defaultValue = .{ 110.0, 100.0, -300.0 },
        },
        .rotationX = .{
            .type = f32,
            .minValue = 5.0,
            .maxValue = 5.0,
            .defaultValue = 0.0,
        },
        .rotationY = .{
            .type = f32,
            .minValue = 5.0,
            .maxValue = 5.0,
            .defaultValue = 0.0,
        },
        .light = .{
            .type = @Vector(3, f32),
            .minValue = @as(@Vector(3, f32), @splat(-1.0)),
            .maxValue = @as(@Vector(3, f32), @splat(1.0)),
            .defaultValue = .{ -1.0, -1.0, 1.0 },
        },
        .diffuseColor = .{
            .type = @Vector(4, f32),
            .minValue = @as(@Vector(4, f32), @splat(0.0)),
            .maxValue = @as(@Vector(4, f32), @splat(1.0)),
            .defaultValue = .{ 1.0, 0.8, 0.5, 1.0 },
        },
        .specularColor = .{
            .type = @Vector(4, f32),
            .minValue = @as(@Vector(4, f32), @splat(0.0)),
            .maxValue = @as(@Vector(4, f32), @splat(1.0)),
            .defaultValue = .{ 1.0, 1.0, 1.0, 0.0 },
        },
        .ambient = .{
            .type = @Vector(4, f32),
            .minValue = @as(@Vector(4, f32), @splat(0.0)),
            .maxValue = @as(@Vector(4, f32), @splat(1.0)),
            .defaultValue = .{ 0.05, 0.05, 0.1, 0.0 },
        },
    };
    pub const inputImages = .{
        .heightMap = .{ .channels = 4 },
        .normalMap = .{ .channels = 4 },
        .diffuseMap = .{ .channels = 4 },
        .sphereMap = .{ .channels = 4 },
    };
    pub const outputImages = .{
        .dst = .{ .channels = 4 },
    };

    // generic kernel instance type
    fn Instance(comptime InputStruct: type, comptime OutputStruct: type, comptime ParameterStruct: type) type {
        return struct {
            params: ParameterStruct,
            input: InputStruct,
            output: OutputStruct,
            outputCoord: @Vector(2, u32) = @splat(0),

            // output pixel
            dst: @Vector(4, f32) = undefined,

            // functions defined in kernel
            pub fn evaluatePixel(self: *@This()) void {
                const width = self.params.width;
                const height = self.params.height;
                const fogDist = self.params.fogDist;
                const minFogDist = self.params.minFogDist;
                const elevation = self.params.elevation;
                const mapScale = self.params.mapScale;
                const camPosition = self.params.camPosition;
                const rotationX = self.params.rotationX;
                const rotationY = self.params.rotationY;
                const light = self.params.light;
                const diffuseColor = self.params.diffuseColor;
                const specularColor = self.params.specularColor;
                const ambient = self.params.ambient;
                const heightMap = self.input.heightMap;
                const normalMap = self.input.normalMap;
                const diffuseMap = self.input.diffuseMap;
                const sphereMap = self.input.sphereMap;
                const dst = self.output.dst;
                self.dst = @splat(0.0);

                var pos: @Vector(3, f32) = undefined;
                var dir: @Vector(3, f32) = undefined;
                var coord: @Vector(2, f32) = self.outCoord();
                var cx: f32 = cos(-rotationX);
                var sx: f32 = sin(-rotationX);
                var cy: f32 = cos(-rotationY);
                var sy: f32 = sin(-rotationY);
                var h: f32 = undefined;
                var lh: f32 = undefined;
                var lp: @Vector(3, f32) = undefined;
                var transMatX: @Vector(3, f32) = .{ cy, 0.0, sy };
                var transMatY: @Vector(3, f32) = .{
                    sx * sy,
                    cx,
                    -sx * cy,
                };
                var transMatZ: @Vector(3, f32) = .{
                    -cx * sy,
                    sx,
                    cx * cy,
                };
                var dirT: @Vector(3, f32) = undefined;
                dirT[0] = coord[0] / width - 0.5;
                dirT[1] = -(coord[1] / height - 0.5) * 0.75;
                dirT[2] = 0.75;
                dir[0] = dot(transMatX, dirT);
                dir[1] = dot(transMatY, dirT);
                dir[2] = dot(transMatZ, dirT);
                var cur: f32 = heightMap.sampleLinear(mod(@shuffle(f32, camPosition, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation + 20.0;
                pos = dir + camPosition;
                if (cur > camPosition[1]) {
                    pos[1] += cur - camPosition[1];
                }
                var dist: f32 = undefined;
                var rayStep: f32 = 1.0;
                var t: f32 = 1.0;
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                dist = pos[1] - h;
                if (dist > 0.0) {
                    lp = pos;
                    pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                    lh = h;
                    t += rayStep;
                    rayStep += 0.02;
                }
                self.dst[3] = 1.0;
                var ld: f32 = lp[1] - lh;
                pos = lp + (lp - pos) * @as(@Vector(3, f32), @splat(ld)) / @as(@Vector(3, f32), @splat((dist - ld)));
                var tlight: @Vector(3, f32) = light / @as(@Vector(3, f32), @splat(length(light)));
                var coord2D: @Vector(2, f32) = mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0);
                var normal: @Vector(3, f32) = @shuffle(f32, normalMap.sampleLinear(coord2D), undefined, @Vector(3, i32){ 0, 2, 1 }) - @as(@Vector(3, f32), @splat(0.5));
                normal /= @as(@Vector(3, f32), @splat(length(normal)));
                var diffuse: @Vector(4, f32) = @as(@Vector(4, f32), @splat(max(-dot(normal, tlight), 0.0))) * diffuseColor;
                var halfVec: @Vector(3, f32) = (dir + tlight);
                halfVec /= @as(@Vector(3, f32), @splat(length(halfVec)));
                var specular: f32 = -dot(halfVec, normal);
                if (specular < 0.0) {
                    specular = 0.0;
                }
                specular = pow(specular, 5.0) * h / elevation;
                var tex: @Vector(4, f32) = diffuseMap.sampleLinear(coord2D);
                if (dist < 0.0) {
                    pos[1] += 1.0;
                    rayStep = 1.0;
                    dir = -tlight;
                    h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                    dist = pos[1] - h;
                    if (dist > 0.0) {
                        lp = pos;
                        pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                        lh = h;
                        t += rayStep;
                        rayStep += 0.02;
                    }
                    h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                    dist = pos[1] - h;
                    if (dist > 0.0) {
                        lp = pos;
                        pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                        lh = h;
                        t += rayStep;
                        rayStep += 0.02;
                    }
                    h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                    dist = pos[1] - h;
                    if (dist > 0.0) {
                        lp = pos;
                        pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                        lh = h;
                        t += rayStep;
                        rayStep += 0.02;
                    }
                    h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                    dist = pos[1] - h;
                    if (dist > 0.0) {
                        lp = pos;
                        pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                        lh = h;
                        t += rayStep;
                        rayStep += 0.02;
                    }
                    h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                    dist = pos[1] - h;
                    if (dist > 0.0) {
                        lp = pos;
                        pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                        lh = h;
                        t += rayStep;
                        rayStep += 0.02;
                    }
                    h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                    dist = pos[1] - h;
                    if (dist > 0.0) {
                        lp = pos;
                        pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                        lh = h;
                        t += rayStep;
                        rayStep += 0.02;
                    }
                    h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                    dist = pos[1] - h;
                    if (dist > 0.0) {
                        lp = pos;
                        pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                        lh = h;
                        t += rayStep;
                        rayStep += 0.02;
                    }
                    h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                    dist = pos[1] - h;
                    if (dist > 0.0) {
                        lp = pos;
                        pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                        lh = h;
                        t += rayStep;
                        rayStep += 0.02;
                    }
                    h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                    dist = pos[1] - h;
                    if (dist > 0.0) {
                        lp = pos;
                        pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                        lh = h;
                        t += rayStep;
                        rayStep += 0.02;
                    }
                    h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                    dist = pos[1] - h;
                    if (dist > 0.0) {
                        lp = pos;
                        pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                        lh = h;
                        t += rayStep;
                        rayStep += 0.02;
                    }
                    h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                    dist = pos[1] - h;
                    if (dist > 0.0) {
                        lp = pos;
                        pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                        lh = h;
                        t += rayStep;
                        rayStep += 0.02;
                    }
                    h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                    dist = pos[1] - h;
                    if (dist > 0.0) {
                        lp = pos;
                        pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                        lh = h;
                        t += rayStep;
                        rayStep += 0.02;
                    }
                    h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                    dist = pos[1] - h;
                    if (dist > 0.0) {
                        lp = pos;
                        pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                        lh = h;
                        t += rayStep;
                        rayStep += 0.02;
                    }
                    h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                    dist = pos[1] - h;
                    if (dist > 0.0) {
                        lp = pos;
                        pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                        lh = h;
                        t += rayStep;
                        rayStep += 0.02;
                    }
                    h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                    dist = pos[1] - h;
                    if (dist > 0.0) {
                        lp = pos;
                        pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                        lh = h;
                        t += rayStep;
                        rayStep += 0.02;
                    }
                    h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                    dist = pos[1] - h;
                    if (dist > 0.0) {
                        lp = pos;
                        pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                        lh = h;
                        t += rayStep;
                        rayStep += 0.02;
                    }
                    h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                    dist = pos[1] - h;
                    if (dist > 0.0) {
                        lp = pos;
                        pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                        lh = h;
                        t += rayStep;
                        rayStep += 0.02;
                    }
                    h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                    dist = pos[1] - h;
                    if (dist > 0.0) {
                        lp = pos;
                        pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                        lh = h;
                        t += rayStep;
                        rayStep += 0.02;
                    }
                    h = heightMap.sampleLinear(mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation;
                    dist = pos[1] - h;
                    if (dist > 0.0) {
                        lp = pos;
                        pos += @as(@Vector(3, f32), @splat(rayStep)) * dir;
                        lh = h;
                        t += rayStep;
                        rayStep += 0.02;
                    }
                    if (dist < 0.0) {
                        diffuse *= @as(@Vector(4, f32), @splat(0.25));
                    }
                    self.dst = (diffuse + ambient) * tex + @as(@Vector(4, f32), @splat(specular)) * specularColor;
                    var d: @Vector(3, f32) = camPosition - pos;
                    var atmos: f32 = smoothStep(minFogDist, fogDist, length(d));
                    self.dst = @shuffle(f32, self.dst, @shuffle(f32, self.dst, undefined, @Vector(3, i32){ 0, 1, 2 }) * @as(@Vector(3, f32), @splat((1.0 - atmos))) + @Vector(3, f32){ 0.59, 0.73, 0.886 } * @as(@Vector(3, f32), @splat(atmos)), @Vector(4, i32){ -1, -2, -3, 3 });
                } else {
                    var angle: f32 = atan2(dir[2], dir[0]);
                    var rad: f32 = abs(dir[1] - 1.0);
                    var coord2d: @Vector(2, f32) = .{
                        cos(angle) * rad,
                        sin(angle) * rad,
                    };
                    if (rad > 1.0) {
                        self.dst = @Vector(4, f32){
                            0.59,
                            0.73,
                            0.886,
                            1.0,
                        };
                    } else {
                        self.dst = sphereMap.sampleLinear((@as(@Vector(2, f32), @splat(1.0)) + coord2d) * @as(@Vector(2, f32), @splat(1024.0)));
                    }
                }
                self.dst[3] = 1.0;

                dst.setPixel(self.outputCoord[0], self.outputCoord[1], self.dst);
            }

            // built-in Pixel Bender functions
            fn outCoord(self: *@This()) @Vector(2, f32) {
                const x = self.outputCoord[0];
                const y = self.outputCoord[1];
                return .{ @floatFromInt(x), @floatFromInt(y) };
            }

            fn sin(v: anytype) @TypeOf(v) {
                return @sin(v);
            }

            fn cos(v: anytype) @TypeOf(v) {
                return @cos(v);
            }

            fn atan2(v1: anytype, v2: anytype) @TypeOf(v1) {
                return switch (@typeInfo(@TypeOf(v1))) {
                    .Vector => calc: {
                        var result: @TypeOf(v1) = undefined;
                        comptime var i = 0;
                        inline while (i < @typeInfo(@TypeOf(v1)).Vector.len) : (i += 1) {
                            result[i] = atan2(v1[i], v2[i]);
                        }
                        break :calc result;
                    },
                    else => std.math.atan2(@TypeOf(v1), v1, v2),
                };
            }

            fn pow(v1: anytype, v2: anytype) @TypeOf(v1) {
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

            fn abs(v: anytype) @TypeOf(v) {
                return @abs(v);
            }

            fn mod(v1: anytype, v2: anytype) @TypeOf(v1) {
                return switch (@typeInfo(@TypeOf(v2))) {
                    .Vector => @mod(v1, v2),
                    else => switch (@typeInfo(@TypeOf(v1))) {
                        .Vector => @mod(v1, @as(@TypeOf(v1), @splat(v2))),
                        else => @mod(v1, v2),
                    },
                };
            }

            fn max(v1: anytype, v2: anytype) @TypeOf(v1) {
                return switch (@typeInfo(@TypeOf(v2))) {
                    .Vector => @max(v1, v2),
                    else => switch (@typeInfo(@TypeOf(v1))) {
                        .Vector => @max(v1, @as(@TypeOf(v1), @splat(v2))),
                        else => @max(v1, v2),
                    },
                };
            }

            fn smoothStep(edge0: anytype, edge1: anytype, v: anytype) @TypeOf(v) {
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

            fn length(v: anytype) f32 {
                const sum = @reduce(.Add, v * v);
                return @sqrt(sum);
            }

            fn dot(v1: anytype, v2: anytype) f32 {
                return switch (@typeInfo(@TypeOf(v1))) {
                    .Vector => @reduce(.Add, v1 * v2),
                    else => v1 * v2,
                };
            }
        };
    }
    // kernel instance creation function


    pub fn create(input: anytype, output: anytype, params: anytype) Instance(@TypeOf(input), @TypeOf(output), @TypeOf(params)) {
        return .{
            .input = input,
            .output = output,
            .params = params,
        };
    }

};

pub const Input = KernelInput(u8, kernel);
pub const Output = KernelOutput(u8, kernel);
pub const Parameters = KernelParameters(kernel);

pub fn createOutput(allocator: std.mem.Allocator, width: u32, height: u32, input: Input, params: Parameters) !Output {
    return createPartialOutputOf(u8, allocator, width, height, 0, height, input, params);
}

pub fn createPartialOutput(allocator: std.mem.Allocator, width: u32, height: u32, start: u32, count: u32, input: Input, params: Parameters) !Output {
    return createPartialOutputOf(u8, allocator, width, height, start, count, input, params);
}

fn createPartialOutputOf(comptime T: type, allocator: std.mem.Allocator, width: u32, height: u32, start: u32, count: u32, input: KernelInput(T, kernel), params: Parameters) !KernelOutput(u8, kernel) {
    var output: KernelOutput(u8, kernel) = undefined;
    inline for (std.meta.fields(Output)) |field| {
        const ImageT = @TypeOf(@field(output, field.name));
        @field(output, field.name) = .{
            .data = try allocator.alloc(ImageT.Pixel, count * width),
            .width = width,
            .height = height,
            .offset = start * width,
        };
    }
    var instance = kernel.create(input, output, params);
    if (@hasDecl(@TypeOf(instance), "evaluateDependents")) {
        instance.evaluateDependents();
    }
    var y: u32 = 0;
    while (y < height) : (y += 1) {
        var x: u32 = 0;
        instance.outputCoord[1] = y;
        while (x < width) : (x += 1) {
            instance.outputCoord[0] = x;
            instance.evaluatePixel();
        }
    }
    return output;
}

const ColorSpace = enum { srgb, @"display-p3" };

pub fn Image(comptime T: type, comptime len: comptime_int, comptime writable: bool) type {
    return struct {
        pub const Pixel = @Vector(4, T);
        pub const FPixel = @Vector(len, f32);
        pub const channels = len;

        data: if (writable) []Pixel else []const Pixel,
        width: u32,
        height: u32,
        colorSpace: ColorSpace = .srgb,
        premultiplied: bool = false,
        offset: usize = 0,

        fn pbPixelFromFloatPixel(pixel: Pixel) FPixel {
            if (len == 4) {
                return pixel;
            }
            const mask: @Vector(len, i32) = switch (len) {
                1 => .{0},
                2 => .{ 0, 3 },
                3 => .{ 0, 1, 2 },
                else => @compileError("Unsupported number of channels: " ++ len),
            };
            return @shuffle(f32, pixel, undefined, mask);
        }

        fn floatPixelFromPBPixel(pixel: FPixel) Pixel {
            if (len == 4) {
                return pixel;
            }
            const alpha: @Vector(1, T) = if (len == 1 or len == 3) .{1} else undefined;
            const mask: @Vector(len, i32) = switch (len) {
                1 => .{ 0, 0, 0, -1 },
                2 => .{ 0, 0, 0, 1 },
                3 => .{ 0, 1, 2, -1 },
                else => @compileError("Unsupported number of channels: " ++ len),
            };
            return @shuffle(T, pixel, alpha, mask);
        }

        fn pbPixelFromIntPixel(pixel: Pixel) FPixel {
            const numerator: FPixel = switch (len) {
                1 => @as(pixel, @floatFromInt(@shuffle(FPixel, pixel, undefined, @Vector(1, i32){0}))),
                2 => @as(pixel, @floatFromInt(@shuffle(FPixel, pixel, undefined, @Vector(2, i32){ 0, 3 }))),
                3 => @as(pixel, @floatFromInt(@shuffle(FPixel, pixel, undefined, @Vector(3, i32){ 0, 1, 2 }))),
                4 => @floatFromInt(pixel),
                else => @compileError("Unsupported number of channels: " ++ len),
            };
            const denominator: FPixel = @splat(@floatFromInt(std.math.maxInt(T)));
            return numerator / denominator;
        }

        fn contrain(pixel: FPixel, max: f32) FPixel {
            const lower: FPixel = @splat(0);
            const upper: FPixel = @splat(max);
            const pixel2 = @select(f32, pixel > lower, pixel, lower);
            const pixel3 = @select(f32, pixel2 < upper, pixel2, upper);
            return pixel3;
        }

        fn intPixelFromPBPixel(pixel: FPixel) Pixel {
            const max: f32 = @floatFromInt(std.math.maxInt(T));
            const multiplier: FPixel = @splat(max);
            const product: FPixel = contrain(pixel * multiplier, max);
            const maxAlpha: @Vector(1, T) = .{std.math.maxInt(T)};
            const result: Pixel = switch (len) {
                1 => @intFromFloat(@shuffle(Pixel, product, maxAlpha, @Vector(4, i32){ 0, 0, 0, -1 })),
                2 => @intFromFloat(@shuffle(Pixel, product, undefined, @Vector(4, i32){ 0, 0, 0, 1 })),
                3 => @intFromFloat(@shuffle(Pixel, product, maxAlpha, @Vector(4, i32){ 0, 1, 2, -1 })),
                4 => @intFromFloat(product),
                else => @compileError("Unsupported number of channels: " ++ len),
            };
            return result;
        }

        inline fn unsign(value: i32) u32 {
            // allow negative values to be interpreted as large integers to simplify bound-checking
            @setRuntimeSafety(false);
            return @as(u32, @intCast(value));
        }

        fn getPixel(self: @This(), ix: i32, iy: i32) FPixel {
            const x = unsign(ix);
            const y = unsign(iy);
            if (x >= self.width or y >= self.height) {
                return @as(FPixel, @splat(0));
            }
            const index = (y * self.width) + x - self.offset;
            const src_pixel = self.data[index];
            const pixel: FPixel = switch (@typeInfo(T)) {
                .Float => pbPixelFromFloatPixel(src_pixel),
                .Int => pbPixelFromIntPixel(src_pixel),
                else => @compileError("Unsupported type: " ++ @typeName(T)),
            };
            return pixel;
        }

        fn setPixel(self: @This(), x: u32, y: u32, pixel: FPixel) void {
            if (comptime !writable) {
                return;
            }
            const index = (y * self.width) + x - self.offset;
            const dst_pixel: Pixel = switch (@typeInfo(T)) {
                .Float => floatPixelFromPBPixel(pixel),
                .Int => intPixelFromPBPixel(pixel),
                else => @compileError("Unsupported type: " ++ @typeName(T)),
            };
            self.data[index] = dst_pixel;
        }

        fn pixelSize(self: @This()) @Vector(2, f32) {
            _ = self;
            return .{ 1, 1 };
        }

        fn pixelAspectRatio(self: @This()) f32 {
            _ = self;
            return 1;
        }

        fn sampleNearest(self: @This(), coord: @Vector(2, f32)) FPixel {
            const x: i32 = @intFromFloat(coord[0]);
            const y: i32 = @intFromFloat(coord[1]);
            return self.getPixel(x, y);
        }

        fn sampleLinear(self: @This(), coord: @Vector(2, f32)) FPixel {
            const c = coord - @as(@Vector(2, f32), @splat(0.5));
            const x: i32 = @intFromFloat(c[0]);
            const y: i32 = @intFromFloat(c[1]);
            const f0 = c - @floor(c);
            if (@reduce(.Add, f0) == 0) {
                return self.getPixel(x, y);
            } else {
                const f1 = @as(@Vector(2, f32), @splat(1)) - f0;
                const w: @Vector(4, f32) = .{
                    f1[0] * f1[1],
                    f0[0] * f1[1],
                    f1[0] * f0[1],
                    f0[0] * f0[1],
                };
                const p00 = self.getPixel(x, y);
                const p01 = self.getPixel(x, y + 1);
                const p10 = self.getPixel(x + 1, y);
                const p11 = self.getPixel(x + 1, y + 1);
                var result: FPixel = undefined;
                comptime var i = 0;
                inline while (i < len) : (i += 1) {
                    const p: @Vector(4, f32) = .{ p00[i], p10[i], p01[i], p11[i] };
                    result[i] = @reduce(.Add, p * w);
                }
                return result;
            }
        }
    };
}

pub fn KernelInput(comptime T: type, comptime Kernel: type) type {
    const input_fields = std.meta.fields(@TypeOf(Kernel.inputImages));
    comptime var struct_fields: [input_fields.len]std.builtin.Type.StructField = undefined;
    inline for (input_fields, 0..) |field, index| {
        const input = @field(Kernel.inputImages, field.name);
        const ImageT = Image(T, input.channels, false);
        const default_value: ImageT = undefined;
        struct_fields[index] = .{
            .name = field.name,
            .type = ImageT,
            .default_value = @ptrCast(&default_value),
            .is_comptime = false,
            .alignment = @alignOf(ImageT),
        };
    }
    return @Type(.{
        .Struct = .{
            .layout = .Auto,
            .fields = &struct_fields,
            .decls = &.{},
            .is_tuple = false,
        },
    });
}

pub fn KernelOutput(comptime T: type, comptime Kernel: type) type {
    const output_fields = std.meta.fields(@TypeOf(Kernel.outputImages));
    comptime var struct_fields: [output_fields.len]std.builtin.Type.StructField = undefined;
    inline for (output_fields, 0..) |field, index| {
        const output = @field(Kernel.outputImages, field.name);
        const ImageT = Image(T, output.channels, true);
        const default_value: ImageT = undefined;
        struct_fields[index] = .{
            .name = field.name,
            .type = ImageT,
            .default_value = @ptrCast(&default_value),
            .is_comptime = false,
            .alignment = @alignOf(ImageT),
        };
    }
    return @Type(.{
        .Struct = .{
            .layout = .Auto,
            .fields = &struct_fields,
            .decls = &.{},
            .is_tuple = false,
        },
    });
}

pub fn KernelParameters(comptime Kernel: type) type {
    const param_fields = std.meta.fields(@TypeOf(Kernel.parameters));
    comptime var struct_fields: [param_fields.len]std.builtin.Type.StructField = undefined;
    inline for (param_fields, 0..) |field, index| {
        const param = @field(Kernel.parameters, field.name);
        const default_value: ?*const anyopaque = get_def: {
            const value: param.type = if (@hasField(@TypeOf(param), "defaultValue"))
            param.defaultValue
            else switch (@typeInfo(param.type)) {
                .Int, .Float => 0,
                .Bool => false,
                .Vector => @splat(0),
                else => @compileError("Unrecognized parameter type: " ++ @typeName(param.type)),
            };
            break :get_def @ptrCast(&value);
        };
        struct_fields[index] = .{
            .name = field.name,
            .type = param.type,
            .default_value = default_value,
            .is_comptime = false,
            .alignment = @alignOf(param.type),
        };
    }
    return @Type(.{
        .Struct = .{
            .layout = .Auto,
            .fields = &struct_fields,
            .decls = &.{},
            .is_tuple = false,
        },
    });
}
