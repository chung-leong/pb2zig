const { createOutput, Input, kernel } = constructor;

const inputKeys = [];
for (const [ key ] of kernel.inputImages) {
  inputKeys.push(key);
}
const outputKeys = [];
for (const [ key ] of kernel.outputImages) {
  outputKeys.push(key);
}

function createInput(source) {
  if (Array.isArray(source)) {
    const list = source;
    source = {};
    for (const [ index, key ] of inputKeys.entries()) {
      source[key] = list[index];
    }
  }
  const input = new Input(undefined);
  const missing = [];
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
  }
  if (missing.length > 0) {
    throw new Error(`Missing input image${missing.length > 1 ? 's' : ''}: ${missing.join(', ')}`);
  }
  return input;
}

function getColorSpace(input) {
  let colorSpace;
  for (const key of inputKeys) {
    let imageData = input[key];
    if (colorSpace) {
      if (imageData.colorSpace !== colorSpace) {
        throw new Error(`Input images must all use the same color space: ${colorSpace}`);
      }
    } else {
      colorSpace = imageData.colorSpace;
    }
  }
  return colorSpace;
}

function createResult(output, colorSpace) {
  if (output[Symbol.toStringTag] === 'Promise') {
    return output.then(createResult);
  }
  const resultSet = {};
  for (const key of outputKeys) {
    let imageData;
    if (typeof(ImageData) === 'function') {
      const { data: { clampedArray }, width, height } = output[key];
      imageData = new ImageData(clampedArray, width, height, { colorSpace });
    } else {
      // for Node.js, which doesn't have ImageData
      const { data: { typedArray }, width, height } = output[key];
      imageData = { data: typedArray, width, height };
    }
    if (outputKeys.length === 1) {
      // just return the one image
      return imageData;
    }
    resultSet[key] = imageData;
  }
  return resultSet;
}

export function createImageData(width, height, source = {}, params = {}) {
  const input = createInput(source);
  const colorSpace = getColorSpace(input);
  const output = createOutput(width, height, input, params);
  return createResult(output, colorSpace);
}

export function getKernelInfo() {
  const info = {};
  for (let [ name, value ] of kernel) {
    if (name === 'parameters') {
      const params = {};
      for (const [ pname, pvalue ] of value) {
        const param = params[pname] = {};
        for (let [ aname, avalue ] of pvalue) {
          if (typeof(avalue) === 'object') {
            avalue = avalue.string ?? avalue.valueOf();
          } else if (typeof(avalue) === 'function') {
            avalue = getPBType(avalue.name);
          }
          param[aname] = avalue;
        }
      }
      value = params;
    } else {
      if (typeof(value) === 'object') {
        value = value.string ?? value.valueOf();
      }
    }
    info[name] = value;
  }
  return info;
}

function getPBType(zigType) {
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
  return types[zigType];
}

export { __zigar };
