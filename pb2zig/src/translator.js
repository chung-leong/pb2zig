import * as PB from './pb-nodes.js';
import * as ZIG from './zig-nodes.js';
import { walk, find, map } from './utils.js';

export class PixelBenderToZigTranslator {
  pbAST;
  pbMacroASTs;
  scopeStack = [];
  functions = map(builtInFunctions, (f) => { return { ...f } });
  variables = {};
  variableAliases = [];
  sideEffects = [];
  currentFunctionName;

  constructor(ast, macroASTs) {
    this.pbAST = ast;
    this.pbMacroASTs = macroASTs;
  }

  translate() {
    const heading = 'Pixel Bender "simple" (translated using pb2zig)';
    const statements = [
      this.createComment(heading),
      this.createImport('std'),
      this.createBlankLine(),
      this.translateKernel(),
    ];
    return ZIG.ModuleDefinition.create({ statements });
  }

  startScope() {
    const { variables, functions, currentFunctionName } = this;
    this.scopeStack.push({ variables, functions, currentFunctionName });
    this.variables = map(variables, (v) => { return { ...v, used: false } });
    this.functions = map(functions, (f) => { return { ...f, called: false } });
  }

  endScope() {
    const { variables, functions, currentFunctionName } = this.scopeStack.pop();
    this.variables = variables;
    this.functions = functions;
    this.currentFunctionName = currentFunctionName;
  }

  getScopeVariables() {
    const previous = this.scopeStack[this.scopeStack.length - 1];
    const set = {};
    for (const [ name, variable ] of Object.entries(this.variables)) {
      if (!previous.variables[name]) {
        set[name] = variable;
      }
    }
    return set;
  }

  getKernelVariables() {
    const set = {};
    for (const [ name, variable ] of Object.entries(this.variables)) {
      if (variable.scope !== 'local' && variable.scope !== 'global') {
        set[name] = variable;
      }
    }
    return set;
  }

  getCalledFunctions() {
    const set = {};
    for (const [ name, fn ] of Object.entries(this.functions)) {
      if (fn.called) {
        set[name] = fn;
      }
    }
    return set;
  }

  expandAssignmentOperation({ lvalue, operator, rvalue }) {
    const expression = PB.ArithmeticOperation.create({
      operator: operator.charAt(0),
      operand1: lvalue,
      operand2: rvalue,
    });
    return PB.AssignmentOperation.create({ operator: '=', lvalue, rvalue: expression });
  }

  createTempVariable(pb, initializer, aliasing = false) {
    let count = 1;
    let name;
    do {
      name = `tmp${count++}`;
    } while(this.variables[name]);
    const { type } = initializer;
    this.variables[name] = { type, scope: 'temp', mutable: false, pointer: false, used: true };
    this.sideEffects.push(ZIG.VariableDeclaration.create({ name, initializer, isConstant: true }));
    const tmp = ZIG.VariableAccess.create({ name, type });
    if (aliasing) {
      this.variableAliases.unshift({ pb, tmp });
    }
    return tmp;
  }

  findTempVariable(pb) {
    const json = JSON.stringify(pb);
    const entry = this.variableAliases.find(e => json === JSON.stringify(e.pb));
    return entry?.tmp;
  }

  createComment(text) {
    return ZIG.Comment.create({ text });
  }

  createImport(name) {
    return ZIG.VariableDeclaration.create({
      name,
      initializer: ZIG.FunctionCall.create({ name: '@import', args: [
        ZIG.Literal.create({ value: name, type: '[]const u8' }),
      ]})
    });
  }

  createBlankLine() {
    return ZIG.BlankLine.create();
  }

  createIgnoreStatement(expression) {
    return ZIG.AssignmentStatement.create({
      lvalue: '_',
      operator: '=',
      rvalue: expression,
    });
  }

  insertIgnoreStatements(statements) {
    const scopeVariables = this.getScopeVariables();
    for (const [ name, { used } ] of Object.entries(scopeVariables)) {
      if (!used) {
        const index = statements.findIndex(s => s instanceof ZIG.VariableDeclaration && s.name === name);
        if (index !== -1) {
          const value = ZIG.VariableAccess.create({ name });
          const ignore = this.createIgnoreStatement(value);
          statements.splice(index + 1, 0, ignore);
        }
      }
    }
    for (const [ index, statement ] of statements.entries()) {
      if (statement instanceof ZIG.ExpressionStatement) {
        const { expression } = statement;
        if (expression.type !== 'void') {
          const ignore = this.createIgnoreStatement(expression);
          statements[index] = ignore;
          console.log('ignore');
        }
      }
    }
  }

  forceType(expression) {
    const { type } = expression;
    if (expression instanceof ZIG.Literal && expression.isScalar()) {
      return ZIG.FunctionCall.create({ name: '@as', args: [ type, expression ], type });
    }
    return expression;
  }

  promoteExpression(expression, type, forceType = true) {
    if (expression.type === type) {
      return expression;
    }
    if (ZIG.isVector(type) && expression.isScalar()) {
      const splatCall = ZIG.FunctionCall.create({ name: '@splat', args: [ expression ], type });
      return (forceType) ? this.forceType(splatCall) : splatCall;
    } else {
      throw new Error(`Cannot convert ${expression.type} to ${type}`);
    }
  }

