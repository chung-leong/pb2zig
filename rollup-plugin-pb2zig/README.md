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

The major and minor version numbers of this plugin correspond to the version of the Zig compiler
it's designed for. The current version is 0.11.0. It works with Zig 0.11.0 and 0.12.0.

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

By default, processing is performed in the main thread. If your kernel is computationally
intensive, this could lead to an unresponsive user interface. To offload the processing to web
workers, set the `webWorker` option to `true`:

```js
import { defineConfig } from 'vite'
import React from '@vitejs/plugin-react-swc'
import Pb2Zig from 'rollup-plugin-pb2zig';

export default defineConfig({
  plugins: [
    React(),
    Pb2Zig({ webWorker: true }),
  ],
})
```

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

Note that once an ImageData object has been transferred to a web worker, it cannot be used again.

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
    const dstImageData = await createImageData(width, height, input, params);
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
    const dstImageData = await createImageData(width, height, input, params);
    dstCTX.putImageData(dstImageData, 0, 0);
  }
```

### Processing across multiple web workers

For kernels that are computationally intensive, you might wish to speed up the process by spreading
the work across multiple CPU cores. This plugin provides you with a second function for this
purpose: `createPartialOutput()`. Given a scanline offset and a scanline count, the function
returns a slice of the output image:

```js
import { useState, useRef, useEffect } from 'react'
import { createPartialOutput, purgeQueue } from './pbk/raytracer.pbk';

export function App() {
  const srcCanvasRef = useRef();
  const dstCanvasRef = useRef();
  const [ params, setParams ] = useState();

  function updateDestinationImage() {
    const dstCanvas = dstCanvasRef.current;
    const { width, height } = dstCanvas;
    const dstCTX = dstCanvas.getContext('2d');
    const perWorker = Math.ceil(height / 8);
    purgeQueue();
    for (let i = 0, offset = 0, remaining = height; offset < height; i++, offset += perWorker, remaining -= perWorker) {
      const scanlines = Math.min(perWorker, remaining);
      createPartialImageData(width, height, offset, scanlines, {}, params).then((data) => {
        dstCTX.putImageData(data, 0, offset);
      });
    }
  }

  // ...
}
```

The example above divides the work into 8 chunks. If your computer has 8 cores or more, processing
would commence immediately on all chunks. Otherwise, some chunks would end up in a queue awaiting
the completion of earlier ones. The `purgeQueue()` function causes all pending work orders to be
abandoned. Calling it is essential in a situation where the user can make rapid changes to the
kernel parameters.

The maximum number of workers by default equals
[`navigator.hardwareConcurrency`](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/hardwareConcurrency).
You can change this by calling `manageWorkers()` with the setting `{ maxCount: [number of workers] }`.

By default, workers are kept around after they've completed their task. This makes subsequent
calls to `createImageData` or `createPartialImageData` much quicker. You may want to release the
workers when the user exits the section of your app using the kernel. You can accomplish this by
calling `manageWorkers()` with the setting `{ keepAlive: false }`:

```js
import { useState, useRef, useEffect } from 'react'
import { createPartialOutput, purgeQueue, manageWorkers } from './pbk/raytracer.pbk';

export function App() {
  // ...

  useEffect(() => {
    // on mount
    manageWorkers({ keepAlive: true });
    return () => {
      // on unmount
      manageWorkers({ keepAlive: false });
    };
  }, []);
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
* `zigCmd` - Zig build command (default: `zig build -Doptimize=${optimize}`)
* `cacheDir` - Directory where compiled shared libraries are placed (default: `${CWD}/zigar-cache`)
* `buildDir` - Root directory where temporary build folder are placed (default: `${os.tmpdir()}`)
* `staleTime` - Maximum amount of time to wait for a file lock, in milliseconds (default: `60000`)

## Live demos

* [Single-image kernels](../single-image.md)
* [Multi-image kernels](../multi-image.md)
* [Rendering kernels](../rendering.md)

