import { convertPixelBender } from 'pb2zig';
import { readFile, writeFile, stat, mkdir, rmdir, readdir, unlink } from 'fs/promises';
import { join, parse, resolve } from 'path';
import { fileURLToPath } from 'url';
import { tmpdir } from 'os';
import { createHash } from 'crypto';
import createZigarPlugin from 'rollup-plugin-zigar';

export default function createPlugin(options = {}) {
  const zigarPlugin = createZigarPlugin({ ...options, omitExports: true });
  return {
    configResolved(config) {
      return zigarPlugin.configResolved(config);
    },
    configureServer(server) {
      zigarPlugin.configureServer(server);
    },
    async load(id) {
      if (id.endsWith('.pbk')) {
        // load the code and translate it to Zig
        const pbkPath = resolve(id);
        const pbkCode = await readFile(pbkPath, 'utf-8');
        const zigCode = convertPixelBender(pbkCode, { asyncFn: options.multithreaded });
        // save it to a file in a temp location
        const pbkFile = parse(pbkPath);
        const zigDir = join(tmpdir(), md5(id));
        await mkdirp(zigDir);
        const zigPath = join(zigDir, pbkFile.name + '.zig');
        await writeFile(zigPath, zigCode);
        // ask rollup-plugin-zigar to transcode it to WASM
        let { code } = await zigarPlugin.load.call(this, zigPath);
        await rmdirp(zigDir);
        // the transpiler places exported field in the output script's own scope,
        // we can therefore just attach code to it as though that script's been imported
        const imageJSPath = fileURLToPath(new URL('./image.js', import.meta.url));
        const imageJS = await readFile(imageJSPath, 'utf-8');
        code += `\n\n// rollup-plugin-pb2zig additions\n${imageJS}`;
        if (options.multithreaded) {
          const imageAsyncJSPath = fileURLToPath(new URL('./image-async.js', import.meta.url));
          const imageAsyncJS = await readFile(imageAsyncJSPath, 'utf-8');
          code += `\n${imageAsyncJS}`;
        }
        return code;
      }
    }
  };
}

async function mkdirp(path) {
  try {
    await stat(path);
  } catch (err) {
    /* c8 ignore next 3 */
    if (err.code != 'ENOENT') {
      throw err;
    }
    const { dir } = parse(path);
    await mkdirp(dir);
    await mkdir(path);
  }
}

async function rmdirp(dir) {
  try {
    const list = await readdir(dir);
    for (const name of list) {
      const path = join(dir, name);
      try {
        const info = await stat(path, false);
        if (info?.isDirectory()) {
          await rmdirp(path);
        } else if (info) {
          await unlink(path);
        }
      } catch (err) {
        if (err.code != 'ENOENT') {
          throw err;
        }
      }
    }
    await rmdir(dir);
  } catch (err) {
    if (err.code !== 'ENOENT') {
      throw err;
    }
  }
}

function md5(text) {
  const hash = createHash('md5');
  hash.update(text);
  return hash.digest('hex');
}
