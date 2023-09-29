// Pixel Bender "BezierAligner" (translated using pb2zig)
const std = @import("std");

pub const kernel = struct {
    // kernel information
    pub const namespace = "BezierAligner";
    pub const vendor = "Petri Leskinen";
    pub const version = 1;
    pub const description = "Draws an Image along a Bezier Curve";
    pub const parameters = .{
        .startpoint = .{
            .type = @Vector(2, f32),
            .minValue = .{ -300.0, -300.0 },
            .maxValue = .{ 900.0, 900.0 },
            .defaultValue = .{ 50.0, 200.0 },
            .description = "start point for bezier sequence",
        },
        .control1 = .{
            .type = @Vector(2, f32),
            .minValue = .{ -300.0, -300.0 },
            .maxValue = .{ 900.0, 900.0 },
            .defaultValue = .{ 200.0, 100.0 },
            .description = "first control point for bezier sequence",
        },
        .control2 = .{
            .type = @Vector(2, f32),
            .minValue = .{ -300.0, -300.0 },
            .maxValue = .{ 900.0, 900.0 },
            .defaultValue = .{ 400.0, 300.0 },
            .description = "first control point for bezier sequence",
        },
        .endpoint = .{
            .type = @Vector(2, f32),
            .minValue = .{ -300.0, -300.0 },
            .maxValue = .{ 900.0, 900.0 },
            .defaultValue = .{ 550.0, 200.0 },
            .description = "end point for bezier sequence",
        },
        .scale = .{
            .type = @Vector(2, f32),
            .minValue = .{ 0.5, 0.5 },
            .maxValue = .{ 2.5, 2.5 },
            .defaultValue = .{ 1.0, 1.0 },
            .description = "Scales the texture image",
        },
        .imagewidth = .{
            .type = f32,
            .minValue = 0.0,
            .maxValue = 500.0,
            .defaultValue = 200.0,
            .description = "imagewidth: how wide the repeating part is",
        },
        .offset = .{
            .type = @Vector(2, f32),
            .minValue = .{ -300.0, -300.0 },
            .maxValue = .{ 300.0, 300.0 },
            .defaultValue = .{ 0.0, 0.0 },
            .description = "offset.x=Displacement along the curve, offset.y=Displacement perpendicular to the curve",
        },
        .tstart = .{
            .type = f32,
            .minValue = 0.0,
            .maxValue = 1.0,
            .defaultValue = 0.0,
            .description = "the default 0 means that the curve starts from the startpoint",
        },
        .tend = .{
            .type = f32,
            .minValue = 0.0,
            .maxValue = 1.0,
            .defaultValue = 1.0,
            .description = "the default 1 means that the curve ends at the endpoint",
        },
        .rotation = .{
            .type = [2]@Vector(2, f32),
            .minValue = [2]@Vector(2, f32){
                .{ -1, -1 },
                .{ -1, -1 }
            },
            .maxValue = [2]@Vector(2, f32){
                .{ 1, 1 },
                .{ 1, 1 }
            },
            .defaultValue = [2]@Vector(2, f32){
                .{ 1, 0 },
                .{ 0, 1 }
            },
            .description = "Rotation around the axis",
        },
    };
    pub const inputImages = .{
        .background = .{ .channels = 4 },
        .texture = .{ .channels = 4 },
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
            
            // functions defined in kernel
            pub fn evaluatePixel(self: *@This()) void {
                self.dst = @splat(0);
                const background = self.input.background;
                const startpoint = self.input.startpoint;
                const control1 = self.input.control1;
                const control2 = self.input.control2;
                const endpoint = self.input.endpoint;
                const tstart = self.input.tstart;
                const tend = self.input.tend;
                const rotation = self.input.rotation;
                const scale = self.input.scale;
                const offset = self.input.offset;
                const imagewidth = self.input.imagewidth;
                const texture = self.input.texture;
                
                var p: @Vector(2, f32) = self.outCoord();
                self.dst = background.sampleLinear(p);
                var fx: @Vector(4, f32) = @Vector(4, f32){ startpoint[0], 3.0 * (control1[0] - startpoint[0]), 3.0 * (startpoint[0] - 2.0 * control1[0] + control2[0]), endpoint[0] - startpoint[0] + 3.0 * (control1[0] - control2[0]) };
                var fy: @Vector(4, f32) = @Vector(4, f32){ startpoint[1], 3.0 * (control1[1] - startpoint[1]), 3.0 * (startpoint[1] - 2.0 * control1[1] + control2[1]), endpoint[1] - startpoint[1] + 3.0 * (control1[1] - control2[1]) };
                var dfx: @Vector(4, f32) = derivative(fx);
                var dfy: @Vector(4, f32) = derivative(fy);
                var ta: f32 = tstart;
                var tb: f32 = tend;
                var d: @Vector(2, f32) = matrixCalc("*", rotation, @Vector(2, f32){ eval(dfx, ta), eval(dfy, ta) });
                d /= @as(@Vector(2, f32), @splat(length(d)));
                var p0: @Vector(2, f32) = matrixCalc("*", [2]@Vector(2, f32){
                    .{ d[0], -d[1] },
                    .{ d[1], d[0] }
                }, (p - @Vector(2, f32){ eval(fx, ta), eval(fy, ta) }));
                d = matrixCalc("*", rotation, @Vector(2, f32){ eval(dfx, tb), eval(dfy, tb) });
                var p1: @Vector(2, f32) = matrixCalc("*", [2]@Vector(2, f32){
                    .{ d[0], -d[1] },
                    .{ d[1], d[0] }
                }, (p - @Vector(2, f32){ eval(fx, tb), eval(fy, tb) }));
                if ((p0[0] < 0.0 and p1[0] > 0.0) or (p0[0] > 0.0 and p1[0] < 0.0)) {
                    p1 /= @as(@Vector(2, f32), @splat(length(d)));
                    var t: f32 = undefined;
                    var tmp: f32 = undefined;
                    var p2: @Vector(2, f32) = undefined;
                    {
                        var i: i32 = 0;
                        while (i < 2) {
                            t = ta + p0[0] / (p0[0] - p1[0]) * (tb - ta);
                            d = matrixCalc("*", rotation, @Vector(2, f32){ eval(dfx, t), eval(dfy, t) });
                            d /= @as(@Vector(2, f32), @splat(length(d)));
                            p2 = matrixCalc("*", [2]@Vector(2, f32){
                                .{ d[0], -d[1] },
                                .{ d[1], d[0] }
                            }, (p - @Vector(2, f32){ eval(fx, t), eval(fy, t) }));
                            if (sign(p2[0]) == sign(p0[0])) {
                                p0 = p2;
                                ta = t;
                            } else {
                                p1 = p2;
                                tb = t;
                            }
                            i += 1;
                        }
                    }
                    t = ta + p0[0] / (p0[0] - p1[0]) * (tb - ta);
                    d = matrixCalc("*", rotation, @Vector(2, f32){ eval(dfx, t), eval(dfy, t) });
                    d /= @as(@Vector(2, f32), @splat(length(d)));
                    p2 = matrixCalc("*", [2]@Vector(2, f32){
                        .{ d[0], -d[1] },
                        .{ d[1], d[0] }
                    }, (p - @Vector(2, f32){ eval(fx, t), eval(fy, t) }));
                    tmp = length(@Vector(2, f32){ eval(dfx, 0.0), eval(dfy, 0.0) }) + 3.0 * (length(@Vector(2, f32){ eval(dfx, 0.33333333 * t), eval(dfy, 0.33333333 * t) }) + length(@Vector(2, f32){ eval(dfx, 0.66666666 * t), eval(dfy, 0.66666666 * t) })) + length(@Vector(2, f32){ eval(dfx, t), eval(dfy, t) });
                    p2[0] = 0.125 * t * tmp;
                    p2 /= scale;
                    p2 += offset;
                    if (imagewidth > 0.1) {
                        p2[0] = mod(p2[0], imagewidth);
                    }
                    var dst2: @Vector(4, f32) = texture.sampleLinear(p2);
                    self.dst += @as(@Vector(4, f32), @splat(dst2[3])) * (dst2 - self.dst);
                }
                
                self.output.dst.setPixel(self.outputCoord[0], self.outputCoord[1], self.dst);
            }
            
            // macros
            fn derivative(f: @Vector(4, f32)) @Vector(4, f32) {
                return @Vector(4, f32){ f[1], 2.0 * f[2], 3.0 * f[3], 0.0 };
            }
            
            fn eval(f: @Vector(4, f32), t: f32) f32 {
                return (f[0] + t * (f[1] + t * (f[2] + t * f[3])));
            }
            
            // built-in Pixel Bender functions
            fn outCoord(self: *@This()) @Vector(2, f32) {
                const x = self.outputCoord[0];
                const y = self.outputCoord[1];
                return .{ @floatFromInt(x), @floatFromInt(y) };
            }
            
            fn sign(v: anytype) @TypeOf(v) {
                return std.math.sign(v);
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