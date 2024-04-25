onmessage = async (evt) => {
  if (!Array.isArray(evt.data)) {
    return;
  }
  const [ name, jobId, ...args ] = evt.data;
  try {
    const [ result, transfer ] = await runFunction(name, args);
    postMessage([ name, jobId, result ], { transfer });
  } catch (err) {
    postMessage([ 'error', jobId, err ]);
  }
};

async function runFunction(name, args) {
  switch (name) {
    case 'getKernelInfo':
      const kernel = getKernelInfo(...args);
      return [ kernel ];
    case 'createPartialImageData':
    // await needed here since we're not using top-level await
    // and Zigar functions can return promises initially
    const output = await createPartialImageData(...args);
      const transfer = [];
      if ('data' in output && 'width' in output && 'height' in output) {
        transfer.push(output.data.buffer);
      } else {
        for (const image of Object.entries(output)) {
          transfer.push(output.data.buffer);
        }
      }
      return [ output, transfer ];
    default:
      throw new Error(`Unknown function: ${name}`);
  }
}

postMessage('ready');
