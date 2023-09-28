// Pixel Bender "Painting" (translated using pb2zig)
const std = @import("std");

pub const kernel = struct {
    // kernel information
    pub const namespace = "ar.shader.painting";
    pub const vendor = "Alan Ross";
    pub const version = 1;
    pub const description = "Painting";
    pub const parameters = .{
        .n0 = .{
            .type = f32,
            .minValue = 0.0,
            .maxValue = 1.0,
            .defaultValue = 0.0,
        },
        .n1 = .{
            .type = f32,
            .minValue = 0.0,
            .maxValue = 1.5,
            .defaultValue = 0.6,
        },
        .n2 = .{
            .type = f32,
            .minValue = 0.5,
            .maxValue = 0.5,
            .defaultValue = 0.11,
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
                const n0 = self.input.n0;
                const n1 = self.input.n1;
                const n2 = self.input.n2;
                
                var p: @Vector(2, f32) = self.outCoord();
                var offset: @Vector(2, f32) = undefined;
                var dist: f32 = undefined;
                var c: @Vector(4, f32) = undefined;
                var temp: @Vector(4, f32) = undefined;
                var p0: @Vector(4, f32) = undefined;
                var p1: @Vector(4, f32) = undefined;
                var p2: @Vector(4, f32) = undefined;
                var p3: @Vector(4, f32) = undefined;
                var p4: @Vector(4, f32) = undefined;
                var p5: @Vector(4, f32) = undefined;
                var p6: @Vector(4, f32) = undefined;
                var p7: @Vector(4, f32) = undefined;
                var p8: @Vector(4, f32) = undefined;
                c = @Vector(4, f32){ n0, n0, n0, 1.0 };
                dist = n1 * 1.0;
                offset[0] = 0.0;
                offset[1] = 0.0;
                p0 = self.input.src.sampleNearest(p + offset);
                offset[0] = -dist;
                offset[1] = -dist;
                p1 = self.input.src.sampleNearest(p + offset);
                offset[0] = 0.0;
                offset[1] = -dist;
                p2 = self.input.src.sampleNearest(p + offset);
                offset[0] = dist;
                offset[1] = -dist;
                p3 = self.input.src.sampleNearest(p + offset);
                offset[0] = dist;
                offset[1] = 0.0;
                p4 = self.input.src.sampleNearest(p + offset);
                offset[0] = dist;
                offset[1] = dist;
                p5 = self.input.src.sampleNearest(p + offset);
                offset[0] = 0.0;
                offset[1] = dist;
                p6 = self.input.src.sampleNearest(p + offset);
                offset[0] = -dist;
                offset[1] = dist;
                p7 = self.input.src.sampleNearest(p + offset);
                offset[0] = -dist;
                offset[1] = 0.0;
                p8 = self.input.src.sampleNearest(p + offset);
                if (any(lessThan(c, p0))) {
                    c = p0;
                }
                if (any(lessThan(c, p1))) {
                    c = p1;
                }
                if (any(lessThan(c, p2))) {
                    c = p2;
                }
                if (any(lessThan(c, p3))) {
                    c = p3;
                }
                if (any(lessThan(c, p4))) {
                    c = p4;
                }
                if (any(lessThan(c, p5))) {
                    c = p5;
                }
                if (any(lessThan(c, p6))) {
                    c = p6;
                }
                if (any(lessThan(c, p7))) {
                    c = p7;
                }
                if (any(lessThan(c, p8))) {
                    c = p8;
                }
                temp = (p1 + p2 + p3 + p4 + p5 + p6 + p7 + p8) / @as(@Vector(4, f32), @splat(7.0));
                dist = n1 * 2.0;
                offset[0] = 0.0;
                offset[1] = 0.0;
                p0 = self.input.src.sampleNearest(p + offset);
                offset[0] = -dist;
                offset[1] = -dist;
                p1 = self.input.src.sampleNearest(p + offset);
                offset[0] = 0.0;
                offset[1] = -dist;
                p2 = self.input.src.sampleNearest(p + offset);
                offset[0] = dist;
                offset[1] = -dist;
                p3 = self.input.src.sampleNearest(p + offset);
                offset[0] = dist;
                offset[1] = 0.0;
                p4 = self.input.src.sampleNearest(p + offset);
                offset[0] = dist;
                offset[1] = dist;
                p5 = self.input.src.sampleNearest(p + offset);
                offset[0] = 0.0;
                offset[1] = dist;
                p6 = self.input.src.sampleNearest(p + offset);
                offset[0] = -dist;
                offset[1] = dist;
                p7 = self.input.src.sampleNearest(p + offset);
                offset[0] = -dist;
                offset[1] = 0.0;
                p8 = self.input.src.sampleNearest(p + offset);
                if (all(lessThan(c, temp))) {
                    c = @shuffle(f32, c, @shuffle(f32, c, undefined, @Vector(3, i32){ 0, 1, 2 }) + @as(@Vector(3, f32), @splat(n2)), @Vector(4, i32){ -1, -2, -3, 3 });
                } else {
                    c = @shuffle(f32, c, @shuffle(f32, c, undefined, @Vector(3, i32){ 0, 1, 2 }) - @as(@Vector(3, f32), @splat(n2)), @Vector(4, i32){ -1, -2, -3, 3 });
                }
                if (any(lessThan(c, p0))) {
                    c = p0;
                }
                if (any(lessThan(c, p1))) {
                    c = p1;
                }
                if (any(lessThan(c, p2))) {
                    c = p2;
                }
                if (any(lessThan(c, p3))) {
                    c = p3;
                }
                if (any(lessThan(c, p4))) {
                    c = p4;
                }
                if (any(lessThan(c, p5))) {
                    c = p5;
                }
                if (any(lessThan(c, p6))) {
                    c = p6;
                }
                if (any(lessThan(c, p7))) {
                    c = p7;
                }
                if (any(lessThan(c, p8))) {
                    c = p8;
                }
                dist = n1 * 3.0;
                offset[0] = 0.0;
                offset[1] = 0.0;
                p0 = self.input.src.sampleNearest(p + offset);
                offset[0] = -dist;
                offset[1] = -dist;
                p1 = self.input.src.sampleNearest(p + offset);
                offset[0] = 0.0;
                offset[1] = -dist;
                p2 = self.input.src.sampleNearest(p + offset);
                offset[0] = dist;
                offset[1] = -dist;
                p3 = self.input.src.sampleNearest(p + offset);
                offset[0] = dist;
                offset[1] = 0.0;
                p4 = self.input.src.sampleNearest(p + offset);
                offset[0] = dist;
                offset[1] = dist;
                p5 = self.input.src.sampleNearest(p + offset);
                offset[0] = 0.0;
                offset[1] = dist;
                p6 = self.input.src.sampleNearest(p + offset);
                offset[0] = -dist;
                offset[1] = dist;
                p7 = self.input.src.sampleNearest(p + offset);
                offset[0] = -dist;
                offset[1] = 0.0;
                p8 = self.input.src.sampleNearest(p + offset);
                if (any(lessThan(c, p0))) {
                    c = p0;
                }
                if (any(lessThan(c, p1))) {
                    c = p1;
                }
                if (any(lessThan(c, p2))) {
                    c = p2;
                }
                if (any(lessThan(c, p3))) {
                    c = p3;
                }
                if (any(lessThan(c, p4))) {
                    c = p4;
                }
                if (any(lessThan(c, p5))) {
                    c = p5;
                }
                if (any(lessThan(c, p6))) {
                    c = p6;
                }
                if (any(lessThan(c, p7))) {
                    c = p7;
                }
                if (any(lessThan(c, p8))) {
                    c = p8;
                }
                self.dst = c;
                
                self.output.dst.setPixel(self.outputCoord[0], self.outputCoord[1], self.dst);
            }
            
            // built-in Pixel Bender functions
            fn outCoord(self: *@This()) @Vector(2, f32) {
                const x = self.outputCoord[0];
                const y = self.outputCoord[1];
                return .{ @floatFromInt(x), @floatFromInt(y) };
            }
            
            fn any(v: anytype) bool {
                return @reduce(.Or, v);
            }
            
            fn all(v: anytype) bool {
                return @reduce(.And, v);
            }
            
            fn lessThan(v1: anytype, v2: anytype) @Vector(@typeInfo(@TypeOf(v1)).Vector.len, bool) {
                return v1 < v2;
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