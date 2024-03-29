import { parse } from './pb-parser.js';
import { process } from './pb-visitor.js';
import { translate } from './translator.js';
import { serialize } from './zig-serializer.js';

export function convertPixelBender(code, options) {
  const { cst, macroCSTs, lexErrors, parseErrors } = parse(code);
  const errCount = lexErrors.length + parseErrors.length;
  if (errCount > 0) {
    const msgs = [];
    for (const err of lexErrors) {
      const { message, line, column } = err;
      msgs.push(`   [LEXER]: ${message} at line ${line}, column ${column}`);
    }
    for (const err of parseErrors) {
      const { message, token: { startLine, startColumn } } = err;;
      msgs.push(`  [PARSER]: ${message} at line ${startLine}, column ${startColumn}`);
    }
    const s = (errCount > 1) ? 's' : '';
    throw new Error(`${errCount} error${s} encountered parsing Pixel Bender code:\n\n${msgs.join('\n')}`);
  }
  const { ast, macroASTs } = process(cst, macroCSTs);
  const zigAST = translate(ast, macroASTs, options);
  return serialize(zigAST);
}
