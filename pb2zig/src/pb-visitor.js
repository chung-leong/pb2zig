import { BaseCstVisitor } from './pb-parser.js';
import * as PB from './pb-nodes.js';

export class PixelBenderAstVisitor extends BaseCstVisitor {
  constructor() {
    super();
    this.validateVisitor();
  }

  name(arr) {
    return arr[0].image;
  }

  anyName(ctx) {
    for (const node of Object.values(ctx)) {
      return this.name(node)
    }
  }

  visitAny(ctx) {
    for (const node of Object.values(ctx)) {
      return this.visit(node);
    }
  }

  pbk(ctx) {
    const tag = this.visit(ctx.tag);
    if (tag.languageVersion) {
      if (![ 1.0 ].includes(tag.languageVersion.value)) {
        throw new Error(`Unsupported Pixel Bender version: ${tag.languageVersion.value}`);
      }
    }
    const kernel = this.visit(ctx.kernel);
    return kernel ;
  }

  tag(ctx) {
    const attrs = {};
    for (const node of ctx.attribute) {
      let { name, value } = this.visit(node);
      if (name === 'displayname') {
        name = 'displayName';
      }
      attrs[name] = value;
    }
    return attrs;
  }

  attribute(ctx) {
    const name = this.name(ctx.Identifier);
    const value = this.visit(ctx.expression);
    return { name, value };
  }

  literalValue(ctx) {
    for (const [ name, node ] of Object.entries(ctx)) {
      let value = this.name(node);
      let type;
      switch (name) {
        case 'Number':
          type = /[\.e]/.test(value) ? 'float' : 'int';
          value = parseFloat(value);
          break;
        case 'QuotedStr':
          type = 'string'
          value = JSON.parse(value);
          break;
        case 'True':
          type = 'bool';
          value = true;
          break;
        case 'False':
          type = 'bool';
          value = true;
          break;
        case 'Null':
          value = null;
          break;
      }
      return PB.Literal.create({ type, value });
    }
  }

  literalConstructorCall(ctx) {
    const type = this.visit(ctx.type);
    const args = this.visit(ctx.literalList);
    return PB.LiteralConstructorCall.create({ type, args });
  }

  literalList(ctx) {
    return ctx.literalValue?.map(v => this.visit(v)) ?? [];
  }

  kernel(ctx) {
    const name = this.name(ctx.Identifier);
    const meta = PB.Meta.create(this.visit(ctx.tag));
    const statements = this.visit(ctx.kernelBody);
    return PB.Kernel.create({ name, meta, statements });
  }

  kernelBody(ctx) {
    return ctx.kernelStatement?.map(s => this.visit(s));
  }

  kernelStatement(ctx) {
    return this.visitAny(ctx);
  }

  parameterDeclaration(ctx) {
    const type = this.visit(ctx.type);
    const name = this.name(ctx.Identifier);
    const tag = this.visit(ctx.tag);
    return PB.Parameter.create({ type, name, ...tag });
  }

  type(ctx) {
    let type = this.anyName(ctx);
    if (type.startsWith('pixel')) {
      type = 'float';
      const width = type.slice(-1);
      if (width > 1) {
        type += width;
      }
    }
    return type;
  }

  inputDeclaration(ctx) {
    const type = this.name(ctx.Image);
    const name = this.name(ctx.Identifier);
    return PB.InputDeclaration.create({ type, name });
  }

  outputDeclaration(ctx) {
    let type;
    if (ctx.FloatVector) {
      type = this.name(ctx.FloatVector);
    } else {
      type = 'float';
      const width = this.name(ctx.Pixel).slice(-1);
      if (width > 1)  {
        type += width;
      }
    }
    const name = this.name(ctx.Identifier);
    return PB.OutputDeclaration.create({ type, name });
  }

  functionDeclaration(ctx) {
    const type = this.visit(ctx.returnType);
    const name = this.name(ctx.Identifier);
    const args = ctx.argumentDeclaration?.map(a => this.visit(a)) ?? [];
    const statements = this.visit(ctx.statementBlock);
    return PB.FunctionDefinition.create({ type, name, args, statements });
  }

  expressionMacroDeclaration(ctx) {
    const name = this.name(ctx.Identifier);
    const args = ctx.typelessArgumentDeclaration?.map(a => this.visit(a)) ?? null;
    const expression = this.visit(ctx.expression);
    return PB.MacroDefinition.create({ name, args, expression });
  }

  statementMacroDeclaration(ctx) {
    const name = this.name(ctx.Identifier);
    const args = ctx.typelessArgumentDeclaration?.map(a => this.visit(a)) ?? null;
    const statements = ctx.statement?.map(s => this.visit(s)).flat() ?? [];
    return PB.MacroDefinition.create({ name, args, statements });
  }

  returnType(ctx) {
    for (const [ name, node ] of Object.entries(ctx)) {
      switch (name) {
        case 'Void': return this.name(node);
        case 'type': return this.visit(node);
      }
    }
  }

