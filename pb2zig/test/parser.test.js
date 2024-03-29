import { expect } from 'chai';

import { parser, lexer } from '../src/pb-parser.js';
import { visitor } from '../src/pb-visitor.js';
import * as PB from '../src/pb-nodes.js';

describe('Parser tests', function() {
  it('should correctly parse a ternary expression', function() {
    const code = 'a > b ? 1 : 0';
    const ast = parse(code);
    expect(ast).to.be.instanceOf(PB.Conditional);
    expect(ast.condition).to.be.instanceOf(PB.BinaryOperation);
    expect(ast.onTrue).to.be.instanceOf(PB.Literal);
    expect(ast.onFalse).to.be.instanceOf(PB.Literal);
  })
  it('should correctly parse a ternary expression', function() {
    const code = 'length(a) > length(b) ? 1 : 0';
    const ast = parse(code);
    expect(ast).to.be.instanceOf(PB.Conditional);
    expect(ast.condition).to.be.instanceOf(PB.BinaryOperation);
    expect(ast.onTrue).to.be.instanceOf(PB.Literal);
    expect(ast.onFalse).to.be.instanceOf(PB.Literal);
  })
  it('should parse postfix and prefix operator', function() {
    const code = 'a++ + --b';
    const ast = parse(code);
    expect(ast).to.be.instanceOf(PB.BinaryOperation);
    expect(ast.operand1).to.be.instanceOf(PB.IncrementOperation)
    expect(ast.operand1.post).to.be.true;
    expect(ast.operand2).to.be.instanceOf(PB.IncrementOperation)
    expect(ast.operand2.post).to.be.false;
  })
  it('should fix the order of binary operations', function() {
    const code = '2 * 3 + 1 - 7;';
    // ordering is fixed at the statement level
    const ast = parse(code, 'statement');
    expect(ast).to.be.instanceOf(PB.ExpressionStatement);
    const { expression } = ast;
    expect(expression.operator).to.equal('-');
    expect(expression.operand1).be.instanceOf(PB.BinaryOperation);
    expect(expression.operand1.operator).to.equal('+');
    expect(expression.operand1.operand1.operator).to.equal('*');
  })
  it('should parse a float without leading zero', function() {
    const code = '.123';
    const ast = parse(code);
    expect(ast).to.be.instanceOf(PB.Literal);
    expect(ast.value).to.equal(0.123);
  })
  it('should parse a if statement', function() {
    const code = `
      if (i < 10) {
        i++;
      }
    `;
    const ast = parse(code, 'statement');
    expect(ast).to.be.instanceOf(PB.IfStatement);
    expect(ast.condition).to.be.instanceOf(PB.ComparisonOperation);
    expect(ast.condition.operator).to.equal('<');
    expect(ast.statement).to.be.instanceOf(PB.StatementBlock);
    expect(ast.statement.statements[0]).to.be.instanceOf(PB.ExpressionStatement);
    expect(ast.statement.statements[0].expression).to.be.instanceOf(PB.IncrementOperation);
  })
  it('should parse a while loop', function() {
    const code = `
      while (i < 10) {
        i++;
      }
    `;
    const ast = parse(code, 'statement');
    expect(ast).to.be.instanceOf(PB.WhileStatement);
    expect(ast.condition).to.be.instanceOf(PB.ComparisonOperation);
    expect(ast.condition.operator).to.equal('<');
    expect(ast.statement).to.be.instanceOf(PB.StatementBlock);
    expect(ast.statement.statements[0]).to.be.instanceOf(PB.ExpressionStatement);
    expect(ast.statement.statements[0].expression).to.be.instanceOf(PB.IncrementOperation);
  })
  it('should parse a while loop with break', function() {
    const code = `
      while (true) {
        if (i > 10) break;
        i++;
      }
    `;
    const ast = parse(code, 'statement');
    expect(ast).to.be.instanceOf(PB.WhileStatement);
    expect(ast.condition).to.be.instanceOf(PB.Literal);
    expect(ast.condition.value).to.be.true;
    expect(ast.statement).to.be.instanceOf(PB.StatementBlock);
    expect(ast.statement.statements).to.have.lengthOf(2);
    expect(ast.statement.statements[0]).to.be.instanceOf(PB.IfStatement);
    expect(ast.statement.statements[0].statement).to.be.instanceOf(PB.BreakStatement);
  })
  it('should parse a for loop', function() {
    const code = `
      for (int i = 0; i < 10; i++) {
        something(i);
        somethingElse();
      }
    `;
    const ast = parse(code, 'statement');
    expect(ast).to.be.instanceOf(PB.ForStatement);
    expect(ast.initializers).to.have.lengthOf(1);
    expect(ast.initializers[0]).to.be.an.instanceOf(PB.VariableDeclaration);
    expect(ast.condition).to.be.instanceOf(PB.ComparisonOperation);
    expect(ast.condition.operator).to.equal('<');
    expect(ast.statement).to.be.instanceOf(PB.StatementBlock);
    expect(ast.statement.statements).to.have.lengthOf(2);
    expect(ast.statement.statements[0].expression).to.be.instanceOf(PB.FunctionCall);
    expect(ast.statement.statements[1].expression).to.be.instanceOf(PB.FunctionCall);
    expect(ast.incrementals).to.have.lengthOf(1);
    expect(ast.incrementals[0]).to.be.an.instanceOf(PB.ExpressionStatement);
    expect(ast.incrementals[0].expression).to.be.an.instanceOf(PB.IncrementOperation);
  })
  it('should parse a for loop with multiple variable declarations', function() {
    const code = `
      for (int i = 0, j = 0, k = 0; i < 10; i++, j++, k++) {
        something(i);
      }
    `;
    const ast = parse(code, 'statement');
    expect(ast).to.be.instanceOf(PB.ForStatement);
    expect(ast.initializers).to.have.lengthOf(3);
    expect(ast.initializers[0]).to.be.an.instanceOf(PB.VariableDeclaration);
    expect(ast.initializers[0].name).to.equal('i');
    expect(ast.initializers[1]).to.be.an.instanceOf(PB.VariableDeclaration);
    expect(ast.initializers[1].name).to.equal('j');
    expect(ast.initializers[2]).to.be.an.instanceOf(PB.VariableDeclaration);
    expect(ast.initializers[2].name).to.equal('k');
    expect(ast.incrementals).to.have.lengthOf(3);
  })
  it('should parse a for loop initializing an already declared variable', function() {
    const code = `
      for (i = 0; i < 10; i++) {
        something(i);
      }
    `;
    const ast = parse(code, 'statement');
    expect(ast).to.be.instanceOf(PB.ForStatement);
    expect(ast.initializers).to.have.lengthOf(1);
    expect(ast.initializers[0]).to.be.an.instanceOf(PB.ExpressionStatement);
  })
  it('should parse a for loop with no initializer', function() {
    const code = `
      for (; i < 10; i++) {
        something(i);
      }
    `;
    const ast = parse(code, 'statement');
    expect(ast.initializers).to.have.lengthOf(0);
    expect(ast).to.be.instanceOf(PB.ForStatement);
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