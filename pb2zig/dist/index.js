import { createToken, Lexer, CstParser } from 'chevrotain';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';

const T = {
  WhiteSpace: createToken({
    name: 'WhiteSpace',
    pattern: /[ \t\n\r]+/,
    group: Lexer.SKIPPED
  }),
  MultilineComment: createToken({
    name: 'MultilineComment',
    pattern: /\/\*[\s\S]*?\*\//,
    group: 'comment',
    line_breaks: true,
  }),
  Comment: createToken({
    name: 'Comment',
    group: 'comment',
    pattern: /\/\/.*/,
  }),
  Preprocessor: createToken({
    name: 'Preprocessor',
    group: 'preprocessor',
    pattern: /#\s*(if|ifdef|define|elif|endif)\b(\\\n|.)*/,
  }),
  Number: createToken({   // this needs to be ahead of T.Dot
    name: 'Number',
    pattern: /([0-9]*[.])?[0-9]+([eE][-+]?\d+)?/,
    start_chars_hint: [ ...'0123456789.' ].map(c => c.charCodeAt(0)),
  }),

  DblEql: createToken({ name: 'DblEqual', pattern: /==/ }),
  ExclamEql: createToken({ name: 'ExclamEql', pattern: /!=/ }),
  PlusEql: createToken({ name: 'PlusEql', pattern: /\+=/ }),
  MinusEql: createToken({ name: 'MinusEql', pattern: /-=/ }),
  AsteriskEql: createToken({ name: 'AsteriskEql', pattern: /\*=/ }),
  SlashEql: createToken({ name: 'SlashEql', pattern: /\/=/ }),
  LAngleEql: createToken({ name: 'LAngleEql', pattern: /<=/ }),
  RAngleEql: createToken({ name: 'RAngleEql', pattern: />=/ }),
  DblPlus: createToken({ name: 'DblPlus', pattern: /\+\+/ }),
  DblMinus: createToken({ name: 'DblMinus', pattern: /\-\-/ }),
  DblAmp: createToken({ name: 'DblAnd', pattern: /&&/ }),
  DblPipe: createToken({ name: 'DblPipe', pattern: /\|\|/ }),
  DblCircum: createToken({ name: 'DblCircum', pattern: /\^\^/ }),
  Arrow: createToken({ name: 'Arrow', pattern: '/->/' }),

  LCurly: createToken({ name: 'LCurly', pattern: /{/ }),
  RCurly: createToken({ name: 'RCurly', pattern: /}/ }),
  LSquare: createToken({ name: 'LSquare', pattern: /\[/ }),
  RSquare: createToken({ name: 'RSquare', pattern: /]/ }),
  LParen: createToken({ name: 'LParen', pattern: /\(/ }),
  RParen: createToken({ name: 'RParen', pattern: /\)/ }),
  LAngle: createToken({ name: 'LAngle', pattern: /</ }),
  RAngle: createToken({ name: 'RAngle', pattern: />/ }),
  Period: createToken({ name: 'Period', pattern: /\./ }),
  Comma: createToken({ name: 'Comma', pattern: /,/ }),
  Colon: createToken({ name: 'Colon', pattern: /:/ }),
  Semicolon: createToken({ name: 'Semicolon', pattern: /;/ }),
  Exclam: createToken({ name: 'Exclam', pattern: /!/ }),
  Question: createToken({ name: 'Question', pattern: /\?/ }),

  Plus: createToken({ name: 'Plus', pattern: /\+/ }),
  Minus: createToken({ name: 'Minus', pattern: /-/ }),
  Asterisk: createToken({ name: 'Asterisk', pattern: /\*/ }),
  Slash: createToken({ name: 'Slash', pattern: /\// }),
  Equal: createToken({ name: 'Equal', pattern: /=/ }),

  If: createToken({ name: 'If', pattern: /if\b/ }),
  Else: createToken({ name: 'Else', pattern: /else\b/ }),
  For: createToken({ name: 'For', pattern: /for\b/ }),
  While: createToken({ name: 'While', pattern: /while\b/ }),
  Do: createToken({ name: 'Do', pattern: /do\b/ }),
  Break: createToken({ name: 'Break', pattern: /break\b/ }),
  Continue: createToken({ name: 'Continue', pattern: /continue\b/ }),
  Return: createToken({ name: 'Return', pattern: /return\b/ }),

  Bool: createToken({ name: 'Bool', pattern: /bool\b/ }),
  BoolVector: createToken({ name: 'BoolVector', pattern: /bool[2-4]\b/ }),
  Int: createToken({ name: 'Int', pattern: /int\b/ }),
  IntVector: createToken({ name: 'IntVector', pattern: /int([2-4])\b/ }),
  IntMatrix: createToken({ name: 'IntMatrix', pattern: /int([2-4])x([2-4])\b/ }),
  Float: createToken({ name: 'Float', pattern: /float\b/ }),
  FloatVector: createToken({ name: 'FloatVector', pattern: /float([2-4])\b/ }),
  FloatMatrix: createToken({ name: 'FloatMatrix', pattern: /float([2-4])x([2-4])\b/ }),
  Image: createToken({ name: 'Image', pattern: /image([1-4])\b/ }),
  Pixel: createToken({ name: 'Pixel', pattern: /pixel([1-4])\b/ }),
  Output: createToken({ name: 'Output', pattern: /output\b/ }),
  String: createToken({ name: 'String', pattern: /string\b/ }),
  Void: createToken({ name: 'Void', pattern: /void\b/ }),
  Region: createToken({ name: 'Region', pattern: /region\b/ }),
  ImageRef: createToken({ name: 'ImageRef', pattern: /imageRef\b/ }),

  InOut: createToken({ name: 'InOut', pattern: /inout\b/ }),
  In: createToken({ name: 'In', pattern: /in\b/ }),
  Out: createToken({ name: 'Out', pattern: /out\b/ }),
  Input: createToken({ name: 'Input', pattern: /input\b/ }),
  Output: createToken({ name: 'Output', pattern: /output\b/ }),
  Const: createToken({ name: 'Const', pattern: /const\b/ }),
  Dependent: createToken({ name: 'Dependent', pattern: /dependent\b/ }),
  Kernel: createToken({ name: 'Kernel', pattern: /kernel\b/ }),
  Parameter: createToken({ name: 'Parameter', pattern: /parameter\b/ }),

  True: createToken({ name: 'True', pattern: /true\b/ }),
  False: createToken({ name: 'False', pattern: /false\b/ }),
  QuotedStr: createToken({
    name: 'QuotedStr',
    pattern: /"(?:[^\\"]|\\(?:[bfnrtv"\\/]|u[0-9a-fA-F]{4}))*"/
  }),
  Identifier: createToken({ name: 'Identifier', pattern: /[_a-zA-Z][_0-9a-zA-Z]*/ }),
};

class PixelBenderParser extends CstParser {
  constructor() {
    super(allTokens);
    const $ = this;
    $.RULE('pbk', () => {
      $.SUBRULE($.tag);
      $.SUBRULE($.kernel);
    });
    $.RULE('tag', () => {
      $.CONSUME(T.LAngle);
      $.MANY(() => $.SUBRULE($.attribute));
      $.CONSUME(T.RAngle);
    });
    $.RULE('attribute', () => {
      $.CONSUME(T.Identifier);
      $.CONSUME(T.Colon);
      $.SUBRULE($.expression);
      $.CONSUME(T.Semicolon);
    });
    $.RULE('literalValue', () => {
      $.OR([
        { ALT: () => $.CONSUME(T.Number) },
        { ALT: () => $.CONSUME(T.QuotedStr) },
        { ALT: () => $.CONSUME(T.True) },
        { ALT: () => $.CONSUME(T.False) },
      ]);
    });
    $.RULE('kernel', () => {
      $.CONSUME(T.Kernel);
      $.CONSUME(T.Identifier);
      $.SUBRULE($.tag);
      $.SUBRULE($.kernelBody);
    });
    $.RULE('kernelBody', () => {
      $.CONSUME(T.LCurly);
      $.MANY(() => $.SUBRULE($.kernelStatement));
      $.CONSUME(T.RCurly);
    });
    $.RULE('kernelStatement', () => {
      $.OR([
        { ALT: () => $.SUBRULE($.parameterDeclaration) },
        { ALT: () => $.SUBRULE($.inputDeclaration) },
        { ALT: () => $.SUBRULE($.outputDeclaration) },
        { ALT: () => $.SUBRULE($.functionDeclaration) },
        { ALT: () => $.SUBRULE($.constantDeclaration) },
        { ALT: () => $.SUBRULE($.dependentDeclaration) },
      ]);
    });
    $.RULE('parameterDeclaration', () => {
      $.CONSUME(T.Parameter);
      $.SUBRULE($.type);
      $.CONSUME(T.Identifier);
      $.OPTION(() => {
        $.SUBRULE($.tag);
      });
      $.CONSUME(T.Semicolon);
    });
    $.RULE('type', () => {
      $.OR([
        { ALT: () => $.CONSUME(T.Bool) },
        { ALT: () => $.CONSUME(T.BoolVector) },
        { ALT: () => $.CONSUME(T.Int) },
        { ALT: () => $.CONSUME(T.IntVector) },
        { ALT: () => $.CONSUME(T.IntMatrix) },
        { ALT: () => $.CONSUME(T.Float) },
        { ALT: () => $.CONSUME(T.FloatVector) },
        { ALT: () => $.CONSUME(T.FloatMatrix) },
        { ALT: () => $.CONSUME(T.String) },
        { ALT: () => $.CONSUME(T.Pixel) },
        { ALT: () => $.CONSUME(T.Region) },
        { ALT: () => $.CONSUME(T.ImageRef) },
      ]);
    });
    $.RULE('inputDeclaration', () => {
      $.CONSUME(T.Input);
      $.CONSUME(T.Image);
      $.CONSUME(T.Identifier);
      $.CONSUME(T.Semicolon);
    });
    $.RULE('outputDeclaration', () => {
      $.CONSUME(T.Output);
      $.OR([
        { ALT: () => $.CONSUME(T.Pixel) },
        { ALT: () => $.CONSUME(T.FloatVector) },
      ]);
      $.CONSUME(T.Identifier);
      $.CONSUME(T.Semicolon);
    });
    $.RULE('functionDeclaration', () => {
      $.SUBRULE($.returnType);
      $.CONSUME(T.Identifier);
      $.CONSUME(T.LParen);
      $.MANY_SEP({
        SEP: T.Comma,
        DEF: () => $.SUBRULE($.argumentDeclaration),
      });
      $.CONSUME(T.RParen);
      $.SUBRULE($.statementBlock);
    });
    $.RULE('expressionMacroDeclaration', () => {
      $.CONSUME(T.Identifier);
      $.OPTION(() => {
        $.CONSUME(T.LParen);
        $.MANY_SEP({
          SEP: T.Comma,
          DEF: () => $.SUBRULE($.typelessArgumentDeclaration),
        });
        $.CONSUME(T.RParen);
      });
      $.SUBRULE($.expression);
    });
    $.RULE('statementMacroDeclaration', () => {
      $.CONSUME(T.Identifier);
      $.OPTION(() => {
        $.CONSUME(T.LParen);
        $.MANY_SEP({
          SEP: T.Comma,
          DEF: () => $.SUBRULE($.typelessArgumentDeclaration),
        });
        $.CONSUME(T.RParen);
      });
      $.MANY(() => $.SUBRULE($.statement));
    });
    $.RULE('returnType', () => {
      $.OR([
        { ALT: () => $.CONSUME(T.Void) },
        { ALT: () => $.SUBRULE($.type) },
      ]);
    });
    $.RULE('argumentDeclaration', () => {
      $.OPTION(() => $.SUBRULE($.argumentDirection));
      $.SUBRULE($.type);
      $.CONSUME(T.Identifier);
    });
    $.RULE('argumentDirection', () => {
      $.OR([
        { ALT: () => $.CONSUME(T.In) },
        { ALT: () => $.CONSUME(T.Out) },
        { ALT: () => $.CONSUME(T.InOut) },
      ]);
    });
    $.RULE('typelessArgumentDeclaration', () => {
      $.CONSUME(T.Identifier);
    });
    $.RULE('statementBlock', () => {
      $.CONSUME(T.LCurly);
      $.MANY(() => $.SUBRULE($.statement));
      $.CONSUME(T.RCurly);
    });
    $.RULE('statement', () => {
      $.OR([
        { ALT: () => $.SUBRULE($.statementBlock) },
        { ALT: () => $.SUBRULE($.variableDeclaration) },
        { ALT: () => $.SUBRULE($.constantDeclaration) },
        { ALT: () => $.SUBRULE($.expressionStatement) },
        { ALT: () => $.SUBRULE($.ifStatement) },
        { ALT: () => $.SUBRULE($.forStatement) },
        { ALT: () => $.SUBRULE($.whileStatement) },
        { ALT: () => $.SUBRULE($.doWhileStatement) },
        { ALT: () => $.SUBRULE($.continueStatement) },
        { ALT: () => $.SUBRULE($.breakStatement) },
        { ALT: () => $.SUBRULE($.returnStatement) },
        { ALT: () => $.SUBRULE($.emptyStatement) },
      ]);
    });
    $.RULE('variableDeclaration', () => {
      $.SUBRULE($.type);
      $.AT_LEAST_ONE_SEP({
        SEP: T.Comma,
        DEF: () => $.SUBRULE($.identifierWithInit),
      });
      $.CONSUME(T.Semicolon);
    });
    $.RULE('constantDeclaration', () => {
      $.CONSUME(T.Const),
      $.SUBRULE($.type);
      $.AT_LEAST_ONE_SEP({
        SEP: T.Comma,
        DEF: () => $.SUBRULE($.identifierWithMandatoryInit),
      });
      $.CONSUME(T.Semicolon);
    });
    $.RULE('dependentDeclaration', () => {
      $.CONSUME(T.Dependent),
      $.SUBRULE($.type);
      $.AT_LEAST_ONE_SEP({
        SEP: T.Comma,
        DEF: () => $.SUBRULE($.identifierWithArrayLength),
      });
      $.CONSUME(T.Semicolon);
    });
    $.RULE('identifierWithArrayLength', () => {
      $.CONSUME(T.Identifier);
      $.OPTION(() => {
        $.CONSUME(T.LSquare);
        $.SUBRULE($.expression);
        $.CONSUME(T.RSquare);
      });
    });
    $.RULE('identifierWithInit', () => {
      $.CONSUME(T.Identifier),
      $.OPTION(() => {
        $.CONSUME(T.Equal);
        $.SUBRULE($.expression);
      });
    });
    $.RULE('identifierWithMandatoryInit', () => {
      $.CONSUME(T.Identifier),
      $.OPTION(() => {
        $.CONSUME(T.Equal);
        $.SUBRULE($.expression);
      });
    });
    $.RULE('expression', () => {
      // assignment has the lowest precedence
      $.SUBRULE($.ternaryOperation);
      $.OPTION(() => {
        $.SUBRULE($.assignmentOperator);
        $.SUBRULE($.expression);
      });
    });
    $.RULE('ternaryOperation', () => {
      $.SUBRULE($.binaryOperation);
      $.OPTION(() => {
        $.CONSUME(T.Question);
        $.SUBRULE1($.ternaryOperation);
        $.CONSUME(T.Colon);
        // chaining is possible
        $.SUBRULE2($.ternaryOperation);
      });
    });
    $.RULE('binaryOperation', () => {
      $.SUBRULE1($.unaryOperation);
      $.OPTION(() => {
        $.OR([
          { ALT: () => $.SUBRULE($.arithmeticOperator) },
          { ALT: () => $.SUBRULE($.comparisonOperator) },
        ]);
        // chaining is possible--need to adjust the operands
        // based on correct precedence order in visitor
        $.SUBRULE2($.binaryOperation);
      });
    });
    $.RULE('arithmeticOperator', () => {
      $.OR([
        { ALT: () => $.CONSUME(T.Plus) },
        { ALT: () => $.CONSUME(T.Minus) },
        { ALT: () => $.CONSUME(T.Asterisk) },
        { ALT: () => $.CONSUME(T.Slash) },
      ]);
    });
    $.RULE('comparisonOperator', () => {
      $.OR([
        { ALT: () => $.CONSUME(T.LAngle) },
        { ALT: () => $.CONSUME(T.RAngle) },
        { ALT: () => $.CONSUME(T.LAngleEql) },
        { ALT: () => $.CONSUME(T.RAngleEql) },
        { ALT: () => $.CONSUME(T.DblEql) },
        { ALT: () => $.CONSUME(T.ExclamEql) },
        { ALT: () => $.CONSUME(T.DblAmp) },
        { ALT: () => $.CONSUME(T.DblPipe) },
        { ALT: () => $.CONSUME(T.DblCircum) },
      ]);
    });
    $.RULE('assignmentOperator', () => {
      $.OR([
        { ALT: () => $.CONSUME(T.Equal) },
        { ALT: () => $.CONSUME(T.PlusEql) },
        { ALT: () => $.CONSUME(T.MinusEql) },
        { ALT: () => $.CONSUME(T.AsteriskEql) },
        { ALT: () => $.CONSUME(T.SlashEql) },
      ]);
    });
    $.RULE('unaryOperation', () => {
      $.OPTION(() => {
        $.OR([
          { ALT: () => $.CONSUME(T.Plus) },
          { ALT: () => $.CONSUME(T.Minus) },
          { ALT: () => $.CONSUME(T.Exclam) },
        ]);
      });
      $.SUBRULE($.nullaryOperation);
    });
    $.RULE('nullaryOperation', () => {
      $.OR1([
        { ALT: () => $.SUBRULE($.parentheses) },
        { ALT: () => $.SUBRULE($.constructorCall) },
        { ALT: () => $.SUBRULE($.functionCall) },
        { ALT: () => $.SUBRULE($.incrementPrefix) },
        { ALT: () => $.SUBRULE($.incrementPostfix) },
        { ALT: () => $.SUBRULE($.literalValue) },
      ]);
      $.OPTION(() => {
        $.OR2([
          { ALT: () => $.SUBRULE($.property) },
          { ALT: () => $.SUBRULE($.element) },
        ]);
      });
    });
    $.RULE('parentheses', () => {
      $.CONSUME(T.LParen);
      $.SUBRULE($.expression);
      $.CONSUME(T.RParen);
    });
    $.RULE('constructorCall', () => {
      $.SUBRULE($.type);
      $.CONSUME(T.LParen);
      $.SUBRULE($.argumentList);
      $.CONSUME(T.RParen);
    });
    $.RULE('incrementPrefix', () => {
      $.SUBRULE($.incrementOperator);
      $.SUBRULE($.variable);
    });
    $.RULE('incrementPostfix', () => {
      $.SUBRULE($.variable);
      $.OPTION(() => {
        $.SUBRULE($.incrementOperator);
      });
    });
    $.RULE('incrementOperator', () => {
      $.OR([
        { ALT: () => $.CONSUME(T.DblPlus) },
        { ALT: () => $.CONSUME(T.DblMinus) },
      ]);
    });
    $.RULE('argumentList', () => {
      $.MANY_SEP({
        SEP: T.Comma,
        DEF: () => $.SUBRULE($.expression),
      });
    });
    $.RULE('functionCall', () => {
      $.CONSUME(T.Identifier);
      $.CONSUME(T.LParen);
      $.SUBRULE($.argumentList);
      $.CONSUME(T.RParen);
    });
    $.RULE('variable', () => {
      $.CONSUME(T.Identifier);
      $.OPTION(() => {
        $.OR([
          { ALT: () => $.SUBRULE($.property) },
          { ALT: () => $.SUBRULE($.element) },
        ]);
      });
    });
    $.RULE('property', () => {
      $.CONSUME(T.Period);
      $.CONSUME(T.Identifier);
    });
    $.RULE('element', () => {
      $.CONSUME(T.LSquare);
      $.SUBRULE($.expression);
      $.CONSUME(T.RSquare);
    });
    $.RULE('ifStatement', () => {
      $.CONSUME(T.If);
      $.CONSUME(T.LParen);
      $.SUBRULE($.expression);
      $.CONSUME(T.RParen);
      $.SUBRULE($.statement);
      $.OPTION(() => $.SUBRULE($.elseClause));
    });
    $.RULE('elseClause', () => {
      $.CONSUME(T.Else);
      $.SUBRULE($.statement);
    });
    $.RULE('whileStatement', () => {
      $.CONSUME(T.While);
      $.CONSUME(T.LParen);
      $.SUBRULE($.expression);
      $.CONSUME(T.RParen);
      $.SUBRULE($.statement);
    });
    $.RULE('doWhileStatement', () => {
      $.CONSUME(T.Do);
      $.SUBRULE($.statement);
      $.CONSUME(T.While);
      $.CONSUME(T.LParen);
      $.SUBRULE($.expression);
      $.CONSUME(T.RParen);
      $.CONSUME(T.Semicolon);
    });
    $.RULE('forStatement', () => {
      $.CONSUME(T.For);
      $.CONSUME(T.LParen);
      $.SUBRULE($.forInitializer);
      $.SUBRULE($.forCondition);
      $.SUBRULE($.forIncremental);
      $.CONSUME(T.RParen);
      $.SUBRULE($.statement);
    });
    $.RULE('forInitializer', () => {
      $.OR([
        { ALT: () => $.SUBRULE($.variableDeclaration) },
        { ALT: () => $.SUBRULE($.expressionStatement) },
        { ALT: () => $.SUBRULE($.emptyStatement) },
      ]);
    });
    $.RULE('forCondition', () => {
      $.OR([
        { ALT: () => $.SUBRULE($.expressionStatement) },
        { ALT: () => $.SUBRULE($.emptyStatement) },
      ]);
    });
    $.RULE('forIncremental', () => {
      $.MANY_SEP({
        SEP: T.Comma,
        DEF: () => $.SUBRULE($.expression),
      });
    });
    $.RULE('continueStatement', () => {
      $.CONSUME(T.Continue);
      $.CONSUME(T.Semicolon);
    });
    $.RULE('breakStatement', () => {
      $.CONSUME(T.Break);
      $.CONSUME(T.Semicolon);
    });
    $.RULE('returnStatement', () => {
      $.CONSUME(T.Return);
      $.OPTION(() => {
        $.SUBRULE($.expression);
      });
      $.CONSUME(T.Semicolon);
    });
    $.RULE('expressionStatement', () => {
      $.SUBRULE($.expression);
      $.CONSUME(T.Semicolon);
    });
    $.RULE('emptyStatement', () => {
      $.CONSUME(T.Semicolon);
    });
    this.performSelfAnalysis();
  }
}

const allTokens = Object.values(T);
const lexer = new Lexer(allTokens);
const parser = new PixelBenderParser();
const BaseCstVisitor = parser.getBaseCstVisitorConstructor();

function parse(code) {
  const lex = lexer.tokenize(code);
  const macroCSTs = [];
  const lexErrors = [];
  const parseErrors = [];
  for (const token of lex.groups.preprocessor) {
    let m;
    if (m = /#\s*define\s+(.*)/.exec(token.image)) {
      const stringOffset = m[0].length - m[1].length;
      const macro = parseMacro(m[1], {
        offset: token.startOffset - 1 + stringOffset,
        lineOffset: token.startLine - 1,
        columnOffset: token.startColumn - 1 + stringOffset,
      });
      macroCSTs.push(macro.cst);
      lexErrors.push(...macro.lexErrors);
      parseErrors.push(...macro.parseErrors);
    }
  }
  parser.input = lex.tokens;
  const cst = parser.pbk();
  lexErrors.push(...lex.errors);
  parseErrors.push(...parser.errors);
  return { cst, macroCSTs, lexErrors, parseErrors };
}

function parseMacro(text, { offset, lineOffset, columnOffset }) {
  let lex = lexer.tokenize(text);
  parser.input = lex.tokens;
  let cst = parser.expressionMacroDeclaration();
  const lexErrors = lex.errors;
  let parseErrors = parser.errors;
  if (parseErrors.length > 0) {
    // ensure there a semicolon at the end
    if (!/;\s*$/.test(text)) {
      lex = lexer.tokenize(text + ';');
    }
    parser.input = lex.tokens;
    cst = parser.statementMacroDeclaration();
    parseErrors = parser.errors;
    // if (parser.errors.length === 0) {
    //   parseErrors = parser.errors;
    // }
  }
  // adjust position reported position of errors
  // there ought to be a better way than this...
  for (const err of lexErrors) {
    const oldOffset = err.offset;
    err.offset += offset;
    err.line += lineOffset;
    err.column += columnOffset;
    err.message = err.message.replace(oldOffset, err.offset);
  }
  for (const { token } of parseErrors) {
    if (!isNaN(token.startOffset)) {
      token.startOffset += offset;
      token.endOffset += offset;
      token.startLine += lineOffset;
      token.endLine += lineOffset;
      token.startColumn += columnOffset;
      token.endColumn += columnOffset;
    }
  }
  return { cst, lexErrors, parseErrors };
}

class PBNode {
  static create(initializers) {
    return Object.assign(new this, initializers);
  }
}

class Kernel extends PBNode {
  name;
  meta;
  statements;
}

class Meta extends PBNode {
  namespace;
  vendor;
  version;
  description;
  displayName;
  category;
}

class Parameter extends PBNode {
  name;
  type;
  minValue;
  maxValue;
  stepInterval;
  defaultValue;
  previewValue;
  parameterType;
  displayName;
  description;
}

let VariableDeclaration$1 = class VariableDeclaration extends PBNode {
  type;
  name;
  initializer;
};

class ConstantDeclaration extends PBNode {
  type;
  name;
  initializer;
}

class DependentDeclaration extends PBNode {
  type;
  name;
  width;
}

class InputDeclaration extends PBNode {
  type;
  name;
}

class OutputDeclaration extends PBNode {
  type;
  name;
}

let FunctionDefinition$1 = class FunctionDefinition extends PBNode {
  type;
  name;
  args;
  statements;
};

class MacroDefinition extends PBNode {
  name;
  args;
  expression;
  statement;
}

let Literal$1 = class Literal extends PBNode {
  type;
  value;
};

let FunctionArgument$1 = class FunctionArgument extends PBNode {
  direction;
  type;
  name;
};

let FunctionCall$1 = class FunctionCall extends PBNode {
  name;
  args;
};

class ConstructorCall extends PBNode {
  type;
  args;
}

let VariableAccess$1 = class VariableAccess extends PBNode {
  name;
  property;
  index;
};

let ElementAccess$1 = class ElementAccess extends PBNode {
  expression;
  property;
  index;
};

class IncrementOperation extends PBNode {
  operator;
  post;
  lvalue;
}

class AssignmentOperation extends PBNode {
  operator;
  lvalue;
  rvalue;
}

let BinaryOperation$1 = class BinaryOperation extends PBNode {
  operator;
  operand1;
  operand2;
};

class ArithmeticOperation extends BinaryOperation$1 {
}

class ComparisonOperation extends BinaryOperation$1 {
}

let UnaryOperation$1 = class UnaryOperation extends PBNode {
  operand;
};

class SignOperation extends UnaryOperation$1 {
  sign;
}

class NotOperation extends UnaryOperation$1 {
}

let Conditional$1 = class Conditional extends PBNode {
  condition;
  onTrue;
  onFalse;
};

let Parentheses$1 = class Parentheses extends PBNode {
  expression;
};

let IfStatement$1 = class IfStatement extends PBNode {
  condition;
  statement;
  elseClause;
};

class ForStatement extends PBNode {
  initializers;
  condition;
  incrementals;
  statement;
}

let WhileStatement$1 = class WhileStatement extends PBNode {
  condition;
  statement;
};

class DoWhileStatement extends PBNode {
  condition;
  statement;
}

let StatementBlock$1 = class StatementBlock extends PBNode {
  statements;
};

let BreakStatement$1 = class BreakStatement extends PBNode {
};

let ContinueStatement$1 = class ContinueStatement extends PBNode {
};

let ReturnStatement$1 = class ReturnStatement extends PBNode {
  expression;
};

let ExpressionStatement$1 = class ExpressionStatement extends PBNode {
  expression;
};

class EmptyStatement extends PBNode {
}

function isUnsupported(type) {
  return [ 'region', 'imageRef' ].includes(type);
}

function getSwizzleIndices(property) {
  const map = {
    r: 0, g: 1, b: 2, a: 3,
    x: 0, y: 1, z: 2, w: 3,
    s: 0, t: 1, p: 2, q: 3,
  };
  return [ ...property ].map(c => map[c]);
}

function walk(tree, cb) {
  const f = (node, key, parent) => {
    if (Array.isArray(node)) {
      for (const [ key, child ] of node.entries()) {
        const res = f(child, key, node);
        // end iteration if callback returns false
        if (res === false) {
          return false;
        }
      }
    } else {
      const res = cb(node, key, parent);
      if (res !== undefined) {
        return res;
      }
      if (parent && node !== parent[key]) {
        // object has been swapped out--scan the new object instead
        return f(parent[key], key, parent);
      }
      if (node instanceof Object) {
        // scan sub-nodes if callback doesn't return anything
        for (const [ key, child ] of Object.entries(node)) {
          const res = f(child, key, node);
          if (res === false) {
            return false;
          }
        }
      }
    }
  };
  f(tree);
}

function find(tree, classes, recursive = false) {
  if (!Array.isArray(classes)) {
    classes = [ classes ];
  }
  const list = [];
  walk(tree, (node) => {
    if (classes.some(c => node instanceof c)) {
      list.push(node);
      if (!recursive) {
        return true;
      }
    }
  });
  return list;
}

function map(object, cb) {
  const result = {};
  for (const [ name, value ] of Object.entries(object)) {
    const newValue = cb(value, name);
    if (newValue !== undefined) {
      result[name] = newValue;
    }
  }
  return result;
}

class PixelBenderAstVisitor extends BaseCstVisitor {
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
          type = 'string';
          value = JSON.parse(value);
          break;
        case 'True':
          type = 'bool';
          value = true;
          break;
        case 'False':
          type = 'bool';
          value = false;
          break;
      }
      return Literal$1.create({ type, value });
    }
  }

  kernel(ctx) {
    const name = this.name(ctx.Identifier);
    const meta = Meta.create(this.visit(ctx.tag));
    const statements = this.visit(ctx.kernelBody);
    return Kernel.create({ name, meta, statements });
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
    return Parameter.create({ type, name, ...tag });
  }

  type(ctx) {
    let type = this.anyName(ctx);
    if (type.startsWith('pixel')) {
      const width = type.slice(-1);
      type = 'float';
      if (width > 1) {
        type += width;
      }
    }
    return type;
  }

  inputDeclaration(ctx) {
    const type = this.name(ctx.Image);
    const name = this.name(ctx.Identifier);
    return InputDeclaration.create({ type, name });
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
    return OutputDeclaration.create({ type, name });
  }

  functionDeclaration(ctx) {
    const type = this.visit(ctx.returnType);
    const name = this.name(ctx.Identifier);
    const args = ctx.argumentDeclaration?.map(a => this.visit(a)) ?? [];
    const { statements } = this.visit(ctx.statementBlock);
    return FunctionDefinition$1.create({ type, name, args, statements });
  }

  expressionMacroDeclaration(ctx) {
    const name = this.name(ctx.Identifier);
    const args = (ctx.LParen) ? ctx.typelessArgumentDeclaration?.map(a => this.visit(a)) ?? [] : undefined;
    const expression = this.visit(ctx.expression);
    return MacroDefinition.create({ name, args, expression });
  }

  statementMacroDeclaration(ctx) {
    const name = this.name(ctx.Identifier);
    const args = (ctx.LParen) ? ctx.typelessArgumentDeclaration?.map(a => this.visit(a)) ?? [] : undefined;
    const statements = ctx.statement?.map(s => this.visit(s)).flat() ?? [];
    return MacroDefinition.create({ name, args, statements });
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
    return FunctionArgument$1.create({ direction, type, name });
  }

  argumentDirection(ctx) {
    return this.anyName(ctx);
  }

  typelessArgumentDeclaration(ctx) {
    return this.name(ctx.Identifier);
  }

  statementBlock(ctx) {
    const statements = ctx.statement?.map(s => this.visit(s)).flat() ?? [];
    return StatementBlock$1.create({ statements });
  }

  statement(ctx) {
    const node = this.visitAny(ctx);
    // fix order of binary operations
    const fix = (node, key, parent) => {
      if (node instanceof BinaryOperation$1) {
        if (node.operand2 instanceof BinaryOperation$1) {
          const exprL = node;
          const exprR = node.operand2;
          const precedenceL = getPrecedence(exprL.operator);
          const precedenceR = getPrecedence(exprR.operator);
          if (precedenceL <= precedenceR) {
            // the left op has higher precedence (left-associtivity)
            // steal the operand from the right op and place the left op in its place
            exprL.operand2 = exprR.operand1;
            exprR.operand1 = exprL;
            parent[key] = exprR;
          }
        }
      }
    };
    walk(node, fix);
    return node;
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
    return DependentDeclaration.create({ name, width });
  }

  identifierWithInit(ctx) {
    const name = this.name(ctx.Identifier);
    const initializer = this.visit(ctx.expression);
    return VariableDeclaration$1.create({ name, initializer });
  }

  identifierWithMandatoryInit(ctx) {
    const name = this.name(ctx.Identifier);
    const initializer = this.visit(ctx.expression);
    return ConstantDeclaration.create({ name, initializer });
  }

  expression(ctx) {
    const expr = this.visit(ctx.ternaryOperation);
    if (ctx.assignmentOperator) {
      const operator = this.visit(ctx.assignmentOperator);
      const lvalue = expr;
      const rvalue = this.visit(ctx.expression);
      return AssignmentOperation.create({ lvalue, operator, rvalue });
    } else {
      return expr;
    }
  }

  ternaryOperation(ctx) {
    const expr = this.visit(ctx.binaryOperation);
    if (ctx.Question) {
      const condition = expr;
      const onTrue = this.visit(ctx.ternaryOperation[0]);
      const onFalse = this.visit(ctx.ternaryOperation[1]);
      return Conditional$1.create({ condition, onTrue, onFalse });
    } else {
      return expr;
    }
  }

  binaryOperation(ctx) {
    const expr = this.visit(ctx.unaryOperation);
    let operator, type;
    if (ctx.arithmeticOperator) {
      operator = this.visit(ctx.arithmeticOperator);
      type = ArithmeticOperation;
    } else if (ctx.comparisonOperator) {
      operator = this.visit(ctx.comparisonOperator);
      type = ComparisonOperation;
    } else {
      return expr;
    }
    const operand1 = expr;
    const operand2 = this.visit(ctx.binaryOperation);
    return type.create({ operand1, operator, operand2 });
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
      return SignOperation.create({ sign: (ctx.Minus) ? '-' : '+', operand: expr });
    } else if (ctx.Exclam) {
      return NotOperation.create({ operand: expr });
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
      return ElementAccess$1.create({ expression: expr, property, index })
    } else {
      return expr;
    }
  }

  incrementPrefix(ctx) {
    const operator = this.visit(ctx.incrementOperator);
    const lvalue = this.visit(ctx.variable);
    return IncrementOperation.create({ operator, post: false, lvalue });
  }

  incrementPostfix(ctx) {
    const lvalue = this.visit(ctx.variable);
    if (ctx.incrementOperator) {
      const operator = this.visit(ctx.incrementOperator);
      return IncrementOperation.create({ operator, post: true, lvalue });
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
    return FunctionCall$1.create({ name, args });
  }

  constructorCall(ctx) {
    const type = this.visit(ctx.type);
    const args = this.visit(ctx.argumentList);
    return ConstructorCall.create({ type, args });
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
    return VariableAccess$1.create({ name, property, index });
  }

  property(ctx) {
    return this.name(ctx.Identifier);
  }

  element(ctx) {
    return this.visit(ctx.expression);
  }

  parentheses(ctx) {
    const expression = this.visit(ctx.expression);
    return Parentheses$1.create({ expression });
  }

  ifStatement(ctx) {
    const condition = this.visit(ctx.expression);
    const statement = this.visit(ctx.statement);
    const elseClause = (ctx.elseClause) ? this.visit(ctx.elseClause) : undefined;
    return IfStatement$1.create({ condition, statement, elseClause });
  }

  elseClause(ctx) {
    const statement = this.visit(ctx.statement);
    return IfStatement$1.create({ statement });
  }

  forStatement(ctx) {
    const initializers = this.visit(ctx.forInitializer);
    const condition = this.visit(ctx.forCondition);
    const incrementals = this.visit(ctx.forIncremental);
    const statement = this.visit(ctx.statement);
    return ForStatement.create({ initializers, condition, incrementals, statement });
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
      const stmt = this.visit(ctx.expressionStatement);
      return stmt.expression;
    }
  }

  forIncremental(ctx) {
    return ctx.expression?.map(e => ExpressionStatement$1.create({ expression: this.visit(e) })) ?? [];
  }

  whileStatement(ctx) {
    const condition = this.visit(ctx.expression);
    const statement = this.visit(ctx.statement);
    return WhileStatement$1.create({ condition, statement });
  }

  doWhileStatement(ctx) {
    const condition = this.visit(ctx.expression);
    const statement = this.visit(ctx.statement);
    return DoWhileStatement.create({ condition, statement });
  }

  continueStatement(ctx) {
    return ContinueStatement$1.create({});
  }

  breakStatement(ctx) {
    return BreakStatement$1.create({});
  }

  returnStatement(ctx) {
    const expression = (ctx.expression) ? this.visit(ctx.expression) : undefined;
    return ReturnStatement$1.create({ expression });
  }

  expressionStatement(cxt) {
    const expression = this.visit(cxt.expression);
    return ExpressionStatement$1.create({ expression });
  }

  emptyStatement(ctx) {
    return EmptyStatement.create({});
  }
}

