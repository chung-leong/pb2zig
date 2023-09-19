import { readFileSync, writeFileSync } from 'fs';
import { convertPixelBender } from './src/index.js';

const pbkCode = readFileSync('./test/pbk-samples/posterize.pbk', 'utf8');
const zigCode = convertPixelBender(pbkCode);
writeFileSync('./output.zig', zigCode);
