// Pixel Bender kernel "Droste" (translated using pb2zig)
const std = @import("std");

pub const kernel = struct {
    // constants
    const PI: f32 = 3.141592653;
    const TWOPI: f32 = 6.283185307;
    const PI180: f32 = 0.017453292;
    const I: @Vector(2, f32) = @Vector(2, f32){ 0.0, 1.0 };

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
            .defaultValue = false,
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
            .defaultValue = false,
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
    fn Instance(comptime InputStruct: type, comptime OutputStruct: type, comptime ParameterStruct: type) type {
        return struct {
            params: ParameterStruct,
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
                const size = self.params.size;
                const radiusInside = self.params.radiusInside;
                const radiusOutside = self.params.radiusOutside;
                const periodicity = self.params.periodicity;
                const strands = self.params.strands;
                const zoom = self.params.zoom;
                const rotate = self.params.rotate;
                const antialiasing = self.params.antialiasing;
                const center = self.params.center;
                const centerShift = self.params.centerShift;
                const transparentInside = self.params.transparentInside;
                const transparentOutside = self.params.transparentOutside;
                const twist = self.params.twist;
                const periodicityAuto = self.params.periodicityAuto;
                const rotateSpin = self.params.rotateSpin;
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
                self.tileBasedOnTransparency = @as(bool, if ((transparentInside or !transparentOutside)) true else false);
                self._shift = @as(@Vector(2, f32), @splat(1.0)) + centerShift / @as(@Vector(2, f32), @splat(100.0));
                self._center = (@as(@Vector(2, f32), floatVectorFromIntVector(size)) / @as(@Vector(2, f32), @splat(2.0))) + center * (@as(@Vector(2, f32), floatVectorFromIntVector(size)) / @as(@Vector(2, f32), @splat(2.0))) / @as(@Vector(2, f32), @splat(100.0));
                self.w = @as(f32, @floatFromInt(size[0]));
                self.h = @as(f32, @floatFromInt(size[1]));
                self.minDimension = @as(@Vector(2, f32), @splat(min(self.w, self.h) / 2.0));
                if (periodicityAuto) {
                    self.p1 = self.p2 / 2.0 * (1.0 + sqrt(1.0 - pow(log(self.r2 / self.r1) / PI, 2.0)));
                }
                self._rotate = if (self.p1 > 0.0) @Vector(2, f32){ -PI180 * rotate, 0.0 } else @Vector(2, f32){ PI180 * rotate, 0.0 };
                var sc: f32 = cos(radians(rotateSpin));
                var ss: f32 = sin(radians(rotateSpin));
                self.imageSpin = [2]@Vector(2, f32){
                    .{ sc, ss },
                    .{ -ss, sc },
                };
                self._zoom = @Vector(2, f32){
                    (exp(zoom) + radiusInside - 1.0) / 100.0,
                    0.0,
                };
                if (twist) {
                    self.xBounds = @Vector(2, f32){ -self.r2, self.r2 };
                    self.yBounds = @Vector(2, f32){ -self.r2, self.r2 };
                } else {
                    self.xBounds = @Vector(2, f32){
                        -log(self.r2 / self.r1),
                        log(self.r2 / self.r1),
                    };
                    self.yBounds = @Vector(2, f32){ 0.0, 2.1 * PI };
                }
                self.xyMiddle = @Vector(2, f32){
                    self.xBounds[0] + self.xBounds[1],
                    self.yBounds[0] + self.yBounds[1],
                } / @as(@Vector(2, f32), @splat(2.0));
                var xyRange: @Vector(2, f32) = .{
                    self.xBounds[1] - self.xBounds[0],
                    self.yBounds[1] - self.yBounds[0],
                };
                xyRange[0] = xyRange[1] * (self.w / self.h);
                self.xBounds = @Vector(2, f32){
                    self.xyMiddle[0] - xyRange[0] / 2.0,
                    self.xyMiddle[0] + xyRange[0] / 2.0,
                };
                self.sampleStep = 1.0 / @as(f32, @floatFromInt(antialiasing));
                self.sampleContribution = 1.0 / pow(@as(f32, @floatFromInt(antialiasing)), 2.0);
            }

            fn render(self: *@This(), z: @Vector(2, f32), alphaRemaining: *f32, sign: *i32, iteration: *i32, colorSoFar: *@Vector(4, f32)) void {
                const transparentOutside = self.params.transparentOutside;
                const src = self.input.src;
                const r1 = self.r1;
                const r2 = self.r2;
                const _shift = self._shift;
                const minDimension = self.minDimension;
                const tileBasedOnTransparency = self.tileBasedOnTransparency;
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
                    sign.* = if ((radius < r1)) -1 else @as(i32, if (radius > r2) 1 else 0);
                }
                iteration.* += 1;
            }

            fn renderPoint(self: *@This(), s: @Vector(2, f32)) @Vector(4, f32) {
                const strandMirror = self.params.strandMirror;
                const levels = self.params.levels;
                const levelStart = self.params.levelStart;
                const transparentOutside = self.params.transparentOutside;
                const twist = self.params.twist;
                const rotatePolar = self.params.rotatePolar;
                const hyperDroste = self.params.hyperDroste;
                const fractalPoints = self.params.fractalPoints;
                const r1 = self.r1;
                const r2 = self.r2;
                const p1 = self.p1;
                const p2 = self.p2;
                const w = self.w;
                const h = self.h;
                const _center = self._center;
                const _rotate = self._rotate;
                const _zoom = self._zoom;
                const xBounds = self.xBounds;
                const yBounds = self.yBounds;
                const xyMiddle = self.xyMiddle;
                const imageSpin = self.imageSpin;
                const tileBasedOnTransparency = self.tileBasedOnTransparency;
                var z: @Vector(2, f32) = undefined;
                var d: @Vector(2, f32) = undefined;
                _ = d;
                var ratio: @Vector(2, f32) = undefined;
                var radius: f32 = undefined;
                _ = radius;
                var theta: f32 = undefined;
                var div: f32 = undefined;
                var iteration: i32 = undefined;
                var sign: i32 = 0;
                var alphaRemaining: f32 = 1.0;
                var colorSoFar: @Vector(4, f32) = .{ 0.0, 0.0, 0.0, 0.0 };
                z = @Vector(2, f32){
                    (xBounds[0] + (xBounds[1] - xBounds[0]) * ((s[0] - _center[0]) + w / 2.0) / w),
                    (yBounds[0] + (yBounds[1] - yBounds[0]) * ((s[1] - _center[1]) + h / 2.0) / h),
                };
                if (twist) {
                    z = xyMiddle + complexMult(complexDivision((z - xyMiddle), _zoom), complexExp(complexMult(-I, _rotate)));
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
                    z = complexDivision(z, @Vector(2, f32){ div, 0.0 });
                }
                z = @"V * M"(z, imageSpin);
                if (twist) {
                    z = complexLog(complexDivision(z, @Vector(2, f32){ r1, 0.0 }));
                }
                var alpha: @Vector(2, f32) = .{
                    atan((p2 / p1) * (log(r2 / r1) / TWOPI)),
                    0.0,
                };
                var f: @Vector(2, f32) = .{ cos(alpha[0]), 0.0 };
                var beta: @Vector(2, f32) = complexMult(f, complexExp(complexMult(alpha, I)));
                var angle: @Vector(2, f32) = .{ -TWOPI * p1, 0.0 };
                if (p2 > 0.0) {
                    angle = -angle;
                }
                if (strandMirror) {
                    angle /= @as(@Vector(2, f32), @splat(p2));
                }
                z = complexDivision(complexMult(@Vector(2, f32){ p1, 0.0 }, z), beta);
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
                const antialiasing = self.params.antialiasing;
                const backgroundRGBA = self.params.backgroundRGBA;
                const dst = self.output.dst;
                const sampleStep = self.sampleStep;
                const sampleContribution = self.sampleContribution;
                self.dst = @splat(0.0);

                var c: @Vector(4, f32) = backgroundRGBA;
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
                if (c[3] < 1.0) {
                    c = mix(c, backgroundRGBA, 1.0 - c[3]);
                }
                self.dst = c;

                dst.setPixel(self.outputCoord[0], self.outputCoord[1], self.dst);
            }

            // macros
            fn complexMult(a: @Vector(2, f32), b: @Vector(2, f32)) @Vector(2, f32) {
                return @Vector(2, f32){
                    a[0] * b[0] - a[1] * b[1],
                    a[0] * b[1] + a[1] * b[0],
                };
            }

            fn complexMag(z: @Vector(2, f32)) f32 {
                return pow(length(z), 2.0);
            }

            fn complexReciprocal(z: @Vector(2, f32)) @Vector(2, f32) {
                return @Vector(2, f32){
                    z[0] / complexMag(z),
                    -z[1] / complexMag(z),
                };
            }

            fn complexDivision(a: @Vector(2, f32), b: @Vector(2, f32)) @Vector(2, f32) {
                return complexMult(a, complexReciprocal(b));
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

            fn complexTan(z: @Vector(2, f32)) @Vector(2, f32) {
                return @Vector(2, f32){
                    sin(2.0 * z[0]) / (cos(2.0 * z[0]) + cosh(2.0 * z[1])),
                    sinh(2.0 * z[1]) / (cos(2.0 * z[0]) + cosh(2.0 * z[1])),
                };
            }

            fn polar(r: f32, a: f32) @Vector(2, f32) {
                return @Vector(2, f32){
                    cos(a) * r,
                    sin(a) * r,
                };
            }

            fn power(z: @Vector(2, f32), p: i32) @Vector(2, f32) {
                return polar(pow(length(z), @as(f32, @floatFromInt(p))), @as(f32, @floatFromInt(p)) * complexArg(z));
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
        // return switch (@typeInfo(@TypeOf(v))) {
            //     .Vector => @sqrt(@reduce(.Add, v * v)),
            //     else => @abs(v),
            // };
        return switch (@typeInfo(@TypeOf(v))) {
            .Vector => @sqrt(@reduce(.Add, v * v)),
            else => @fabs(v),
        };
    }

    fn @"V * M"(v1: anytype, m2: anytype) @TypeOf(v1) {
        var result: @TypeOf(v1) = undefined;
        inline for (m2, 0..) |column, c| {
            result[c] = @reduce(.Add, column * v1);
        }
        return result;
    }

    fn floatVectorFromIntVector(v: anytype) @Vector(@typeInfo(@TypeOf(v)).Vector.len, f32) {
        const len = @typeInfo(@TypeOf(v)).Vector.len;
        var result: @Vector(len, f32) = undefined;
        comptime var i = 0;
        inline while (i < len) : (i += 1) {
            result[i] = @floatFromInt(v[i]);
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
    instance.outputCoord[1] = start;
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
            // requires newest version of zig, which has issues
            //
            // const numerator: FPixel = switch (len) {
                //     1 => @floatFromInt(@shuffle(T, pixel, undefined, @Vector(1, i32){0})),
                //     2 => @floatFromInt(@shuffle(T, pixel, undefined, @Vector(2, i32){ 0, 3 })),
                //     3 => @floatFromInt(@shuffle(T, pixel, undefined, @Vector(3, i32){ 0, 1, 2 })),
                //     4 => @floatFromInt(pixel),
                //     else => @compileError("Unsupported number of channels: " ++ len),
                // };
            // const denominator: FPixel = @splat(@floatFromInt(std.math.maxInt(T)));
            // return numerator / denominator;
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
            // const max: f32 = @floatFromInt(std.math.maxInt(T));
            // const multiplier: FPixel = @splat(max);
            // const product: FPixel = contrain(pixel * multiplier, max);
            // const maxAlpha: @Vector(1, f32) = .{std.math.maxInt(T)};
            // const result: Pixel = switch (len) {
                //     1 => @intFromFloat(@shuffle(f32, product, maxAlpha, @Vector(4, i32){ 0, 0, 0, -1 })),
                //     2 => @intFromFloat(@shuffle(f32, product, undefined, @Vector(4, i32){ 0, 0, 0, 1 })),
                //     3 => @intFromFloat(@shuffle(f32, product, maxAlpha, @Vector(4, i32){ 0, 1, 2, -1 })),
                //     4 => @intFromFloat(product),
                //     else => @compileError("Unsupported number of channels: " ++ len),
                // };
            // return result;
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