const visitor = new PixelBenderAstVisitor();

function process(cst, macroCSTs) {
  const ast = visitor.visit(cst);
  const macroASTs = macroCSTs.map(cst => visitor.visit(cst));
  return { ast, macroASTs };
}

function getPrecedence(operator) {
  switch (operator) {
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

class Node {
  static create(initializers) {
    return Object.assign(new this, initializers);
  }
}

class ModuleDefinition extends Node {
  statements;
}

class FieldDeclaration extends Node {
  type;
  name;
  defaultValue;
}

class VariableDeclaration extends Node {
  isPublic = false;
  isConstant = false;
  type;
  name;
  initializer;
}

class StructDefinition extends Node {
  isPublic = true;
  name;
  statements;
}

class FunctionDefinition extends Node {
  isPublic = false;
  type;
  name;
  receiver;
  args;
  statements;
}

class FunctionArgument extends Node {
  isComptime = false;
  type;
  name;
}

class AssignmentStatement extends Node {
  operator;
  lvalue;
  rvalue;
}

class StatementBlock extends Node {
  statements;
}

class IfStatement extends Node {
  condition;
  statement;
  elseClause;
}

class WhileStatement extends Node {
  condition;
  statement;
}

class BreakStatement extends Node {
}

class ContinueStatement extends Node {
}

class ReturnStatement extends Node {
  expression;
}

class ExpressionStatement extends Node {
  expression;
}

class BlankLine extends Node {
}

class Expression extends Node {
  type;

  isScalar() { return isScalar(this.type ) }
  isVector() { return isVector(this.type ) }
  isMatrix() { return isMatrix(this.type ) }
  getVectorWidth() { return getVectorWidth(this.type) }
  getVectorIndices() { return getVectorIndices(this.type) }
  getChildType() { return getChildType(this.type) }
  getScalarType() { return getScalarType(this.type) }
}

class TupleLiteral extends Expression {
  initializers;
}

class StructLiteral extends Expression {
  initializers;
}

class Literal extends Expression {
  value;
}

class FunctionCall extends Expression {
  receiver;
  name;
  args;
}

class VariableAccess extends Expression {
  name;
}

class ElementAccess extends Expression {
  expression;
  index;
}

class BinaryOperation extends Expression {
  operator;
  operand1;
  operand2;
}

class UnaryOperation extends Expression {
  operator;
  operand;
}

class Conditional extends Expression {
  condition;
  onTrue;
  onFalse;
}

class Parentheses extends Expression {
  expression;
}

class ArrayType extends Expression {
  type = 'type';
  index;
  childType;
}
class Comment extends Node {
  text;
}

function isVector(type) {
  return /^@Vector\(/.test(type);
}

function isMatrix(type) {
  return /^\[\d+\]@Vector\(/.test(type);
}

function isScalar(type) {
  return /^\w+$/.test(type);
}

function getVectorWidth(type) {
  const m1 = /^@Vector\((\d+)/.exec(type);
  if (m1) {
    return parseInt(m1[1]);
  }
  const m2 = /^Image(\d+)$/.exec(type);
  if (m2) {
    return parseInt(m2[1]);
  }
  return 1;
}

function getScalarType(type) {
  if (isVector(type)) {
    return getChildType(type);
  } else if (isMatrix(type)) {
    return getChildType(getChildType(type));
  } else {
    return type;
  }
}

function getVectorIndices(type) {
  const width = getVectorWidth(type);
  const indices = [];
  for (let i = 0; i < width; i++) {
    indices.push(i);
  }
  return indices;
}

function getChildType(type) {
  if (typeof(type) === 'object') {
    return type.childType;
  }
  const m1 = /^\[.*?\](.*)/.exec(type);
  if (m1) {
    return m1[1];
  }
  const m2 = /^@Vector\(.*?, (.*?)\)/.exec(type);
  if (m2) {
    return m2[1];
  }
}

function changeVectorWidth(type, width) {
  const typeC = getChildType(type);
  return `@Vector(${width}, ${typeC})`;
}

class PixelBenderToZigTranslator {
  pbAST;
  pbMacroASTs;
  scopeStack = [];
  functions = map(builtInFunctions, (f) => { return { ...f } });
  variables = {};
  variableAliases = [];
  constants = [];
  sideEffects;
  currentFunctionName;
  options;

  constructor(ast, macroASTs, options = {}) {
    this.pbAST = ast;
    this.pbMacroASTs = macroASTs;
    this.options = options;
  }

  translate() {
    const {
      kernelOnly = false,
      inputPixelType = 'u8',
      outputPixelType = 'u8',
    } = this.options;
    const statements = [
      this.createComment(`Pixel Bender kernel "${this.pbAST.name}" (translated using pb2zig)`),
      this.createImport('std'),
      this.createBlankLine(),
      this.translateKernel(),
    ];
    if (!kernelOnly) {
      statements.push(this.includeProcessFunctions(inputPixelType, outputPixelType));
    }

    return ModuleDefinition.create({ statements });
  }

  startScope() {
    const { variables, currentFunctionName } = this;
    this.scopeStack.push({ variables, currentFunctionName });
    this.variables = map(variables, (v) => {
      if (v.shadow || v.scope === 'local' || v.scope === 'global') {
        return v;
      }
      return { ...v, used: false, shadow: true };
    });
  }

  endScope() {
    const { variables, currentFunctionName } = this.scopeStack.pop();
    this.variables = variables;
    this.currentFunctionName = currentFunctionName;
  }

  expandAssignmentOperation({ lvalue, operator, rvalue }) {
    const expression = ArithmeticOperation.create({
      operator: operator.charAt(0),
      operand1: lvalue,
      operand2: rvalue,
    });
    return AssignmentOperation.create({ operator: '=', lvalue, rvalue: expression });
  }

  createTempVariable(pb, initializer, aliasing = false) {
    let count = 1;
    let name;
    do {
      name = `tmp${count++}`;
    } while(this.variables[name]);
    const { type } = initializer;
    this.variables[name] = { type, scope: 'local', mutable: false, pointer: false, used: true };
    this.sideEffects.push(VariableDeclaration.create({ name, initializer, isConstant: true }));
    const tmp = VariableAccess.create({ name, type });
    if (aliasing) {
      this.variableAliases.unshift({ pb, tmp });
    }
    return tmp;
  }

  findTempVariable(pb) {
    const json = JSON.stringify(pb);
    const entry = this.variableAliases.find(e => json === JSON.stringify(e.pb));
    if (entry) {
      const { tmp } = entry;
      return tmp;
    }
  }

  createComment(text) {
    return Comment.create({ text });
  }

  createImport(name) {
    return VariableDeclaration.create({
      name,
      initializer: FunctionCall.create({ name: '@import', args: [
        Literal.create({ value: name, type: '[]const u8' }),
      ]}),
      isConstant: true,
    });
  }

  createBlankLine() {
    return BlankLine.create();
  }

  createIgnoreStatement(expression) {
    return AssignmentStatement.create({
      lvalue: '_',
      operator: '=',
      rvalue: expression,
    });
  }

  insertIgnoreStatements(statements, args) {
    for (const [ name, { used } ] of Object.entries(this.variables)) {
      if (!used) {
        const index = statements.findIndex(s => s instanceof VariableDeclaration && s.name === name);
        if (index !== -1 || args?.find(a => a.name === name)) {
          const value = VariableAccess.create({ name });
          const ignore = this.createIgnoreStatement(value);
          statements.splice(index + 1, 0, ignore);
        }
      }
    }
    for (const [ index, statement ] of statements.entries()) {
      if (statement instanceof ExpressionStatement) {
        const { expression } = statement;
        if (expression.type !== 'void') {
          const ignore = this.createIgnoreStatement(expression);
          statements[index] = ignore;
        }
      }
    }
  }

  forceType(expression) {
    const { type } = expression;
    return FunctionCall.create({ name: '@as', args: [ type, expression ], type });
  }

  promoteExpression(expression, type, forceType = true) {
    if (expression.type === type) {
      return expression;
    }
    if (isVector(type) && expression.isScalar()) {
      const splatCall = FunctionCall.create({ name: '@splat', args: [ expression ], type });
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
    if (!argTypes) {
      throw new Error(`Not a function: ${name}`);
    }
    const types = args.map(a => a?.type);
    const findMismatch = (list) => {
      return types.findIndex((type, i) => {
        let argType = list[i];
        if (argType.charAt(0) === '*') {
          argType = argType.slice(1);
        }
        return type !== argType;
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

  convertMacro(name, argsGiven, typeExpected = undefined) {
    const macro = this.pbMacroASTs.find(m => m.name === name);
    const { args = [], expression, statements = [] } = macro;
    if (args.length !== argsGiven.length) {
      const s = (args.length > 1) ? 's' : '';
      throw new Error(`Macro ${name}() expects ${args.length} argument${s}, received ${argsGiven.length}`);
    }
    // create statement from expression
    if (expression) {
      if (typeExpected === 'void') {
        statements.push(ExpressionStatement$1.create({ expression }));
      } else {
        statements.push(ReturnStatement$1.create({ expression }));
      }
    }
    // scan the tree and find arguments that's written to
    const isWriteTarget = {};
    walk(statements, (node) => {
      if (node instanceof AssignmentOperation) {
        const { lvalue } = node;
        if (lvalue instanceof VariableAccess$1) {
          isWriteTarget[lvalue.name] = true;
        }
      }
    });
    // use the types from the arguments given
    const argsP = args.map((name, index) => {
      const type = this.translateType(argsGiven[index].type, 'zig');
      const direction = (isWriteTarget[name]) ? 'inout' : 'in';
      return FunctionArgument$1.create({ name, type, direction });
    });
    // save the current scope stack and go back to the top-level
    this.startScope();
    const savedStack = this.scopeStack;
    this.scopeStack = [];
    this.variables = savedStack[0].variables;
    const f = this.functions[name];
    // construct function definition
    const pbDef = FunctionDefinition$1.create({
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
      const [ returnStmt ] = find(definition, ReturnStatement);
      if (returnStmt) {
        f.returnType = definition.type = returnStmt.expression.type;
      } else {
        f.returnType = 'void';
      }
      f.argPointers = argTypes.map(t => t.startsWith('*'));
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

  expandMacro(name, argsGiven, typeExpected = undefined) {
    const macro = this.pbMacroASTs.find(m => m.name === name);
    const { args = [], expression, statements } = macro;
    if (args.length !== argsGiven.length) {
      const s = (args.length > 1) ? 's' : '';
      throw new Error(`Macro ${name}() expects ${args.length} argument${s}, received ${argsGiven.length}`);
    }
    const argsByName = {};
    for (const [ index, argName ] of args.entries()) {
      argsByName[argName] = argsGiven[index];
    }
    const clone = (object) => {
      if (Array.isArray(object)) {
        return object.map(clone);
      } else if (object && typeof(object) === 'object') {
        if (object instanceof VariableAccess$1) {
          const { name, property, index } = object;
          const arg = argsByName[name];
          if (arg) {
            if (property || index) {
              // access the prop of the argument
              if (arg instanceof VariableAccess$1) {
                return VariableAccess$1.create({ name: arg.name, property, index });
              } else {
                return ElementAccess$1.create({ expression: arg, property, index });
              }
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
    if (expression) {
      return clone(expression);
    } else {
      if (typeExpected !== 'void') {
        throw new Error(`Unable to expand macro: ${name}`);
      }
      // add statements as side effects of this expression and return nothing
      this.sideEffects.push(...this.translateStatements(clone(statements)));
      return Literal$1.create({ type: 'void' });
    }
  }

  translateType(type, from = 'pb') {
    if (type === undefined) {
      return undefined;
    }
    const table = {
      bool: 'bool',
      bool2: '@Vector(2, bool)',
      bool3: '@Vector(3, bool)',
      bool4: '@Vector(4, bool)',

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
    // capture side effects caused by statement
    const { sideEffects: sePrev, variableAliases: vaPrev } = this;
    this.sideEffects = [];
    this.variableAliases = [];
    let result = f.call(this, statement);
    const { sideEffects } = this;
    this.sideEffects = sePrev;
    this.variableAliases = vaPrev;
    if (result instanceof ExpressionStatement) {
      if (result.expression instanceof Literal && result.expression.type === 'void') {
        result = null;
      }
    }
    if (result) {
      // side effects come first
      return (sideEffects.length === 0) ? result : [ ...sideEffects, result ];
    } else {
      // no result, all side effects
      return sideEffects;
    }
  }

  translateKernel() {
    const statements = [
      ...this.translateGlobalConstants(),
      this.createComment('kernel information'),
      ...this.translateMetadata(),
      this.translateParameters(),
      this.translateInputs(),
      this.translateOutputs(),
      this.createBlankLine(),
      this.createComment(`generic kernel instance type`),
      this.createInstanceFunction(),
      this.createBlankLine(),
      this.createComment(`kernel instance creation function`),
      this.createCreateFunction(),
      ...this.includeCalledFunctions(),
    ];
    return VariableDeclaration.create({
      name: 'kernel',
      isPublic: true,
      isConstant: true,
      initializer: StructDefinition.create({ statements }),
    });
  }

  translateGlobalConstants() {
    // convert macros without dependencies on unknown variables into constants
    const statements = [];
    for (const pb of this.pbMacroASTs) {
      if (!pb.args && pb.expression) {
        try {
          const initializer = this.translateExpression(pb.expression);
          const { name } = pb;
          if (statements.length === 0) {
            statements.push(this.createComment('constants'));
          }
          const { type } = initializer;
          statements.push(VariableDeclaration.create({ name, type, initializer, isConstant: true }));
          this.variables[name] = { name, type, scope: 'global', mutable: false, pointer: false };
        } catch (err) {
          // if the expression uses variables not defined in the global
          // scope, it will fail and land here
        }
      }
    }
    if (statements.length > 0) {
      statements.push(this.createBlankLine());
    }
    return statements;
  }

  translateMetadata() {
    const statements = [];
    for (const [ field, literal ] of Object.entries(this.pbAST.meta)) {
      if (literal) {
        statements.push(VariableDeclaration.create({
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
    for (const pb of find(this.pbAST, Parameter)) {
      const { name, type: pbType, ...others } = pb;
      const type = this.translateType(pbType);
      const attributes = { type };
      for (const [ aname, pba ] of Object.entries(others)) {
        if (pba) {
          attributes[aname] = this.translateExpression(pba, 'comptime');
        }
      }
      initializers[name] = StructLiteral.create({
        type: '.',
        initializers: attributes,
      });
      this.variables[name] = { type, scope: 'params', mutable: false, pointer: false };
    }
    return VariableDeclaration.create({
      name: 'parameters',
      isPublic: true,
      isConstant: true,
      initializer: StructLiteral.create({
        type: '.',
        initializers,
      }),
    });
  }

  translateInputs() {
    const initializers = {};
    for (const pb of find(this.pbAST, InputDeclaration)) {
      const { name } = pb;
      const type = this.translateType(pb.type);
      const channels = getVectorWidth(type);
      const attributes = { channels: Literal.create({ value: channels, type: 'u32' }) };
      initializers[name] = StructLiteral.create({
        type: '.',
        initializers: attributes,
      });
      this.variables[name] = { type, scope: 'input', mutable: false, pointer: false };
    }
    return VariableDeclaration.create({
      name: 'inputImages',
      isPublic: true,
      isConstant: true,
      initializer: StructLiteral.create({
        type: '.',
        initializers,
      }),
    });
  }

  translateOutputs() {
    const initializers = {};
    for (const pb of find(this.pbAST, OutputDeclaration)) {
      const { name } = pb;
      const type = this.translateType(pb.type);
      const channels = getVectorWidth(type);
      const attributes = { channels: Literal.create({ value: channels, type: 'u32' }) };
      initializers[name] = StructLiteral.create({
        type: '.',
        initializers: attributes,
      });
      this.variables[name] = { type, scope: 'output', mutable: false, pointer: false };
    }
    return VariableDeclaration.create({
      name: 'outputImages',
      isPublic: true,
      isConstant: true,
      initializer: StructLiteral.create({
        type: '.',
        initializers,
      }),
    });
  }

  createCreateFunction() {
    return `
      pub fn create(input: anytype, output: anytype, params: anytype) Instance(@TypeOf(input), @TypeOf(output), @TypeOf(params)) {
        return .{
          .input = input,
          .output = output,
          .params = params,
        };
      }
    `.trim();
  }

  createInstanceFunction() {
    const args = [
      FunctionArgument.create({ isComptime: true, name: 'InputStruct', type: 'type' }),
      FunctionArgument.create({ isComptime: true, name: 'OutputStruct', type: 'type' }),
      FunctionArgument.create({ isComptime: true, name: 'ParameterStruct', type: 'type' }),
    ];
    const expression = this.translateKernelInstance();
    return FunctionDefinition.create({
      type: 'type',
      name: 'Instance',
      args,
      statements: [ ReturnStatement.create({ expression }) ],
    });
  }

  translateKernelInstance() {
    // set the types of constants now in case array-dimensions involve constants
    const constantDecls = this.translateConstantDeclarations();
    // const outCoord = `
    //   pub fn outCoord(self: *@This()) @Vector(2, f32) {
    //     return @as(@Vector(2, f32), @floatFromInt(self.outputCoord)) + @as(@Vector(2, f32), @splat(0.5));
    //   }
    // `.trim();
    const outCoord = `
      pub fn outCoord(self: *@This()) @Vector(2, f32) {
        return .{ @as(f32, @floatFromInt(self.outputCoord[0])) + 0.5, @as(f32, @floatFromInt(self.outputCoord[1])) + 0.5 };
      }
    `.trim();

    const statements = [
      ...this.translateInputOutputFields(),
      ...this.translateDependentFields(),
      ...constantDecls,
      ...this.translateDefinedFunctions(),
      this.createBlankLine(),
      outCoord,
    ];
    this.initializeConstants();
    return StructDefinition.create({ statements });
  }

  translateInputOutputFields() {
    const statements = [
      FieldDeclaration.create({ name: 'params', type: 'ParameterStruct' }),
      FieldDeclaration.create({ name: 'input', type: 'InputStruct' }),
      FieldDeclaration.create({ name: 'output', type: 'OutputStruct' }),
      FieldDeclaration.create({
        name: 'outputCoord',
        type: '@Vector(2, u32)',
        defaultValue: this.promoteExpression(Literal.create({ value: 0, type: 'u32' }), '@Vector(2, u32)', false),
      }),
      this.createBlankLine(),
    ];
    let count = 0;
    for (const [ name, { type, scope } ] of Object.entries(this.variables)) {
      if (scope === 'output') {
        if (count++ === 0) {
          statements.push(this.createComment(`output pixel`));
        }
        statements.push(FieldDeclaration.create({ name, type, defaultValue: 'undefined' }));
      }
    }
    if (count > 0) {
      statements.push(this.createBlankLine());
    }
    return statements;
  }

  translateDependentFields() {
    const decls = find(this.pbAST, DependentDeclaration);
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
    const decls = find(this.pbAST, [ ConstantDeclaration, FunctionDefinition$1 ]).filter((node) => {
      return node instanceof ConstantDeclaration;
    });
    if (decls.length === 0) {
      return [];
    }
    for (const pb of decls) {
      const { name } = pb;
      const type = this.translateType(pb.type);
      this.variables[name] = { type, scope: 'global', mutable: false, pointer: false };
    }
    return [
      this.createComment(`constants`),
      ...this.translateStatements(decls),
      this.createBlankLine(),
    ];
  }

  translateDefinedFunctions() {
    const defs = find(this.pbAST, FunctionDefinition$1);
    // set the function prototype first
    for (const pb of defs) {
      if (isUnsupported(pb.type) || pb.args.some(pb => isUnsupported(pb.type))) {
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
        callees: null,
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
        returnType: undefined,  // don't know yet--wait for call
        argTypes: (pb.args) ? undefined : false,
        argPointers: undefined,
        overloaded: false,
        receiver: undefined,
        called: false,
        callees: null,
        definition: null,
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
    const selfArg = FunctionArgument.create({ name: 'self', type: '*@This()' });
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
    const names = Object.keys(callerLists).filter(n => !!this.functions[n]?.receiver);
    for (const name of names) {
      setReceiver(name);
    }
    // fix all call sites
    const calls = find(statements, FunctionCall, true);
    const self = VariableAccess.create({ name: 'self', type: '*@This()' });
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
    const outputVariables = map(this.variables, v => (v.scope === 'output') ? v : undefined);
    const outputCount = Object.keys(outputVariables).length;
    this.currentFunctionName = name;
    this.startScope();
    // add arguments to scope
    for (const pba of pb.args) {
      const { name } = pba;
      const pointer = pba.direction.includes('out');
      const type = this.translateType(pba.type);
      this.variables[name] = { type, scope: 'local', mutable: true, pointer, used: false, modified: false };
    }
    const statements = [];
    if (name === 'evaluatePixel' && outputCount > 0) {
      const zero = Literal.create({ value: 0, type: 'f32' });
      for (const [ name, { type } ] of Object.entries(outputVariables)) {
        // clear output pixel
        AssignmentOperation.create({
          lvalue: this.resolveVariable(name),
          operator: 0,
          rvalue: Literal$1.create({ value: 0, type: 'float' }),
        });
        const width = getVectorWidth(type);
        statements.push(AssignmentStatement.create({
          lvalue: VariableAccess.create({ name: `self.${name}` }),
          operator: '=',
          rvalue: this.promoteExpression(zero, `@Vector(${width}, f32)`, false),
        }));
      }
      statements.push(this.createBlankLine());
    }
    statements.push(...this.translateStatements(pb.statements));
    if (name === 'evaluatePixel' && outputCount > 0) {
      statements.push(this.createBlankLine());
      for (const [ name, { type } ] of Object.entries(outputVariables)) {
        // write output pixel to image afterward
        const fcall = FunctionCall.create({
          receiver: this.resolveVariable(name, 'Image'),
          name: 'setPixel',
          args: [
            ...[ 0, 1 ].map(value => ElementAccess.create({
              expression: VariableAccess.create({ name: `self.outputCoord` }),
              index: Literal.create({ value, type: 'u32 '}),
              type: 'f32',
            })),
            VariableAccess.create({ name: `self.${name}` }),
          ],
          type: 'void',
        });
        statements.push(ExpressionStatement.create({ expression: fcall }));
      }
    }
    // construct the argument array, now that we know which ones will be modified
    let offset = 0;
    const args = [];
    for (const pba of pb.args) {
      let { name } = pba;
      let type = this.translateType(pba.type);
      const param = this.variables[name];
      if (param.modified && !param.pointer) {
        // add prefix to argument
        let alias = name;
        do {
          alias = `_${alias}`;
        } while (this.variables[alias]);
        // assign its value to a variable
        const initializer = VariableAccess.create({ name: alias });
        const assignment = VariableDeclaration.create({ name, initializer });
        statements.splice(offset++, 0, assignment);
        name = alias;
      }
      if (param.pointer) {
        type = `*${type}`;
      }
      args.push(FunctionArgument.create({ name, type }));
    }
    // deal with unused variables/return values
    this.insertIgnoreStatements(statements, args);
    // get the shadow variables before exiting scope
    const shadowVariables = map(this.variables, v => (v.shadow) ? v : undefined);
    this.endScope();

    // add references to fields in kernel instance
    let receiver;
    for (const [ varname, { used, scope } ] of Object.entries(shadowVariables)) {
      if (used) {
        // don't create constant copy of dependent variables for evaluateDependents()
        if (scope !== 'dependent' || name !== 'evaluateDependents') {
          const initializer = this.resolveVariable(varname, 'Image');
          const assignment = VariableDeclaration.create({ name: varname, initializer, isConstant: true });
          statements.splice(offset++, 0, assignment);
        }
        if (!receiver) {
          receiver = FunctionArgument.create({ name: 'self', type: '*@This()' });
          f.receiver = 'self';
        }
      }
    }
    f.callees = find(statements, FunctionCall).map(c => c.name);
    const isPublic = publicMethods.includes(name);
    return FunctionDefinition.create({ receiver, name, args, type, isPublic, statements });
  }

  includeCalledFunctions() {
    const statements = [];
    // get functions from file
    const codeURL = new URL('../zig/functions.zig', import.meta.url);
    const code = readFileSync(fileURLToPath(codeURL), 'utf-8');
    const regExp = /pub (fn ([^\(]+)[\s\S]*?\n})/g;
    let m;
    while (m = regExp.exec(code)) {
      // excluding "pub"
      const code = m[1], name = m[2];
      const f = this.functions[name];
      if (f.called) {
        statements.push(this.createBlankLine());
        if (statements.length === 1) {
          statements.push(this.createComment('built-in Pixel Bender functions'));
        }
        statements.push(code);
      }
    }
    return statements;
  }

  includeProcessFunctions(inputPixelType, outputPixelType) {
    const codeURL = new URL('../zig/process.zig', import.meta.url);
    const content = readFileSync(fileURLToPath(codeURL), 'utf-8');
    const marker = '//---start of code';
    const index = content.indexOf(marker);
    let code = content.substring(index + marker.length);
    code = code.replace(/InputPixelType/g, inputPixelType);
    code = code.replace(/OutputPixelType/g, outputPixelType);
    return code;
  }

  translateVariableDeclaration(pb) {
    const { name } = pb;
    const type = this.translateType(pb.type);
    const initializer = (pb.initializer) ? this.translateExpression(pb.initializer, 'comptime') : undefined;
    this.variables[name] = { type, scope: 'local', mutable: true, pointer: false, used: false, modified: false };
    return VariableDeclaration.create({ name, type, initializer });
  }

  translateConstantDeclaration(pb) {
    const { name, initializer } = pb;
    const type = this.translateType(pb.type);
    if (this.currentFunctionName) {
      this.variables[name] = { type, scope: 'local', mutable: false, pointer: false, used: false };
    } else {
      this.variables[name] = { type, scope: 'global', mutable: false, pointer: false };
    }
    // omit the initializer for now, we'll add it after functions are defined
    const decl = VariableDeclaration.create({ name, type, isConstant: true });
    this.constants.push({ decl, initializer });
    return decl;
  }

  initializeConstants() {
    for (const { decl, initializer } of this.constants) {
      decl.initializer = this.translateExpression(initializer);
    }
  }

  translateDependentDeclaration(pb) {
    const { name } = pb;
    let type = this.translateType(pb.type);
    if (pb.width) {
      const width = this.translateExpression(pb.width, 'u32');
      type = ArrayType.create({ width, childType: type });
    }
    this.variables[name] = { type, scope: 'dependent', mutable: true, pointer: false };
    return FieldDeclaration.create({ name, type, defaultValue: 'undefined' })
  }

  translateExpressionStatement(pb) {
    const expression = this.translateExpression(pb.expression, 'void');
    return ExpressionStatement.create({ expression });
  }

  createStatementBlock(statement, always = false) {
    if (statement instanceof StatementBlock) {
      return statement;
    }
    if (Array.isArray(statement)) {
      return StatementBlock.create({ statements: statement });
    } else if (always) {
      return StatementBlock.create({ statements: [ statement ] });
    }
    return statement;
  }

  translateStatementBlock(pb) {
    this.sideEffects;
    this.startScope();
    const statements = this.translateStatements(pb.statements);
    this.insertIgnoreStatements(statements);
    this.endScope();
    return StatementBlock.create({ statements });
  }

  translateIfStatement(pb) {
    const condition = (pb.condition) ? this.translateExpression(pb.condition) : null;
    const statement = this.createStatementBlock(this.translateStatement(pb.statement));
    const elseClause = (pb.elseClause) ? this.translateIfStatement(pb.elseClause) : null;
    if (!condition && !elseClause && statement instanceof IfStatement) {
      // just return the if-statement instead of adding another scope
      return statement;
    }
    return IfStatement.create({ condition, statement, elseClause });
  }

  translateCondition(pb) {
    if (!pb) {
      // always true then
      return Literal.create({ type: 'bool', value: true });
    }
    const result = this.translateExpression(pb);
    if (result instanceof Parentheses) {
      // don't need parentheses
      return result.expression;
    }
    return result;
  }

  translateForStatement(pb) {
    // need to scape loop in a block
    this.startScope();
    const initializers = this.translateStatements(pb.initializers);
    const condition = this.translateCondition(pb.condition);
    const statement = this.translateStatement(pb.statement);
    const incrementals = this.translateStatements(pb.incrementals);
    const innerBlock = this.createStatementBlock(statement, true);
    innerBlock.statements.push(...incrementals);
    const statements = [
      ...initializers,
      WhileStatement.create({ condition, statement: innerBlock  }),
    ];
    this.insertIgnoreStatements(statements);
    this.endScope();
    return StatementBlock.create({ statements });
  }

  translateWhileStatement(pb) {
    const condition = this.translateCondition(pb.condition);
    const statement = this.translateStatement(pb.statement);
    return WhileStatement.create({ condition, statement })
  }

  translateDoWhileStatement(pb) {
    // Zig doesn't actually have do-while, but it's easier to structure
    // the loop in the serialize than here
    const condition = this.translateCondition(pb.condition);
    const statement = this.translateExpression(pb.statement);
    const block = this.createStatementBlock(statement, true);
    block.statements.push(IfStatement.create({
      condition,
      statement: ContinueStatement.create(),
      elseClause: IfStatement.create({
        statement: BreakStatement.create(),
      }),
    }));
    return WhileStatement.create({
      condition: this.translateCondition(null),
      statement: block,
    });
  }

  translateBreakStatement() {
    return BreakStatement.create({});
  }

  translateContinueStatement() {
    return ContinueStatement.create({});
  }

  translateReturnStatement(pb) {
    const expression = (pb.expression) ? this.translateExpression(pb.expression) : undefined;
    return ReturnStatement.create({ expression });
  }

  translateEmptyStatement() {
    const expression = Literal.create({ type: 'void' });
    return ExpressionStatement.create({ expression });
  }

  translateExpression(expression, typeExpected) {
    const fname = `translate${expression.constructor.name}`;
    const f = this[fname];
    return f.call(this, expression, typeExpected);
  }

  translateLiteral(pb) {
    const type = this.translateType(pb.type);
    return Literal.create({ value: pb.value, type });
  }

  resolveVariable(name, typeExpected = undefined) {
    const variable = this.variables[name];
    if (!variable) {
      // maybe it's a macro that couldn't be converted to a constant
      const m = this.functions[name];
      if (m?.type === 'macro') {
        const expanded = this.expandMacro(name, [], typeExpected);
        return this.translateExpression(expanded);
      } else {
        throw new Error(`Undefined variable: ${name}`);
      }
    }
    const { type, scope, pointer, shadow } = variable;
    if (shadow) {
      if (scope === 'output' && typeExpected !== 'Image') {
        // active destination pixel
        name = `self.${name}`;
      } else if (scope === 'dependent' && this.currentFunctionName === 'evaluateDependents') {
        name = `self.${name}`;
      }
      variable.used = true;
    } else {
      if (scope === 'local') {
        if (pointer) {
          name = `${name}.*`;
        }
        variable.used = true;
      } else if (scope === 'dependent') {
        name = `self.${name}`;
      } else if (scope === 'params') {
        name = `self.params.${name}`;
      } else if (scope === 'input') {
        name = `self.input.${name}`;
      } else if (scope === 'output') {
        name = `self.output.${name}`;
      }
    }
    return VariableAccess.create({ name, type });
  }

  translateIndex(pb) {
    const expression = this.translateExpression(pb);
    if (expression instanceof Literal) {
      // a number
      return expression;
    }
    if (expression instanceof VariableAccess) {
      const variable = this.variables[expression.name];
      if (variable.scope === 'global') {
        // a constant--don't need to cast since value is comptime known
        return expression;
      }
    }
    // need to use @intCast() on int, since usize is required
    return FunctionCall.create({ name: '@intCast', args: [ expression ], type: 'u32' });
  }

  translateVariableAccess(pb, typeExpected) {
    if (typeExpected !== 'void') {
      const tmp = this.findTempVariable(pb);
      if (tmp) {
        return tmp;
      }
    }
    const value = this.resolveVariable(pb.name, typeExpected);
    const { property } = pb;
    const index = (pb.index) ? this.translateIndex(pb.index) : undefined;
    if (property || index) {
      return this.createElementAccess(value, property, index);
    } else {
      return value;
    }
  }

  createElementAccess(expression, property, index) {
    if (property) {
      const indices = getSwizzleIndices(property);
      if (indices.length > 1) {
        const type = changeVectorWidth(expression.type, indices.length);
        const mask = TupleLiteral.create({
          type: `@Vector(${indices.length}, i32)`,
          initializers: indices.map(i => Literal.create({ value: i, type: 'i32' })),
        });
        const name = '@shuffle';
        const args = [ expression.getChildType(), expression, 'undefined', mask ];
        return FunctionCall.create({ name, args, type });
      } else {
        const index = Literal.create({ value: indices[0], type: 'u32' });
        const type = expression.getChildType();
        return ElementAccess.create({ expression, index, type });
      }
    } else {
      const type = expression.getChildType();
      return ElementAccess.create({ expression, index, type });
    }
  }

  translateElementAccess(pb) {
    const expression = this.translateExpression(pb.expression);
    const { property } = pb;
    const index = (pb.index) ? this.translateIndex(pb.index) : undefined;
    return this.createElementAccess(expression, property, index);
  }

  translateIncrementOperation(pb, typeExpected) {
    const lvalue = this.translateExpression(pb.lvalue, typeExpected);
    const typeP = this.translateType(lvalue.getScalarType(), 'zig');
    const assignment = AssignmentOperation.create({
      lvalue: pb.lvalue,
      operator: pb.operator.charAt(0) + '=',
      rvalue: Literal$1.create({ value: 1, type: typeP })
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
        // macro cannot be converted to a function, probably because
        // it has local dependents--expand and evaluate instead
        const expanded = this.expandMacro(name, pb.args, typeExpected);
        return this.translateExpression(expanded);
      }
    }
    if (name === 'sample') {
      name = 'sampleLinear';
    } else if (name === 'atan' && args.length === 2) {
      name = 'atan2';
    }
    const f = this.functions[name];
    const type = this.getReturnType(name, args);
    if (f.overloaded) {
      // ensure that we don't pass a comptime_int or comptime_float as the
      // argument from which the return type is obtained
      if (f.returnTypeSource !== undefined) {
        const argRTS = args[f.returnTypeSource];
        if (argRTS instanceof Literal && argRTS.isScalar()) {
          args[f.returnTypeSource] = this.forceType(argRTS);
        }
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
        const [ va ] = find(arg, VariableAccess);
        if (va) {
          this.variables[va.name].modified = true;
        }
        return UnaryOperation.create({ operator: '&', operand: arg, type: `*${arg.type}` });
      }
      return arg;
    });
    f.called  = true;
    return FunctionCall.create({ receiver, name, args, type });
  }

  translateConstructorCall(pb, typeExpected) {
    const args = pb.args.map(a => this.translateExpression(a));
    const type = this.translateType(pb.type);
    if (isMatrix(type)) {
      const typeV = getChildType(type);
      const typeE = getChildType(typeV);
      const width = getVectorWidth(typeV);
      const initializers = [];
      if (args[0].isVector())  {
        initializers.push(...args.map(a => this.convertExpression(a, typeV, 'comptime')));
      } else if (args.length === 1) {
        let arg = args[0];
        if (arg.isMatrix(arg)) {
          return arg;
        } else {
          if (typeExpected === 'comptime' && arg instanceof Literal) {
            const initializers = [];
            for (let i = 0; i < width; i++) {
              initializers.push(arg);
            }
            arg = TupleLiteral.create({ type: '.', initializers });
          } else {
            arg = this.promoteExpression(this.convertExpression(arg, typeE), typeV);
          }
          for (let i = 0; i < width; i++) {
            initializers.push(arg);
          }
        }
      } else {
        for (let i = 0, j = 0; i < width; i++, j += width) {
          const slice = args.slice(j, j + width).map(a => this.convertExpression(a, typeE));
          initializers.push(TupleLiteral.create({ initializers: slice, type: '.'}));
        }
      }
      return TupleLiteral.create({ initializers, type: (typeExpected === 'comptime') ? '.' : type });
    } else if (isVector(type)) {
      const typeE = getChildType(type);
      if (args.length === 1) {
        const arg = args[0];
        const width = getVectorWidth(type);
        if (arg.isScalar()) {
          if (typeExpected === 'comptime' && arg instanceof Literal) {
            const initializers = [];
            for (let i = 0; i < width; i++) {
              initializers.push(this.convertExpression(arg, typeE));
            }
            return TupleLiteral.create({ initializers, type: (typeExpected !== 'comptime') ? type : '.' });
          } else {
            return this.promoteExpression(this.convertExpression(arg, typeE), type, typeExpected !== 'comptime');
          }
        } else {
          return this.convertExpression(arg, type, typeExpected);
        }
      } else {
        return TupleLiteral.create({
          initializers: args.map(a => this.convertExpression(a, typeE)),
          type: (typeExpected === 'comptime') ? '.' : type
        });
      }
    } else {
      return this.convertExpression(args[0], type, typeExpected);
    }
  }

  convertExpression(value, type, typeExpected) {
    if (type === value.type) {
      if (typeExpected === 'comptime') {
        if (value instanceof TupleLiteral) {
          const { initializers } = value;
          return TupleLiteral.create({ type: '.', initializers });
        }
      }
      return value;
    }
    if (value instanceof Literal) {
      return this.convertLiteral(value, type);
    } if (value instanceof TupleLiteral) {
      return this.convertTupleLiteral(value, type, typeExpected)
    }else {
      return this.createCastExpression(value, type, typeExpected);
    }
  }

  convertLiteral(literal, type) {
    let value;
    if (type === 'bool') {
      value = literal.value !== 0;
    } else if (type === 'f32') {
      value = Number(literal.value);
    } else if (type === 'i32') {
      value = Math.floor(literal.value);
    } else {
      const typeP1 = this.translateType(literal.type, 'zig');
      const typeP2 = this.translateType(type, 'zig');
      throw new Error(`Unable to convert from ${typeP1} to ${typeP2}`);
    }
    return Literal.create({ value, type });
  }

  convertTupleLiteral(literal, type, typeExpected) {
    const typeE = getChildType(type);
    const initializers = literal.initializers.map(i => this.convertExpression(i, typeE));
    return TupleLiteral.create({ initializers, type: (typeExpected === 'comptime') ? '.' : type });
  }

  createCastExpression(value, type, typeExpected) {
    if (isVector(type) && value.isVector()) {
      const typeE = getChildType(type);
      if (typeE === 'bool') {
        const valueTypeE = value.getChildType();
        const width = value.getVectorWidth();
        const zero = Literal.create({ value: 0, type: valueTypeE });
        const zeroV = this.promoteExpression(zero, `@Vector(${width}, ${zero.type})`, true);
        const expression = BinaryOperation.create({ operand1: value, operator: '!=', operand2: zeroV });
        // need parentheses in the expression is operated upon
        return Parentheses.create({ expression });
      } else if (typeE === 'f32') {
        // if (value.getChildType() === 'i32') {
        //   return this.forceType(ZIG.FunctionCall.create({ name: '@floatFromInt', args: [ value ], type }));
        // } else if (value.getChildType() === 'bool') {
        //   const width = value.getVectorWidth();
        //   const valueInt = this.createCastExpression(value, `@Vector(${width}, i32)`);
        //   return this.forceType(ZIG.FunctionCall.create({ name: '@floatFromInt', args: [ valueInt ], type }));
        // }
        if (value.getChildType() === 'i32') {
          this.functions.floatVectorFromIntVector.called = true;
          return FunctionCall.create({ name: 'floatVectorFromIntVector', args: [ value ], type });
        } else if (value.getChildType() === 'bool') {
          const width = value.getVectorWidth();
          const valueInt = this.createCastExpression(value, `@Vector(${width}, i32)`);
          this.functions.floatVectorFromIntVector.called = true;
          return FunctionCall.create({ name: 'floatVectorFromIntVector', args: [ valueInt ], type });
        }
      } else if (typeE === 'i32') {
        // if (value.getChildType() === 'f32') {
        //   return this.forceType(ZIG.FunctionCall.create({ name: '@intFromFloat', args: [ value ], type }));
        // } else if (value.getChildType() === 'bool') {
        //   return this.forceType(ZIG.FunctionCall.create({ name: '@intFromBool', args: [ valueInt ], type }));
        // }
        if (value.getChildType() === 'f32') {
          return FunctionCall.create({ name: 'intVectorFromFloatVector', args: [ value ], type });
        } else if (value.getChildType() === 'bool') {
          return FunctionCall.create({ name: 'intVectorFromBoolVector', args: [ value ], type });
        }
      }
    } else if (isScalar(type) && value.isScalar()) {
      if (type === 'bool') {
        const zero = Literal.create({ value: 0, type: value.type });
        const expression = BinaryOperation.create({ operand1: value, operator: '!=', operand2: zero });
        return Parentheses.create({ expression });
      } else if (type === 'f32') {
        if (value.type === 'i32') {
          const result = FunctionCall.create({ name: '@floatFromInt', args: [ value ], type });
          return (typeExpected !== 'comptime') ? this.forceType(result) : result;
        } else if (value.type === 'bool') {
          const valueInt = this.createCastExpression(value, `i32`, 'comptime');
          const result = FunctionCall.create({ name: '@floatFromInt', args: [ valueInt ], type });
          return (typeExpected !== 'comptime') ? this.forceType(result) : result;
        }
      } else if (type === 'i32') {
        if (value.type === 'f32') {
          const result = FunctionCall.create({ name: '@intFromFloat', args: [ value ], type });
          return (typeExpected !== 'comptime') ? this.forceType(result) : result;
        } else if (value.type === 'bool') {
          const result = FunctionCall.create({ name: '@intFromBool', args: [ value ], type });
          return (typeExpected !== 'comptime') ? this.forceType(result) : result;
        }
      }
    }
    const typeP1 = this.translateType(value.type, 'zig');
    const typeP2 = this.translateType(type, 'zig');
    throw new Error(`Unable to convert from ${typeP1} to ${typeP2}`);
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
      this.functions[name].called = true;
      return FunctionCall.create({ name, args, type });
    }
    // promote scalar to vector
    if (operand1.isScalar() && operand2.isVector()) {
      operand1 = this.promoteExpression(operand1, operand2.type);
    } else if (operand1.isVector() && operand2.isScalar()) {
      operand2 = this.promoteExpression(operand2, operand1.type);
    }
    const { type } = operand1;
    return BinaryOperation.create({ operand1, operator, operand2, type });
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
    }    const operand1 = this.translateExpression(pb.operand1);
    const operand2 = this.translateExpression(pb.operand2);
    if (operand1.isMatrix()) {
      if (!operand2.isMatrix()) {
        throw new Error('Invalid matrix comparison');
      }
      // matrix comparison requires function calls
      const name = `@"M ${operator} M"`;
      const args = [ operand1, operand2 ];
      const type = this.getReturnType(name, args);
      return FunctionCall.create({ name, args, type });
    } else if (operand1.isVector()) {
      if (!operand2.isVector()) {
        throw new Error('Invalid vector comparison');
      }
      // vector comparisons yield vector of bool, need to reduce them
      const name = `@reduce`;
      const args = [ '.And', BinaryOperation.create({ operand1, operator, operand2 }) ];
      return FunctionCall.create({ name, args, type: 'bool' });
    } else {
      return BinaryOperation.create({ operand1, operator, operand2 });
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
    if (lvalue instanceof FunctionCall) {
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
      const indicesL = getSwizzleIndices(pb.lvalue.property);
      let sourceR, indicesR;
      if (pb.rvalue instanceof VariableAccess$1 && pb.rvalue.property) {
        // the right size is a property too, get the indices of its elements
        sourceR = this.resolveVariable(pb.rvalue.name);
        indicesR = getSwizzleIndices(pb.rvalue.property);
      } else {
        // use a list of sequential indices
        sourceR = rvalue;
        indicesR = rvalue.getVectorIndices();
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
      const mask = TupleLiteral.create({
        type: `@Vector(${indicesM.length}, i32)`,
        initializers: indicesM.map(i => Literal.create({ value: i, type: 'i32' })),
      });
      const name = '@shuffle';
      const args = [ variableL.getChildType(), variableL, sourceR, mask ];
      const { type } = lvalue;
      const shuffleCall = FunctionCall.create({ name, args, type });
      // make the change (to the whole vector)
      this.sideEffects.push(AssignmentStatement.create({ lvalue: variableL, operator, rvalue: shuffleCall }));
    } else {
      // perform normally
      this.sideEffects.push(AssignmentStatement.create({ lvalue, operator, rvalue }));
    }
    this.variables[pb.lvalue.name].modified = true;
    if (typeExpected !== 'void') {
      // the expression's value is being used--need to save the value to a temporary variable
      // since the lvalue can get modified again prior to the expression being read
      return this.createTempVariable(pb.lvalue, lvalue, true);
    } else {
      // don't return anything when nothing is expected
      return Literal.create({ type: 'void' });
    }
  }

  translateSignOperation(pb) {
    const operand = this.translateExpression(pb.operand);
    const { sign } = pb;
    const { type } = operand;
    if (sign === '+') {
      return operand;
    }
    if (operand instanceof Literal) {
      const value = -operand.value;
      return Literal.create({ value, type });
    }
    return UnaryOperation.create({ operator: sign, operand, type });
  }

  translateNotOperation(pb) {
    const operand = this.translateExpression(pb.operand);
    const { type } = operand;
    if (operand instanceof Literal) {
      const value = !operand.value;
      return Literal.create({ value, type });
    }
    return UnaryOperation.create({ operator: '!', operand, type });
  }

  translateParentheses(pb) {
    const expression = this.translateExpression(pb.expression);
    if (expression instanceof FunctionCall || expression instanceof VariableAccess) {
      // don't need the parentheses
      return expression;
    }
    const { type } = expression;
    return Parentheses.create({ expression, type });
  }

  translateConditional(pb, typeExpected) {
    const condition = this.translateExpression(pb.condition);
    const onTrue = this.translateExpression(pb.onTrue);
    const onFalse = this.translateExpression(pb.onFalse);
    const { type } = onTrue;
    let value = Conditional.create({ condition, onTrue, onFalse, type });
    if (typeExpected !== 'comptime') {
      if (onTrue instanceof Literal && onFalse instanceof Literal) {
        value = this.forceType(value);
      }
    }
    return value;
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
      [ float4, float4x4, float4 ],
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
    '@"S + M"': [
      [ float2x2, float, float2x2 ],
      [ float3x3, float, float3x3 ],
      [ float4x4, float, float4x4 ],
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
    // casting functions (temporary)
    floatVectorFromIntVector: [
      [ float2, int2 ],
      [ float3, int3 ],
      [ float4, int4 ],
    ],
    intVectorFromFloatVector: [
      [ int2, float2 ],
      [ int3, float3 ],
      [ int4, float4 ],
    ],
    intVectorFromBoolVector: [
      [ bool2, int2 ],
      [ bool3, int3 ],
      [ bool4, int4 ],
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

function translate(ast, macroASTs, options) {
  const translater = new PixelBenderToZigTranslator(ast, macroASTs, options);
  return translater.translate();
}

class ZigSerializer {
  ast;
  macroASTs;

  constructor(ast) {
    this.ast = ast;
  }

  serialize() {
    let indent = 0;
    const text = this.serializeStatements(this.ast.statements);
    const lines = text.split('\n').map((line) => {
      line = line.trim();
      if (!line) {
        return line;
      }
      let indentForLine = indent;
      if (line.startsWith('}')) {
        indentForLine--;
      }
      for (const c of line) {
        if (c === '{') {
          indent++;
        } else if (c === '}') {
          indent--;
        }
      }
      const spaces = ' '.repeat(Math.max(0, indentForLine * 4));
      return spaces + line;
    });
    return lines.join('\n');
  }

  serializeList(open, items, close) {
    if (items.length === 0) {
      return `${open}${close}`;
    }
    const list = items.join(', ');
    if (list.length <= 20) {
      return `${open} ${list} ${close}`;
    }
    return [
      open,
      ...items.map(i => `${i},`),
      close,
    ].join('\n');
  }

  serializeStatements(statements) {
    return statements.map(s => this.serializeStatement(s)).filter(s => s !== undefined).join('\n');
  }

  serializeStatement(statement) {
    if (typeof(statement) === 'string') {
      return statement;
    }
    const fname = `serialize${statement.constructor.name}`;
    const f = this[fname];
    return f.call(this, statement);
  }

  serializeVariableDeclaration({ type, isPublic, isConstant, name, initializer }) {
    const valueR = (initializer) ? this.serializeExpression(initializer, type) : 'undefined';
    const prefixes = [];
    if (isPublic) {
      prefixes.push('pub');
    }
    prefixes.push(isConstant ? 'const' : 'var');
    if (type) {
      return `${prefixes.join(' ')} ${name}: ${type} = ${valueR};`;
    } else {
      return `${prefixes.join(' ')} ${name} = ${valueR};`;
    }
  }

  serializeFieldDeclaration({ type, name, defaultValue }) {
    const valueR = (defaultValue) ? this.serializeExpression(defaultValue, type) : undefined;
    if (typeof(type) === 'object') {
      type = this.serializeExpression(type);
    }
    if (valueR) {
      return `${name}: ${type} = ${valueR},`;
    } else {
      return `${name}: ${type},`;
    }
  }

  serializeArrayType({ width, childType }) {
    return `[${this.serializeExpression(width)}]${childType}`;
  }

  serializeStructDefinition({ name, isPublic, statements }) {
    return [
      `struct {`,
      this.serializeStatements(statements),
      `}`
    ].join('\n');
  }

  serializeFunctionDefinition({ name, isPublic, receiver, args, type, statements }) {
    const prefix = (isPublic) ? 'pub ' : '';
    if (receiver) {
      args = [ receiver, ...args ];
    }
    const argList = args.map(a => this.serializeExpression(a));
    return [
      `${prefix}fn ${name}(${argList.join(', ')}) ${type} {`,
      this.serializeStatements(statements),
      `}`
    ].join('\n');
  }

  serializeFunctionArgument({ isComptime, name, type }) {
    return (isComptime ? 'comptime ' : '') + `${name}: ${type}`;
  }

  serializeComment({ text }) {
    return text.split('\n').map(line => `// ${line}`).join('\n');
  }

  serializeAssignmentStatement({ lvalue, operator, rvalue }) {
    const l = this.serializeExpression(lvalue);
    const r = this.serializeExpression(rvalue);
    return `${l} ${operator} ${r};`;
  }

  serializeStatementBlock({ statements }) {
    return [
      `{`,
      this.serializeStatements(statements),
      `}`,
    ].join('\n');
  }

  serializeIfStatement({ condition, statement, elseClause }) {
    let code;
    const s = this.serializeStatement(statement);
    if (condition) {
      const c = this.serializeExpression(condition);
      code = `if (${c}) ${s}`;
    } else {
      code = s;
    }
    if (elseClause) {
      if (code.endsWith(';')) {
        code = code.slice(0, -1);
      }
      const e = this.serializeStatement(elseClause);
      code += ` else ${e}`;
    }
    return code;
  }

  serializeWhileStatement({ condition, statement }) {
    const c = this.serializeExpression(condition);
    const s = this.serializeExpression(statement);
    return `while (${c}) ${s}`;
  }

  serializeBreakStatement() {
    return `break;`;
  }

  serializeContinueStatement() {
    return `continue;`;
  }

  serializeReturnStatement({ expression }) {
    if (expression) {
      return `return ${this.serializeExpression(expression)};`;
    } else {
      return `return;`;
    }
  }

  serializeBlankLine() {
    return ``;
  }

  serializeExpressionStatement({ expression }) {
    const code = this.serializeExpression(expression);
    return `${code};`;
  }

  serializeExpression(expression) {
    if (typeof(expression) === 'string') {
      return expression;
    }
    const fname = `serialize${expression.constructor.name}`;
    const f = this[fname];
    return f.call(this, expression);
  }

  serializeTupleLiteral({ type, initializers }) {
    const items = initializers.map(i => this.serializeExpression(i));
    return this.serializeList(`${type}{`, items, `}`);
  }

  serializeStructLiteral({ type, initializers }) {
    const pairs = Object.entries(initializers).map(([ name, item ]) => {
      return `.${name} = ${this.serializeExpression(item)}`;
    });
    return this.serializeList(`${type}{`, pairs, `}`);
  }

  serializeLiteral({ value, type }) {
    if (/^f\d+$/.test(type)) {
      let s = value.toString();
      if (s.indexOf('.') === -1) {
        s = value.toFixed(1);
      }
      return s;
    } else if (/^[iu]\d+$/.test(type)) {
      return value;
    } else {
      return JSON.stringify(value);
    }
  }

  serializeVariableAccess({ name }) {
    return name;
  }

  serializeElementAccess({ expression, index }) {
    const e = this.serializeExpression(expression);
    const i = this.serializeExpression(index);
    return `${e}[${i}]`;
  }

  serializeFunctionCall({ receiver, name, args }) {
    let n = name;
    if (receiver) {
      n = `${this.serializeExpression(receiver)}.${name}`;
    }
    const a = args.map(a => this.serializeExpression(a));
    return `${n}(${a.join(', ')})`;
  }

  serializeParentheses({ expression }) {
    return `(${this.serializeExpression(expression)})`;
  }

  serializeConditional({ condition, onTrue, onFalse }) {
    const c = this.serializeExpression(condition);
    const t = this.serializeExpression(onTrue);
    const f = this.serializeExpression(onFalse);
    return `if (${c}) ${t} else ${f}`;
  }

  serializeBinaryOperation({ operand1, operator, operand2 }) {
    const op1 = this.serializeExpression(operand1);
    const op2 = this.serializeExpression(operand2);
    return `${op1} ${operator} ${op2}`;
  }

  serializeUnaryOperation({ operator, operand }) {
    const op = this.serializeExpression(operand);
    return `${operator}${op}`;
  }
}

function serialize(ast) {
  const serializez = new ZigSerializer(ast);
  return serializez.serialize();
}

function convertPixelBender(code, options) {
  const { cst, macroCSTs, lexErrors, parseErrors } = parse(code);
  const errCount = lexErrors.length + parseErrors.length;
  if (errCount > 0) {
    const msgs = [];
    for (const err of lexErrors) {
      const { message, line, column } = err;
      msgs.push(`   [LEXER]: ${message} at line ${line}, column ${column}`);
    }
    for (const err of parseErrors) {
      const { message, token: { startLine, startColumn } } = err;      msgs.push(`  [PARSER]: ${message} at line ${startLine}, column ${startColumn}`);
    }
    const s = (errCount > 1) ? 's' : '';
    throw new Error(`${errCount} error${s} encountered parsing Pixel Bender code:\n\n${msgs.join('\n')}`);
  }
  const { ast, macroASTs } = process(cst, macroCSTs);
  const zigAST = translate(ast, macroASTs, options);
  return serialize(zigAST);
}

export { convertPixelBender };
