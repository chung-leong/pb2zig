import { BaseCstVisitor } from './parser.js';

export class PixelBenderAstVisitor extends BaseCstVisitor {
  constructor() {
    super();
    this.validateVisitor();
  }

  name(arr) {
    return arr[0].image;
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
    const meta = this.create(Meta, this.visit(ctx.tag));
    const body = this.visit(ctx.kernelBody);   
    return this.create(Kernel, { name, meta, ...body });
  }

  kernelBody(ctx) {
    const parameters = [];
    const inputs = [];
    var output = null;
    const functions = [];
    const statements = [];
    for (const node of ctx.kernelStatement) {
      const s = this.visit(node);
      if (s instanceof Parameter) {
        parameters.push(s);
      } else if (s instanceof Input) {
        inputs.push(s);
      } else if (s instanceof Output) {
        if (!output) {
          output = s;
        } else {
          throw new Error("Multiple output statements encountered");
        }
      } else if (s instanceof FunctionDefinition) {
        functions.push(s);
      }
      statements.push(s);
    }
    return { parameters, inputs, output, functions, statements };
  }

  kernelStatement(ctx) {
    for (const [ name, node ] of Object.entries(ctx)) {
      return this.visit(node);
    }
  }

  parameterDeclaration(ctx) {
    const type = this.visit(ctx.type);
    const name = this.name(ctx.Identifier);
    const tag = this.visit(ctx.tag);
    return this.create(Parameter, { type, name, ...tag });
  }

  type(ctx) {
    for (const [ name, node ] of Object.entries(ctx)) {
      return this.name(node)
    }
  }

  inputDeclaration(ctx) {
    const type = this.name(ctx.Image);
    const name = this.name(ctx.Identifier);
    return this.create(Input, { type, name });
  }

  outputDeclaration(ctx) {
    const type = this.name(ctx.Pixel);
    const name = this.name(ctx.Identifier);
    return this.create(Output, { type, name });
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
    return this.create(FunctionDefinition, { type, name, args, statements });
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
    return this.create(FunctionArgument, { type, name });
  }

  statementBlock(ctx) {
    const statements = [];
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
    return statements;
  }

  statement(ctx) {
    for (const [ name, node ] of Object.entries(ctx)) {
      return this.visit(node);
    }
  }

  variableDelcaration(ctx) {
    const type = this.visit(ctx.type);
    const list = [];
    for (const node of ctx.identifierWithInit) {
      const { name, initializer } = this.visit(node);
      list.push(new Variable({ type, name, initializer }));
    }
    return list;
  }

  identifierWithInit(ctx) {
    const name = this.name(ctx.Identifier);
    const initializer = this.visit(ctx.expression);
    return { name, initializer };
  }

  expression(ctx) {
  }

  expressionNotRecursive(ctx) {

  }

  expressionInParentheses(ctx) {

  }

  unaryOperators(ctx) {

  }

  binaryOperators(ctx) {

  }
  
  constructorCall(ctx) {

  }

  argumentList(ctx) {

  }

  functionCall(ctx) {

  }
  
  variableAssignment(ctx) {

  }

  leftValue(ctx) {

  }

  propertyAccess(ctx) {

  }

  ifStatement(ctx) {

  }

  elseClause(ctx) {

  }

  whileStatement(ctx) {

  }

  doWhileStatement(ctx) {

  }

  continueStatement(ctx) {

  }

  breakStatement(ctx) {

  }

  returnStatement(ctx) {

  }

  emptyStatement(ctx) {

  }

  comment(ctx) {
    const text = this.name(ctx.Comment);
    return this.create(Comment, { text });
  }
}

class Kernel {
  name;
  meta;
  parameters;
  inputs; 
  output; 
  functions;
  statements;
}

class Meta {
  namespace;
  vendor;
  version;
  description;
  displayname;
  category;
}

class Comment {
  text;
}

class Parameter {
  name;
  type;
  minValue;
  maxValue;
  stepInterval;
  defaultValue;
  previewValue;
}

class Variable {
  type;
  name;
  initializer;
}

class Input extends Variable {
}

class Output extends Variable {
}

class FunctionDefinition {
  type;
  name;
  args;
  statements;
}

class FunctionArgument extends Variable {  
}

