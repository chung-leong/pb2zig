import { defineConfig } from 'vite'
import React from '@vitejs/plugin-react-swc'
import PB2Zig from '../../dist/index.js';

export default defineConfig({
  plugins: [
    React(),
    PB2Zig({ webWorker: true }),
  ],
  base: '/pb2zig/demo-3',
  build: {
    emptyOutDir: true,
    outDir: '../../../web-site/demo-3',
  },
})
