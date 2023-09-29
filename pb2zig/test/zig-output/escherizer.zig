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
            .minValue = .{ 0.0, 0.0 },
            .maxValue = .{ 4096.0, 4096.0 },
            .defaultValue = .{ 500.0, 500.0 },
            .description = "image width/-height",
        },
        .radians = .{
            .type = @Vector(2, f32),
            .minValue = .{ -1000.0, -1000.0 },
            .maxValue = .{ 1000.0, 1000.0 },
            .defaultValue = .{ 50.0, 150.0 },
            .description = "setup radians",
        },
        .rotate = .{
            .type = f32,
            .minValue = 0.0,
            .maxValue = 360.0,
            .defaultValue = 0.0,
            .description = "setup rotation",
        },
        .zoom = .{
            .type = f32,
            .minValue = 1.0,
            .maxValue = 100.0,
            .defaultValue = 1.0,
            .description = "setup zooming",
        },
        .center = .{
            .type = @Vector(2, f32),
            .minValue = .{ -2100.0, -2100.0 },
            .maxValue = .{ 2100.0, 2100.0 },
            .defaultValue = .{ 0.0, 0.0 },
            .description = "sets xy.center",
        },
        .range = .{
            .type = @Vector(2, f32),
            .minValue = .{ -2100.0, -2100.0 },
            .maxValue = .{ 2100.0, 2100.0 },
            .defaultValue = .{ 160.0, 160.0 },
            .description = "sets xy.range",
        },
        .xPos = .{
            .type = f32,
            .minValue = 1050.0,
            .maxValue = 1050.0,
            .defaultValue = 160.0,
            .description = "sets initial x.position",
        },
        .yPos = .{
            .type = f32,
            .minValue = 1050.0,
            .maxValue = 1050.0,
            .defaultValue = 160.0,
            .description = "sets initial y.position",
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
            
            // functions defined in kernel
            pub fn evaluatePixel(self: *@This()) void {
                self.dst = @splat(0);
                const radians = self.input.radians;
                const rotate = self.input.rotate;
                const zoom = self.input.zoom;
                const center = self.input.center;
                const xPos = self.input.xPos;
                const yPos = self.input.yPos;
                const range = self.input.range;
                const size = self.input.size;
                const src = self.input.src;
                
                var pos: @Vector(2, f32) = self.outCoord();
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
                self.dst = src.sampleNearest(@Vector(2, f32){ r1, r2 });
                
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