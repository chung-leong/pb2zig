import { defineConfig } from 'vite'
import React from '@vitejs/plugin-react-swc'
import Zigar from '../../dist/index.js';

export default defineConfig({
  plugins: [
    React(),
    Zigar({ webWorker: true }),
  ],
  base: '/pb2zig/demo-4',
  build: {
    emptyOutDir: true,
    outDir: '../../../docs/demo-4',
  },
})