  getReturnType(name, args) {
    const f = this.functions[name];
    if (!f) {
      throw new Error(`No function by that name: ${name}`);
    }
    const { argTypes, returnType, overloaded } = f;
    const types = args.map(a => a?.type);
    const findMismatch = (list) => {
      return types.findIndex((type, i) => {
        let argType = list[i];
        if (argType.charAt(0) === '*') {
          argType = argType.slice(1);
        }
        type !== argTypes;
      });
    };
    if (overloaded) {
      for (const [ n, argTypesN ] of argTypes.entries()) {
        const index = findMismatch(argTypesN);
        if (index === -1) {
          return returnType[n];
        }
      }
      const pbTypes = types.map(t => this.translateType(t, 'zig'));
      throw new Error(`${name}() does not accept these arguments: ${pbTypes.join(', ')}`);
    } else {
      const index = findMismatch(argTypes);
      if (index !== -1) {
        const argTypeP = this.translateType(argTypes[index + 1], 'zig');
        const typeP = this.translateType(types[index], 'zig');
        throw new Error(`${name}() expects argument ${index + 1} to be ${argTypeP}, got ${typeP}`);
      }
      return returnType;
    }
  }

  convertMacro(name, argsGiven, typeExpected) {
    const macro = this.pbMacroASTs.find(m => m.name === name);
    if (!macro) {
      return false;
    }
    const { args = [], expression, statements = [] } = macro;
    if (args.length !== argsGiven.length) {
      const s = (args.length > 1) ? 's' : '';
      throw new Error(`Macro ${name}() expects ${args.length} argument${s}, received ${argsGiven.length}`);
    }
    // create statement from expression
    if (expression) {
      if (typeExpected === 'void') {
        statements.push(PB.ExpressionStatement.create({ expression }));
      } else {
        statements.push(PB.ReturnStatement.create({ expression }));
      }
    }
    // scan the tree and find arguments that's written to
    const isWriteTarget = {};
    walk(statements, (node) => {
      if (node instanceof PB.AssignmentOperation) {
        const { lvalue } = node;
        if (lvalue instanceof PB.VariableAccess) {
          isWriteTarget[lvalue.name] = true;
        }
      }
    });
    // use the types from the arguments given
    const argsP = args.map((name, index) => {
      const type = this.translateType(argsGiven[index].type, 'zig');
      const direction = (isWriteTarget[name]) ? 'inout' : 'in';
      return PB.FunctionArgument.create({ name, type, direction });
    });
    // save the current scope stack and go back to the top-level
    this.startScope();
    const savedStack = this.scopeStack;
    this.scopeStack = [];
    this.variables = savedStack[0].variables;
    this.functions = savedStack[0].functions;
    const f = this.functions[name];
    // construct function definition
    const pbDef = PB.FunctionDefinition.create({
      type: 'void',
      args: argsP,
      name,
      statements,
    });
    // try to translate it
    let definition;
    try {
      definition = f.definition = this.translateDefinedFunction(pbDef);
      const argTypes = definition.args.map(a => a.type);
      f.argTypes = argTypes;
      // look for return statement so we can set the return type
      const [ returnStmt ] = find(definition, ZIG.ReturnStatement);
      if (returnStmt) {
        f.returnType = definition.type = returnStmt.expression.type;
      } else {
        f.returnType = 'void';
      }
      f.argPointers = argTypes.map(t => t.startsWith('*'));
      console.log({ argTypes, p: f.argPointers });
      // update entries in all scopes
      for (const { functions } of savedStack) {
        const g = functions[name];
        g.argTypes = f.argTypes;
        g.argPointers = f.argPointers;
        g.returnType = f.returnType;
        g.definition = f.definition;
      }
      return true;
    } catch (err) {
      // can't be converted, probably due to references to undefined variables
      f.argTypes = false;
      return false;
    } finally {
      this.scopeStack = savedStack;
      this.endScope();
    }
  }

  translateType(type, from = 'pb') {
    if (type === undefined) {
      return undefined;
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

      image1: 'Image1',
      image2: 'Image2',
      image3: 'Image3',
      image4: 'Image4',

      pixel1: 'Image1',
      pixel2: 'Image2',
      pixel3: 'Image3',
      pixel4: 'Image4',

      string: '[]const u8',
      void: 'void',
    };
    if (from === 'pb') {
      const typeZ = table[type];
      if (!typeZ) {
        throw new Error(`Unknown type: ${type}`);
      }
      return typeZ;
    } else {
      for (const [ name, typeZ ] of Object.entries(table)) {
        if (typeZ === type) {
          return name;
        }
      }
    }
  }

  translateStatements(statements) {
    // translateStatement() can return an array
    return statements.map(s => this.translateStatement(s)).flat();
  }

  translateStatement(statement) {
    const fname = `translate${statement.constructor.name}`;
    const f = this[fname];
    if (f) {
      const result = f.call(this, statement);
      const { sideEffects } = this;
      if (sideEffects.length > 0) {
        this.sideEffects = [];
        this.variableAliases = [];
        // side effects come first
        return [ ...sideEffects, result ];
      } else {
        return result;
      }
    } else {
      console.log(statement);
      throw new Error(`TODO: ${fname}`);
    }
  }

  translateKernel() {
    const statements = [
      this.createComment('kernel information'),
      ...this.translateMetadata(),
      this.translateParameters(),
      this.translateInputs(),
      this.translateOutputs(),
      this.createBlankLine(),
      this.createComment(`generic kernel instance type`),
      this.createInstanceFunction(),
    ];
    return ZIG.VariableDeclaration.create({
      name: 'kernel',
      isPublic: true,
      isConstant: true,
      initializer: ZIG.StructDefinition.create({ statements }),
    });
  }

  translateMetadata() {
    const statements = [];
    for (const [ field, literal ] of Object.entries(this.pbAST.meta)) {
      if (literal) {
        statements.push(ZIG.VariableDeclaration.create({
          name: field,
          isPublic: true,
          isConstant: true,
          initializer: this.translateExpression(literal),
        }));
      }
    }
    return statements;
  }

