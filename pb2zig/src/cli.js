import { existsSync, readFileSync, writeFileSync } from 'fs';
import { resolve, join, parse } from 'path';
import { convertPixelBender } from './index.js';

const pixelTypes = [ 'u8', 'i16', 'u16', 'f32' ];

function processArguments(args) {
  let target = '';
  const list = [];
  const options = {};
  for (const arg of args) {
    if (target) {
      switch (target) {
        case 'outputDir':
          if (!existsSync(arg)) {
            throw new Error(`Output directory does not exists: ${arg}`);
          }
          break;
        case 'outputPixelType':
        case 'inputPixelType':
          if (!pixelTypes.includes(arg)) {
            throw new Error(`Invalid pixel type: ${arg}`);
          }
          break;
        case 'stackSize':
          const size = parseInt(arg);
          if (!(size > 0)) {
            throw new Error(`Invalid stack size: ${arg}`);
          }
          arg = size;
          break;
      }
      options[target] = arg;
      target = '';
      continue;
    }
    switch (arg) {
      case '--kernel-only':
      case '-ko':
        options.kernelOnly = true;
        break;
      case '--async-fn':
      case '-af':
        options.asyncFn = true;
        break;
      case '--output-dir':
      case '-od':
        target = 'outputDir';
        break;
      case '--input-pixel':
      case '-ip':
        target = 'inputPixelType';
        break;
      case '--output-pixel':
      case '-op':
        target = 'outputPixelType';
        break;
      case '--stack-size':
      case '-sz':
        target = 'stackSize';
        break;
      case '--help':
      case '-h':
        options.showHelp = true;
        break;
      case '--version':
      case '-v':
        options.showVersion = true;
        break;
      default:
        if (arg.startsWith('-') && !arg.includes('.')) {
          throw new Error(`Unknown command: ${arg}`);
        } else {
          list.push(arg);
        }
    }
  }
  return { list, options };
}

function printHelp() {
  console.log(`
pb2zig [OPTION]... [FILE]...

Options:
  --kernel-only,  -ko             Omit image processing code
  --async-fn,     -af             Include async image processing functions
  --output-dir,   -od [DIR]       Set output directory
  --input-pixel,  -ip [TYPE]      Set input pixel type (default: u8)
  --output-pixel, -op [TYPE]      Set output pixel type (default: u8)
  --stack-size,   -sz [SIZE]      Set stack size of thread (default: 1024)
  --version,      -v              Show version number
`.trimStart());
}

function printVersion() {
  const url = new URL('../package.json', import.meta.url);
  const text = readFileSync(url, 'utf-8');
  const { version } = JSON.parse(text);
  console.log(version);
}

try {
  const { list, options } = processArguments(process.argv.slice(2));
  if (options.showVersion) {
    printVersion();
    process.exit(0);
  }
  if (list.length === 0 || options.showHelp) {
    printHelp();
    process.exit(0);
  }
  const {
    outputDir = resolve('.'),
    ...conversionOptions
  } = options;
  for (const name of list) {
    const inputPath = resolve(name);
    const outputPath = join(outputDir, parse(inputPath).name + '.zig');
    const pbkCode = readFileSync(inputPath, 'utf-8');
    const zigCode  = convertPixelBender(pbkCode, conversionOptions);
    writeFileSync(outputPath, zigCode, 'utf-8');
  }
} catch (err) {
  console.error(`Error: ${err.message}`);
  process.exit(1);
}
