import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import * as N from './nodes.js';

export class PixelBenderToZigTranslator {
  lines = [];
  indent = 0;
  ast;
  macroASTs;
  scopeStack = [];
  functions = { ...builtInFunctions };
  variables = {};
  parameterVariables = {};
  inputVariables = {};
  outputVariables = {};
  dependentVariables = {};
  evaluatingDependents = false;
  variableAliases = [];

  translate(ast, macroASTs, options = {}) {
    const {
      kernelOnly = false,
    } = options;
    this.ast = ast;
    this.macroASTs = macroASTs;
    this.addHeading();
    this.addImports();
    this.addKernel();
    if (!kernelOnly) {
      this.addProcessFunctions();
    }
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

  walk(tree, cb, cbExit = null) {
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
          // call exit function if one is provided
          cbExit?.(node);
          return res;
        }
        // scan sub-nodes if callback doesn't return anything
        f(Object.values(node));
        cbExit?.(node);
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
    const { variables, functions } = this;
    this.scopeStack.push({ variables, functions });
    this.variables = { ...variables };
    this.functions = { ...functions };
  }

  endScope() {
    const { variables, functions } = this.scopeStack.pop();
    this.variables = variables;
    this.functions = functions;
  }

  addTempVariable(lvalue, value, aliasing = false) {
    let count = 1;
    let name;
    do {
      name = `tmp${count++}`;
    } while(this.variables[name]);
    this.variables[name] = value.type;
    this.add(`const ${name} = ${value};`);
    const tmp = new ZigExpr(name, value.type);
    if (aliasing) {
      this.variableAliases.unshift({ lvalue, tmp });
    }
    return tmp;
  }

  findTempVariable(lvalue) {
    if (!this.variableAliases) {
      return;
    }
    const list = this.variableAliases;
    this.variableAliases = null;
    const expr1 = this.translateExpression(lvalue);
    const entry = list.find(e => {
      const expr2 = this.translateExpression(e.lvalue);
      return (`${expr1}` === `${expr2}`);
    });
    this.variableAliases = list;
    return entry?.tmp;
  }

  convertMacro(name, argsGiven) {
    const macro = this.macroASTs.find(m => m.name === name);
    if (!macro || !macro.args) {
      return false;
    }
    const { args, expression } = macro;
    if (args?.length !== argsGiven?.length) {
      const s = (args.length > 1) ? 's' : '';
      throw new Error(`Macro ${name}() expects ${args.length} argument${s}, received ${argsGiven?.length}`);
    }
    // save the current scope stack and go back to the top-level
    this.startScope();
    const savedLines = this.lines;
    const savedStack = this.scopeStack;
    this.scopeStack = [];
    this.variables = savedStack[0].variables;
    this.functions = savedStack[0].functions;
    // capture lines being added
    const lines = this.lines = [];
    let expr;
    try {
      this.startScope();
      // use the types from the arguments given
      for (const [ index, name ] of args.entries()) {
        this.variables[name] = argsGiven[index].type;
      }
      expr = this.translateExpression(expression);
    } catch (err) {
      return false;
    } finally {
      this.endScope();
      this.scopeStack = savedStack;
      this.lines = savedLines;
      this.endScope();
    }
    if (args) {
      const argTypes = argsGiven.map(a => a.type);
      const argList = args.map((name, index) => {
        const typeZ = getZigType(argTypes[index]);
        return `${name}: ${typeZ}`;
      });
      const returnType = expr.type;
      const f = this.functions[name] = {
        type: 'macro',
        returnType,
        argTypes,
        overloaded: false,
        receiver: null,
      };
      const typeZ = getZigType(returnType);
      // save it and add it later
      f.lines = [
        `fn ${name}(${argList.join(', ')}) ${typeZ} {`,
        ...lines,
        `return ${expr};`,
        `}`,
      ];
      // make function appear in all the other scopes too
      for (const { functions } of savedStack) {
        functions[name] = f;
      }
    }
    return true;
  }

  expandMacro(name, argsGiven = null) {
    const macro = this.macroASTs.find(m => m.name === name);
    if (!macro || !macro.args !== !argsGiven) {
      return null;
    }
    const { args, expression } = macro;
    const argsByName = {};
    if (args) {
      if (args?.length !== argsGiven?.length) {
        const s = (args.length > 1) ? 's' : '';
        throw new Error(`Macro ${name}() expects ${args.length} argument${s}, received ${argsGiven?.length}`);
      }
      if (args) {
        for (const [ index, argName ] of args.entries()) {
          argsByName[argName] = argsGiven[index];
        }
      }
    }
    const clone = (object) => {
      if (Array.isArray(object)) {
        return object.map(clone);
      } else if (object && typeof(object) === 'object') {
        if (object instanceof N.VariableAccess) {
          const { name, property } = object;
          const arg = argsByName[name];
          if (arg) {
            if (property) {
              // access the prop of the argument
              return this.createExpression(N.VariableAccess, { name: arg.name, property });
            } else {
              return arg;
            }
          }
        }
        const copy = new object.constructor();
        for (const [ name, child ] of Object.entries(object)) {
          copy[name] = clone(child);
        }
        return copy;
      } else {
        return object;
      }
    };
    return clone(expression);
  }

