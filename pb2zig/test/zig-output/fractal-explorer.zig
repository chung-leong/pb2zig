// Pixel Bender kernel "FractalExplorer" (translated using pb2zig)
const std = @import("std");

pub const kernel = struct {
    // constants
    const BAILOUT: f32 = 4.0;
    const LOG2: f32 = log(@as(f32, 2.0));
    const I: @Vector(2, f32) = @Vector(2, f32){ 0.0, 1.0 };

    // kernel information
    pub const namespace = "com.subblue.filters";
    pub const vendor = "Tom Beddard";
    pub const version = 1;
    pub const description = "Fractal explorer";
    pub const displayName = "Fractal Explorer";
    pub const category = "Pixel Bender";
    pub const parameters = .{
        .antialiasing = .{
            .type = i32,
            .minValue = 1,
            .maxValue = 3,
            .defaultValue = 1,
            .description = "Super sampling quality. Number of samples squared per pixel.",
        },
        .center = .{
            .type = @Vector(2, f32),
            .minValue = .{ -2.0, -2.0 },
            .maxValue = .{ 2.0, 2.0 },
            .defaultValue = .{ 0.0, 0.0 },
            .description = "The center of the fractal.",
        },
        .centerFineTune = .{
            .type = @Vector(2, f32),
            .minValue = .{ -1.0, -1.0 },
            .maxValue = .{ 1.0, 1.0 },
            .defaultValue = .{ 0.0, 0.0 },
            .description = "Fine tune the center position.",
        },
        .centerPreset = .{
            .type = i32,
            .minValue = 0,
            .maxValue = 4,
            .defaultValue = 0,
            .description = "Some nice areas to explore in the Mandelbrot set.",
            .aeDisplayName = "Mandelbrot center preset",
            .aeUIControl = "aePopup",
            .aePopupString = "Free control|Seahorse tail|Lightning|Spiral|Mini Mandelbrot",
        },
        .mandelbrot = .{
            .type = bool,
            .defaultValue = false,
            .description = "Use the standard Mandelbrot equation.",
        },
        .withPowerZ = .{
            .type = bool,
            .defaultValue = false,
            .description = "Include z^z in the fractal equation",
        },
        .withSine = .{
            .type = bool,
            .defaultValue = false,
            .description = "Include sin(z) in the fractal equation",
        },
        .withE = .{
            .type = bool,
            .defaultValue = false,
            .description = "Include e(z) in the fractal equation",
        },
        .power = .{
            .type = f32,
            .minValue = -12.0,
            .maxValue = 12.0,
            .defaultValue = 3.0,
            .description = "Raise z to the power e in the fractal formula: z' = z^e + mu",
        },
        .powerFineTune = .{
            .type = f32,
            .minValue = -0.1,
            .maxValue = 0.1,
            .defaultValue = 0.0,
            .description = "Fine tune the exponent.",
        },
        .mu = .{
            .type = @Vector(2, f32),
            .minValue = .{ -1.0, -1.0 },
            .maxValue = .{ 1.0, 1.0 },
            .defaultValue = .{ 0.42, 0.0 },
            .description = "The complex parameter of the fractal formula: z' = z^e + mu",
        },
        .muFineTune = .{
            .type = @Vector(2, f32),
            .minValue = .{ -0.01, -0.01 },
            .maxValue = .{ 0.01, 0.01 },
            .defaultValue = .{ 0.0, 0.0 },
            .description = "Fine tune mu.",
        },
        .bailoutStyle = .{
            .type = i32,
            .minValue = 0,
            .maxValue = 3,
            .defaultValue = 0,
            .description = "Changes the style of the bailout effect.",
            .aeDisplayName = "Bailout style",
            .aeUIControl = "aePopup",
            .aePopupString = "Smooth|Spiky|Stalks|Swirls",
        },
        .bailout = .{
            .type = f32,
            .minValue = 2.0,
            .maxValue = 150.0,
            .defaultValue = 4.0,
            .description = "Bailout threshold.",
        },
        .iterations = .{
            .type = i32,
            .minValue = 1,
            .maxValue = 300,
            .defaultValue = 70,
            .description = "The maximum number of iterations for each pixel before bailout. Use to increase detail at the fractal edges.",
        },
        .iterationsOffset = .{
            .type = i32,
            .minValue = 0,
            .maxValue = 150,
            .defaultValue = 0,
            .description = "Offset the start of the iteration count",
        },
        .colorMode = .{
            .type = i32,
            .minValue = 0,
            .maxValue = 5,
            .defaultValue = 0,
            .description = "Different colouring modes",
            .aeDisplayName = "Colouring mode",
            .aeUIControl = "aePopup",
            .aePopupString = "Smooth|Shelf banding|Solid banding|Binary deconvolution|Contour bands|Spikes",
        },
        .hsbColor = .{
            .type = bool,
            .defaultValue = false,
            .description = "Use hue, saturation, brightness colouring.",
        },
        .color1 = .{
            .type = @Vector(3, f32),
            .minValue = .{ 0.0, 0.0, 0.0 },
            .maxValue = .{ 1.0, 1.0, 1.0 },
            .defaultValue = .{ 1.0, 1.0, 1.0 },
            .description = "The outer colour.",
            .aeUIControl = "aeColor",
        },
        .color2 = .{
            .type = @Vector(3, f32),
            .minValue = .{ 0.0, 0.0, 0.0 },
            .maxValue = .{ 1.0, 1.0, 1.0 },
            .defaultValue = .{ 0.0, 0.28, 0.46 },
            .description = "The inner colour.",
            .aeUIControl = "aeColor",
        },
        .colorBackground = .{
            .type = @Vector(3, f32),
            .minValue = .{ 0.0, 0.0, 0.0 },
            .maxValue = .{ 1.0, 1.0, 1.0 },
            .defaultValue = .{ 0.0, 0.0, 0.0 },
            .description = "The background colour.",
            .aeUIControl = "aeColor",
        },
        .colorCycle = .{
            .type = f32,
            .minValue = 1.0,
            .maxValue = 10.0,
            .defaultValue = 1.0,
            .description = "The number of times the colour gradient repeats.",
        },
        .colorCycleOffset = .{
            .type = f32,
            .minValue = 0.0,
            .maxValue = 1.0,
            .defaultValue = 0.0,
            .description = "Shift the colour mapping.",
        },
        .colorCycleMirror = .{
            .type = bool,
            .defaultValue = true,
            .description = "Reflect the colour gradient or use abrupt steps.",
        },
        .colorScale = .{
            .type = f32,
            .minValue = 1.0,
            .maxValue = 20.0,
            .defaultValue = 3.0,
            .description = "Determines the mapping scale of the colour.",
        },
        .colorAlpha = .{
            .type = @Vector(3, f32),
            .minValue = .{ 0.0, 0.0, 0.0 },
            .maxValue = .{ 1.0, 1.0, 1.0 },
            .defaultValue = .{ 1.0, 1.0, 1.0 },
            .description = "Separate alpha controls for color1, color2 and colorBackground for AfterEffects support.",
        },
        .iterationColorBlend = .{
            .type = f32,
            .minValue = 0.0,
            .maxValue = 1.0,
            .defaultValue = 0.0,
            .description = "Add the illusion of depth by blending subsequent iterations into the background.",
        },
        .rotate = .{
            .type = f32,
            .minValue = -180.0,
            .maxValue = 180.0,
            .defaultValue = 0.0,
            .description = "Rotate the fractal.",
        },
        .size = .{
            .type = @Vector(2, i32),
            .minValue = .{ 100, 100 },
            .maxValue = .{ 4096, 4096 },
            .defaultValue = .{ 640, 480 },
            .description = "The size of the rendered fractal.",
        },
        .zoom = .{
            .type = f32,
            .minValue = -2.0,
            .maxValue = 13.0,
            .defaultValue = 0.1,
            .description = "Primary zoom.",
        },
        .zoomFineTune = .{
            .type = f32,
            .minValue = -1.0,
            .maxValue = 1.0,
            .defaultValue = 0.0,
            .description = "Fine tune the zoom.",
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
            outputCoord: @Vector(2, f32) = @splat(0.0),

            // output pixel
            dst: @Vector(4, f32) = undefined,

            // dependent variables
            x1: f32 = undefined,
            x2: f32 = undefined,
            y1: f32 = undefined,
            zoomFactor: f32 = undefined,
            spanX: f32 = undefined,
            spanY: f32 = undefined,
            sampleStep: f32 = undefined,
            sampleContribution: f32 = undefined,
            exponent_power: f32 = undefined,
            log2Bailout: f32 = undefined,
            logPower: f32 = undefined,
            scale: @Vector(2, f32) = undefined,
            mandelbrotMode: bool = undefined,
            minIterations: i32 = undefined,
            rotation: [2]@Vector(2, f32) = undefined,
            color_1: @Vector(4, f32) = undefined,
            color_2: @Vector(4, f32) = undefined,
            color_background: @Vector(4, f32) = undefined,

            // functions defined in kernel
            fn rgb2hsv(color: @Vector(4, f32)) @Vector(3, f32) {
                const rgb_min: f32 = min(color[0], min(color[1], color[2]));
                const rgb_max: f32 = max(color[0], max(color[1], color[2]));
                const rgb_delta: f32 = rgb_max - rgb_min;
                const v: f32 = rgb_max;
                var h: f32 = undefined;
                var s: f32 = undefined;
                if (rgb_delta == 0.0) {
                    h = 0.0;
                    s = 0.0;
                } else {
                    s = rgb_delta / rgb_max;
                    const r_delta: f32 = (((rgb_max - color[0]) / 6.0) + (rgb_delta / 2.0)) / rgb_delta;
                    const g_delta: f32 = (((rgb_max - color[1]) / 6.0) + (rgb_delta / 2.0)) / rgb_delta;
                    const b_delta: f32 = (((rgb_max - color[2]) / 6.0) + (rgb_delta / 2.0)) / rgb_delta;
                    if (color[0] == rgb_max) {
                        h = b_delta - g_delta;
                    } else if (color[1] == rgb_max) {
                        h = 1.0 / 3.0 + r_delta - b_delta;
                    } else if (color[2] == rgb_max) {
                        h = 2.0 / 3.0 + g_delta - r_delta;
                    }
                    if (h < 0.0) {
                        h += 1.0;
                    }
                    if (h > 1.0) {
                        h -= 1.0;
                    }
                }
                return @Vector(3, f32){ h, s, v };
            }

            fn hsv2rgb(hsv: @Vector(3, f32)) @Vector(4, f32) {
                var h: f32 = undefined;
                var s: f32 = undefined;
                var v: f32 = undefined;
                var r: f32 = undefined;
                var g: f32 = undefined;
                var b: f32 = undefined;
                var j: f32 = undefined;
                var p: f32 = undefined;
                var q: f32 = undefined;
                var t: f32 = undefined;
                var i: i32 = undefined;
                var color: @Vector(4, f32) = undefined;
                h = hsv[0];
                s = hsv[1];
                v = hsv[2];
                if (h == 1.0) {
                    h = 0.0;
                }
                if (v == 0.0) {
                    color = @Vector(4, f32){ 0.0, 0.0, 0.0, 1.0 };
                } else if (s == 0.0) {
                    color = @Vector(4, f32){ v, v, v, 1.0 };
                } else {
                    h *= 6.0;
                    i = @as(i32, @intFromFloat(h));
                    j = h - @as(f32, @floatFromInt(i));
                    p = v * (1.0 - s);
                    q = v * (1.0 - (s * j));
                    t = v * (1.0 - (s * (1.0 - j)));
                    if (i == 0) {
                        r = v;
                        g = t;
                        b = p;
                    } else if (i == 1) {
                        r = q;
                        g = v;
                        b = p;
                    } else if (i == 2) {
                        r = p;
                        g = v;
                        b = t;
                    } else if (i == 3) {
                        r = p;
                        g = q;
                        b = v;
                    } else if (i == 4) {
                        r = t;
                        g = p;
                        b = v;
                    } else if (i == 5) {
                        r = v;
                        g = p;
                        b = q;
                    }
                    color = @Vector(4, f32){ r, g, b, 1.0 };
                }
                return color;
            }

            pub fn evaluateDependents(self: *@This()) void {
                const antialiasing = self.params.antialiasing;
                const center = self.params.center;
                const centerFineTune = self.params.centerFineTune;
                const centerPreset = self.params.centerPreset;
                const mandelbrot = self.params.mandelbrot;
                const power = self.params.power;
                const powerFineTune = self.params.powerFineTune;
                const bailout = self.params.bailout;
                const iterations = self.params.iterations;
                const iterationsOffset = self.params.iterationsOffset;
                const colorMode = self.params.colorMode;
                const color1 = self.params.color1;
                const color2 = self.params.color2;
                const colorBackground = self.params.colorBackground;
                const colorAlpha = self.params.colorAlpha;
                const rotate = self.params.rotate;
                const size = self.params.size;
                const zoom = self.params.zoom;
                const zoomFineTune = self.params.zoomFineTune;
                var x0: f32 = center[0];
                var y0: f32 = center[1];
                self.minIterations = if (iterationsOffset >= iterations) iterations - 1 else iterationsOffset;
                if (centerPreset > 0) {
                    self.exponent_power = 2.0 + powerFineTune;
                    self.mandelbrotMode = true;
                } else {
                    self.exponent_power = power + powerFineTune;
                    if (self.exponent_power == 0.0) {
                        self.exponent_power = 0.1;
                    }
                    self.mandelbrotMode = mandelbrot;
                }
                if (centerPreset == 1) {
                    x0 = -0.742522478103764;
                    y0 = -0.143708014488453;
                } else if (centerPreset == 2) {
                    x0 = 0.36295341867850556;
                    y0 = -0.6455617463848476;
                } else if (centerPreset == 3) {
                    x0 = 0.3218759918211005;
                    y0 = 0.03518083572368085;
                } else if (centerPreset == 4) {
                    x0 = -1.673497088962531;
                    y0 = -0.0003318667941149705;
                }
                self.zoomFactor = exp(zoom + zoomFineTune);
                self.x1 = x0 - (2.0 / self.zoomFactor);
                self.x2 = x0 + (2.0 / self.zoomFactor);
                self.spanX = self.x2 - self.x1;
                self.spanY = self.spanX * (@as(f32, @floatFromInt(size[1])) / @as(f32, @floatFromInt(size[0])));
                self.y1 = y0 - self.spanY / 2.0;
                self.x1 += centerFineTune[0] * self.spanX;
                self.y1 += centerFineTune[1] * self.spanY;
                if (rotate != 0.0) {
                    const rc: f32 = cos(radians(rotate));
                    const rs: f32 = sin(radians(rotate));
                    self.rotation = [2]@Vector(2, f32){
                        .{ rc, rs },
                        .{ -rs, rc },
                    };
                    const xy: @Vector(2, f32) = @"V * M"(@Vector(2, f32){ self.x1, self.y1 }, self.rotation);
                    self.x1 = xy[0];
                    self.y1 = xy[1];
                }
                self.scale = @Vector(2, f32){
                    self.spanX / @as(f32, @floatFromInt(size[0])),
                    self.spanY / @as(f32, @floatFromInt(size[1])),
                };
                if (colorMode < 2) {
                    self.log2Bailout = log(2.0 * log(bailout));
                    self.logPower = log(abs(self.exponent_power));
                }
                self.color_1 = @Vector(4, f32){
                    color1[0],
                    color1[1],
                    color1[2],
                    colorAlpha[0],
                };
                self.color_2 = @Vector(4, f32){
                    color2[0],
                    color2[1],
                    color2[2],
                    colorAlpha[1],
                };
                self.color_background = @Vector(4, f32){
                    colorBackground[0],
                    colorBackground[1],
                    colorBackground[2],
                    colorAlpha[2],
                };
                self.sampleStep = 1.0 / @as(f32, @floatFromInt(antialiasing));
                self.sampleContribution = 1.0 / pow(@as(f32, @floatFromInt(antialiasing)), 2.0);
            }

            fn bailoutCondition(self: *@This(), z: @Vector(2, f32)) bool {
                const bailoutStyle = self.params.bailoutStyle;
                const bailout = self.params.bailout;
                var bailing: bool = undefined;
                if (bailoutStyle == 3) {
                    bailing = @as(bool, if ((pow(z[0], 2.0) - pow(z[1], 2.0)) >= bailout) true else false);
                } else if (bailoutStyle == 4) {
                    bailing = @as(bool, if ((z[0] * z[0] - z[1] * z[0]) >= bailout) true else false);
                } else if (bailoutStyle == 5) {
                    bailing = @as(bool, if ((z[1] * z[1] - z[1] * z[0]) >= bailout) true else false);
                } else if (bailoutStyle == 2) {
                    bailing = @as(bool, if ((pow(z[1], 2.0) - pow(z[0], 2.0)) >= bailout) true else false);
                } else if (bailoutStyle == 1) {
                    bailing = @as(bool, if ((abs(z[0]) > bailout or abs(z[1]) > bailout)) true else false);
                } else {
                    bailing = @as(bool, if ((pow(z[0], 2.0) + pow(z[1], 2.0)) >= bailout) true else false);
                }
                return bailing;
            }

            fn colorMapping(self: *@This(), n: f32, z: @Vector(2, f32)) @Vector(4, f32) {
                const bailout = self.params.bailout;
                const iterations = self.params.iterations;
                const iterationsOffset = self.params.iterationsOffset;
                const colorMode = self.params.colorMode;
                const hsbColor = self.params.hsbColor;
                const colorCycle = self.params.colorCycle;
                const colorCycleOffset = self.params.colorCycleOffset;
                const colorCycleMirror = self.params.colorCycleMirror;
                const colorScale = self.params.colorScale;
                const log2Bailout = self.log2Bailout;
                const logPower = self.logPower;
                const color_1 = self.color_1;
                const color_2 = self.color_2;
                var color: @Vector(4, f32) = undefined;
                var c1: @Vector(4, f32) = undefined;
                var c2: @Vector(4, f32) = undefined;
                var v: f32 = abs(1.0 - (n - @as(f32, @floatFromInt(iterationsOffset))) / @as(f32, @floatFromInt(iterations - iterationsOffset)));
                const v0: f32 = v;
                if (hsbColor and colorMode > 0) {
                    c1 = hsv2rgb(@Vector(3, f32){
                        color_1[0],
                        color_1[1],
                        color_1[2],
                    });
                    c2 = hsv2rgb(@Vector(3, f32){
                        color_2[0],
                        color_2[1],
                        color_2[2],
                    });
                } else {
                    c1 = color_1;
                    c2 = color_2;
                }
                if (colorMode == 3) {
                    color = if (atan2(z[1], z[0]) > 0.0) c1 else c2;
                } else if (colorMode == 4) {
                    color = if (mod(n, 2.0) == 0.0) c1 else c2;
                } else if (colorMode == 5) {
                    color = if (abs(z[0]) < bailout / 2.0 or abs(z[1]) < bailout / 2.0) c1 else c2;
                } else {
                    if (colorMode != 2) {
                        const vp: f32 = (log2Bailout - log(log(abs(length(z))))) / logPower;
                        const v1: f32 = abs(1.0 - (n + 1.0 - @as(f32, @floatFromInt(iterationsOffset))) / @as(f32, @floatFromInt(iterations - iterationsOffset)));
                        if (colorMode == 1) {
                            if (n == 0.0) {
                                v = v - (v - v1) * abs(vp);
                            } else {
                                v = v1 - (v1 - v) * abs(vp);
                            }
                        } else {
                            v = v + (v1 - v) * abs(vp);
                        }
                        if (v >= 0.0) {

                        } else {
                            if (v1 >= 0.0) {
                                v = v1;
                            } else if (v0 >= 0.0) {
                                v = v0;
                            } else {
                                v = 0.0;
                            }
                        }
                    }
                    if (colorMode == 2 and n == 0.0) {
                        v = 1.0;
                    }
                    if (colorScale > 1.0) {
                        v = pow(v, colorScale);
                    }
                    if (colorCycle > 1.0) {
                        v *= colorCycle;
                    }
                    v += colorCycleOffset;
                    if (colorCycleMirror) {
                        const even: bool = if (mod(v, 2.0) < 1.0) true else false;
                        if (even) {
                            v = 1.0 - mod(v, 1.0);
                        } else {
                            v = mod(v, 1.0);
                        }
                    } else {
                        v = 1.0 - mod(v, 1.0);
                    }
                    if (hsbColor) {
                        color = hsv2rgb(mix(@Vector(3, f32){ c1[0], c1[1], c1[2] }, @Vector(3, f32){ c2[0], c2[1], c2[2] }, v));
                    } else {
                        color = mix(c1, c2, v);
                    }
                }
                return color;
            }

            fn renderPoint(self: *@This(), p: @Vector(2, f32)) @Vector(4, f32) {
                const withPowerZ = self.params.withPowerZ;
                const withSine = self.params.withSine;
                const withE = self.params.withE;
                const mu = self.params.mu;
                const muFineTune = self.params.muFineTune;
                const iterations = self.params.iterations;
                const iterationColorBlend = self.params.iterationColorBlend;
                const rotate = self.params.rotate;
                const x1 = self.x1;
                const y1 = self.y1;
                const exponent_power = self.exponent_power;
                const scale = self.scale;
                const mandelbrotMode = self.mandelbrotMode;
                const minIterations = self.minIterations;
                const rotation = self.rotation;
                const color_background = self.color_background;
                var color: @Vector(4, f32) = color_background;
                var z0: @Vector(2, f32) = undefined;
                var z: @Vector(2, f32) = undefined;
                if (rotate != 0.0) {
                    z = @Vector(2, f32){ x1, y1 } + @"V * M"(p * scale, rotation);
                } else {
                    z = @Vector(2, f32){ x1, y1 } + p * scale;
                }
                const c: @Vector(2, f32) = if (mandelbrotMode) z else (mu + muFineTune);
                const e: f32 = exponent_power;
                var blend: f32 = 1.0;
                var n: i32 = 0;
                while (n < iterations) {
                    z0 = complexPower(z, e);
                    if (withPowerZ) {
                        z0 += complexPower2(z, z);
                    }
                    if (withSine) {
                        z0 += complexSin(z);
                    }
                    if (withE) {
                        z0 += complexExp(z);
                    }
                    z = z0 + c;
                    if (n >= minIterations and self.bailoutCondition(z)) {
                        color = self.colorMapping(@as(f32, @floatFromInt(n)), z);
                        break;
                    }
                    n += 1;
                }
                if (color[0] >= 0.0) {
                    color = mix(color_background, color, color[3]);
                } else {
                    color = color_background;
                }
                if (iterationColorBlend > 0.0) {
                    blend = clamp(1.0 - (@as(f32, @floatFromInt(n - minIterations)) / @as(f32, @floatFromInt(iterations - minIterations))) * iterationColorBlend, 0.0, 1.0);
                }
                color = mix(color_background, color, color[3] * blend);
                return color;
            }

            pub fn evaluatePixel(self: *@This()) void {
                const antialiasing = self.params.antialiasing;
                const dst = self.output.dst;
                const sampleStep = self.sampleStep;
                const sampleContribution = self.sampleContribution;
                self.dst = @splat(0.0);

                var c: @Vector(4, f32) = .{ 0.0, 0.0, 0.0, 0.0 };
                if (antialiasing > 1) {
                    {
                        var i: f32 = 0.0;
                        while (i < 1.0) {
                            var j: f32 = 0.0;
                            while (j < 1.0) {
                                c += @as(@Vector(4, f32), @splat(sampleContribution)) * self.renderPoint(@Vector(2, f32){
                                    self.outCoord()[0] + i,
                                    self.outCoord()[1] + j,
                                });
                                j += sampleStep;
                            }
                            i += sampleStep;
                        }
                    }
                } else {
                    c = self.renderPoint(self.outCoord());
                }
                self.dst = c;

                dst.writePixel(self.outputCoord, self.dst);
            }

            // macros
            fn complexMult(a: @Vector(2, f32), b: @Vector(2, f32)) @Vector(2, f32) {
                return @Vector(2, f32){
                    a[0] * b[0] - a[1] * b[1],
                    a[0] * b[1] + a[1] * b[0],
                };
            }

            fn complexArg(z: @Vector(2, f32)) f32 {
                return atan2(z[1], z[0]);
            }

            fn complexLog(z: @Vector(2, f32)) @Vector(2, f32) {
                return @Vector(2, f32){
                    log(length(z)),
                    complexArg(z),
                };
            }

            fn complexExp(z: @Vector(2, f32)) @Vector(2, f32) {
                return @Vector(2, f32){
                    exp(z[0]) * cos(z[1]),
                    exp(z[0]) * sin(z[1]),
                };
            }

            fn sinh(x: f32) f32 {
                return (exp(x) - exp(-x)) / 2.0;
            }

            fn cosh(x: f32) f32 {
                return (exp(x) + exp(-x)) / 2.0;
            }

            fn complexSin(z: @Vector(2, f32)) @Vector(2, f32) {
                return @Vector(2, f32){
                    sin(z[0]) * cosh(z[1]),
                    cos(z[0]) * sinh(z[1]),
                };
            }

            fn polar(r: f32, a: f32) @Vector(2, f32) {
                return @Vector(2, f32){
                    cos(a) * r,
                    sin(a) * r,
                };
            }

            fn complexPower(z: @Vector(2, f32), p: f32) @Vector(2, f32) {
                return polar(pow(length(z), p), p * complexArg(z));
            }

            fn complexPower2(z: @Vector(2, f32), p: @Vector(2, f32)) @Vector(2, f32) {
                return complexExp(complexMult(p, complexLog(z)));
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

    fn min(v1: anytype, v2: anytype) @TypeOf(v1) {
        return switch (@typeInfo(@TypeOf(v2))) {
            .vector => @min(v1, v2),
            else => switch (@typeInfo(@TypeOf(v1))) {
                .vector => @min(v1, @as(@TypeOf(v1), @splat(v2))),
                else => @min(v1, v2),
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

    fn mix(v1: anytype, v2: anytype, p: anytype) @TypeOf(v1) {
        return switch (@typeInfo(@TypeOf(p))) {
            .vector => v1 * (@as(@TypeOf(p), @splat(1)) - p) + v2 * p,
            else => switch (@typeInfo(@TypeOf(v1))) {
                .vector => mix(v1, v2, @as(@TypeOf(v1), @splat(p))),
                else => v1 * (1 - p) + v2 * p,
            },
        };
    }

    fn length(v: anytype) f32 {
        return switch (@typeInfo(@TypeOf(v))) {
            .vector => @sqrt(@reduce(.Add, v * v)),
            else => @abs(v),
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
    const fields = std.meta.fields(@TypeOf(Kernel.inputImages));
    var field_names: [fields.len][]const u8 = undefined;
    var field_types: [fields.len]type = undefined;
    var field_attrs: [fields.len]std.builtin.Type.StructField.Attributes = undefined;
    inline for (fields, 0..) |field, index| {
        field_names[index] = field.name;
        field_types[index] = zigar.image.Any(.ro);
        field_attrs[index] = .{};
    }
    return @Struct(.auto, null, &field_names, &field_types, &field_attrs);
}

pub fn KernelInputImpl(comptime Impl: type, comptime Kernel: type) type {
    const fields = std.meta.fields(@TypeOf(Kernel.inputImages));
    var field_names: [fields.len][]const u8 = undefined;
    var field_types: [fields.len]type = undefined;
    var field_attrs: [fields.len]std.builtin.Type.StructField.Attributes = undefined;
    inline for (fields, 0..) |field, index| {
        const input = @field(Kernel.inputImages, field.name);
        field_names[index] = field.name;
        field_types[index] = KernelImage(Impl, input.channels, false);
        field_attrs[index] = .{};
    }
    return @Struct(.auto, null, &field_names, &field_types, &field_attrs);
}

pub fn KernelOutput(comptime Kernel: type) type {
    const fields = std.meta.fields(@TypeOf(Kernel.outputImages));
    var field_names: [fields.len][]const u8 = undefined;
    var field_types: [fields.len]type = undefined;
    var field_attrs: [fields.len]std.builtin.Type.StructField.Attributes = undefined;
    inline for (fields, 0..) |field, index| {
        field_names[index] = field.name;
        field_types[index] = zigar.image.Any(.rw);
        field_attrs[index] = .{};
    }
    return @Struct(.auto, null, &field_names, &field_types, &field_attrs);
}

pub fn KernelOutputImpl(comptime Impl: type, comptime Kernel: type) type {
    const fields = std.meta.fields(@TypeOf(Kernel.outputImages));
    var field_names: [fields.len][]const u8 = undefined;
    var field_types: [fields.len]type = undefined;
    var field_attrs: [fields.len]std.builtin.Type.StructField.Attributes = undefined;
    inline for (fields, 0..) |field, index| {
        const output = @field(Kernel.outputImages, field.name);
        field_names[index] = field.name;
        field_types[index] = KernelImage(Impl, output.channels, true);
        field_attrs[index] = .{};
    }
    return @Struct(.auto, null, &field_names, &field_types, &field_attrs);
}

pub fn KernelParameters(comptime Kernel: type) type {
    const fields = std.meta.fields(@TypeOf(Kernel.parameters));
    var field_names: [fields.len][]const u8 = undefined;
    var field_types: [fields.len]type = undefined;
    var field_attrs: [fields.len]std.builtin.Type.StructField.Attributes = undefined;
    inline for (fields, 0..) |field, index| {
        const param = @field(Kernel.parameters, field.name);
        const default_value_ptr: ?*const anyopaque = get_def: {
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
        field_names[index] = field.name;
        field_types[index] = param.type;
        field_attrs[index] = .{
            .default_value_ptr = default_value_ptr,
        };
    }
    return @Struct(.auto, null, &field_names, &field_types, &field_attrs);
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
