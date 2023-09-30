import Zigar from '../../dist/index.js';

export default {
  input: './simple.pbk',
  plugins: [
    Zigar({ topLevelAwait: false, useReadFile: true }),
  ],
  output: {
    file: './simple.js',
    format: 'esm',
  },
};
