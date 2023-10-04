import { expect } from 'chai';

import { convertPixelBender } from '../src/index.js';

describe('Translator tests', function() {
  describe('Kernel info', function() {
    it('should insert kernel info', function() {
      const pbkCode = `
      <languageVersion : 1.0;>
      kernel test
      <namespace : "Test"; vendor : "Vendor"; version : 1;>
      {
        input image4 src;
        output pixel4 dst;

        void
        evaluatePixel()
        {
        }
      }
      `;
      const result = convertPixelBender(pbkCode, { kernelOnly: true });
      expect(result).to.contain('pub const namespace = "Test";');
      expect(result).to.contain('pub const vendor = "Vendor";');
      expect(result).to.contain('pub const version = 1;');
    })
    it('should correctly translate parameters', function() {
      const pbkCode = `
      <languageVersion : 1.0;>
      kernel test
      <namespace : "Test"; vendor : "Vendor"; version : 1;>
      {
        parameter float3x3 transform
        <
            minValue:float3x3(
                -1.0, -1.0, -1.0,
                -1.0, -1.0, -1.0,
                -1.0, -1.0, -1.0
            );

            maxValue:float3x3(
                1.0, 1.0, 1.0,
                1.0, 1.0, 1.0,
                1.0, 1.0, 1.0
            );
            defaultValue:float3x3(
                0.5, 0.0, 0.0,
                0.3, 1.0, 0.7,
                0.1, 0.3, 0.8
            );
        >;

        input image4 src;
        output pixel4 dst;

        void
        evaluatePixel()
        {
        }
      }
      `;
      const result = convertPixelBender(pbkCode, { kernelOnly: true });
      expect(result).to.contain('.transform = .{');
      expect(result).to.contain('.type = [3]@Vector(3, f32),');
      expect(result).to.contain('.minValue = [3]@Vector(3, f32){');
      expect(result).to.contain('.{ -1.0, -1.0, -1.0 },');
    })
    it('should correctly translate inputs and outputs', function() {
      const pbkCode = `
      <languageVersion : 1.0;>
      kernel test
      <namespace : "Test"; vendor : "Vendor"; version : 1;>
      {
        input image4 src1;
        input image3 src2;
        output pixel4 dst1;
        output pixel1 dst2;

        void
        evaluatePixel()
        {
        }
      }
      `;
      const result = convertPixelBender(pbkCode, { kernelOnly: true });
      expect(result).to.contain('pub const inputImages = .{');
      expect(result).to.contain('.src1 = .{ .channels = 4 },');
      expect(result).to.contain('.src2 = .{ .channels = 3 },');
      expect(result).to.contain('pub const outputImages = .{');
      expect(result).to.contain('.dst1 = .{ .channels = 4 },');
      expect(result).to.contain('.dst2 = .{ .channels = 1 },');
    })
  })
  describe('Assignment', function() {
    it('should correctly translate expression involving assignments', function() {
      const pbkCode = addPBKWrapper(`
        float a = 0.0;
        float b = (a = 3.0) * (a = 4.0);
      `);
      const result = convertPixelBender(pbkCode, { kernelOnly: true });
      expect(result).to.contain('const tmp1 = a;');
      expect(result).to.contain('const tmp2 = a;');
      expect(result).to.contain('var b: f32 = (tmp1) * (tmp2);');
    })
    it('should correctly translate expression involving increments', function() {
      const pbkCode = addPBKWrapper(`
        float a = 0.0;
        float b = (a++) * (++a);
      `);
      const result = convertPixelBender(pbkCode, { kernelOnly: true });
      expect(result).to.contain('const tmp1 = a;');
      expect(result).to.contain('const tmp2 = a;');
      // increments occur one after the other
      expect(result).to.match(/a \+= 1\.0;\s+a \+= 1\.0;/);
      expect(result).to.contain('var b: f32 = (tmp1) * (tmp2);');
    })
  })
  describe('Swizzling operations', function() {
    it('should correctly translate V.[property]', function() {
      const pbkCode = addPBKWrapper(`
        float4 v1 = float4(1, 1, 1, 1);
        float2 v2 = v1.ra;
        float4 v3 = v1.abgr;
      `);
      const result = convertPixelBender(pbkCode, { kernelOnly: true });
      expect(result).to.contain('@shuffle(f32, v1, undefined, @Vector(2, i32){ 0, 3 })');
      expect(result).to.contain('@shuffle(f32, v1, undefined, @Vector(4, i32){ 3, 2, 1, 0 })');
    })
    it('should correctly translate V.[property] = V', function() {
      const pbkCode = addPBKWrapper(`
        float4 v1 = float4(1, 1, 1, 1);
        float2 v2 = float2(2, 2);
        float3 v3 = float3(4, 5, 6);
        v1.bg = v2;
        v1.rgb = v3;
      `);
      const result = convertPixelBender(pbkCode, { kernelOnly: true });
      expect(result).to.contain('@shuffle(f32, v1, v2, @Vector(4, i32){ 0, -2, -1, 3 })');
      expect(result).to.contain('@shuffle(f32, v1, v3, @Vector(4, i32){ -1, -2, -3, 3 })');
    })
    it('should correctly translate V.[property] = S', function() {
      const pbkCode = addPBKWrapper(`
        float4 v = float4(1, 1, 1, 1);
        v.bg = 4.0;
        v.rgb = 3.0;
      `);
      const result = convertPixelBender(pbkCode, { kernelOnly: true });
      expect(result).to.contain('@shuffle(f32, v, @as(@Vector(2, f32), @splat(4.0)), @Vector(4, i32){ 0, -2, -1, 3 })');
      expect(result).to.contain('@shuffle(f32, v, @as(@Vector(3, f32), @splat(3.0)), @Vector(4, i32){ -1, -2, -3, 3 })');
    })
    it('should correctly translate V = V.[property] * V', function() {
      const pbkCode = addPBKWrapper(`
        float3 v1 = float3(1, 2, 3);
        float3 v2 = float3(1, 2, 3);
        float3 v3 = v1.x * v2;
      `);
      const result = convertPixelBender(pbkCode, { kernelOnly: true });
      expect(result).to.contain('@as(@Vector(3, f32), @splat(v1[0])) * v2');
    })
  })
  describe('Matrix operations', function() {
    it('should correctly translate M * V', function() {
      const pbkCode = addPBKWrapper(`
        float2x2 m = float2x2(1, 2, 3, 4);
        float2 v1 = float2(10, 20);
        float2 v2 = m * v1;
      `);
      const result = convertPixelBender(pbkCode, { kernelOnly: true });
      expect(result).to.contain('matrixCalc("*", m, v1)');
    })
    it('should correctly translate V * M', function() {
      const pbkCode = addPBKWrapper(`
        float2x2 m = float2x2(1, 2, 3, 4);
        float2 v1 = float2(10, 20);
        float2 v2 = v1 * m;
      `);
      const result = convertPixelBender(pbkCode, { kernelOnly: true });
      expect(result).to.contain('matrixCalc("*", v1, m)');
    })
    it('should correctly translate M * M', function() {
      const pbkCode = addPBKWrapper(`
        float2x2 m1 = float2x2(1, 2, 3, 4);
        float2x2 m2 = float2x2(1, 2, 3, 4);
        float2x2 m3 = m1 * m2;
      `);
      const result = convertPixelBender(pbkCode, { kernelOnly: true });
      expect(result).to.contain('matrixCalc("*", m1, m2)');
    })
    it('should correctly translate V *= M', function() {
      const pbkCode = addPBKWrapper(`
        float2x2 m = float2x2(1, 2, 3, 4);
        float2 v = float2(10, 20);
        v *= m;
      `);
      const result = convertPixelBender(pbkCode, { kernelOnly: true });
      expect(result).to.contain('v = matrixCalc("*", v, m)');
    })
    it('should correctly translate M == M', function() {
      const pbkCode = addPBKWrapper(`
        float2x2 m1 = float2x2(1, 2, 3, 4);
        float2x2 m2 = float2x2(1, 2, 3, 4);
        if (m1 == m2) {
          float2x2 m3 = m1 * m2;
        }
      `);
      const result = convertPixelBender(pbkCode, { kernelOnly: true });
      expect(result).to.contain('matrixCalc("==", m1, m2)');
    })
    it('should correctly translate V == V', function() {
      const pbkCode = addPBKWrapper(`
        float2 v1 = float2(10, 20);
        float2 v2 = float2(10, 20);
        if (v1 == v2) {
          v1 *= v2;
        }
      `);
      const result = convertPixelBender(pbkCode, { kernelOnly: true });
      expect(result).to.contain('@reduce(.And, v1 == v2)');
    })
    it('should correctly translate M * S', function() {
      const pbkCode = addPBKWrapper(`
        float2x2 m1 = float2x2(1, 2, 3, 4);
        float2x2 m2 = m1 * 2;
      `);
      const result = convertPixelBender(pbkCode, { kernelOnly: true });
      expect(result).to.contain('matrixCalc("*", m1, 2)');
    })
    it('should correctly translate ++M', function() {
      const pbkCode = addPBKWrapper(`
        float2x2 m1 = float2x2(1, 2, 3, 4);
        float2x2 m2 = ++m1;
      `);
      const result = convertPixelBender(pbkCode, { kernelOnly: true });
      expect(result).to.not.contain('const tmp1 = m1;')
      expect(result).to.contain('matrixCalc("+", m1, 1)');
      expect(result).to.contain('var m2: [2]@Vector(2, f32) = m1;')
    })
    it('should correctly translate M++', function() {
      const pbkCode = addPBKWrapper(`
        float2x2 m1 = float2x2(1, 2, 3, 4);
        float2x2 m2 = m1++;
      `);
      const result = convertPixelBender(pbkCode, { kernelOnly: true });
      expect(result).to.contain('const tmp1 = m1;')
      expect(result).to.contain('matrixCalc("+", m1, 1)');
      expect(result).to.contain('var m2: [2]@Vector(2, f32) = tmp1;')
    })
    it('should correctly translate M[#] = V', function() {
      const pbkCode = addPBKWrapper(`
        float2x2 m = float2x2(1, 2, 3, 4);
        float2 v = float2(3, 4);
        m[0] = v;
      `);
      const result = convertPixelBender(pbkCode, { kernelOnly: true });
      expect(result).to.contain('m[0] = v;')
    })
  })
  describe('Loops', function() {
    it('should correctly translate a for loop', function() {
      const pbkCode = addPBKWrapper(`
        for (int hello = 0; hello < 10; hello++) {
          float2 coord = float2(0, hello);
          dst = sample(src, coord);
        }
      `);
      const result = convertPixelBender(pbkCode, { kernelOnly: true });
      expect(result).to.contain('var hello: i32 = 0;');
      expect(result).to.contain('hello < 10');
      expect(result).to.contain('hello += 1;');
    })
    it('should correctly translate a while loop', function() {
      const pbkCode = addPBKWrapper(`
        int hello = 5;
        while (hello < 10) {
          hello++;
        }
      `);
      const result = convertPixelBender(pbkCode, { kernelOnly: true });
      expect(result).to.contain('while (hello < 10)');
      expect(result).to.contain('hello += 1;');
    })
    it('should correctly translate a do-while loop', function() {
      const pbkCode = addPBKWrapper(`
        int hello = 5;
        do {
          hello++;
        } while (hello < 10);
      `);
      const result = convertPixelBender(pbkCode, { kernelOnly: true });
      expect(result).to.contain('while (true)');
      expect(result).to.contain('hello += 1;');
      expect(result).to.contain('if (hello < 10) continue else break;');
    })
  })
  describe('Function definition', function() {
    it('should transfer input and output images into the scope of function', function() {
      const pbkCode = addPBKWrapper(`
        float4 p = sampleLinear(src, float2(1.0, 2.0));
      `);
      const result = convertPixelBender(pbkCode, { kernelOnly: true });
      expect(result).to.contain('const src = self.input.src;')
      expect(result).to.contain(' = src.sampleLinear(@Vector(2, f32){ 1.0, 2.0 })');
      expect(result).to.contain('const dst = self.output.dst;')
    })
    it('should transfer parameters into the scope of function', function() {
      const pbkCode = addPBKWrapper(`
        float4 p = sampleLinear(src, float2(1.0, number));
      `);
      const result = convertPixelBender(pbkCode, { kernelOnly: true });
      expect(result).to.contain('const number = self.params.number')
      expect(result).to.contain(' = src.sampleLinear(@Vector(2, f32){ 1.0, number })');
    })
    it('should transfer dependents into the scope of function', function() {
      const pbkCode = `
      <languageVersion : 1.0;>
      kernel test
      <namespace : "Test"; vendor : "Vendor"; version : 1;>
      {
        input image4 src;
        output pixel4 dst;

        const int COUNT1 = 5;
        const int COUNT2 = 4;
        dependent float number;
        dependent float array[COUNT1*COUNT2];

        void
        evaluateDependents()
        {
          array[1] = 1.0;
        }

        void
        evaluatePixel()
        {
          float value = array[1];
        }
      }
      `;
      const result = convertPixelBender(pbkCode, { kernelOnly: true });
      expect(result).to.contain('const array = self.array;');
      expect(result).to.not.contain('const number = self.array;');
      expect(result).to.contain('self.array[1] = 1.0;');
    })
    it('should add dummy assignment beneath unused variables', function() {
      const pbkCode = addPBKWrapper(`
        float x = 5.0, y = 1.0;
        float4 p = sampleLinear(src, float2(1.0, y));
      `);
      const result = convertPixelBender(pbkCode, { kernelOnly: true });
      expect(result).to.contain('_ = x;')
      expect(result).to.contain('_ = p;')
    })
    it('should add dummy assignment to uncaptured return value', function() {
      const pbkCode = addPBKWrapper(`
        float x = 5.0, y = 1.0;
        atan(x, y);
        5;
      `);
      const result = convertPixelBender(pbkCode, { kernelOnly: true });
      expect(result).to.contain('_ = atan2(x, y);')
      expect(result).to.contain('_ = 5;')
    })
  })
  describe('Function calls', function() {
    it('should import built-in functions', function() {
      const pbkCode = addPBKWrapper(`
        float a = 1, b = 2;
        float c = min(a, b);
      `);
      const result = convertPixelBender(pbkCode, { kernelOnly: true });
      expect(result).to.contain('var c: f32 = min(a, b);');
      expect(result).to.contain('fn min(v1: anytype, v2: anytype) @TypeOf(v1) {');
    })
    it('should use @as on literal where function requires it for return type', function() {
      const pbkCode = addPBKWrapper(`
        float c = min(1.0, 2.0);
      `);
      const result = convertPixelBender(pbkCode, { kernelOnly: true });
      expect(result).to.contain('var c: f32 = min(@as(f32, 1.0), 2.0);');
    })
    it('should correctly translate pixelSize(dst)', function() {
      const pbkCode = addPBKWrapper(`
        float2 s = pixelSize(dst);
      `);
      const result = convertPixelBender(pbkCode, { kernelOnly: true });
      expect(result).to.contain('self.output.dst.pixelSize()');
    })
  })
  describe('Macros', function() {
    it('should correctly translate a macro', function() {
      const pbkCode = addPBKWrapper(`
        #define addMul(a, b, c) (a * b + c)

        float value = addMul(1.4, 2.2, 3.0);
      `);
      const result = convertPixelBender(pbkCode, { kernelOnly: true });
      expect(result).to.contain('fn addMul(a: f32, b: f32, c: f32) f32 {');
    })
    it('should expand a macro with local dependents', function() {
      const pbkCode = addPBKWrapper(`
        #define addMul(a, c) (a * b + c)

        float b = 2.2;
        float value = addMul(1.4, 3.0);
      `);
      const result = convertPixelBender(pbkCode, { kernelOnly: true });
      expect(result).to.contain('var value: f32 = (1.4 * b + 3.0)');
    })
    it('should expand an argument-less macro with local dependents', function() {
      const pbkCode = addPBKWrapper(`
        #define addMul (a * b + c)

        float a = 1.4, b = 2.2, c = 3.0;
        float value = addMul;
      `);
      const result = convertPixelBender(pbkCode, { kernelOnly: true });
      expect(result).to.contain('var value: f32 = (a * b + c)');
    })
    it('should correctly translate a multi-line macro', function() {
      const pbkCode = addPBKWrapper(`
        #define addMul(a, b, c) (a \
          *\
           b + c)

        float value = addMul(1.4, 2.2, 3.0);
      `);
      const result = convertPixelBender(pbkCode, { kernelOnly: true });
      expect(result).to.contain('fn addMul(a: f32, b: f32, c: f32) f32 {');
    })
    it('should correctly translate dependent declaration', function() {
      const pbkCode = `
      <languageVersion : 1.0;>
      kernel test
      <namespace : "Test"; vendor : "Vendor"; version : 1;>
      {
        input image4 src;
        output pixel4 dst;

        const int COUNT1 = 5;
        const int COUNT2 = 4;
        dependent float number;
        dependent float array[COUNT1*COUNT2];

        void
        evaluateDependents()
        {
          array[1] = 1.0;
        }

        void
        evaluatePixel()
        {
          float value = array[1];
        }
      }
      `;
      const result = convertPixelBender(pbkCode, { kernelOnly: true });
      expect(result).to.contain('array: [COUNT1 * COUNT2]f32 = undefined,');
      expect(result).to.contain('number: f32 = undefined,');
      expect(result).to.contain('const array = self.array;');
      expect(result).to.contain('var value: f32 = array[1];');
      expect(result).to.contain('self.array[1] = 1.0;');
    })
    it('should import built-in functions used in macro', function() {
      const pbkCode = addPBKWrapper(`
        #define COW(a, b) min(a, b)
      `);
      const result = convertPixelBender(pbkCode, { kernelOnly: true });
      expect(result).to.contain('fn min(v1: anytype, v2: anytype) @TypeOf(v1) {');
    })
  })
  describe('Error handling', function() {
    it('should throw when lexer fails', function() {
      const pbkCode = addPBKWrapper(`
        $cow
      `);
      expect(() => convertPixelBender(pbkCode, { kernelOnly: true })).to.throw(Error)
        .with.property('message')
        .that.contain('[LEXER]')
        .and.contain('unexpected character');
    })
    it('should throw when parser fails', function() {
      const pbkCode = addPBKWrapper(`
        float2 = 1;
      `);
      expect(() => convertPixelBender(pbkCode, { kernelOnly: true })).to.throw(Error)
        .with.property('message')
        .that.contain('[PARSER]')
    })
    it('should report lexer error in macro with right line number', function() {
      const pbkCode = addPBKWrapper(`
        #define COW $cow
      `);
      const lines = pbkCode.split('\n');
      const lineNo = lines.findIndex(l => l.includes('#define')) + 1;
      expect(() => convertPixelBender(pbkCode, { kernelOnly: true })).to.throw(Error)
        .with.property('message')
        .that.contain('[LEXER]')
        .and.contain(`line ${lineNo}`);
    })
    it('should report parser error in macro with right line number', function() {
      const pbkCode = addPBKWrapper(`
        #define COW float2 = 1
      `);
      const lines = pbkCode.split('\n');
      const lineNo = lines.findIndex(l => l.includes('#define')) + 1;
      expect(() => convertPixelBender(pbkCode, { kernelOnly: true })).to.throw(Error)
        .with.property('message')
        .that.contain('[PARSER]')
        .and.contain(`line ${lineNo}`);
    })
  })
})

function addPBKWrapper(statements) {
  return `
<languageVersion : 1.0;>
kernel test
<namespace : "Test"; vendor : "Vendor"; version : 1;>
{
  parameter float number
  <
      minValue: -1.0;
      maxValue: 1.0;
      defaultValue: 0.0;
  >;

  input image4 src;
  output pixel4 dst;

  void
  evaluatePixel()
  {
    ${statements}
  }
}
`;
}