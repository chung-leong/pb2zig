
// Pixel Bender "chihuly" (translated using pb2zig)
// namespace: com.everett-church.justin
// vendor: Justin Everett-Church
// version: 1
// description: chihuly themed transition

const std = @import("std");

pub const kernel = struct {
    // kernel information
    pub const parameters = .{
        .line = .{
            .type = f32,
            .min_value = 1000.0,
            .max_value = 1000.0,
            .default_value = 200.0,
        },
        .height = .{
            .type = f32,
            .min_value = 1000.0,
            .max_value = 1000.0,
            .default_value = 100.0,
        },
        .stemScale = .{
            .type = f32,
            .min_value = 0.01,
            .max_value = 10.0,
            .default_value = 1.0,
        },
        .squiggleScale = .{
            .type = f32,
            .min_value = 0.01,
            .max_value = 100.0,
            .default_value = 1.0,
        },
        .animationIndex = .{
            .type = f32,
            .min_value = 0.0,
            .max_value = 6.28,
            .default_value = 0.0,
        },
    };
    pub const input = .{
        .inputImage = .{ .channels = 4 },
    };
    pub const output = .{
        .outputPixel = .{ .channels = 4 },
    };
    
    // generic kernel instance type
    fn Instance(comptime InputStruct: type) type {
        return struct {
            // parameter and input image fields
            line: f32,
            height: f32,
            stemScale: f32,
            squiggleScale: f32,
            animationIndex: f32,
            inputImage: std.meta.fieldInfo(InputStruct, .inputImage).type,
            
            // built-in Pixel Bender functions
            fn sin(v: anytype) @TypeOf(v) {
                return @sin(v);
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
            
            // functions defined in kernel
            pub fn evaluatePixel(self: @This(), outCoord: @Vector(2, f32)) @Vector(4, f32) {
                // input variables
                const line = self.line;
                const height = self.height;
                const stemScale = self.stemScale;
                const squiggleScale = self.squiggleScale;
                const animationIndex = self.animationIndex;
                const inputImage = self.inputImage;
                
                // output variable
                var outputPixel: @Vector(4, f32) = undefined;
                
                var coord: @Vector(2, f32) = outCoord;
                var px: @Vector(4, f32) = inputImage.sampleNearest(coord);
                var blankPx: @Vector(4, f32) = @as(@Vector(4, f32), @splat(0.0));
                if (coord[1] < line) {
                    outputPixel = px;
                } else {
                    if (coord[1] < (line + height)) {
                        var stemWidth: f32 = 30.0 * stemScale;
                        var stemHeight: f32 = 0.8 * height;
                        var period: f32 = 8.0;
                        var amplitude: f32 = 10.0 * squiggleScale;
                        var phase: f32 = coord[0] / stemWidth;
                        var slope: f32 = 0.0;
                        var shift: f32 = line / 10.0;
                        var invTaperRatio: f32 = (coord[1] - line) / stemHeight;
                        var taperRatio: f32 = 1.0 - invTaperRatio;
                        var pxOffset: f32 = invTaperRatio * (amplitude * ((sin((phase + coord[1] / period) + animationIndex) + slope)));
                        var taperPx: f32 = stemWidth * taperRatio;
                        var cutRatio: f32 = mod(shift + coord[0] + pxOffset + taperPx / 2.0, stemWidth) / stemWidth;
                        var ratioPerPixel: f32 = 1.0 / stemWidth;
                        var tpx1: @Vector(4, f32) = inputImage.sampleNearest(coord + @Vector(2, f32){ pxOffset, 0.0 });
                        tpx1 = @as(@Vector(4, f32), if (cutRatio < taperRatio) tpx1 else blankPx);
                        stemWidth = 35.0 * stemScale;
                        stemHeight = 1.0 * height;
                        period = 10.0;
                        amplitude = 10.0 * squiggleScale;
                        phase = coord[0] / stemWidth;
                        slope = 0.0;
                        shift = -line / 8.0;
                        invTaperRatio = (coord[1] - line) / stemHeight;
                        taperRatio = 1.0 - invTaperRatio;
                        pxOffset = invTaperRatio * (amplitude * ((sin(((phase + coord[1] / period) + animationIndex) * 1.5) + slope)));
                        taperPx = stemWidth * taperRatio;
                        cutRatio = mod(shift + coord[0] + pxOffset + taperPx / 2.0, stemWidth) / stemWidth;
                        ratioPerPixel = 1.0 / stemWidth;
                        var tpx2: @Vector(4, f32) = inputImage.sampleNearest(coord + @Vector(2, f32){ pxOffset, 0.0 });
                        tpx2 = @as(@Vector(4, f32), if (cutRatio < taperRatio) tpx2 else blankPx);
                        stemWidth = 25.0 * stemScale;
                        stemHeight = 0.5 * height;
                        period = 8.0;
                        amplitude = 10.0 * squiggleScale;
                        phase = coord[0] / stemWidth;
                        slope = 0.0;
                        shift = line / 4.0;
                        invTaperRatio = (coord[1] - line) / stemHeight;
                        taperRatio = 1.0 - invTaperRatio;
                        pxOffset = invTaperRatio * (amplitude * ((sin((phase + coord[1] / period) + animationIndex * 2.0) + slope)));
                        taperPx = stemWidth * taperRatio;
                        cutRatio = mod(shift + coord[0] + pxOffset + taperPx / 2.0, stemWidth) / stemWidth;
                        ratioPerPixel = 1.0 / stemWidth;
                        var tpx3: @Vector(4, f32) = inputImage.sampleNearest(coord + @Vector(2, f32){ pxOffset, 0.0 });
                        tpx3 = @as(@Vector(4, f32), if (cutRatio < taperRatio) tpx3 else blankPx);
                        outputPixel = (tpx1 + tpx2 + tpx3) / @as(@Vector(4, f32), @splat((tpx1[3] + tpx2[3] + tpx3[3] + 0.000001)));
                    } else {
                        outputPixel = @as(@Vector(4, f32), @splat(0.0));
                    }
                }
                return outputPixel;
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
        
        inline fn toUnsigned(value: i32) u32 {
            // allow negative value to be interpreted as large integers to simplify bound-checking
            @setRuntimeSafety(false);
            return @as(u32, @intCast(value));
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
        
        pub fn getPixel(self: @This(), x: i32, y: i32) FPixel {
            const ux = toUnsigned(x);
            const uy = toUnsigned(y);
            if (ux >= self.width or uy >= self.height) {
                return @as(FPixel, @splat(0));
            }
            const index = (uy * self.width) + ux;
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
            const x: i32 = @intFromFloat(coord[0]);
            const y: i32 = @intFromFloat(coord[1]);
            return self.getPixel(x, y);
        }
        
        pub fn sampleLinear(self: @This(), coord: @Vector(2, f32)) FPixel {
            const x: i32 = @intFromFloat(coord[0]);
            const y: i32 = @intFromFloat(coord[1]);
            const fx = (coord[0] - 0.5) - @floor(coord[0] - 0.5);
            const fy = (coord[1] - 0.5) - @floor(coord[1] - 0.5);
            if (fx + fy == 0) {
                return self.getPixel(x, y);
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