  translateParameters() {
    const initializers = {};
    for (const pb of find(this.pbAST, PB.Parameter)) {
      const { name, type: pbType, ...others } = pb;
      const type = this.translateType(pbType);
      const attributes = { type };
      for (const [ aname, value ] of Object.entries(others)) {
        if (value) {
          attributes[aname] = this.translateExpression(value, 'comptime');
        }
      }
      initializers[name] = ZIG.StructLiteral.create({
        type: '.',
        initializers: attributes,
      });
      this.variables[name] = { type, scope: 'params', mutable: false, pointer: false, used: false };
    }
    return ZIG.VariableDeclaration.create({
      name: 'parameters',
      isPublic: true,
      isConstant: true,
      initializer: ZIG.StructLiteral.create({
        type: '.',
        initializers,
      }),
    });
  }

  translateInputs() {
    const initializers = {};
    for (const pb of find(this.pbAST, PB.InputDeclaration)) {
      const { name } = pb;
      const type = this.translateType(pb.type);
      const channels = ZIG.getVectorWidth(type);
      const attributes = { channels: ZIG.Literal.create({ value: channels, type: 'u32' }) };
      initializers[name] = ZIG.StructLiteral.create({
        type: '.',
        initializers: attributes,
      });
      this.variables[name] = { type, scope: 'input', mutable: false, pointer: false, used: false };
    }
    return ZIG.VariableDeclaration.create({
      name: 'inputImages',
      isPublic: true,
      isConstant: true,
      initializer: ZIG.StructLiteral.create({
        type: '.',
        initializers,
      }),
    });
  }

  translateOutputs() {
    const initializers = {};
    for (const pb of find(this.pbAST, PB.OutputDeclaration)) {
      const { name } = pb;
      const type = this.translateType(pb.type);
      const channels = ZIG.getVectorWidth(type);
      const attributes = { channels: ZIG.Literal.create({ value: channels, type: 'u32' }) };
      initializers[name] = ZIG.StructLiteral.create({
        type: '.',
        initializers: attributes,
      });
      this.variables[name] = { type, scope: 'output', mutable: false, pointer: false, used: false };
    }
    return ZIG.VariableDeclaration.create({
      name: 'outputImages',
      isPublic: true,
      isConstant: true,
      initializer: ZIG.StructLiteral.create({
        type: '.',
        initializers,
      }),
    });
  }

  createInstanceFunction() {
    const args = [
      ZIG.FunctionArgument.create({ isComptime: true, name: 'InputStruct', type: 'type' }),
      ZIG.FunctionArgument.create({ isComptime: true, name: 'OutputStruct', type: 'type' }),
      ZIG.FunctionArgument.create({ isComptime: true, name: 'ParameterStruct', type: 'type' }),
    ];
    const expression = this.translateKernelInstance();
    return ZIG.FunctionDefinition.create({
      type: 'type',
      name: 'Instance',
      args,
      statements: [ ZIG.ReturnStatement.create({ expression }) ],
    });
  }

  translateKernelInstance() {
    // set the types of constants now in case array-dimensions involve constants
    const constantDecls = this.translateConstantDeclarations();
    const statements = [
      ...this.translateInputOutputFields(),
      ...this.translateDependentFields(),
      ...constantDecls,
      ...this.translateDefinedFunctions(),
    ];
    return ZIG.StructDefinition.create({ statements });
  }

  translateInputOutputFields() {
    const statements = [
      ZIG.FieldDeclaration.create({ name: 'params', type: 'ParameterStruct' }),
      ZIG.FieldDeclaration.create({ name: 'input', type: 'InputStruct' }),
      ZIG.FieldDeclaration.create({ name: 'output', type: 'OutputStruct' }),
      ZIG.FieldDeclaration.create({
        name: 'outputCoord',
        type: '@Vector(2, u32)',
        defaultValue: this.promoteExpression(ZIG.Literal.create({ value: 0, type: 'u32' }), '@Vector(2, u32)', false),
      }),
      this.createBlankLine(),
    ];
    let count = 0;
    for (const [ name, { type, scope } ] of Object.entries(this.variables)) {
      if (scope === 'output') {
        if (count++ === 0) {
          statements.push(this.createComment(`output pixel`));
        }
        statements.push(ZIG.FieldDeclaration.create({ name, type, defaultValue: 'undefined' }));
      }
    }
    if (count > 0) {
      statements.push(this.createBlankLine());
    }
    return statements;
  }

  translateDependentFields() {
    const decls = find(this.pbAST, PB.DependentDeclaration);
    if (decls.length === 0) {
      return [];
    }
    return [
      this.createComment(`dependent variables`),
      ...this.translateStatements(decls),
      this.createBlankLine(),
    ];
  }

  translateConstantDeclarations() {
    // look for function definition so we don't scan into them
    const decls = find(this.pbAST, [ PB.ConstantDeclaration, PB.FunctionDefinition ]).filter((node) => {
      return node instanceof PB.ConstantDeclaration;
    });
    if (decls.length === 0) {
      return [];
    }
    for (const pb of decls) {
      const { name } = pb;
      const type = this.translateType(pb.type);
      this.variables[name] = { type, scope: 'global', mutable: false, pointer: false, used: false };
    }
    return [
      this.createComment(`constants`),
      ...this.translateStatements(decls),
      this.createBlankLine(),
    ];
  }

