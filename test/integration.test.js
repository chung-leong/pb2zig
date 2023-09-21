import { expect } from 'chai';
import { readFile, writeFile } from 'fs/promises';
import sharp from 'sharp';
import 'mocha-skip-if';

import { convertPixelBender } from '../src/index.js';

describe('Integration tests', function() {
  before(function() {
    process.env.NODE_ENV = 'production';
  })
  it('should correctly translate painting.pbk', async function() {
    this.timeout(60000);
    await translate('painting');
    await apply('painting', { src: 'malgorzata-socha.png' });
  })
  it('should correctly translate posterize.pbk', async function() {
    this.timeout(60000);
    await translate('posterize');
    await apply('posterize', { src: 'malgorzata-socha.png' });
  })
  it('should correctly translate cassini.pbk', async function() {
    this.timeout(60000);
    await translate('cassini');
    await apply('cassini', { src: 'malgorzata-socha.png' });
  })
  it('should correctly translate asciimii.pbk', async function() {
    this.timeout(60000);
    await translate('asciimii');
    await apply('asciimii', {
      src: 'malgorzata-socha.png',
      text: 'fontmap.png',
    });
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
  let width, height, channels = 4, depth = 'uchar';
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
    if (width === undefined) {
      width = info.width;
      height = info.height;
    }
  }
  const output = Output.create(width, height);
  apply(input, output);
  const dstPixels = output.pixels.typedArray;
  sharp(dstPixels, {
    raw: { width, height, channels, depth },
  }).jpeg().toFile(`${imgOutDir}/${name}.jpg`);
}

