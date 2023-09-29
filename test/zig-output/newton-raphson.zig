// Pixel Bender "NewtonRaphson" (translated using pb2zig)
const std = @import("std");

pub const kernel = struct {
    // kernel information
    pub const namespace = "com.om-labs.filters.newtonRaphson";
    pub const vendor = "Om Labs";
    pub const version = 1;
    pub const description = "Newton Raphson Fractals";
    pub const parameters = .{
        .size = .{
            .type = @Vector(2, f32),
            .minValue = .{ 0.0, 0.0 },
            .maxValue = .{ 1000.0, 1000.0 },
            .defaultValue = .{ 500.0, 500.0 },
        },
        .colorStart = .{
            .type = @Vector(4, f32),
            .minValue = .{ 0.0, 0.0, 0.0, 0.0 },
            .maxValue = .{ 1.0, 1.0, 1.0, 1.0 },
            .defaultValue = .{ 1.0, 1.0, 1.0, 1.0 },
        },
        .colorEnd = .{
            .type = @Vector(4, f32),
            .minValue = .{ 0.0, 0.0, 0.0, 0.0 },
            .maxValue = .{ 1.0, 1.0, 1.0, 1.0 },
            .defaultValue = .{ 0.0, 0.0, 0.8, 1.0 },
        },
        .rangeX = .{
            .type = @Vector(2, f32),
            .minValue = .{ -10.0, -10.0 },
            .maxValue = .{ 10.0, 10.0 },
            .defaultValue = .{ -5.0, 5.0 },
        },
        .rangeY = .{
            .type = @Vector(2, f32),
            .minValue = .{ -10.0, -10.0 },
            .maxValue = .{ 10.0, 10.0 },
            .defaultValue = .{ -5.0, 5.0 },
        },
        .c0 = .{
            .type = @Vector(2, f32),
            .minValue = .{ -10.0, -10.0 },
            .maxValue = .{ 10.0, 10.0 },
            .defaultValue = .{ 0.0, 0.0 },
        },
        .c1 = .{
            .type = @Vector(2, f32),
            .minValue = .{ -10.0, -10.0 },
            .maxValue = .{ 10.0, 10.0 },
            .defaultValue = .{ 0.0, 0.0 },
        },
        .c2 = .{
            .type = @Vector(2, f32),
            .minValue = .{ -10.0, -10.0 },
            .maxValue = .{ 10.0, 10.0 },
            .defaultValue = .{ 0.0, 0.0 },
        },
        .c3 = .{
            .type = @Vector(2, f32),
            .minValue = .{ -10.0, -10.0 },
            .maxValue = .{ 10.0, 10.0 },
            .defaultValue = .{ 0.0, 0.0 },
        },
        .c4 = .{
            .type = @Vector(2, f32),
            .minValue = .{ -10.0, -10.0 },
            .maxValue = .{ 10.0, 10.0 },
            .defaultValue = .{ 0.0, 0.0 },
        },
        .c5 = .{
            .type = @Vector(2, f32),
            .minValue = .{ -10.0, -10.0 },
            .maxValue = .{ 10.0, 10.0 },
            .defaultValue = .{ 0.0, 0.0 },
        },
        .c6 = .{
            .type = @Vector(2, f32),
            .minValue = .{ -10.0, -10.0 },
            .maxValue = .{ 10.0, 10.0 },
            .defaultValue = .{ 0.0, 0.0 },
        },
        .c7 = .{
            .type = @Vector(2, f32),
            .minValue = .{ -10.0, -10.0 },
            .maxValue = .{ 10.0, 10.0 },
            .defaultValue = .{ 0.0, 0.0 },
        },
        .toleranceInversePower = .{
            .type = f32,
            .minValue = 1.0,
            .maxValue = 10.0,
            .defaultValue = 3.0,
        },
        .iterations = .{
            .type = f32,
            .minValue = 1.0,
            .maxValue = 100.0,
            .defaultValue = 25.0,
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
            tolerance: f32 = undefined,
            
            // functions defined in kernel
            pub fn evaluateDependents(self: *@This()) void {
                const toleranceInversePower = self.input.toleranceInversePower;
                
                self.tolerance = pow(@as(f32, 10.0), -toleranceInversePower);
            }
            
            fn muli(a: @Vector(2, f32), b: @Vector(2, f32)) @Vector(2, f32) {
                return @Vector(2, f32){ a[0] * b[0] - a[1] * b[1], a[1] * b[0] + a[0] * b[1] };
            }
            
            fn divi(a: @Vector(2, f32), b: @Vector(2, f32)) @Vector(2, f32) {
                return @Vector(2, f32){ a[0] * b[0] + a[1] * b[1], a[1] * b[0] - a[0] * b[1] } / @as(@Vector(2, f32), @splat((b[0] * b[0] + b[1] * b[1])));
            }
            
            fn f(self: *@This(), z: @Vector(2, f32), fz: *@Vector(2, f32)) @Vector(2, f32) {
                const c7 = self.input.c7;
                const c6 = self.input.c6;
                const c5 = self.input.c5;
                const c4 = self.input.c4;
                const c3 = self.input.c3;
                const c2 = self.input.c2;
                const c1 = self.input.c1;
                const c0 = self.input.c0;
                
                var z2: @Vector(2, f32) = muli(z, z);
                var z3: @Vector(2, f32) = muli(z2, z);
                var z4: @Vector(2, f32) = muli(z3, z);
                var z5: @Vector(2, f32) = muli(z4, z);
                var z6: @Vector(2, f32) = muli(z5, z);
                var z7: @Vector(2, f32) = muli(z6, z);
                fz.* = muli(c7, z7) + muli(c6, z6) + muli(c5, z5) + muli(c4, z4) + muli(c3, z3) + muli(c2, z2) + muli(c1, z) + c0;
                var fdiffz: @Vector(2, f32) = @as(@Vector(2, f32), @splat(7.0)) * muli(c7, z6) + @as(@Vector(2, f32), @splat(6.0)) * muli(c6, z5) + @as(@Vector(2, f32), @splat(5.0)) * muli(c5, z4) + @as(@Vector(2, f32), @splat(4.0)) * muli(c4, z3) + @as(@Vector(2, f32), @splat(3.0)) * muli(c3, z2) + @as(@Vector(2, f32), @splat(2.0)) * muli(c2, z) + c1;
                return divi(fz.*, fdiffz);
            }
            
            pub fn evaluatePixel(self: *@This()) void {
                self.dst = @splat(0);
                const rangeX = self.input.rangeX;
                const size = self.input.size;
                const rangeY = self.input.rangeY;
                const iterations = self.input.iterations;
                const tolerance = self.tolerance;
                const colorStart = self.input.colorStart;
                const colorEnd = self.input.colorEnd;
                
                var pos: @Vector(2, f32) = self.outCoord();
                pos = @Vector(2, f32){ mix(rangeX[0], rangeX[1], pos[0] / size[0]), mix(rangeY[0], rangeY[1], pos[1] / size[1]) };
                var curIterations: f32 = undefined;
                var fz: @Vector(2, f32) = undefined;
                curIterations = 0.0;
                while (curIterations < iterations) {
                    pos -= self.f(pos, &fz);
                    if (length(fz[0]) < tolerance) {
                        break;
                    }
                    curIterations += 1.0;
                }
                self.dst = mix(colorStart, colorEnd, curIterations / iterations);
                
                self.output.dst.setPixel(self.outputCoord[0], self.outputCoord[1], self.dst);
            }
            
            // built-in Pixel Bender functions
            fn outCoord(self: *@This()) @Vector(2, f32) {
                const x = self.outputCoord[0];
                const y = self.outputCoord[1];
                return .{ @floatFromInt(x), @floatFromInt(y) };
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