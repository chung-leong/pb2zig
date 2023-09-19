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
}

export class VariableDeclaration {
  type;
  name;
  initializer;
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
  names;
}

export class BinaryOperation {
  operator;
  operand1;
  operand2;
}

export class UnaryOperation {
  operator;
  operand;
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

export class WhileStatement {
  condition;
  statements;
}

export class ContinueStatement{
}

export class ReturnStatement{
  value;
}
