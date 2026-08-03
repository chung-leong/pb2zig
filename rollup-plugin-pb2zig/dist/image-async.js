const { processAsync, startThreadPool, stopThreadPool } = constructor;

export async function createImageDataAsync(width, height, source = {}, params = {}, options = {}) {
  const input = createInput(source);
  const output = createOutput(width, height, { colorSpace: getColorSpace(input) });
  const result = await processAsync(input, output, params);
  return (outputKeys.length === 1) ? output[outputKeys[0]] : output;
}

export class AbortManager {
  currentOp = null;

  async call(cb) {
    const controller = new AbortController;
    const { signal } = controller;
    const prevOp = this.currentOp;
    const thisOp = this.currentOp = { controller, promise: null };
    if (prevOp) {
      // abort previous call and wait for promise rejection
      prevOp.controller.abort();
      await prevOp.promise?.catch(() => {});
    }
    if (signal.aborted) {
      // throw error now if the operation was aborted,
      // before the function is even called
      throw new Error('Aborted');
    }
    const result = await (this.currentOp.promise = cb?.(signal));
    if (thisOp === this.currentOp) {
      this.currentOp = null;
    }
    return result;
  }

  async stop() {
    return this.call(null);
  }
}

export { startThreadPool, stopThreadPool };
