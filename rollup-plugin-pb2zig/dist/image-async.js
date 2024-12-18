const { createOutputAsync } = constructor;

export { startThreadPool, stopThreadPool } from constructor;

export async function createImageDataAsync(width, height, source = {}, params = {}, options = {}) {
  const input = createInput(source);
  const colorSpace = getColorSpace(input);
  const output = await createOutputAsync(width, height, input, params, options);
  return createResult(output, colorSpace);
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
}
