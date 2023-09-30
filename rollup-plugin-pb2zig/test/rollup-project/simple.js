import { Input, createOutput } from 'simple.wasm.js';

function createImageData(width, height, source = {}, params = {}) {
  const input = new Input;
  const inputKeys = Object.keys(input);
  const missing = [];
  let colorSpace;
  for (const key of inputKeys) {
    let imageData = source[key];
    if (!imageData) {
      // use the source as the sole input image when there's just one
      if (inputKeys.length === 1 && [ 'data', 'width', 'height' ].every(k => !!source[k])) {
        imageData = source;
      } else {
        missing.push(key);
      }
    }
    input[key] = imageData;
    if (colorSpace) {
      if (imageData.colorSpace !== colorSpace) {
        throw new Error(`Input images must all use the same color space: ${colorSpace}`);
      }
    } else {
      colorSpace = imageData.colorSpace;
    }
  }
  if (missing) {
    throw new Error(`Missing input image${missing.length > 1 ? 's' : ''}: ${missing.join(', ')}`);
  }
  const output = createOutput(width, height, input, params);
  const outputKeys = output;
  const resultSet = {};
  for (const key of outputKeys) {
    const { data: { typedArray: ta }, width, height } = output[key];
    // convert Uint8Array to Uint8ClampedArray required by ImageData
    const clampedArray = new Uint8ClampedArray(ta.buffer, ta.byteOffset, ta.byteLength);
    const imageData = new ImageData(clampedArray, width, height, { colorSpace });
    if (outputKeys.length === 1) {
      // just return the one image
      return imageData;
    }
    resultSet[key] = imageData;
  }
  return resultSet;
}

export { createImageData };
