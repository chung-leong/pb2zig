import { parse } from './parser.js';
import { process } from './visitor.js';
import { translate } from './translator.js';

export function convertPixelBender(code) {
  const { cst, macroCSTs, lexErrors, parseErrors } = parse(code);
  const errCount = lexErrors.length + parseErrors.length;
  if (errCount > 0) {
    const msgs = [];
    for (const err of lexErrors) {
      msgs.push(`   [LEXER]: ${err.message}`);
    }
    for (const err of parseErrors) {
      msgs.push(`  [PARSER]: ${err.message}`);
    }
    const s = (errCount > 1) ? 's' : '';
    throw new Error(`${errCount} error${s} encountered parsing Pixel Bender code:\n\n${msgs.join('\n')}`);
  }
  const { ast, macroASTs } = process(cst, macroCSTs);
  return translate(ast, macroASTs);
}
