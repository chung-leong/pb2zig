export async function getKernelInfo() {
  return startJob('getKernelInfo');
}

export async function createImageData(width, height, source = {}, params = {}) {
  return createPartialImageData(width, height, 0, height, source, params);
}

export async function createPartialImageData(width, height, start, count, source = {}, params = {}) {
  const transfer = [];
  const args = [ width, height, start, count, source, params ];
  if ('data' in source && 'width' in source && 'height' in source) {
    transfer.push(source.data.buffer);
  } else {
    for (const image of Object.values(source)) {
      transfer.push(image.data.buffer);
    }
  }
  return startJob('createPartialImageData', args, transfer);
}

export function manageWorkers(settings) {
  keepAlive = settings.keepAlive;
  maxCount = settings.maxCount;
  if (!keepAlive) {
    idleWorkers.splice(0);
  } else {
    const extra = (idleWorkers.length + activeWorkers.length) - maxCount;
    if (extra > 0) {
      idleWorkers.splice(0, extra);
    }
  }
}

export function purgeQueue() {
  pendingRequests.splice(0);
}

const workerURL = '[WORKER-URL]';

let keepAlive = true;
let maxCount = navigator.hardwareConcurrency;

const activeWorkers = [];
const idleWorkers = [];
const pendingRequests = [];
const jobs = [];

let nextJobID = 1;

async function acquireWorker() {
  let worker = idleWorkers.shift();
  if (!worker) {
    if (maxCount < 1) {
      throw new Error(`Unable to start worker because maxCount is ${maxCount}`);
    }
    if (activeWorkers.length < maxCount) {
      // start a new one
      worker = new Worker(workerURL, { type: 'module' });
      worker.onmessage = handleMessage;
      worker.onerror = (evt) => console.error(evt);
    } else {
      // wait for the next worker to become available again
      return new Promise((resolve) => {
        pendingRequests.push(resolve);
      });
    }
  }
  activeWorkers.push(worker);
  return worker;
}

async function startJob(name, args = [], transfer = []) {
  const worker = await acquireWorker();
  const job = {
    id: nextJobID++,
    promise: null,
    resolve: null,
    reject: null,
    worker,
  };
  job.promise = new Promise((resolve, reject) => {
    job.resolve = resolve;
    job.reject = reject;
  });
  jobs.push(job);
  worker.postMessage([ name, job.id, ...args], { transfer });
  return job.promise;
}

function handleMessage(evt) {
  const [ name, jobID, result ] = evt.data;
  const jobIndex = jobs.findIndex(j => j.id === jobID);
  const job = jobs[jobIndex];
  jobs.splice(jobIndex, 1);
  const { worker, resolve, reject } = job;
  if (name !== 'error') {
    resolve(result);
  } else {
    reject(result);
  }
  // work on pending request if any
  const next = pendingRequests.shift();
  if (next) {
    next(worker);
  } else {
    const workerIndex = activeWorkers.indexOf(worker);
    if (workerIndex !== -1) {
      activeWorkers.splice(workerIndex, 1);
    }
    if (keepAlive && idleWorkers.length < maxCount) {
      idleWorkers.push(worker);
    }
  }
}
