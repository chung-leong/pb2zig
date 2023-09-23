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
    for (const node of ctx.Identifier) {
      console.log(node);
    }
    return list;
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
    const expr = this.visit(ctx.binaryOperation);
    if (ctx.Question) {
      const condition = expr;
      const onTrue = this.visit(ctx.expression[0]);
      const onFalse = this.visit(ctx.expression[1]);
      return this.create(N.Conditional, { condition, onTrue, onFalse });
    } else {
      return expr;
    }
  }

  binaryOperation(ctx) {
    const expr = this.visit(ctx.unaryOperation);
    if (ctx.binaryOperator) {
      const operand1 = expr;
      const operator = this.visit(ctx.binaryOperator);
      const operand2 = this.visit(ctx.expression) ;
      return this.create(N.BinaryOperation, { operand1, operator, operand2 });
    } else {
      return expr;
    }
  }

  binaryOperator(ctx) {
    return this.anyName(ctx);
  }

  unaryOperation(ctx) {
    const expr = this.visit(ctx.nullaryOperation);
    if (ctx.unaryOperator) {
      const operator = this.visit(ctx.unaryOperator);
      const operand = expr;
      return this.create(N.UnaryOperation, { operator, operand });
    } else {
      return expr;
    }
  }

  unaryOperator(ctx) {
    return this.anyName(ctx);
  }

  nullaryOperation(ctx) {
    return this.visitAny(ctx);
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
    const statements = this.visit(ctx.statement);
    const elseClause = (ctx.elseClause) ? this.visit(ctx.elseClause) : undefined;
    return this.create(N.IfStatement, { condition, statements, elseClause });
  }

  elseClause(ctx) {
    const statements = this.visit(ctx.statement);
    return this.create(N.IfStatement, { statements });
  }

  whileStatement(ctx) {
    const condition = this.visit(ctx.expression);
    const statements = this.visit(ctx.statement);
    return this.create(N.IfStatement, { condition, statements });
  }

  doWhileStatement(ctx) {
    const condition = this.visit(ctx.expression);
    const statements = this.visit(ctx.statement);
    return this.create(N.IfStatement, { condition, statements });
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

const visitor = new PixelBenderAstVisitor();

export function process(cst, macroCSTs) {
  const ast = visitor.visit(cst);
  const macroASTs = macroCSTs.map(cst => visitor.visit(cst));
  return { ast, macroASTs };
}
