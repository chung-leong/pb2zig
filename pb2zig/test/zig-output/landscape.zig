// Pixel Bender kernel "Landscape" (translated using pb2zig)
const std = @import("std");

pub const kernel = struct {
    // constants
    const AIF_FLASH_TARGET: i32 = 0;

    // kernel information
    pub const namespace = "com.subblue.filters";
    pub const vendor = "Tom Beddard";
    pub const version = 1;
    pub const description = "Landscape rendering using ray marching";
    pub const parameters = .{
        .size = .{
            .type = @Vector(2, i32),
            .minValue = .{ 100, 100 },
            .maxValue = .{ 1000, 1000 },
            .defaultValue = .{ 500, 350 },
            .aeDisplayName = "Output image size",
        },
        .cameraPosition = .{
            .type = @Vector(3, f32),
            .minValue = .{ -100, 0, -100 },
            .maxValue = .{ 100, 20, 100 },
            .defaultValue = .{ -6, 4, 6 },
        },
        .cameraPositionFine = .{
            .type = @Vector(3, f32),
            .minValue = .{ -5, -1, -5 },
            .maxValue = .{ 5, 1, 5 },
            .defaultValue = .{ 0, 0, 0 },
        },
        .cameraRotation = .{
            .type = f32,
            .minValue = 180.0,
            .maxValue = 180.0,
            .defaultValue = 0.0,
        },
        .terrainHorizon = .{
            .type = f32,
            .minValue = 10.0,
            .maxValue = 100.0,
            .defaultValue = 25.0,
        },
        .terrainDetail = .{
            .type = f32,
            .minValue = 1.0,
            .maxValue = 10.0,
            .defaultValue = 7.0,
        },
        .buildings = .{
            .type = bool,
            .defaultValue = true,
        },
        .waterLevel = .{
            .type = f32,
            .minValue = 0.1,
            .maxValue = 1.0,
            .defaultValue = 0.34,
        },
        .sampling = .{
            .type = i32,
            .minValue = 0,
            .maxValue = 2,
            .defaultValue = 0,
        },
        .shadows = .{
            .type = bool,
            .defaultValue = true,
        },
        .contours = .{
            .type = bool,
            .defaultValue = true,
        },
        .sun = .{
            .type = @Vector(2, f32),
            .minValue = .{ 0.0, 0.0 },
            .maxValue = .{ 90.0, 360.0 },
            .defaultValue = .{ 14.0, 252.0 },
        },
        .terrainHeight = .{
            .type = f32,
            .minValue = 0.5,
            .maxValue = 10.0,
            .defaultValue = 3.5,
        },
    };
    pub const inputImages = .{};
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

            // dependent variables
            detailLevel: f32 = undefined,
            aspectRatio: f32 = undefined,
            ambient: f32 = undefined,
            specular: f32 = undefined,
            sunSize: f32 = undefined,
            contourInterval: f32 = undefined,
            sunPosition: @Vector(3, f32) = undefined,
            cameraEye: @Vector(3, f32) = undefined,
            viewRotation: [3]@Vector(3, f32) = undefined,
            fogColor: @Vector(3, f32) = undefined,
            valleyColor: @Vector(3, f32) = undefined,
            peakColor: @Vector(3, f32) = undefined,
            buildingColor: @Vector(3, f32) = undefined,
            waterColor: @Vector(3, f32) = undefined,
            skyColor: @Vector(3, f32) = undefined,
            sunColor: @Vector(3, f32) = undefined,
            start_dst: [1024]f32 = undefined,

            // constants
            const EPSILON: f32 = 0.1;
            const SPECULAR_EXPONENT: f32 = 50.0;

            // functions defined in kernel
            fn displacement(self: *@This(), p: @Vector(3, f32)) @Vector(3, f32) {
                const buildings = self.params.buildings;
                const waterLevel = self.params.waterLevel;
                const terrainHeight = self.params.terrainHeight;
                var alt: f32 = undefined;
                _ = alt;
                var hills: f32 = 0.0;
                var structures: f32 = 0.0;
                var terrain: @Vector(3, f32) = undefined;
                hills = abs(2.0 * cos(p[0] / 32.0 - 0.5) * sin(p[2] / 32.0 - 0.5) + cos(p[0] / 8.0) * sin(p[2] / 8.0 + 0.5) + cos(p[0] / 2.0 - 0.5) * sin(p[2] / 2.0 + 0.5) + cos(2.0 * p[0]) * sin(2.0 * p[2]) / 8.0) / 2.125;
                if (hills <= waterLevel) {
                    terrain = @Vector(3, f32){
                        terrainHeight * waterLevel,
                        terrainHeight * hills,
                        1,
                    };
                } else if (buildings) {
                    structures = waterLevel + (mod(p[0] / 2.0, 0.8) - mod(p[0] / 2.0, 0.5)) * (mod(p[2] / 2.0, 0.8) - mod(p[2] / 2.0, 0.5)) * terrainHeight / 4.0;
                    if (structures < hills) {
                        terrain = @Vector(3, f32){
                            terrainHeight * hills,
                            0,
                            0,
                        };
                    } else {
                        terrain = @Vector(3, f32){
                            terrainHeight * structures,
                            structures,
                            2,
                        };
                    }
                } else {
                    terrain = @Vector(3, f32){
                        terrainHeight * hills,
                        0,
                        0,
                    };
                }
                return terrain;
            }

            fn rayDirection(self: *@This(), p: @Vector(2, f32)) @Vector(3, f32) {
                const size = self.params.size;
                const aspectRatio = self.aspectRatio;
                const viewRotation = self.viewRotation;
                var direction: @Vector(3, f32) = .{
                    2.0 * aspectRatio * p[0] / @as(f32, @floatFromInt(size[0])) - aspectRatio,
                    -2.0 * p[1] / @as(f32, @floatFromInt(size[1])) + 1.0,
                    -2.0,
                };
                return @"V * M"(direction, viewRotation);
            }

            fn intersectionNormal(self: *@This(), p: @Vector(3, f32), epsilon: f32) @Vector(3, f32) {
                var n: @Vector(3, f32) = undefined;
                var e: f32 = epsilon;
                var p1: @Vector(3, f32) = .{ p[0] - e, p[1], p[2] };
                var p2: @Vector(3, f32) = .{ p[0] + e, p[1], p[2] };
                var p3: @Vector(3, f32) = .{ p[0], p[1], p[2] - e };
                var p4: @Vector(3, f32) = .{ p[0], p[1], p[2] + e };
                n = @Vector(3, f32){
                    self.displacement(p1)[0] - self.displacement(p2)[0],
                    2.0 * e,
                    self.displacement(p3)[0] - self.displacement(p4)[0],
                };
                return normalize(n);
            }

            fn castRay(self: *@This(), ray_direction: @Vector(3, f32), t: f32, ray: *@Vector(3, f32), normal: *@Vector(3, f32), ray_distance: *f32, surface: *@Vector(3, f32)) void {
                const terrainHorizon = self.params.terrainHorizon;
                const terrainHeight = self.params.terrainHeight;
                const detailLevel = self.detailLevel;
                const cameraEye = self.cameraEye;
                var dt: f32 = EPSILON;
                ray.* = @Vector(3, f32){ 0.0, 0.0, 0.0 };
                var start_d: f32 = t;
                var basic_ray: @Vector(3, f32) = undefined;
                _ = basic_ray;
                var prev_ray: @Vector(3, f32) = undefined;
                var prev_alt: f32 = undefined;
                while (t < terrainHorizon) {
                    ray_distance.* = -1.0;
                    ray.* = cameraEye + ray_direction * @as(@Vector(3, f32), @splat(t));
                    if (ray.*[1] > terrainHeight * 2.0 and ray.*[1] > prev_ray[1] and t > start_d) break;
                    surface.* = self.displacement(ray.*);
                    if (ray.*[1] <= surface.*[0]) {
                        var id: f32 = (prev_alt - prev_ray[1]) / (ray.*[1] - prev_ray[1] - surface.*[0] + prev_alt);
                        ray_distance.* = mix(t, (t - dt), id);
                        surface.*[0] = mix(surface.*[0], ray.*[1], id);
                        ray.*[1] = surface.*[0];
                        prev_ray[1] = prev_alt;
                        normal.* = self.intersectionNormal(ray.*, dt);
                        break;
                    }
                    t += dt;
                    dt = max((t - start_d) * detailLevel, 0.005);
                    prev_alt = surface.*[0];
                    prev_ray = ray.*;
                }
            }

            fn castShadowRay(self: *@This(), origin: @Vector(3, f32), direction: @Vector(3, f32)) f32 {
                const terrainHeight = self.params.terrainHeight;
                var t: f32 = EPSILON;
                var epsilon: f32 = t;
                var surface: @Vector(3, f32) = self.displacement(origin);
                origin[1] = surface[0];
                var ray: @Vector(3, f32) = .{ 0.0, 0.0, 0.0 };
                var shadow_length: f32 = 0.0;
                while (ray[1] < terrainHeight) {
                    ray = origin + direction * @as(@Vector(3, f32), @splat(t));
                    surface = self.displacement(ray);
                    if (ray[1] <= surface[0]) {
                        shadow_length = t;
                        break;
                    }
                    t += epsilon;
                }
                return shadow_length;
            }

            fn fog(self: *@This(), c: @Vector(3, f32), d: f32) @Vector(3, f32) {
                const terrainHorizon = self.params.terrainHorizon;
                const fogColor = self.fogColor;
                var r: f32 = abs(d) / terrainHorizon;
                return mix(c, fogColor, r);
            }

            fn shadow(self: *@This(), diffuse: f32, l: f32) f32 {
                const ambient = self.ambient;
                if (l > 0.0) {
                    diffuse = clamp(diffuse - 0.01, 0.0, 1.0) * ambient;
                }
                return diffuse;
            }

            fn sky(self: *@This(), ray_direction: @Vector(3, f32)) @Vector(3, f32) {
                const ambient = self.ambient;
                const sunSize = self.sunSize;
                const sunPosition = self.sunPosition;
                const skyColor = self.skyColor;
                const sunColor = self.sunColor;
                var a: f32 = clamp((abs(acos(dot(ray_direction, sunPosition) / (length(ray_direction) * length(sunPosition)))) / 3.14) / sunSize, 0.0, 1.0);
                var s: @Vector(3, f32) = sunColor * @as(@Vector(3, f32), @splat((1.0 - a)));
                return skyColor * @as(@Vector(3, f32), @splat(ambient)) + s;
            }

            fn overlayContour(self: *@This(), o: @Vector(3, f32), h: f32) bool {
                const contours = self.params.contours;
                const contourInterval = self.contourInterval;
                _ = o;
                var contour: f32 = mod(h * 100.0, contourInterval) - mod((h * 100.0 - 1.5), contourInterval);
                return @as(bool, if (contours and contour < 0.5) true else true);
            }

            fn render(self: *@This(), p: @Vector(2, f32)) @Vector(3, f32) {
                const size = self.params.size;
                const waterLevel = self.params.waterLevel;
                const shadows = self.params.shadows;
                const terrainHeight = self.params.terrainHeight;
                const specular = self.specular;
                const sunPosition = self.sunPosition;
                const fogColor = self.fogColor;
                const valleyColor = self.valleyColor;
                const peakColor = self.peakColor;
                const buildingColor = self.buildingColor;
                const waterColor = self.waterColor;
                const start_dst = self.start_dst;
                var o: @Vector(3, f32) = undefined;
                var ray: @Vector(3, f32) = undefined;
                var l: @Vector(3, f32) = undefined;
                var n: @Vector(3, f32) = undefined;
                var ray_distance: f32 = undefined;
                var reflection: @Vector(3, f32) = undefined;
                var diffuse: f32 = undefined;
                var spec: f32 = undefined;
                var surface: @Vector(3, f32) = undefined;
                var shadow_length: f32 = undefined;
                var t: f32 = start_dst[@intCast(@as(i32, @intFromFloat(p[0] / 5.0)))];
                var ray_direction: @Vector(3, f32) = self.rayDirection(p);
                var contour: f32 = undefined;
                _ = contour;
                self.castRay(ray_direction, t, &ray, &n, &ray_distance, &surface);
                if (ray_distance >= 0.0) {
                    if (surface[2] == 1.0) {
                        l = normalize(sunPosition - ray);
                        diffuse = dot(l, n);
                        o = waterColor;
                        if (shadows) {
                            shadow_length = self.castShadowRay(ray, l);
                            diffuse = self.shadow(diffuse, shadow_length);
                        }
                        if (shadow_length == 0.0) {
                            var cf: f32 = (surface[0] - surface[1]) / (waterLevel * terrainHeight);
                            if (cf < 0.35) {
                                diffuse *= 1.35 - cf;
                            }
                            reflection = l - @as(@Vector(3, f32), @splat(2.0 * diffuse)) * n;
                            spec = dot(normalize(ray), reflection);
                            spec = pow(max(specular, 0.0), specular) * 0.5;
                            o = o * @as(@Vector(3, f32), @splat(diffuse)) * @as(@Vector(3, f32), @splat((0.5 + spec)));
                            if (self.overlayContour(o, surface[1])) {
                                o *= @as(@Vector(3, f32), @splat(1.4));
                            }
                            o = self.fog(o, ray_distance);
                        } else {
                            diffuse *= 0.4;
                            if (self.overlayContour(o, surface[0])) {
                                o *= @as(@Vector(3, f32), @splat(1.4));
                            }
                            o = self.fog(o * @as(@Vector(3, f32), @splat(diffuse)), ray_distance);
                        }
                    } else if (surface[2] == 2.0) {
                        l = normalize(sunPosition - ray);
                        diffuse = 0.3 + dot(l, n) / 1.43;
                        if (shadows) {
                            shadow_length = self.castShadowRay(ray, l);
                            diffuse = self.shadow(diffuse, shadow_length);
                        }
                        o = buildingColor * @as(@Vector(3, f32), @splat(diffuse));
                        o = self.fog(o, ray_distance);
                    } else {
                        l = normalize(sunPosition - ray);
                        diffuse = 0.3 + dot(l, n) / 1.43;
                        if (shadows) {
                            shadow_length = self.castShadowRay(ray, l);
                            diffuse = self.shadow(diffuse, shadow_length);
                        }
                        o = mix(valleyColor, peakColor, clamp((ray[1] - waterLevel) / (terrainHeight - terrainHeight * waterLevel), 0.0, 1.0)) * @as(@Vector(3, f32), @splat(diffuse));
                        if (self.overlayContour(o, surface[0])) {
                            o *= @as(@Vector(3, f32), @splat(0.4));
                        }
                        o = self.fog(o, ray_distance);
                    }
                } else {
                    o = mix(self.sky(ray_direction), fogColor, 1.0 - (@as(f32, @floatFromInt(size[1])) / 1.8 - p[1]) / @as(f32, @floatFromInt(size[1])));
                }
                return o;
            }

            pub fn evaluateDependents(self: *@This()) void {
                const size = self.params.size;
                const cameraPosition = self.params.cameraPosition;
                const cameraPositionFine = self.params.cameraPositionFine;
                const cameraRotation = self.params.cameraRotation;
                const terrainDetail = self.params.terrainDetail;
                const waterLevel = self.params.waterLevel;
                const sun = self.params.sun;
                const terrainHeight = self.params.terrainHeight;
                var c: f32 = cos(radians(-cameraRotation));
                var s: f32 = sin(radians(-cameraRotation));
                self.viewRotation = [3]@Vector(3, f32){
                    .{ c, 0.0, s },
                    .{ 0.0, 1.0, 0.0 },
                    .{ -s, 0.0, c },
                };
                self.cameraEye = cameraPosition + cameraPositionFine;
                if (self.cameraEye[1] <= (waterLevel * terrainHeight)) {
                    self.cameraEye[1] = (waterLevel * terrainHeight) + 0.1;
                }
                var sd: f32 = 1000.0;
                self.sunPosition = @Vector(3, f32){
                    sd * cos(radians(sun[1])) * sin(radians(90.0 - sun[0])),
                    sd * cos(radians(90.0 - sun[0])),
                    sd * sin(radians(sun[1])) * sin(radians(90.0 - sun[0])),
                };
                self.sunPosition += self.cameraEye;
                self.detailLevel = (11.0 - terrainDetail) / 175.0;
                self.aspectRatio = @as(f32, @floatFromInt(size[0])) / @as(f32, @floatFromInt(size[1]));
                self.specular = 0.5;
                self.sunSize = 0.17;
                self.contourInterval = 10.0;
                var ray: @Vector(3, f32) = undefined;
                var n: @Vector(3, f32) = undefined;
                var surface: @Vector(3, f32) = undefined;
                var ray_distance: f32 = undefined;
                var h: f32 = undefined;
                _ = h;
                {
                    var x: f32 = 0.0;
                    while (x < @as(f32, @floatFromInt(size[0]))) {
                        ray = self.cameraEye + self.rayDirection(@Vector(2, f32){ x, size[1] }) * @as(@Vector(3, f32), @splat(0.1));
                        surface = self.displacement(ray);
                        if (ray[1] < surface[0]) {
                            self.cameraEye[1] = surface[0] - self.rayDirection(@Vector(2, f32){ x, size[1] })[1] * 0.1 + EPSILON;
                        }
                        x += @as(f32, @floatFromInt(size[0])) / 2.0;
                    }
                }
                {
                    var i: f32 = 0.0;
                    while (i < @as(f32, @floatFromInt(size[0]))) {
                        self.castRay(self.rayDirection(@Vector(2, f32){ i, size[1] }), 0.01, &ray, &n, &ray_distance, &surface);
                        ray_distance -= EPSILON;
                        if (ray_distance < EPSILON) {
                            ray_distance = EPSILON;
                        }
                        self.start_dst[@intCast(@as(i32, @intFromFloat(i / 5.0)))] = ray_distance;
                        i += 5.0;
                    }
                }
                self.skyColor = @Vector(3, f32){ 0.0, 0.0, 1.0 };
                self.sunColor = @Vector(3, f32){ 1.0, 1.0, 1.0 };
                self.fogColor = @Vector(3, f32){ 251.0, 251.0, 253.0 } / @as(@Vector(3, f32), @splat(255.0));
                self.waterColor = @Vector(3, f32){ 0.0, 0.3, 1.0 };
                self.valleyColor = @Vector(3, f32){ 75.0, 139.0, 44.0 } / @as(@Vector(3, f32), @splat(255.0));
                self.peakColor = @Vector(3, f32){ 189.0, 178.0, 149.0 } / @as(@Vector(3, f32), @splat(255.0));
                self.buildingColor = @Vector(3, f32){ 203.0, 199.0, 188.0 } / @as(@Vector(3, f32), @splat(255.0));
                self.ambient = clamp(sun[0] / 50.0, 0.5, 1.0);
            }

            pub fn evaluatePixel(self: *@This()) void {
                const sampling = self.params.sampling;
                const dst = self.output.dst;
                self.dst = @splat(0.0);

                var c: @Vector(3, f32) = .{ 0, 0, 0 };
                if (sampling == 1) {
                    c = mix(self.render(self.outCoord()), self.render(@Vector(2, f32){
                        self.outCoord()[0],
                        self.outCoord()[1] - 0.5,
                    }), 0.5);
                } else if (sampling == 2) {
                    {
                        var i: f32 = 0.0;
                        while (i < 1.0) {
                            var j: f32 = 0.0;
                            while (j < 1.0) {
                                c += @as(@Vector(3, f32), @splat(0.25)) * self.render(@Vector(2, f32){
                                    self.outCoord()[0] + i,
                                    self.outCoord()[1] + j,
                                });
                                j += 0.5;
                            }
                            i += 0.5;
                        }
                    }
                } else {
                    c = self.render(self.outCoord());
                }
                self.dst = @Vector(4, f32){
                    c[0],
                    c[1],
                    c[2],
                    1.0,
                };

                dst.setPixel(self.outputCoord[0], self.outputCoord[1], self.dst);
            }

            pub fn outCoord(self: *@This()) @Vector(2, f32) {
                const x = self.outputCoord[0];
                const y = self.outputCoord[1];
                return .{ @floatFromInt(x), @floatFromInt(y) };
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
    fn radians(v: anytype) @TypeOf(v) {
        const multiplier = std.math.pi / 180.0;
        return switch (@typeInfo(@TypeOf(v))) {
            .Vector => v * @as(@TypeOf(v), @splat(multiplier)),
            else => v * multiplier,
        };
    }

    fn sin(v: anytype) @TypeOf(v) {
        return @sin(v);
    }

    fn cos(v: anytype) @TypeOf(v) {
        return @cos(v);
    }

    fn acos(v: anytype) @TypeOf(v) {
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

    fn clamp(v: anytype, min_val: anytype, max_val: anytype) @TypeOf(v) {
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

    fn mix(v1: anytype, v2: anytype, p: anytype) @TypeOf(v1) {
        return switch (@typeInfo(@TypeOf(p))) {
            .Vector => v1 * (@as(@TypeOf(p), @splat(1)) - p) + v2 * p,
            else => switch (@typeInfo(@TypeOf(v1))) {
                .Vector => mix(v1, v2, @as(@TypeOf(v1), @splat(p))),
                else => v1 * (1 - p) + v2 * p,
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

    fn normalize(v: anytype) @TypeOf(v) {
        return switch (@typeInfo(@TypeOf(v))) {
            .Vector => v / @as(@TypeOf(v), @splat(@sqrt(@reduce(.Add, v * v)))),
            else => if (v > 0) 1 else -1,
        };
    }

    fn @"V * M"(v1: anytype, m2: anytype) @TypeOf(v1) {
        var result: @TypeOf(v1) = undefined;
        inline for (m2, 0..) |column, c| {
            result[c] = @reduce(.Add, column * v1);
        }
        return result;
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
                1 => @floatFromInt(@shuffle(T, pixel, undefined, @Vector(1, i32){0})),
                2 => @floatFromInt(@shuffle(T, pixel, undefined, @Vector(2, i32){ 0, 3 })),
                3 => @floatFromInt(@shuffle(T, pixel, undefined, @Vector(3, i32){ 0, 1, 2 })),
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
            const maxAlpha: @Vector(1, f32) = .{std.math.maxInt(T)};
            const result: Pixel = switch (len) {
                1 => @intFromFloat(@shuffle(f32, product, maxAlpha, @Vector(4, i32){ 0, 0, 0, -1 })),
                2 => @intFromFloat(@shuffle(f32, product, undefined, @Vector(4, i32){ 0, 0, 0, 1 })),
                3 => @intFromFloat(@shuffle(f32, product, maxAlpha, @Vector(4, i32){ 0, 1, 2, -1 })),
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
