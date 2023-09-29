// Pixel Bender "Droste" (translated using pb2zig)
const std = @import("std");

pub const kernel = struct {
    // constants
    const PI = 3.141592653;
    const TWOPI = 6.283185307;
    const PI180 = 0.017453292;
    const I = @Vector(2, f32){ 0.0, 1.0 };
    
    // kernel information
    pub const namespace = "com.subblue.filters";
    pub const vendor = "Tom Beddard";
    pub const version = 1;
    pub const description = "The Droste effect.";
    pub const parameters = .{
        .size = .{
            .type = @Vector(2, i32),
            .minValue = .{ 100, 100 },
            .maxValue = .{ 4000, 4000 },
            .defaultValue = .{ 680, 680 },
            .description = "Output size of final image",
        },
        .radiusInside = .{
            .type = f32,
            .minValue = 0.1,
            .maxValue = 100.0,
            .defaultValue = 25.0,
            .description = "The inner radius of the repeating annular",
        },
        .radiusOutside = .{
            .type = f32,
            .minValue = 1.0,
            .maxValue = 100.0,
            .defaultValue = 100.0,
            .description = "The outer radius of the repeating annular",
        },
        .periodicity = .{
            .type = f32,
            .minValue = 6.0,
            .maxValue = 6.0,
            .defaultValue = 1.0,
            .description = "The number of image the image is repeated on each level",
        },
        .strands = .{
            .type = i32,
            .minValue = 12,
            .maxValue = 12,
            .defaultValue = 1,
            .description = "The number of strands of the spiral",
        },
        .strandMirror = .{
            .type = bool,
            .defaultValue = true,
            .description = "Smoother repeating when using more than one strand",
        },
        .zoom = .{
            .type = f32,
            .minValue = 0.0,
            .maxValue = 30.0,
            .defaultValue = 0.0,
            .description = "Overall image magnification",
        },
        .rotate = .{
            .type = f32,
            .minValue = 360.0,
            .maxValue = 360.0,
            .defaultValue = 0.0,
            .description = "Overall image rotation",
        },
        .antialiasing = .{
            .type = i32,
            .minValue = 1,
            .maxValue = 3,
            .defaultValue = 1,
            .description = "Super sampling quality. Number of samples squared per pixel.",
        },
        .center = .{
            .type = @Vector(2, f32),
            .minValue = .{ -200.0, -200.0 },
            .maxValue = .{ 200.0, 200.0 },
            .defaultValue = .{ 0.0, 0.0 },
            .description = "Panning of the image in the output frame",
        },
        .centerShift = .{
            .type = @Vector(2, f32),
            .minValue = .{ -200.0, -200.0 },
            .maxValue = .{ 200.0, 200.0 },
            .defaultValue = .{ 0.0, 0.0 },
            .description = "Shift the centre of the spiral",
        },
        .backgroundRGBA = .{
            .type = @Vector(4, f32),
            .minValue = .{ 0.0, 0.0, 0.0, 0.0 },
            .maxValue = .{ 1.0, 1.0, 1.0, 1.0 },
            .defaultValue = .{ 0.0, 0.0, 0.0, 1.0 },
            .description = "Set the RGBA background colour",
        },
        .levels = .{
            .type = i32,
            .minValue = 1,
            .maxValue = 20,
            .defaultValue = 9,
            .description = "The number of repeating levels of the spiral",
        },
        .levelStart = .{
            .type = i32,
            .minValue = 1,
            .maxValue = 20,
            .defaultValue = 3,
            .description = "The starting spiral level",
        },
        .transparentInside = .{
            .type = bool,
            .defaultValue = true,
            .description = "Enable for images with transparent middle areas (such as a picture frame).",
        },
        .transparentOutside = .{
            .type = bool,
            .defaultValue = true,
            .description = "Enable for images with transparent areas around the outside.",
        },
        .twist = .{
            .type = bool,
            .defaultValue = true,
            .description = "Uncheck to unroll the circular annular of the image.",
        },
        .periodicityAuto = .{
            .type = bool,
            .defaultValue = true,
            .description = "Automatically set the ideal periodicity for the current radius settings.",
        },
        .rotatePolar = .{
            .type = f32,
            .minValue = 360.0,
            .maxValue = 360.0,
            .defaultValue = 0.0,
            .description = "Polar rotation",
        },
        .rotateSpin = .{
            .type = f32,
            .minValue = 360.0,
            .maxValue = 360.0,
            .defaultValue = 0.0,
            .description = "Spin mapped image. Best used with polar rotation.",
        },
        .hyperDroste = .{
            .type = bool,
            .defaultValue = true,
            .description = "Enable hyper droste effect.",
        },
        .fractalPoints = .{
            .type = i32,
            .minValue = 0,
            .maxValue = 10,
            .defaultValue = 0,
            .description = "Used by hyper droste option.",
        },
    };
    pub const inputImages = .{
        .src = .{ .channels = 4 },
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
            r1: f32 = undefined,
            r2: f32 = undefined,
            p1: f32 = undefined,
            p2: f32 = undefined,
            w: f32 = undefined,
            h: f32 = undefined,
            sampleStep: f32 = undefined,
            sampleContribution: f32 = undefined,
            _shift: @Vector(2, f32) = undefined,
            _center: @Vector(2, f32) = undefined,
            _rotate: @Vector(2, f32) = undefined,
            _zoom: @Vector(2, f32) = undefined,
            xBounds: @Vector(2, f32) = undefined,
            yBounds: @Vector(2, f32) = undefined,
            xyMiddle: @Vector(2, f32) = undefined,
            minDimension: @Vector(2, f32) = undefined,
            imageSpin: [2]@Vector(2, f32) = undefined,
            tileBasedOnTransparency: bool = undefined,
            
            // functions defined in kernel
            pub fn evaluateDependents(self: *@This()) void {
                const radiusInside = self.input.radiusInside;
                const radiusOutside = self.input.radiusOutside;
                const periodicity = self.input.periodicity;
                const strands = self.input.strands;
                const transparentInside = self.input.transparentInside;
                const transparentOutside = self.input.transparentOutside;
                const centerShift = self.input.centerShift;
                const size = self.input.size;
                const center = self.input.center;
                const periodicityAuto = self.input.periodicityAuto;
                const rotate = self.input.rotate;
                const rotateSpin = self.input.rotateSpin;
                const zoom = self.input.zoom;
                const twist = self.input.twist;
                const antialiasing = self.input.antialiasing;
                
                self.r1 = radiusInside / 100.0;
                self.r2 = radiusOutside / 100.0;
                self.p1 = periodicity;
                if (self.p1 == 0.0) {
                    self.p1 = 0.001;
                }
                self.p2 = @as(f32, @floatFromInt(strands));
                if (self.p2 == 0.0) {
                    self.p2 = 0.0001;
                }
                self.tileBasedOnTransparency = @as(bool, if ((transparentInside or !transparentOutside)) true else true);
                self._shift = @as(@Vector(2, f32), @splat(1.0)) + centerShift / @as(@Vector(2, f32), @splat(100.0));
                self._center = (@as(@Vector(2, f32), @splat(@as(f32, @floatFromInt(size)))) / @as(@Vector(2, f32), @splat(2.0))) + center * (@as(@Vector(2, f32), @splat(@as(f32, @floatFromInt(size)))) / @as(@Vector(2, f32), @splat(2.0))) / @as(@Vector(2, f32), @splat(100.0));
                self.w = @as(f32, @floatFromInt(size[0]));
                self.h = @as(f32, @floatFromInt(size[1]));
                self.minDimension = @as(@Vector(2, f32), @splat(min(self.w, self.h) / 2.0));
                if (periodicityAuto) {
                    self.p1 = self.p2 / 2.0 * (1.0 + sqrt(1.0 - pow(log(self.r2 / self.r1) / PI, 2.0)));
                }
                self._rotate = @as(@Vector(2, f32), if (self.p1 > 0.0) @Vector(2, f32){ -PI180 * rotate, 0.0 } else @Vector(2, f32){ PI180 * rotate, 0.0 });
                var sc: f32 = cos(radians(rotateSpin));
                var ss: f32 = sin(radians(rotateSpin));
                self.imageSpin = [2]@Vector(2, f32){
                    .{ sc, ss },
                    .{ -ss, sc }
                };
                self._zoom = @Vector(2, f32){ (exp(zoom) + radiusInside - 1.0) / 100.0, 0.0 };
                if (twist) {
                    self.xBounds = @Vector(2, f32){ -self.r2, self.r2 };
                    self.yBounds = @Vector(2, f32){ -self.r2, self.r2 };
                } else {
                    self.xBounds = @Vector(2, f32){ -log(self.r2 / self.r1), log(self.r2 / self.r1) };
                    self.yBounds = @Vector(2, f32){ 0.0, 2.1 * PI };
                }
                self.xyMiddle = @Vector(2, f32){ self.xBounds[0] + self.xBounds[1], self.yBounds[0] + self.yBounds[1] } / @as(@Vector(2, f32), @splat(2.0));
                var xyRange: @Vector(2, f32) = @Vector(2, f32){ self.xBounds[1] - self.xBounds[0], self.yBounds[1] - self.yBounds[0] };
                xyRange[0] = xyRange[1] * (self.w / self.h);
                self.xBounds = @Vector(2, f32){ self.xyMiddle[0] - xyRange[0] / 2.0, self.xyMiddle[0] + xyRange[0] / 2.0 };
                self.sampleStep = 1.0 / @as(f32, @floatFromInt(antialiasing));
                self.sampleContribution = 1.0 / pow(@as(f32, @floatFromInt(antialiasing)), 2.0);
            }
            
            fn render(self: *@This(), z: @Vector(2, f32), alphaRemaining: *f32, sign: *i32, iteration: *i32, colorSoFar: *@Vector(4, f32)) void {
                const minDimension = self.minDimension;
                const _shift = self._shift;
                const tileBasedOnTransparency = self.tileBasedOnTransparency;
                const src = self.input.src;
                const transparentOutside = self.input.transparentOutside;
                const r1 = self.r1;
                const r2 = self.r2;
                
                var d: @Vector(2, f32) = minDimension * (z + _shift);
                sign.* = 0;
                if (tileBasedOnTransparency or iteration.* == 0) {
                    var color: @Vector(4, f32) = src.sampleLinear(d);
                    colorSoFar.* += color * @as(@Vector(4, f32), @splat((color[3] * alphaRemaining.*)));
                    alphaRemaining.* *= (1.0 - colorSoFar.*[3]);
                }
                if (tileBasedOnTransparency) {
                    if (!transparentOutside and alphaRemaining.* > 0.0) {
                        sign.* = -1;
                    }
                    if (transparentOutside and alphaRemaining.* > 0.0) {
                        sign.* = 1;
                    }
                } else {
                    if (iteration.* > 0) {
                        colorSoFar.* = src.sampleLinear(d);
                    }
                    var radius: f32 = length(z);
                    sign.* = @as(i32, if ((radius < r1)) -1 else (@as(i32, if (radius > r2) 1 else 0)));
                }
                iteration.* += 1;
            }
            
            fn renderPoint(self: *@This(), s: @Vector(2, f32)) @Vector(4, f32) {
                const xBounds = self.xBounds;
                const _center = self._center;
                const w = self.w;
                const yBounds = self.yBounds;
                const h = self.h;
                const twist = self.input.twist;
                const xyMiddle = self.xyMiddle;
                const _zoom = self._zoom;
                const _rotate = self._rotate;
                const hyperDroste = self.input.hyperDroste;
                const fractalPoints = self.input.fractalPoints;
                const rotatePolar = self.input.rotatePolar;
                const imageSpin = self.imageSpin;
                const r1 = self.r1;
                const p2 = self.p2;
                const p1 = self.p1;
                const r2 = self.r2;
                const strandMirror = self.input.strandMirror;
                const tileBasedOnTransparency = self.tileBasedOnTransparency;
                const levelStart = self.input.levelStart;
                const transparentOutside = self.input.transparentOutside;
                const levels = self.input.levels;
                
                var z: @Vector(2, f32) = undefined;
                var d: @Vector(2, f32) = undefined;
                var ratio: @Vector(2, f32) = undefined;
                var polar: @Vector(2, f32) = undefined;
                var radius: f32 = undefined;
                var theta: f32 = undefined;
                var div: f32 = undefined;
                var iteration: i32 = undefined;
                var sign: i32 = 0;
                var alphaRemaining: f32 = 1.0;
                var colorSoFar: @Vector(4, f32) = @Vector(4, f32){ 0.0, 0.0, 0.0, 0.0 };
                z = @Vector(2, f32){ (xBounds[0] + (xBounds[1] - xBounds[0]) * ((s[0] - _center[0]) + w / 2.0) / w), (yBounds[0] + (yBounds[1] - yBounds[0]) * ((s[1] - _center[1]) + h / 2.0) / h) };
                if (twist) {
                    z = xyMiddle + complexMult(self.complexDivision((z - xyMiddle), _zoom), complexExp(complexMult(-I, _rotate)));
                }
                if (hyperDroste) {
                    z = complexSin(z);
                }
                if (fractalPoints > 0) {
                    z = power(z, fractalPoints);
                    z = complexTan(complexMult(z, @Vector(2, f32){ 2.0, 0.0 }));
                }
                if (rotatePolar != 0.0) {
                    theta = PI180 * rotatePolar;
                    div = (1.0 + pow(z[0], 2.0) + pow(z[1], 2.0) + ((1.0 - pow(z[0], 2.0) - pow(z[1], 2.0)) * cos(theta)) - (2.0 * z[0] * sin(theta))) / 2.0;
                    z[0] = z[0] * cos(theta) + ((1.0 - pow(z[0], 2.0) - pow(z[1], 2.0)) * sin(theta) / 2.0);
                    z = self.complexDivision(z, @Vector(2, f32){ div, 0.0 });
                }
                z = matrixCalc("*", z, imageSpin);
                if (twist) {
                    z = complexLog(self.complexDivision(z, @Vector(2, f32){ r1, 0.0 }));
                }
                var alpha: @Vector(2, f32) = @Vector(2, f32){ atan((p2 / p1) * (log(r2 / r1) / TWOPI)), 0.0 };
                var f: @Vector(2, f32) = @Vector(2, f32){ cos(alpha[0]), 0.0 };
                var beta: @Vector(2, f32) = complexMult(f, complexExp(complexMult(alpha, I)));
                var angle: @Vector(2, f32) = @Vector(2, f32){ -TWOPI * p1, 0.0 };
                if (p2 > 0.0) {
                    angle = -angle;
                }
                if (strandMirror) {
                    angle /= @as(@Vector(2, f32), @splat(p2));
                }
                z = self.complexDivision(complexMult(@Vector(2, f32){ p1, 0.0 }, z), beta);
                z = complexMult(@Vector(2, f32){ r1, 0.0 }, complexExp(z));
                if (tileBasedOnTransparency and levelStart > 0) {
                    if (transparentOutside) {
                        ratio = complexMult(@Vector(2, f32){ r2 / r1, 0.0 }, complexExp(complexMult(angle, I)));
                    } else {
                        ratio = complexMult(@Vector(2, f32){ r1 / r2, 0.0 }, complexExp(complexMult(angle, -I)));
                    }
                    z = complexMult(z, power(ratio, levelStart));
                }
                iteration = 0;
                self.render(z, &alphaRemaining, &sign, &iteration, &colorSoFar);
                if (sign < 0) {
                    ratio = complexMult(@Vector(2, f32){ r2 / r1, 0.0 }, complexExp(complexMult(angle, I)));
                }
                if (sign > 0) {
                    ratio = complexMult(@Vector(2, f32){ r1 / r2, 0.0 }, complexExp(complexMult(angle, -I)));
                }
                iteration = levelStart;
                var maxIteration: i32 = levels + levelStart - 1;
                while (sign != 0 and iteration < maxIteration) {
                    z = complexMult(z, ratio);
                    self.render(z, &alphaRemaining, &sign, &iteration, &colorSoFar);
                }
                return colorSoFar;
            }
            
            pub fn evaluatePixel(self: *@This()) void {
                self.dst = @splat(0);
                const backgroundRGBA = self.input.backgroundRGBA;
                const antialiasing = self.input.antialiasing;
                const sampleStep = self.sampleStep;
                const sampleContribution = self.sampleContribution;
                
                var c: @Vector(4, f32) = backgroundRGBA;
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
                if (c[3] < 1.0) {
                    c = mix(c, backgroundRGBA, 1.0 - c[3]);
                }
                self.dst = c;
                
                self.output.dst.setPixel(self.outputCoord[0], self.outputCoord[1], self.dst);
            }
            
            // macros
            fn complexMag(z: @Vector(2, f32)) f32 {
                return pow(length(z), 2.0);
            }
            
            fn complexReciprocal(z: @Vector(2, f32)) @Vector(2, f32) {
                return @Vector(2, f32){ z[0] / complexMag(z), -z[1] / complexMag(z) };
            }
            
            fn complexMult(a: @Vector(2, f32), b: @Vector(2, f32)) @Vector(2, f32) {
                return @Vector(2, f32){ a[0] * b[0] - a[1] * b[1], a[0] * b[1] + a[1] * b[0] };
            }
            
            fn complexDivision(self: *@This(), a: @Vector(2, f32), b: @Vector(2, f32)) @Vector(2, f32) {
                return complexMult(a, complexReciprocal(b));
            }
            
            fn complexExp(z: @Vector(2, f32)) @Vector(2, f32) {
                return @Vector(2, f32){ exp(z[0]) * cos(z[1]), exp(z[0]) * sin(z[1]) };
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
            
            fn complexArg(z: @Vector(2, f32)) f32 {
                return atan2(z[1], z[0]);
            }
            
            fn polar(r: f32, a: f32) @Vector(2, f32) {
                return @Vector(2, f32){ cos(a) * r, sin(a) * r };
            }
            
            fn power(z: @Vector(2, f32), p: i32) @Vector(2, f32) {
                return @as(@Vector(2, f32), @splat(@as(f32, @floatFromInt(polar(pow(length(z), @as(f32, @floatFromInt(p))), @as(f32, @floatFromInt(p)) * complexArg(z))))));
            }
            
            fn complexTan(z: @Vector(2, f32)) @Vector(2, f32) {
                return @Vector(2, f32){ sin(2.0 * z[0]) / (cos(2.0 * z[0]) + cosh(2.0 * z[1])), sinh(2.0 * z[1]) / (cos(2.0 * z[0]) + cosh(2.0 * z[1])) };
            }
            
            fn complexLog(z: @Vector(2, f32)) @Vector(2, f32) {
                return @Vector(2, f32){ log(length(z)), complexArg(z) };
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
            
            fn atan(v: anytype) @TypeOf(v) {
                return switch (@typeInfo(@TypeOf(v))) {
                    .Vector => calc: {
                        var result: @TypeOf(v) = undefined;
                        comptime var i = 0;
                        inline while (i < @typeInfo(@TypeOf(v)).Vector.len) : (i += 1) {
                            result[i] = atan(v[i]);
                        }
                        break :calc result;
                    },
                    else => std.math.atan(v),
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
            
            fn min(v1: anytype, v2: anytype) @TypeOf(v1) {
                return switch (@typeInfo(@TypeOf(v2))) {
                    .Vector => @min(v1, v2),
                    else => switch (@typeInfo(@TypeOf(v1))) {
                        .Vector => @min(v1, @as(@TypeOf(v1), @splat(v2))),
                        else => @min(v1, v2),
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
            if (@hasField(@TypeOf(param), "defaultValue")) {
                const value: param.type = param.defaultValue;
                break :get_def @ptrCast(&value);
            } else {
                break :get_def null;
            }
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