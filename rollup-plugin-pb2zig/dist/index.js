import { convertPixelBender } from 'pb2zig';
import { readFile, writeFile, stat, mkdir, rmdir, readdir, unlink } from 'fs/promises';
import { join, parse, resolve } from 'path';
import { fileURLToPath } from 'url';
import { tmpdir } from 'os';
import { createHash } from 'crypto';
import { createRequire } from 'module';
import createZigarPlugin, { schema as zigarSchema, verifyOptions } from 'rollup-plugin-zigar';

const schema = {
  type: 'object',
  default: {},
  title: 'Zigar-loader Options Schema',
  required: [],
  additionalProperties: false,
  properties: {
    webWorker: {
      type: 'boolean',
      title: 'Use web worker to process images in the background',
    },
  }
};

export default function createPlugin(options = {}) {
  const pb2zigOptions = {};
  const zigarOptions = { omitExports: true };
  for (const [ name, value ] of Object.entries(options)) {
    if (zigarSchema.properties[name]) {
      zigarOptions[name] = value;
    } else {
      pb2zigOptions[name] = value;
    }
  }
  if (!('optimize' in zigarOptions)) {
    zigarOptions.optimize = 'ReleaseSmall';
  }
  verifyOptions(pb2zigOptions, schema);
  const {
    webWorker = false,
  } = pb2zigOptions;
  if (webWorker) {
    zigarOptions.topLevelAwait = false;
  }
  const zigarPlugin = createZigarPlugin(zigarOptions);
  const workerScripts = {};
  let serving = false;
  return {
    configResolved(config) {
      return zigarPlugin.configResolved(config);
    },
    configureServer(server) {
      serving = true;
      server.middlewares.use((req, res, next) => {
        const { pathname } = req._parsedUrl;
        const script = workerScripts[pathname];
        if (script) {
          res.setHeader('Content-Type', 'text/javascript');
          res.write(script);
          res.end();
        } else if (pathname === '/zigar-runtime') {
          // send the zigar runtime
          (async () => {
            try {
              const require = createRequire(import.meta.url);
              const modulePath = require.resolve('zigar-runtime');
              const content = await readFile(modulePath);
              res.setHeader('Content-Type', 'text/javascript');
              res.write(content);
              res.end();
            } catch (err) {
              next(err);
            }
          })();
        } else {
          next();
        }
      })
      zigarPlugin.configureServer(server);
    },
    async load(id) {
      if (id.endsWith('.pbk')) {
        // load the code and translate it to Zig
        const pbkPath = resolve(id);
        const pbkCode = await readFile(pbkPath, 'utf-8');
        const zigCode = convertPixelBender(pbkCode);
        // save it to a file in a temp location
        const file = parse(id);
        const zigDir = join(tmpdir(), md5(id));
        await mkdirp(zigDir);
        const zigPath = join(zigDir, file.name + '.zig');
        await writeFile(zigPath, zigCode);
        // rollup-plugin-zigar to transcode it to WASM
        const { code } = await zigarPlugin.load.call(this, zigPath);
        await rmdirp(zigDir);
        // the transpiler places exported field in the output script's own scope,
        // we can therefore just attach code to it as though that script's been imported
        const imageJSPath = fileURLToPath(new URL('./image.js', import.meta.url));
        const imageJS = await readFile(imageJSPath, 'utf-8');
        const imageCode = `${code}\n// rollup-plugin-pb2zig additions\n${imageJS}`;
        if (webWorker) {
          const managerJSPath = fileURLToPath(new URL('./manager.js', import.meta.url));
          const managerJS = await readFile(managerJSPath, 'utf-8');
          const workerJSPath = fileURLToPath(new URL('./worker.js', import.meta.url));
          const workerJS = await readFile(workerJSPath, 'utf-8');
          const workerCode = `${imageCode}\n${workerJS}`;
          const workerName = `${parse(pbkPath).name}-worker`;
          let workerURL;
          if (serving) {
            const virtualPath = `/pb2zig/${md5(pbkPath).slice(0, 8)}/${workerName}.js`;
            // replace the reference to zigar-runtime so that the worker would try to load the file
            workerScripts[virtualPath] = workerCode.replace('zigar-runtime', '/zigar-runtime');
            workerURL = virtualPath + `?hash=${md5(workerCode).slice(0, 8)}`;
          } else {
            // save the code so we can retrieve it in the if statement down below
            const virtualPath = `${pbkPath}#worker`;
            workerScripts[virtualPath] = workerCode;
            const refID = this.emitFile({
              type: 'chunk',
              id: virtualPath,
              name: workerName,
            });
            workerURL = `import.meta.ROLLUP_FILE_URL_${refID}`;
          }
          return managerJS.replace("'[WORKER-URL]'", workerURL);
        } else {
          return imageCode;
        }
      } else if (id.endsWith('.pbk#worker')) {
        return workerScripts[id];
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
