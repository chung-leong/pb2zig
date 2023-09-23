import { expect } from 'chai';
import { readFile, writeFile } from 'fs/promises';
import sharp from 'sharp';
import 'mocha-skip-if';

import { convertPixelBender } from '../src/index.js';

describe('Integration tests', function() {
  before(function() {
    process.env.NODE_ENV = 'production';
    process.env.ZIGAR_CLEAN = '';
  })
  it('should correctly translate advanced-stereographic.pbk', async function() {
    this.timeout(60000);
    const name = 'advanced-stereographic';
    await translate(name);
    await apply(name, { src: 'malgorzata-socha.png' });
  })
  it('should correctly translate alpha-from-max-color.pbk', async function() {
    this.timeout(60000);
    const name = 'alpha-from-max-color';
    await translate(name);
    await apply(name, { src: 'malgorzata-socha.png' });
  })
  it('should correctly translate asciimii.pbk', async function() {
    this.timeout(60000);
    const name = 'asciimii';
    await translate(name);
    const params = {
      size: 8,
      charCount: 58
    };
    await apply(name, {
      src: 'malgorzata-socha.png',
      text: 'fontmap.png',
    }, params);
  })
  it('should correctly translate bulge.pbk', async function() {
    this.timeout(60000);
    const name = 'bulge';
    await translate(name);
    const params = {
      center: [ 200, 200 ],
      amplitude: 2
    };
    await apply(name, { src: 'malgorzata-socha.png' }, params);
  })
  it('should correctly translate cassini.pbk', async function() {
    this.timeout(60000);
    const name = 'cassini';
    await translate(name);
    await apply(name, { src: 'malgorzata-socha.png' });
  })
  it('should correctly translate checker-fill.pbk', async function() {
    this.timeout(60000);
    const name = 'checker-fill';
    await translate(name);
    await apply(name, {});
  })
  it('should correctly translate chihuly.pbk', async function() {
    this.timeout(60000);
    const name = 'chihuly';
    await translate(name);
    await apply(name, { src: 'malgorzata-socha.png' });
  })
  it('should correctly translate circle-pattern.pbk', async function() {
    this.timeout(60000);
    const name = 'circle-pattern';
    await translate(name);
    await apply(name, { src: 'malgorzata-socha.png' });
  })
  it('should correctly translate circle-pixels.pbk', async function() {
    this.timeout(60000);
    const name = 'circle-pixels';
    await translate(name);
    await apply(name, { src: 'malgorzata-socha.png' });
  })
  it('should correctly translate circular-disks.pbk', async function() {
    this.timeout(60000);
    const name = 'circular-disks';
    await translate(name);
    const params = {
      size: 6,
      radius: 0.45,
      base: [ 340, 100 ],
    };
    await apply(name, { src: 'malgorzata-socha.png' }, params);
  })
  it('should correctly translate crystallize.pbk', async function() {
    this.timeout(60000);
    const name = 'crystallize';
    await translate(name);
    await apply(name, { src: 'malgorzata-socha.png' });
  })
  it('should correctly translate escherizer.pbk', async function() {
    this.timeout(60000);
    const name = 'escherizer';
    await translate(name);
    await apply(name, { src: 'malgorzata-socha.png' });
  })
  it('should correctly translate dilate-diamond.pbk', async function() {
    this.timeout(60000);
    const name = 'dilate-diamond';
    await translate(name);
    await apply(name, { src: 'malgorzata-socha.png' });
  })
  it('should correctly translate disks.pbk', async function() {
    this.timeout(60000);
    const name = 'disks';
    await translate(name);
    await apply(name, { src: 'malgorzata-socha.png' });
  })
  it('should correctly translate green-screen.pbk', async function() {
    this.timeout(60000);
    const name = 'green-screen';
    await translate(name);
    await apply(name, { src: 'helicopter.png' });
  })
  it('should correctly translate hex-cells.pbk', async function() {
    this.timeout(60000);
    const name = 'hex-cells';
    await translate(name);
    const params = { size: 10 };
    await apply(name, { img: 'malgorzata-socha.png' }, params);
  })
  it('should correctly translate invert-rgb.pbk', async function() {
    this.timeout(60000);
    const name = 'invert-rgb';
    await translate(name);
    await apply(name, { src: 'malgorzata-socha.png' });
  })
  it('should correctly translate jitter.pbk', async function() {
    this.timeout(60000);
    const name = 'jitter';
    await translate(name);
    await apply(name, { src: 'malgorzata-socha.png' });
  })
  it('should correctly translate mercator.pbk', async function() {
    this.timeout(60000);
    const name = 'mercator';
    await translate(name);
    const params = {
      center: 320,
      width: 400
    };
    await apply(name, { src: 'malgorzata-socha.png' }, params);
  })
  it('should correctly translate metallic.pbk', async function() {
    this.timeout(60000);
    const name = 'metallic';
    await translate(name);
    await apply(name, { src: 'zig-logo.png' });
  })
  it('should correctly translate outline.pbk', async function() {
    this.timeout(60000);
    const name = 'outline';
    await translate(name);
    await apply(name, { src: 'malgorzata-socha.png' });
  })
  it('should correctly translate outline2.pbk', async function() {
    this.timeout(60000);
    const name = 'outline2';
    await translate(name);
    await apply(name, { src: 'malgorzata-socha.png' });
  })
  it('should correctly translate painting.pbk', async function() {
    this.timeout(60000);
    const name = 'painting';
    await translate(name);
    await apply(name, { src: 'malgorzata-socha.png' });
  })
  it('should correctly translate pencil.pbk', async function() {
    this.timeout(60000);
    const name = 'pencil';
    await translate(name);
    await apply(name, { src: 'malgorzata-socha.png' });
  })
  it('should correctly translate pixelate.pbk', async function() {
    this.timeout(60000);
    const name = 'pixelate';
    await translate(name);
    await apply(name, { src: 'malgorzata-socha.png' });
  })
  it('should correctly translate posterize.pbk', async function() {
    this.timeout(60000);
    const name = 'posterize';
    await translate(name);
    await apply(name, { src: 'malgorzata-socha.png' });
  })
  it('should correctly translate sepia.pbk', async function() {
    this.timeout(60000);
    const name = 'sepia';
    await translate(name);
    const params = { intensity: 0.2 };
    await apply(name, { src: 'malgorzata-socha.png' }, params);
  })
  it('should correctly translate slices.pbk', async function() {
    this.timeout(60000);
    const name = 'slices';
    await translate(name);
    await apply(name, { src: 'malgorzata-socha.png' });
  })
  it('should correctly translate simple.pbk', async function() {
    this.timeout(60000);
    const name = 'simple';
    await translate(name);
    await apply(name, { src: 'malgorzata-socha.png' });
  })
  it('should correctly translate sharpen.pbk', async function() {
    this.timeout(60000);
    const name = 'sharpen';
    await translate(name);
    await apply(name, { src: 'malgorzata-socha.png' });
  })
  it('should correctly translate smudger.pbk', async function() {
    this.timeout(60000);
    const name = 'smudger';
    await translate(name);
    await apply(name, { src: 'malgorzata-socha.png' });
  })
  it('should correctly translate twirl.pbk', async function() {
    this.timeout(60000);
    const name = 'twirl';
    await translate(name);
    await apply(name, { src: 'malgorzata-socha.png' });
  })
  skip.
  it('should correctly translate warp.pbk', async function() {
    this.timeout(60000);
    const name = 'warp';
    await translate(name);
    await apply(name, { src: 'malgorzata-socha.png' });
  })
  it('should correctly translate wave.pbk', async function() {
    this.timeout(60000);
    const name = 'wave';
    await translate(name);
    const params = {
      center: [ 125, 220 ],
      amplitude: 5,
      frequency: 2,
    };
    await apply(name, { src: 'malgorzata-socha.png' }, params);
  })
  it('should correctly translate zoom-blur-focus.pbk', async function() {
    this.timeout(60000);
    const name = 'zoom-blur-focus';
    await translate(name);
    await apply(name, { src: 'malgorzata-socha.png' });
  })
})

