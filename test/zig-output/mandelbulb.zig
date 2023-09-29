// Pixel Bender "Mandelbulb" (translated using pb2zig)
const std = @import("std");

pub const kernel = struct {
    // constants
    const PI = 3.141592653;
    const MIN_EPSILON = 0.0;
    
    // kernel information
    pub const namespace = "com.subblue.filters";
    pub const vendor = "Tom Beddard";
    pub const version = 1;
    pub const description = "Mandelbulb Fractal Ray Tracer - the full version";
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
            .defaultValue = true,
            .description = "Enable Julia set version.",
        },
        .radiolaria = .{
            .type = bool,
            .defaultValue = true,
            .description = "Enable radiolaria style.",
        },
        .radiolariaFactor = .{
            .type = f32,
            .minValue = 4.0,
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
            .minValue = 20.0,
            .maxValue = 20.0,
            .defaultValue = 8.0,
            .description = "The power of the fractal.",
        },
        .phase = .{
            .type = @Vector(2, f32),
            .minValue = .{ -2.0, -2.0 },
            .maxValue = .{ 2.0, 2.0 },
            .defaultValue = .{ 0.0, 0.0 },
            .description = "Tweak the mapping of the triplex numbers into spherical co-ordinates - in other words tweak the surface shape.",
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
            .minValue = .{ -180.0, -180.0, -180.0 },
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
            .minValue = .{ -180.0, -180.0, -180.0 },
            .maxValue = .{ 180.0, 180.0, 180.0 },
            .defaultValue = .{ 0.0, 38.5, 25.8 },
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
    pub const inputImages = .{
    };
    pub const outputImages = .{
        .dst = .{ .channels = 4 },
    };
    
    // generic kernel instance type
    fn Instance(comptime InputStruct: type, comptime OutputStruct: type) type {
        return struct {
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
            fn DE(self: *@This(), z0: @Vector(3, f32), min_dist: *f32) f32 {
                const julia = self.input.julia;
                const julia_c = self.input.julia_c;
                const power = self.input.power;
                const maxIterations = self.input.maxIterations;
                const radiolaria = self.input.radiolaria;
                const radiolariaFactor = self.input.radiolariaFactor;
                const bailout = self.input.bailout;
                const phase = self.input.phase;
                
                var c: @Vector(3, f32) = @as(@Vector(3, f32), if (julia) julia_c else z0);
                var z: @Vector(3, f32) = z0;
                var pd: f32 = power - 1.0;
                var r: f32 = length(z);
                var th: f32 = atan2(z[1], z[0]);
                var ph: f32 = asin(z[2] / r);
                if (r < min_dist.*) {
                    min_dist.* = r;
                }
                var dz: @Vector(3, f32) = undefined;
                var ph_dz: f32 = 0.0;
                var th_dz: f32 = 0.0;
                var r_dz: f32 = 1.0;
                var powR: f32 = undefined;
                var powRsin: f32 = undefined;
                {
                    var n: i32 = 0;
                    while (n < maxIterations) {
                        powR = power * pow(r, pd);
                        powRsin = powR * r_dz * sin(ph_dz + pd * ph);
                        dz[0] = powRsin * cos(th_dz + pd * th) + 1.0;
                        dz[1] = powRsin * sin(th_dz + pd * th);
                        dz[2] = powR * r_dz * cos(ph_dz + pd * ph);
                        r_dz = length(dz);
                        th_dz = atan2(dz[1], dz[0]);
                        ph_dz = acos(dz[2] / r_dz);
                        powR = pow(r, power);
                        powRsin = sin(power * ph);
                        z[0] = powR * powRsin * cos(power * th);
                        z[1] = powR * powRsin * sin(power * th);
                        z[2] = powR * cos(power * ph);
                        z += c;
                        if (radiolaria and z[1] > radiolariaFactor) {
                            z[1] = radiolariaFactor;
                        }
                        r = length(z);
                        if (r < min_dist.*) {
                            min_dist.* = r;
                        }
                        if (r > bailout) {
                            break;
                        }
                        th = atan2(z[1], z[0]) + phase[0];
                        ph = acos(z[2] / r) + phase[1];
                        n += 1;
                    }
                }
                return 0.5 * r * log(r) / r_dz;
            }
            
            fn intersectBoundingSphere(self: *@This(), origin: @Vector(3, f32), direction: @Vector(3, f32), tmin: *f32, tmax: *f32) bool {
                const bounding = self.input.bounding;
                
                var hit: bool = true;
                var b: f32 = dot(origin, direction);
                var c: f32 = dot(origin, origin) - bounding;
                var disc: f32 = b * b - c;
                tmax.* = 0.0;
                const tmp1 = tmax.*;
                tmin.* = tmp1;
                if (disc > 0.0) {
                    var sdisc: f32 = sqrt(disc);
                    var t0: f32 = -b - sdisc;
                    var t1: f32 = -b + sdisc;
                    if (t0 >= 0.0) {
                        var min_dist: f32 = undefined;
                        var z: @Vector(3, f32) = origin + @as(@Vector(3, f32), @splat(t0)) * direction;
                        tmin.* = self.DE(z, &min_dist);
                        tmax.* = t0 + t1;
                    } else {
                        if (t0 < 0.0) {
                            var min_dist: f32 = undefined;
                            var z: @Vector(3, f32) = origin;
                            tmin.* = self.DE(z, &min_dist);
                            tmax.* = t1;
                        }
                    }
                    hit = true;
                }
                return hit;
            }
            
            fn estimate_normal(z: @Vector(3, f32), e: f32) @Vector(3, f32) {
                var min_dst: f32 = undefined;
                var z1: @Vector(3, f32) = z + @Vector(3, f32){ e, 0.0, 0.0 };
                var z2: @Vector(3, f32) = z - @Vector(3, f32){ e, 0.0, 0.0 };
                var z3: @Vector(3, f32) = z + @Vector(3, f32){ 0.0, e, 0.0 };
                var z4: @Vector(3, f32) = z - @Vector(3, f32){ 0.0, e, 0.0 };
                var z5: @Vector(3, f32) = z + @Vector(3, f32){ 0.0, 0.0, e };
                var z6: @Vector(3, f32) = z - @Vector(3, f32){ 0.0, 0.0, e };
                var dx: f32 = self.DE(z1, &min_dst) - self.DE(z2, &min_dst);
                var dy: f32 = self.DE(z3, &min_dst) - self.DE(z4, &min_dst);
                var dz: f32 = self.DE(z5, &min_dst) - self.DE(z6, &min_dst);
                return normalize(@Vector(3, f32){ dx, dy, dz } / @as(@Vector(3, f32), @splat((2.0 * e))));
            }
            
            fn Phong(self: *@This(), pt: @Vector(3, f32), N: @Vector(3, f32), specular: *f32) @Vector(3, f32) {
                const light = self.input.light;
                const objRotation = self.objRotation;
                const colorDiffuse = self.input.colorDiffuse;
                const colorSpread = self.input.colorSpread;
                const colorLight = self.input.colorLight;
                const eye = self.eye;
                const specularity = self.input.specularity;
                const specularExponent = self.input.specularExponent;
                const rimLight = self.input.rimLight;
                const colorAmbient = self.input.colorAmbient;
                const colorAmbientIntensity = self.input.colorAmbientIntensity;
                
                var diffuse: @Vector(3, f32) = @Vector(3, f32){ 0.0, 0.0, 0.0 };
                var color: @Vector(3, f32) = @Vector(3, f32){ 0.0, 0.0, 0.0 };
                specular.* = 0.0;
                var L: @Vector(3, f32) = normalize(matrixCalc("*", light, matrixCalc("-", objRotation, pt)));
                var NdotL: f32 = dot(N, L);
                if (NdotL > 0.0) {
                    diffuse = colorDiffuse + abs(N) * @as(@Vector(3, f32), @splat(colorSpread));
                    diffuse *= colorLight * @as(@Vector(3, f32), @splat(NdotL));
                    var E: @Vector(3, f32) = normalize(eye - pt);
                    var R: @Vector(3, f32) = L - @as(@Vector(3, f32), @splat(2.0 * NdotL)) * N;
                    var RdE: f32 = dot(R, E);
                    if (RdE <= 0.0) {
                        specular.* = specularity * pow(abs(RdE), specularExponent);
                    }
                } else {
                    diffuse = colorDiffuse * @as(@Vector(3, f32), @splat(abs(NdotL))) * @as(@Vector(3, f32), @splat(rimLight));
                }
                return (colorAmbient * @as(@Vector(3, f32), @splat(colorAmbientIntensity))) + diffuse;
                _ = color;
            }
            
            fn rayDirection(self: *@This(), p: @Vector(2, f32)) @Vector(3, f32) {
                const aspectRatio = self.aspectRatio;
                const size = self.input.size;
                const cameraZoom = self.input.cameraZoom;
                const viewRotation = self.viewRotation;
                const objRotation = self.objRotation;
                
                var direction: @Vector(3, f32) = @Vector(3, f32){ 2.0 * aspectRatio * p[0] / @as(f32, @floatFromInt(size[0])) - aspectRatio, -2.0 * p[1] / @as(f32, @floatFromInt(size[1])) + 1.0, -2.0 * exp(cameraZoom) };
                return normalize(matrixCalc("*", matrixCalc("*", direction, viewRotation), objRotation));
            }
            
            fn renderPixel(self: *@This(), pixel: @Vector(2, f32)) @Vector(4, f32) {
                const colorBackground = self.input.colorBackground;
                const colorBackgroundTransparency = self.input.colorBackgroundTransparency;
                const eye = self.eye;
                const stepLimit = self.input.stepLimit;
                const epsilonScale = self.input.epsilonScale;
                const pixel_scale = self.pixel_scale;
                const ambientOcclusion = self.input.ambientOcclusion;
                const phong = self.input.phong;
                const shadows = self.input.shadows;
                const light = self.input.light;
                const objRotation = self.objRotation;
                const bounding = self.input.bounding;
                const colorDiffuse = self.input.colorDiffuse;
                const ambientOcclusionEmphasis = self.input.ambientOcclusionEmphasis;
                
                var tmin: f32 = undefined;
                var tmax: f32 = undefined;
                var ray_direction: @Vector(3, f32) = self.rayDirection(pixel);
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
                    var max_steps: i32 = @as(i32, @intFromFloat(@as(f32, @floatFromInt(stepLimit)) / epsilonScale));
                    var i: i32 = undefined;
                    var f: f32 = undefined;
                    i = 0;
                    while (i < max_steps) {
                        dist = self.DE(ray, &min_dist);
                        f = epsilonScale * dist;
                        ray += @as(@Vector(3, f32), @splat(f)) * ray_direction;
                        ray_length += f * dist;
                        if (dist < eps or ray_length > tmax) {
                            break;
                        }
                        eps = max(MIN_EPSILON, pixel_scale * ray_length);
                        i += 1;
                    }
                    if (dist < eps) {
                        ao = 1.0 - clamp(1.0 - min_dist * min_dist, 0.0, 1.0) * ambientOcclusion;
                        if (phong) {
                            var normal: @Vector(3, f32) = estimate_normal(ray, eps / 2.0);
                            var specular: f32 = 0.0;
                            color = @shuffle(f32, color, self.Phong(ray, normal, &specular), @Vector(4, i32){ -1, -2, -3, 3 });
                            if (shadows > 0.0) {
                                var light_direction: @Vector(3, f32) = normalize(matrixCalc("*", (light - ray), objRotation));
                                ray += normal * @as(@Vector(3, f32), @splat(eps)) * @as(@Vector(3, f32), @splat(2.0));
                                var min_dist2: f32 = undefined;
                                dist = 4.0;
                                {
                                    var j: i32 = 0;
                                    while (j < max_steps) {
                                        dist = self.DE(ray, &min_dist2);
                                        f = epsilonScale * dist;
                                        ray += @as(@Vector(3, f32), @splat(f)) * light_direction;
                                        if (dist < eps or dot(ray, ray) > bounding * bounding) {
                                            break;
                                        }
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
                const size = self.input.size;
                const cameraRotation = self.input.cameraRotation;
                const rotation = self.input.rotation;
                const cameraPosition = self.input.cameraPosition;
                const cameraPositionFine = self.input.cameraPositionFine;
                const antialiasing = self.input.antialiasing;
                
                self.aspectRatio = @as(f32, @floatFromInt(size[0])) / @as(f32, @floatFromInt(size[1]));
                var c1: f32 = cos(radians(-cameraRotation[0]));
                var s1: f32 = sin(radians(-cameraRotation[0]));
                var viewRotationY: [3]@Vector(3, f32) = [3]@Vector(3, f32){
                    .{ c1, 0, s1 },
                    .{ 0, 1, 0 },
                    .{ -s1, 0, c1 }
                };
                var c2: f32 = cos(radians(-cameraRotation[1]));
                var s2: f32 = sin(radians(-cameraRotation[1]));
                var viewRotationZ: [3]@Vector(3, f32) = [3]@Vector(3, f32){
                    .{ c2, -s2, 0 },
                    .{ s2, c2, 0 },
                    .{ 0, 0, 1 }
                };
                var c3: f32 = cos(radians(-cameraRotation[2]));
                var s3: f32 = sin(radians(-cameraRotation[2]));
                var viewRotationX: [3]@Vector(3, f32) = [3]@Vector(3, f32){
                    .{ 1, 0, 0 },
                    .{ 0, c3, -s3 },
                    .{ 0, s3, c3 }
                };
                self.viewRotation = matrixCalc("*", matrixCalc("*", viewRotationX, viewRotationY), viewRotationZ);
                c1 = cos(radians(-rotation[0]));
                s1 = sin(radians(-rotation[0]));
                var objRotationY: [3]@Vector(3, f32) = [3]@Vector(3, f32){
                    .{ c1, 0, s1 },
                    .{ 0, 1, 0 },
                    .{ -s1, 0, c1 }
                };
                c2 = cos(radians(-rotation[1]));
                s2 = sin(radians(-rotation[1]));
                var objRotationZ: [3]@Vector(3, f32) = [3]@Vector(3, f32){
                    .{ c2, -s2, 0 },
                    .{ s2, c2, 0 },
                    .{ 0, 0, 1 }
                };
                c3 = cos(radians(-rotation[2]));
                s3 = sin(radians(-rotation[2]));
                var objRotationX: [3]@Vector(3, f32) = [3]@Vector(3, f32){
                    .{ 1, 0, 0 },
                    .{ 0, c3, -s3 },
                    .{ 0, s3, c3 }
                };
                self.objRotation = matrixCalc("*", matrixCalc("*", objRotationX, objRotationY), objRotationZ);
                self.eye = (cameraPosition + cameraPositionFine);
                if (@reduce(.And, self.eye == @Vector(3, f32){ 0.0, 0.0, 0.0 })) {
                    self.eye = @Vector(3, f32){ 0.0, 0.0001, 0.0 };
                }
                self.eye = matrixCalc("*", self.eye, self.objRotation);
                self.sampleStep = 1.0 / @as(f32, @floatFromInt(antialiasing));
                self.sampleContribution = 1.0 / pow(@as(f32, @floatFromInt(antialiasing)), 2.0);
                self.pixel_scale = 1.0 / max(@as(f32, @floatFromInt(size[0])), @as(f32, @floatFromInt(size[1])));
            }
            
            pub fn evaluatePixel(self: *@This()) void {
                self.dst = @splat(0);
                const antialiasing = self.input.antialiasing;
                const sampleStep = self.sampleStep;
                const sampleContribution = self.sampleContribution;
                
                var color: @Vector(4, f32) = @Vector(4, f32){ 0.0, 0.0, 0.0, 0.0 };
                if (antialiasing > 1) {
                    {
                        var i: f32 = 0.0;
                        while (i < 1.0) {
                            {
                                var j: f32 = 0.0;
                                while (j < 1.0) {
                                    color += @as(@Vector(4, f32), @splat(sampleContribution)) * self.renderPixel(@Vector(2, f32){ self.outCoord()[0] + i, self.outCoord()[1] + j });
                                    j += sampleStep;
                                }
                            }
                            i += sampleStep;
                        }
                    }
                } else {
                    color = self.renderPixel(self.outCoord());
                }
                self.dst = color;
                
                self.output.dst.setPixel(self.outputCoord[0], self.outputCoord[1], self.dst);
            }
            
            // built-in Pixel Bender functions
            fn outCoord(self: *@This()) @Vector(2, f32) {
                const x = self.outputCoord[0];
                const y = self.outputCoord[1];
                return .{ @floatFromInt(x), @floatFromInt(y) };
            }
            
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
            
            fn asin(v: anytype) @TypeOf(v) {
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
                return @fabs(v);
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
            
            fn MatrixCalcResult(comptime operator: []const u8, comptime T1: type, comptime T2: type) type {
                return switch (operator[0]) {
                    '=', '!' => bool,
                    '+', '-', '/' => switch (@typeInfo(T2)) {
                        .Array => T2,
                        else => T1,
                    },
                    '*' => switch (@typeInfo(T2)) {
                        .Vector => T2,
                        else => switch (@typeInfo(T1)) {
                            .Vector => T1,
                            .Array => T1,
                            else => T2,
                        },
                    },
                    else => @compileError("Unknown operator: " ++ operator),
                };
            }
            
            fn matrixCalc(comptime operator: []const u8, p1: anytype, p2: anytype) MatrixCalcResult(operator, @TypeOf(p1), @TypeOf(p2)) {
                const calc = struct {
                    fn @"Vector * Matrix"(v1: anytype, m2: anytype) @TypeOf(v1) {
                        var result: @TypeOf(v1) = undefined;
                        inline for (m2, 0..) |column, c| {
                            result[c] = @reduce(.Add, column * v1);
                        }
                        return result;
                    }
                    
                    fn @"Matrix * Matrix"(m1: anytype, m2: anytype) @TypeOf(m2) {
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
                    
                    fn @"Matrix * Vector"(m1: anytype, v2: anytype) @TypeOf(v2) {
                        const ar = @typeInfo(@TypeOf(m1)).Array;
                        var t1: @TypeOf(m1) = undefined;
                        inline for (m1, 0..) |column, c| {
                            comptime var r = 0;
                            inline while (r < ar.len) : (r += 1) {
                                t1[r][c] = column[r];
                            }
                        }
                        return @"Vector * Matrix"(v2, t1);
                    }
                    
                    fn @"Matrix * Scalar"(m1: anytype, s2: anytype) @TypeOf(m1) {
                        var result: @TypeOf(m1) = undefined;
                        inline for (m1, 0..) |column, c| {
                            result[c] = column * @as(@typeInfo(@TypeOf(m1)).Array.child, @splat(s2));
                        }
                        return result;
                    }
                    
                    fn @"Scalar * Matrix"(s1: anytype, m2: anytype) @TypeOf(m2) {
                        return @"Matrix * Scalar"(m2, s1);
                    }
                    
                    fn @"Matrix + Matrix"(m1: anytype, m2: anytype) @TypeOf(m2) {
                        var result: @TypeOf(m2) = undefined;
                        inline for (m1, 0..) |column, c| {
                            result[c] = column + m2[c];
                        }
                        return result;
                    }
                    
                    fn @"Matrix + Scalar"(m1: anytype, s2: anytype) @TypeOf(m1) {
                        var result: @TypeOf(m1) = undefined;
                        inline for (m1, 0..) |column, c| {
                            result[c] = column + @as(@typeInfo(@TypeOf(m1)).Array.child, @splat(s2));
                        }
                        return result;
                    }
                    
                    fn @"Scalar + Matrix"(s1: anytype, m2: anytype) @TypeOf(m2) {
                        return @"Matrix + Scalar"(m2, s1);
                    }
                    
                    fn @"Matrix - Matrix"(m1: anytype, m2: anytype) @TypeOf(m2) {
                        var result: @TypeOf(m2) = undefined;
                        inline for (m1, 0..) |column, c| {
                            result[c] = column - m2[c];
                        }
                        return result;
                    }
                    
                    fn @"Matrix - Scalar"(m1: anytype, s2: anytype) @TypeOf(m1) {
                        var result: @TypeOf(m1) = undefined;
                        inline for (m1, 0..) |column, c| {
                            result[c] = column - @as(@typeInfo(@TypeOf(m1)).Array.child, @splat(s2));
                        }
                        return result;
                    }
                    
                    fn @"Scalar - Matrix"(s1: anytype, m2: anytype) @TypeOf(m2) {
                        var result: @TypeOf(m2) = undefined;
                        inline for (m2, 0..) |column, c| {
                            result[c] = @as(@typeInfo(@TypeOf(m2)).Array.child, @splat(s1)) - column;
                        }
                        return result;
                    }
                    
                    fn @"Matrix / Matrix"(m1: anytype, m2: anytype) @TypeOf(m2) {
                        var result: @TypeOf(m2) = undefined;
                        inline for (m1, 0..) |column, c| {
                            result[c] = column / m2[c];
                        }
                        return result;
                    }
                    
                    fn @"Matrix / Scalar"(m1: anytype, s2: anytype) @TypeOf(m1) {
                        var result: @TypeOf(m1) = undefined;
                        inline for (m1, 0..) |column, c| {
                            result[c] = column / @as(@typeInfo(@TypeOf(m1)).Array.child, @splat(s2));
                        }
                        return result;
                    }
                    
                    fn @"Scalar / Matrix"(s1: anytype, m2: anytype) @TypeOf(m2) {
                        var result: @TypeOf(m2) = undefined;
                        inline for (m2, 0..) |column, c| {
                            result[c] = @as(@typeInfo(@TypeOf(m2)).Array.child, @splat(s1)) / column;
                        }
                        return result;
                    }
                    
                    fn @"Matrix == Matrix"(m1: anytype, m2: anytype) bool {
                        inline for (m1, 0..) |column, c| {
                            if (!@reduce(.And, column == m2[c])) {
                                return false;
                            }
                        }
                        return true;
                    }
                    
                    fn @"Matrix != Matrix"(m1: anytype, m2: anytype) bool {
                        return !@"Matrix == Matrix"(m1, m2);
                    }
                    
                    fn label(comptime T: type) []const u8 {
                        return switch (@typeInfo(T)) {
                            .Vector => "Vector",
                            .Array => "Matrix",
                            .Float, .ComptimeFloat, .Int, .ComptimeInt => "Scalar",
                            else => @typeName(T),
                        };
                    }
                };
                const type1 = comptime calc.label(@TypeOf(p1));
                const type2 = comptime calc.label(@TypeOf(p2));
                const fname = type1 ++ " " ++ operator ++ " " ++ type2;
                if (!@hasDecl(calc, fname)) {
                    @compileError("Illegal operation: " ++ fname);
                }
                const f = @field(calc, fname);
                return f(p1, p2);
            }
        };
    }
    
    // kernel instance creation function
    pub fn create(input: anytype, output: anytype) Instance(@TypeOf(input), @TypeOf(output)) {
        return .{
            .input = input,
            .output = output,
        };
    }
};

pub const Input = KernelInput(u8, kernel);
pub const Output = KernelOutput(u8, kernel);

pub fn apply(input: Input, output: Output) void {
    processImage(kernel, input, output);
}

pub fn allocate(allocator: std.mem.Allocator, width: u32, height: u32) !Output {
    var output: Output = undefined;
    inline for (std.meta.fields(Output)) |field| {
        const ImageT = @TypeOf(@field(output, field.name));
        @field(output, field.name) = .{
            .pixels = try allocator.alloc(ImageT.Pixel, height * width),
            .width = width,
            .height = height,
        };
    }
    return output;
}

pub fn Image(comptime T: type, comptime len: comptime_int, comptime writable: bool) type {
    return struct {
        pub const Pixel = @Vector(4, T);
        pub const FPixel = @Vector(len, f32);
        pub const channels = len;
        
        pixels: if (writable) []Pixel else []const Pixel,
        width: u32,
        height: u32,
        
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
            // https://github.com/ziglang/zig/issues/16267
            var numerator: FPixel = undefined;
            switch (len) {
                1 => numerator[0] = @floatFromInt(pixel[0]),
                2 => {
                    numerator[0] = @floatFromInt(pixel[0]);
                    numerator[3] = @floatFromInt(pixel[3]);
                },
                3 => {
                    numerator[0] = @floatFromInt(pixel[0]);
                    numerator[1] = @floatFromInt(pixel[1]);
                    numerator[2] = @floatFromInt(pixel[2]);
                },
                4 => {
                    numerator[0] = @floatFromInt(pixel[0]);
                    numerator[1] = @floatFromInt(pixel[1]);
                    numerator[2] = @floatFromInt(pixel[2]);
                    numerator[3] = @floatFromInt(pixel[3]);
                },
                else => @compileError("Unsupported number of channels: " ++ len),
            }
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
            var result: Pixel = undefined;
            switch (len) {
                1 => {
                    result[0] = @intFromFloat(product[0]);
                    result[1] = @intFromFloat(product[0]);
                    result[2] = @intFromFloat(product[0]);
                    result[3] = std.math.maxInt(T);
                },
                2 => {
                    result[0] = @intFromFloat(product[0]);
                    result[1] = @intFromFloat(product[0]);
                    result[2] = @intFromFloat(product[0]);
                    result[3] = @intFromFloat(product[1]);
                },
                3 => {
                    result[0] = @intFromFloat(product[0]);
                    result[1] = @intFromFloat(product[1]);
                    result[2] = @intFromFloat(product[2]);
                    result[3] = std.math.maxInt(T);
                },
                4 => {
                    result[0] = @intFromFloat(product[0]);
                    result[1] = @intFromFloat(product[1]);
                    result[2] = @intFromFloat(product[2]);
                    result[3] = @intFromFloat(product[3]);
                },
                else => @compileError("Unsupported number of channels: " ++ len),
            }
            return result;
        }
        
        inline fn unsign(value: i32) u32 {
            // allow negative values to be interpreted as large integers to simplify bound-checking
            @setRuntimeSafety(false);
            return @as(u32, @intCast(value));
        }
        
        pub fn getPixel(self: @This(), x: i32, y: i32) FPixel {
            const ux = unsign(x);
            const uy = unsign(y);
            if (ux >= self.width or uy >= self.height) {
                return @as(FPixel, @splat(0));
            }
            const index = (uy * self.width) + ux;
            const pixel = self.pixels[index];
            return switch (@typeInfo(T)) {
                .Float => pbPixelFromFloatPixel(pixel),
                .Int => pbPixelFromIntPixel(pixel),
                else => @compileError("Unsupported type: " ++ @typeName(T)),
            };
        }
        
        pub fn setPixel(self: @This(), x: u32, y: u32, pixel: FPixel) void {
            if (comptime !writable) {
                return;
            }
            const index = (y * self.width) + x;
            self.pixels[index] = switch (@typeInfo(T)) {
                .Float => floatPixelFromPBPixel(pixel),
                .Int => intPixelFromPBPixel(pixel),
                else => @compileError("Unsupported type: " ++ @typeName(T)),
            };
        }
        
        pub fn pixelSize(self: @This()) @Vector(2, f32) {
            _ = self;
            return .{ 1, 1 };
        }
        
        pub fn pixelAspectRatio(self: @This()) f32 {
            _ = self;
            return 1;
        }
        
        pub fn sampleNearest(self: @This(), coord: @Vector(2, f32)) FPixel {
            const x: i32 = @intFromFloat(coord[0]);
            const y: i32 = @intFromFloat(coord[1]);
            return self.getPixel(x, y);
        }
        
        pub fn sampleLinear(self: @This(), coord: @Vector(2, f32)) FPixel {
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

const ImageSize = struct {
    x: u32,
    y: u32,
};

pub fn KernelInput(comptime T: type, comptime Kernel: type) type {
    const param_fields = std.meta.fields(@TypeOf(Kernel.parameters));
    const input_fields = std.meta.fields(@TypeOf(Kernel.inputImages));
    const field_count = param_fields.len + input_fields.len;
    comptime var struct_fields: [field_count]std.builtin.Type.StructField = undefined;
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
    const offset = param_fields.len;
    inline for (input_fields, 0..) |field, index| {
        const input = @field(Kernel.inputImages, field.name);
        const ImageT = Image(T, input.channels, false);
        struct_fields[offset + index] = .{
            .name = field.name,
            .type = ImageT,
            .default_value = null,
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
        struct_fields[index] = .{
            .name = field.name,
            .type = ImageT,
            .default_value = null,
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

pub fn processImage(comptime Kernel: type, input: anytype, output: anytype) void {
    var instance = Kernel.create(input, output);
    const width: u32 = get: {
        inline for (std.meta.fields(@TypeOf(output))) |field| {
            const image = @field(output, field.name);
            break :get image.width;
        }
        break :get 0;
    };
    const height: u32 = get: {
        inline for (std.meta.fields(@TypeOf(output))) |field| {
            const image = @field(output, field.name);
            break :get image.height;
        }
        break :get 0;
    };
    var y: u32 = 0;
    while (y < height) : (y += 1) {
        var x: u32 = 0;
        instance.outputCoord[1] = y;
        while (x < width) : (x += 1) {
            instance.outputCoord[0] = x;
            instance.evaluatePixel();
        }
    }
}