  expandAssignmentOp({ lvalue, operator, rvalue }) {
    const expression = this.createExpression(N.ArithmeticOperation, {
      operator: operator.charAt(0),
      operand1: lvalue,
      operand2: rvalue,
    });
    return this.createExpression(N.AssignmentOperation, {
      operator: '=',
      lvalue,
      rvalue: expression,
    });
  }

  getReturnType(name, args) {
    const f = this.functions[name];
    if (!f) {
      throw new Error(`Undeclared function: ${name}()`);
    }
    const { argTypes, returnType, overloaded } = f;
    const types = args.map(a => a?.type);
    const findMismatch = (list) => types.findIndex((type, i) => type !== list[i]);
    if (overloaded) {
      for (const [ n, argTypesN ] of argTypes.entries()) {
        const index = findMismatch(argTypesN);
        if (index === -1) {
          return returnType[n];
        }
      }
      throw new Error(`${name}() does not accept these arguments: ${types.join(', ')}`);
    } else {
      const index = findMismatch(argTypes);
      if (index !== -1) {
        throw new Error(`${name}() expects argument ${index + 1} to be ${argTypes[index + 1]}, got ${types[index]}`);
      }
      return returnType;
    }
  }

  addImports() {
    this.add(`const std = @import("std");`);
    this.add(``);
  }

  addHeading() {
    const { name, meta } = this.ast;
    this.add(`// Pixel Bender "${name}" (translated using pb2zig)`);
  }

  addKernel() {
    this.add(`pub const kernel = struct {`);
    this.addGlobalConstants();
    this.addMetadata();
    this.addParameterDecls();
    this.addInputImages();
    this.addOutputImages();
    this.add(``);
    this.addInstanceFunction();
    this.add(``);
    this.addCreateFunction();
    this.add(`};`);
  }

  addGlobalConstants() {
    // convert macros without dependencies on unknown variables into constants
    let count = 0;
    for (const macro of this.macroASTs) {
      const { name, args, expression } = macro;
      if (!args) {
        try {
          const expr = this.translateExpression(expression);
          if (count === 0) {
            this.add(`// constants`);
          }
          this.add(`const ${name} = ${expr};`);
          this.variables[name] = expr.type;
          count++;
        } catch (err) {
          // if the expression uses variables not defined in the global
          // scope, it will fail and land here
        }
      }
    }
    if (count > 0) {
      this.add(``);
    }
  }

