// Pixel Bender kernel "RayTracer" (translated using pb2zig)
const std = @import("std");

pub const kernel = struct {
    // constants
    const PI: f32 = 3.141592653589793;

    // kernel information
    pub const namespace = "Newgrounds";
    pub const vendor = "Newgrounds";
    pub const version = 1;
    pub const description = "Pixel Blender Raytracing";
    pub const parameters = .{
        .viewPlaneDistance = .{
            .type = f32,
            .minValue = 0.1,
            .maxValue = 5.0,
            .defaultValue = 2.0,
        },
        .lightPos = .{
            .type = @Vector(3, f32),
            .minValue = .{ -6.0, -6.0, -25.0 },
            .maxValue = .{ 6.0, 6.0, 0.0 },
            .defaultValue = .{ 0.0, 2.0, -4.0 },
        },
        .sphere0Position = .{
            .type = @Vector(3, f32),
            .minValue = .{ -6.0, -6.0, -25.0 },
            .maxValue = .{ 6.0, 6.0, -2.0 },
            .defaultValue = .{ 0.0, 2.0, -10.0 },
        },
        .sphere0Radius = .{
            .type = f32,
            .minValue = 0.1,
            .maxValue = 8.0,
            .defaultValue = 2.0,
        },
        .sphere0Color = .{
            .type = @Vector(3, f32),
            .minValue = .{ 0.0, 0.0, 0.0 },
            .maxValue = .{ 1.0, 1.0, 1.0 },
            .defaultValue = .{ 0.8, 0.8, 0.8 },
        },
        .sphere0Material = .{
            .type = @Vector(4, f32),
            .minValue = .{ 0.0, 0.0, 0.0, 0.0 },
            .maxValue = .{ 1.0, 1.0, 1.0, 1.0 },
            .defaultValue = .{ 0.05, 0.1, 1.0, 1.0 },
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
            sphereArray: [NUM_SPHERES * SPHERE_PARAMETER_COUNT]f32 = undefined,

            // constants
            const RENDER_WIDTH: f32 = 512.0;
            const RENDER_HEIGHT: f32 = 512.0;
            const SPECULAR_EXPONENT: f32 = 50.0;
            const MAX_RAY_SHOTS: i32 = 4;
            const NUM_SPHERES: i32 = 35;
            const SPHERE_PARAMETER_COUNT: i32 = 11;

            // functions defined in kernel
            pub fn evaluateDependents(self: *@This()) void {
                const sphere0Position = self.params.sphere0Position;
                const sphere0Radius = self.params.sphere0Radius;
                const sphere0Color = self.params.sphere0Color;
                const sphere0Material = self.params.sphere0Material;
                self.sphereArray[0] = sphere0Position[0];
                self.sphereArray[1] = sphere0Position[1];
                self.sphereArray[2] = sphere0Position[2];
                self.sphereArray[3] = sphere0Radius;
                self.sphereArray[4] = sphere0Color[0];
                self.sphereArray[5] = sphere0Color[1];
                self.sphereArray[6] = sphere0Color[2];
                self.sphereArray[7] = sphere0Material[0];
                self.sphereArray[8] = sphere0Material[1];
                self.sphereArray[9] = sphere0Material[2];
                self.sphereArray[10] = sphere0Material[3];
                self.sphereArray[11] = 0.0;
                self.sphereArray[12] = -1003.0;
                self.sphereArray[13] = -8.0;
                self.sphereArray[14] = 1000.0;
                self.sphereArray[15] = 0.6;
                self.sphereArray[16] = 0.6;
                self.sphereArray[17] = 0.6;
                self.sphereArray[18] = 0.1;
                self.sphereArray[19] = 0.8;
                self.sphereArray[20] = 0.5;
                self.sphereArray[21] = 0.5;
                {
                    var i: i32 = SPHERE_PARAMETER_COUNT * 2;
                    while (i < NUM_SPHERES * SPHERE_PARAMETER_COUNT) {
                        var ifloat: f32 = @as(f32, @floatFromInt(i));
                        self.sphereArray[@intCast(i)] = sin(ifloat / 5.0) * 6.0;
                        self.sphereArray[@intCast(i + 1)] = sin(ifloat / 4.1) * 2.5;
                        self.sphereArray[@intCast(i + 2)] = -18.0 - sin(ifloat / 3.1 + 1.2) * 10.0;
                        self.sphereArray[@intCast(i + 3)] = pow(sin(ifloat / 1.34 + 65.3) * 0.5 + 0.5, 3.0) * 1.0 + 0.2;
                        self.sphereArray[@intCast(i + 4)] = cos(ifloat / 2.1 + 1.3) * 0.5 + 0.5;
                        self.sphereArray[@intCast(i + 5)] = cos(ifloat / 0.1 + 1.3) * 0.5 + 0.5;
                        self.sphereArray[@intCast(i + 6)] = cos(ifloat / 5.1 + 6.3) * 0.5 + 0.5;
                        self.sphereArray[@intCast(i + 7)] = 0.1;
                        self.sphereArray[@intCast(i + 8)] = 0.7;
                        self.sphereArray[@intCast(i + 9)] = 1.0;
                        self.sphereArray[@intCast(i + 10)] = pow(sin(ifloat / 2.1 + 1.243) * 0.5 + 0.5, 5.0);
                        i += SPHERE_PARAMETER_COUNT;
                    }
                }
            }

            fn shootRay(self: *@This(), origin: @Vector(3, f32), dir: @Vector(3, f32), hit: *i32, pos: *@Vector(3, f32), t: *f32, sphereNum: *i32) void {
                const sphereArray = self.sphereArray;
                var curT: f32 = undefined;
                var B: f32 = undefined;
                var C: f32 = undefined;
                var disc: f32 = undefined;
                var spherePos: @Vector(3, f32) = undefined;
                var sphereToOrigin: @Vector(3, f32) = undefined;
                var sphereRadius: f32 = undefined;
                hit.* = 0;
                t.* = 99999.0;
                {
                    var i: i32 = 0;
                    while (i < NUM_SPHERES * SPHERE_PARAMETER_COUNT) {
                        spherePos = @Vector(3, f32){
                            sphereArray[@intCast(i)],
                            sphereArray[@intCast(i + 1)],
                            sphereArray[@intCast(i + 2)],
                        };
                        sphereRadius = sphereArray[@intCast(i + 3)];
                        sphereToOrigin = origin - spherePos;
                        B = dot(sphereToOrigin, dir);
                        C = dot(sphereToOrigin, sphereToOrigin) - sphereRadius * sphereRadius;
                        disc = B * B - C;
                        if (disc > 0.0) {
                            curT = -B - sqrt(disc);
                            if (curT > 0.0 and curT < t.*) {
                                sphereNum.* = i;
                                t.* = curT;
                                hit.* = 1;
                            }
                        }
                        i += SPHERE_PARAMETER_COUNT;
                    }
                }
                pos.* = origin + dir * @as(@Vector(3, f32), @splat(t.*));
            }

            pub fn evaluatePixel(self: *@This()) void {
                const viewPlaneDistance = self.params.viewPlaneDistance;
                const lightPos = self.params.lightPos;
                const dst = self.output.dst;
                const sphereArray = self.sphereArray;
                self.dst = @splat(0.0);

                self.dst = @Vector(4, f32){ 0.0, 0.0, 0.0, 1.0 };
                var origin: @Vector(3, f32) = .{ 0.0, 0.0, 0.0 };
                var dir: @Vector(3, f32) = .{
                    2.0 * self.outCoord()[0] / RENDER_WIDTH - 1.0,
                    -2.0 * self.outCoord()[1] / RENDER_HEIGHT + 1.0,
                    -viewPlaneDistance,
                };
                var sphereNum: i32 = undefined;
                var spherePos: @Vector(3, f32) = undefined;
                var sphereRadius: f32 = undefined;
                var sphereColor: @Vector(3, f32) = undefined;
                var sphereMaterial: @Vector(4, f32) = undefined;
                var hitPoint: @Vector(3, f32) = undefined;
                var t: f32 = undefined;
                var hit: i32 = undefined;
                var sphereHit: @Vector(3, f32) = undefined;
                var n: @Vector(3, f32) = undefined;
                var lightVector: @Vector(3, f32) = undefined;
                var lightVectorLen: f32 = undefined;
                var l: @Vector(3, f32) = undefined;
                var lReflect: @Vector(3, f32) = undefined;
                var dirReflect: @Vector(3, f32) = undefined;
                var shadowTest: i32 = undefined;
                var temp: @Vector(3, f32) = undefined;
                var temp2: i32 = undefined;
                var rayShots: i32 = MAX_RAY_SHOTS;
                var colorScale: @Vector(3, f32) = .{ 1.0, 1.0, 1.0 };
                var specular: f32 = undefined;
                var diffuse: f32 = undefined;
                var lightVal: f32 = undefined;
                var phi: f32 = undefined;
                var uv: @Vector(2, f32) = undefined;
                while (rayShots > 0) {
                    dir = normalize(dir);
                    self.shootRay(origin, dir, &hit, &hitPoint, &t, &sphereNum);
                    if (hit != 0) {
                        spherePos = @Vector(3, f32){
                            sphereArray[@intCast(sphereNum)],
                            sphereArray[@intCast(sphereNum + 1)],
                            sphereArray[@intCast(sphereNum + 2)],
                        };
                        sphereRadius = sphereArray[@intCast(sphereNum + 3)];
                        sphereColor = @Vector(3, f32){
                            sphereArray[@intCast(sphereNum + 4)],
                            sphereArray[@intCast(sphereNum + 5)],
                            sphereArray[@intCast(sphereNum + 6)],
                        };
                        sphereMaterial = @Vector(4, f32){
                            sphereArray[@intCast(sphereNum + 7)],
                            sphereArray[@intCast(sphereNum + 8)],
                            sphereArray[@intCast(sphereNum + 9)],
                            sphereArray[@intCast(sphereNum + 10)],
                        };
                        sphereHit = hitPoint - spherePos;
                        n = sphereHit / @as(@Vector(3, f32), @splat(sphereRadius));
                        lightVector = lightPos - hitPoint;
                        lightVectorLen = length(lightVector);
                        l = lightVector / @as(@Vector(3, f32), @splat(lightVectorLen));
                        self.shootRay(hitPoint, l, &shadowTest, &temp, &t, &temp2);
                        if (shadowTest == 0) {
                            shadowTest = 1;
                        } else if (t < lightVectorLen) {
                            shadowTest = 0;
                        }
                        diffuse = dot(l, n);
                        lReflect = l - @as(@Vector(3, f32), @splat(2.0 * diffuse)) * n;
                        specular = dot(dir, lReflect);
                        diffuse = max(diffuse, 0.0);
                        specular = pow(max(specular, 0.0), SPECULAR_EXPONENT);
                        if (sphereNum == 11) {
                            phi = acos(-dot(@Vector(3, f32){ 1.0, 0.0, 0.0 }, n));
                            uv = @Vector(2, f32){
                                acos(dot(@Vector(3, f32){ 0.0, 0.0, 1.0 }, n) / sin(phi)) / (2.0 * PI),
                                phi / PI,
                            };
                            sphereColor *= @as(@Vector(3, f32), @splat(@as(f32, if ((mod(floor(uv[0] * 2000.0) + floor(uv[1] * 2000.0), 2.0) == 0.0)) 0.5 else 1.0)));
                        }
                        lightVal = (sphereMaterial[0] + @as(f32, @floatFromInt(shadowTest)) * (diffuse * sphereMaterial[1] + specular * sphereMaterial[2]));
                        var res: @Vector(3, f32) = colorScale * @as(@Vector(3, f32), @splat(lightVal)) * sphereColor;
                        self.dst += @Vector(4, f32){
                            res[0],
                            res[1],
                            res[2],
                            0.0,
                        };
                        if (sphereMaterial[3] > 0.0) {
                            dirReflect = dir - @as(@Vector(3, f32), @splat(2.0 * dot(dir, n))) * n;
                            dirReflect = normalize(dirReflect);
                            origin = hitPoint;
                            dir = dirReflect;
                            rayShots -= 1;
                            colorScale *= @as(@Vector(3, f32), @splat(sphereMaterial[3])) * sphereColor;
                        } else {
                            rayShots = 0;
                        }
                    } else {
                        rayShots = 0;
                    }
                }

                dst.setPixel(self.outputCoord[0], self.outputCoord[1], self.dst);
            }

            pub fn outCoord(self: *@This()) @Vector(2, f32) {
                return @as(@Vector(2, f32), @floatFromInt(self.outputCoord)) + @as(@Vector(2, f32), @splat(0.5));
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

    fn sqrt(v: anytype) @TypeOf(v) {
        return @sqrt(v);
    }

    fn floor(v: anytype) @TypeOf(v) {
        return @floor(v);
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

    fn normalize(v: anytype) @TypeOf(v) {
        return switch (@typeInfo(@TypeOf(v))) {
            .Vector => v / @as(@TypeOf(v), @splat(@sqrt(@reduce(.Add, v * v)))),
            else => if (v > 0) 1 else -1,
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
