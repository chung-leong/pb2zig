import { defineConfig } from 'vite'
import React from '@vitejs/plugin-react-swc'
import Pb2Zig from '../../dist/index.js';

export default defineConfig({
  plugins: [
    React(),
    Pb2Zig({ webWorker: true }),
  ],
  base: '/pb2zig/demo-5',
  build: {
    emptyOutDir: true,
    outDir: '../../../docs/demo-5',
  },
})
