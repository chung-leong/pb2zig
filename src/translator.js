import * as N from './nodes.js';

export class PixelBenderToZigTranslator {
  lines = [ '' ];
  indent = 0;
  ast = null;

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

  find(Class) {
    const list = [];
    const f = (node) => {
      if (node instanceof Array) {
        node.forEach(f);
      } else if (node instanceof Class) {
        list.push(node);
      } else if (node instanceof Object) {
        for (const n of Object.values(node)) {
          f(n);
        }
      }
    };
    f(this.ast);
    return list;
  }

  translate(ast) {
    this.ast = ast;
    this.addMetadata();
    this.addKernel();
    this.ast = null;
    return this.lines;
  }

  type(type) {
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
    };
    const zigType = table[type];
    if (!zigType) {
      throw new Error(`Unknown type: ${type}`);
    }
    return zigType;
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
    //this.addParameterFields();
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
    this.add(`const parameters = .{`);
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
        this.add(`.minValue = ${this.value(minValue, type)}`);
      }
      if (maxValue !== undefined) {
        this.add(`.maxValue = ${this.value(maxValue, type)}`);
      }
      if (stepInterval !== undefined) {
        this.add(`.stepInterval = ${this.value(stepInterval, type)}`);
      }
      if (defaultValue !== undefined) {
        this.add(`.defaultValue = ${this.value(defaultValue, type)}`);
      }
      if (previewValue !== undefined) {
        this.add(`.previewValue = ${this.value(previewValue, type)}`);
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
      const channels = parseInt(type.replace(/\D/g, ''));
      this.add(`${name} = .{ channels: ${channels} },`);
    }
    this.add('};');
  }

  addOutput() {
    const outputs = this.find(N.OutputDeclaration);
    this.add(`pub const output = .{`);
    for (const { name, type } of outputs) {
      const channels = parseInt(type.replace(/\D/g, ''));
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
    const calls = this.find(N.FunctionCall);
    console.log(calls);
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
