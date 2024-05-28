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
      expect(result).to.contain('.minValue = .{');
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
    it('should normalize displayname to displayName', function() {
      const pbkCode = `
      <languageVersion : 1.0;>
      kernel test
      <namespace : "Test"; vendor : "Vendor"; version : 1; displayname: "Hello";>
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
      expect(result).to.contain('pub const displayName = "Hello";');
    })
  })
  describe('Parameters', function() {
    it('should correctly translate boolean parameters', function() {
      const pbkCode = `
      <languageVersion : 1.0;>
      kernel test
      <namespace : "Test"; vendor : "Vendor"; version : 1;>
      {
        parameter bool state1
        <
            defaultValue: true;
        >;
        parameter bool state2
        <
            defaultValue: false;
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
      expect(result).to.contain('type = bool,');
      expect(result).to.contain('.defaultValue = true,');
      expect(result).to.contain('.defaultValue = false,');
    })
  })
  describe('Input/Output', function() {
    it('should accept float vector as output pixel', function() {
      const pbkCode = `
      <languageVersion : 1.0;>
      kernel test
      <namespace : "Test"; vendor : "Vendor"; version : 1;>
      {
        parameter bool state1
        <
            defaultValue: true;
        >;
        parameter bool state2
        <
            defaultValue: false;
        >;

        input image4 src;
        output float4 dst;

        void
        evaluatePixel()
        {
        }
      }
      `;
      const result = convertPixelBender(pbkCode, { kernelOnly: true });
      expect(result).to.contain('dst: @Vector(4, f32) = undefined,');
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
      expect(result).to.contain('const b: f32 = tmp1 * tmp2;');
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
      expect(result).to.contain('const b: f32 = tmp1 * tmp2;');
    })
    it('should convert pixel2 to float2', function() {
      const pbkCode = addPBKWrapper(`
        pixel2 a = float2(1.0, 0.0);
      `);
      const result = convertPixelBender(pbkCode, { kernelOnly: true });
      expect(result).to.contain('const a: @Vector(2, f32) = .{ 1.0, 0.0 };');
    })
    it('should correctly promote a scalar to a vector', function() {
      const pbkCode = addPBKWrapper(`
        float2 a;
        a = 1.0;
      `);
      const result = convertPixelBender(pbkCode, { kernelOnly: true });
      expect(result).to.contain('a = @as(@Vector(2, f32), @splat(1.0));');
    })
    it('should correctly expand an combine-assignment operation involving a matrix', function() {
      const pbkCode = addPBKWrapper(`
        float2x2 a;
        a /= 2.0;
      `);
      const result = convertPixelBender(pbkCode, { kernelOnly: true });
      expect(result).to.contain('a = @"M / S"(a, 2.0);');
    })
    it('should replace modified variable with temp variable in expression', function() {
      const pbkCode = addPBKWrapper(`
        float a = 0.0;
        float b = (a = 3.0) * a + (a = 4.0);
      `);
      const result = convertPixelBender(pbkCode, { kernelOnly: true });
      expect(result).to.contain('const tmp1 = a;');
      expect(result).to.contain('const tmp2 = a;');
      expect(result).to.contain('const b: f32 = tmp1 * tmp1 + tmp2;');
    })

  })
  describe('Constructor calls', function() {
    it('should correctly translate boolean constructor calls with literal numbers', function() {
      const pbkCode = addPBKWrapper(`
        bool a = bool(0.0);
        bool b = bool(1);
      `);
      const result = convertPixelBender(pbkCode, { kernelOnly: true });
      expect(result).to.contain('const a: bool = false;');
      expect(result).to.contain('const b: bool = true;');
    })
    it('should correctly translate boolean constructor calls with variables', function() {
      const pbkCode = addPBKWrapper(`
        float f = 0.0;
        int i = 1;
        bool a = bool(f);
        bool b = bool(i);
      `);
      const result = convertPixelBender(pbkCode, { kernelOnly: true });
      expect(result).to.contain('const a: bool = (f != 0.0);');
      expect(result).to.contain('const b: bool = (i != 0);');
    })
    it('should correctly translate float constructor calls with literals', function() {
      const pbkCode = addPBKWrapper(`
        float a = float(0);
        float b = float(true);
      `);
      const result = convertPixelBender(pbkCode, { kernelOnly: true });
      expect(result).to.contain('const a: f32 = 0.0;');
      expect(result).to.contain('const b: f32 = 1.0;');
    })
    it('should correctly translate float constructor calls with variables', function() {
      const pbkCode = addPBKWrapper(`
        bool t = true;
        int i = 1;
        float a = float(t);
        float b = float(i);
      `);
      const result = convertPixelBender(pbkCode, { kernelOnly: true });
      expect(result).to.contain('const a: f32 = @floatFromInt(@intFromBool(t));');
      expect(result).to.contain('const b: f32 = @floatFromInt(i);');
    })
    it('should correctly translate int constructor calls with literals', function() {
      const pbkCode = addPBKWrapper(`
        int a = int(0.5);
        int b = int(true);
      `);
      const result = convertPixelBender(pbkCode, { kernelOnly: true });
      expect(result).to.contain('const a: i32 = 0;');
      expect(result).to.contain('const b: i32 = 1;');
    })
    it('should correctly translate int constructor calls with variables', function() {
      const pbkCode = addPBKWrapper(`
        bool t = true;
        float f = 1.5;
        int a = int(t);
        int b = int(f);
      `);
      const result = convertPixelBender(pbkCode, { kernelOnly: true });
      expect(result).to.contain('const a: i32 = @intFromBool(t);');
      expect(result).to.contain('const b: i32 = @intFromFloat(f);');
    })
    it('should correctly translate bool vector constructor calls with literals', function() {
      const pbkCode = addPBKWrapper(`
        bool2 a = bool2(false);
        bool2 b = bool2(int2(0, 1));
        bool2 c = bool2(float2(1.0, 2.0));
      `);
      const result = convertPixelBender(pbkCode, { kernelOnly: true });
      expect(result).to.contains('const a: @Vector(2, bool) = .{ false, false };')
      expect(result).to.contains('const b: @Vector(2, bool) = .{ false, true };')
      expect(result).to.contains('const c: @Vector(2, bool) = .{ true, true };')
    })
    it('should correctly translate bool vector constructor calls with variables', function() {
      const pbkCode = addPBKWrapper(`
        int2 iv = int2(0, 1);
        float2 fv = float2(1.0, 2.0);
        bool2 a = bool2(iv);
        bool2 b = bool2(fv);
      `);
      const result = convertPixelBender(pbkCode, { kernelOnly: true });
      expect(result).to.contains('const a: @Vector(2, bool) = (iv != @as(@Vector(2, i32), @splat(0)));');
      expect(result).to.contains('const b: @Vector(2, bool) = (fv != @as(@Vector(2, f32), @splat(0.0)));');
    })
    it('should correctly translate float vector constructor calls with literals', function() {
      const pbkCode = addPBKWrapper(`
        float2 a = float2(2);
        float2 b = float2(bool2(true, false));
        float2 c = float2(int2(1, 2));
      `);
      const result = convertPixelBender(pbkCode, { kernelOnly: true });
      expect(result).to.contain('const a: @Vector(2, f32) = .{ 2.0, 2.0 };');
      expect(result).to.contain('const b: @Vector(2, f32) = .{ 1.0, 0.0 };');
      expect(result).to.contain('const c: @Vector(2, f32) = .{ 1.0, 2.0 };');
    })
    it('should correctly translate float vector constructor calls with variables', function() {
      const pbkCode = addPBKWrapper(`
        int i = 7;
        int2 iv = int2(1, 2);
        bool2 bv = bool2(true, false);
        float2 a = float2(i);
        float2 b = float2(iv);
        float2 c = float2(bv);
      `);
      const result = convertPixelBender(pbkCode, { kernelOnly: true });
      expect(result).to.contain('const a: @Vector(2, f32) = @splat(@as(f32, @floatFromInt(i)));');
      expect(result).to.contain('const b: @Vector(2, f32) = floatVectorFromIntVector(iv);');
      expect(result).to.contain('const c: @Vector(2, f32) = floatVectorFromIntVector(intVectorFromBoolVector(bv));');
    })
    it('should correctly translate int vector constructor calls with literals', function() {
      const pbkCode = addPBKWrapper(`
        int2 a = int2(2.1);
        int2 b = int2(bool2(true, false));
        int2 c = int2(float2(1.2, 2.2));
      `);
      const result = convertPixelBender(pbkCode, { kernelOnly: true });
      expect(result).to.contain('const a: @Vector(2, i32) = .{ 2, 2 };');
      expect(result).to.contain('const b: @Vector(2, i32) = .{ 1, 0 };');
      expect(result).to.contain('const c: @Vector(2, i32) = .{ 1, 2 };');
    })
    it('should correctly translate int vector constructor calls with variables', function() {
      const pbkCode = addPBKWrapper(`
        float f = 7.2;
        float2 fv = float2(1.2, 2.1);
        bool2 bv = bool2(true, false);
        int2 a = int2(f);
        int2 b = int2(fv);
        int2 c = int2(bv);
      `);
      const result = convertPixelBender(pbkCode, { kernelOnly: true });
      expect(result).to.contain('const a: @Vector(2, i32) = @splat(@as(i32, @intFromFloat(f)));');
      expect(result).to.contain('const b: @Vector(2, i32) = intVectorFromFloatVector(fv);');
      expect(result).to.contain('const c: @Vector(2, i32) = intVectorFromBoolVector(bv);');
    })
    it('should throw when vector constructor is given a matrix', function() {
      const pbkCode = addPBKWrapper(`
        float2x2 m = float2x2(float2(0.0, 1.0), float2(2.0, 3.0));
        float2 v = float2(m);
      `);
      expect(() => convertPixelBender(pbkCode, { kernelOnly: true })).to.throw(Error)
        .with.property('message').that.contains('from float2x2 to float2');
    })

    it('should correctly translate matrix constructor calls with vector literals', function() {
      const pbkCode = addPBKWrapper(`
        float2x2 m = float2x2(float2(0.0, 1.0), float2(2.0, 3.0));
      `);
      const result = convertPixelBender(pbkCode, { kernelOnly: true });
      expect(result).to.contain('const m: [2]@Vector(2, f32) = .{');
      expect(result).to.contain('.{ 0.0, 1.0 },');
      expect(result).to.contain('.{ 2.0, 3.0 },');
    })
    it('should correctly translate matrix constructor calls with single literal', function() {
      const pbkCode = addPBKWrapper(`
        float2x2 m = float2x2(0.0);
      `);
      const result = convertPixelBender(pbkCode, { kernelOnly: true });
      expect(result).to.contain('.{ 0.0, 0.0 },');
    })
    it('should correctly translate matrix constructor calls with literal numbers', function() {
      const pbkCode = addPBKWrapper(`
        float2x2 m = float2x2(0.1, 0.2, 0.3, 0.4);
      `);
      const result = convertPixelBender(pbkCode, { kernelOnly: true });
      expect(result).to.contain('const m: [2]@Vector(2, f32) = .{');
      expect(result).to.contain('.{ 0.1, 0.2 },');
      expect(result).to.contain('.{ 0.3, 0.4 },');
    })
    it('should correctly translate matrix constructor calls with variables', function() {
      const pbkCode = addPBKWrapper(`
        float a = 1.0;
        float2 b = float2(1.0, 1.0);
        float2x2 c = float2x2(0.1, 0.2, 0.3, 0.4);
        float2x2 m1 = float2x2(a);
        float2x2 m2 = float2x2(b, b);
        float2x2 m3 = float2x2(c);
      `);
      const result = convertPixelBender(pbkCode, { kernelOnly: true });
      expect(result).to.contain('@as(@Vector(2, f32), @splat(a)),');
      expect(result).to.contain('const m2: [2]@Vector(2, f32) = .{ b, b };');
      expect(result).to.contain('const m3: [2]@Vector(2, f32) = c;');
    })
  })
  describe('Element access', function() {
    it('should correctly translate element access using a global constant', function() {
      const pbkCode = addPBKWrapper(`
        float4 v = float4(1, 1, 1, 1);
        int i = 0;
        float f = v[i];
      `);
      const result = convertPixelBender(pbkCode, { kernelOnly: true });
      expect(result).to.contain('const f: f32 = v[@intCast(i)];');
    })
    it('should correctly translate element access using a literal', function() {
      const pbkCode = addPBKWrapper(`
        float4 v = float4(1, 1, 1, 1);
        float f = v[0];
      `);
      const result = convertPixelBender(pbkCode, { kernelOnly: true });
      expect(result).to.contain('const f: f32 = v[0];');
    })
    it('should correctly translate element access involving return values', function() {
      const pbkCode = addPBKWrapper(`
        float a = sample(src, outCoord()).a;
        float b = sample(src, outCoord())[1];
      `);
      const result = convertPixelBender(pbkCode, { kernelOnly: true });
      expect(result).to.contain('const a: f32 = src.sampleLinear(self.outCoord())[3];');
      expect(result).to.contain('const b: f32 = src.sampleLinear(self.outCoord())[1];');
    })
    it('should omit cast when index is a global constant', function() {
      const pbkCode = `
      <languageVersion : 1.0;>
      kernel test
      <namespace : "Test"; vendor : "Vendor"; version : 1;>
      {
        input image4 src;
        output pixel4 dst;
        const int INDEX = 2;

        void
        evaluatePixel()
        {
          float2 v;
          v[INDEX] = 1.0;
        }
      }
      `;
      const result = convertPixelBender(pbkCode, { kernelOnly: true });
      expect(result).to.contain('v[INDEX] = 1.0;');
    })
  })
  describe('Comparison operations', function() {
    it('should correctly translate AND operator', function() {
      const pbkCode = addPBKWrapper(`
        float f = 1;
        if (f > 0 && f < 1) {
        }
      `);
      const result = convertPixelBender(pbkCode, { kernelOnly: true });
      expect(result).to.contain('if (f > 0 and f < 1) {')
    })
    it('should correctly translate OR operator', function() {
      const pbkCode = addPBKWrapper(`
        float f = 1;
        if (f > 0 || f < 1) {
        }
      `);
      const result = convertPixelBender(pbkCode, { kernelOnly: true });
      expect(result).to.contain('if (f > 0 or f < 1) {')
    })
    it('should correctly translate XOR operator', function() {
      const pbkCode = addPBKWrapper(`
        float f = 1;
        if (f > 0 ^^ f < 1) {
        }
      `);
      const result = convertPixelBender(pbkCode, { kernelOnly: true });
      expect(result).to.contain('if (f > 0 != f < 1) {')
    })
    it('should throw when comparing vector with scalar', function() {
      const pbkCode = addPBKWrapper(`
        float2 f = 1;
        if (f == 1) {
        }
      `);
      expect(() => convertPixelBender(pbkCode, { kernelOnly: true })).to.throw(Error)
        .with.property('message').that.equals('Invalid vector comparison');
    })
  })
  describe('Arithmetic operations', function() {
    it('should correctly promote a scalar to a vector', function() {
      const pbkCode = addPBKWrapper(`
        float2 a;
        float2 b = a * 2.0;
      `);
      const result = convertPixelBender(pbkCode, { kernelOnly: true });
      expect(result).to.contain('const b: @Vector(2, f32) = a * @as(@Vector(2, f32), @splat(2.0));');
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
    it('should correctly translate V.[property] += S', function() {
      const pbkCode = addPBKWrapper(`
        float4 v = float4(1, 1, 1, 1);
        v.bg += 4.0;
        v.r += 3.0;
      `);
      const result = convertPixelBender(pbkCode, { kernelOnly: true });
      expect(result).to.contain('v = @shuffle(f32, v, @shuffle(f32, v, undefined, @Vector(2, i32){ 2, 1 }) + @as(@Vector(2, f32), @splat(4.0)), @Vector(4, i32){ 0, -2, -1, 3 })');
      expect(result).to.contain('v[0] += 3.0;');
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
    it('should correctly translate V.[property] = V.[property]', function() {
      const pbkCode = addPBKWrapper(`
        float4 v1 = float4(1, 2, 3, 4);
        float4 v2 = float4(1, 2, 3, 4);
        v1.rg = v2.ba;
      `);
      const result = convertPixelBender(pbkCode, { kernelOnly: true });
      expect(result).to.contain('v1 = @shuffle(f32, v1, v2, @Vector(4, i32){ -3, -4, 2, 3 });');
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
      expect(result).to.contain('@"M * V"(m, v1)');
    })
    it('should correctly translate V * M', function() {
      const pbkCode = addPBKWrapper(`
        float2x2 m = float2x2(1, 2, 3, 4);
        float2 v1 = float2(10, 20);
        float2 v2 = v1 * m;
      `);
      const result = convertPixelBender(pbkCode, { kernelOnly: true });
      expect(result).to.contain('@"V * M"(v1, m)');
    })
    it('should correctly translate M * M', function() {
      const pbkCode = addPBKWrapper(`
        float2x2 m1 = float2x2(1, 2, 3, 4);
        float2x2 m2 = float2x2(1, 2, 3, 4);
        float2x2 m3 = m1 * m2;
      `);
      const result = convertPixelBender(pbkCode, { kernelOnly: true });
      expect(result).to.contain('@"M * M"(m1, m2)');
    })
    it('should correctly translate V *= M', function() {
      const pbkCode = addPBKWrapper(`
        float2x2 m = float2x2(1, 2, 3, 4);
        float2 v = float2(10, 20);
        v *= m;
      `);
      const result = convertPixelBender(pbkCode, { kernelOnly: true });
      expect(result).to.contain('v = @"V * M"(v, m)');
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
      expect(result).to.contain('@"M == M"(m1, m2)');
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
        float2x2 m2 = m1 * 2.0;
      `);
      const result = convertPixelBender(pbkCode, { kernelOnly: true });
      expect(result).to.contain('@"M * S"(m1, 2.0)');
    })
    it('should correctly translate ++M', function() {
      const pbkCode = addPBKWrapper(`
        float2x2 m1 = float2x2(1, 2, 3, 4);
        float2x2 m2 = ++m1;
      `);
      const result = convertPixelBender(pbkCode, { kernelOnly: true });
      expect(result).to.contain('const tmp1 = m1;')
      expect(result).to.contain('@"M + S"(m1, 1.0)');
      expect(result).to.contain('const m2: [2]@Vector(2, f32) = tmp1;')
    })
    it('should correctly translate M++', function() {
      const pbkCode = addPBKWrapper(`
        float2x2 m1 = float2x2(1, 2, 3, 4);
        float2x2 m2 = m1++;
      `);
      const result = convertPixelBender(pbkCode, { kernelOnly: true });
      expect(result).to.contain('const tmp1 = m1;')
      expect(result).to.contain('@"M + S"(m1, 1.0)');
      expect(result).to.contain('const m2: [2]@Vector(2, f32) = tmp1;')
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
    it('should throw when comparison is performed on matrix and scalar', function() {
      const pbkCode = addPBKWrapper(`
        float2x2 m = float2x2(1, 2, 3, 4);
        if (m == 1.0) {
        }
      `);
      expect(() => convertPixelBender(pbkCode, { kernelOnly: true })).to.throw(Error)
        .with.property('message').that.equal('Invalid matrix comparison');
    })
  })
  describe('Unary operation', function() {
    it('should correctly translate negative operator', function() {
      const pbkCode = addPBKWrapper(`
        float a = -1.0;
        float b = -a;
      `);
      const result = convertPixelBender(pbkCode, { kernelOnly: true });
      expect(result).to.contain('const a: f32 = -1.0;')
      expect(result).to.contain('const b: f32 = -a;')
    })
    it('should correctly translate positive operator', function() {
      const pbkCode = addPBKWrapper(`
        float a = +1.0;
        float b = +a;
      `);
      const result = convertPixelBender(pbkCode, { kernelOnly: true });
      expect(result).to.contain('const a: f32 = 1.0;')
      expect(result).to.contain('const b: f32 = a;')
    })
    it('should correctly translate logical NOT operator', function() {
      const pbkCode = addPBKWrapper(`
        bool a = !true;
        bool b = !a;
      `);
      const result = convertPixelBender(pbkCode, { kernelOnly: true });
      expect(result).to.contain('const a: bool = false;')
      expect(result).to.contain('const b: bool = !a;')
    })
    it('should use parentheses when operand is a binary expression', function() {
      const pbkCode = addPBKWrapper(`
        int a = 1;
        bool b = !bool(a);
        ;
      `);
      const result = convertPixelBender(pbkCode, { kernelOnly: true });
      expect(result).to.contain('const b: bool = !(a != 0);');
    })
  })
  describe('Conditional', function() {
    it('should correctly translate trenary operator', function() {
      const pbkCode = addPBKWrapper(`
        bool state = true;
        int a = (state) ? 1 : 7;
      `);
      const result = convertPixelBender(pbkCode, { kernelOnly: true });
      expect(result).to.contain('const a: i32 = if (state) 1 else 7;');
    })
    it('should correctly translate trenary operator when type is ambiguous', function() {
      const pbkCode = addPBKWrapper(`
        bool state = true;
        int a = 0;
        a = (state) ? 1 : 7;
      `);
      const result = convertPixelBender(pbkCode, { kernelOnly: true });
      expect(result).to.contain('a = @as(i32, if (state) 1 else 7);');
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
    it('should correctly translate an infinite for loop', function() {
      const pbkCode = addPBKWrapper(`
        for (;;) {
          float2 coord = float2(0, 0);
          dst = sample(src, coord);
          break;
        }
      `);
      const result = convertPixelBender(pbkCode, { kernelOnly: true });
      expect(result).to.contain('while (true) {');
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
    it('should correctly translate a break statement', function() {
      const pbkCode = addPBKWrapper(`
        int hello = 5;
        while (hello < 10) {
          hello++;
          break;
        }
      `);
      const result = convertPixelBender(pbkCode, { kernelOnly: true });
      expect(result).to.contain('while (hello < 10)');
      expect(result).to.contain('break;');
    })
    it('should correctly translate a continue statement', function() {
      const pbkCode = addPBKWrapper(`
        int hello = 5;
        while (hello < 10) {
          hello++;
          continue;
        }
      `);
      const result = convertPixelBender(pbkCode, { kernelOnly: true });
      expect(result).to.contain('while (hello < 10)');
      expect(result).to.contain('continue;');
    })
    it('should correctly translate a return statement', function() {
      const pbkCode = addPBKWrapper(`
        int hello = 5;
        while (hello < 10) {
          hello++;
          return;
        }
      `);
      const result = convertPixelBender(pbkCode, { kernelOnly: true });
      expect(result).to.contain('while (hello < 10)');
      expect(result).to.contain('return;');
    })
    it('should correctly translate a if-else statement', function() {
      const pbkCode = addPBKWrapper(`
        int value = 0;
        if (value < 10) {
          value += 10;
        } else if (value < 20) {
          value += 20;
        } else {
          value += 30;
        }
      `);
      const result = convertPixelBender(pbkCode, { kernelOnly: true });
      expect(result).to.contain('');
    })
    it('should correctly translate a if-else statement with no curlies', function() {
      const pbkCode = addPBKWrapper(`
        int value = 0;
        if (value < 10) value += 10; else if (value < 20) value += 20; else value += 30;
      `);
      const result = convertPixelBender(pbkCode, { kernelOnly: true });
      expect(result).to.contain('');
    })
    it('should correctly translate a code block', function() {
      const pbkCode = addPBKWrapper(`
        {
          int value = 0;
          float n = float(value);
        }
      `);
      const result = convertPixelBender(pbkCode, { kernelOnly: true });
      expect(result).to.contain('');
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
    it('should attach receiver to functions using kernel variables indirectly', function() {
      const pbkCode = `
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

        const int COUNT1 = 5;
        const int COUNT2 = 4;
        dependent float number;
        dependent float array[COUNT1*COUNT2];

        float2 coord() {
          return outCoord();
        }

        float getX() {
          return coord().x;
        }

        float getY() {
          return coord().y;
        }

        float getN() {
          return number;
        }

        float getPI() {
          return 3.14;
        }

        void
        evaluatePixel()
        {
          float v1 = getY();
          float v2 = getPI();
        }
      }
      `;
      const result = convertPixelBender(pbkCode, { kernelOnly: true });
      expect(result).to.contain('fn getX(self: *@This()) f32 {');
      expect(result).to.contain('fn getY(self: *@This()) f32 {');
      expect(result).to.contain('const v1: f32 = self.getY();');
      expect(result).to.contain('fn getN(self: *@This()) f32 {');
      expect(result).to.contain('fn getPI() f32 {');
      expect(result).to.contain('const v2: f32 = getPI();');
    })
    it('should ignore function that returns region', function() {
      const pbkCode = `
      <languageVersion : 1.0;>
      kernel test
      <namespace : "Test"; vendor : "Vendor"; version : 1;>
      {
        input image4 src;
        output pixel4 dst;

        region generated() {
          return region(float4(0.0, 0.0, 800.0, 400.0));
        }
      }
      `;
      const result = convertPixelBender(pbkCode, { kernelOnly: true });
      expect(result).to.not.contain('generated');
    })
    it('should rename arguments when they are modified', function() {
      const pbkCode = `
      <languageVersion : 1.0;>
      kernel test
      <namespace : "Test"; vendor : "Vendor"; version : 1;>
      {
        input image4 src;
        output pixel4 dst;
        dependent int number;

        int a(int i) {
          if (i > 50) {
            i = 50;
          }
          return i;
        }
      }
      `;
      const result = convertPixelBender(pbkCode, { kernelOnly: true });
      expect(result).to.contain('fn a(_i: i32) i32 {');
    })
    it('should not fail when functions call each other', function() {
      const pbkCode = `
      <languageVersion : 1.0;>
      kernel test
      <namespace : "Test"; vendor : "Vendor"; version : 1;>
      {
        input image4 src;
        output pixel4 dst;
        dependent int number;

        int a() {
          return number + b();
        }

        int b() {
          return number + a();
        }
      }
      `;
      const result = convertPixelBender(pbkCode, { kernelOnly: true });
      expect(result).to.contain('return number + self.a();');
      expect(result).to.contain('return number + self.b();');
    })
    it('should include image processing functions when kernelOnly is not set', function() {
      const pbkCode = addPBKWrapper(``);
      const result = convertPixelBender(pbkCode, {});
      expect(result).to.contain('fn createOutput');
      expect(result).to.contain('fn createPartialOutput');
    })
    it('should correctly translate out and inout arguments', function() {
      const pbkCode = `
      <languageVersion : 1.0;>
      kernel test
      <namespace : "Test"; vendor : "Vendor"; version : 1;>
      {
        input image4 src;
        output pixel4 dst;
        dependent int number;

        void change(in int a, inout int b, out int c) {
          b = a;
          c = a + 1;
        }

        void hello() {
          int a = 0, b = 1, c = 2;
          change(a, b, c);
        }
      }
      `;
      const result = convertPixelBender(pbkCode, { kernelOnly: true });
      expect(result).to.contain('fn change(a: i32, b: *i32, c: *i32) void {');
      expect(result).to.contain('b.* = a;')
      expect(result).to.contain('c.* = a + 1;')
      expect(result).to.contain('c.* = a + 1;')
      expect(result).to.contain('change(a, &b, &c);')
    })
  })
  describe('Function calls', function() {
    it('should import built-in functions', function() {
      const pbkCode = addPBKWrapper(`
        float a = 1, b = 2;
        float c = min(a, b);
      `);
      const result = convertPixelBender(pbkCode, { kernelOnly: true });
      expect(result).to.contain('const c: f32 = min(a, b);');
      expect(result).to.contain('fn min(v1: anytype, v2: anytype) @TypeOf(v1) {');
    })
    it('should use @as on literal where function requires it for return type', function() {
      const pbkCode = addPBKWrapper(`
        float c = min(1.0, 2.0);
      `);
      const result = convertPixelBender(pbkCode, { kernelOnly: true });
      expect(result).to.contain('const c: f32 = min(@as(f32, 1.0), 2.0);');
    })
    it('should correctly translate pixelSize(dst)', function() {
      const pbkCode = addPBKWrapper(`
        float2 s = pixelSize(dst);
      `);
      const result = convertPixelBender(pbkCode, { kernelOnly: true });
      expect(result).to.contain('dst.pixelSize()');
    })
    it('should throw when arguments fail to match any signature', function() {
      const pbkCode = addPBKWrapper(`
        float c = min(1.0, 2);
      `);
      expect(() => convertPixelBender(pbkCode, { kernelOnly: true })).to.throw(Error);
    })
    it('should throw when number of arguments is incorrect', function() {
      const pbkCode = addPBKWrapper(`
        float a = 1, b = 2;
        float c = min(0, a, b);
      `);
      expect(() => convertPixelBender(pbkCode, { kernelOnly: true })).to.throw(Error)
        .with.property('message').that.equal('min() does not accept these arguments: int, float, float');
    })
    it('should throw when function does not exist', function() {
      const pbkCode = addPBKWrapper(`
        float a = 1, b = 2;
        float c = moo(a, b);
      `);
      expect(() => convertPixelBender(pbkCode, { kernelOnly: true })).to.throw(Error)
        .with.property('message').that.equal('No function by that name: moo');
    })
    it('should throw when wrong argument is given to user-defined function', function() {
      const pbkCode = `
      <languageVersion : 1.0;>
      kernel test
      <namespace : "Test"; vendor : "Vendor"; version : 1;>
      {
        input image4 src;
        output pixel4 dst;
        dependent int number;

        void change(in int a, inout int b, out int c) {
          b = a;
          c = a + 1;
        }

        void hello() {
          float a = 0, b = 1, c = 2;
          change(a, b, c);
        }
      }
      `;
      expect(() => convertPixelBender(pbkCode, { kernelOnly: true })).to.throw(Error)
        .with.property('message').that.equal('change() expects argument 1 to be int, got float');
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
    it('should correctly translate a macro that writes to its argument', function() {
      const pbkCode = addPBKWrapper(`
        #define add(a, b, c) a = b + c

        float a = 0.0;
        add(a, 2.2, 3.0);
      `);
      const result = convertPixelBender(pbkCode, { kernelOnly: true });
      expect(result).to.contain('fn add(a: *f32, b: f32, c: f32) void {');
      expect(result).to.contain('add(&a, 2.2, 3.0);');
    })
    it('should expand a macro with local dependents', function() {
      const pbkCode = addPBKWrapper(`
        #define addMul(a, c) (a * b + c)

        float b = 2.2;
        float value = addMul(1.4, 3.0);
      `);
      const result = convertPixelBender(pbkCode, { kernelOnly: true });
      expect(result).to.contain('const value: f32 = (1.4 * b + 3.0)');
    })
    it('should expand an argument-less macro with local dependents', function() {
      const pbkCode = addPBKWrapper(`
        #define addMul (a * b + c)

        float a = 1.4, b = 2.2, c = 3.0;
        float value = addMul;
      `);
      const result = convertPixelBender(pbkCode, { kernelOnly: true });
      expect(result).to.contain('const value: f32 = (a * b + c)');
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
    it('should convert argumentless macro into global constants', function() {
      const pbkCode = `
      <languageVersion : 1.0;>
      kernel test
      <namespace : "Test"; vendor : "Vendor"; version : 1;>
      {
        input image4 src;
        output pixel4 dst;

        #define COUNT1 5
        #define COUNT2 4
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
      expect(result).to.contain('const value: f32 = array[1];');
      expect(result).to.contain('self.array[1] = 1.0;');
    })
    it('should import built-in functions used in macro', function() {
      const pbkCode = addPBKWrapper(`
        #define COW(a, b) min(a, b)
        float a = COW(1.9, 2.0);
      `);
      const result = convertPixelBender(pbkCode, { kernelOnly: true });
      expect(result).to.contain('fn min(v1: anytype, v2: anytype) @TypeOf(v1) {');
    })
    it('should correctly expand property access', function() {
      const pbkCode = addPBKWrapper(`
        #define SET(dest, src) dest.rgb = src.rgb; dest.a = src.a * factor;

        float factor = 0.5;
        float4 v1, v2;
        SET(v1, v2);
        SET(v1, sample(src, outCoord()));
      `);
      const result = convertPixelBender(pbkCode, { kernelOnly: true });
      expect(result).to.contain('v1 = @shuffle(f32, v1, v2, @Vector(4, i32){ -1, -2, -3, 3 });');
      expect(result).to.contain('v1[3] = v2[3] * factor;');
      expect(result).to.contain('v1 = @shuffle(f32, v1, @shuffle(f32, src.sampleLinear(self.outCoord()), undefined, @Vector(3, i32){ 0, 1, 2 }), @Vector(4, i32){ -1, -2, -3, 3 });');
      expect(result).to.contain('v1[3] = src.sampleLinear(self.outCoord())[3] * factor;');
    })
    it('should correctly translate a macro containing multiple statements', function() {
      const pbkCode = addPBKWrapper(`
        #define clear(a, b) { a = 0.0; b = 0.0; }

        float a = 0.0, b = 1.0;
        clear(a, b);
      `);
      const result = convertPixelBender(pbkCode, { kernelOnly: true });
      expect(result).to.contain('fn clear(a: *f32, b: *f32) void {');
      expect(result).to.contain('a.* = 0.0;');
      expect(result).to.contain('b.* = 0.0;');
    })
    it('should expand a macro without arguments containing multiple statements', function() {
      const pbkCode = addPBKWrapper(`
        #define clear() { a = 0.0; b = 0.0; }

        float a = 0.4, b = 1.0;
        clear();
      `);
      const result = convertPixelBender(pbkCode, { kernelOnly: true });
      expect(result).to.contain('a = 0.0;');
      expect(result).to.contain('b = 0.0;');
    })
    it('should expand a plain macro containing multiple statements', function() {
      const pbkCode = addPBKWrapper(`
        #define clear a = 0.0; b = 0.0;

        float a = 0.4, b = 1.0;
        clear;
      `);
      const result = convertPixelBender(pbkCode, { kernelOnly: true });
      expect(result).to.contain('a = 0.0;');
      expect(result).to.contain('b = 0.0;');
    })
    it('should throw when macro is called with too few arguments', function() {
      const pbkCode = addPBKWrapper(`
        #define addMul(a, c) (a * b + c)

        float b = 2.2;
        float value = addMul(1.4);
      `);
      expect(() => convertPixelBender(pbkCode, { kernelOnly: true })).to.throw(Error)
        .with.property('message').that.equal('Macro addMul() expects 2 arguments, received 1');
    })
    it('should throw when statement macro is used as expression', function() {
      const pbkCode = addPBKWrapper(`
        #define assign a = b;

        float a, b = 2.2;
        float value = assign();
      `);
      expect(() => convertPixelBender(pbkCode, { kernelOnly: true })).to.throw(Error)
        .with.property('message').that.equal('Unable to expand macro: assign');
    })

  })
  describe('Error handling', function() {
    it('should fail when version is not 1.0', function() {
      const pbkCode = `
      <languageVersion : 1.1;>
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
      expect(() => convertPixelBender(pbkCode, { kernelOnly: true })).to.throw(Error);
    })
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

function addPBKWrapper(statements, decls = '') {
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

  ${decls}

  void
  evaluatePixel()
  {
    ${statements}
  }
}
`;
}