import { readFileSync } from 'fs';
import { parse } from './src/parser.js';
import { PixelBenderAstVisitor } from './src/visitor.js';

const text = readFileSync('./painting.pbk', 'utf8');
const { cst, lexErrors, parseErrors } = parse(text);

if (lexErrors.length > 0) {
  console.log('Errors encountered by lexer:');
  for (const error of lexErrors) {
    console.log(error);
  }    
}

if (parseErrors.length > 0) {
  console.log('Errors encountered by parser:');
  for (const error of parseErrors) {
    console.log(error);
  }    
}

const visitor = new PixelBenderAstVisitor();
console.log(visitor.visit(cst));