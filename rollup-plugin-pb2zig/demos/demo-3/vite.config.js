import { defineConfig } from 'vite'
import React from '@vitejs/plugin-react-swc'
import Pb2Zig from '../../dist/index.js';

export default defineConfig({
  plugins: [
    React(),
    Pb2Zig({ topLevelAwait: false, multithreaded: true, maxMemory: 1024 * 1024 * 32 }),
  ],
  server: {
    headers: {
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Embedder-Policy': 'require-corp',
    }
  },
  base: '/demo-3',
  build: {
    emptyOutDir: true,
    outDir: '../../../docs/demo-3',
  },
})
