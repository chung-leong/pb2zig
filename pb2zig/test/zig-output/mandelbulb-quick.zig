// Pixel Bender kernel "MandelbulbQuick" (translated using pb2zig)
const std = @import("std");

pub const kernel = struct {
    // constants
    const PI: f32 = 3.141592653;
    const MIN_EPSILON: f32 = 0.0;

    // kernel information
    pub const namespace = "com.subblue.filters";
    pub const vendor = "Tom Beddard";
    pub const version = 1;
    pub const description = "Mandelbulb Fractal Ray Tracer - the quick version";
    pub const parameters = .{
        .antialiasing = .{
            .type = i32,
            .minValue = 1,
            .maxValue = 3,
            .defaultValue = 1,
            .description = "Super sampling quality. Number of samples squared per pixel.",
        },
        .phong = .{
            .type = bool,
            .defaultValue = true,
            .description = "Enable phong shading.",
        },
        .julia = .{
            .type = bool,
            .defaultValue = false,
            .description = "Enable Julia set version.",
        },
        .radiolaria = .{
            .type = bool,
            .defaultValue = false,
            .description = "Enable radiolaria style.",
        },
        .radiolariaFactor = .{
            .type = f32,
            .minValue = -4.0,
            .maxValue = 4.0,
            .defaultValue = 0.0,
            .description = "Tweak the radiolaria effect.",
        },
        .shadows = .{
            .type = f32,
            .minValue = 0.0,
            .maxValue = 1.0,
            .defaultValue = 0.0,
            .description = "Enable ray traced shadows.",
        },
        .ambientOcclusion = .{
            .type = f32,
            .minValue = 0.0,
            .maxValue = 1.0,
            .defaultValue = 0.8,
            .description = "Enable fake ambient occlusion factor based on the orbit trap.",
        },
        .ambientOcclusionEmphasis = .{
            .type = f32,
            .minValue = 0.0,
            .maxValue = 1.0,
            .defaultValue = 0.58,
            .description = "Emphasise the structure edges based on the number of steps it takes to reach a point in the fractal.",
        },
        .bounding = .{
            .type = f32,
            .minValue = 1.0,
            .maxValue = 16.0,
            .defaultValue = 2.5,
            .description = "Sets the bounding sphere radius to help accelerate the raytracing.",
        },
        .bailout = .{
            .type = f32,
            .minValue = 0.5,
            .maxValue = 12.0,
            .defaultValue = 4.0,
            .description = "Sets the bailout value for the fractal calculation. Lower values give smoother less detailed results.",
        },
        .power = .{
            .type = f32,
            .minValue = 2.0,
            .maxValue = 32.0,
            .defaultValue = 8.0,
            .description = "The power of the fractal.",
        },
        .julia_c = .{
            .type = @Vector(3, f32),
            .minValue = .{ -2.0, -2.0, -2.0 },
            .maxValue = .{ 2.0, 2.0, 2.0 },
            .defaultValue = .{ 1.0, 0.0, 0.0 },
            .description = "The c constant for Julia set fractals",
        },
        .cameraPosition = .{
            .type = @Vector(3, f32),
            .minValue = .{ -4.0, -4.0, -4.0 },
            .maxValue = .{ 4.0, 4.0, 4.0 },
            .defaultValue = .{ 0.0, -2.6, 0.0 },
            .description = "Camera position.",
        },
        .cameraPositionFine = .{
            .type = @Vector(3, f32),
            .minValue = .{ -0.1, -0.1, -0.1 },
            .maxValue = .{ 0.1, 0.1, 0.1 },
            .defaultValue = .{ 0.0, 0.0, 0.0 },
            .description = "Fine tune position.",
        },
        .cameraRotation = .{
            .type = @Vector(3, f32),
            .minValue = .{
                -180.0,
                -180.0,
                -180.0,
            },
            .maxValue = .{ 180.0, 180.0, 180.0 },
            .defaultValue = .{ 0.0, 0.0, -90.0 },
            .description = "Pointing angle in each axis of the camera.",
        },
        .cameraZoom = .{
            .type = f32,
            .minValue = 0.0,
            .maxValue = 10.0,
            .defaultValue = 0.0,
            .description = "Zoom the camera view.",
        },
        .light = .{
            .type = @Vector(3, f32),
            .minValue = .{ -50.0, -50.0, -50.0 },
            .maxValue = .{ 50.0, 50.0, 50.0 },
            .defaultValue = .{ 38.0, -42.0, 38.0 },
            .description = "Position of point light.",
        },
        .colorBackground = .{
            .type = @Vector(3, f32),
            .minValue = .{ 0.0, 0.0, 0.0 },
            .maxValue = .{ 1.0, 1.0, 1.0 },
            .defaultValue = .{ 0.0, 0.0, 0.0 },
            .description = "Background colour.",
            .aeUIControl = "aeColor",
        },
        .colorBackgroundTransparency = .{
            .type = f32,
            .minValue = 0.0,
            .maxValue = 1.0,
            .defaultValue = 1.0,
            .description = "Background transparency.",
        },
        .colorDiffuse = .{
            .type = @Vector(3, f32),
            .minValue = .{ 0.0, 0.0, 0.0 },
            .maxValue = .{ 1.0, 1.0, 1.0 },
            .defaultValue = .{ 0.0, 0.85, 0.99 },
            .description = "Diffuse colour.",
            .aeUIControl = "aeColor",
        },
        .colorAmbient = .{
            .type = @Vector(3, f32),
            .minValue = .{ 0.0, 0.0, 0.0 },
            .maxValue = .{ 1.0, 1.0, 1.0 },
            .defaultValue = .{ 0.67, 0.85, 1.0 },
            .description = "Ambient light colour.",
            .aeUIControl = "aeColor",
        },
        .colorAmbientIntensity = .{
            .type = f32,
            .minValue = 0.0,
            .maxValue = 1.0,
            .defaultValue = 0.4,
            .description = "Ambient light intensity.",
        },
        .colorLight = .{
            .type = @Vector(3, f32),
            .minValue = .{ 0.0, 0.0, 0.0 },
            .maxValue = .{ 1.0, 1.0, 1.0 },
            .defaultValue = .{ 0.48, 0.59, 0.66 },
            .description = "Light colour.",
            .aeUIControl = "aeColor",
        },
        .colorSpread = .{
            .type = f32,
            .minValue = 0.0,
            .maxValue = 1.0,
            .defaultValue = 0.2,
            .description = "Vary the colour based on the normal direction.",
        },
        .rimLight = .{
            .type = f32,
            .minValue = 0.0,
            .maxValue = 1.0,
            .defaultValue = 0.0,
            .description = "Rim light factor.",
        },
        .specularity = .{
            .type = f32,
            .minValue = 0.0,
            .maxValue = 1.0,
            .defaultValue = 0.66,
            .description = "Phone specularity",
        },
        .specularExponent = .{
            .type = f32,
            .minValue = 0.1,
            .maxValue = 50.0,
            .defaultValue = 15.0,
            .description = "Phong shininess",
        },
        .rotation = .{
            .type = @Vector(3, f32),
            .minValue = .{
                -180.0,
                -180.0,
                -180.0,
            },
            .maxValue = .{ 180.0, 180.0, 180.0 },
            .defaultValue = .{ 0.0, 36.0, 39.6 },
            .description = "Rotate the Mandelbulb in each axis.",
        },
        .maxIterations = .{
            .type = i32,
            .minValue = 1,
            .maxValue = 20,
            .defaultValue = 6,
            .description = "More iterations reveal more detail in the fractal surface but takes longer to calculate.",
        },
        .stepLimit = .{
            .type = i32,
            .minValue = 10,
            .maxValue = 200,
            .defaultValue = 110,
            .description = "The maximum number of steps a ray should take.",
        },
        .epsilonScale = .{
            .type = f32,
            .minValue = 0.1,
            .maxValue = 1.0,
            .defaultValue = 1.0,
            .description = "Scale the epsilon step distance. Smaller values are slower but will generate smoother results for thin areas.",
        },
        .size = .{
            .type = @Vector(2, i32),
            .minValue = .{ 100, 100 },
            .maxValue = .{ 2048, 2048 },
            .defaultValue = .{ 640, 480 },
            .description = "The output size in pixels.",
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
            bailout_sr: f32 = undefined,
            aspectRatio: f32 = undefined,
            sampleStep: f32 = undefined,
            sampleContribution: f32 = undefined,
            pixel_scale: f32 = undefined,
            eps_start: f32 = undefined,
            eye: @Vector(3, f32) = undefined,
            viewRotation: [3]@Vector(3, f32) = undefined,
            objRotation: [3]@Vector(3, f32) = undefined,

            // functions defined in kernel
            fn powN(self: *@This(), z: *@Vector(3, f32), zr0: f32, dr: *f32) void {
                const power = self.params.power;
                const zo0: f32 = asin(z.*[2] / zr0);
                const zi0: f32 = atan2(z.*[1], z.*[0]);
                var zr: f32 = pow(zr0, power - 1.0);
                const zo: f32 = zo0 * power;
                const zi: f32 = zi0 * power;
                const czo: f32 = cos(zo);
                dr.* = zr * dr.* * power + 1.0;
                zr *= zr0;
                z.* = @as(@Vector(3, f32), @splat(zr)) * @Vector(3, f32){
                    czo * cos(zi),
                    czo * sin(zi),
                    sin(zo),
                };
            }

            fn DE(self: *@This(), z0: @Vector(3, f32), min_dist: *f32) f32 {
                const julia = self.params.julia;
                const radiolaria = self.params.radiolaria;
                const radiolariaFactor = self.params.radiolariaFactor;
                const bailout = self.params.bailout;
                const julia_c = self.params.julia_c;
                const maxIterations = self.params.maxIterations;
                const c: @Vector(3, f32) = if (julia) julia_c else z0;
                var z: @Vector(3, f32) = z0;
                var dr: f32 = 1.0;
                var r: f32 = length(z);
                if (r < min_dist.*) {
                    min_dist.* = r;
                }
                {
                    var n: i32 = 0;
                    while (n < maxIterations) {
                        self.powN(&z, r, &dr);
                        z += c;
                        if (radiolaria and z[1] > radiolariaFactor) {
                            z[1] = radiolariaFactor;
                        }
                        r = length(z);
                        if (r < min_dist.*) {
                            min_dist.* = r;
                        }
                        if (r > bailout) break;
                        n += 1;
                    }
                }
                return 0.5 * log(r) * r / dr;
            }

            fn intersectBoundingSphere(self: *@This(), origin: @Vector(3, f32), direction: @Vector(3, f32), tmin: *f32, tmax: *f32) bool {
                const bounding = self.params.bounding;
                var hit: bool = false;
                const b: f32 = dot(origin, direction);
                const c: f32 = dot(origin, origin) - bounding;
                const disc: f32 = b * b - c;
                tmax.* = 0.0;
                const tmp1 = tmax.*;
                tmin.* = tmp1;
                if (disc > 0.0) {
                    const sdisc: f32 = sqrt(disc);
                    const t0: f32 = -b - sdisc;
                    const t1: f32 = -b + sdisc;
                    if (t0 >= 0.0) {
                        var min_dist: f32 = undefined;
                        const z: @Vector(3, f32) = origin + @as(@Vector(3, f32), @splat(t0)) * direction;
                        tmin.* = self.DE(z, &min_dist);
                        tmax.* = t0 + t1;
                    } else if (t0 < 0.0) {
                        var min_dist: f32 = undefined;
                        const z: @Vector(3, f32) = origin;
                        tmin.* = self.DE(z, &min_dist);
                        tmax.* = t1;
                    }
                    hit = true;
                }
                return hit;
            }

            fn estimate_normal(self: *@This(), z: @Vector(3, f32), e: f32) @Vector(3, f32) {
                var min_dst: f32 = undefined;
                const z1: @Vector(3, f32) = z + @Vector(3, f32){ e, 0.0, 0.0 };
                const z2: @Vector(3, f32) = z - @Vector(3, f32){ e, 0.0, 0.0 };
                const z3: @Vector(3, f32) = z + @Vector(3, f32){ 0.0, e, 0.0 };
                const z4: @Vector(3, f32) = z - @Vector(3, f32){ 0.0, e, 0.0 };
                const z5: @Vector(3, f32) = z + @Vector(3, f32){ 0.0, 0.0, e };
                const z6: @Vector(3, f32) = z - @Vector(3, f32){ 0.0, 0.0, e };
                const dx: f32 = self.DE(z1, &min_dst) - self.DE(z2, &min_dst);
                const dy: f32 = self.DE(z3, &min_dst) - self.DE(z4, &min_dst);
                const dz: f32 = self.DE(z5, &min_dst) - self.DE(z6, &min_dst);
                return normalize(@Vector(3, f32){ dx, dy, dz } / @as(@Vector(3, f32), @splat((2.0 * e))));
            }

            fn Phong(self: *@This(), pt: @Vector(3, f32), N: @Vector(3, f32), specular: *f32) @Vector(3, f32) {
                const light = self.params.light;
                const colorDiffuse = self.params.colorDiffuse;
                const colorAmbient = self.params.colorAmbient;
                const colorAmbientIntensity = self.params.colorAmbientIntensity;
                const colorLight = self.params.colorLight;
                const colorSpread = self.params.colorSpread;
                const rimLight = self.params.rimLight;
                const specularity = self.params.specularity;
                const specularExponent = self.params.specularExponent;
                const eye = self.eye;
                const objRotation = self.objRotation;
                var diffuse: @Vector(3, f32) = .{ 0.0, 0.0, 0.0 };
                const color: @Vector(3, f32) = .{ 0.0, 0.0, 0.0 };
                _ = color;
                specular.* = 0.0;
                const L: @Vector(3, f32) = normalize(@"V * M"(light, objRotation) - pt);
                const NdotL: f32 = dot(N, L);
                if (NdotL > 0.0) {
                    diffuse = colorDiffuse + abs(N) * @as(@Vector(3, f32), @splat(colorSpread));
                    diffuse *= colorLight * @as(@Vector(3, f32), @splat(NdotL));
                    const E: @Vector(3, f32) = normalize(eye - pt);
                    const R: @Vector(3, f32) = L - @as(@Vector(3, f32), @splat(2.0 * NdotL)) * N;
                    const RdE: f32 = dot(R, E);
                    if (RdE <= 0.0) {
                        specular.* = specularity * pow(abs(RdE), specularExponent);
                    }
                } else {
                    diffuse = colorDiffuse * @as(@Vector(3, f32), @splat(abs(NdotL))) * @as(@Vector(3, f32), @splat(rimLight));
                }
                return (colorAmbient * @as(@Vector(3, f32), @splat(colorAmbientIntensity))) + diffuse;
            }

            fn rayDirection(self: *@This(), p: @Vector(2, f32)) @Vector(3, f32) {
                const cameraZoom = self.params.cameraZoom;
                const size = self.params.size;
                const aspectRatio = self.aspectRatio;
                const viewRotation = self.viewRotation;
                const objRotation = self.objRotation;
                const direction: @Vector(3, f32) = .{
                    2.0 * aspectRatio * p[0] / @as(f32, @floatFromInt(size[0])) - aspectRatio,
                    -2.0 * p[1] / @as(f32, @floatFromInt(size[1])) + 1.0,
                    -2.0 * exp(cameraZoom),
                };
                return normalize(@"V * M"(@"V * M"(direction, viewRotation), objRotation));
            }

            fn renderPixel(self: *@This(), pixel: @Vector(2, f32)) @Vector(4, f32) {
                const phong = self.params.phong;
                const shadows = self.params.shadows;
                const ambientOcclusion = self.params.ambientOcclusion;
                const ambientOcclusionEmphasis = self.params.ambientOcclusionEmphasis;
                const bounding = self.params.bounding;
                const light = self.params.light;
                const colorBackground = self.params.colorBackground;
                const colorBackgroundTransparency = self.params.colorBackgroundTransparency;
                const colorDiffuse = self.params.colorDiffuse;
                const stepLimit = self.params.stepLimit;
                const epsilonScale = self.params.epsilonScale;
                const pixel_scale = self.pixel_scale;
                const eye = self.eye;
                const objRotation = self.objRotation;
                var tmin: f32 = undefined;
                var tmax: f32 = undefined;
                const ray_direction: @Vector(3, f32) = self.rayDirection(pixel);
                var color: @Vector(4, f32) = undefined;
                color = @shuffle(f32, color, colorBackground, @Vector(4, i32){ -1, -2, -3, 3 });
                color[3] = colorBackgroundTransparency;
                if (self.intersectBoundingSphere(eye, ray_direction, &tmin, &tmax)) {
                    var ray: @Vector(3, f32) = eye + @as(@Vector(3, f32), @splat(tmin)) * ray_direction;
                    var dist: f32 = undefined;
                    var ao: f32 = undefined;
                    var min_dist: f32 = 4.0;
                    var ray_length: f32 = tmin;
                    var eps: f32 = MIN_EPSILON;
                    const max_steps: i32 = @intFromFloat(@as(f32, @floatFromInt(stepLimit)) / epsilonScale);
                    var i: i32 = undefined;
                    var f: f32 = undefined;
                    {
                        i = 0;
                        while (i < max_steps) {
                            dist = self.DE(ray, &min_dist);
                            f = epsilonScale * dist;
                            ray += @as(@Vector(3, f32), @splat(f)) * ray_direction;
                            ray_length += f * dist;
                            if (dist < eps or ray_length > tmax) break;
                            eps = max(MIN_EPSILON, pixel_scale * ray_length);
                            i += 1;
                        }
                    }
                    if (dist < eps) {
                        ao = 1.0 - clamp(1.0 - min_dist * min_dist, 0.0, 1.0) * ambientOcclusion;
                        if (phong) {
                            const normal: @Vector(3, f32) = self.estimate_normal(ray, eps / 2.0);
                            var specular: f32 = 0.0;
                            color = @shuffle(f32, color, self.Phong(ray, normal, &specular), @Vector(4, i32){ -1, -2, -3, 3 });
                            if (shadows > 0.0) {
                                const light_direction: @Vector(3, f32) = normalize(@"V * M"((light - ray), objRotation));
                                ray += normal * @as(@Vector(3, f32), @splat(eps)) * @as(@Vector(3, f32), @splat(2.0));
                                var min_dist2: f32 = undefined;
                                dist = 4.0;
                                {
                                    var j: i32 = 0;
                                    while (j < max_steps) {
                                        dist = self.DE(ray, &min_dist2);
                                        f = epsilonScale * dist;
                                        ray += @as(@Vector(3, f32), @splat(f)) * light_direction;
                                        if (dist < eps or dot(ray, ray) > bounding * bounding) break;
                                        j += 1;
                                    }
                                }
                                if (dist < eps) {
                                    color = @shuffle(f32, color, @shuffle(f32, color, undefined, @Vector(3, i32){ 0, 1, 2 }) * @as(@Vector(3, f32), @splat(1.0 - shadows)), @Vector(4, i32){ -1, -2, -3, 3 });
                                } else {
                                    color = @shuffle(f32, color, @shuffle(f32, color, undefined, @Vector(3, i32){ 0, 1, 2 }) + @as(@Vector(3, f32), @splat(specular)), @Vector(4, i32){ -1, -2, -3, 3 });
                                }
                            } else {
                                color = @shuffle(f32, color, @shuffle(f32, color, undefined, @Vector(3, i32){ 0, 1, 2 }) + @as(@Vector(3, f32), @splat(specular)), @Vector(4, i32){ -1, -2, -3, 3 });
                            }
                        } else {
                            color = @shuffle(f32, color, colorDiffuse, @Vector(4, i32){ -1, -2, -3, 3 });
                        }
                        ao *= 1.0 - (@as(f32, @floatFromInt(i)) / @as(f32, @floatFromInt(max_steps))) * ambientOcclusionEmphasis * 2.0;
                        color = @shuffle(f32, color, @shuffle(f32, color, undefined, @Vector(3, i32){ 0, 1, 2 }) * @as(@Vector(3, f32), @splat(ao)), @Vector(4, i32){ -1, -2, -3, 3 });
                        color[3] = 1.0;
                    }
                }
                return clamp(color, 0.0, 1.0);
            }

            pub fn evaluateDependents(self: *@This()) void {
                const antialiasing = self.params.antialiasing;
                const cameraPosition = self.params.cameraPosition;
                const cameraPositionFine = self.params.cameraPositionFine;
                const cameraRotation = self.params.cameraRotation;
                const rotation = self.params.rotation;
                const size = self.params.size;
                self.aspectRatio = @as(f32, @floatFromInt(size[0])) / @as(f32, @floatFromInt(size[1]));
                var c1: f32 = cos(radians(-cameraRotation[0]));
                var s1: f32 = sin(radians(-cameraRotation[0]));
                const viewRotationY: [3]@Vector(3, f32) = .{
                    .{ c1, 0.0, s1 },
                    .{ 0.0, 1.0, 0.0 },
                    .{ -s1, 0.0, c1 },
                };
                var c2: f32 = cos(radians(-cameraRotation[1]));
                var s2: f32 = sin(radians(-cameraRotation[1]));
                const viewRotationZ: [3]@Vector(3, f32) = .{
                    .{ c2, -s2, 0.0 },
                    .{ s2, c2, 0.0 },
                    .{ 0.0, 0.0, 1.0 },
                };
                var c3: f32 = cos(radians(-cameraRotation[2]));
                var s3: f32 = sin(radians(-cameraRotation[2]));
                const viewRotationX: [3]@Vector(3, f32) = .{
                    .{ 1.0, 0.0, 0.0 },
                    .{ 0.0, c3, -s3 },
                    .{ 0.0, s3, c3 },
                };
                self.viewRotation = @"M * M"(@"M * M"(viewRotationX, viewRotationY), viewRotationZ);
                c1 = cos(radians(-rotation[0]));
                s1 = sin(radians(-rotation[0]));
                const objRotationY: [3]@Vector(3, f32) = .{
                    .{ c1, 0.0, s1 },
                    .{ 0.0, 1.0, 0.0 },
                    .{ -s1, 0.0, c1 },
                };
                c2 = cos(radians(-rotation[1]));
                s2 = sin(radians(-rotation[1]));
                const objRotationZ: [3]@Vector(3, f32) = .{
                    .{ c2, -s2, 0.0 },
                    .{ s2, c2, 0.0 },
                    .{ 0.0, 0.0, 1.0 },
                };
                c3 = cos(radians(-rotation[2]));
                s3 = sin(radians(-rotation[2]));
                const objRotationX: [3]@Vector(3, f32) = .{
                    .{ 1.0, 0.0, 0.0 },
                    .{ 0.0, c3, -s3 },
                    .{ 0.0, s3, c3 },
                };
                self.objRotation = @"M * M"(@"M * M"(objRotationX, objRotationY), objRotationZ);
                self.eye = (cameraPosition + cameraPositionFine);
                if (@reduce(.And, self.eye == @Vector(3, f32){ 0.0, 0.0, 0.0 })) {
                    self.eye = @Vector(3, f32){ 0.0, 0.0001, 0.0 };
                }
                self.eye = @"V * M"(self.eye, self.objRotation);
                self.sampleStep = 1.0 / @as(f32, @floatFromInt(antialiasing));
                self.sampleContribution = 1.0 / pow(@as(f32, @floatFromInt(antialiasing)), 2.0);
                self.pixel_scale = 1.0 / max(@as(f32, @floatFromInt(size[0])), @as(f32, @floatFromInt(size[1])));
            }

            pub fn evaluatePixel(self: *@This()) void {
                const antialiasing = self.params.antialiasing;
                const dst = self.output.dst;
                const sampleStep = self.sampleStep;
                const sampleContribution = self.sampleContribution;
                self.dst = @splat(0.0);

                var color: @Vector(4, f32) = .{ 0.0, 0.0, 0.0, 0.0 };
                if (antialiasing > 1) {
                    {
                        var i: f32 = 0.0;
                        while (i < 1.0) {
                            var j: f32 = 0.0;
                            while (j < 1.0) {
                                color += @as(@Vector(4, f32), @splat(sampleContribution)) * self.renderPixel(@Vector(2, f32){
                                    self.outCoord()[0] + i,
                                    self.outCoord()[1] + j,
                                });
                                j += sampleStep;
                            }
                            i += sampleStep;
                        }
                    }
                } else {
                    color = self.renderPixel(self.outCoord());
                }
                self.dst = color;

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
    fn radians(v: anytype) @TypeOf(v) {
        const multiplier = std.math.pi / 180.0;
        return switch (@typeInfo(@TypeOf(v))) {
            .vector => v * @as(@TypeOf(v), @splat(multiplier)),
            else => v * multiplier,
        };
    }

    fn sin(v: anytype) @TypeOf(v) {
        return @sin(v);
    }

    fn cos(v: anytype) @TypeOf(v) {
        return @cos(v);
    }

    fn asin(v: anytype) @TypeOf(v) {
        return switch (@typeInfo(@TypeOf(v))) {
            .vector => calc: {
                var result: @TypeOf(v) = undefined;
                inline for (0..@typeInfo(@TypeOf(v)).vector.len) |i| {
                    result[i] = asin(v[i]);
                }
                break :calc result;
            },
            else => std.math.asin(v),
        };
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

    fn exp(v: anytype) @TypeOf(v) {
        return @exp(v);
    }

    fn log(v: anytype) @TypeOf(v) {
        return @log(v);
    }

    fn sqrt(v: anytype) @TypeOf(v) {
        return @sqrt(v);
    }

    fn abs(v: anytype) @TypeOf(v) {
        return @abs(v);
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

    fn clamp(v: anytype, min_val: anytype, max_val: anytype) @TypeOf(v) {
        return switch (@typeInfo(@TypeOf(min_val))) {
            .vector => calc: {
                const T = @typeInfo(@TypeOf(v)).vector.child;
                const result1 = @select(T, v < min_val, min_val, v);
                const result2 = @select(T, result1 > max_val, max_val, result1);
                break :calc result2;
            },
            else => switch (@typeInfo(@TypeOf(v))) {
                .vector => clamp(v, @as(@TypeOf(v), @splat(min_val)), @as(@TypeOf(v), @splat(max_val))),
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

    fn normalize(v: anytype) @TypeOf(v) {
        return switch (@typeInfo(@TypeOf(v))) {
            .vector => v / @as(@TypeOf(v), @splat(@sqrt(@reduce(.Add, v * v)))),
            else => if (v > 0) 1 else -1,
        };
    }

    fn @"M * M"(m1: anytype, m2: anytype) @TypeOf(m1) {
        const ar = @typeInfo(@TypeOf(m2)).array;
        var result: @TypeOf(m2) = undefined;
        inline for (0..ar.len) |r| {
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
                .float => pbPixelFromFloatPixel(src_pixel),
                .int => pbPixelFromIntPixel(src_pixel),
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
                .float => floatPixelFromPBPixel(pixel),
                .int => intPixelFromPBPixel(pixel),
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
            .default_value_ptr = @ptrCast(&default_value),
            .is_comptime = false,
            .alignment = @alignOf(ImageT),
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
            .default_value_ptr = @ptrCast(&default_value),
            .is_comptime = false,
            .alignment = @alignOf(ImageT),
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

pub usingnamespace switch (@import("builtin").single_threaded) {
    false => async_support,
    true => struct {},
};

const async_support = struct {
    const builtin = @import("builtin");
    const zigar = @import("zigar");
    const Allocator = std.mem.Allocator;
    const Promise = zigar.function.PromiseOf(thread_ns.processSlice);
    const AbortSignal = zigar.function.AbortSignal;
    const WorkQueue = zigar.thread.WorkQueue;

    var work_queue: WorkQueue(thread_ns) = .{};
    var gpa = switch (builtin.target.cpu.arch.isWasm()) {
        true => {},
        false => std.heap.DebugAllocator(.{}){},
    };
    const internal_allocator = switch (builtin.target.cpu.arch.isWasm()) {
        true => std.heap.wasm_allocator,
        false => gpa.allocator(),
    };

    pub fn startThreadPool(count: u32) !void {
        try work_queue.init(.{
            .allocator = internal_allocator,
            .stack_size = 65536,
            .n_jobs = count,
        });
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
        const multipart_promise = try promise.partition(internal_allocator, slices);
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
