
// Pixel Bender "deformer" (translated using pb2zig)
const std = @import("std");

pub const kernel = struct {
    // kernel information
    pub const namespace = "escher/-droste effect";
    pub const vendor = "Frank Reitberger";
    pub const version = 1;
    pub const description = "escherizer ...dissected for use with flash";
    pub const parameters = .{
        .size = .{
            .type = @Vector(2, f32),
            .min_value = .{ 0.0, 0.0 },
            .max_value = .{ 4096.0, 4096.0 },
            .default_value = .{ 500.0, 500.0 },
            .description = "image width/-height",
        },
        .radians = .{
            .type = @Vector(2, f32),
            .min_value = .{ -1000.0, -1000.0 },
            .max_value = .{ 1000.0, 1000.0 },
            .default_value = .{ 50.0, 150.0 },
            .description = "setup radians",
        },
        .rotate = .{
            .type = f32,
            .min_value = 0.0,
            .max_value = 360.0,
            .default_value = 0.0,
            .description = "setup rotation",
        },
        .zoom = .{
            .type = f32,
            .min_value = 1.0,
            .max_value = 100.0,
            .default_value = 1.0,
            .description = "setup zooming",
        },
        .center = .{
            .type = @Vector(2, f32),
            .min_value = .{ -2100.0, -2100.0 },
            .max_value = .{ 2100.0, 2100.0 },
            .default_value = .{ 0.0, 0.0 },
            .description = "sets xy.center",
        },
        .range = .{
            .type = @Vector(2, f32),
            .min_value = .{ -2100.0, -2100.0 },
            .max_value = .{ 2100.0, 2100.0 },
            .default_value = .{ 160.0, 160.0 },
            .description = "sets xy.range",
        },
        .xPos = .{
            .type = f32,
            .min_value = 1050.0,
            .max_value = 1050.0,
            .default_value = 160.0,
            .description = "sets initial x.position",
        },
        .yPos = .{
            .type = f32,
            .min_value = 1050.0,
            .max_value = 1050.0,
            .default_value = 160.0,
            .description = "sets initial y.position",
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
            size: @Vector(2, f32),
            radians: @Vector(2, f32),
            rotate: f32,
            zoom: f32,
            center: @Vector(2, f32),
            range: @Vector(2, f32),
            xPos: f32,
            yPos: f32,
            src: std.meta.fieldInfo(InputStruct, .src).type,
            
            // functions defined in kernel
            pub fn evaluatePixel(self: @This(), outCoord: @Vector(2, f32)) @Vector(4, f32) {
                // input variables
                const size = self.size;
                const radians = self.radians;
                const rotate = self.rotate;
                const zoom = self.zoom;
                const center = self.center;
                const range = self.range;
                const xPos = self.xPos;
                const yPos = self.yPos;
                const src = self.src;
                
                // output variable
                var dst: @Vector(4, f32) = undefined;
                
                var pos: @Vector(2, f32) = outCoord;
                var PI: f32 = 3.1415926535;
                var r1: f32 = 0.0;
                var r2: f32 = 0.0;
                var logRad: f32 = log(radians[1] / radians[0]);
                var alfa: f32 = atan(logRad / (PI * 2.0));
                var xShift: f32 = cos(alfa);
                var yShift: f32 = sin(alfa);
                var cosAngle: f32 = cos(rotate * PI / 180.0);
                var sinAngle: f32 = sin(rotate * PI / 180.0);
                var xZoom: f32 = cosAngle * zoom;
                var yZoom: f32 = sinAngle * zoom;
                var startX: f32 = center[0] - (xPos * cosAngle + yPos * sinAngle) * zoom;
                var startY: f32 = center[1] + (-xPos * sinAngle + yPos * cosAngle) * zoom;
                var ix: f32 = startX + xZoom * ceil(pos[0]) + yZoom * ceil(pos[1]);
                var iy: f32 = startY + yZoom * ceil(pos[0]) - xZoom * ceil(pos[1]);
                var distRad: f32 = log(ix * ix + iy * iy) / 2.0;
                var f: f32 = atan2(iy, ix) + PI;
                var i: f32 = (distRad * xShift + f * yShift) / xShift;
                var j: f32 = (f * xShift - distRad * yShift) / xShift;
                i = mod(i, logRad);
                j = mod(j, PI * 2.0);
                var z: f32 = exp(i) * radians[0];
                r1 = range[0] + z * cos(j);
                r2 = range[1] - z * sin(j);
                if (r1 < 0.0) {
                    r1 = mod(r1, size[0]) * -1.0;
                }
                if (r2 < 0.0) {
                    r2 = mod(r2, size[1]) * -1.0;
                }
                if (r1 > size[0]) {
                    r1 = mod(r1, size[0]);
                }
                if (r2 > size[1]) {
                    r2 = mod(r2, size[1]);
                }
                dst = src.sampleNearest(@Vector(2, f32){ r1, r2 });
                return dst;
            }
            
            // built-in Pixel Bender functions
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
            
            fn exp(v: anytype) @TypeOf(v) {
                return @exp(v);
            }
            
            fn log(v: anytype) @TypeOf(v) {
                return @log(v);
            }
            
            fn ceil(v: anytype) @TypeOf(v) {
                return @ceil(v);
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