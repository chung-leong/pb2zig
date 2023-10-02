import * as ZIG from './zig-nodes.js';

export class ZigSerializer {
  lines = [];
  indent = 0;
  ast;
  macroASTs;
  options

  constructor(ast, options = {}) {
    this.options = options;
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

  serializeExpression(expression) {
    const fname = `serialize${expression.constructor.name}`;
    const f = this[fname];
    if (f) {
      return f.call(this, expression, typeExpected);
    } else {
      console.log(expression);
      return new ZigExpr(`[TODO: ${fname}]`, 'bool');
    }
  }

  serializeVariableAccess({ name, property, element }) {
    const code = name;
    if (pr)
    return
  }
}