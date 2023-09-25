export class Kernel {
  name;
  meta;
  statements;
}

export class Meta {
  namespace;
  vendor;
  version;
  description;
  displayname;
  category;
}

export class Comment {
  text;
}

export class Parameter {
  name;
  type;
  minValue;
  maxValue;
  stepInterval;
  defaultValue;
  previewValue;
  parameterType;
  description;
}

export class VariableDeclaration {
  type;
  name;
  initializer;
}

export class ConstantDeclaration {
  type;
  name;
  initializer;
}

export class DependentDeclaration {
  type;
  name;
}

export class InputDeclaration  {
  type;
  name;
}

export class OutputDeclaration {
  type;
  name;
}

export class FunctionDefinition {
  type;
  name;
  args;
  statements;
}

export class MacroDefinition {
  name;
  args;
  expression;
}

export class Literal {
  type;
  value;
}

export class FunctionArgument {
  type;
  name;
}

export class FunctionCall {
  name;
  args;
}

export class ConstructorCall {
  type;
  args;
}

export class VariableAssignment {
  operator;
  lvalue;
  expression;
}

export class VariableAccess {
  name;
  property;
  element;
}

export class ElementAccess {
  expression;
  property;
  element;
}

export class IncrementOperation {
  operator;
  post;
  lvalue;
}

export class AssignmentOperation {
  operator;
  lvalue;
  rvalue;
}

export class BinaryOperation {
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

export class UnaryOperation {
  operand;
}

export class SignOperation extends UnaryOperation {
  sign;
}

export class NotOperation extends UnaryOperation {
}

export class Conditional {
  condition;
  onTrue;
  onFalse;
}

export class Parentheses {
  expression;
}

export class IfStatement {
  condition;
  statements;
  elseClause;
}

export class ForStatement {
  initializers;
  condition;
  incrementals;
  statements;
}

export class WhileStatement {
  condition;
  statements;
}

export class DoWhileStatement {
  condition;
  statements;
}

export class BreakStatement{
}

export class ContinueStatement{
}

export class ReturnStatement{
  expression;
}

export class ExpressionStatement{
  expression;
}

export class EmptyStatement{
}
