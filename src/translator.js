import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import * as N from './nodes.js';

export class PixelBenderToZigTranslator {
  lines = [ '' ];
  indent = 0;
  scopeStack = [];
  scope = null;
  functionArgTypes = { ...builtInfunctionArgTypes };
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

  startScope() {
    this.scopeStack.push(this.scope);
    this.scope = { ...this.scope };
  }

  endScope() {
    this.scope = this.scopeStack.pop();
  }

  setVariableType(name, type) {
    this.scope[name] = type;
  }

  getVariableType(name) {
    const type = this.scope[name];
    if (!type) {
      throw new Error(`Undefined variable: ${name}`);
    }
    return type;
  }

  setFunctionArgs(name, argTypes) {
    this.functionArgTypes[name] = argTypes;
  }

  getReturnValueType(name, args) {
    const argTypes = this.functionArgTypes[name];
    const overloaded = Array.isArray(argTypes[0]);
    const types = args.map(a => a.type);
    const findMismatch = (types) => types.findIndex((type, i) => type !== argTypes[i + 1]);
    if (overloaded) {
      for (const argTypesN of argTypes) {
        const index = findMismatch(argTypesN);
        if (index === -1) {
          return argTypes[0];
        }
      }
      throw new Error(`${name}(${types.join(', ')}) does not exists"`);
    } else {
      const index = args.findIndex((arg, i) => arg.type !== argTypes[i + 1]);
      throw new Error(`${name}() expects argument ${index + 1} to be ${argTypes[index + 1]}, got ${types[index]}`);
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
      this.add(`.type = ${getZigType(type)},`);
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
      const channels = getVectorWidth(type);
      this.add(`${name} = .{ channels: ${channels} },`);
    }
    this.add('};');
  }

