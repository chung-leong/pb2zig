import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import * as N from './nodes.js';

export class PixelBenderToZigTranslator {
  lines = [ '' ];
  indent = 0;
  ast = null;

  translate(ast) {
    this.ast = ast;
    this.addMetadata();
    this.addImports();
    this.addKernel();
    this.ast = null;
    return this.lines;
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
      for (const c of line) {
        if (c === '{') {
          this.indent++;
        } else if (c === '}') {
          this.indent--;
        }
      }
    }
  }

  walk(tree, cb) {
    const f = (node) => {
      if (Array.isArray(node)) {
        for (const n of node) {
          const res = f(n);
          // end iteration if callback returns false
          if (res === false) {
            return false;
          }
        }
      } else if (node instanceof Object) {
        const res = cb(node);
        if (res !== undefined) {
          return res;
        }
        // scan sub-nodes if callback doesn't return anything
        f(Object.values(node));
      }
    };
    f(tree);
  }

  find(classes, recursive = false) {
    if (!Array.isArray(classes)) {
      classes = [ classes ];
    }
    const list = [];
    this.walk(this.ast, (node) => {
      if (classes.some(c => node instanceof c)) {
        list.push(node);
        if (!recursive) {
          return true;
        }
      }
    });
    return list;
  }

  type(type) {
    if (type.startsWith('pixel')) {
      type = `float` + type.slice(-1);
    }
    if (type.startsWith('image')) {
      return 'Image';
    }
    const table = {
      bool: 'bool',
      bool2: 'bool[2]',
      bool3: 'bool[3]',
      bool4: 'bool[4]',

      int: 'i32',
      int2: '@Vector(2, i32)',
      int3: '@Vector(3, i32)',
      int4: '@Vector(4, i32)',

      float: 'f32',
      float2: '@Vector(2, f32)',
      float3: '@Vector(3, f32)',
      float4: '@Vector(4, f32)',

      float2x2: '[2]@Vector(2, f32)',
      float3x3: '[3]@Vector(3, f32)',
      float4x4: '[4]@Vector(4, f32)',
    };
    const zigType = table[type];
    if (!zigType) {
      throw new Error(`Unknown type: ${type}`);
    }
    return zigType;
  }

  element(type) {
    return this.type(type.slice(0, -1));
  }

  length(type) {
    return parseInt(type.slice(-1), '') || 1;
  }

  value(value, type) {
    if (type === 'float') {
      let s = value.toString();
      if (s.indexOf('.') === -1) {
        s = value.toFixed(1);
      }
      return s;
    } else {
      return JSON.stringify(value);
    }
  }

  indices(name, len) {
    if (name) {
      const map = {
        r: 0, g: 1, b: 2, a: 3,
        x: 0, y: 1, z: 2, w: 3,
        s: 0, t: 1, p: 2, q: 3,
      };
      return [ ...name ].map(c => map[c]);
    } else {
      const indices = [];
      for (let i = 0; i < len; i++) {
        indices.push(i);
      }
      return indices;
    }
  }

  addImports() {
    this.add(`const std = @import("std");`);
    this.add(``);
  }

  addMetadata() {
    const { name, meta } = this.ast;
    this.add(`// Pixel Bender "${name}" (translated using pb2zig)`);
    for (const [ field, value ] of Object.entries(meta)) {
      if (value) {
        this.add(`// ${field}: ${value}`);
      }
    }
    this.add(``);
  }

  addKernel() {
    this.add(`pub const kernel = struct {`);
    this.addParameterDecls();
    this.addInput();
    this.addOutput();
    this.add(``);
    this.addInstanceFunction();
    this.add(``);
    this.addCreateFunction();
    this.add(`};`);
  }

  addParameterDecls() {
    const params = this.find(N.Parameter);
    this.add(`pub const parameters = .{`);
    for (const param of params) {
      const {
        name,
        type,
        minValue,
        maxValue,
        stepInterval,
        defaultValue,
        previewValue,
        ...others
      } = param;
      this.add(`.${param.name} = .{`);
      this.add(`.type = ${this.type(type)},`);
      if (minValue !== undefined) {
        this.add(`.minValue = ${this.value(minValue, type)},`);
      }
      if (maxValue !== undefined) {
        this.add(`.maxValue = ${this.value(maxValue, type)},`);
      }
      if (stepInterval !== undefined) {
        this.add(`.stepInterval = ${this.value(stepInterval, type)},`);
      }
      if (defaultValue !== undefined) {
        this.add(`.defaultValue = ${this.value(defaultValue, type)},`);
      }
      if (previewValue !== undefined) {
        this.add(`.previewValue = ${this.value(previewValue, type)},`);
      }
      for (const [ name, value ] of Object.entries(others)) {
        this.add(`.${name} = ${this.value(value, type)},`);
      }
      this.add(`},`);
    }
    this.add(`};`);
  }

  addInput() {
    const inputs = this.find(N.InputDeclaration);
    this.add(`pub const input = .{`);
    for (const { name, type } of inputs) {
      const channels = this.length(type);
      this.add(`${name} = .{ channels: ${channels} },`);
    }
    this.add('};');
  }

  addOutput() {
    const outputs = this.find(N.OutputDeclaration);
    this.add(`pub const output = .{`);
    for (const { name, type } of outputs) {
      const channels = this.length(type);
      this.add(`${name} = .{ channels: ${channels} },`);
    }
    this.add('};');
  }

  addInstanceFunction() {
    this.add(`fn Instance(comptime InputStruct: type) type {`);
    this.addParameterFields();
    this.addInputFields();
    this.add(``);
    this.addCalledFunctions();
    this.addDefinedFunctions();
    this.add(`}`);
  }

  addParameterFields() {
    const params = this.find(N.Parameter);
    for (const param of params) {
      const type = this.type(param.type);
      this.add(`${param.name}: ${type},`);
    }
  }

  addInputFields() {
    const inputs = this.find(N.InputDeclaration);
    for (const { name } of inputs) {
     this.add(`${name} = std.meta.fieldInfo(InputStruct, .src).type,`);
    }
  }

  addCalledFunctions() {
    // find function calls
    const inUse = {};
    const calls = this.find(N.FunctionCall, true);
    for (const { name, args } of calls) {
      switch (name) {
        case 'outCoord':
          // this become an input variable
          break;
        case 'sample':
        case 'sampleNearest':
        case 'sampleLinear':
          // these get turned into method calls on the src
          break;
        case 'atan':
          inUse[(args.length === 2) ? 'atan2' : 'atan'] = true;
          break;
        default:
          inUse[name] = true;
      }
    }

    // find matrix variables
    const variables = this.find([ N.FunctionDefinition, N.FunctionArgument, N.VariableDeclaration ], true);
    if (variables.some(v => /[234]x[234]$/.test(v.type))) {
      inUse['matrixMult'] = true;
    }

    const codeURL = new URL('../zig/functions.zig', import.meta.url);
    const code = readFileSync(fileURLToPath(codeURL), 'utf-8');
    const regExp = /pub (fn (\w+)[\s\S]*?\n})/g;
    let m;
    while (m = regExp.exec(code)) {
      // excluding "pub"
      const func = m[1], name = m[2];
      if (inUse[name]) {
        this.add(func);
        this.add(``);
      }
    }
  }

  addDefinedFunctions() {
    const defs = this.find(N.FunctionDefinition);
    for (const [ index, def ] of defs.entries()) {
      if (index > 0) {
        this.add(``);
      }
      this.addDefinedFunction(def);
    }
  }

  addDefinedFunction(def) {
    const { name, type, args, statements } = def;
    const scope = {};
    if (name === 'evaluatePixel') {
      this.add(`pub fn ${name}(self: @This(), outCoord: @Vector(2, f32)) @Vector(4, f32) {`)
      this.add(`// input variables`);
      const parameters = this.find(N.Parameter);
      for (const { name, type } of parameters) {
        this.add(`const ${name} = self.${name};`);
        scope[name] = type;
      }
      const inputs = this.find(N.InputDeclaration);
      for (const { name, type } of inputs) {
        this.add(`const ${name} = self.${name};`);
        scope[name] = type;
      }
      this.add(``);
      const outputs = this.find(N.OutputDeclaration);
      this.add(`// output variable`);
      for (const { name, type } of outputs) {
        this.add(`var ${name}: ${this.type(type)} = undefined;`);
        scope[name] = type;
      }
      this.add(``);
    } else {
      const argList = args.map(a => `${a.name}: ${this.type(a.type)}`);
      this.add(`fn ${name}(${argList.join(', ')}) ${this.type(type)} {`);
    }
    this.addStatements(statements, scope);
    this.add('}');
  }

  addStatements(statements, scope) {
    for (const statement of statements) {
      this.addStatement(statement, scope);
    }
  }

  addStatement(statement, scope) {
    const fname = `add${statement.constructor.name}`;
    const f = this[fname];
    if (f) {
      f.call(this, statement, scope);
    } else {
      this.add(`[TODO: ${fname}];`);
      console.log(statement);
    }
  }

  addComment({ text }) {
    this.add(text);
  }

  addVariableDeclaration({ type, name, initializer }, scope) {
    const len = this.length(type);
    const valueR = this.translateExpression(initializer, len, scope);
    this.add(`var ${name}: ${this.type(type)} = ${valueR};`);
    scope[name] = type;
  }

  addVariableAssignment({ lvalue, expression }, scope) {
    const [ nameL, propL ] = lvalue.names;
    const typeL = this.varType(nameL, scope);
    const lenL = this.length(typeL);
    const valueR = this.translateExpression(expression, lenL, scope)
    if (propL) {
      const indicesL = this.indices(propL, lenL);
      if (indicesL.length > 1) {
        // use write mask
        const propR = expression.names?.[1];
        const indicesR = this.indices(propR, indicesL.length);
        const indicesM = [];
        for (let i = 0; i < lenL; i++) {
          if (indicesL.includes(i)) {
            // use rvalue
            indicesM.push(~indicesR[i]);
          } else {
            // keep lvalue
            indicesM.push(`${i}`);
          }
        }
        const mask = `.{ ${indicesM.join(', ') } }`;
        this.add(`${nameL} = @shuffle(${this.element(typeL)}, ${nameL}, ${valueR}, ${mask});`);
      } else {
        const [ index ] = indicesL;
        this.add(`${nameL}[${index}] = ${valueR};`);
      }
    } else {
      this.add(`${nameL} = ${valueR};`);
    }
  }

  addIfStatement({ condition, statements, elseClause }, scope) {
    scope = { ...scope };
    this.add(`if (${this.translateExpression(condition)}) {`);
    this.addStatements(statements, scope);
    if (elseClause) {
      this.add(`} else {`);
    }
    this.add(`}`);
  }

  varType(name, scope) {
    const type = scope[name];
    if (!type) {
      throw new Error(`Undefined variable: ${name}`);
    }
    return type;
  }

  translateExpression(expression, len, scope) {
    if (expression instanceof Object) {
      const fname = `translate${expression.constructor.name}`;
      const f = this[fname];
      if (f) {
        return f.call(this, expression, len, scope);
      } else {
        console.log(expression);
        return `[TODO: ${fname}]`;
      }
    } else {
      return `${expression}`;
    }
  }

  translateVariableAccess({ names }, len, scope) {
    const [ nameR, propR ] = names;
    if (propR) {
      const typeR = this.varType(nameR, scope);
      const lenR = this.length(typeR);
      const indicesR = this.indices(propR, lenR);
      if (len > indicesR.length) {
        // masking is done, just return the name
        return nameR;
      } else {
        if (len > 1) {
          const elements = [];
          for (const index of indicesR) {
            elements.push(`${nameR}[${index}]`);
          }
          return `.{ ${elements.join(', ')} }`;
        } else {
          const [ index ] = indicesR;
          return `${nameR}[${index}]`;
        }
      }
    } else {
      return nameR;
    }
  }

  translateFunctionCall({ name, args }, len, scope) {
    const argsTranslated = args.map(a => this.translateExpression(a));
    switch (name) {
      case 'outCoord':
        return `outCoord`;
      case 'sample':
        return translateFunctionCall({ name: 'sampleLinear', args }, len, scope);
      case 'sampleNearest':
      case 'sampleLinear':
        const [ src, arg ] = argsTranslated;
        return `${src}.${name}(${arg})`;
      default:
        return `${name}(${argsTranslated.join(', ')})`;
    }
  }

  addCreateFunction() {
    this.add(`
      fn create(inputStruct: anytype) Instance(@TypeOf(inputStruct)) {
        var instance: Instance(@TypeOf(inputStruct)) = undefined;
        inline for (std.meta.fields(@TypeOf(inputStruct))) |field| {
            @field(instance, field.name) = @field(inputStruct, field.name);
        }
        return instance;
      }
    `.trim());
  }
}

