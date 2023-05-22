import { CstParser, Lexer, createToken } from 'chevrotain';

const T = {
  WhiteSpace: createToken({
    name: 'WhiteSpace',
    pattern: /[ \t\n\r]+/,
    group: Lexer.SKIPPED
  }),
  Comment: createToken({
    name: 'Comment',
    pattern: /\/\/.*/
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

  Input: createToken({ name: 'Input', pattern: /input\b/ }),
  Output: createToken({ name: 'Output', pattern: /output\b/ }),
  In: createToken({ name: 'In', pattern: /in\b/ }),
  Out: createToken({ name: 'Out', pattern: /out\b/ }),
  Kernel: createToken({ name: 'Kernel', pattern: /kernel\b/ }),
  Parameter: createToken({ name: 'Parameter', pattern: /parameter\b/ }),

  Null: createToken({ name: 'Null', pattern: /null\b/ }),
  True: createToken({ name: 'True', pattern: /true\b/ }),
  False: createToken({ name: 'False', pattern: /false\b/ }),
  Number: createToken({
    name: 'Number',
    pattern: /(0|[1-9]\d*)(\.\d+)?([eE][+-]?\d+)?/
  }),
  QuotedStr: createToken({
    name: 'QuotedStr',
    pattern: /"(?:[^\\"]|\\(?:[bfnrtv"\\/]|u[0-9a-fA-F]{4}))*"/
  }),
  Identifier: createToken({ name: 'Identifier', pattern: /[_a-zA-Z][_0-9a-zA-Z]*/ }),
};

const allTokens = Object.values(T);

const lexer = new Lexer(allTokens);

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
      $.OPTION(() => $.CONSUME(T.Minus));
      $.SUBRULE($.literalValue);
      $.CONSUME(T.Semicolon);
    });
    $.RULE('literalValue', () => {
      $.OR([
        { ALT: () => $.CONSUME(T.Number) },
        { ALT: () => $.CONSUME(T.QuotedStr) },
        { ALT: () => $.CONSUME(T.True) },
        { ALT: () => $.CONSUME(T.False) },
        { ALT: () => $.CONSUME(T.Null) },
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
        { ALT: () => $.SUBRULE($.comment) },
        { ALT: () => $.SUBRULE($.parameterDeclaration) },
        { ALT: () => $.SUBRULE($.inputDeclaration) },
        { ALT: () => $.SUBRULE($.outputDeclaration) },
        { ALT: () => $.SUBRULE($.functionDeclaration) },
      ]);
    });
    $.RULE('comment', () => {
      $.CONSUME(T.Comment);
    })
    $.RULE('parameterDeclaration', () => {
      $.CONSUME(T.Parameter);
      $.SUBRULE($.type);
      $.CONSUME(T.Identifier);
      $.SUBRULE($.tag);
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
      $.CONSUME(T.Pixel);
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
    $.RULE('returnType', () => {
      $.OR([
        { ALT: () => $.CONSUME(T.Void) },
        { ALT: () => $.SUBRULE($.type) },
      ])
    });
    $.RULE('argumentDeclaration', () => {
      $.SUBRULE($.type);
      $.CONSUME(T.Identifier);
    });
    $.RULE('statementBlock', () => {
      $.CONSUME(T.LCurly);
      $.MANY(() => $.SUBRULE($.statement));
      $.CONSUME(T.RCurly);
    });
    $.RULE('statement', () => {
      $.OR([
        { ALT: () => $.SUBRULE($.comment) },
        { ALT: () => $.SUBRULE($.statementBlock) },
        { ALT: () => $.SUBRULE($.variableDelcaration) },
        { ALT: () => $.SUBRULE($.variableAssignment) },
        { ALT: () => $.SUBRULE($.ifStatement) },
        { ALT: () => $.SUBRULE($.whileStatement) },
        { ALT: () => $.SUBRULE($.doWhileStatement) },
        { ALT: () => $.SUBRULE($.continueStatement) },
        { ALT: () => $.SUBRULE($.breakStatement) },
        { ALT: () => $.SUBRULE($.returnStatement) },
        { ALT: () => $.SUBRULE($.emptyStatement) },
      ]);
    });
    $.RULE('variableDelcaration', () => {
      $.SUBRULE($.type);
      $.AT_LEAST_ONE_SEP({
        SEP: T.Comma,
        DEF: () => $.SUBRULE($.identifierWithInit),
      });
      $.CONSUME(T.Semicolon);
    });
    $.RULE('identifierWithInit', () => {
      $.CONSUME(T.Identifier),
      $.OPTION(() => {
        $.CONSUME(T.Equal);
        $.SUBRULE($.expression);
      });
    });
    $.RULE('expression', () => {
      $.OPTION1(() => $.SUBRULE($.unaryOperators));
      $.SUBRULE($.expressionNotRecursive);
      $.OPTION2(() => {
        $.SUBRULE($.binaryOperators);
        $.SUBRULE1($.expression);
      });
      $.OPTION3(() => {
        $.CONSUME(T.Question);
        $.SUBRULE2($.expression);
        $.CONSUME(T.Colon);
        $.SUBRULE3($.expression);
      })
    });
    $.RULE('expressionNotRecursive', () => {
      $.OR([
        { ALT: () => $.SUBRULE($.expressionInParentheses) },
        { ALT: () => $.SUBRULE($.constructorCall) },
        { ALT: () => $.SUBRULE($.functionCall) },
        { ALT: () => $.SUBRULE($.propertyAccess) },
        { ALT: () => $.SUBRULE($.literalValue) },
        { ALT: () => $.SUBRULE($.variable) },
      ]);
    });
    $.RULE('expressionInParentheses', () => {
      $.CONSUME(T.LParen);
      $.SUBRULE($.expression);
      $.CONSUME(T.RParen);
    });
    $.RULE('unaryOperators', () => {
      $.OR([
        { ALT: () => $.CONSUME(T.Minus) },
        { ALT: () => $.CONSUME(T.Exclam) },
      ]);
    });
    $.RULE('binaryOperators', () => { 
      $.OR([
        { ALT: () => $.CONSUME(T.Plus) },
        { ALT: () => $.CONSUME(T.Minus) },
        { ALT: () => $.CONSUME(T.Asterisk) },
        { ALT: () => $.CONSUME(T.Slash) },
        { ALT: () => $.CONSUME(T.LAngle) },
        { ALT: () => $.CONSUME(T.RAngle) },
        { ALT: () => $.CONSUME(T.LAngleEql) },
        { ALT: () => $.CONSUME(T.RAngleEql) },
        { ALT: () => $.CONSUME(T.DblEql) },
        { ALT: () => $.CONSUME(T.ExclamEql) },
        { ALT: () => $.CONSUME(T.DblAmp) },
        { ALT: () => $.CONSUME(T.DblPipe) },
        { ALT: () => $.CONSUME(T.DblCircum) },
      ])
    });
    $.RULE('constructorCall', () => {
      $.SUBRULE($.type);
      $.CONSUME(T.LParen);
      $.SUBRULE($.argumentList);
      $.CONSUME(T.RParen);
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
    $.RULE('variableAssignment', () => {
      $.SUBRULE($.leftValue);
      $.OR([
        { ALT: () => $.CONSUME(T.Equal) },
        { ALT: () => $.CONSUME(T.PlusEql) },
        { ALT: () => $.CONSUME(T.MinusEql) },
        { ALT: () => $.CONSUME(T.AsteriskEql) },
        { ALT: () => $.CONSUME(T.SlashEql) },
      ]);
      $.SUBRULE($.expression);
      $.CONSUME(T.Semicolon);
    });
    $.RULE('leftValue', () => {
      $.OR([
        { ALT: () => $.SUBRULE($.propertyAccess) },
        { ALT: () => $.CONSUME(T.Identifier) },
      ]);
    });
    $.RULE('propertyAccess', () => {
      $.CONSUME1(T.Identifier);
      $.OR([
        { ALT: () => $.CONSUME(T.Arrow) },
        { ALT: () => $.CONSUME(T.Period) },
      ]);
      $.CONSUME2(T.Identifier);
    });
    $.RULE('variable', () => {
      $.CONSUME(T.Identifier);
    });
    $.RULE('ifStatement', () => {
      $.CONSUME(T.If);
      $.CONSUME(T.LParen);
      $.SUBRULE($.expression);
      $.CONSUME(T.RParen);
      $.SUBRULE($.statement);
      $.OPTION(() => $.SUBRULE($.elseClause));
    })
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
    $.RULE('emptyStatement', () => {
      $.CONSUME(T.Semicolon);
    });
    this.performSelfAnalysis()
  }
}
const parser = new PixelBenderParser();

export const BaseCstVisitor = parser.getBaseCstVisitorConstructor();

export function parse(text) {
  const lexResult = lexer.tokenize(text)
  parser.input = lexResult.tokens
  return {
    cst: parser.pbk(),
    lexErrors: lexResult.errors,
    parseErrors: parser.errors
  };
}
