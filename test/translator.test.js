import { expect } from 'chai';

import { convertPixelBender } from '../src/index.js';

describe('Translator tests', function() {
  it('should correctly translate a for loop', function() {
    const pbkCode = addPBKWrapper(`
      for (int hello = 0; hello < 10; hello++) {
        float2 coord = float2(0, hello);
        dst = sample(src, coord);
      }
    `);
    const result = convertPixelBender(pbkCode);
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

function addPBKWrapper(statements) {
  return `
<languageVersion : 1.0;>
kernel test
<namespace : "Test"; vendor : "Vendor"; version : 1;>
{
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