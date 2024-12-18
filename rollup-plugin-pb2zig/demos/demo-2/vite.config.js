import { defineConfig } from 'vite'
import React from '@vitejs/plugin-react-swc'
import Pb2Zig from '../../dist/index.js';

export default defineConfig({
  plugins: [
    React(),
    Pb2Zig({ multithreaded: true }),
  ],
  server: {
    headers: {
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Embedder-Policy': 'credentialless',
    }
  },
  base: '/pb2zig/demo-2',
  build: {
    emptyOutDir: true,
    outDir: '../../../docs/demo-2',
  },
})
