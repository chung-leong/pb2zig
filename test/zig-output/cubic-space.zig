// Pixel Bender "CubicSpace" (translated using pb2zig)
const std = @import("std");

pub const kernel = struct {
    // kernel information
    pub const namespace = "CubicSpace";
    pub const vendor = "Petri Leskinen";
    pub const version = 1;
    pub const description = "cubicspace";
    pub const parameters = .{
        .center = .{
            .type = @Vector(2, f32),
            .minValue = .{ -200.0, -200.0 },
            .maxValue = .{ 500.0, 500.0 },
            .defaultValue = .{ 300.0, 200.0 },
            .parameterType = "position",
        },
        .size = .{
            .type = f32,
            .minValue = 10.0,
            .maxValue = 300.0,
            .defaultValue = 100.0,
        },
        .fade = .{
            .type = f32,
            .minValue = 0.0,
            .maxValue = 1.0,
            .defaultValue = 0.8,
        },
        .focallength = .{
            .type = f32,
            .minValue = 50.0,
            .maxValue = 1000.0,
            .defaultValue = 250.0,
        },
        .imagesize = .{
            .type = @Vector(2, f32),
            .minValue = .{ 1.0, 1.0 },
            .maxValue = .{ 600.0, 600.0 },
            .defaultValue = .{ 400.0, 400.0 },
            .parameterType = "position",
        },
        .colorX = .{
            .type = @Vector(4, f32),
            .minValue = .{ 0.0, 0.0, 0.0, 0.0 },
            .maxValue = .{ 1.0, 1.0, 1.0, 1.0 },
            .defaultValue = .{ 1.0, 1.0, 1.0, 1.0 },
            .parameterType = "colorRGBA",
        },
        .colorY = .{
            .type = @Vector(4, f32),
            .minValue = .{ 0.0, 0.0, 0.0, 0.0 },
            .maxValue = .{ 1.0, 1.0, 1.0, 1.0 },
            .defaultValue = .{ 1.0, 1.0, 1.0, 1.0 },
            .parameterType = "colorRGBA",
        },
        .colorZ = .{
            .type = @Vector(4, f32),
            .minValue = .{ 0.0, 0.0, 0.0, 0.0 },
            .maxValue = .{ 1.0, 1.0, 1.0, 1.0 },
            .defaultValue = .{ 0.8, 0.8, 0.8, 1.0 },
            .parameterType = "colorRGBA",
        },
        .bgcolor = .{
            .type = @Vector(4, f32),
            .minValue = .{ 0.0, 0.0, 0.0, 0.0 },
            .maxValue = .{ 1.0, 1.0, 1.0, 1.0 },
            .defaultValue = .{ 0.0, 0.0, 0.0, 1.0 },
            .parameterType = "colorRGBA",
        },
        .orientation = .{
            .type = [4]@Vector(4, f32),
            .minValue = [4]@Vector(4, f32){
                .{ -1, -1, -1, 0 },
                .{ -1, -1, -1, 0 },
                .{ -1, -1, -1, 0 },
                .{ -500, -500, -500, -1 }
            },
            .maxValue = [4]@Vector(4, f32){
                .{ 1, 1, 1, 0 },
                .{ 1, 1, 1, 0 },
                .{ 1, 1, 1, 0 },
                .{ 500, 500, 500, 1 }
            },
            .defaultValue = [4]@Vector(4, f32){
                .{ 1, 0, 0, 0 },
                .{ 0, 1, 0, 0 },
                .{ 0, 0, 1, 0 },
                .{ 0, 50, 50, 1 }
            },
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
            
            // constants
            const eps: f32 = 0.000001;
            
            // functions defined in kernel
            pub fn evaluatePixel(self: *@This()) void {
                self.dst = @splat(0);
                const center = self.input.center;
                const focallength = self.input.focallength;
                const orientation = self.input.orientation;
                const size = self.input.size;
                const colorX = self.input.colorX;
                const src = self.input.src;
                const imagesize = self.input.imagesize;
                const colorY = self.input.colorY;
                const colorZ = self.input.colorZ;
                const bgcolor = self.input.bgcolor;
                const fade = self.input.fade;
                
                var po: @Vector(2, f32) = self.outCoord() - center;
                var theta: f32 = po[0] / focallength;
                var viewdir: @Vector(3, f32) = @as(@Vector(3, f32), @splat(focallength)) * (@as(@Vector(3, f32), @splat(cos(theta))) * @shuffle(f32, orientation[0], undefined, @Vector(3, i32){ 0, 1, 2 }) + @as(@Vector(3, f32), @splat(sin(theta))) * @shuffle(f32, orientation[1], undefined, @Vector(3, i32){ 0, 1, 2 })) + @as(@Vector(3, f32), @splat(po[1])) * @shuffle(f32, orientation[2], undefined, @Vector(3, i32){ 0, 1, 2 });
                var v: @Vector(3, f32) = @shuffle(f32, orientation[3], undefined, @Vector(3, i32){ 0, 1, 2 }) / @as(@Vector(3, f32), @splat(size));
                var currentAlpha: f32 = 1.0;
                self.dst = @Vector(4, f32){ 0.0, 0.0, 0.0, 0.0 };
                var dst2: @Vector(4, f32) = undefined;
                var t: @Vector(3, f32) = undefined;
                var n: i32 = 5;
                {
                    var i: i32 = 0;
                    while (i < n) {
                        t[0] = (@as(f32, if (viewdir[0] < 0.0) -eps else 1.0 + eps));
                        t[1] = (@as(f32, if (viewdir[1] < 0.0) -eps else 1.0 + eps));
                        t[2] = (@as(f32, if (viewdir[2] < 0.0) -eps else 1.0 + eps));
                        t = (floor(v + t) - v) / viewdir;
                        if (t[0] < t[1] and t[0] < t[2]) {
                            v += @as(@Vector(3, f32), @splat(t[0])) * viewdir;
                            dst2 = colorX * src.sampleLinear(fract(@shuffle(f32, v, undefined, @Vector(2, i32){ 1, 2 })) * imagesize);
                        } else {
                            if (t[1] < t[0] and t[1] < t[2]) {
                                v += @as(@Vector(3, f32), @splat(t[1])) * viewdir;
                                dst2 = colorY * src.sampleLinear(fract(@shuffle(f32, v, undefined, @Vector(2, i32){ 0, 2 })) * imagesize);
                            } else {
                                v += @as(@Vector(3, f32), @splat(t[2])) * viewdir;
                                dst2 = colorZ * src.sampleLinear(abs(fract(@shuffle(f32, v, undefined, @Vector(2, i32){ 0, 1 }))) * imagesize);
                            }
                        }
                        dst2 = @shuffle(f32, dst2, mix(@shuffle(f32, bgcolor, undefined, @Vector(3, i32){ 0, 1, 2 }), @shuffle(f32, dst2, undefined, @Vector(3, i32){ 0, 1, 2 }), currentAlpha), @Vector(4, i32){ -1, -2, -3, 3 });
                        currentAlpha *= fade;
                        self.dst += dst2 * @as(@Vector(4, f32), @splat(dst2[3])) * @as(@Vector(4, f32), @splat((1.0 - self.dst[3])));
                        i += 1;
                    }
                }
                self.dst += @as(@Vector(4, f32), @splat((1.0 - self.dst[3]))) * bgcolor;
                
                self.output.dst.setPixel(self.outputCoord[0], self.outputCoord[1], self.dst);
            }
            
            // built-in Pixel Bender functions
            fn outCoord(self: *@This()) @Vector(2, f32) {
                const x = self.outputCoord[0];
                const y = self.outputCoord[1];
                return .{ @floatFromInt(x), @floatFromInt(y) };
            }
            
            fn sin(v: anytype) @TypeOf(v) {
                return @sin(v);
            }
            
            fn cos(v: anytype) @TypeOf(v) {
                return @cos(v);
            }
            
            fn abs(v: anytype) @TypeOf(v) {
                return @fabs(v);
            }
            
            fn floor(v: anytype) @TypeOf(v) {
                return @floor(v);
            }
            
            fn fract(v: anytype) @TypeOf(v) {
                return v - @floor(v);
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