  addMetadata() {
    this.add(`// kernel information`);
    for (const [ field, literal ] of Object.entries(this.ast.meta)) {
      if (literal) {
        this.add(`pub const ${field} = ${this.translateExpression(literal)};`);
      }
    }
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
      this.parameterVariables[name] = type;
      const typeZ = getZigType(type);
      this.add(`.${param.name} = .{`);
      this.add(`.type = ${typeZ},`);
      if (minValue !== undefined) {
        this.add(`.minValue = ${this.translateExpression(minValue, 'comptime')},`);
      }
      if (maxValue !== undefined) {
        this.add(`.maxValue = ${this.translateExpression(maxValue, 'comptime')},`);
      }
      if (stepInterval !== undefined) {
        this.add(`.stepInterval = ${this.translateExpression(stepInterval, 'comptime')},`);
      }
      if (defaultValue !== undefined) {
        this.add(`.defaultValue = ${this.translateExpression(defaultValue, 'comptime')},`);
      }
      if (previewValue !== undefined) {
        this.add(`.previewValue = ${this.translateExpression(previewValue, 'comptime')},`);
      }
      for (const [ name, value ] of Object.entries(others)) {
        if (value) {
          this.add(`.${name} = ${this.translateExpression(value)},`);
        }
      }
      this.add(`},`);
    }
    this.add(`};`);
  }

  addInputImages() {
    const inputs = this.find(N.InputDeclaration);
    this.add(`pub const inputImages = .{`);
    for (const { name, type } of inputs) {
      const channels = getVectorWidth(type);
      this.add(`.${name} = .{ .channels = ${channels} },`);
      this.inputVariables[name] = type;
    }
    this.add('};');
  }

  addOutputImages() {
    const outputs = this.find(N.OutputDeclaration);
    this.add(`pub const outputImages = .{`);
    for (const { name, type } of outputs) {
      const channels = getVectorWidth(type);
      this.add(`.${name} = .{ .channels = ${channels} },`);
      this.outputVariables[name] = type;
    }
    this.add('};');
  }

  addInstanceFunction() {
    this.add(`// generic kernel instance type`);
    this.add(`fn Instance(comptime InputStruct: type, comptime OutputStruct: type) type {`);
    this.add(`return struct {`);
    this.addInputOutputFields();
    this.addDependentFields();
    this.addConstants();
    this.addDefinedFunctions();
    this.addMacroFunctions();
    this.addCalledFunctions();
    this.add(`};`);
    this.add(`}`);
  }

  addInputOutputFields() {
    this.add(`input: InputStruct,`);
    this.add(`output: OutputStruct,`);
    this.add(`outputCoord: @Vector(2, u32) = @splat(0),`);
    this.add(``);
    let count = 0;
    for (const [ name, type ] of Object.entries(this.outputVariables)) {
      const typeZ = getZigType(type);
      if (count++ === 0) {
        this.add(`// output pixel`);
      }
      this.add(`${name}: ${typeZ} = undefined,`);
    }
    if (count > 0) {
      this.add(``);
    }
  }

  addConstants() {
    // look for function definition so we don't scan into them
    const decls = this.find([ N.ConstantDeclaration, N.FunctionDefinition ]).filter(d => d instanceof N.ConstantDeclaration);
    if (decls.length > 0) {
      this.add(`// constants`);
      for (const decl of decls) {
        this.addStatement(decl);
      }
      this.add(``);
    }
  }

  addDependentFields() {
    // set the types of constants now in case array-dimensions involve constants
    const constDecls = this.find([ N.ConstantDeclaration, N.FunctionDefinition ]).filter(d => d instanceof N.ConstantDeclaration);
    for (const { name, type } of constDecls) {
      this.variables[name] = type;
    }
    const decls = this.find(N.DependentDeclaration);
    if (decls.length > 0) {
      this.add(`// dependent variables`);
      for (const decl of decls) {
        this.addStatement(decl);
      }
      this.add(``);
    }
  }

  addCreateFunction() {
    this.add(`// kernel instance creation function`);
    this.add(`
      pub fn create(input: anytype, output: anytype) Instance(@TypeOf(input), @TypeOf(output)) {
        return .{
          .input = input,
          .output = output,
        };
      }
    `.trim());
  }

  addProcessFunctions() {
    const codeURL = new URL('../zig/process.zig', import.meta.url);
    const content = readFileSync(fileURLToPath(codeURL), 'utf-8');
    const marker = '//---start of code';
    const index = content.indexOf(marker);
    const code = content.substring(index + marker.length);
    this.add(``);
    this.add(code);
  }

  addCalledFunctions() {
    // find function calls
    const inUse = {};
    const calls = this.find(N.FunctionCall, true);
    const [ ] = imageFunctions
    for (const { name, args } of calls) {
      // atan with two arguments is atan2
      const actualName = (name === 'atan' && args.length === 2) ? 'atan2' : name;
      inUse[actualName] = true;
    }

    // find matrix variables
    const decls = this.find([
      N.FunctionDefinition,
      N.FunctionArgument,
      N.VariableDeclaration,
      N.ConstantDeclaration,
      N.DependentDeclaration,
      N.Parameter,
    ], true);
    if (decls.some(v => isMatrix(v.type))) {
      inUse['MatrixCalcResult'] = true;
      inUse['matrixCalc'] = true;
    }

    let count = 0
    if (inUse.outCoord) {
      this.add(``);
      this.add(`
        // built-in Pixel Bender functions
        fn outCoord(self: *@This()) @Vector(2, f32) {
          const x = self.outputCoord[0];
          const y = self.outputCoord[1];
          return .{ @floatFromInt(x), @floatFromInt(y) };
        }
      `);
      count++;
    }

    // get functions from file
    const codeURL = new URL('../zig/functions.zig', import.meta.url);
    const code = readFileSync(fileURLToPath(codeURL), 'utf-8');
    const regExp = /pub (fn (\w+)[\s\S]*?\n})/g;
    let m;
    while (m = regExp.exec(code)) {
      // excluding "pub"
      const func = m[1], name = m[2];
      if (inUse[name]) {
        this.add(``);
        if (count === 0) {
          this.add(`// built-in Pixel Bender functions`);
        }
        this.add(func);
        count++;
      }
    }
  }

  findExternalReferences(args, statements) {
    const referenced = {};
    let variables = { ...this.variables };
    for (const arg of args) {
      variables[arg.name] = arg.type;
    }
    const scopeStack = [];
    const cb = (node) => {
      if (node instanceof N.VariableAccess) {
        const expanded = this.expandMacro(node.name);
        if (expanded) {
          this.walk(expanded, cb);
        } else {
          if (!variables[node.name]) {
            referenced[node.name] = true;
          }
        }
      } else if (node.statements) {
        scopeStack.push(variables);
        variables = { ...variables };
      } else if (node instanceof N.VariableDeclaration) {
        variables[node.name] = node.type;
      } else if (node instanceof N.FunctionCall) {
        const expanded = this.expandMacro(node.name, node.args);
        if (expanded) {
          this.walk(expanded, cb);
        }
      }
    };
    const cbExit = (node) => {
      if (node.statements) {
        variables = scopeStack.pop();
      }
    };
    this.walk(statements, cb, cbExit);
    return Object.keys(referenced);
  }

  addExternalReferences(names) {
    let count = 0;
    for (const name of names) {
      // variables outside a function's scope are either parameters,
      // global constants, or dependent variables
      let type;
      if (type = this.parameterVariables[name]) {
        this.add(`const ${name} = self.input.${name};`);
        this.variables[name] = type;
        count++;
      } else if (type = this.dependentVariables[name]) {
        if (!this.evaluatingDependents) {
          // place value in a const or it cannot be unintentionally changed
          this.add(`const ${name} = self.${name};`);
          this.variables[name] = type;
          count++;
        } else {
          // resolveVariable() should return self.[name] so the variable can be modified
        }
      } else {
        // the variable is either a reference to an input/output image or undefined
        // in any event, we don't need to deal with it here
      }
    }
    if (count > 0) {
      this.add(``);
    }
  }

  findFunctionCalls(statements) {
    const called = {};
    for (const { name } of this.find(N.FunctionCall)) {
      called[name] = true;
    }
    return Object.keys(called);
  }

  addDefinedFunctions() {
    const defs = this.find(N.FunctionDefinition);
    // set the function prototype first
    const calledBy = {};
    const publicMethods = [
      'evaluateDependents',
      'evaluatePixel',
    ];
    for (const { name, type, args, statements } of defs) {
      if (isUnsupported(type) || args.some(a => isUnsupported(a.type))) {
        continue;
      }
      const external = this.findExternalReferences(args, statements);
      const f = this.functions[name] = {
        type: 'user',
        returnType: type,
        argTypes: args.map(a => a.type),
        overloaded: false,
        receiver: (external.length > 0 || publicMethods.includes(name)) ? 'self' : null,
        external,
      };
      // note that this function is calling the other function
      for (const fname of this.findFunctionCalls(statements)) {
        const f = this.functions[fname];
        if (f?.type === 'user') {
          let list = calledBy[fname];
          if (!list) {
            list = calledBy[fname] = [];
          }
          list.push(name);
        } else if (f?.type === 'builtin') {
          // image functions requires self
          if (imageFunctions.includes(fname)) {
            f.receiver = 'self';
          }
        }
      }
    }
    // make sure calling functions have the self variable as well
    for (const { name } of defs) {
      const f = this.functions[name];
      if (f?.receiver === 'self') {
        const list = calledBy[name];
        if (list) {
          for (const fname of list) {
            const f2 = this.functions[name];
            f2.receiver = 'self';
          }
        }
      }
    }
    // add the actual code
    let count = 0;
    for (const { name, type, args, statements } of defs) {
      const f = this.functions[name];
      if (!f) {
        continue;
      }
      if (count++ === 0) {
        this.add(`// functions defined in kernel`);
      } else {
        this.add(``);
      }
      this.startScope();
      this.evaluatingDependents = name == 'evaluateDependents';
      // add arguments to scope
      for (const arg of args) {
        this.variables[arg.name] = arg.type;
      }
      const argList = args.map(a => `${a.name}: ${getZigType(a.type)}`);
      if (f.receiver === 'self') {
        // need self if the function access external variables
        argList.unshift(`self: *@This()`);
      }
      const prefix = publicMethods.includes(name) ? 'pub ' : '';
      this.add(`${prefix}fn ${name}(${argList.join(', ')}) ${getZigType(type)} {`);
      if (name === 'evaluatePixel') {
        for (const [ name, type ] of Object.entries(this.outputVariables)) {
          this.add(`self.${name} = @splat(0);`);
        }
      }
      this.addExternalReferences(f.external);
      this.addStatements(statements);
      if (name === 'evaluatePixel') {
        this.add(``);
        for (const [ name, type ] of Object.entries(this.outputVariables)) {
          this.add(`self.output.${name}.setPixel(self.outputCoord[0], self.outputCoord[1], self.${name});`);
        }
      }
      this.endScope();
      this.add('}');
    }
  }

  addMacroFunctions() {
    let count = 0;
    for (const [ name, f ] of Object.entries(this.functions)) {
      if (f.type !== 'macro') {
        continue;
      }
      const { lines } = f;
      this.add(``);
      if (count === 0) {
        this.add(`// macros`);
      }
      for (const line of lines) {
        this.add(line);
      }
      count++;
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

  addVariableDeclaration({ type, name, initializer }) {
    const valueR = (initializer) ? this.translateExpression(initializer, type) : 'undefined';
    this.add(`var ${name}: ${getZigType(type)} = ${valueR};`);
    this.variables[name] = type;
  }

  addConstantDeclaration({ type, name, initializer }) {
    const valueR = this.translateExpression(initializer, type);
    this.add(`const ${name}: ${getZigType(type)} = ${valueR};`);
    this.variables[name] = type;
  }

  addDependentDeclaration({ type, name, width }) {
    const typeZ = getZigType(type);
    if (width) {
      const widthExpr = this.translateExpression(width, 'int');
      this.add(`${name}: [${widthExpr}]${typeZ} = undefined,`)
      this.dependentVariables[name] = type + '[]';
    } else {
      this.add(`${name}: ${typeZ} = undefined,`)
      this.dependentVariables[name] = type;
    }
  }

  addExpressionStatement({ expression }) {
    const op = this.translateExpression(expression, 'void');
    if (op !== null) {
      this.add(`${op};`);
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

  addForStatement({ initializers, condition, incrementals, statements }) {
    const hasDecl = !!initializers.find(i => i instanceof N.VariableDeclaration);
    if (hasDecl) {
      // need to start a new code block
      this.add('{');
      this.startScope();
    }
    this.addStatements(initializers);
    const c = this.translateExpression(condition);
    this.add(`while (${c}) {`)
    this.startScope();
    this.addStatements(statements);
    this.addStatements(incrementals);
    this.endScope();
    this.add('}');
    if (hasDecl) {
      this.endScope();
      this.add('}');
    }
  }

  addWhileStatement({ condition, statements }) {
    const c = this.translateExpression(condition);
    this.add(`while (${c}) {`)
    this.startScope();
    this.addStatements(statements);
    this.endScope();
    this.add('}');
  }

  addDoWhileStatement({ condition, statements }) {
    const c = this.translateExpression(condition);
    this.add(`while (true) {`)
    this.startScope();
    this.addStatements(statements);
    this.add(`if (${c}) continue else break;`);
    this.endScope();
    this.add('}');
  }

  addBreakStatement() {
    this.add(`break;`);
  }

  addContinueStatement() {
    this.add(`continue;`);
  }

  addReturnStatement({ expression }) {
    const expr = this.translateExpression(expression);
    this.add(`return ${expr};`);
  }

  addEmptyStatement() {
  }

  createExpression(c, props) {
    const obj = new c;
    for (const [ name, value ] of Object.entries(props)) {
      obj[name] = value;
    }
    return obj;
  }

  translateExpression(expression, typeExpected) {
    const fname = `translate${expression.constructor.name}`;
    const f = this[fname];
    if (f) {
      return f.call(this, expression, typeExpected);
    } else {
      if (expression.constructor.name === 'ZigExpr') {
        throw new Error('Already translated');
      }
      console.log(expression);
      return new ZigExpr(`[TODO: ${fname}]`, 'bool');
    }
  }

  translateLiteral({ type, value }, typeExpected) {
    if (type == 'int' && typeExpected?.startsWith('float')) {
      type = getChildType(typeExpected);
    }
    return new ZigExpr(getZigLiteral(value, type), type);
  }

  resolveVariable(name) {
    let value, type;
    if (type = this.variables[name]) {
      value = new ZigExpr(name, type);
    } else {
      if (type = this.inputVariables[name]) {
        value = new ZigExpr(`self.input.${name}`, type);
      } else if (type = this.outputVariables[name]) {
        value = new ZigExpr(`self.${name}`, type);
      } else if (type = this.dependentVariables[name]) {
        value = new ZigExpr(`self.${name}`, type);
      } else {
        // expand the macro, since it wasn't possible to convert it to a variable
        const macro = this.expandMacro(name);
        if (macro) {
          value = this.translateExpression(macro);
        } else {
          throw new Error(`Undefined variable: ${name}`);
        }
      }
    }
    return value;
  }

  translateVariableAccess(expression) {
    const tmp = this.findTempVariable(expression);
    if (tmp) {
      return tmp;
    }
    const { name, property, element } = expression;
    let value = this.resolveVariable(name);
    if (property) {
      const indices = getSwizzleIndices(property);
      const typeS = getSwizzleType(value.type, indices);
      if (indices.length > 1) {
        const typeCZ = getChildZigType(typeS);
        const mask = `@Vector(${indices.length}, i32){ ${indices.join(', ') } }`;
        value = new ZigExpr(`@shuffle(${typeCZ}, ${value}, undefined, ${mask})`, typeS);
      } else {
        const [ index ] = indices;
        value = new ZigExpr(`${value}[${index}]`, typeS);
      }
    } else if (element) {
      const index = this.translateExpression(element);
      const typeC = getChildType(value.type);
      value = new ZigExpr(`${value}[${index}]`, typeC);
    }
    return value;
  }

  translateElementAccess({ expression, property, element }) {
    const value = this.translateExpression(expression);
    const { type } = value;
    if (property) {
      const indices = getSwizzleIndices(property);
      const typeS = getSwizzleType(type, indices);
      if (indices.length > 1) {
        const typeCZ = getChildZigType(typeS);
        const mask = `@Vector(${indices.length}, i32){ ${indices.join(', ') } }`;
        return new ZigExpr(`@shuffle(${typeCZ}, ${value}, undefined, ${mask})`, typeS);
      } else {
        const [ index ] = indices;
        return new ZigExpr(`${value}[${index}]`, typeS);
      }
    } else {
      const index = this.translateExpression(element);
      const typeC = getChildType(type);
      return new ZigExpr(`${value}[${index}]`, typeC);
    }
  }

  translateIncrementOperation({ operator, lvalue, post }, typeExpected) {
    let tmp;
    const value = this.translateExpression(lvalue, typeExpected);
    if (typeExpected !== 'void' && post) {
      // save copy of variable when it's postfix
      tmp = this.addTempVariable(lvalue, value);
    }
    const assignment = this.createExpression(N.AssignmentOperation, {
      lvalue,
      operator: operator.charAt(0) + '=',
      rvalue: this.createExpression(N.Literal, { value: 1, type: 'int' })
    });
    // don't use value from assignment operation
    this.translateExpression(assignment, 'void');
    if (typeExpected === 'void') {
      return null;
    }
    return tmp ?? value;
  }

  translateFunctionCall({ name, args }) {
    let argList = args.map(a => this.translateExpression(a));
    if (!this.functions[name]) {
      // try converting macro to a global function
      if (!this.convertMacro(name, argList)) {
        // probably 'cause it has local dependents--expand and evaluate instead
        const expanded = this.expandMacro(name, args);
        if (expanded) {
          return this.translateExpression(expanded);
        }
      }
    }
    if (name === 'outCoord') {
      return new ZigExpr(`self.outCoord()`, 'float2');
    } else if (name === 'sample') {
      name = 'sampleLinear';
    } else if (name === 'atan') {
      if (args.length === 2) {
        name = 'atan2';
      }
    }
    const type = this.getReturnType(name, argList);
    const f = this.functions[name];
    let recv = f.receiver;
    switch (name) {
      case 'sampleNearest':
      case 'sampleLinear':
      case 'pixelSize':
      case 'pixelAspectRatio':
        // functions called on images are translated as method calls
        recv = argList[0];
        argList = argList.slice(1);
        break;
    }
    if (recv) {
      name = `${recv}.${name}`;
    }
    return new ZigExpr(`${name}(${argList.join(', ')})`, type);
  }

  translateConstructorCall({ type, args }, typeExpected) {
    const argList = args.map(a => this.translateExpression(a));
    if (isMatrix(type)) {
      const typeV = getChildType(type);
      const width = getVectorWidth(typeV);
      const initializers = [];
      if (isVector(argList[0]?.type))  {
        initializers.push(...argList);
      } else if (argList.length === 1) {
        const arg = argList[0];
        arg.promote(typeV);
        for (let i = 0; i < width; i++) {
          initializers.push(arg);
        }
      } else {
        for (let i = 0, j = 0; i < width; i++, j += width) {
          const slice = argList.slice(j, j + width);
          initializers.push(`.{ ${slice.join(', ')} }`);
        }
      }
      const typeZ = getZigType(type);
      return new ZigExpr(`${typeZ}{\n${initializers.join(',\n')}\n}`, type);
    } else if (isVector(type)) {
      const typeC = getChildType(type);
      const width = getVectorWidth(type);
      argList.forEach(a => a.convert(typeC));
      if (typeExpected === 'comptime') {
        if (argList.length === 1) {
          while (argList.length < width) {
            argList.push(argList[0]);
          }
        }
        return new ZigExpr(`.{ ${argList.join(', ')} }`, type);
      } else {
        if (argList.length === 1) {
          const arg = argList[0];
          arg.promote(type);
          return arg;
        } else {
          const typeZ = getZigType(type);
          return new ZigExpr(`${typeZ}{ ${argList.join(', ')} }`, type);
        }
      }
    } else {
      const arg = argList[0];
      arg.convert(type);
      return arg;
    }
  }

  translateArithmeticOperation({ operator, operand1, operand2 }) {
    const opL = this.translateExpression(operand1);
    const opR = this.translateExpression(operand2);
    if (isMatrix(opL.type) || isMatrix(opR.type)) {
      // matrix math requires function calls
      let returnType;
      switch (operator) {
        case '+':
        case '-':
        case '/':
          returnType = opL.isMatrix() ? opL.type : opR.type;
          break;
        case '*':
          if (opL.isVector()) {
            returnType = opL.type;
          } else if (opR.isVector()) {
            returnType = opR.type;
          } else {
            returnType = opL.isMatrix() ? opL.type : opR.type;
          }
          break;
      }
      return new ZigExpr(`matrixCalc("${operator}", ${opL}, ${opR})`, returnType);
    }
    // promote scalar to vector
    if (opL.isScalar() && opR.isVector()) {
      opL.promote(opR.type);
    } else if (opL.isVector() && opR.isScalar()) {
      opR.promote(opL.type);
    }
    return new ZigExpr(`${opL} ${operator} ${opR}`, opL.type);
  }

  translateComparisonOperation({ operator, operand1, operand2 }) {
    switch (operator) {
      case '&&':
        operator = 'and';
        break;
      case '||':
        operator = 'or';
        break;
      case '^^':
        operator = '!=';
        break;
    };
    const opL = this.translateExpression(operand1);
    const opR = this.translateExpression(operand2);
    if (isMatrix(opL.type)) {
      // matrix comparison requires function calls
      return new ZigExpr(`matrixCalc("${operator}", ${opL}, ${opR})`, 'bool');
    } else if (isVector(opL.type)) {
      return new ZigExpr(`@reduce(.And, ${opL} ${operator} ${opR})`, 'bool');
    } else {
      return new ZigExpr(`${opL} ${operator} ${opR}`, 'bool');
    }
  }

  translateAssignmentOperation({ lvalue, operator, rvalue }, typeExpected) {
    const valueL = this.translateExpression(lvalue, typeExpected);
    const valueR = this.translateExpression(rvalue, valueL.type);
    if (operator.length === 2 && (valueL.isMatrix() || valueR.isMatrix())) {
      // matrix operation need to be expanded
      const assignment = this.expandAssignmentOp({ lvalue, operator, rvalue });
      return this.translateExpression(assignment, typeExpected);
    }
    valueR.promote(valueL.type);
    if (/@shuffle/.test(valueL)) {
      // valueL is not a valid lvalue, need to handle this separately
      if (operator.length === 2) {
        // += and friends--handle it as lvalue = lvalue + rvalue
        const assignment = this.expandAssignmentOp({ lvalue, operator, rvalue });
        return this.translateAssignmentOperation(assignment, typeExpected);
      }
      // need to assign to the full vector with a write mask, to keep the
      // unselected elements unchanged
      const variableL = this.resolveVariable(lvalue.name);
      // get the indices of the selected elements
      const indicesL = getSwizzleIndices(lvalue.property);
      let sourceR, indicesR;
      if (rvalue instanceof N.VariableAccess && rvalue.property) {
        // the right size is a property too, get the indices of its elements
        sourceR = this.resolveVariable(rvalue.name);
        indicesR = getSwizzleIndices(rvalue.property);
      } else {
        // use a list of sequential indices
        sourceR = valueR;
        indicesR = getVectorIndices(valueR.type);
      }
      // build the mask for @shuffle()
      const indicesM = [];
      const widthL = getVectorWidth(variableL.type);
      for (let i = 0; i < widthL; i++) {
        const j = indicesL.indexOf(i);
        if (j !== -1) {
          // use element from rvalue--index is negative
          indicesM.push(~indicesR[j]);
        } else {
          // keep element from lvalue
          indicesM.push(i);
        }
      }
      const mask = `@Vector(${indicesM.length}, i32){ ${indicesM.join(', ') } }`;
      const typeCZ = getChildZigType(variableL.type);
      // make the change (to the whole vector)
      this.add(`${variableL} = @shuffle(${typeCZ}, ${variableL}, ${sourceR}, ${mask});`);
    } else {
      // perform normally
      this.add(`${valueL} ${operator} ${valueR};`);
    }
    if (typeExpected === 'void') {
      // the expression's value is not being used
      return null;
    }
    // need to save the value to a temporary variable, since the lvalue
    // can get modified again
    return this.addTempVariable(lvalue, valueL, true);
  }

  translateSignOperation({ sign, operand }) {
    const op = this.translateExpression(operand);
    return (sign === '+') ? op : new ZigExpr(`-${op}`, op.type);
  }

  translateNotOperation({ operand }) {
    const op = this.translateExpression(operand);
    return new ZigExpr(`!${op}`, 'bool');
  }

  translateParentheses({ expression }) {
    const expr = this.translateExpression(expression);
    if (/^\w+$/.test(expr) || /^@as\([^)]*\)$/.test(expr)) {
      // don't need the parentheses
      return expr;
    }
    return new ZigExpr(`(${expr})`, expr.type);
  }

  translateConditional({ condition, onTrue, onFalse }) {
    const c = this.translateExpression(condition);
    const t = this.translateExpression(onTrue);
    const f = this.translateExpression(onFalse);
    const typeZ = getZigType(t.type);
    return new ZigExpr(`@as(${typeZ}, if (${c}) ${t} else ${f})`, t.type);
  }
}


export function translate(ast, macroASTs, options) {
  const translater = new PixelBenderToZigTranslator();
  return translater.translate(ast, macroASTs, options);
}

class ZigExpr {
  constructor(text, type) {
    this.text = text;
    this.type = type;
  }

  isVector() {
    return isVector(this.type);
  }

  isMatrix() {
    return isMatrix(this.type);
  }

  isScalar() {
    return !this.isMatrix() && !this.isVector();
  }

  promote(type) {
    if (this.type === type) {
      return;
    }
    if (isVector(type) && this.isScalar()) {
      this.convert(getChildType(type));
      const typeZ = getZigType(type);
      this.text = `@as(${typeZ}, @splat(${this.text}))`;
      this.type = type;
      return;
    } else {
      throw new Error(`Cannot convert ${this.type} to ${type}`);
    }
  }

  convert(type) {
    if (this.type !== type) {
      if (type === 'bool') {
        this.text = `(${this.text} != 0)`;
      } else if (this.type === 'bool') {
        this.text = `(if (${this.text}) 1 else 0)`;
      } else if (type === 'float') {
        const value = parseFloat(this.text);
        if (isNaN(value)) {
          const typeZ = getZigType(type);
          this.text = `@as(${typeZ}, @floatFromInt(${this.text}))`;
        } else {
          this.text = getZigLiteral(value, type);
        }
      } else if (type === 'int') {
        const value = parseInt(this.text);
        if (isNaN(value)) {
          const typeZ = getZigType(type);
          this.text = `@as(${typeZ}, @intFromFloat(${this.text}))`;
        } else {
          this.text = getZigLiteral(value, type);
        }
      }
    }
    this.type = type;
  }

  toString() {
    return this.text;
  }
}

function getZigType(type) {
  if (type === undefined) {
    return undefined;
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

    void: 'void',
  };
  const zigType = table[type];
  if (!zigType) {
    throw new Error(`Unknown type: ${type}`);
  }
  return zigType;
}

function getChildZigType(type) {
  return getZigType(getChildType(type));
}

function getChildType(type) {
  if (isMatrix(type)) {
    return type.slice(0, -2);
  } else if (isVector(type)) {
    return type.slice(0, -1);
  } else if (isArray(type)) {
    return type.slice(0, -2);
  } else {
    return type;
  }
}

function isVector(type) {
  return /^[_a-z]+\d$/i.test(type);
}

function isMatrix(type) {
  return /^[_a-z]+\dx\d$/i.test(type);
}

function isArray(type) {
  return /^[_a-z]+\[\]$/i.test(type);
}

function isUnsupported(type) {
  return [ 'region', 'imageRef' ].includes(type);
}

function getVectorWidth(type) {
  if (!isVector(type)) {
    throw new Error(`Not a vector: ${type}`);
  }
  return parseInt(type.slice(-1), '') || 1;
}

function getVectorIndices(type) {
  const width = getVectorWidth(type);
  const indices = [];
  for (let i = 0; i < width; i++) {
    indices.push(i);
  }
  return indices;
}

function getSwizzleIndices(prop) {
  const map = {
    r: 0, g: 1, b: 2, a: 3,
    x: 0, y: 1, z: 2, w: 3,
    s: 0, t: 1, p: 2, q: 3,
  };
  return [ ...prop ].map(c => map[c]);
}

function getSwizzleType(type, indices) {
  const typeE = type.slice(0, -1);
  return (indices.length === 1) ? typeE : typeE + indices.length;
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

const imageFunctions = [
  'sample',
  'sampleNearest',
  'sampleLinear',
  'pixelSize',
  'pixelAspectRatio',
];
const builtInFunctions = (() => {
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
  const fx__fx_fx_fx = [
    [ float, float, float, float ],
    [ float2, float2, float2, float2 ],
    [ float3, float3, float3, float3 ],
    [ float4, float4, float4, float4 ],
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
    [ float, image1, float2 ],
    [ float2, image2, float2 ],
    [ float3, image3, float2 ],
    [ float4, image4, float2 ],
  ];

  const signatures = {
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
    pow: fx__fx_fx,
    exp: fx__fx,
    exp2: fx__fx,
    log: fx__fx,
    log2: fx__fx,
    sqrt: fx__fx,
    inverseSqrt: fx__fx,
    abs: fx__fx,
    sign: fx__fx,
    floor: fx__fx,
    ceil: fx__fx,
    fract: fx__fx,
    mod: fx__fx_fx1,
    min: fx__fx_fx1,
    max: fx__fx_fx1,
    mod: fx__fx_fx1,
    step: fx__fx1_fx,
    clamp: [
      ...fx__fx_fx_fx,
      [ float2, float2, float, float ],
      [ float3, float3, float, float ],
      [ float4, float4, float, float ],
    ],
    mix: [
      ...fx__fx_fx_fx,
      [ float2, float2, float2, float ],
      [ float3, float3, float3, float ],
      [ float4, float4, float4, float ],
    ],
    smoothStep: [
      ...fx__fx_fx_fx,
      [ float2, float, float, float2 ],
      [ float3, float, float, float3 ],
      [ float4, float, float, float4 ],
    ],
    length: [
      [ float, float ],
      [ float, float2 ],
      [ float, float3 ],
      [ float, float4 ],
    ],
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
      [ float2, float ],
      [ float2, float2 ],
      [ float2, float3 ],
      [ float2, float4 ],
    ],
    pixelAspectRatio: [
      [ float, image1 ],
      [ float, image2 ],
      [ float, image3 ],
      [ float, image4 ],
      [ float, float ],
      [ float, float2 ],
      [ float, float3 ],
      [ float, float4 ],
    ],
  };
  const functions = {};
  for (const [ name, signature ] of Object.entries(signatures)) {
    const overloaded = Array.isArray(signature[0]);
    const returnType = (overloaded) ? signature.map(s => s[0]) : signature[0];
    const argTypes = (overloaded) ? signature.map(s => s.slice(1)) : signature.slice(1);
    functions[name] = {
      type: 'builtin',
      returnType,
      argTypes,
      overloaded,
      receiver: null,
    };
  }
  return functions;
})();
