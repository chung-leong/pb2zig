export class ZigSerializer {
  ast;
  macroASTs;

  constructor(ast) {
    this.ast = ast;
  }

  serialize() {
    let indent = 0;
    const text = this.serializeStatements(this.ast.statements);
    const lines = text.split('\n').map((line) => {
      line = line.trim();
      if (!line) {
        return line;
      }
      let indentForLine = indent;
      if (line.startsWith('}')) {
        indentForLine--;
      }
      for (const c of line) {
        if (c === '{') {
          indent++;
        } else if (c === '}') {
          indent--;
        }
      }
      const spaces = ' '.repeat(Math.max(0, indentForLine * 4));
      return spaces + line;
    });
    console.log(lines.join('\n'));
    return lines.join('\n');
  }

  serializeList(open, items, close) {
    if (items.length === 0) {
      return `${open}${close}`;
    }
    const list = items.join(', ');
    if (list.length <= 20) {
      return `${open} ${list} ${close}`;
    }
    return [
      open,
      ...items.map(i => `${i},`),
      close,
    ].join('\n');
  }

  serializeStatements(statements) {
    return statements.map(s => this.serializeStatement(s)).join('\n');
  }

  serializeStatement(statement) {
    const fname = `serialize${statement.constructor.name}`;
    const f = this[fname];
    if (f) {
      return f.call(this, statement);
    } else {
      console.log(statement);
      throw new Error(`TODO: ${fname}`);
    }
  }

  serializeVariableDeclaration({ type, isPublic, isConstant, name, initializer }) {
    const valueR = (initializer) ? this.serializeExpression(initializer, type) : 'undefined';
    const prefixes = [];
    if (isPublic) {
      prefixes.push('pub');
    }
    prefixes.push(isConstant ? 'const' : 'var');
    if (type) {
      return `${prefixes.join(' ')} ${name}: ${type} = ${valueR};`;
    } else {
      return `${prefixes.join(' ')} ${name} = ${valueR};`;
    }
  }

  serializeFieldDeclaration({ type, name, defaultValue }) {
    const valueR = (defaultValue) ? this.serializeExpression(defaultValue, type) : undefined;
    if (typeof(type) === 'object') {
      type = this.serializeExpression(type);
    }
    if (valueR) {
      return `${name}: ${type} = ${valueR},`;
    } else {
      return `${name}: ${type},`;
    }
  }

  serializeArrayType({ width, childType }) {
    return `[${this.serializeExpression(width)}]${childType}`;
  }

  serializeStructDefinition({ name, isPublic, statements }) {
    return [
      `struct {`,
      this.serializeStatements(statements),
      `}`
    ].join('\n');
  }

  serializeFunctionDefinition({ name, isPublic, receiver, args, type, statements }) {
    const prefix = (isPublic) ? 'pub ' : '';
    if (receiver) {
      args.push(receiver);
    }
    const argList = args.map(a => this.serializeExpression(a));
    return [
      `${prefix}fn ${name}(${argList.join(', ')}) ${type} {`,
      this.serializeStatements(statements),
      `}`
    ].join('\n');
  }

  serializeFunctionArgument({ isComptime, name, type }) {
    return (isComptime ? 'comptime ' : '') + `${name}: ${type}`;
  }

  serializeComment({ text }) {
    return text.split('\n').map(line => `// ${line}`).join('\n');
  }

  serializeRawCode({ code }) {
    return code;
  }

  serializeAssignmentStatement({ lvalue, operator, rvalue }) {
    const l = this.serializeExpression(lvalue);
    const r = this.serializeExpression(rvalue);
    return `${l} ${operator} ${r};`;
  }

  serializeIfStatement({ condition, statements, elseClause }) {
    let count = 0;
    const lines = [];
    while (statements) {
      if (condition) {
        if (count === 0) {
          lines.push(`if (${this.serializeExpression(condition)}) {`)
        } else {
          lines.push(`} else if (${this.serializeExpression(condition)}) {`)
        }
      } else {
        lines.push(`} else {`)
      }
      lines.push(this.serializeStatements(statements));
      condition = elseClause?.condition;
      statements = elseClause?.statements;
      count++;
    }
    lines.push(`}`);
    return lines.join('\n');
  }

  serializeWhileStatement({ condition, statements }) {
    return [
      `while (${this.serializeExpression(condition)}) {`,
      this.serializeStatements(statements),
      '}',
    ].join('\n');
  }

  serializeDoWhileStatement({ condition, statements }) {
    return [
      `while (true) {`,
      this.serializeStatements(statements),
      `if (${this.serializeExpression(condition)}) continue else break;`,
      `}`,
    ].join('\n');
  }

  serializeBreakStatement() {
    return `break;`;
  }

  serializeContinueStatement() {
    return `continue;`;
  }

  serializeReturnStatement({ expression }) {
    return `return ${this.serializeExpression(expression)};`;
  }

  serializeEmptyStatement() {
    return `;`;
  }

  serializeBlankLine() {
    return ``;
  }

  serializeExpressionStatement({ expression }) {
    const code = this.serializeExpression(expression);
    if (!code) {
      return code;
    }
    return `${code};`;
  }

  serializeExpression(expression) {
    if (typeof(expression) === 'string') {
      return expression;
    }
    if (typeof(expression) === 'undefined') {
      throw new Error(`Expression is undefined`);
    }
    const fname = `serialize${expression.constructor.name}`;
    const f = this[fname];
    if (f) {
      return f.call(this, expression);
    } else {
      console.log(expression);
      console.log('WTF?');
      throw new Error(`TODO: ${fname}`);
    }
  }

  serializeTupleLiteral({ type, initializers }) {
    const items = initializers.map(i => this.serializeExpression(i));
    return this.serializeList(`${type}{`, items, `}`);
  }

  serializeStructLiteral({ type, initializers }) {
    const pairs = Object.entries(initializers).map(([ name, item ]) => {
      return `.${name} = ${this.serializeExpression(item)}`;
    });
    return this.serializeList(`${type}{`, pairs, `}`);
  }

  serializeLiteral({ value, type }) {
    if (/^f\d+$/.test(type)) {
      let s = value.toString();
      if (s.indexOf('.') === -1) {
        s = value.toFixed(1);
      }
      return s;
    } else if (/^[iu]\d+$/.test(type)) {
      return value;
    } else {
      return JSON.stringify(value);
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
      n = `${this.serializeExpression(receiver)}.${name}`;
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
  const serializez = new ZigSerializer(ast);
  return serializez.serialize();
}
