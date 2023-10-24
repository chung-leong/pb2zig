export default [
  {
    input: './src/cli.js',
    output: {
      file: './bin/cli.js',
      format: 'esm',
      banner: '#!/usr/bin/env node',
    },
  },
  {
    input: './src/index.js',
    output: {
      file: './dist/index.js',
      format: 'esm',
    },
  },
];