  translateDefinedFunctions() {
    const defs = find(this.pbAST, PB.FunctionDefinition);
    if (defs.length === 0) {
      return [];
    }
    // set the function prototype first
    for (const pb of defs) {
      if (PB.isUnsupported(pb.type) || pb.args.some(pb => PB.isUnsupported(pb.type))) {
        continue;
      }
      const type = this.translateType(pb.type);
      const argTypes = pb.args.map(pba => this.translateType(pba.type));
      const argPointers = pb.args.map(pba => pba.direction.includes('out'));
      this.functions[pb.name] = {
        type: 'user',
        returnType: type,
        argTypes,
        argPointers,
        overloaded: false,
        receiver: undefined,  // don't know yet
        called: false,
        callees: [],
      };
    }
    // assume that we can convert macros to functions
    for (const pb of this.pbMacroASTs) {
      if (this.variables[pb.name]) {
        // converted to a constant
        continue;
      }
      this.functions[pb.name] = {
        type: 'macro',
        returnType: undefined,
        argTypes: undefined,   // don't know yet--wait for call
        argPointers: undefined,
        overloaded: false,
        receiver: undefined,
        called: false,
        callees: [],
      };
    }
    // translate the functions
    const definitions = {};
    const statements = [];
    const callerLists = {};
    let count = 0;
    for (const pb of defs) {
      const f = this.functions[pb.name];
      if (!f) {
        continue;
      }
      if (count++ === 0) {
        statements.push(this.createComment(`functions defined in kernel`));
      } else {
        statements.push(this.createBlankLine());
      }
      const definition = this.translateDefinedFunction(pb);
      statements.push(definition);
      definitions[pb.name] = definition;
      for (const cname of f.callees) {
        let list = callerLists[cname];
        if (!list) {
          list = callerLists[cname] = [];
        }
        list.push(pb.name);
      }
    }
    // at this point only the functions that use kernel variables have self as the receiver
    const selfArg = ZIG.FunctionArgument.create({ name: 'self', type: '*This()' });
    const set = {};
    const setReceiver = (name) => {
      if (set[name]) {
         return;
      }
      const f = this.functions[name];
      if (!f.receiver) {
        definitions[name].receiver = selfArg;
        f.receiver = 'self';
      }
      set[name] = true;
      // make sure that functions calling this one receive self too
      const callers = callerLists[name];
      if (callers) {
        for (const cname of callers) {
          setReceiver(cname);
        }
      }
    };
    const names = Object.keys(callerLists).filter(n => !!this.functions[n].receiver);
    for (const name of names) {
      setReceiver(name);
    }
    // fix all call sites
    const calls = find(statements, ZIG.FunctionCall);
    const self = ZIG.VariableAccess.create({ name: 'self', type: '*This()' });
    for (const call of calls) {
      if (!call.receiver) {
        const f = this.functions[call.name];
        if (f?.receiver === 'self') {
          call.receiver = self;
        }
      }
    }
    // add converted macro
    const macros = Object.values(this.functions).filter(f => f.type === 'macro' && !!f.argTypes);
    if (macros.length > 0) {
      statements.push(this.createBlankLine());
      for (const [ index, macro ] of macros.entries()) {
        if (index === 0) {
          statements.push(this.createComment('macros'));
        } else {
          statements.push(this.createBlankLine());
        }
        statements.push(macro.definition);
      }
    }
    return statements;
  }

  translateDefinedFunction(pb) {
    const { name } = pb;
    const type = this.translateType(pb.type);
    const f = this.functions[name];
    this.startScope();
    this.currentFunctionName = name;
    // add arguments to scope
    for (const pba of pb.args) {
      const { name } = pba;
      const pointer = pba.direction.includes('out');
      const type = this.translateType(pba.type);
      this.variables[name] = { type, scope: 'local', mutable: !pointer, pointer, used: true };
    }
    const args = pb.args.map((pba) => {
      const { name } = pba;
      let type = this.translateType(pba.type);
      if (this.variables[name].pointer) {
        type = `*${type}`;
      }
      return ZIG.FunctionArgument.create({ name, type });
    });
    const statements = [];
    if (name === 'evaluatePixel') {
      for (const [ name, { scope, type } ] of Object.entries(this.variables)) {
        if (scope === 'output') {
          // clear output pixel
          const assignment = PB.AssignmentOperation.create({
            lvalue: this.resolveVariable(name),
            operator: 0,
            rvalue: PB.Literal.create({ value: 0, type: 'float' }),
          });
          const width = ZIG.getVectorWidth(type);
          const defaultValue =
          statements.push(ZIG.AssignmentStatement.create({
            lvalue: ZIG.VariableAccess.create({ name: `self.${name}` }),
            operator: '=',
            rvalue: this.promoteExpression(ZIG.Literal.create({ value: 0, type: 'f32' }), type, false),
          }));
        }
      }
      statements.push(this.createBlankLine());
    }
    statements.push(...this.translateStatements(pb.statements));
    if (name === 'evaluatePixel') {
      statements.push(this.createBlankLine())
      for (const [ name, { scope } ] of Object.entries(this.variables)) {
        if (scope === 'output') {
          // write output pixel
          statements.push(ZIG.FunctionCall.create({
            receiver: this.resolveVariable(name, 'Image'),
            name: 'setPixel',
            args: [
              ...[ 0, 1 ].map(value => ZIG.ElementAccess.create({
                expression: ZIG.VariableAccess.create({ name: `self.outCoord` }),
                index: ZIG.Literal.create({ value, type: 'u32 '})
              })),
              ZIG.VariableAccess.create({ name: `self.${name}` }),
            ]
          }))
        }
      }
    }
    // add references to fields in kernel instance
    const kernelVariables = this.getKernelVariables();
    let offset = 0, receiver;
    for (const [ name, { scope, used } ] of Object.entries(kernelVariables)) {
      if (used) {
        let qname;
        if (scope === 'params') {
          qname = `self.params.${name}`;
        } else if (scope === 'dependent') {
          if (this.currentFunctionName === 'evaluateDependents') {
            continue;
          }
          qname = `self.${name}`;
        } else if (scope === 'input') {
          qname = `self.input.${name}`;
        } else if (scope === 'output') {
          qname = `self.output.${name}`;
        }
        const initializer = ZIG.VariableAccess.create({ name: qname });
        const assignment = ZIG.VariableDeclaration.create({ name, initializer, isConstant: true });
        statements.splice(offset, 0, assignment);
        if (!receiver) {
          receiver = ZIG.FunctionArgument.create({ name: 'self', type: '*This()' });
          f.receiver = 'self';
        }
      }
    }
    this.insertIgnoreStatements(statements);
    const calledFunctions = this.getCalledFunctions();
    this.endScope();
    for (const name of Object.keys(calledFunctions)) {
      this.functions[name].called = true;
      f.callees.push(name);
    }
    const isPublic = publicMethods.includes(name);
    return ZIG.FunctionDefinition.create({ receiver, name, args, type, isPublic, statements });
  }

