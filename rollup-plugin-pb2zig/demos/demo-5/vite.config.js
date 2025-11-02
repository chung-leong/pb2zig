import React from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import Pb2Zig from '../../dist/index.js';

export default defineConfig({
  plugins: [
    React(),
    Pb2Zig({ embedWASM: true, multithreaded: true }),
  ],
  server: {
    headers: {
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Embedder-Policy': 'require-corp',
    }
  },
  base: '/pb2zig/demo-5',
  build: {
    emptyOutDir: true,
    outDir: '../../../../zigar.website/pb2zig/demo-5',
  },
})
