import { createOutput } from 'crystallize.zig';
import sharp from 'sharp';

// create image object, ensure that it has an alpha channel
const img = sharp(`./socha.jpg`).ensureAlpha().raw();
// extract raw data
const { data, info } = await img.toBuffer({ resolveWithObject: true });
const { width, height, channels } = info;
// call createOutput with input image and params
const input = { src: { data, width, height } };
const params = { size: 25 };
const output = createOutput(width, height, input, params);
// obtain Uint8Array from image 'dst'; its data property is of the type `[]@Vector(4, u8)`
const { typedArray } = output.dst.data;
// save the raw data as a PNG file
sharp(typedArray, { raw: { width, height, channels } }).png().toFile(`./crystallize.png`);