  translateVariableDeclaration(pb) {
    const { name } = pb;
    const type = this.translateType(pb.type);
    const initializer = this.translateExpression(pb.initializer, 'comptime');
    this.variables[name] = { type, scope: 'local', mutable: true, pointer: false, used: true };
    return ZIG.VariableDeclaration.create({ name, type, initializer });
  }

  translateConstantDeclaration(pb) {
    const { name } = pb;
    const type = this.translateType(pb.type);
    const initializer = this.translateExpression(pb.initializer);
    const scope = (this.currentContext) ? 'local' : 'global';
    this.variables[name] = { type, scope, mutable: false, pointer: false, used: false };
    return ZIG.VariableDeclaration.create({ name, initializer, isConstant: true });
  }

  translateDependentDeclaration(pb) {
    const { name } = pb;
    let type = this.translateType(pb.type);
    if (pb.width) {
      const width = this.translateExpression(pb.width, 'u32');
      type = ZIG.ArrayType.create({ width, childType: type })
    }
    this.variables[name] = { type, scope: 'dependent', mutable: true, pointer: false, used: false };
    return ZIG.FieldDeclaration.create({ name, type, defaultValue: 'undefined' })
  }

  translateExpressionStatement(pb) {
    const expression = this.translateExpression(pb.expression, 'void');
    return ZIG.ExpressionStatement.create({ expression });
  }

  translateIfStatement(pb) {
    const condition = this.translateExpression(pb.condition);
    const statements = this.translateStatements(pb.statements);
    const elseClause = (pb.elseClause) ? this.translateIfStatement(pb.elseClause) : null;
    return ZIG.IfStatement.create({ condition, statements, elseClause });
  }

  translateForStatement(pb) {
    const hasDeclarations = !!pb.initializers.find(i => i instanceof PB.VariableDeclaration);
    if (hasDeclarations) {
      // need to start a new code block
      this.startScope();
    }
    const initializers = this.translateStatements(pb.initializers);
    const condition = this.translateExpression(pb.condition);
    const statements = this.translateStatements(pb.statements);
    const increments = this.translateStatements(pb.incrementals);
    if (hasDeclarations) {
      this.endScope();
    }
    return ZIG.ForStatement.create({ initializers, condition, increments, statements, hasDeclarations });
  }

  translateWhileStatement(pb) {
    this.startScope();
    const condition = this.translateExpression(pb.condition);
    const statements = this.translateStatements(pb.statements);
    this.endScope();
    return ZIG.WhileStatement.create({ condition, statements })
  }

  translateDoWhileStatement(pb) {
    this.startScope();
    const condition = this.translateExpression(pb.condition);
    const statements = this.translateStatements(pb.statements);
    this.endScope();
    return ZIG.DoWhileStatement.create({ condition, statements })
  }

  translateBreakStatement() {
    return ZIG.BreakStatement.create({});
  }

  translateContinueStatement() {
    return ZIG.ContinueStatement.create({});
  }

  translateReturnStatement(pb) {
    const expression = this.translateExpression(pb.expression);
    return ZIG.ReturnStatement.create({ expression });
  }

  translateEmptyStatement() {
    return ZIG.EmptyStatement.create({});
  }

  translateExpression(expression, typeExpected) {
    const fname = `translate${expression.constructor.name}`;
    const f = this[fname];
    if (f) {
      return f.call(this, expression, typeExpected);
    } else {
      console.log(expression);
      throw new Error(`TODO: ${fname}`);
    }
  }

  translateLiteral(pb) {
    const type = this.translateType(pb.type);
    return ZIG.Literal.create({ value: pb.value, type });
  }

  resolveVariable(name, typeExpected = undefined) {
    const variable = this.variables[name];
    if (!variable) {
      // maybe it's a macro--expand it and translate its expression
      // if it were possible to convert it to a variable, we would have found it
      const expanded = this.expandMacro(name);
      if (expanded) {
        return this.translateExpression(expanded);
      } else {
        throw new Error(`Undefined variable: ${name}`);
      }
    }
    const { type, scope, pointer } = variable;
    if (scope === 'local') {
      if (pointer) {
        name = `${name}.*`;
      }
    } else if (scope === 'dependent') {
      if (this.currentFunctionName === 'evaluateDependents') {
        // can't use a copy
        name = `self.${name}`;
      }
    } else if (scope === 'output') {
      if (typeExpected !== 'Image') {
        // the active destination pixel
        name = `self.${name}`;
      }
    }
    variable.used = true;
    return ZIG.VariableAccess.create({ name, type });
  }

  translateIndex(pb) {
    const expression = this.translateExpression(pb);
    if (expression instanceof ZIG.Literal) {
      // a number
      return expression;
    }
    if (expression instanceof ZIG.VariableAccess) {
      const variable = this.variables[expression.name];
      if (variable.scope === 'global') {
        // a constant
        return expression;
      }
    }
    // need to use @intCast() on int
    return ZIG.FunctionCall.create({ name: '@intCast', args: [ expression ], type: 'u32' });
  }

