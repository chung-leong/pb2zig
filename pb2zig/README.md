# pb2zig

CLI utility for translating Pixel Bender kernel into [Zig language](https://ziglang.org/) code.
You can also access its functionality through an API.

## Installation

```sh
npm install -g pb2zig
```

## Versioning

The major and minor version numbers of this program correspond to the version of the Zig compiler
it's designed for. The current version is 0.11.0. It works with Zig 0.11.0.

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

By default, pb2zig includes image processing functions for making use of the kernel
in the output code. If you want to work with the kernel directly, you can specify the
`--kernel-only` option to omit these functions:

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

## Using API

The library exports a single function:

```ts
function convertPixelBender(code: string, options: object): string
```

Options are `kernelOnly`, `inputPixelType`, and `outputPixelType`.

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

Create an image of the specified size using the provided input images and parameters, allocating
memory from `allocator`.

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

Create a slice of the output image with `count` scanlines, starting from `start`.

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

A structure that holds input images for the kernel. It is empty if a kernel generates an image
based on parameters alone.

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

Four channel pixel data is always expected even when the kernel calls for fewer. For `image3`, the
first three channels are used, that is R, G, and B. For `image2`, R and A are used. For `image1`
only the R channel is used.

`colorSpace` serves no purpose. It's only there to accommodate the web browser's
[`ImageData`](https://developer.mozilla.org/en-US/docs/Web/API/ImageData) object.

`offset` is employed when the structure holds data for only some part of the full image.

### Using Zig code in Node.js

With the help of [`node-zigar`](https://github.com/chung-leong/zigar), you can run Zig code in
Node.js. This offer some advantage over using WebAssembly. Native code generally run faster than
WASM (though the difference is not huge). Native code can also access memory of buffers in
JavaScript directly whereas WASM instances have their own memory space and image data must be
copied into it.

The following example uses [sharp](https://www.npmjs.com/package/sharp) to open a JPEG file
and obtain its pixel data. It then applies the effect from the translated kernel
"crystalize" ([zig](./test/zig-output/crystallize.zig)|[pbk](./test/pbk-samples/crystallize.pbk))
and saves the result to a PNG file:

```js
import { createOutput } from 'crystallize.zig';
import sharp from 'sharp';

// create image object, ensure that it has an alpha channel
const img = sharp(`./socha.jpg`).ensureAlpha().raw();
// extract raw data
const { data, info } = await img.toBuffer({ resolveWithObject: true });
const { width, height, channels } = info;
// call createOutput() with input image and params
const input = { src: { data, width, height } };
const params = { size: 25 };
const output = createOutput(width, height, input, params);
// obtain Uint8Array from image "dst"; its data property is of the type `[]@Vector(4, u8)`
// since an array of x4 u8 vector has the same memory layout as an array of u8, Zigar
// attaches a "typedArray" property to the object for our convenience
const { typedArray } = output.dst.data;
// save the raw data as a PNG file
sharp(typedArray, { raw: { width, height, channels } }).png().toFile(`./crystallize.png`);
```