  argumentDeclaration(ctx) {
    const direction = this.visit(ctx.argumentDirection) ?? 'in';
    const type = this.visit(ctx.type);
    const name = this.name(ctx.Identifier);
    return PB.FunctionArgument.create({ direction, type, name });
  }

  argumentDirection(ctx) {
    return this.anyName(ctx);
  }

  typelessArgumentDeclaration(ctx) {
    return this.name(ctx.Identifier);
  }

  statementBlock(ctx) {
    return ctx.statement?.map(s => this.visit(s)).flat() ?? [];
  }

  statement(ctx) {
    return this.visitAny(ctx);
  }

  variableDeclaration(ctx) {
    const type = this.visit(ctx.type);
    return ctx.identifierWithInit.map((i) => {
      const decl = this.visit(i);
      decl.type = type;
      return decl;
    });
  }

  constantDeclaration(ctx) {
    const type = this.visit(ctx.type);
    return ctx.identifierWithMandatoryInit.map((i) => {
      const decl = this.visit(i);
      decl.type = type;
      return decl;
    });
  }

  dependentDeclaration(ctx) {
    const type = this.visit(ctx.type);
    return ctx.identifierWithArrayLength.map((i) => {
      const decl = this.visit(i);
      decl.type = type;
      return decl;
    });
  }

  identifierWithArrayLength(ctx) {
    const name = this.name(ctx.Identifier);
    const width = this.visit(ctx.expression);
    return PB.DependentDeclaration.create({ name, width });
  }

  identifierWithInit(ctx) {
    const name = this.name(ctx.Identifier);
    const initializer = this.visit(ctx.expression);
    return PB.VariableDeclaration.create({ name, initializer });
  }

  identifierWithMandatoryInit(ctx) {
    const name = this.name(ctx.Identifier);
    const initializer = this.visit(ctx.expression);
    return PB.ConstantDeclaration.create({ name, initializer });
  }

  expression(ctx) {
    const expr = this.visit(ctx.ternaryOperation);
    if (ctx.assignmentOperator) {
      const operator = this.visit(ctx.assignmentOperator);
      const lvalue = expr;
      const rvalue = this.visit(ctx.expression);
      return PB.AssignmentOperation.create({ lvalue, operator, rvalue });
    } else {
      return expr;
    }
  }

  assignmentOperator(ctx) {
    return this.anyName(ctx);
  }

  ternaryOperation(ctx) {
    const expr = this.visit(ctx.binaryOperation);
    if (ctx.Question) {
      const condition = expr;
      const onTrue = this.visit(ctx.ternaryOperation[0]);
      const onFalse = this.visit(ctx.ternaryOperation[1]);
      return PB.Conditional.create({ condition, onTrue, onFalse });
    } else {
      return expr;
    }
  }

  binaryOperation(ctx) {
    const expr = this.visit(ctx.unaryOperation);
    let operator, type;
    if (ctx.arithmeticOperator) {
      operator = this.visit(ctx.arithmeticOperator);
      type = PB.ArithmeticOperation;
    } else if (ctx.comparisonOperator) {
      operator = this.visit(ctx.comparisonOperator);
      type = PB.ComparisonOperation;
    } else if (ctx.assignmentOperator) {
      operator = this.visit(ctx.assignmentOperator);
      type = PB.AssignmentOperation;
    } else {
      return expr;
    }
    const operand1 = expr;
    const operand2 = this.visit(ctx.binaryOperation);
    const exprL = type.create({ operand1, operator, operand2 });
    if (operand2 instanceof PB.BinaryOperation) {
      const exprR = operand2;
      const precedenceL = getPrecedence(exprL.operator);
      const precedenceR = getPrecedence(exprR.operator);
      if (precedenceL <= precedenceR) {
        // the left op has higher precedence (left-associtivity)
        // steal the operand from the right op and place the left op in its place
        exprL.operand2 = exprR.operand1;
        exprR.operand1 = exprL;
        return exprR;
      }
    }
    return exprL;
  }

  arithmeticOperator(ctx) {
    return this.anyName(ctx);
  }

  comparisonOperator(ctx) {
    return this.anyName(ctx);
  }

  assignmentOperator(ctx) {
    return this.anyName(ctx);
  }

  unaryOperation(ctx) {
    const expr = this.visit(ctx.nullaryOperation);
    if (ctx.Minus || ctx.Plus) {
      return PB.SignOperation.create({ sign: (ctx.Minus) ? '-' : '+', operand: expr });
    } else if (ctx.Exclam) {
      return PB.NotOperation.create({ operand: expr });
    } else {
      return expr;
    }
  }

  nullaryOperation(ctx) {
    const expr = this.visitAny(ctx);
    let property, index;
    if (ctx.property) {
      property = this.visit(ctx.property);
    } else if (ctx.element) {
      index = this.visit(ctx.element);
    }
    if (property || index) {
      return PB.ElementAccess.create({ expression: expr, property, index })
    } else {
      return expr;
    }
  }

