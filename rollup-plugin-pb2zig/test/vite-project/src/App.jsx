import { useCallback, useRef, useEffect } from 'react'
import { createImageData } from './crystallize.pbk';
import testImage from '../img/malgorzata-socha.png';
import './App.css'

function App() {
  const srcCanvasRef = useRef();
  const dstCanvasRef = useRef();
  const update = useCallback(() => {
    const srcCanvas = srcCanvasRef.current;
    const dstCanvas = dstCanvasRef.current;
    const srcCTX = srcCanvas.getContext('2d');
    const { width, height } = srcCanvas;
    const srcImageData = srcCTX.getImageData(0, 0, width, height);
    const dstImageData = createImageData(width, height, srcImageData, {});
    const dstCTX = dstCanvas.getContext('2d');
    if (dstImageData instanceof Promise) {
      dstImageData.then(data => dstCTX.putImageData(data, 0, 0));
    } else {
      dstCTX.putImageData(dstImageData, 0, 0);
    }
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
