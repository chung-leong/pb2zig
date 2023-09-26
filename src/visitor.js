import { BaseCstVisitor } from './parser.js';
import * as N from './nodes.js';

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

  create(c, props) {
    const obj = new c;
    for (const [ name, value ] of Object.entries(props)) {
      if (!obj.hasOwnProperty(name)) {
        console.warn(`${c.name} does not have the property "${name}"`);
      }
      obj[name] = value;
    }
    return obj;
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
      const { name, value } = this.visit(node);
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
      return this.create(N.Literal, { type, value });
    }
  }

  literalConstructorCall(ctx) {
    const type = this.visit(ctx.type);
    const args = this.visit(ctx.literalList);
    return this.create(N.LiteralConstructorCall, { type, args });
  }

  literalList(ctx) {
    const args = [];
    if (ctx.literalValue) {
      for (const node of ctx.literalValue) {
        args.push(this.visit(node));
      }
    }
    return args;
  }

  kernel(ctx) {
    const name = this.name(ctx.Identifier);
    const meta = this.create(N.Meta, this.visit(ctx.tag));
    const statements = this.visit(ctx.kernelBody);
    return this.create(N.Kernel, { name, meta, statements });
  }

  kernelBody(ctx) {
    const statements = [];
    if (ctx.kernelStatement) {
      for (const node of ctx.kernelStatement) {
        const s = this.visit(node);
        if (s) {
          statements.push(s);
        }
      }
    }
    return statements;
  }

  kernelStatement(ctx) {
    return this.visitAny(ctx);
  }

  parameterDeclaration(ctx) {
    const type = this.visit(ctx.type);
    const name = this.name(ctx.Identifier);
    const tag = this.visit(ctx.tag);
    return this.create(N.Parameter, { type, name, ...tag });
  }

  type(ctx) {
    let type = this.anyName(ctx);
    if (type.startsWith('pixel')) {
      type = 'float' + type.slice(-1);
    }
    return type;
  }

  inputDeclaration(ctx) {
    const type = this.name(ctx.Image);
    const name = this.name(ctx.Identifier);
    return this.create(N.InputDeclaration, { type, name });
  }

  outputDeclaration(ctx) {
    let type;
    if (ctx.FloatVector) {
      type = this.name(ctx.FloatVector);
    } else {
      type = 'float' + this.name(ctx.Pixel).slice(-1)
    }
    const name = this.name(ctx.Identifier);
    return this.create(N.OutputDeclaration, { type, name });
  }

  functionDeclaration(ctx) {
    const type = this.visit(ctx.returnType);
    const name = this.name(ctx.Identifier);
    const args = [];
    if (ctx.argumentDeclaration) {
      for (const a of ctx.argumentDeclaration) {
        args.push(this.visit(a));
      }
    }
    const statements = this.visit(ctx.statementBlock);
    return this.create(N.FunctionDefinition, { type, name, args, statements });
  }

  macroDeclaration(ctx) {
    const name = this.name(ctx.Identifier);
    let args = null;
    if (ctx.typelessArgumentDeclaration) {
      args = [];
      for (const a of ctx.typelessArgumentDeclaration) {
        args.push(this.visit(a));
      }
    }
    const expression = this.visit(ctx.expression);
    return this.create(N.MacroDefinition, { name, args, expression });
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
    const type = this.visit(ctx.type);
    const name = this.name(ctx.Identifier);
    return this.create(N.FunctionArgument, { type, name });
  }

  typelessArgumentDeclaration(ctx) {
    return this.name(ctx.Identifier);
  }

  statementBlock(ctx) {
    const statements = [];
    if (ctx.statement) {
      for (const node of ctx.statement) {
        const s = this.visit(node);
        if (s instanceof Array) {
          for (const i of s) {
            statements.push(i);
          }
        } else {
          statements.push(s);
        }
      }
    }
    return statements;
  }

  statement(ctx) {
    return this.visitAny(ctx);
  }

  variableDeclaration(ctx) {
    const type = this.visit(ctx.type);
    const list = [];
    for (const node of ctx.identifierWithInit) {
      const decl = this.visit(node);
      decl.type = type;
      list.push(decl);
    }
    return list;
  }

  constantDeclaration(ctx) {
    const type = this.visit(ctx.type);
    const list = [];
    for (const node of ctx.identifierWithMandatoryInit) {
      const decl = this.visit(node);
      decl.type = type;
      list.push(decl);
    }
    return list;
  }

  dependentDeclaration(ctx) {
    const type = this.visit(ctx.type);
    const list = [];
    for (const node of ctx.identifierWithArrayLength) {
      const decl = this.visit(node);
      decl.type = type;
      list.push(decl);
    }
    return list;
  }

  identifierWithArrayLength(ctx) {
    const name = this.name(ctx.Identifier);
    const width = this.visit(ctx.expression);
    return this.create(N.DependentDeclaration, { name, width });
  }

  identifierWithInit(ctx) {
    const name = this.name(ctx.Identifier);
    const initializer = this.visit(ctx.expression);
    return this.create(N.VariableDeclaration, { name, initializer });
  }

  identifierWithMandatoryInit(ctx) {
    const name = this.name(ctx.Identifier);
    const initializer = this.visit(ctx.expression);
    return this.create(N.ConstantDeclaration, { name, initializer });
  }

  expression(ctx) {
    const expr = this.visit(ctx.ternaryOperation);
    if (ctx.assignmentOperator) {
      const operator = this.visit(ctx.assignmentOperator);
      const lvalue = expr;
      const rvalue = this.visit(ctx.expression);
      return this.create(N.AssignmentOperation, { lvalue, operator, rvalue });
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
      return this.create(N.Conditional, { condition, onTrue, onFalse });
    } else {
      return expr;
    }
  }

  binaryOperation(ctx) {
    const expr = this.visit(ctx.unaryOperation);
    let operator, type;
    if (ctx.arithmeticOperator) {
      operator = this.visit(ctx.arithmeticOperator);
      type = N.ArithmeticOperation;
    } else if (ctx.comparisonOperator) {
      operator = this.visit(ctx.comparisonOperator);
      type = N.ComparisonOperation;
    } else if (ctx.assignmentOperator) {
      operator = this.visit(ctx.assignmentOperator);
      type = N.AssignmentOperation;
    } else {
      return expr;
    }
    const operand1 = expr;
    const operand2 = this.visit(ctx.binaryOperation);
    const exprL = this.create(type, { operand1, operator, operand2 });
    if (operand2 instanceof N.BinaryOperation) {
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
      return this.create(N.SignOperation, { sign: (ctx.Minus) ? '-' : '+', operand: expr });
    } else if (ctx.Exclam) {
      return this.create(N.NotOperation, { operand: expr });
    } else {
      return expr;
    }
  }

  nullaryOperation(ctx) {
    const expr = this.visitAny(ctx);
    let property, element;
    if (ctx.property) {
      property = this.visit(ctx.property);
    } else if (ctx.element) {
      element = this.visit(ctx.element);
    }
    if (property || element) {
      return this.create(N.ElementAccess, { expression: expr, property, element })
    } else {
      return expr;
    }
  }

  incrementPrefix(ctx) {
    const operator = this.visit(ctx.incrementOperator);
    const lvalue = this.visit(ctx.variable);
    return this.create(N.IncrementOperation, { operator, post: false, lvalue });
  }

  incrementPostfix(ctx) {
    const lvalue = this.visit(ctx.variable);
    if (ctx.incrementOperator) {
      const operator = this.visit(ctx.incrementOperator);
      return this.create(N.IncrementOperation, { operator, post: true, lvalue });
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
    return this.create(N.FunctionCall, { name, args });
  }

  constructorCall(ctx) {
    const type = this.visit(ctx.type);
    const args = this.visit(ctx.argumentList);
    return this.create(N.ConstructorCall, { type, args });
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
    let property, element;
    if (ctx.property) {
      property = this.visit(ctx.property);
    } else if (ctx.element) {
      element = this.visit(ctx.element);
    }
    return this.create(N.VariableAccess, { name, property, element });
  }

  property(ctx) {
    return this.name(ctx.Identifier);
  }

  element(ctx) {
    return this.visit(ctx.expression);
  }

  parentheses(ctx) {
    const expression = this.visit(ctx.expression);
    return this.create(N.Parentheses, { expression });
  }

  ifStatement(ctx) {
    const condition = this.visit(ctx.expression);
    const statements = arrayOf(this.visit(ctx.statement));
    const elseClause = (ctx.elseClause) ? this.visit(ctx.elseClause) : undefined;
    return this.create(N.IfStatement, { condition, statements, elseClause });
  }

  elseClause(ctx) {
    const statements = arrayOf(this.visit(ctx.statement));
    return this.create(N.IfStatement, { statements });
  }

  forStatement(ctx) {
    const initializers = this.visit(ctx.forInitializer);
    const condition = this.visit(ctx.forCondition);
    const incrementals = this.visit(ctx.forIncremental);
    const statements = arrayOf(this.visit(ctx.statement));
    return this.create(N.ForStatement, { initializers, condition, incrementals, statements });
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
    const stmts = [];
    for (const node of ctx.expression) {
      const expression = this.visit(node);
      stmts.push(this.create(N.ExpressionStatement, { expression }));
    }
    return stmts;
  }

  whileStatement(ctx) {
    const condition = this.visit(ctx.expression);
    const statements = arrayOf(this.visit(ctx.statement));
    return this.create(N.WhileStatement, { condition, statements });
  }

  doWhileStatement(ctx) {
    const condition = this.visit(ctx.expression);
    const statements = arrayOf(this.visit(ctx.statement));
    return this.create(N.DoWhileStatement, { condition, statements });
  }

  continueStatement(ctx) {
    return this.create(N.ContinueStatement, {});
  }

  breakStatement(ctx) {
    return this.create(N.BreakStatement, {});
  }

  returnStatement(ctx) {
    const expression = (ctx.expression) ? this.visit(ctx.expression) : undefined;
    return this.create(N.ReturnStatement, { expression });
  }

  expressionStatement(cxt) {
    const expression = this.visit(cxt.expression);
    return this.create(N.ExpressionStatement, { expression });
  }

  emptyStatement(ctx) {
    return this.create(N.EmptyStatement, { expression });
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
