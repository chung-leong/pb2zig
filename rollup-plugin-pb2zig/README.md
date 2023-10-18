# rollup-plugin-pb2zig

Rollup-plugin-pb2zig is a [Rollup](https://rollupjs.org/) plugin that uses pb2zig to translate a
Pixel Bender kernel into Zig, then with the help of [Zigar]'s Rollup plugin compile the resulting
code to WebAssembly, which then can be use in a web project. It also provides additional functions
for offloading processing to web workers.

The plugin is Vite-compatible and is designed to work correctly when in serve mode.

## Installation

```sh
npm install --save-dev rollup-plugin-pb2zig
```

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

All you have to do is import `createImageData` from a .pbk file, provide it with an
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

function App() {
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

### Processing across multiple web workers

