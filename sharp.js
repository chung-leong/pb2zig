import sharp from 'sharp';
import { apply, Output } from './output.zig';

const { data, info } = await sharp('malgorzata.jpg').ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const { width, height, channels, depth, premultiplied } = info;
const srcPixels = new Uint8Array(data);
const output = Output.create(width, height);
apply({
   src: { pixels: srcPixels, width, height }
}, output);
const dstPixels = output.pixels.typedArray;
sharp(dstPixels, {
   raw: { width, height, channels, depth, premultiplied },
}).jpeg().toFile('./output.jpeg');
