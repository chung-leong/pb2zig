# rollup-plugin-pb2zig

[Rollup](https://rollupjs.org/) plugin that uses pb2zig to translate a Pixel Bender kernel into
Zig, then with the help of
[Zigar](https://github.com/chung-leong/zigar/tree/main/rollup-plugin-zigar#rollup-plugin-zigar)'s
Rollup plugin, compiles the resulting code into WebAssembly. It also provides additional functions
for offloading image processing to web workers.

The plugin is Vite-compatible and is designed to work correctly when in serve mode.

## Installation

```sh
npm install --save-dev rollup-plugin-pb2zig
```

You must install the Zig compiler onto your computer separately. Follow the instructions outlined
in the official [Getting Started](https://ziglang.org/learn/getting-started/) guide. Alternately,
you can let [ZVM](https://github.com/tristanisham/zvm) help manage the installation process.

This library assumes that the compiler is in the search path.

## Versioning

The major and minor version numbers of this program correspond to the version of the Zig compiler
it's designed for. The current version is 0.14.0. It works with Zig 0.14.0.

## Usage

### Configure Vite

Simple add the plugin to the list of plugins in `vite.config.js`:

```js
import { defineConfig } from 'vite'
import React from '@vitejs/plugin-react-swc'
import Pb2Zig from 'rollup-plugin-pb2zig';

export default defineConfig({
  plugins: [
    React(),
    Pb2Zig(),
  ],
})
```

By default, code is generated for single-thread operation. This is not ideal, as using a 
computationally intensive filter in the main thread can cause the user interface to 
become unresponsive. Setting the `multithreaded` option to `true` allow you to perform 
the work in WebAssembly threads, both alleviating and speeding up the process. 

```js
import { defineConfig } from 'vite'
import React from '@vitejs/plugin-react-swc'
import Pb2Zig from 'rollup-plugin-pb2zig';

export default defineConfig({
  plugins: [
    React(),
    Pb2Zig({ multithreaded: true }),
  ],
})
```

There're special requirements related to multithreaded operation. See the 
[documentation of Zigar](https://github.com/chung-leong/zigar/wiki/Multithreading#multithreading-in-webassembly)
for more details.

### Creating output

All you have to do is import `createImageData()` from a .pbk file, provide it with an
[ImageData](https://developer.mozilla.org/en-US/docs/Web/API/ImageData) object from a canvas along
with parameters specific to the kernel:

```js
import { useState, useRef, useEffect } from 'react'
import { createImageData } from './pbk/crystallize.pbk';

function App() {
  const srcCanvasRef = useRef();
  const dstCanvasRef = useRef();

  function updateDestinationImage() {
    const srcCanvas = srcCanvasRef.current;
    const dstCanvas = dstCanvasRef.current;
    const srcCTX = srcCanvas.getContext('2d', { willReadFrequently: true });
    const dstCTX = dstCanvas.getContext('2d');
    const { width, height } = srcCanvas;
    const srcImageData = srcCTX.getImageData(0, 0, width, height);
    const params = { size: 25 };
    const dstImageData = createImageData(width, height, srcImageData, params);
    dstCTX.putImageData(dstImageData, 0, 0);
  }

  // ...
}
```

The code above is for a scenario where web workers aren't used. When the plugin is configured to
use web workers, `createImageData()` becomes an async function and it's necessary to use `await`
on the call:

```js
import { useState, useRef, useEffect } from 'react'
import { createOutput } from './pbk/crystallize.pbk';

export function App() {
  const srcCanvasRef = useRef();
  const dstCanvasRef = useRef();

  async function updateDestinationImage() {
    const srcCanvas = srcCanvasRef.current;
    const dstCanvas = dstCanvasRef.current;
    const srcCTX = srcCanvas.getContext('2d', { willReadFrequently: true });
    const dstCTX = dstCanvas.getContext('2d');
    const { width, height } = srcCanvas;
    const srcImageData = srcCTX.getImageData(0, 0, width, height);
    const params = { size: 25 };
    const dstImageData = await createImageData(width, height, srcImageData, params);
    dstCTX.putImageData(dstImageData, 0, 0);
  }

  // ...
}
```

### Using multi-image kernels

When a kernel requires multiple images as input, you can either place the two in an array:

```js
  async function updateDestinationImage() {
    const src1Canvas = src1CanvasRef.current;
    const src2Canvas = src2CanvasRef.current;
    const dstCanvas = dstCanvasRef.current;
    const src1CTX = src1Canvas.getContext('2d', { willReadFrequently: true });
    const src2CTX = src1Canvas.getContext('2d', { willReadFrequently: true });
    const dstCTX = dstCanvas.getContext('2d');
    const { width, height } = srcCanvas;
    const src1ImageData = src1CTX.getImageData(0, 0, width, height);
    const src2ImageData = src2CTX.getImageData(0, 0, width, height);
    const params = { size: 25 };
    const input = [ src1ImageData, src2ImageData ];
    const dstImageData = createImageData(width, height, input, params);
    dstCTX.putImageData(dstImageData, 0, 0);
  }
```

Or specify them by name in an object:

```js
  async function updateDestinationImage() {
    const src1Canvas = src1CanvasRef.current;
    const src2Canvas = src2CanvasRef.current;
    const dstCanvas = dstCanvasRef.current;
    const src1CTX = src1Canvas.getContext('2d', { willReadFrequently: true });
    const src2CTX = src1Canvas.getContext('2d', { willReadFrequently: true });
    const dstCTX = dstCanvas.getContext('2d');
    const { width, height } = srcCanvas;
    const src1ImageData = src1CTX.getImageData(0, 0, width, height);
    const src2ImageData = src2CTX.getImageData(0, 0, width, height);
    const params = { size: 25 };
    const input = { src1: src1ImageData src2: src2ImageData };
    const dstImageData = createImageData(width, height, input, params);
    dstCTX.putImageData(dstImageData, 0, 0);
  }
```

## Plugin options

* `webWorker` - Offload processing to web workers (default: `false`)

The following options are for
[rollup-plugin-zigar](https://github.com/chung-leong/zigar/tree/main/rollup-plugin-zigar#readme):

* `optimize` - Optimization level (default: `ReleaseSmall`)
* `topLevelAwait` - Use top-level await to wait for compilation of WASM code (default: `false`
unless `webWorker` is `false`)
* `embedWASM` - Embed WASM binary as base64 in JavaScript code (default: `false`)
* `omitFunctions` - Exclude all functions and produce no WASM code (default: `false`)
* `stripWASM` - Remove extraneous code from WASM binary, including debugging information (default:
`true` unless optimize is `Debug`)
* `keepNames` - Keep names of function in WASM binary when stripping (default: `false`)
* `useReadFile` - Enable the use of readFile() to Load WASM file when library is used in Node.js
(default: `false`)
* `clean` - Remove temporary build folder after building (default: `false`)
* `zigPath` - Path to zig compiler command (default: `zig`)
* `zigArgs` - Additional compiler arguments (default: ``)
* `cacheDir` - Directory where compiled shared libraries are placed (default: `${CWD}/.zigar-cache`)
* `buildDir` - Root directory where temporary build folder are placed (default: `${os.tmpdir()}`)

## Live demos

* [Single-image kernels](../single-image.md)
* [Multi-image kernels](../multi-image.md)
* [Rendering kernels](../rendering.md)

