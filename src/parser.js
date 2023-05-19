import { CstParser, Lexer, createToken } from 'chevrotain';

const T = {
  WhiteSpace: createToken({
    name: 'WhiteSpace',
    pattern: /[ \t\n\r]+/,
    group: Lexer.SKIPPED
  }),
  NumberLiteral: createToken({
    name: 'NumberLiteral',
    pattern: /-?(0|[1-9]\d*)(\.\d+)?([eE][+-]?\d+)?/
  }),

  Identifier: createToken({ name: 'Identifier', pattern: /[_a-z]\w*/ }),

  LCurly: createToken({ name: 'LCurly', pattern: /{/ }),
  RCurly: createToken({ name: 'RCurly', pattern: /}/ }),
  LSquare: createToken({ name: 'LSquare', pattern: /\[/ }),
  RSquare: createToken({ name: 'RSquare', pattern: /]/ }),
  LParen: createToken({ name: 'LParen', pattern: /\(/ }),
  RParen: createToken({ name: 'RParen', pattern: /)/ }),
  Period: createToken({ name: 'Period', pattern: /./ }),
  Comma: createToken({ name: 'Comma', pattern: /,/ }),
  Colon: createToken({ name: 'Colon', pattern: /:/ }),
  Semicolon: createToken({ name: 'Semicolon', pattern: /;/ }),
  Exclam: createToken({ name: 'Exclam', pattern: /!/ }),
  Question: createToken({ name: 'Question', pattern: /\?/ }),

  Plus: createToken({ name: 'Plus', pattern: /\+/ }),
  Minus: createToken({ name: 'Minus', pattern: /\-/ }),
  Multiply: createToken({ name: 'Multiply', pattern: /\*/ }),
  Divide: createToken({ name: 'Plus', pattern: /\// }),
  Equal: createToken({ name: 'Equal', pattern: /=/ }),
  LessThan: createToken({ name: 'LessThan', pattern: /</ }),
  GreaterThan: createToken({ name: 'GreaterThan', pattern: />/ }),
  DblEql: createToken({ name: 'DblEqual', pattern: /==/ }),
  ExclamEql: createToken({ name: 'ExclamEql', pattern: /!=/ }),
  PlusEql: createToken({ name: 'PlusEql', pattern: /+=/ }),
  MinusEql: createToken({ name: 'MinusEql', pattern: /-=/ }),
  MultiplyEql: createToken({ name: 'MultiplyEql', pattern: /\*=/ }),
  DivideEql: createToken({ name: 'PlusEql', pattern: /\/=/ }),
  LtEql: createToken({ name: 'LtEql', pattern: /<=/ }),
  GtEql: createToken({ name: 'GtEql', pattern: />=/ }),
  DblPlus: createToken({ name: 'DblPlus', pattern: /++/ }),
  DblAmp: createToken({ name: 'DblAnd', pattern: /&&/ }),
  DblPipe: createToken({ name: 'DblPipe', pattern: /||/ }),
  DblCircum: createToken({ name: 'DblCircum', pattern: /||/ }),

  If: createToken({ name: 'If', pattern: /if/ }),
  Else: createToken({ name: 'Else', pattern: /else/ }),
  For: createToken({ name: 'For', pattern: /for/ }),
  While: createToken({ name: 'While', pattern: /while/ }),
  Do: createToken({ name: 'Do', pattern: /do/ }),
  Break: createToken({ name: 'Break', pattern: /break/ }),
  Continue: createToken({ name: 'Continue', pattern: /continue/ }),
  Return: createToken({ name: 'Return', pattern: /return/ }),

  Any: createToken({ name: 'Any', pattern: /any/ }),
  All: createToken({ name: 'All', pattern: /all/ }),
  Not: createToken({ name: 'Not', pattern: /not/ }),

  Bool: createToken({ name: 'Bool', pattern: /bool/ }),
  BoolVector: createToken({ name: 'Bool', pattern: /bool[2-4]/ }),
  Int: createToken({ name: 'Int', pattern: /int/ }),
  IntVector: createToken({ name: 'IntVector', pattern: /int([2-4])/ }),
  IntMatrix: createToken({ name: 'IntMatrix', pattern: /int([2-4])x([2-4])/ }),
  Float: createToken({ name: 'Float', pattern: /float/ }),
  FloatVector: createToken({ name: 'FloatVector', pattern: /float([2-4])/ }),
  FloatMatrix: createToken({ name: 'FloatMatrix', pattern: /int([2-4])x([2-4])/ }),
  Image: createToken({ name: 'Image', pattern: /image([2-4])/ }),
  Pixel: createToken({ name: 'Pixel', pattern: /pixel([2-4])/ }),
  Output: createToken({ name: 'Output', pattern: /output([2-4])/ }),
  String: createToken({ name: 'String', pattern: /string/ }),
  Void: createToken({ name: 'Void', pattern: /void/ }),
  Region: createToken({ name: 'Region', pattern: /region/ }),

  In: createToken({ name: 'In', pattern: /in/ }),
  Out: createToken({ name: 'Out', pattern: /out/ }),

  StringLiteral: createToken({
    name: 'StringLiteral',
    pattern: /"(?:[^\\"]|\\(?:[bfnrtv"\\/]|u[0-9a-fA-F]{4}))*"/
  }),

  True: createToken({ name: 'True', pattern: /true/ }),
  False: createToken({ name: 'False', pattern: /false/ }),

  Kernel: createToken({ name: 'Kernel', pattern: /kernel/ }),
  Parameter: createToken({ name: 'Parameter', pattern: /parameter/ }),
};

const allTokens = Object.values(T);

const lexer = new Lexer(allTokens);

class PixelBenderParser extends CstParser {
  constructor() {
    super(allTokens);
    const $ = this;
    $.RULE('pbk', () => {
      $.CONSUME($.languageVersion);
      $.CONSUME($.kernel);
    });
    $.RULE('languageVersion', () => {
      $.CONSUME(T.LessThan);
      $.CONSUME(T.Identifier);
      $.CONSUME(T.Colon);
      $.CONSUME(T.NumberLiteral);
      $.CONSUME(T.GreaterThan);
    });
    $.RULE('kernel', () => {
      $.OPTION(() => {
        $.MANY(() => $.CONSUME($.parameter));
      });
    });
    $.RULE('parameter', () => {
      $.CONSUME(T.Parameter);
      $.CONSUME($.parameterType);
      $.CONSUME(T.Identifier);
      $.CONSUME(T.LessThan);
      $.OPTION(() => {
        $.MANY(() => $.CONSUME($.parameterValue));
      });
      $.CONSUME(T.GreaterThan);
    });
    $.RULE('parameterType', () => {
      $.OR([
        { ALT: () => $.CONSUME(T.Bool) },
        { ALT: () => $.CONSUME(T.Int) },
        { ALT: () => $.CONSUME(T.Float) },
      ]);
    });
    $.RULE('parameterAttribute', () => {
      $.CONSUME(T.Identifier);
      $.CONSUME(T.Colon);
      $.CONSUME($.parameterValue);

    });
    $.RULE('parameterValue', () => {
      $.OR([
        { ALT: () => $.CONSUME(T.NumberLiteral) },
        { ALT: () => $.CONSUME(T.True) },
        { ALT: () => $.CONSUME(T.False) },
      ]);
    });
    $.RULE('value', () => {
      $.OR([
        { ALT: () => $.CONSUME(T.StringLiteral) },
        { ALT: () => $.CONSUME(T.NumberLiteral) },
        { ALT: () => $.CONSUME(T.Identifier) },
        { ALT: () => $.CONSUME(T.True) },
        { ALT: () => $.CONSUME(T.False) },
        { ALT: () => $.CONSUME(T.Null) }
      ])
    })
    this.performSelfAnalysis()
  }
}
const parser = new JsonParser()

export function parse(text) {
  const lexResult = lexer.tokenize(text)
  parser.input = lexResult.tokens
  return {
    cst: parser.pbk(),
    lexErrors: lexResult.errors,
    parseErrors: parser.errors
  };
}

