export class PBNode {
  static create(initializers) {
    return Object.assign(new this, initializers);
  }
}

export class Kernel extends PBNode {
  name;
  meta;
  statements;
}

export class Meta extends PBNode {
  namespace;
  vendor;
  version;
  description;
  displayName;
  category;
}

export class Parameter extends PBNode {
  name;
  type;
  minValue;
  maxValue;
  stepInterval;
  defaultValue;
  previewValue;
  parameterType;
  displayName;
  description;
}

export class VariableDeclaration extends PBNode {
  type;
  name;
  initializer;
}

export class ConstantDeclaration extends PBNode {
  type;
  name;
  initializer;
}

export class DependentDeclaration extends PBNode {
  type;
  name;
  width;
}

export class InputDeclaration extends PBNode {
  type;
  name;
}

export class OutputDeclaration extends PBNode {
  type;
  name;
}

export class FunctionDefinition extends PBNode {
  type;
  name;
  args;
  statements;
}

export class MacroDefinition extends PBNode {
  name;
  args;
  expression;
}

export class Literal extends PBNode {
  type;
  value;
}

export class FunctionArgument extends PBNode {
  direction;
  type;
  name;
}

export class FunctionCall extends PBNode {
  name;
  args;
}

export class ConstructorCall extends PBNode {
  type;
  args;
}

export class VariableAccess extends PBNode {
  name;
  property;
  index;
}

export class ElementAccess extends PBNode {
  expression;
  property;
  index;
}

export class IncrementOperation extends PBNode {
  operator;
  post;
  lvalue;
}

export class AssignmentOperation extends PBNode {
  operator;
  lvalue;
  rvalue;
}

export class BinaryOperation extends PBNode {
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

export class UnaryOperation extends PBNode {
  operand;
}

export class SignOperation extends UnaryOperation {
  sign;
}

export class NotOperation extends UnaryOperation {
}

export class Conditional extends PBNode {
  condition;
  onTrue;
  onFalse;
}

export class Parentheses extends PBNode {
  expression;
}

export class IfStatement extends PBNode {
  condition;
  statements;
  elseClause;
}

export class ForStatement extends PBNode {
  initializers;
  condition;
  incrementals;
  statements;
}

export class WhileStatement extends PBNode {
  condition;
  statements;
}

export class DoWhileStatement extends PBNode {
  condition;
  statements;
}

export class BreakStatement extends PBNode {
}

export class ContinueStatement extends PBNode {
}

export class ReturnStatement extends PBNode {
  expression;
}

export class ExpressionStatement extends PBNode {
  expression;
}

export class EmptyStatement extends PBNode {
}

export function isVector(type) {
  return /^[_a-z]+\d$/.test(type);
}

export function isMatrix(type) {
  return /^[_a-z]+\dx\d$/.test(type);
}

export function isArray(type) {
  return /^[_a-z]+\[\]$/.test(type);
}

export function isUnsupported(type) {
  return [ 'region', 'imageRef' ].includes(type);
}
