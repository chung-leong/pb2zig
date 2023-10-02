import * as PB from './pb-nodes.js';
import * as ZIG from './zig-noides.js';

export class PixelBenderToZigTranslator {
  pbAST;
  pbMacroASTs;
  zigAST = [];
  scopeStack = [];
  functions = { ...builtInFunctions };
  variables = {};
  variableAliases = [];
  currentFunction = null;

  constructor(ast, macroASTs) {
    this.pbAST = ast;
    this.pbMacroASTs = macroASTs;
  }

  translate() {
    this.addImports();
    return this.zigAST;
  }

  startScope() {
    const { variables, currentFunction } = this;
    this.scopeStack.push({ variables, currentFunction });
    this.variables = { ...variables };
  }

  endScope() {
    const variablesBefore = this.variables;
    const functionBefore = this.currentFunction;
    const { variables, currentFunction } = this.scopeStack.pop();
    for (const [ name, { unused } ] of Object.entries(variablesBefore)) {
      if (unused && variables[name]) {
        // it's only in the scope we're exiting
        const variable = this.resolveVariable(name);
        const ignore = this.createIgnoreStatement(variable);
        functionBefore.statements.push(ignore);
      }
    }
    this.variables = variables;
    this.currentFunction = currentFunction;
  }

  addImports() {
    for (const name of [ 'std' ]) {
      this.zigAST.push(ZIG.VariableDeclaration.create({
        name,
        initializer: ZIG.FunctionCall.create({ name: '@import', args: [
          ZIG.Literal.create({ value: name, type: '[]const u8' }),
        ]}),
      }));
    }
  }

  promoteExpression(expression, type) {
    if (expression.type === type) {
      return expression;
    }
    if (ZIG.isVector(type) && expression.isScalar()) {
      return ZIG.FunctionCall.create({ name: '@as', args: [
        type,
        ZIG.FunctionCall.create({ name: '@splat', args: [
          expression,
        ], type }),
      ], type });
    } else {
      throw new Error(`Cannot convert ${this.type} to ${type}`);
    }
  }

  createIgnoreStatement(expression) {
    return ZIG.AssignmentStatement.create({
      lvalue: '_',
      operator: '=',
      rvalue: expression,
    });
  }

  translateType(type) {
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
    const typeC = table[type];
    if (!typeC) {
      throw new Error(`Unknown type: ${type}`);
    }
    return typeC;
  }

  translateStatement(statement) {
    const fname = `translate${statement.constructor.name}`;
    const f = this[fname];
    if (f) {
      return f.call(this, statement);
    } else {
      console.log(`TODO: ${fname}`);
      console.log(statement);
    }
  }

  translateVariableDeclaration(pb) {
    const { name } = pb;
    const type = this.translateType(pb.type);
    const initializer = this.translateExpression(pb.initializer);
    this.variables[name] = { name, type, scope: 'local', mutable: true, pointer: false, unused: true };
    return ZIG.VariableDeclaration.create({ name, type, initializer });
  }

  translateConstantDeclaration(pb) {
    const { name } = pb;
    const initializer = this.translateExpression(pb.initializer);
    const scope = (this.currentFunction) ? 'local' : 'global';
    this.variables[name] = { name, type, scope, mutable: false, pointer: false, unused: false };
    return ZIG.VariableDeclaration.create({ name, initializer, isConstant: true });
  }

  translateDependentDeclaration(pb) {
    const { name } = pb;
    let type = this.translateType(pb.type);
    if (pb.width) {
      const dim = this.translateExpression(pb.width, 'u32');
      type = `[${dim}]${type}`;
    }
    this.variables[name] = { name, type, scope: 'kernel', mutable: true, pointer: false, unused: false };
    return ZIG.FieldDeclaration.create({ name, type })
  }

  translateExpressionStatement(pb) {
    const expression = this.translateExpression(pb.expression, 'void');
    return ZIG.ExpressionStatement({ expression });
  }

  translateIfStatement(pb) {
    let elsePrefix = '';
    const condition = this.translateExpression(pb.condition);
    const statements = this.translateStatements(pb.statements);
    const elseClause = (pb.elseClause) ? this.translateIfStatement(pb.elseClause) : null;
    return ZIG.IfStatement.create({ condition, statements, elseCaluse });
  }

