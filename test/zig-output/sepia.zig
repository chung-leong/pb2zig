
// Pixel Bender "Sepia" (translated using pb2zig)
// namespace: AIF
// vendor: Adobe Systems
// version: 2
// description: a variable sepia filter

const std = @import("std");

pub const kernel = struct {
    // kernel information
    pub const parameters = .{
        .intensity = .{
            .type = f32,
            .min_value = 0.0,
            .max_value = 1.0,
            .default_value = 0.0,
        },
    };
    pub const input = .{
        .src = .{ .channels = 4 },
    };
    pub const output = .{
        .dst = .{ .channels = 4 },
    };
    
    // generic kernel instance type
    fn Instance(comptime InputStruct: type) type {
        return struct {
            // parameter and input image fields
            intensity: f32,
            src: std.meta.fieldInfo(InputStruct, .src).type,
            
            // built-in Pixel Bender functions
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
                    fn @"Matrix * Vector"(m1: anytype, v2: anytype) @TypeOf(v2) {
                        var result: @TypeOf(v2) = undefined;
                        inline for (m1, 0..) |row, r| {
                            result[r] = @reduce(.Add, row * v2);
                        }
                        return result;
                    }
                    
                    fn @"Matrix * Matrix"(m1: anytype, m2: anytype) @TypeOf(m2) {
                        const ar = @typeInfo(@TypeOf(m2)).Array;
                        var result: @TypeOf(m2) = undefined;
                        comptime var c = 0;
                        inline while (c < ar.len) : (c += 1) {
                            comptime var i = 0;
                            var column: ar.child = undefined;
                            inline while (i < ar.len) : (i += 1) {
                                column[i] = m2[i][c];
                            }
                            inline for (m1, 0..) |row, r| {
                                result[r][c] = @reduce(.Add, row * column);
                            }
                        }
                        return result;
                    }
                    
                    fn @"Vector * Matrix"(v1: anytype, m2: anytype) @TypeOf(v1) {
                        const ar = @typeInfo(@TypeOf(m2)).Array;
                        var t: @TypeOf(m2) = undefined;
                        inline for (m2, 0..) |row, r| {
                            comptime var c = 0;
                            inline while (c < ar.len) : (c += 1) {
                                t[c][r] = row[c];
                            }
                        }
                        return @"Matrix * Vector"(t, v1);
                    }
                    
                    fn @"Matrix * Scalar"(m1: anytype, s2: anytype) @TypeOf(m1) {
                        var result: @TypeOf(m1) = undefined;
                        inline for (m1, 0..) |row, r| {
                            result[r] = row * @as(@typeInfo(@TypeOf(m1)).Array.child, @splat(s2));
                        }
                        return result;
                    }
                    
                    fn @"Scalar * Matrix"(s1: anytype, m2: anytype) @TypeOf(m2) {
                        return @"Matrix * Scalar"(m2, s1);
                    }
                    
                    fn @"Matrix + Matrix"(m1: anytype, m2: anytype) @TypeOf(m2) {
                        var result: @TypeOf(m2) = undefined;
                        inline for (m1, 0..) |v, index| {
                            result[index] = v + m2[index];
                        }
                        return result;
                    }
                    
                    fn @"Matrix + Scalar"(m1: anytype, s2: anytype) @TypeOf(m1) {
                        var result: @TypeOf(m1) = undefined;
                        inline for (m1, 0..) |row, r| {
                            result[r] = row + @as(@typeInfo(@TypeOf(m1)).Array.child, @splat(s2));
                        }
                        return result;
                    }
                    
                    fn @"Scalar + Matrix"(s1: anytype, m2: anytype) @TypeOf(m2) {
                        return @"Matrix + Scalar"(m2, s1);
                    }
                    
                    fn @"Matrix - Matrix"(m1: anytype, m2: anytype) @TypeOf(m2) {
                        var result: @TypeOf(m2) = undefined;
                        inline for (m1, 0..) |v, index| {
                            result[index] = v - m2[index];
                        }
                        return result;
                    }
                    
                    fn @"Matrix - Scalar"(m1: anytype, s2: anytype) @TypeOf(m1) {
                        var result: @TypeOf(m1) = undefined;
                        inline for (m1, 0..) |row, r| {
                            result[r] = row - @as(@typeInfo(@TypeOf(m1)).Array.child, @splat(s2));
                        }
                        return result;
                    }
                    
                    fn @"Scalar - Matrix"(s1: anytype, m2: anytype) @TypeOf(m2) {
                        var result: @TypeOf(m2) = undefined;
                        inline for (m2, 0..) |row, r| {
                            result[r] = @as(@typeInfo(@TypeOf(m2)).Array.child, @splat(s1)) - row;
                        }
                        return result;
                    }
                    
                    fn @"Matrix / Matrix"(m1: anytype, m2: anytype) @TypeOf(m2) {
                        var result: @TypeOf(m2) = undefined;
                        inline for (m1, 0..) |v, index| {
                            result[index] = v / m2[index];
                        }
                        return result;
                    }
                    
                    fn @"Matrix / Scalar"(m1: anytype, s2: anytype) @TypeOf(m1) {
                        var result: @TypeOf(m1) = undefined;
                        inline for (m1, 0..) |row, r| {
                            result[r] = row / @as(@typeInfo(@TypeOf(m1)).Array.child, @splat(s2));
                        }
                        return result;
                    }
                    
                    fn @"Scalar / Matrix"(s1: anytype, m2: anytype) @TypeOf(m2) {
                        var result: @TypeOf(m2) = undefined;
                        inline for (m2, 0..) |row, r| {
                            result[r] = @as(@typeInfo(@TypeOf(m2)).Array.child, @splat(s1)) / row;
                        }
                        return result;
                    }
                    
                    fn @"Matrix == Matrix"(m1: anytype, m2: anytype) bool {
                        inline for (m1, 0..) |v, index| {
                            if (!@reduce(.And, v == m2[index])) {
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
            
            // functions defined in kernel
            pub fn evaluatePixel(self: @This(), outCoord: @Vector(2, f32)) @Vector(4, f32) {
                // input variables
                const intensity = self.intensity;
                const src = self.src;
                
                // output variable
                var dst: @Vector(4, f32) = undefined;
                
                var rgbaColor: @Vector(4, f32) = undefined;
                var yiqaColor: @Vector(4, f32) = undefined;
                var YIQMatrix: [4]@Vector(4, f32) = [4]@Vector(4, f32){
                    .{ 0.299, 0.596, 0.212, 0.0 },
                    .{ 0.587, -0.275, -0.523, 0.0 },
                    .{ 0.114, -0.321, 0.311, 0.0 },
                    .{ 0.0, 0.0, 0.0, 1.0 }
                };
                var inverseYIQ: [4]@Vector(4, f32) = [4]@Vector(4, f32){
                    .{ 1.0, 1.0, 1.0, 0.0 },
                    .{ 0.956, -0.272, -1.1, 0.0 },
                    .{ 0.621, -0.647, 1.7, 0.0 },
                    .{ 0.0, 0.0, 0.0, 1.0 }
                };
                rgbaColor = src.sampleNearest(outCoord);
                yiqaColor = matrixCalc("*", YIQMatrix, rgbaColor);
                yiqaColor[1] = intensity;
                yiqaColor[2] = 0.0;
                dst = matrixCalc("*", inverseYIQ, yiqaColor);
                return dst;
            }
        };
    }
    
    // kernel instance creation function
    pub fn create(inputStruct: anytype) Instance(@TypeOf(inputStruct)) {
        var instance: Instance(@TypeOf(inputStruct)) = undefined;
        inline for (std.meta.fields(@TypeOf(inputStruct))) |field| {
            @field(instance, field.name) = @field(inputStruct, field.name);
        }
        return instance;
    }
};

pub const Input = KernelInput(u8, kernel);
pub const Output = KernelOutput(u8, kernel);

pub fn apply(input: Input, output: Output) void {
    processImage(kernel, input, output);
}

pub fn Image(comptime T: type, comptime len: comptime_int, comptime writable: bool) type {
    return struct {
        pub const Pixel = @Vector(len, T);
        pub const FPixel = @Vector(len, f32);
        pub const channels = len;
        
        pixels: if (writable) []Pixel else []const Pixel,
        width: u32,
        height: u32,
        
        pub fn create(allocator: std.mem.Allocator, width: u32, height: u32) !@This() {
            return .{
                .pixels = try allocator.alloc(Pixel, width * height),
                .width = width,
                .height = height,
            };
        }
        
        inline fn toUnsigned(value: f32) u32 {
            // allow negative value to be interpreted as large integers
            // to simplify bound-checking
            @setRuntimeSafety(false);
            return @intFromFloat(value);
        }
        
        fn contrain(pixel: FPixel, max: f32) FPixel {
            const lower: FPixel = @splat(0);
            const upper: FPixel = @splat(max);
            const pixel2 = @select(f32, pixel > lower, pixel, lower);
            const pixel3 = @select(f32, pixel2 < upper, pixel2, upper);
            return pixel3;
        }
        
        fn floatPixelFromInt(pixel: Pixel) FPixel {
            // https://github.com/ziglang/zig/issues/16267
            var numerator: FPixel = undefined;
            comptime var i = 0;
            inline while (i < len) : (i += 1) {
                numerator[i] = @floatFromInt(pixel[i]);
            }
            const denominator: FPixel = @splat(@floatFromInt(std.math.maxInt(T)));
            return numerator / denominator;
        }
        
        fn intPixelFromFloat(pixel: FPixel) Pixel {
            const max: f32 = @floatFromInt(std.math.maxInt(T));
            const multiplier: FPixel = @splat(max);
            const product: FPixel = contrain(pixel * multiplier, max);
            var result: Pixel = undefined;
            comptime var i = 0;
            inline while (i < len) : (i += 1) {
                result[i] = @intFromFloat(product[i]);
            }
            return result;
        }
        
        pub fn getPixel(self: @This(), x: u32, y: u32) FPixel {
            if (x >= self.width or y >= self.height) {
                return @as(FPixel, @splat(0));
            }
            const index = (y * self.width) + x;
            const pixel = self.pixels[index];
            return switch (@typeInfo(T)) {
                .Float => pixel,
                .Int => floatPixelFromInt(pixel),
                else => @compileError("Unsupported type: " ++ @typeName(T)),
            };
        }
        
        pub fn setPixel(self: @This(), x: u32, y: u32, pixel: FPixel) void {
            if (comptime !writable) {
                return;
            }
            const index = (y * self.width) + x;
            switch (@typeInfo(T)) {
                .Float => {
                    self.pixels[index] = pixel;
                },
                .Int => {
                    self.pixels[index] = intPixelFromFloat(pixel);
                },
                else => @compileError("Unsupported type: " ++ @typeName(T)),
            }
        }
        
        pub fn sampleNearest(self: @This(), coord: @Vector(2, f32)) FPixel {
            const x = toUnsigned(coord[0]);
            const y = toUnsigned(coord[1]);
            return self.getPixel(x, y);
        }
        
        pub fn sampleLinear(self: @This(), coord: @Vector(2, f32)) FPixel {
            const x = toUnsigned(coord[0]);
            const y = toUnsigned(coord[1]);
            const fx = (coord[0] - 0.5) - @floor(coord[0] - 0.5);
            const fy = (coord[1] - 0.5) - @floor(coord[1] - 0.5);
            if (fx + fy == 0) {
                if (x < self.width and y < self.height) {
                    return self.getPixel(x, y);
                } else {
                    return @as(FPixel, @splat(0));
                }
            } else {
                const fx1: f32 = 1.0 - fx;
                const fy1: f32 = 1.0 - fy;
                const w00: f32 = fx1 * fy1;
                const w10: f32 = fx * fy1;
                const w01: f32 = fx1 * fy;
                const w11: f32 = fx * fy;
                const p00 = self.getPixel(x, y);
                const p01 = self.getPixel(x, y + 1);
                const p10 = self.getPixel(x + 1, y);
                const p11 = self.getPixel(x + 1, y + 1);
                var result: FPixel = undefined;
                comptime var i = 0;
                inline while (i < len) : (i += 1) {
                    result[i] = p00[i] * w00 + p10[i] * w10 + p01[i] * w01 + p11[i] * w11;
                }
                return result;
            }
        }
    };
}

pub fn KernelInput(comptime T: type, comptime Kernel: type) type {
    const param_fields = std.meta.fields(@TypeOf(Kernel.parameters));
    const input_fields = std.meta.fields(@TypeOf(Kernel.input));
    const field_count = param_fields.len + input_fields.len;
    comptime var struct_fields: [field_count]std.builtin.Type.StructField = undefined;
    inline for (param_fields, 0..) |field, index| {
        const param = @field(Kernel.parameters, field.name);
        const default_value: ?*const anyopaque = get_def: {
            if (@hasField(@TypeOf(param), "default_value")) {
                const value: param.type = param.default_value;
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
        const input = @field(Kernel.input, field.name);
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
    const output_fields = std.meta.fields(@TypeOf(Kernel.output));
    if (output_fields.len > 1) {
        @compileError("Cannot handle multiple output: " ++ output_fields.len);
    }
    const output = @field(kernel.output, output_fields[0].name);
    return Image(T, output.channels, true);
}

pub fn processImage(comptime Kernel: type, input: anytype, output: anytype) void {
    const instance = Kernel.create(input);
    var coord: @Vector(2, f32) = .{ 0, 0 };
    var y: u32 = 0;
    while (y < output.height) : (y += 1) {
        var x: u32 = 0;
        coord[0] = 0;
        while (x < output.width) : (x += 1) {
            const pixel = instance.evaluatePixel(coord);
            output.setPixel(x, y, pixel);
            coord[0] += 1;
        }
        coord[1] += 1;
    }
}