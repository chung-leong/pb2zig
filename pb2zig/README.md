# pb2zig

pb2zig is a CLI utility for translating Pixel Bender kernel into [Zig language](https://ziglang.org/) code. You can also access its functionality through an API.

## Installation

```sh
npm install -g pb2zig
```

## Usage

```
pb2zig [OPTION]... [FILE]...

Options:
  --kernel-only,  -ko             Omit image processing code
  --output-dir,   -od [DIR]       Set output directory
  --input-pixel,  -ip [TYPE]      Set input pixel type (default: u8)
  --output-pixel, -op [TYPE]      Set output pixel type (default: u8)
  --version,      -v              Show version number
```

For example, the follow command would translate `simple.pbk` in the current working directory and
save it in the same directory as `simple.zig`:

```sh
pb2zig simple.pbk
```

Multiple files can be translated at the same time:

```sh
pb2zig hue.pbk saturation.pbk liminosity.pbk
```

Use the `--output-dir` or `-od` option to set the destination directory:

```sh
pb2zig simple.pbk --output-dir ~/my-zig-project
```

By default, pb2zig includes image processing functions in the output code for making use of the
kernel. If you want to work with the kernel directly, you can specify the `--kernel-only` option
to omit these functions:

```sh
pb2zig simple.pbk --kernel-only
```

By default, the bundled image processing functions expect and produce pixels with 8-bit channels.
If you wish to use 16-bit integers or 32-bit floating points instead, use the `--input-pixel` (or
`-ip`) and `--output-pixel` (or `-op`) options:

```sh
pb2zig simple.pbk --input-pixel u16 --output-pixel u16
```

Valid pixel types are `u8`, `i16`, `u16`, and `f32`. Floating points should contain values between
0.0 and 1.0. This is the representation used internally by Pixel Bender.

## Function and types in translated code

### Functions

```zig
pub fn createOutput(
    allocator: std.mem.Allocator,
    width: u32,
    height: u32,
    input: Input,
    params: Parameters,
) !Output;
```

```zig
pub fn createPartialOutput(
    allocator: std.mem.Allocator,
    width: u32,
    height: u32,
    start: u32,
    count: u32,
    input: Input,
    params: Parameters,
) !Output;
```

### Input and output structures

```zig
pub const kernel = struct {
    // ...
};
```

A namespace containing information about the kernel and a function for creating the kernel.

```zig
pub const Input = KernelInput(u8, kernel);
```

A structure that holds input images for the kernel. It can be empty if a kernel generates
an image from parameters alone.

```zig
pub const Output = KernelOutput(u8, kernel);
```

A structure that holds output images from the kernel.

```zig
pub const Parameters = KernelParameters(kernel);
```

A structure holding parameters for the kernel.

### Image structure

```zig
pub fn Image(comptime T: type, comptime len: comptime_int, comptime writable: bool) type {
    return struct {
        pub const Pixel = @Vector(4, T);
        pub const FPixel = @Vector(len, f32);
        pub const channels = len;

        data: if (writable) []Pixel else []const Pixel,
        width: u32,
        height: u32,
        colorSpace: ColorSpace = .srgb,
        offset: usize = 0,

        // ...
    };
}
```

Four channel pixel data is always expected, even when the kernel asks for fewer. For `image3`, the
first three channels are used, that is R, G, and B. For `image2`, R and A are used. For `image1`
only the R channel is used.

`colorSpace` serves no purpose. It's only there to accommodate the web browser's
[`ImageData`](https://developer.mozilla.org/en-US/docs/Web/API/ImageData) object.

`offset` is employed when the structure holds data for only some part of the full image.