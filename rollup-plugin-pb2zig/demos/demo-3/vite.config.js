import { defineConfig } from 'vite'
import React from '@vitejs/plugin-react-swc'
import PB2Zig from '../../dist/index.js';

export default defineConfig({
  plugins: [
    React(),
    PB2Zig({ webWorker: true }),
  ],
})