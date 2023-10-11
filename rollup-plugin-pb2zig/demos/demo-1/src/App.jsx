import { useState, useRef, useEffect } from 'react'
import { createImageData } from './crystallize.pbk';
import testImage from '../img/malgorzata-socha.png';
import './App.css'

function App() {
  const srcCanvasRef = useRef();
  const dstCanvasRef = useRef();
  const [ bitmap, setBitmap ] = useState();
  const [ library, setLibrary ] = useState();
  const [ parameters, setParameters ] = useState({});

  async function updateDestinationImage() {
    if (!library) {
      return;
    }
    const { createImageData } = library;
    const srcCanvas = srcCanvasRef.current;
    const dstCanvas = dstCanvasRef.current;
    const srcCTX = srcCanvas.getContext('2d', { willReadFrequently: true });
    const { width, height } = srcCanvas;
    const srcImageData = srcCTX.getImageData(0, 0, width, height);
    const dstCTX = dstCanvas.getContext('2d', { willReadFrequently: true });
    console.time('createImageData');
    const dstImageData = await createImageData(width, height, srcImageData, parameters);
    console.timeEnd('createImageData');
    dstCTX.putImageData(dstImageData, 0, 0);
  }

  function updateSourceImage() {
    const srcCanvas = srcCanvasRef.current;
    const dstCanvas = dstCanvasRef.current;
    srcCanvas.width = dstCanvas.width = bitmap.width;
    srcCanvas.height = dstCanvas.height = bitmap.height;
    const ctx = srcCanvas.getContext('2d', { willReadFrequently: true });
    ctx.drawImage(bitmap, 0, 0);
  }

  useEffect(() => {
    fetch(testImage).then(async (req) => {
      const blob = await req.blob();
      const bitmap = await createImageBitmap(blob);
      setBitmap(bitmap);
    });
    const url = new URL(location);
    const filter = url.searchParams.get('f') ?? 'simple';
    import(`../pbk/${filter}.pbk`).then((library) => {
      setLibrary(library);
    });
  }, []);
  useEffect(() => {
    if (bitmap) {
      updateSourceImage();
    }
  }, [ bitmap ]);
  useEffect(() => {
    if (bitmap && library) {
      updateDestinationImage();
    }
  }, [ bitmap, library, parameters ]);

  return (
    <div className="App">
      <div className="frame">
        <div>Before:</div>
        <canvas ref={srcCanvasRef}></canvas>
      </div>
      <div className="frame">
        <div>After:</div>
        <canvas ref={dstCanvasRef}></canvas>
      </div>
    </div>
  );
}

export default App
