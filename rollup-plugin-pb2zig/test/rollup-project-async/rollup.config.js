import Pb2zig from '../../dist/index.js';

export default {
  input: './simple.pbk',
  plugins: [
    Pb2zig({ topLevelAwait: false, nodeCompat: true, multithreaded: true }),
  ],
  output: {
    file: './simple.js',
    format: 'esm',
  },
};
