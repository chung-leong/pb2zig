import sharp from 'sharp';

const { data, info } = await sharp('malgorzata.jpg').ensureAlpha().raw({ depth: 'float' }).toBuffer({ resolveWithObject: true });

const array = new Float32Array(data);

