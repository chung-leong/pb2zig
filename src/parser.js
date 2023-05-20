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
  SlashEql: createToken({ name: 'PlusEql', pattern: /\/=/ }),
  LAngleEql: createToken({ name: 'LAngleEql', pattern: /<=/ }),
  RAngleEql: createToken({ name: 'RAngleEql', pattern: />=/ }),
  DblPlus: createToken({ name: 'DblPlus', pattern: /\+\+/ }),
  DblAmp: createToken({ name: 'DblAnd', pattern: /&&/ }),
  DblPipe: createToken({ name: 'DblPipe', pattern: /\|\|/ }),
  DblCircum: createToken({ name: 'DblCircum', pattern: /\^\^/ }),

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
  Slash: createToken({ name: 'Plus', pattern: /\// }),
  Equal: createToken({ name: 'Equal', pattern: /=/ }),

  If: createToken({ name: 'If', pattern: /if/ }),
  Else: createToken({ name: 'Else', pattern: /else/ }),
  For: createToken({ name: 'For', pattern: /for/ }),
  While: createToken({ name: 'While', pattern: /while/ }),
  Do: createToken({ name: 'Do', pattern: /do/ }),
  Break: createToken({ name: 'Break', pattern: /break/ }),
  Continue: createToken({ name: 'Continue', pattern: /continue/ }),
  Return: createToken({ name: 'Return', pattern: /return/ }),

  BoolVector: createToken({ name: 'BoolVector', pattern: /bool[2-4]/ }),
  Bool: createToken({ name: 'Bool', pattern: /bool/ }),
  IntMatrix: createToken({ name: 'IntMatrix', pattern: /int([2-4])x([2-4])/ }),
  IntVector: createToken({ name: 'IntVector', pattern: /int([2-4])/ }),
  Int: createToken({ name: 'Int', pattern: /int/ }),
  FloatMatrix: createToken({ name: 'FloatMatrix', pattern: /float([2-4])x([2-4])/ }),
  FloatVector: createToken({ name: 'FloatVector', pattern: /float([2-4])/ }),
  Float: createToken({ name: 'Float', pattern: /float/ }),
  Image: createToken({ name: 'Image', pattern: /image([1-4])/ }),
  Pixel: createToken({ name: 'Pixel', pattern: /pixel([1-4])/ }),
  Output: createToken({ name: 'Output', pattern: /output/ }),
  String: createToken({ name: 'String', pattern: /string/ }),
  Void: createToken({ name: 'Void', pattern: /void/ }),
  Region: createToken({ name: 'Region', pattern: /region/ }),

  Any: createToken({ name: 'Any', pattern: /any/ }),
  All: createToken({ name: 'All', pattern: /all/ }),
  Not: createToken({ name: 'Not', pattern: /not/ }),

  Input: createToken({ name: 'Input', pattern: /input/ }),
  Output: createToken({ name: 'Output', pattern: /output/ }),
  In: createToken({ name: 'In', pattern: /in/ }),
  Out: createToken({ name: 'Out', pattern: /out/ }),
  Kernel: createToken({ name: 'Kernel', pattern: /kernel/ }),
  Parameter: createToken({ name: 'Parameter', pattern: /parameter/ }),

  Null: createToken({ name: 'Null', pattern: /null/ }),
  True: createToken({ name: 'True', pattern: /true/ }),
  False: createToken({ name: 'False', pattern: /false/ }),
  Number: createToken({
    name: 'Number',
    pattern: /(0|[1-9]\d*)(\.\d+)?([eE][+-]?\d+)?/
  }),
  QuotedStr: createToken({
    name: 'QuotedStr',
    pattern: /"(?:[^\\"]|\\(?:[bfnrtv"\\/]|u[0-9a-fA-F]{4}))*"/
  }),
  Identifier: createToken({ name: 'Identifier', pattern: /[_a-zA-Z]\w*/ }),
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
      $.SUBRULE($.literalValue);
      $.CONSUME(T.Semicolon);
    });
    $.RULE('literalValue', () => {
      $.OR([
        { ALT: () => $.SUBRULE($.numericLiteral) },
        { ALT: () => $.CONSUME(T.QuotedStr) },
        { ALT: () => $.CONSUME(T.True) },
        { ALT: () => $.CONSUME(T.False) },
        { ALT: () => $.CONSUME(T.Null) },
      ]);
    });
    $.RULE('numericLiteral', () => {
      $.OPTION(() => {
        $.OR([
          { ALT: () => $.CONSUME(T.Plus) },
          { ALT: () => $.CONSUME(T.Minus) },
        ])
      });
      $.CONSUME(T.Number);
    });
    $.RULE('kernel', () => {
      $.CONSUME(T.Kernel);
      $.CONSUME(T.Identifier);
      $.SUBRULE($.tag);
      $.SUBRULE($.kernelBody);
    });
    $.RULE('kernelBody', () => {
      $.CONSUME(T.LCurly);
      $.MANY(() => $.SUBRULE($.topLevelDeclaration));
      $.CONSUME(T.RCurly);
    });
    $.RULE('topLevelDeclaration', () => {
      $.OR([
        { ALT: () => $.SUBRULE($.parameterDeclaration) },
        { ALT: () => $.SUBRULE($.inputDeclaration) },
        { ALT: () => $.SUBRULE($.outputDeclaration) },
        { ALT: () => $.SUBRULE($.functionDeclaration) },
      ]);
    });
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
      $.SUBRULE($.argumentList);
      $.CONSUME(T.RParen);
      $.SUBRULE($.statementBlock);
    });    
    $.RULE('returnType', () => {
      $.OR([
        { ALT: () => $.CONSUME(T.Void) },
        { ALT: () => $.SUBRULE($.type) },
      ])
    });
    $.RULE('argumentList', () => {
      $.MANY_SEP({
        SEP: T.Comma,
        DEF: () => $.CONSUME(T.Identifier),
      });
    });
    $.RULE('statementBlock', () => {
      $.CONSUME(T.LCurly);
      $.MANY(() => $.SUBRULE($.statement));
      $.CONSUME(T.RCurly);
    });
    $.RULE('statement', () => {
      $.OR([
        { ALT: () => $.SUBRULE($.statementBlock) },
        { ALT: () => $.SUBRULE($.variableDelcaration) },
        //{ ALT: () => $.SUBRULE($.ifElseStatement) },
        //{ ALT: () => $.SUBRULE($.ifStatement) },
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
    });
    $.RULE('identifierWithInit', () => {
      $.CONSUME(T.Identifier),
      $.OPTION(() => {
        $.CONSUME(T.Equal);
        $.SUBRULE($.expression);
      });
    });
    $.RULE('expression', () => {
      $.CONSUME(T.Null);
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

export function parse(text) {
  const lexResult = lexer.tokenize(text)
  parser.input = lexResult.tokens
  return {
    cst: parser.pbk(),
    lexErrors: lexResult.errors,
    parseErrors: parser.errors
  };
}