  translateVariableAccess(pb, typeExpected) {
    if (typeExpected !== 'void') {
      const tmp = this.findTempVariable(pb);
      if (tmp) {
        return tmp;
      }
    }
    const value = this.resolveVariable(pb.name, typeExpected);
    if (pb.property) {
      const indices = PB.getSwizzleIndices(pb.property);
      if (indices.length > 1) {
        const type = ZIG.changeVectorWidth(value.type, indices.length);
        const mask = ZIG.TupleLiteral.create({
          type: `@Vector(${indices.length}, i32)`,
          initializers: indices.map(i => ZIG.Literal.create({ value: i, type: 'i32' })),
        });
        return ZIG.FunctionCall.create({ name: '@shuffle', args: [
          value.getChildType(),
          value,
          'undefined',
          mask,
        ], type });
      } else {
        const index = ZIG.Literal.create({ value: indices[0], type: 'u32' });
        const type = value.getChildType();
        return ZIG.ElementAccess.create({ expression: value, index, type });
      }
    } else if (pb.index) {
      const index = this.translateIndex(pb.index);
      const type = value.getChildType();
      return ZIG.ElementAccess.create({ expression: value, index, type });
    } else {
      return value;
    }
  }

  translateElementAccess(pb) {
    const expression = this.translateExpression(pb.expression);
    if (pb.property) {
      const indices = PB.getSwizzleIndices(pb.property);
      if (indices.length > 1) {
        const type = ZIG.changeVectorWidth(expression, indices.length);
        const mask = ZIG.TupleLiteral({
          type: `@Vector(${indices.length}, i32)`,
          initializers: indices.map(i => ZIG.Literal.create({ value: i, type: 'i32' })),
        });
        return ZIG.FunctionCall({ name: '@shuffle', args: [
          expression.getChildType(),
          expression,
          'undefined',
          mask,
        ], type });
      } else {
        const index = ZIG.Literal.create({ value: indices[0], type: 'u32' });
        const type = expression.getChildType();
        return ZIG.ElementAccess.create({ expression, index, type });
      }
    } else {
      const index = this.translateIndex(element);
      const type = expression.getChildType();
      return ZIG.ElementAccess.create({ expression, index, type });
    }
  }

  translateIncrementOperation(pb, typeExpected) {
    const lvalue = this.translateExpression(pb.lvalue, typeExpected);
    const typeP = this.translateType(lvalue.getScalarType(), 'zig');
    const assignment = PB.AssignmentOperation.create({
      lvalue: pb.lvalue,
      operator: pb.operator.charAt(0) + '=',
      rvalue: PB.Literal.create({ value: 1, type: typeP })
    });
    if (typeExpected !== 'void' && pb.post) {
      // save copy of variable when it's postfix and the return value is used
      const tmp = this.createTempVariable(pb.lvalue, lvalue);
      // don't use value from assignment operation
      this.translateExpression(assignment, 'void');
      return tmp;
    } else {
      return this.translateExpression(assignment, typeExpected);
    }
  }

  translateFunctionCall(pb, typeExpected) {
    let { name } = pb;
    let args = pb.args.map((a) => {
      // if it's an output image, make sure we get the reference to the image and not the pixel
      const typeExpected = imageFunctions.includes(name) ? 'Image' : undefined;
      return this.translateExpression(a, typeExpected);
    });
    const m = this.functions[name];
    if (m?.type === 'macro') {
      if (m.argTypes === undefined) {
        // use the arguments to set the converted function's argument types
        this.convertMacro(name, args, typeExpected);
      }
      if (m.argTypes === false) {
        // macro cannot be converted to a function, probably
        // 'cause it has local dependents--expand and evaluate instead
        const expanded = this.expandMacro(name, pb.args);
        if (expanded) {
          return this.translateExpression(expanded);
        }
      }
    }
    if (name === 'sample') {
      name = 'sampleNearest';
    } else if (name === 'atan' && args.length === 2) {
      name = 'atan2';
    }
    const f = this.functions[name];
    if (!f) {
      throw new Error(`Undeclared function: ${name}()`);
    }
    const type = this.getReturnType(name, args);
    if (f.overloaded) {
      // ensure that we don't pass a comptime_int or comptime_float as the
      // argument from which the return type is obtained
      if (f.returnTypeSource !== undefined) {
        args[f.returnTypeSource] = this.forceType(args[f.returnTypeSource]);
      }
    }
    let receiver;
    if (imageFunctions.includes(name)) {
      // functions called on images are translated as method calls
      receiver = args[0];
      args = args.slice(1);
    }
    args = args.map((arg, index) => {
      if (f.argPointers[index]) {
        // pass pointers when arguments are out or inout
        return ZIG.UnaryOperation.create({ operator: '&', operand: arg, type: `*${arg.type}` });
      }
      return arg;
    });
    f.called = true;
    return ZIG.FunctionCall.create({ receiver, name, args, type });
  }

  translateConstructorCall(pb, typeExpected) {
    const args = pb.args.map(a => this.translateExpression(a));
    const type = this.translateType(pb.type);
    if (ZIG.isMatrix(type)) {
      const typeV = ZIG.getChildType(type);
      const width = ZIG.getVectorWidth(typeV);
      const initializers = [];
      if (args[0].isVector())  {
        initializers.push(...argList);
      } else if (args.length === 1) {
        let arg = args[0];
        arg = this.promoteExpression(arg, typeV);
        for (let i = 0; i < width; i++) {
          initializers.push(arg);
        }
      } else {
        for (let i = 0, j = 0; i < width; i++, j += width) {
          const slice = args.slice(j, j + width);
          initializers.push(ZIG.TupleLiteral.create({ initializers: slice, type: '.'}));
        }
      }
      return ZIG.TupleLiteral.create({ initializers, type });
    } else if (ZIG.isVector(type)) {
      if (args.length === 1) {
        return this.promoteExpression(args[0], typeV);
      } else {
        return ZIG.TupleLiteral.create({
          initializers: args,
          type: (typeExpected === 'comptime') ? '.' : type
        });
      }
    } else {
      return args[0];
    }
  }

