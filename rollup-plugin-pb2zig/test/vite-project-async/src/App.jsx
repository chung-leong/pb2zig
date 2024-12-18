import { useCallback, useRef, useEffect, useState } from 'react'
import {
  AbortManager, createImageDataAsync, startThreadPool, stopThreadPool,
} from './crystallize.pbk';
import testImage from '../img/malgorzata-socha.png';
import './App.css'

function App() {
  const srcCanvasRef = useRef();
  const dstCanvasRef = useRef();
  const [ am ] = useState(new AbortManager());
  const update = useCallback(async () => {
    try {
      const srcCanvas = srcCanvasRef.current;
      const dstCanvas = dstCanvasRef.current;
      const srcCTX = srcCanvas.getContext('2d');
      const { width, height } = srcCanvas;
      const srcImageData = srcCTX.getImageData(0, 0, width, height);
      const dstImageData = await am.call((signal) => {
        return createImageDataAsync(width, height, srcImageData, {}, { signal });
      });
      const dstCTX = dstCanvas.getContext('2d');
      if (dstImageData instanceof Promise) {
        dstImageData.then(data => dstCTX.putImageData(data, 0, 0));
      } else {
        dstCTX.putImageData(dstImageData, 0, 0);
      }
    } catch (err) {
      if (err.message !== 'Aborted') {
        console.error(err);
      }
    }
  }, []);
  useEffect(() => {
    startThreadPool(navigator.hardwareConcurrency);
    return async () => {
      await am.stop();
      stopThreadPool();
    };
  }, []);
  useEffect(() => {
    (async () => {
      const req = await fetch(testImage);
      const blob = await req.blob();
      const bitmap = await createImageBitmap(blob);
      const srcCanvas = srcCanvasRef.current;
      const dstCanvas = dstCanvasRef.current;
      srcCanvas.width = dstCanvas.width = bitmap.width;
      srcCanvas.height = dstCanvas.height = bitmap.height;
      const ctx = srcCanvas.getContext('2d');
      ctx.drawImage(bitmap, 0, 0);
      update();
    })();
  }, []);

  return (
    <div className="App">
      <div id="src-container">
        <div>Before:</div>
        <canvas ref={srcCanvasRef}></canvas>
      </div>
      <div id="dst-container">
        <div>After:</div>
        <canvas ref={dstCanvasRef}></canvas>
      </div>
    </div>
  );
}

export default App