  translateForStatement(pb) {
    const hasDeclarations = !!pb.initializers.find(i => i instanceof PB.VariableDeclaration);
    if (hasDeclarations) {
      // need to start a new code block
      this.startScope();
    }
    const initializers = this.translateStatement(pb.initializers);
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

  translateDoWhileStatement({ condition, statements }) {
    this.startScope();
    const condition = ZIG.Literal.create({ value: true, type: 'bool' });
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
      console.log(`TODO: ${fname}`);
      console.log(expression);
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
    if (scope === 'global') {
      // global constants can be accesse
    } if (scope === 'local') {
      if (pointer) {
        name = `${name}.*`;
      }
      variable.unused = false;
    } else if (scope === 'kernel') {
      name = `self.${name}`;
    } else if (scope === 'input') {
      name = `self.input.${name}`;
    } else if (scope === 'output') {
      if (typeExpected === 'image') {
        // the image itself
        name = `self.output.${name}`;
      } else {
        // the active pixel
        name = `self.${name}`;
      }
    }
    return ZIG.VariableAccess({ name, type });
  }

  translateIndex(pb) {
    const expression = this.translateExpression(pb);
    if (expression instanceof ZIG.Literal) {
      // a number
      return expr;
    }
    if (expression instanceof N.VariableAccess) {
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
      const indices = PB.getSwizzleIndices(property);
      if (indices.length > 1) {
        const type = ZIG.changeVectorWidth(value.type, indices.length);
        const mask = ZIG.TupleLiteral({
          type: `@Vector(${indices.length}, i32)`,
          initializers: indices.map(i => ZIG.Literal.create({ value: i, type: 'i32' })),
        });
        return ZIG.FunctionCall.create({ name: '@shuffle', args: [
          ZIG.getChildType(value.type),
          value,
          'undefined',
          mask,
        ], type });
      } else {
        const index = ZIG.Literal.create({ value: indices[0], type: 'u32' });
        const type = ZIG.getChildType(value.type);
        return ZIG.ElementAccess({ expression: value, index, type });
      }
    } else if (pb.index) {
      const index = this.translateIndex(pb.index);
      const typeC = getChildType(value.type);
      return ZIG.ElementAccess({ expression: value, index, type });
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
          ZIG.getChildType(expression.type),
          expression,
          'undefined',
          mask,
        ], type });
      } else {
        const index = ZIG.Literal.create({ value: indices[0], type: 'u32' });
        const type = ZIG.getChildType(expression.type);
        return ZIG.ElementAccess.create({ expression, index, type });
      }
    } else {
      const index = this.translateIndex(element);
      const type = ZIG.getChildType(expression.type);
      return ZIG.ElementAccess.create({ expression, index, type });
    }
  }

  translateIncrementOperation(pb, typeExpected) {
    let tmp;
    const lvalue = this.translateExpression(pb.lvalue, typeExpected);
    if (typeExpected !== 'void' && pb.post) {
      // save copy of variable when it's postfix
      tmp = this.createTempVariable(pb.lvalue, lvalue);
    }
    const assignment = PB.AssignmentOperation.create({
      lvalue: pb.lvalue,
      operator: operator.charAt(0) + '=',
      rvalue: PB.Literal.create({ value: 1, type: 'int' })
    });
    // don't use value from assignment operation
    const expression = this.translateExpression(assignment, 'void');
    if (typeExpected === 'void') {
      return expression;
    }
    return tmp ?? lvalue;
  }

  translateFunctionCall(pb, typeExpected) {
    let args = pb.args.map(a => this.translateExpression(a));
    let { name } = pb;
    const f = this.functions[name];
    if (f.type === 'macro') {
      if (f.argTypes === undefined) {
        // use the arguments to set the converted function's argument types
        this.convertMacro(name, args);
      }
      if (f.argTypes === false) {
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
    const type = this.getReturnType(name, args);
    if (f.overloaded) {
      // ensure that we don't pass a comptime_int or comptime_float as the
      // argument from which the return type is obtained
      if (f.returnTypeSource !== undefined) {
        argList[f.returnTypeSource] = this.ensureType(argList[f.returnTypeSource]);
      }
    }
    let receiver;
    if (imageFunctions.includes(name)) {
      // functions called on images are translated as method calls
      // if it's an output image, make sure we get the reference to the image and not the pixel
      receiver = this.translateExpression(pb.args[0], 'image');
      args = args.slice(1);
    }
    // pass pointers when arguments are out or inout
    args = args.map((arg, index) => (f.argPointers[index]) ? ZIG.AddressOf.create({ variable: arg }) : arg);
    const call = ZIG.FunctionCall.create({ receiver, name, args, type });
    if (type !== 'void' && typeExpected === 'void') {
      // can't ignore return value--assign it to _
      const ignore = this.createIgnoreStatement(call);
      return ZIG.SideEffectExpression.create({ statements: [ ignore ], type });
    }
    return call;
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
          initializers.push(`.{ ${slice.join(', ')} }`);
        }
      }
      return ZIG.TupleLiteral({ initializers, type });
    } else if (isVector(type)) {
      if (argList.length === 1) {
        return this.promoteExpression(args[0], typeV);
      } else {
        const anonymous = typeExpected === 'comptime';
        return ZIG.TupleLiteral({ anonymous, initializers, type })
      }
    } else {
      return args[0];
    }
  }

  translateArithmeticOperation(pb) {
    let operand1 = this.translateExpression(pb.operand1);
    let operand2 = this.translateExpression(pb.operand2);
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
    return ZIG.ArithmeticOperation.create({ operand1, operator, operand2, type });
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
      return ZIG.FunctionCall({ name: `@"M ${operator} M"`, args: [
        operand1,
        operand2,
        'bool',
      ]});
    } else if (operand1.isVector()) {
      if (!operand1.isVector()) {
        throw new Error('Invalid vector comparison');
      }
      // vector comparisons yield vector of bool, need to reduce them
      return ZIG.FunctionCall({ name: `@reduce`, args: [
        '.And',
        ZIG.ComparisonOperation.create({ operand1, operator, operand2 }),
      ]});
    } else {
      return ZIG.ComparisonOperation.create({ operand1, operator, operand2 });
    }
  }

  translateAssignmentOperation(pb, typeExpected) {
    // pass 'void' so that we don't get a tmp variable
    let lvalue = this.translateExpression(pb.lvalue, 'void');
    let rvalue = this.translateExpression(pb.rvalue, lvalue.type);
    const { operator } = pb;
    if (operator.length === 2 && (lvalue.isMatrix() || rvalue.isMatrix())) {
      // matrix operation need to be expanded
      const assignment = this.expandAssignmentOperation(pb);
      return this.translateAssignmentOperation(assignment, typeExpected);
    }
    rvalue = this.promoteExpression(rvalue, lvalue.type);
    let sideEffects;
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
      if (pb.rvalue instanceof N.VariableAccess && pb.rvalue.property) {
        // the right size is a property too, get the indices of its elements
        sourceR = this.resolveVariable(pb.rvalue.name);
        indicesR = PB.getSwizzleIndices(pb.rvalue.property);
      } else {
        // use a list of sequential indices
        sourceR = rvalue;
        indicesR = ZIG.getVectorIndices(rvalue.type);
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
      const mask = ZIG.StructLiteral({
        type: `@Vector(${indicesM.length}, i32)`,
        initializers: indicesM.map(i => ZIG.Literal.create({ value: i, type: 'i32' })),
      });
      const shuffleCall = ZIG.FunctionCall.create({ name: '@shuffle', args: [
        variableL.type,
        variableL,
        sourceR,
        mask,
      ]})
      // make the change (to the whole vector)
      sideEffects.push(ZIG.AssignmentState({ lvalue: variableL, operator, rvalue: shuffleCall }));
    } else {
      // perform normally
      sideEffects.push(ZIG.AssignmentStatement({ lvalue, operator, rvalue }));
    }
    if (typeExpected !== 'void') {
      // the expression's value is being used--need to save the value to a temporary variable
      // since the lvalue can get modified again prior to the expression being used
      sideEffects.push(this.createTempVariable(pb.lvalue, valueL, true));
    }
    const { type } = lvalue;
    return ZIG.SideEffectExpression({ sideEffects, type });
  }

  translateSignOperation(pb) {
    const operand = this.translateExpression(pb.operand);
    const { sign } = pb;
    const { type } = operand;
    return (sign === '+') ? op : ZIG.SignOperation({ sign, operand, type });
  }

  translateNotOperation(pb) {
    const operand = this.translateExpression(ob.operand);
    const { type } = operand;
    return ZIG.NotOperation.create({ operand, type });
  }

  translateParentheses(pb) {
    const expression = this.translateExpression(pb.expression);
    if (expression instanceof ZIG.FunctionCall) {
      // don't need the parentheses
      return expression;
    }
    const { type } = expression;
    return ZIG.Parenthese.create({ expression, type });
  }

  translateConditional(pb) {
    const condition = this.translateExpression(pb.condition);
    const onTrue = this.translateExpression(pb.onTrue);
    const onFalse = this.translateExpression(pb.onFalse);
    const { type } = onTrue;
    return ZIG.Conditional.create({ condition, onTrue, onFalse, type });
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
  const returnTypeSources = {
    // most overloaded functions get the return type from the first argument
    step: 1,
  };
  const functions = {};
  for (const [ name, signature ] of Object.entries(signatures)) {
    const overloaded = Array.isArray(signature[0]);
    const returnType = (overloaded) ? signature.map(s => s[0]) : signature[0];
    const argTypes = (overloaded) ? signature.map(s => s.slice(1)) : signature.slice(1);
    const argPointers = argTypes.map(a => false);
    functions[name] = {
      type: 'builtin',
      returnType,
      returnTypeSource: (overloaded) ? returnTypeSources[name] ?? 0 : undefined,
      argTypes,
      argPointers,
      overloaded,
      receiver: null,
    };
  }
  return functions;
})();

export function translate(ast, macroASTs, options) {
  const translater = new PixelBenderToZigTranslator(ast, macroASTs);
  return translater.translate();
}

function walk(tree, cb) {
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

function find(classes, recursive = false) {
  if (!Array.isArray(classes)) {
    classes = [ classes ];
  }
  const list = [];
  const asts = [ this.ast ];
  walk(ast, (node) => {
    if (classes.some(c => node instanceof c)) {
      list.push(node);
      if (!recursive) {
        return true;
      }
    }
  });
  return list;
}
