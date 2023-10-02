import * as ZIG from './zig-nodes.js';

export class ZigSerializer {
  lines = [];
  indent = 0;
  ast;
  macroASTs;

  constructor(ast) {
    this.ast = ast;
  }

  serialize() {
    this.addStatements(this.ast);
    return this.lines.join('\n');
  }

  add(text) {
    const newLines = text.trim().split('\n').map(l => l.trim());
    for (const line of newLines) {
      let indent = this.indent;
      if (line.startsWith('}')) {
        indent--;
      }
      const spaces = ' '.repeat(Math.max(0, indent) * 4);
      this.lines.push(spaces + line);
      //console.log(spaces + line);
      for (const c of line) {
        if (c === '{') {
          this.indent++;
        } else if (c === '}') {
          this.indent--;
        }
      }
    }
  }

  addStatements(statements) {
    for (const statement of statements) {
      this.addStatement(statement);
    }
  }

  addStatement(statement) {
    const fname = `add${statement.constructor.name}`;
    const f = this[fname];
    if (f) {
      f.call(this, statement);
    } else {
      this.add(`[TODO: ${fname}];`);
      console.log(statement);
    }
    this.variableAliases = [];
  }

  addVariableDeclaration({ type, isConstant, name, initializer }) {
    const valueR = (initializer) ? this.serializeExpression(initializer, type) : 'undefined';
    const prefix = (isConstant) ? 'const' : 'var';
    this.add(`${prefix} ${name}: ${type} = ${valueR};`);
  }

  addFieldDeclaration({ type, name, defaultValue }) {
    const valueR = (initializer) ? this.serializeExpression(defaultValue, type) : 'undefined';
    if (valueR) {
      this.add(`${name}: ${type} = ${valueR},`);
    } else {
      this.add(`${name}: ${type},`);
    }
  }

  addStructDefinition({ name, statements }) {
    this.add(`const ${name} = struct {`);
    this.addStatements(statements);
    this.add(`};`)
  }

  addFunctionDefinition({ name, isPublic, isMethod, args, type, statements }) {
    const prefix = (isPublic) ? 'pub ' : '';
    const argList = args.map(a => this.serializeExpression(a));
    if (isMethod) {
      argList.unshift(`self: @This()`);
    }
    this.add(`${prefix}fn ${name}(${argList.join(', ')}) ${type} {`);
    this.addStatements(statements);
    this.add(`}`);
  }

  addComment({ lines }) {
    for (const line of lines) {
      this.add(`// ${line}`);
    }
  }

  addCodeBlock({ code }) {
    for (const line of code.split('\n')) {
      this.add(line);
    }
  }

  addAssignmentStatement({ lvalue, operator, rvalue }) {
    const l = this.serializeExpression(lvalue);
    const r = this.serializeExpression(rvalue);
    this.add(`${l} ${operator} ${r};`);
  }

  addIfStatement({ condition, statements, elseClause }) {
    let count = 0;
    while (statements) {
      if (condition) {
        if (count === 0) {
          this.add(`if (${this.serializeExpression(condition)}) {`)
        } else {
          this.add(`} else if (${this.serializeExpression(condition)}) {`)
        }
      } else {
        this.add(`} else {`)
      }
      this.addStatements(statements);
      condition = elseClause?.condition;
      statements = elseClause?.statements;
      needElse = true;
      count++;
    }
    this.add(`}`);
  }

  addWhileStatement({ condition, statements }) {
    this.add(`while (${this.serializeExpression(condition)}) {`)
    this.addStatements(statements);
    this.add(`}`);
  }

  addWhileStatement({ condition, statements }) {
    this.add(`while (${this.serializeExpression(condition)}) {`)
    this.addStatements(statements);
    this.add(`}`);
  }

  addBreakStatement() {
    this.add(`break;`);
  }

  addContinueStatement() {
    this.add(`continue;`);
  }

  addReturnStatement({ expression }) {
    this.add(`return ${this.serializeExpression(expression)};`);
  }

  addEmptyStatement() {
    this.add(`;`);
  }

  addBlankLine() {
    this.add(``);
  }

  addExpressionStatement({ expression }) {
    if (expression instanceof ZIG.SideEffectExpression) {
      this.addStatements(expression.statements);
    } else {
      this.add(`${this.serializeExpression(expression)};`);
    }
  }

  serializeExpression(expression) {
    if (typeof(expression) === 'string') {
      return expression;
    }
    const fname = `serialize${expression.constructor.name}`;
    const f = this[fname];
    if (f) {
      return f.call(this, expression, typeExpected);
    } else {
      console.log(expression);
      return new ZigExpr(`[TODO: ${fname}]`, 'bool');
    }
  }

  serializeVariableAccess({ name }) {
    return name;
  }

  serializeElementAccess({ expression, index }) {
    const e = this.serializeExpression(expression);
    const i = this.serializeExpression(index);
    return `${e}[${i}]`;
  }

  serializeFunctionCall({ receiver, name, args }) {
    let n = name;
    if (receiver) {
      n = `${this.serializeExpression(receiver)}.name`;
    }
    const a = args.map(a => this.serializeExpression(a));
    return `${n}(${a.join(', ')})`;
  }

  serializeParentheses({ expression }) {
    return `(${this.serializeExpression(expression)})`;
  }

  serializeConditional({ condition, onTrue, onFalse }) {
    const c = this.serializeExpression(condition);
    const t = this.serializeExpression(onTrue);
    const f = this.serializeExpression(onFalse);
    return `if (${c}) ${t} else ${f}`;
  }

  serializeBinaryOperation({ operand1, operator, operand2 }) {
    const op1 = this.serializeExpression(operand1);
    const op2 = this.serializeExpression(operand2);
    return `${op1} ${operator} ${op2}`;
  }

  serializeUnaryOperation({ operator, operand }) {
    const op = this.serializeExpression(operand);
    return `${operator}${op}`;
  }
}

export function serialize(ast) {
  const translater = new ZigSerializer(ast);
  return translater.translate();
}
