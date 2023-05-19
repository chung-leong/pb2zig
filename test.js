import { readFileSync } from 'fs';
import { parse } from './src/parser.js';

const text = readFileSync('./painting.pbk', 'utf8');
const result = parse(text);
console.log(result);