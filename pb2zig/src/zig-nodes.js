export class Node {
  static create(initializers) {
    return Object.assign(new this, initializers);
  }
}

export class ModuleDefinition extends Node {
  statements;
}

export class FieldDeclaration extends Node {
  type;
  name;
  defaultValue;
}

export class VariableDeclaration extends Node {
  isPublic = false;
  isConstant = true;
  type;
  name;
  initializer;
}

export class StructDefinition extends Node {
  isPublic = true;
  name;
  statements;
}

export class FunctionDefinition extends Node {
  isPublic = false;
  type;
  name;
  receiver;
  args;
  statements;
}

export class FunctionArgument extends Node {
  isComptime = false;
  type;
  name;
}

export class AssignmentStatement extends Node {
  operator;
  lvalue;
  rvalue;
}

export class StatementBlock extends Node {
  statements;
}

export class IfStatement extends Node {
  condition;
  statement;
  elseClause;
}

export class WhileStatement extends Node {
  condition;
  statement;
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

export class BlankLine extends Node {
}

export class Expression extends Node {
  type;

  isScalar() { return isScalar(this.type ) }
  isVector() { return isVector(this.type ) }
  isMatrix() { return isMatrix(this.type ) }
  getVectorWidth() { return getVectorWidth(this.type) }
  getVectorIndices() { return getVectorIndices(this.type) }
  getChildType() { return getChildType(this.type) }
  getScalarType() { return getScalarType(this.type) }
}

export class TupleLiteral extends Expression {
  initializers;
}

export class StructLiteral extends Expression {
  initializers;
}

export class Literal extends Expression {
  value;
}

export class FunctionCall extends Expression {
  receiver;
  name;
  args;
}

export class VariableAccess extends Expression {
  name;
}

export class ElementAccess extends Expression {
  expression;
  index;
}

export class BinaryOperation extends Expression {
  operator;
  operand1;
  operand2;
}

export class UnaryOperation extends Expression {
  operator;
  operand;
}

export class Conditional extends Expression {
  condition;
  onTrue;
  onFalse;
}

export class Parentheses extends Expression {
  expression;
}

export class ArrayType extends Expression {
  type = 'type';
  index;
  childType;
};

export class Comment extends Node {
  text;
}

export function isVector(type) {
  return /^@Vector\(/.test(type);
}

export function isMatrix(type) {
  return /^\[\d+\]@Vector\(/.test(type);
}

export function isScalar(type) {
  return /^\w+$/.test(type);
}

export function getVectorWidth(type) {
  const m1 = /^@Vector\((\d+)/.exec(type);
  if (m1) {
    return parseInt(m1[1]);
  }
  const m2 = /^Image(\d+)$/.exec(type);
  if (m2) {
    return parseInt(m2[1]);
  }
  return 1;
}

export function getScalarType(type) {
  if (isVector(type)) {
    return getChildType(type);
  } else if (isMatrix(type)) {
    return getChildType(getChildType(type));
  } else {
    return type;
  }
}

export function getVectorIndices(type) {
  const width = getVectorWidth(type);
  const indices = [];
  for (let i = 0; i < width; i++) {
    indices.push(i);
  }
  return indices;
}

export function getChildType(type) {
  if (typeof(type) === 'object') {
    return type.childType;
  }
  const m1 = /^\[.*?\](.*)/.exec(type);
  if (m1) {
    return m1[1];
  }
  const m2 = /^@Vector\(.*?, (.*?)\)/.exec(type);
  if (m2) {
    return m2[1];
  }
}

export function changeVectorWidth(type, width) {
  const typeC = getChildType(type);
  return `@Vector(${width}, ${typeC})`;
}
