export async function getKernel(workerNum = 0) {
  return startJob(workerNum, 'getKernel');
}

export async function createImageData(width, height, source = {}, params = {}, workerNum = 0) {
  return createPartialImageData(width, height, 0, height, source, params, workerNum);
}

export async function createPartialImageData(width, height, start, count, source = {}, params = {}, workerNum = 0) {
  const transfer = [];
  const args = [ width, height, start, count, source, params ];
  if ('data' in source && 'width' in source && 'height' in source) {
    transfer.push(source.data.buffer);
  } else {
    for (const image of Object.values(source)) {
      transfer.push(source.data.buffer);
    }
  }
  return startJob(workerNum, 'createPartialImageData', args, transfer);
}

export async function releaseWorkers() {
  const promises = jobs.map(j => j.promise);
  await Promise.allSettled(promises);
  workers.splice(0);
}

const workerURL = '[WORKER-URL]';
const workers = [];

const jobs = [];
let nextJobID = 1;

function startJob(workerNum, name, args = [], transfer = []) {
  let worker = workers[workerNum];
  if (!worker) {
    console.log(`Creating worker ${workerNum} ${workerURL}`);
    worker = workers[workerNum] = new Worker(workerURL, { type: 'module' });
    worker.onmessage = handleMessage;
    worker.onerror = (evt) => console.error(evt);
  }
  const job = {
    id: nextJobID++,
    promise: null,
    resolve: null,
    reject: null,
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
  if (name !== 'error') {
    job.resolve(result);
  } else {
    job.reject(result);
  }
}