  addOutput() {
    const outputs = this.find(N.OutputDeclaration);
    this.add(`pub const output = .{`);
    for (const { name, type } of outputs) {
      const channels = getVectorWidth(type);
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
      const type = getZigType(param.type);
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
    if (name === 'evaluatePixel') {
      this.add(`pub fn ${name}(self: @This(), outCoord: @Vector(2, f32)) @Vector(4, f32) {`)
      this.startScope();
      this.add(`// input variables`);
      const parameters = this.find(N.Parameter);
      for (const { name, type } of parameters) {
        this.add(`const ${name} = self.${name};`);
        this.setVariableType(name, type);
      }
      const inputs = this.find(N.InputDeclaration);
      for (const { name, type } of inputs) {
        this.add(`const ${name} = self.${name};`);
        this.setVariableType(name, type);
      }
      this.add(``);
      const outputs = this.find(N.OutputDeclaration);
      this.add(`// output variable`);
      for (const { name, type } of outputs) {
        this.add(`var ${name}: ${getZigType(type)} = undefined;`);
        this.setVariableType(name, type);
      }
      this.add(``);
    } else {
      const argList = args.map(a => `${a.name}: ${getZigType(a.type)}`);
      this.add(`fn ${name}(${argList.join(', ')}) ${getZigType(type)} {`);
    }
    this.addStatements(statements);
    this.endScope();
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
    const valueR = this.translateExpression(initializer, type, scope);
    this.add(`var ${name}: ${getZigType(type)} = ${valueR};`);
    scope[name] = type;
  }

  addVariableAssignment({ lvalue, expression }, scope) {
    const [ nameL, propL ] = lvalue.names;
    const typeL = getVariableType(nameL, scope);
    const lenL = getVectorWidth(typeL);
    const valueR = this.translateExpression(expression, lenL, scope)
    if (propL) {
      const indicesL = getVectorIndices(propL, lenL);
      if (indicesL.width > 1) {
        // use write mask
        const propR = expression.names?.[1];
        const indicesR = getVectorIndices(propR, indicesL.width);
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
        const czType = getChildZigType(typeL);
        this.add(`${nameL} = @shuffle(${czType}, ${nameL}, ${valueR}, ${mask});`);
      } else {
        const [ index ] = indicesL;
        this.add(`${nameL}[${index}] = ${valueR};`);
      }
    } else {
      this.add(`${nameL} = ${valueR};`);
    }
  }

  addIfStatement(stmt) {
    let elsePrefix = '';
    do {
      const { condition, statements, elseClause } = stmt;
      const line = (condition) ? `if (${this.translateExpression(condition)}) {` : `{`;
      this.add(elsePrefix + line);
      this.startScope();
      this.addStatements(statements);
      this.endScope();
      if (elseClause) {
        stmt = elseClause;
        elsePrefix = `} else `;
      } else {
        elsePrefix = ``;
      }
    } while (elsePrefix);
    this.add(`}`);
  }

  translateExpression(expression, typeExpected = undefined) {
    const fname = `translate${expression.constructor.name}`;
    const f = this[fname];
    if (f) {
      return f.call(this, expression, len, scope);
    } else {
      console.log(expression);
      return new Expression(`[TODO: ${fname}]`, 'bool');
    }
  }

  translateLiteral({ type, value }, typeExpected) {
    if (type == 'int' && typeExpected == 'float') {
      type = typeExpected;
    }
    return new Expression(getZigLiteral(value, type), type);
  }

  translateVariableAccess({ names }) {
    const [ nameR, propR ] = names;
    if (propR) {
      const typeR = getVariableType(nameR, scope);
      const widthR = getVectorWidth(typeR);
      const indicesR = getVectorIndices(propR, widthR);
      if (indicesR.length > 1) {
        const typeS = getSwizzleType(typeR, indicesR);
        const elements = [];
        for (const index of indicesR) {
          elements.push(`${nameR}[${index}]`);
        }
        return new Expression(`.{ ${elements.join(', ')} }`, typeS);
      } else {
        const [ index ] = indicesR;
        return new Expression(`${nameR}[${index}]`, 1);
      }
    } else {
      return nameR;
    }
  }

  translateFunctionCall({ name, args }) {
    const argList = args.map(a => this.translateExpression(a));
    const type = getReturnValueType(name, argList);
    switch (name) {
      case 'outCoord':
        return `outCoord`;
      case 'sample':
        return translateFunctionCall({ name: 'sampleLinear', args }, len, scope);
      case 'sampleNearest':
      case 'sampleLinear':
        return new Expression(`${argList[0]}.${name}(${argList[1]})`, type);
      default:
        return new Expression(`${name}(${argsTranslated.join(', ')})`, type);
    }
  }

  translateBinaryOperation({ operator, operand1, operand2 }, typeExpected) {

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

class Expression {
  constructor(text, type) {
    this.text = text;
    this.type = type;
  }

  toString() {
    return this.text;
  }
}

getZigType(type) {
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

function getChildZigType(type) {
  return getZigType(type.slice(0, -1));
}

function widthOf(type) {
  if (type === undefined) {
    return undefined;
  }
  return parseInt(type.slice(-1), '') || 1;
}

function getVectorIndices(prop, width) {
  if (prop) {
    const map = {
      r: 0, g: 1, b: 2, a: 3,
      x: 0, y: 1, z: 2, w: 3,
      s: 0, t: 1, p: 2, q: 3,
    };
    return [ ...prop ].map(c => map[c]);
  } else {
    const indices = [];
    for (let i = 0; i < width; i++) {
      indices.push(i);
    }
    return indices;
  }
}

function getSwizzleType(type, indices) {
  return type.slice(-1) + indices.length;
}

function getZigLiteral(value, type) {
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

const bool = 'bool';
const bool2 = 'bool2';
const bool3 = 'bool3';
const bool4 = 'bool4';
const int = 'int';
const int2 = 'int2';
const int3 = 'int3';
const int4 = 'int4';
const float = 'float';
const float2 = 'float2';
const float3 = 'float3';
const float4 = 'float4';
const float2x2 = 'float2x2';
const float3x3 = 'float3x3';
const float4x4 = 'float4x4';
const image1 = 'image1';
const image2 = 'image2';
const image3 = 'image3';
const image4 = 'image4';
const pixel1 = 'pixel1';
const pixel2 = 'pixel2';
const pixel3 = 'pixel3';
const pixel4 = 'pixel4';

const fx__fx = [
  [ float, float ],
  [ float2, float2 ],
  [ float3, float3 ],
  [ float4, float4 ],
];
const fx__fx_fx = [
  [ float, float, float ],
  [ float2, float2, float2 ],
  [ float3, float3, float3 ],
  [ float4, float4, float4 ],
];
const fx__fx_fx1 = [
  ...fx__fx_fx,
  [ float2, float2, float ],
  [ float3, float3, float ],
  [ float4, float4, float ],
];
const fx__fx1_fx = [
  ...fx__fx_fx,
  [ float2, float, float2 ],
  [ float3, float, float3 ],
  [ float4, float, float4 ],
];
const f__fx_fx = [
  [ float, float, float ],
  [ float, float2, float2 ],
  [ float, float3, float3 ],
  [ float, float4, float4 ],
];
const bv__ifv_ifv = [
  [ bool2, int2, int2 ],
  [ bool3, int3, int3 ],
  [ bool4, int4, int4 ],
  [ bool2, float2, float2 ],
  [ bool3, float3, float3 ],
  [ bool4, float4, float4 ],
];
const bv__bifv_bifv = [
  [ bool2, bool2, bool2 ],
  [ bool3, bool3, bool3 ],
  [ bool4, bool4, bool4 ],
  ...bv__ifv_ifv,
];
const b__bv = [
  [ bool, bool2 ],
  [ bool, bool3 ],
  [ bool, bool4 ],
];
const px__im_f2 = [
  [ pixel1, image1, float2 ],
  [ pixel2, image2, float2 ],
  [ pixel3, image3, float2 ],
  [ pixel4, image4, float2 ],
];

const builtInfunctionArgTypes = {
  outCoord: [ float2 ],
  radians: fx__fx,
  degrees: fx__fx,
  sin: fx__fx,
  cos: fx__fx,
  tan: fx__fx,
  asin: fx__fx,
  acos: fx__fx,
  atan: fx__fx,
  atan2: fx__fx_fx,
  fract: fx__fx,
  mod: fx__fx_fx1,
  min: fx__fx_fx1,
  max: fx__fx_fx1,
  mod: fx__fx_fx1,
  step: fx__fx1_fx,
  clamp: [
    ...fx__fx_float_X_fx,
    [ float2, float2, float, float ],
    [ float3, float3, float, float ],
    [ float4, float4, float, float ],
  ],
  min: [
    ...fx__fx_float_X_fx,
    [ float2, float2, float2, float ],
    [ float3, float3, float3, float ],
    [ float4, float4, float4, float ],
  ],
  smoothStep: [
    ...fx__fx_float_X_fx,
    [ float2, float, float, float2 ],
    [ float3, float, float, float3 ],
    [ float4, float, float, float4 ],
  ],
  length: fx__fx,
  distance: f__fx_fx,
  dot: f__fx_fx,
  cross: fx__fx_fx,
  normalize: fx__fx,
  matrixCompMult: [
    [ float2x2, float2x2, float2x2 ],
    [ float3x3, float3x3, float3x3 ],
    [ float4x4, float4x4, float4x4 ],
  ],
  lessThan: bv__ifv_ifv,
  lessThanEqual: bv__ifv_ifv,
  greaterThan: bv__ifv_ifv,
  greaterThanEqual: bv__ifv_ifv,
  equal: bv__bifv_bifv,
  notEqual: bv__bifv_bifv,
  any: b__bv,
  all: b__bv,
  not: [
    [ bool2, bool2 ],
    [ bool3, bool3 ],
    [ bool4, bool4 ],
  ],
  sampleLinear: px__im_f2,
  sampleNearest: px__im_f2,
  pixelSize: [
    [ float2, image1 ],
    [ float2, image2 ],
    [ float2, image3 ],
    [ float2, image4 ],
    [ float2, pixel1 ],
    [ float2, pixel2 ],
    [ float2, pixel3 ],
    [ float2, pixel4 ],
  ],
  pixelAspectRatio: [
    [ float, image1 ],
    [ float, image2 ],
    [ float, image3 ],
    [ float, image4 ],
    [ float, pixel1 ],
    [ float, pixel2 ],
    [ float, pixel3 ],
    [ float, pixel4 ],
  ],

}