  translateArithmeticOperation(pb) {
    let operand1 = this.translateExpression(pb.operand1);
    let operand2 = this.translateExpression(pb.operand2);
    const { operator } = pb;
    if (operand1.isMatrix() || operand2.isMatrix()) {
      // matrix math requires function calls
      const symbols = [ operand1, operand2 ].map((operand) => {
        if (operand.isMatrix()) {
          return 'M';
        } else if (operand.isVector()) {
          return 'V';
        } else if (operand.isScalar()) {
          return 'S';
        }
      });
      const name = `@"${symbols.join(` ${operator} `)}"`;
      const args = [ operand1, operand2 ];
      const type = this.getReturnType(name, args);
      return ZIG.FunctionCall.create({ name, args, type });
    }
    // promote scalar to vector
    if (operand1.isScalar() && operand2.isVector()) {
      operand1 = this.promoteExpression(operand1, operand2.type);
    } else if (operand1.isVector() && operand2.isScalar()) {
      operand2 = this.promoteExpression(operand2, operand1.type);
    }
    const { type } = operand1;
    return ZIG.BinaryOperation.create({ operand1, operator, operand2, type });
  }

  translateComparisonOperation(pb) {
    let { operator } = pb;
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
    const operand1 = this.translateExpression(pb.operand1);
    const operand2 = this.translateExpression(pb.operand2);
    if (operand1.isMatrix()) {
      if (!operand2.isMatrix()) {
        throw new Error('Invalid matrix comparison');
      }
      // matrix comparison requires function calls
      return ZIG.FunctionCall.create({ name: `@"M ${operator} M"`, args: [ operand1, operand2 ]});
    } else if (operand1.isVector()) {
      if (!operand1.isVector()) {
        throw new Error('Invalid vector comparison');
      }
      // vector comparisons yield vector of bool, need to reduce them
      return ZIG.FunctionCall.create({ name: `@reduce`, args: [
        '.And',
        ZIG.BinaryOperation.create({ operand1, operator, operand2 }),
      ]});
    } else {
      return ZIG.BinaryOperation.create({ operand1, operator, operand2 });
    }
  }

  translateAssignmentOperation(pb, typeExpected) {
    let lvalue = this.translateExpression(pb.lvalue, 'void');
    let rvalue = this.translateExpression(pb.rvalue, lvalue.type);
    const { operator } = pb;
    if (operator.length === 2 && (lvalue.isMatrix() || rvalue.isMatrix())) {
      // matrix operation need to be expanded
      const assignment = this.expandAssignmentOperation(pb);
      return this.translateAssignmentOperation(assignment, typeExpected);
    }
    rvalue = this.promoteExpression(rvalue, lvalue.type);
    if (lvalue instanceof ZIG.FunctionCall) {
      // valueL is not a valid lvalue, need to handle this separately
      if (operator.length === 2) {
        // += and friends--handle it as lvalue = lvalue + rvalue
        const assignment = this.expandAssignmentOperation(pb);
        return this.translateAssignmentOperation(assignment, typeExpected);
      }
      // need to assign to the full vector with a write mask, to keep the
      // unselected elements unchanged
      const variableL = this.resolveVariable(pb.lvalue.name);
      // get the indices of the selected elements
      const indicesL = PB.getSwizzleIndices(pb.lvalue.property);
      let sourceR, indicesR;
      if (pb.rvalue instanceof PB.VariableAccess && pb.rvalue.property) {
        // the right size is a property too, get the indices of its elements
        sourceR = this.resolveVariable(pb.rvalue.name);
        indicesR = PB.getSwizzleIndices(pb.rvalue.property);
      } else {
        // use a list of sequential indices
        sourceR = rvalue;
        indicesR = rvalue.getVectorIndices();
      }
      // build the mask for @shuffle()
      const indicesM = [];
      const widthL = ZIG.getVectorWidth(variableL.type);
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
      const mask = ZIG.TupleLiteral.create({
        type: `@Vector(${indicesM.length}, i32)`,
        initializers: indicesM.map(i => ZIG.Literal.create({ value: i, type: 'i32' })),
      });
      const shuffleCall = ZIG.FunctionCall.create({ name: '@shuffle', args: [
        variableL.getChildType(),
        variableL,
        sourceR,
        mask,
      ]})
      // make the change (to the whole vector)
      this.sideEffects.push(ZIG.AssignmentStatement.create({ lvalue: variableL, operator, rvalue: shuffleCall }));
    } else {
      // perform normally
      this.sideEffects.push(ZIG.AssignmentStatement.create({ lvalue, operator, rvalue }));
    }
    if (typeExpected !== 'void') {
      // the expression's value is being used--need to save the value to a temporary variable
      // since the lvalue can get modified again prior to the expression being read
      return this.createTempVariable(pb.lvalue, lvalue, true);
    }
    if (typeExpected === 'void') {
      // don't return anything when nothing is expected
      return ZIG.Literal.create({ type: 'void' });
    }
    return lvalue;
  }

  translateSignOperation(pb) {
    const operand = this.translateExpression(pb.operand);
    const { sign } = pb;
    const { type } = operand;
    return (sign === '+') ? op : ZIG.UnaryOperation.create({ operator: sign, operand, type });
  }

  translateNotOperation(pb) {
    const operand = this.translateExpression(ob.operand);
    const { type } = operand;
    return ZIG.UnaryOperation.create({ operator: '!', operand, type });
  }

  translateParentheses(pb) {
    const expression = this.translateExpression(pb.expression);
    if (expression instanceof ZIG.FunctionCall) {
      // don't need the parentheses
      return expression;
    }
    const { type } = expression;
    return ZIG.Parentheses.create({ expression, type });
  }

