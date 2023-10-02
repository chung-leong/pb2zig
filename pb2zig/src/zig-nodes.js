export class Node {
  static create(initializers) {
    return Object.assign(new this, initializers);
  }
}

export class FieldDeclaration extends Node {
  type;
  name;
  defaultValue;
}

export class VariableDeclaration extends Node {
  type;
  name;
  initializer;
}

export class ConstantDeclaration extends Node {
  type;
  name;
  initializer;
}

export class FunctionDefinition extends Node {
  type;
  name;
  args;
  isPublic;
  isMethod;
  statements;
}

export class Literal extends Node {
  type;
  value;
}

export class FunctionArgument extends Node {
  type;
  name;
}

export class Expression extends Node {
  type;
}

export class FunctionCall extends Expression {
  name;
  args;
}

export class VariableAccess extends Expression {
  name;
  property;
  element;
}

export class ElementAccess extends Node {
  expression;
  property;
  element;
}

export class AssignmentStatement extends Node {
  operator;
  lvalue;
  rvalue;
}

export class BinaryOperation extends Expression {
  operator;
  operand1;
  operand2;
}

export class ArithmeticOperation extends BinaryOperation {
}

export class ComparisonOperation extends BinaryOperation {
}

export class LogicalOperation extends BinaryOperation {
}

export class UnaryOperation extends Expression {
  operand;
}

export class SignOperation extends UnaryOperation {
  sign;
}

export class NotOperation extends UnaryOperation {
}

export class Conditional extends Expression {
  condition;
  onTrue;
  onFalse;
}

export class Parentheses extends Expression {
  expression;
}

export class IfStatement extends Node {
  condition;
  statements;
  elseClause;
}

export class WhileStatement extends Node {
  condition;
  statements;
}

export class BreakStatement extends Node {
}

export class ContinueStatement extends Node {
}

export class ReturnStatement extends Node {
  expression;
}

export class ExpressionStatement extends Node {
  expression;
}

export function isVector(type) {
  return /^@Vector\(/.test(type);
}

export function isMatrix(type) {
  return /^\[\d+\]@Vector\($/.test(type);
}

export function isArray(type) {
  return /^\[.*\]/i.test(type);
}