function resolve(relPath) {
  return new URL(relPath, import.meta.url).pathname;
}

const pkbDir = resolve('./pbk-samples');
const zigDir = resolve('./zig-output');
const imgInDir = resolve('./img-input');
const imgOutDir = resolve('./img-output');

async function translate(name) {
  const pbkCode = await readFile(`${pkbDir}/${name}.pbk`, 'utf8');
  const zigCode = convertPixelBender(pbkCode);
  const path = `${zigDir}/${name}.zig`;
  let oldZigCode = '';
  try {
    oldZigCode = await readFile(path, 'utf-8');
  } catch (err) {
  }
  if (zigCode !== oldZigCode) {
    await writeFile(path, zigCode);
  }
}

async function apply(name, sources, params = {}) {
  const { apply, Output } = await import(`${zigDir}/${name}.zig`);
  const input = { ...params };
  let width = 250, height = 250, channels = 4, depth = 'uchar', srcCount = 0;
  for (const [ srcName, filename ] of Object.entries(sources)) {
    let img = sharp(`${imgInDir}/${filename}`);
    img = img.ensureAlpha();
    img = img.raw();
    const { data, info } = await img.toBuffer({ resolveWithObject: true });
    input[srcName] = {
      pixels: data,
      width: info.width,
      height: info.height
    };
    if (srcCount++ === 0) {
      width = info.width;
      height = info.height;
    }
  }
  const output = Output.create(width, height);
  apply(input, output);
  const dstPixels = output.pixels.typedArray;
  sharp(dstPixels, {
    raw: { width, height, channels, depth },
  }).png().toFile(`${imgOutDir}/${name}.png`);
}

