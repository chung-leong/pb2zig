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

                dst.setPixel(self.outputCoord[0], self.outputCoord[1], self.dst);
            }

            pub fn outCoord(self: *@This()) @Vector(2, f32) {
                return .{ @as(f32, @floatFromInt(self.outputCoord[0])) + 0.5, @as(f32, @floatFromInt(self.outputCoord[1])) + 0.5 };
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
            .Vector => calc: {
                var result: @TypeOf(v1) = undefined;
                inline for (0..@typeInfo(@TypeOf(v1)).Vector.len) |i| {
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

    fn pow(v1: anytype, v2: anytype) @TypeOf(v1) {
        return switch (@typeInfo(@TypeOf(v1))) {
            .Vector => calc: {
                var result: @TypeOf(v1) = undefined;
                inline for (0..@typeInfo(@TypeOf(v1)).Vector.len) |i| {
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
        return switch (@typeInfo(@TypeOf(v))) {
            .Vector => @sqrt(@reduce(.Add, v * v)),
            else => @abs(v),
        };
    }

    fn dot(v1: anytype, v2: anytype) f32 {
        return switch (@typeInfo(@TypeOf(v1))) {
            .Vector => @reduce(.Add, v1 * v2),
            else => v1 * v2,
        };
    }
};

pub const Input = KernelInput(u8, kernel);
pub const Output = KernelOutput(u8, kernel);
pub const Parameters = KernelParameters(kernel);

pub fn createOutput(allocator: std.mem.Allocator, width: u32, height: u32, input: Input, params: Parameters) !Output {
    var output: Output = undefined;
    inline for (std.meta.fields(Output)) |field| {
        const ImageT = @TypeOf(@field(output, field.name));
        @field(output, field.name) = .{
            .data = try allocator.alloc(ImageT.Pixel, width * height),
            .width = width,
            .height = height,
        };
    }
    var instance = kernel.create(input, output, params);
    if (@hasDecl(@TypeOf(instance), "evaluateDependents")) {
        instance.evaluateDependents();
    }
    while (instance.outputCoord[1] < height) : (instance.outputCoord[1] += 1) {
        instance.outputCoord[0] = 0;
        while (instance.outputCoord[0] < width) : (instance.outputCoord[0] += 1) {
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

        fn constrain(v: anytype, min: f32, max: f32) @TypeOf(v) {
            const lower: @TypeOf(v) = @splat(min);
            const upper: @TypeOf(v) = @splat(max);
            const v2 = @select(f32, v > lower, v, lower);
            return @select(f32, v2 < upper, v2, upper);
        }

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
                1 => @floatFromInt(@shuffle(T, pixel, undefined, @Vector(1, i32){0})),
                2 => @floatFromInt(@shuffle(T, pixel, undefined, @Vector(2, i32){ 0, 3 })),
                3 => @floatFromInt(@shuffle(T, pixel, undefined, @Vector(3, i32){ 0, 1, 2 })),
                4 => @floatFromInt(pixel),
                else => @compileError("Unsupported number of channels: " ++ len),
            };
            const denominator: FPixel = @splat(@floatFromInt(std.math.maxInt(T)));
            return numerator / denominator;
        }

        fn intPixelFromPBPixel(pixel: FPixel) Pixel {
            const max: f32 = @floatFromInt(std.math.maxInt(T));
            const multiplier: FPixel = @splat(max);
            const product: FPixel = constrain(pixel * multiplier, 0, max);
            const maxAlpha: @Vector(1, f32) = .{std.math.maxInt(T)};
            return switch (len) {
                1 => @intFromFloat(@shuffle(f32, product, maxAlpha, @Vector(4, i32){ 0, 0, 0, -1 })),
                2 => @intFromFloat(@shuffle(f32, product, undefined, @Vector(4, i32){ 0, 0, 0, 1 })),
                3 => @intFromFloat(@shuffle(f32, product, maxAlpha, @Vector(4, i32){ 0, 1, 2, -1 })),
                4 => @intFromFloat(product),
                else => @compileError("Unsupported number of channels: " ++ len),
            };
        }

        fn getPixel(self: @This(), x: u32, y: u32) FPixel {
            const index = (y * self.width) + x;
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
            const index = (y * self.width) + x;
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

        inline fn getPixelAt(self: @This(), coord: @Vector(2, f32)) FPixel {
            const left_top: @Vector(2, f32) = .{ 0, 0 };
            const bottom_right: @Vector(2, f32) = .{ @floatFromInt(self.width - 1), @floatFromInt(self.height - 1) };
            if (@reduce(.And, coord >= left_top) and @reduce(.And, coord <= bottom_right)) {
                const ic: @Vector(2, u32) = @intFromFloat(coord);
                return self.getPixel(ic[0], ic[1]);
            } else {
                return @splat(0);
            }
        }

        fn sampleNearest(self: @This(), coord: @Vector(2, f32)) FPixel {
            return self.getPixelAt(@floor(coord));
        }

        fn sampleLinear(self: @This(), coord: @Vector(2, f32)) FPixel {
            const c = coord - @as(@Vector(2, f32), @splat(0.5));
            const c0 = @floor(c);
            const f0 = c - c0;
            const f1 = @as(@Vector(2, f32), @splat(1)) - f0;
            const w: @Vector(4, f32) = .{
                f1[0] * f1[1],
                f0[0] * f1[1],
                f1[0] * f0[1],
                f0[0] * f0[1],
            };
            const p00 = self.getPixelAt(c0);
            const p01 = self.getPixelAt(c0 + @as(@Vector(2, f32), .{ 0, 1 }));
            const p10 = self.getPixelAt(c0 + @as(@Vector(2, f32), .{ 1, 0 }));
            const p11 = self.getPixelAt(c0 + @as(@Vector(2, f32), .{ 1, 1 }));
            var result: FPixel = undefined;
            comptime var i = 0;
            inline while (i < len) : (i += 1) {
                const p: @Vector(4, f32) = .{ p00[i], p10[i], p01[i], p11[i] };
                result[i] = @reduce(.Add, p * w);
            }
            return result;
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
            .layout = .auto,
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
                    .Int, .Float => 0,
                    .Bool => false,
                    .Vector => @splat(0),
                    else => @compileError("Unrecognized parameter type: " ++ @typeName(param.type)),
                },
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
            .layout = .auto,
            .fields = &struct_fields,
            .decls = &.{},
            .is_tuple = false,
        },
    });
}

pub usingnamespace switch (@import("builtin").single_threaded) {
    false => async_support,
    true => struct {},
};

const async_support = struct {
    const zigar = @import("zigar");
    const Allocator = std.mem.Allocator;
    const Promise = zigar.function.PromiseOf(thread_ns.processSlice);
    const AbortSignal = zigar.function.AbortSignal;
    const WorkQueue = zigar.thread.WorkQueue;

    var work_queue: WorkQueue(thread_ns) = .{};

    pub fn startThreadPool(count: u32) !void {
        const allocator = zigar.mem.getDefaultAllocator();
        try work_queue.init(.{ .allocator = allocator, .n_jobs = count });
        try zigar.thread.use();
    }

    pub fn stopThreadPool() void {
        work_queue.deinit();
        zigar.thread.end();
    }

    pub fn stopThreadPoolAsync(promise: zigar.function.Promise(void)) void {
        work_queue.deinitAsync(promise);
    }

    pub fn createOutputAsync(allocator: Allocator, promise: Promise, signal: AbortSignal, width: u32, height: u32, input: Input, params: Parameters) !void {
        var output: Output = undefined;
        // allocate memory for output image
        const fields = std.meta.fields(Output);
        var allocated: usize = 0;
        errdefer inline for (fields, 0..) |field, i| {
            if (i < allocated) {
                allocator.free(@field(output, field.name).data);
            }
        };
        inline for (fields) |field| {
            const ImageT = @TypeOf(@field(output, field.name));
            const data = try allocator.alloc(ImageT.Pixel, width * height);
            @field(output, field.name) = .{
                .data = data,
                .width = width,
                .height = height,
            };
            allocated += 1;
        }
        // add work units to queue
        const workers: u32 = @intCast(@max(1, work_queue.thread_count));
        const scanlines: u32 = height / workers;
        const slices: u32 = if (scanlines > 0) workers else 1;
        const multipart_promise = try promise.partition(zigar.mem.getDefaultAllocator(), slices);
        var slice_num: u32 = 0;
        while (slice_num < slices) : (slice_num += 1) {
            const start = scanlines * slice_num;
            const count = if (slice_num < slices - 1) scanlines else height - (scanlines * slice_num);
            try work_queue.push(thread_ns.processSlice, .{ signal, width, start, count, input, output, params }, multipart_promise);
        }
    }

    const thread_ns = struct {
        pub fn processSlice(signal: AbortSignal, width: u32, start: u32, count: u32, input: Input, output: Output, params: Parameters) !Output {
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
                    if (signal.on()) return error.Aborted;
                }
            }
            return output;
        }
    };
};