  translateConditional(pb) {
    const condition = this.translateExpression(pb.condition);
    const onTrue = this.translateExpression(pb.onTrue);
    const onFalse = this.translateExpression(pb.onFalse);
    const { type } = onTrue;
    return ZIG.Conditional.create({ condition, onTrue, onFalse, type });
  }
}

const publicMethods = [ 'evaluateDependents', 'evaluatePixel' ];
const imageFunctions = [
  'sample',
  'sampleNearest',
  'sampleLinear',
  'pixelSize',
  'pixelAspectRatio',
];
const builtInFunctions = (() => {
  const bool = 'bool';
  const bool2 = '@Vector(2, bool)';
  const bool3 = '@Vector(3, bool)';
  const bool4 = '@Vector(4, bool)';
  const int = 'i32';
  const int2 = '@Vector(2, i32)';
  const int3 = '@Vector(3, i32)';
  const int4 = '@Vector(4, i32)';
  const float = 'f32';
  const float2 = '@Vector(2, f32)';
  const float3 = '@Vector(3, f32)';
  const float4 = '@Vector(4, f32)';
  const float2x2 = '[2]@Vector(2, f32)';
  const float3x3 = '[3]@Vector(3, f32)';
  const float4x4 = '[4]@Vector(4, f32)';
  const image1 = 'Image1';
  const image2 = 'Image2';
  const image3 = 'Image3';
  const image4 = 'Image4';

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
      [ float, float ],
      [ float, float2 ],
      [ float, float3 ],
      [ float, float4 ],
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
    // matrix functions
    '@"M * M"': [
      [ float2x2, float2x2, float2x2 ],
      [ float3x3, float3x3, float3x3 ],
      [ float4x4, float4x4, float4x4 ],
    ],
    '@"V * M"': [
      [ float2, float2, float2x2 ],
      [ float3, float3, float3x3 ],
      [ float4, float4, float4x4 ],
    ],
    '@"M * V"': [
      [ float2, float2x2, float2 ],
      [ float3, float3x3, float3 ],
      [ float4, float4x4, float ],
    ],
    '@"M * S"': [
      [ float2x2, float2x2, float ],
      [ float3x3, float3x3, float ],
      [ float4x4, float4x4, float ],
    ],
    '@"S * M"': [
      [ float2x2, float, float2x2 ],
      [ float3x3, float, float3x3 ],
      [ float4x4, float, float4x4 ],
    ],
    '@"M + M"': [
      [ float2x2, float2x2, float2x2 ],
      [ float3x3, float3x3, float3x3 ],
      [ float4x4, float4x4, float4x4 ],
    ],
    '@"M + S"': [
      [ float2x2, float2x2, float ],
      [ float3x3, float3x3, float ],
      [ float4x4, float4x4, float ],
    ],
    '@"M + M"': [
      [ float2x2, float, float2x2 ],
      [ float3x3, float, float3x3 ],
      [ float4x4, float, float4x4 ],
    ],
    '@"M - M"': [
      [ float2x2, float2x2, float2x2 ],
      [ float3x3, float3x3, float3x3 ],
      [ float4x4, float4x4, float4x4 ],
    ],
    '@"M - S"': [
      [ float2x2, float2x2, float ],
      [ float3x3, float3x3, float ],
      [ float4x4, float4x4, float ],
    ],
    '@"S - M"': [
      [ float2x2, float, float2x2 ],
      [ float3x3, float, float3x3 ],
      [ float4x4, float, float4x4 ],
    ],
    '@"M / M"': [
      [ float2x2, float2x2, float2x2 ],
      [ float3x3, float3x3, float3x3 ],
      [ float4x4, float4x4, float4x4 ],
    ],
    '@"M / S"': [
      [ float2x2, float2x2, float ],
      [ float3x3, float3x3, float ],
      [ float4x4, float4x4, float ],
    ],
    '@"S / M"': [
      [ float2x2, float, float2x2 ],
      [ float3x3, float, float3x3 ],
      [ float4x4, float, float4x4 ],
    ],
    '@"M == M"': [
      [ bool, float2x2, float2x2 ],
      [ bool, float3x3, float3x3 ],
      [ bool, float4x4, float4x4 ],
    ],
    '@"M != M"': [
      [ bool, float2x2, float2x2 ],
      [ bool, float3x3, float3x3 ],
      [ bool, float4x4, float4x4 ],
    ],
  };
  const returnTypeSources = {
    // most overloaded functions get the return type from the first argument
    // only the ones below get it from the second argument
    step: 1,
    '@"M * V"': 1,
    '@"S * M"': 1,
    '@"S + M"': 1,
    '@"S - M"': 1,
    '@"S / M"': 1,
  };
  return map(signatures, (signature, name) => {
    const overloaded = Array.isArray(signature[0]);
    const returnType = (overloaded) ? signature.map(s => s[0]) : signature[0];
    const argTypes = (overloaded) ? signature.map(s => s.slice(1)) : signature.slice(1);
    const argPointers = argTypes.map(a => false);
    let receiver = null;
    if (name === 'outCoord') {
      receiver = 'self';
    } else if (imageFunctions.includes(name)) {
      receiver = 'image';
    }
    let returnTypeSource;
    if (overloaded && !imageFunctions.includes(name)) {
      returnTypeSource = returnTypeSources[name] ?? 0;
    }
    return {
      type: 'builtin',
      returnType,
      returnTypeSource,
      argTypes,
      argPointers,
      overloaded,
      receiver,
      called: false,
    };
  });
})();

export function translate(ast, macroASTs, options) {
  const translater = new PixelBenderToZigTranslator(ast, macroASTs);
  return translater.translate();
}
