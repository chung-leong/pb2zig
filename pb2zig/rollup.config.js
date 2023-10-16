export default {
  input: './src/cli.js',
  output: {
    file: './bin/cli.js',
    format: 'esm',
    banner: '#!/usr/bin/env node',
  },
};
