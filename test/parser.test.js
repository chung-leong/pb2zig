import { expect } from 'chai';

import { parser, lexer } from '../src/parser.js';
import { visitor } from '../src/visitor.js';
import * as N from '../src/nodes.js';

describe('Parser tests', function() {
  it('should correctly parse a ternary expression', function() {
    const code = 'a > b ? 1 : 0';
    const ast = parse(code);
    expect(ast).to.be.instanceOf(N.Conditional);
    expect(ast.condition).to.be.instanceOf(N.BinaryOperation);
    expect(ast.onTrue).to.be.instanceOf(N.Literal);
    expect(ast.onFalse).to.be.instanceOf(N.Literal);
  })
  it('should correctly parse a ternary expression', function() {
    const code = 'length(a) > length(b) ? 1 : 0';
    const ast = parse(code);
    expect(ast).to.be.instanceOf(N.Conditional);
    expect(ast.condition).to.be.instanceOf(N.BinaryOperation);
    expect(ast.onTrue).to.be.instanceOf(N.Literal);
    expect(ast.onFalse).to.be.instanceOf(N.Literal);
  })
  it('should parse postfix and prefix operator', function() {
    const code = 'a++ + --b';
    const ast = parse(code);
    expect(ast).to.be.instanceOf(N.BinaryOperation);
    expect(ast.operand1).to.be.instanceOf(N.IncrementOperation)
    expect(ast.operand1.post).to.be.true;
    expect(ast.operand2).to.be.instanceOf(N.IncrementOperation)
    expect(ast.operand2.post).to.be.false;
  })
  it('should fix the order of binary operations', function() {
    const code = '2 * 3 + 1';
    const ast = parse(code);
    expect(ast).to.be.instanceOf(N.BinaryOperation);
    expect(ast.operator).to.equal('+');
    expect(ast.operand1).be.instanceOf(N.BinaryOperation);
    expect(ast.operand1.operator).to.equal('*');
  })
})

function parse(code, type = 'expression') {
  const lexResult = lexer.tokenize(code);
  if (lexResult.errors.length > 0) {
    throw new Error(lexResult.errors[0]);
  }
  parser.input = lexResult.tokens;
  const cst = parser[type]();
  const ast = visitor.visit(cst);
  if (parser.errors.length > 0) {
    throw new Error(parser.errors[0]);
  }
  return ast; 
}