  incrementPrefix(ctx) {
    const operator = this.visit(ctx.incrementOperator);
    const lvalue = this.visit(ctx.variable);
    return PB.IncrementOperation.create({ operator, post: false, lvalue });
  }

  incrementPostfix(ctx) {
    const lvalue = this.visit(ctx.variable);
    if (ctx.incrementOperator) {
      const operator = this.visit(ctx.incrementOperator);
      return PB.IncrementOperation.create({ operator, post: true, lvalue });
    } else {
      return lvalue;
    }
  }

  incrementOperator(ctx) {
    return this.anyName(ctx);
  }

  functionCall(ctx) {
    const name = this.name(ctx.Identifier);
    const args = this.visit(ctx.argumentList);
    return PB.FunctionCall.create({ name, args });
  }

  constructorCall(ctx) {
    const type = this.visit(ctx.type);
    const args = this.visit(ctx.argumentList);
    return PB.ConstructorCall.create({ type, args });
  }

  argumentList(ctx) {
    const args = [];
    if (ctx.expression) {
      for (const node of ctx.expression) {
        args.push(this.visit(node));
      }
    }
    return args;
  }

  variable(ctx) {
    const name = this.name(ctx.Identifier);
    let property, index;
    if (ctx.property) {
      property = this.visit(ctx.property);
    } else if (ctx.element) {
      index = this.visit(ctx.element);
    }
    return PB.VariableAccess.create({ name, property, index });
  }

  property(ctx) {
    return this.name(ctx.Identifier);
  }

  element(ctx) {
    return this.visit(ctx.expression);
  }

  parentheses(ctx) {
    const expression = this.visit(ctx.expression);
    return PB.Parentheses.create({ expression });
  }

  ifStatement(ctx) {
    const condition = this.visit(ctx.expression);
    const statements = arrayOf(this.visit(ctx.statement));
    const elseClause = (ctx.elseClause) ? this.visit(ctx.elseClause) : undefined;
    return PB.IfStatement.create({ condition, statements, elseClause });
  }

  elseClause(ctx) {
    const statements = arrayOf(this.visit(ctx.statement));
    return PB.IfStatement.create({ statements });
  }

  forStatement(ctx) {
    const initializers = this.visit(ctx.forInitializer);
    const condition = this.visit(ctx.forCondition);
    const incrementals = this.visit(ctx.forIncremental);
    const statements = arrayOf(this.visit(ctx.statement));
    return PB.ForStatement.create({ initializers, condition, incrementals, statements });
  }

  forInitializer(ctx) {
    if (ctx.variableDeclaration) {
      return this.visit(ctx.variableDeclaration);
    } else if (ctx.expressionStatement) {
      return [ this.visit(ctx.expressionStatement) ];
    } else {
      return [];
    }
  }

  forCondition(ctx) {
    if (ctx.expressionStatement) {
      const stmt = this.visit(ctx.expressionStatement)
      return stmt.expression;
    }
  }

  forIncremental(ctx) {
    return ctx.expression?.map(e => PB.ExpressionStatement.create({ expression: this.visit(e) })) ?? [];
  }

  whileStatement(ctx) {
    const condition = this.visit(ctx.expression);
    const statements = ctx.statement?.map(s => this.visit(s)) ?? [];
    return PB.WhileStatement.create({ condition, statements });
  }

  doWhileStatement(ctx) {
    const condition = this.visit(ctx.expression);
    const statements = ctx.statement?.map(s => this.visit(s)) ?? [];
    return PB.DoWhileStatement.create({ condition, statements });
  }

  continueStatement(ctx) {
    return PB.ContinueStatement.create({});
  }

  breakStatement(ctx) {
    return PB.BreakStatement.create({});
  }

  returnStatement(ctx) {
    const expression = (ctx.expression) ? this.visit(ctx.expression) : undefined;
    return PB.ReturnStatement.create({ expression });
  }

  expressionStatement(cxt) {
    const expression = this.visit(cxt.expression);
    return PB.ExpressionStatement.create({ expression });
  }

  emptyStatement(ctx) {
    return PB.EmptyStatement.create({});
  }
}

export const visitor = new PixelBenderAstVisitor();

export function process(cst, macroCSTs) {
  const ast = visitor.visit(cst);
  const macroASTs = macroCSTs.map(cst => visitor.visit(cst));
  return { ast, macroASTs };
}

function arrayOf(a) {
  return Array.isArray(a) ? a : [ a ];
}

function getPrecedence(operator) {
  switch (operator) {
    case '.': return 1;
    case '++':
    case '--': return 2;
    case '!':
    case '-': return 3;
    case '*':
    case '/': return 4;
    case '+':
    case '-': return 5;
    case '<':
    case '>':
    case '<=':
    case '>=': return 6;
    case '==':
    case '!=': return 7;
    case '&&': return 8;
    case '||': return 9;
    case '^^': return 10;
    case '||': return 11;
    case '=':
    case '+=':
    case '-=':
    case '*=':
    case '/=': return 12;
    case '?:': return 13;
  }
}
