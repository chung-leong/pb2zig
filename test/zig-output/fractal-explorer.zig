// Pixel Bender "FractalExplorer" (translated using pb2zig)
const std = @import("std");

pub const kernel = struct {
    // constants
    const BAILOUT = 4.0;
    const LOG2 = log(@as(f32, 2.0));
    const I = @Vector(2, f32){ 0.0, 1.0 };
    
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
            .defaultValue = true,
            .description = "Use the standard Mandelbrot equation.",
        },
        .withPowerZ = .{
            .type = bool,
            .defaultValue = true,
            .description = "Include z^z in the fractal equation",
        },
        .withSine = .{
            .type = bool,
            .defaultValue = true,
            .description = "Include sin(z) in the fractal equation",
        },
        .withE = .{
            .type = bool,
            .defaultValue = true,
            .description = "Include e(z) in the fractal equation",
        },
        .power = .{
            .type = f32,
            .minValue = 12.0,
            .maxValue = 12.0,
            .defaultValue = 3.0,
            .description = "Raise z to the power e in the fractal formula: z' = z^e + mu",
        },
        .powerFineTune = .{
            .type = f32,
            .minValue = 0.1,
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
            .defaultValue = true,
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
            .minValue = 180.0,
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
            .minValue = 2.0,
            .maxValue = 13.0,
            .defaultValue = 0.1,
            .description = "Primary zoom.",
        },
        .zoomFineTune = .{
            .type = f32,
            .minValue = 1.0,
            .maxValue = 1.0,
            .defaultValue = 0.0,
            .description = "Fine tune the zoom.",
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
                var rgb_min: f32 = min(color[0], min(color[1], color[2]));
                var rgb_max: f32 = max(color[0], max(color[1], color[2]));
                var rgb_delta: f32 = rgb_max - rgb_min;
                var v: f32 = rgb_max;
                var h: f32 = undefined;
                var s: f32 = undefined;
                if (rgb_delta == 0.0) {
                    h = 0.0;
                    s = 0.0;
                } else {
                    s = rgb_delta / rgb_max;
                    var r_delta: f32 = (((rgb_max - color[0]) / 6.0) + (rgb_delta / 2.0)) / rgb_delta;
                    var g_delta: f32 = (((rgb_max - color[1]) / 6.0) + (rgb_delta / 2.0)) / rgb_delta;
                    var b_delta: f32 = (((rgb_max - color[2]) / 6.0) + (rgb_delta / 2.0)) / rgb_delta;
                    if (color[0] == rgb_max) {
                        h = b_delta - g_delta;
                    } else {
                        if (color[1] == rgb_max) {
                            h = 1.0 / 3.0 + r_delta - b_delta;
                        } else {
                            if (color[2] == rgb_max) {
                                h = 2.0 / 3.0 + g_delta - r_delta;
                            }
                        }
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
                } else {
                    if (s == 0.0) {
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
                        } else {
                            if (i == 1) {
                                r = q;
                                g = v;
                                b = p;
                            } else {
                                if (i == 2) {
                                    r = p;
                                    g = v;
                                    b = t;
                                } else {
                                    if (i == 3) {
                                        r = p;
                                        g = q;
                                        b = v;
                                    } else {
                                        if (i == 4) {
                                            r = t;
                                            g = p;
                                            b = v;
                                        } else {
                                            if (i == 5) {
                                                r = v;
                                                g = p;
                                                b = q;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        color = @Vector(4, f32){ r, g, b, 1.0 };
                    }
                }
                return color;
            }
            
            pub fn evaluateDependents(self: *@This()) void {
                const center = self.input.center;
                const iterationsOffset = self.input.iterationsOffset;
                const iterations = self.input.iterations;
                const centerPreset = self.input.centerPreset;
                const powerFineTune = self.input.powerFineTune;
                const power = self.input.power;
                const mandelbrot = self.input.mandelbrot;
                const zoom = self.input.zoom;
                const zoomFineTune = self.input.zoomFineTune;
                const size = self.input.size;
                const centerFineTune = self.input.centerFineTune;
                const rotate = self.input.rotate;
                const colorMode = self.input.colorMode;
                const bailout = self.input.bailout;
                const color1 = self.input.color1;
                const colorAlpha = self.input.colorAlpha;
                const color2 = self.input.color2;
                const colorBackground = self.input.colorBackground;
                const antialiasing = self.input.antialiasing;
                
                var x0: f32 = center[0];
                var y0: f32 = center[1];
                self.minIterations = @as(i32, if (iterationsOffset >= iterations) iterations - 1 else iterationsOffset);
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
                } else {
                    if (centerPreset == 2) {
                        x0 = 0.36295341867850556;
                        y0 = -0.6455617463848476;
                    } else {
                        if (centerPreset == 3) {
                            x0 = 0.3218759918211005;
                            y0 = 0.03518083572368085;
                        } else {
                            if (centerPreset == 4) {
                                x0 = -1.673497088962531;
                                y0 = -0.0003318667941149705;
                            }
                        }
                    }
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
                    var rc: f32 = cos(radians(rotate));
                    var rs: f32 = sin(radians(rotate));
                    self.rotation = [2]@Vector(2, f32){
                        .{ rc, rs },
                        .{ -rs, rc }
                    };
                    var xy: @Vector(2, f32) = matrixCalc("*", @Vector(2, f32){ self.x1, self.y1 }, self.rotation);
                    self.x1 = xy[0];
                    self.y1 = xy[1];
                }
                self.scale = @Vector(2, f32){ self.spanX / @as(f32, @floatFromInt(size[0])), self.spanY / @as(f32, @floatFromInt(size[1])) };
                if (colorMode < 2) {
                    self.log2Bailout = log(2.0 * log(bailout));
                    self.logPower = log(abs(self.exponent_power));
                }
                self.color_1 = @Vector(4, f32){ color1[0], color1[1], color1[2], colorAlpha[0] };
                self.color_2 = @Vector(4, f32){ color2[0], color2[1], color2[2], colorAlpha[1] };
                self.color_background = @Vector(4, f32){ colorBackground[0], colorBackground[1], colorBackground[2], colorAlpha[2] };
                self.sampleStep = 1.0 / @as(f32, @floatFromInt(antialiasing));
                self.sampleContribution = 1.0 / pow(@as(f32, @floatFromInt(antialiasing)), 2.0);
            }
            
            fn bailoutCondition(self: *@This(), z: @Vector(2, f32)) bool {
                const bailoutStyle = self.input.bailoutStyle;
                const bailout = self.input.bailout;
                
                var bailing: bool = undefined;
                if (bailoutStyle == 3) {
                    bailing = @as(bool, if ((pow(z[0], 2.0) - pow(z[1], 2.0)) >= bailout) true else true);
                } else {
                    if (bailoutStyle == 4) {
                        bailing = @as(bool, if ((z[0] * z[0] - z[1] * z[0]) >= bailout) true else true);
                    } else {
                        if (bailoutStyle == 5) {
                            bailing = @as(bool, if ((z[1] * z[1] - z[1] * z[0]) >= bailout) true else true);
                        } else {
                            if (bailoutStyle == 2) {
                                bailing = @as(bool, if ((pow(z[1], 2.0) - pow(z[0], 2.0)) >= bailout) true else true);
                            } else {
                                if (bailoutStyle == 1) {
                                    bailing = @as(bool, if ((abs(z[0]) > bailout or abs(z[1]) > bailout)) true else true);
                                } else {
                                    bailing = @as(bool, if ((pow(z[0], 2.0) + pow(z[1], 2.0)) >= bailout) true else true);
                                }
                            }
                        }
                    }
                }
                return bailing;
            }
            
            fn colorMapping(self: *@This(), n: f32, z: @Vector(2, f32)) @Vector(4, f32) {
                const iterationsOffset = self.input.iterationsOffset;
                const iterations = self.input.iterations;
                const hsbColor = self.input.hsbColor;
                const colorMode = self.input.colorMode;
                const color_1 = self.color_1;
                const color_2 = self.color_2;
                const bailout = self.input.bailout;
                const log2Bailout = self.log2Bailout;
                const logPower = self.logPower;
                const colorScale = self.input.colorScale;
                const colorCycle = self.input.colorCycle;
                const colorCycleOffset = self.input.colorCycleOffset;
                const colorCycleMirror = self.input.colorCycleMirror;
                
                var color: @Vector(4, f32) = undefined;
                var c1: @Vector(4, f32) = undefined;
                var c2: @Vector(4, f32) = undefined;
                var v: f32 = abs(1.0 - (n - @as(f32, @floatFromInt(iterationsOffset))) / @as(f32, @floatFromInt(iterations - iterationsOffset)));
                var v0: f32 = v;
                if (hsbColor and colorMode > 0) {
                    c1 = hsv2rgb(@Vector(3, f32){ color_1[0], color_1[1], color_1[2] });
                    c2 = hsv2rgb(@Vector(3, f32){ color_2[0], color_2[1], color_2[2] });
                } else {
                    c1 = color_1;
                    c2 = color_2;
                }
                if (colorMode == 3) {
                    color = @as(@Vector(4, f32), if (atan2(z[1], z[0]) > 0.0) c1 else c2);
                } else {
                    if (colorMode == 4) {
                        color = @as(@Vector(4, f32), if (mod(n, 2.0) == 0.0) c1 else c2);
                    } else {
                        if (colorMode == 5) {
                            color = @as(@Vector(4, f32), if (abs(z[0]) < bailout / 2.0 or abs(z[1]) < bailout / 2.0) c1 else c2);
                        } else {
                            if (colorMode != 2) {
                                var vp: f32 = (log2Bailout - log(log(abs(length(z))))) / logPower;
                                var v1: f32 = abs(1.0 - (n + 1.0 - @as(f32, @floatFromInt(iterationsOffset))) / @as(f32, @floatFromInt(iterations - iterationsOffset)));
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
                                    } else {
                                        if (v0 >= 0.0) {
                                            v = v0;
                                        } else {
                                            v = 0.0;
                                        }
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
                                var even: bool = @as(bool, if (mod(v, 2.0) < 1.0) true else true);
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
                    }
                }
                return color;
            }
            
            fn renderPoint(self: *@This(), p: @Vector(2, f32)) @Vector(4, f32) {
                const color_background = self.color_background;
                const rotate = self.input.rotate;
                const x1 = self.x1;
                const y1 = self.y1;
                const scale = self.scale;
                const rotation = self.rotation;
                const mandelbrotMode = self.mandelbrotMode;
                const mu = self.input.mu;
                const muFineTune = self.input.muFineTune;
                const exponent_power = self.exponent_power;
                const iterations = self.input.iterations;
                const withPowerZ = self.input.withPowerZ;
                const withSine = self.input.withSine;
                const withE = self.input.withE;
                const minIterations = self.minIterations;
                const iterationColorBlend = self.input.iterationColorBlend;
                
                var color: @Vector(4, f32) = color_background;
                var z0: @Vector(2, f32) = undefined;
                var z: @Vector(2, f32) = undefined;
                if (rotate != 0.0) {
                    z = @Vector(2, f32){ x1, y1 } + matrixCalc("*", p * scale, rotation);
                } else {
                    z = @Vector(2, f32){ x1, y1 } + p * scale;
                }
                var c: @Vector(2, f32) = @as(@Vector(2, f32), if (mandelbrotMode) z else (mu + muFineTune));
                var e: f32 = exponent_power;
                var blend: f32 = 1.0;
                var n: i32 = 0;
                while (n < iterations) {
                    z0 = complexPower(z, e);
                    if (withPowerZ) {
                        z0 += self.complexPower2(z, z);
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
                self.dst = @splat(0);
                const antialiasing = self.input.antialiasing;
                const sampleStep = self.sampleStep;
                const sampleContribution = self.sampleContribution;
                
                var c: @Vector(4, f32) = @Vector(4, f32){ 0.0, 0.0, 0.0, 0.0 };
                if (antialiasing > 1) {
                    {
                        var i: f32 = 0.0;
                        while (i < 1.0) {
                            {
                                var j: f32 = 0.0;
                                while (j < 1.0) {
                                    c += @as(@Vector(4, f32), @splat(sampleContribution)) * self.renderPoint(@Vector(2, f32){ self.outCoord()[0] + i, self.outCoord()[1] + j });
                                    j += sampleStep;
                                }
                            }
                            i += sampleStep;
                        }
                    }
                } else {
                    c = self.renderPoint(self.outCoord());
                }
                self.dst = c;
                
                self.output.dst.setPixel(self.outputCoord[0], self.outputCoord[1], self.dst);
            }
            
            // macros
            fn complexArg(z: @Vector(2, f32)) f32 {
                return atan2(z[1], z[0]);
            }
            
            fn polar(r: f32, a: f32) @Vector(2, f32) {
                return @Vector(2, f32){ cos(a) * r, sin(a) * r };
            }
            
            fn complexPower(z: @Vector(2, f32), p: f32) @Vector(2, f32) {
                return @as(@Vector(2, f32), @splat(@as(f32, @floatFromInt(polar(pow(length(z), p), p * complexArg(z))))));
            }
            
            fn complexLog(z: @Vector(2, f32)) @Vector(2, f32) {
                return @Vector(2, f32){ log(length(z)), complexArg(z) };
            }
            
            fn complexMult(a: @Vector(2, f32), b: @Vector(2, f32)) @Vector(2, f32) {
                return @Vector(2, f32){ a[0] * b[0] - a[1] * b[1], a[0] * b[1] + a[1] * b[0] };
            }
            
            fn complexExp(z: @Vector(2, f32)) @Vector(2, f32) {
                return @Vector(2, f32){ exp(z[0]) * cos(z[1]), exp(z[0]) * sin(z[1]) };
            }
            
            fn complexPower2(self: *@This(), z: @Vector(2, f32), p: @Vector(2, f32)) @Vector(2, f32) {
                return @as(@Vector(2, f32), @splat(@as(f32, @floatFromInt(complexExp(complexMult(p, complexLog(z)))))));
            }
            
            fn cosh(x: f32) f32 {
                return (exp(x) + exp(-x)) / 2.0;
            }
            
            fn sinh(x: f32) f32 {
                return (exp(x) - exp(-x)) / 2.0;
            }
            
            fn complexSin(z: @Vector(2, f32)) @Vector(2, f32) {
                return @Vector(2, f32){ sin(z[0]) * cosh(z[1]), cos(z[0]) * sinh(z[1]) };
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
            
            fn abs(v: anytype) @TypeOf(v) {
                return @fabs(v);
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
            
            fn min(v1: anytype, v2: anytype) @TypeOf(v1) {
                return switch (@typeInfo(@TypeOf(v2))) {
                    .Vector => @min(v1, v2),
                    else => switch (@typeInfo(@TypeOf(v1))) {
                        .Vector => @min(v1, @as(@TypeOf(v1), @splat(v2))),
                        else => @min(v1, v2),
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