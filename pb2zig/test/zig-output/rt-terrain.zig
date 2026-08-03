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
            .minValue = .{
                -1000.0,
                -1000.0,
                -1000.0,
            },
            .maxValue = .{
                1000.0,
                1000.0,
                1000.0,
            },
            .defaultValue = .{ 110.0, 100.0, -300.0 },
        },
        .rotationX = .{
            .type = f32,
            .minValue = -5.0,
            .maxValue = 5.0,
            .defaultValue = 0.0,
        },
        .rotationY = .{
            .type = f32,
            .minValue = -5.0,
            .maxValue = 5.0,
            .defaultValue = 0.0,
        },
        .light = .{
            .type = @Vector(3, f32),
            .minValue = .{ -1.0, -1.0, -1.0 },
            .maxValue = .{ 1.0, 1.0, 1.0 },
            .defaultValue = .{ -1.0, -1.0, 1.0 },
        },
        .diffuseColor = .{
            .type = @Vector(4, f32),
            .minValue = .{ 0.0, 0.0, 0.0, 0.0 },
            .maxValue = .{ 1.0, 1.0, 1.0, 1.0 },
            .defaultValue = .{ 1.0, 0.8, 0.5, 1.0 },
        },
        .specularColor = .{
            .type = @Vector(4, f32),
            .minValue = .{ 0.0, 0.0, 0.0, 0.0 },
            .maxValue = .{ 1.0, 1.0, 1.0, 1.0 },
            .defaultValue = .{ 1.0, 1.0, 1.0, 0.0 },
        },
        .ambient = .{
            .type = @Vector(4, f32),
            .minValue = .{ 0.0, 0.0, 0.0, 0.0 },
            .maxValue = .{ 1.0, 1.0, 1.0, 1.0 },
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
            outputCoord: @Vector(2, f32) = @splat(0.0),

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
                const coord: @Vector(2, f32) = self.outCoord();
                const cx: f32 = cos(-rotationX);
                const sx: f32 = sin(-rotationX);
                const cy: f32 = cos(-rotationY);
                const sy: f32 = sin(-rotationY);
                var h: f32 = undefined;
                var lh: f32 = undefined;
                var lp: @Vector(3, f32) = undefined;
                const transMatX: @Vector(3, f32) = .{ cy, 0.0, sy };
                const transMatY: @Vector(3, f32) = .{
                    sx * sy,
                    cx,
                    -sx * cy,
                };
                const transMatZ: @Vector(3, f32) = .{
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
                const cur: f32 = heightMap.sampleLinear(mod(@shuffle(f32, camPosition, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0))[1] * elevation + 20.0;
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
                const ld: f32 = lp[1] - lh;
                pos = lp + (lp - pos) * @as(@Vector(3, f32), @splat(ld)) / @as(@Vector(3, f32), @splat((dist - ld)));
                const tlight: @Vector(3, f32) = light / @as(@Vector(3, f32), @splat(length(light)));
                const coord2D: @Vector(2, f32) = mod(@shuffle(f32, pos, undefined, @Vector(2, i32){ 0, 2 }) / mapScale, 2048.0);
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
                const tex: @Vector(4, f32) = diffuseMap.sampleLinear(coord2D);
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
                    const d: @Vector(3, f32) = camPosition - pos;
                    const atmos: f32 = smoothStep(minFogDist, fogDist, length(d));
                    self.dst = @shuffle(f32, self.dst, @shuffle(f32, self.dst, undefined, @Vector(3, i32){ 0, 1, 2 }) * @as(@Vector(3, f32), @splat((1.0 - atmos))) + @Vector(3, f32){ 0.59, 0.73, 0.886 } * @as(@Vector(3, f32), @splat(atmos)), @Vector(4, i32){ -1, -2, -3, 3 });
                } else {
                    const angle: f32 = atan2(dir[2], dir[0]);
                    const rad: f32 = abs(dir[1] - 1.0);
                    const coord2d: @Vector(2, f32) = .{
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

                dst.writePixel(self.outputCoord, self.dst);
            }

            pub fn outCoord(self: *@This()) @Vector(2, f32) {
                return self.outputCoord;
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

    // built-in Pixel Bender functions
    fn sin(v: anytype) @TypeOf(v) {
        return @sin(v);
    }

    fn cos(v: anytype) @TypeOf(v) {
        return @cos(v);
    }

    fn atan2(v1: anytype, v2: anytype) @TypeOf(v1) {
        return switch (@typeInfo(@TypeOf(v1))) {
            .vector => calc: {
                var result: @TypeOf(v1) = undefined;
                inline for (0..@typeInfo(@TypeOf(v1)).vector.len) |i| {
                    result[i] = atan2(v1[i], v2[i]);
                }
                break :calc result;
            },
            else => switch (@typeInfo(@TypeOf(std.math.atan2)).@"fn".params.len) {
                2 => std.math.atan2(v1, v2),
                else => std.math.atan2(@TypeOf(v1), v1, v2),
            },
        };
    }

    fn pow(v1: anytype, v2: anytype) @TypeOf(v1) {
        return switch (@typeInfo(@TypeOf(v1))) {
            .vector => calc: {
                var result: @TypeOf(v1) = undefined;
                inline for (0..@typeInfo(@TypeOf(v1)).vector.len) |i| {
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
            .vector => @mod(v1, v2),
            else => switch (@typeInfo(@TypeOf(v1))) {
                .vector => @mod(v1, @as(@TypeOf(v1), @splat(v2))),
                else => @mod(v1, v2),
            },
        };
    }

    fn max(v1: anytype, v2: anytype) @TypeOf(v1) {
        return switch (@typeInfo(@TypeOf(v2))) {
            .vector => @max(v1, v2),
            else => switch (@typeInfo(@TypeOf(v1))) {
                .vector => @max(v1, @as(@TypeOf(v1), @splat(v2))),
                else => @max(v1, v2),
            },
        };
    }

    fn smoothStep(edge0: anytype, edge1: anytype, v: anytype) @TypeOf(v) {
        return switch (@typeInfo(@TypeOf(edge0))) {
            .vector => calc: {
                const T = @TypeOf(v);
                const ET = @typeInfo(T).vector.child;
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
                .vector => smoothStep(@as(@TypeOf(v), @splat(edge0)), @as(@TypeOf(v), @splat(edge1)), v),
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
        return switch (@typeInfo(@TypeOf(v))) {
            .vector => @sqrt(@reduce(.Add, v * v)),
            else => @abs(v),
        };
    }

    fn dot(v1: anytype, v2: anytype) f32 {
        return switch (@typeInfo(@TypeOf(v1))) {
            .vector => @reduce(.Add, v1 * v2),
            else => v1 * v2,
        };
    }
};

// keep auto-formatter from moving statement
const zigar = if (true) @import("zigar") else unreachable;

pub const Input = KernelInput(kernel);
pub const Output = KernelOutput(kernel);
pub const Parameters = KernelParameters(kernel);

pub fn process(input: Input, output: Output, params: Parameters) !void {
    // use inline loop to generate code for each image implementation (WebImage or GD)
    inline for (zigar.image.formats) |tag| {
        const input_field_names = comptime std.meta.fieldNames(Input);
        const output_field_names = comptime std.meta.fieldNames(Output);
        const output_image_0 = @field(output, output_field_names[0]);
        if (output_image_0 == tag) {
            // copy fields from zigar.image.Any to implementation-specific structs
            var input_impl: KernelInputImpl(tag.Type(.ro), kernel) = undefined;
            inline for (input_field_names) |name| {
                const input_image = @field(input, name);
                if (input_image != tag) unreachable;
                @field(input_impl, name).impl = input_image.getField(tag);
            }
            var output_impl: KernelOutputImpl(tag.Type(.rw), kernel) = undefined;
            inline for (output_field_names) |name| {
                const output_image = @field(output, name);
                if (output_image != tag) unreachable;
                @field(output_impl, name).impl = output_image.getField(tag);
            }
            // get the output dimensions (multiple outputs are possible but unlikely)
            var output_width: usize = 0;
            var output_height: usize = 0;
            inline for (output_field_names) |name| {
                const output_image = @field(output, name);
                var out = output_image.getField(tag);
                const w = out.getWidth();
                const h = out.getHeight();
                if (w > output_width) output_width = w;
                if (h > output_height) output_height = h;
            }
            // create the implementation-specific kernel instance
            var instance = kernel.create(input_impl, output_impl, params);
            // calculate variables that are dependent on kernel parameters
            if (@hasDecl(@TypeOf(instance), "evaluateDependents")) {
                instance.evaluateDependents();
            }
            // loop through all coordinates, starting from (0.5, 0.5)
            const width: f32 = @floatFromInt(output_width);
            const height: f32 = @floatFromInt(output_height);
            while (instance.outputCoord[1] < height) : (instance.outputCoord[1] += 1) {
                instance.outputCoord[0] = 0.5;
                while (instance.outputCoord[0] < width) : (instance.outputCoord[0] += 1) {
                    instance.evaluatePixel();
                }
            }
        }
    }
}

pub fn KernelImage(comptime Impl: type, comptime channels: comptime_int, comptime writable: bool) type {
    const Pixel = @Vector(channels, f32);
    const Coord = @Vector(2, f32);
    return struct {
        impl: Impl,

        fn writePixel(self: @This(), coord: Coord, pixel: Pixel) void {
            if (comptime !writable) unreachable;
            const pos: @Vector(2, usize) = @intFromFloat(coord);
            self.impl.setPixel(Pixel, pos[0], pos[1], pixel);
        }

        fn pixelSize(self: @This()) Coord {
            _ = self;
            return .{ 1, 1 };
        }

        fn pixelAspectRatio(self: @This()) f32 {
            _ = self;
            return 1;
        }

        fn sampleNearest(self: @This(), coord: Coord) Pixel {
            return self.impl.sampleNearest(Pixel, coord);
        }

        fn sampleLinear(self: @This(), coord: Coord) Pixel {
            return self.impl.sampleLinear(Pixel, coord);
        }
    };
}

pub fn KernelInput(comptime Kernel: type) type {
    const input_fields = std.meta.fields(@TypeOf(Kernel.inputImages));
    comptime var struct_fields: [input_fields.len]std.builtin.Type.StructField = undefined;
    inline for (input_fields, 0..) |field, index| {
        struct_fields[index] = .{
            .name = field.name,
            .type = zigar.image.Any(.ro),
            .default_value_ptr = null,
            .is_comptime = false,
            .alignment = @alignOf(zigar.image.Any(.ro)),
        };
    }
    return @Type(.{
        .@"struct" = .{
            .layout = .auto,
            .fields = &struct_fields,
            .decls = &.{},
            .is_tuple = false,
        },
    });
}

pub fn KernelInputImpl(comptime Impl: type, comptime Kernel: type) type {
    const input_fields = std.meta.fields(@TypeOf(Kernel.inputImages));
    comptime var struct_fields: [input_fields.len]std.builtin.Type.StructField = undefined;
    inline for (input_fields, 0..) |field, index| {
        const input = @field(Kernel.inputImages, field.name);
        const KernelImageImpl = KernelImage(Impl, input.channels, false);
        struct_fields[index] = .{
            .name = field.name,
            .type = KernelImageImpl,
            .default_value_ptr = null,
            .is_comptime = false,
            .alignment = @alignOf(KernelImageImpl),
        };
    }
    return @Type(.{
        .@"struct" = .{
            .layout = .auto,
            .fields = &struct_fields,
            .decls = &.{},
            .is_tuple = false,
        },
    });
}

pub fn KernelOutput(comptime Kernel: type) type {
    const output_fields = std.meta.fields(@TypeOf(Kernel.outputImages));
    comptime var struct_fields: [output_fields.len]std.builtin.Type.StructField = undefined;
    inline for (output_fields, 0..) |field, index| {
        struct_fields[index] = .{
            .name = field.name,
            .type = zigar.image.Any(.rw),
            .default_value_ptr = null,
            .is_comptime = false,
            .alignment = @alignOf(zigar.image.Any(.rw)),
        };
    }
    return @Type(.{
        .@"struct" = .{
            .layout = .auto,
            .fields = &struct_fields,
            .decls = &.{},
            .is_tuple = false,
        },
    });
}

pub fn KernelOutputImpl(comptime Impl: type, comptime Kernel: type) type {
    const output_fields = std.meta.fields(@TypeOf(Kernel.outputImages));
    comptime var struct_fields: [output_fields.len]std.builtin.Type.StructField = undefined;
    inline for (output_fields, 0..) |field, index| {
        const output = @field(Kernel.outputImages, field.name);
        const KernelImageImpl = KernelImage(Impl, output.channels, true);
        const default_value: KernelImageImpl = undefined;
        struct_fields[index] = .{
            .name = field.name,
            .type = KernelImageImpl,
            .default_value_ptr = @ptrCast(&default_value),
            .is_comptime = false,
            .alignment = @alignOf(KernelImageImpl),
        };
    }
    return @Type(.{
        .@"struct" = .{
            .layout = .auto,
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
            const value: param.type = switch (@hasField(@TypeOf(param), "defaultValue")) {
                true => param.defaultValue,
                false => switch (@typeInfo(param.type)) {
                    .int, .float => 0,
                    .bool => false,
                    .vector => @splat(0),
                    else => @compileError("Unrecognized parameter type: " ++ @typeName(param.type)),
                },
            };
            break :get_def @ptrCast(&value);
        };
        struct_fields[index] = .{
            .name = field.name,
            .type = param.type,
            .default_value_ptr = default_value,
            .is_comptime = false,
            .alignment = @alignOf(param.type),
        };
    }
    return @Type(.{
        .@"struct" = .{
            .layout = .auto,
            .fields = &struct_fields,
            .decls = &.{},
            .is_tuple = false,
        },
    });
}

const builtin = if (true) @import("builtin") else unreachable;
const Allocator = if (true) std.mem.Allocator else unreachable;
const Promise = zigar.function.PromiseOf(worker.processSlice);
const AbortSignal = zigar.function.AbortSignal;
const WorkQueue = zigar.thread.WorkQueue;

var work_queue: WorkQueue(worker) = .{};
var gpa = switch (builtin.target.cpu.arch.isWasm()) {
    true => {},
    false => std.heap.DebugAllocator(.{}){},
};
const internal_allocator = switch (builtin.target.cpu.arch.isWasm()) {
    true => std.heap.wasm_allocator,
    false => gpa.allocator(),
};

pub fn startThreadPool(count: u32) !void {
    if (builtin.single_threaded) @panic("Unavailable");
    try work_queue.init(.{
        .allocator = internal_allocator,
        .stack_size = 65536,
        .n_jobs = count,
    });
}

pub fn stopThreadPoolAsync(promise: zigar.function.Promise(void)) void {
    if (builtin.single_threaded) @panic("Unavailable");
    work_queue.deinitAsync(promise);
}

pub fn processAsync(input: Input, output: Output, params: Parameters, promise: Promise, signal: AbortSignal) !void {
    if (builtin.single_threaded) @panic("Unavailable");
    // get the output dimensions (multiple outputs are possible but unlikely)
    var output_width: usize = 0;
    var output_height: usize = 0;
    inline for (zigar.image.formats) |tag| {
        const output_field_names = comptime std.meta.fieldNames(Output);
        const output_image_0 = @field(output, output_field_names[0]);
        if (output_image_0 == tag) {
            inline for (output_field_names) |name| {
                const output_image = @field(output, name);
                var out = output_image.getField(tag);
                const w = out.getWidth();
                const h = out.getHeight();
                if (w > output_width) output_width = w;
                if (h > output_height) output_height = h;
            }
        }
    }
    // add work units to queue
    const workers: usize = @max(1, work_queue.thread_count);
    const scanlines: usize = output_height / workers;
    const slices: usize = if (scanlines > 0) workers else 1;
    const multipart_promise = try promise.partition(internal_allocator, slices);
    var slice_num: usize = 0;
    while (slice_num < slices) : (slice_num += 1) {
        const start = scanlines * slice_num;
        const count = if (slice_num < slices - 1) scanlines else output_height - (scanlines * slice_num);
        try work_queue.push(worker.processSlice, .{ signal, output_width, start, count, input, output, params }, multipart_promise);
    }
}

const worker = struct {
    pub fn processSlice(signal: AbortSignal, width: usize, start: usize, count: usize, input: Input, output: Output, params: Parameters) !void {
        // use inline loop to generate code for each image implementation (WebImage or GD)
        inline for (zigar.image.formats) |tag| {
            const input_field_names = comptime std.meta.fieldNames(Input);
            const output_field_names = comptime std.meta.fieldNames(Output);
            const output_image_0 = @field(output, output_field_names[0]);
            if (output_image_0 == tag) {
                // copy fields from zigar.image.Any to implementation-specific structs
                var input_impl: KernelInputImpl(tag.Type(.ro), kernel) = undefined;
                inline for (input_field_names) |name| {
                    const input_image = @field(input, name);
                    if (input_image != tag) unreachable;
                    @field(input_impl, name).impl = input_image.getField(tag);
                }
                var output_impl: KernelOutputImpl(tag.Type(.rw), kernel) = undefined;
                inline for (output_field_names) |name| {
                    const output_image = @field(output, name);
                    if (output_image != tag) unreachable;
                    @field(output_impl, name).impl = output_image.getField(tag);
                }
                // create the implementation-specific kernel instance
                var instance = kernel.create(input_impl, output_impl, params);
                // calculate variables that are dependent on kernel parameters
                if (@hasDecl(@TypeOf(instance), "evaluateDependents")) {
                    instance.evaluateDependents();
                }
                // loop through all coordinates, starting from (0.5, 0.5)
                const last_x: f32 = @floatFromInt(width);
                const last_y: f32 = @floatFromInt(start + count);
                const first_y: f32 = @floatFromInt(start);
                instance.outputCoord[1] = first_y + 0.5;
                while (instance.outputCoord[1] < last_y) : (instance.outputCoord[1] += 1) {
                    instance.outputCoord[0] = 0.5;
                    while (instance.outputCoord[0] < last_x) : (instance.outputCoord[0] += 1) {
                        instance.evaluatePixel();
                    }
                    if (signal.on()) return error.Aborted;
                }
            }
        }
    }
};
