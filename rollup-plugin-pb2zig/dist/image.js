export function createImageData(width, height, source = {}, params = {}) {
  return createPartialImageData(width, height, 0, height, source, params);
}

export function createPartialImageData(width, height, start, count, source = {}, params = {}) {
  const input = new Input(undefined);
  const inputKeys = Object.keys(kernel.inputImages);
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
  if (missing.length > 0) {
    throw new Error(`Missing input image${missing.length > 1 ? 's' : ''}: ${missing.join(', ')}`);
  }
  const output = createPartialOutput(width, height, start, count, input, params);
  const createResult = (output) => {
    const outputKeys = Object.keys(output);
    const resultSet = {};
    for (const key of outputKeys) {
      const { data: { typedArray: ta }, width, height } = output[key];
      let imageData;
      if (typeof(ImageData) === 'function') {
        // convert Uint8Array to Uint8ClampedArray required by ImageData
        const clampedArray = new Uint8ClampedArray(ta.buffer, ta.byteOffset, ta.byteLength);
        imageData = new ImageData(clampedArray, width, height, { colorSpace });
      } else {
        // for Node.js, which doesn't have ImageData
        imageData = { data: ta, width, height };
      }
      if (outputKeys.length === 1) {
        // just return the one image
        return imageData;
      }
      resultSet[key] = imageData;
    }
    return resultSet;
  };
  if (output[Symbol.toStringTag] === 'Promise') {
    // top-level await isn't used and WASM is not ready
    return output.then(createResult);
  }
  return createResult(output);
}

export function getKernelInfo() {
  const info = {};
  function extract(object) {
    let f;
    if (object[Symbol.iterator]) {
      if ('string' in object) {
        return object.string;
      } else {
        const array = [];
        for (const element of object) {
          array.push(extract(element));
        }
        return array;
      }
    } else if (object && typeof(object) === 'object') {
      const result = {};
      for (const [ name, child ] of Object.entries(object)) {
        const childResult = extract(child);
        if (childResult !== undefined) {
          result[name] = childResult;
        }
      }
      return result;
    } else if (typeof(object) === 'function') {
      const types = {
        'bool': 'bool',
        '@Vector(2, bool)': 'bool2',
        '@Vector(3, bool)': 'bool3',
        '@Vector(4, bool)': 'bool4',

        'i32': 'int',
        '@Vector(2, i32)': 'int2',
        '@Vector(3, i32)': 'int3',
        '@Vector(4, i32)': 'int4',

        'f32': 'float',
        '@Vector(2, f32)': 'float2',
        '@Vector(3, f32)': 'float3',
        '@Vector(4, f32)': 'float4',

        '[2]@Vector(2, f32)': 'float2x2',
        '[3]@Vector(3, f32)': 'float3x3',
        '[4]@Vector(4, f32)': 'float4x4',
      };
      const type = types[object.name];
      if (type) {
        return type;
      } else {
        return extract({ ...object });
      }
    } else {
      return object;
    }
  };
  return extract(kernel);
}

export { __init };
