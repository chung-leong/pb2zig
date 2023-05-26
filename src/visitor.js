import { BaseCstVisitor } from './parser.js';
import * as N from './nodes.js';

export class PixelBenderAstVisitor extends BaseCstVisitor {
  constructor() {
    super();
    //this.validateVisitor();
  }

  process(tree) {
    return this.pbk(tree);
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
      if (![ 1.0 ].includes(tag.languageVersion)) {
        throw new Error(`Unsupported Pixel Bender version: ${tag.languageVersion}`);
      }
    }
    const kernel = this.visit(ctx.kernel);
    return kernel ;
  }

  tag(ctx) {
    const attrs = {};
    for (const node of ctx.attribute) {
      Object.assign(attrs, this.visit(node));
    }
    return attrs;
  }

  attribute(ctx) {
    return { [this.name(ctx.Identifier)]: this.visit(ctx.literalValue) };
  }

  literalValue(ctx) {
    for (const [ name, node ] of Object.entries(ctx)) {
      const value = this.name(node);
      switch (name) {
        case 'Number': return parseFloat(value);
        case 'QuotedStr': return JSON.parse(value);
        case 'True': return true;
        case 'False': return false;
        case 'Null': return null;
      }
    }
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
    return this.anyName(ctx);
  }

  inputDeclaration(ctx) {
    const type = this.name(ctx.Image);
    const name = this.name(ctx.Identifier);
    return this.create(N.InputDeclaration, { type, name });
  }

  outputDeclaration(ctx) {
    const type = this.name(ctx.Pixel);
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

  variableDelcaration(ctx) {
    const type = this.visit(ctx.type);
    const list = [];
    for (const node of ctx.identifierWithInit) {
      const decl = this.visit(node);
      decl.type = type;
      list.push(decl);
    }
    return list;
  }

  identifierWithInit(ctx) {
    const name = this.name(ctx.Identifier);
    const initializer = this.visit(ctx.expression);
    return this.create(N.VariableDeclaration, { name, initializer });
  }

  expression(ctx) {
    const expr = this.visit(ctx.binaryOperation);
    if (ctx.Question) {
      const condition = expr;
      const onTrue = this.visit(ctx.expression1);
      const onFalse = this.visit(ctx.expression2);
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
      const operator = this.visit()
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

  variableAssignment(ctx) {
    const lvalue = this.visit(ctx.variable);
    const expression = this.visit(ctx.expression);
    return this.create(N.VariableAssignment, { lvalue, expression });
  }

  variable(ctx) {
    const name = this.name(ctx.Identifier);
    const names = [ name ];
    if (ctx.property) {
      for (const node of ctx.property) {
        names.push
        (this.visit(node));
      } 
    }
    return this.create(N.VariableAccess, { names });
  }

  property(ctx) {
    return this.name(ctx.Identifier);
  }

  parentheses(ctx) {
    const expression = this.visit(ctx.expression);
    return this.create(N.Parentheses, { expression });
  }

  ifStatement(ctx) {
    const condition = this.visit(ctx.expression);
    const statement = this.visit(ctx.statement);
    const elseClause = (ctx.elseClause) ? this.visit(ctx.elseClause) : undefined;
    return this.create(N.IfStatement, { condition, statement, elseClause });
  }

  elseClause(ctx) {
    const statement = this.visit(ctx.statement);
    return this.create(N.IfStatement, { statement });
  }

  whileStatement(ctx) {
    const condition = this.visit(ctx.expression);
    const statement = this.visit(ctx.statement);
    return this.create(N.IfStatement, { condition, statement });
  }

  doWhileStatement(ctx) {
    const condition = this.visit(ctx.expression);
    const statement = this.visit(ctx.statement);
    return this.create(N.IfStatement, { condition, statement });
  }

  continueStatement(ctx) {
    return this.create(N.ContinueStatement, {});
  }

  breakStatement(ctx) {
    return this.create(N.BreakStatement, {});
  }

  returnStatement(ctx) {
    const value = (ctx.expression) ? this.visit(ctx.expression) : undefined;
    return this.create(N.ReturnStatement, { value });
  }

  emptyStatement(ctx) {
  }

  comment(ctx) {
    const text = this.name(ctx.Comment);
    return this.create(N.Comment, { text });
  }
}
