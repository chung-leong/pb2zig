import { useState, useRef, useEffect } from 'react'
import { StreamVideo, useMediaCapture } from 'react-media-capture';
import './App.css'

function App() {
  const src1CanvasRef = useRef(document.createElement('CANVAS'));
  const src2CanvasRef = useRef();
  const dstCanvasRef = useRef();
  const [ bitmap2, setBitmap2 ] = useState();
  const [ library, setLibrary ] = useState();
  const [ kernelInfo, setKernelInfo ] = useState();
  const [ parameters, setParameters ] = useState({});
  const { liveVideo } = useMediaCapture({ watchVolume: true });

  async function updateDestinationImage() {
    const { createImageData, purgeQueue } = library;
    const src1Canvas = src1CanvasRef.current;
    const src2Canvas = src2CanvasRef.current;
    const dstCanvas = dstCanvasRef.current;
    const src1CTX = src1Canvas.getContext('2d', { willReadFrequently: true });
    const src2CTX = src2Canvas.getContext('2d', { willReadFrequently: true });
    const { width: width1, height: height1 } = src1Canvas;
    const { width: width2, height: height2 } = src2Canvas;
    const src1ImageData = src1CTX.getImageData(0, 0, width1, height1);
    const src2ImageData = src2CTX.getImageData(0, 0, width2, height2);
    const dstCTX = dstCanvas.getContext('2d');
    const sources = [ src1ImageData, src2ImageData ];
    purgeQueue();
    const dstImageData = await createImageData(width1, height1, sources, parameters);
    dstCTX.putImageData(dstImageData, 0, 0);
  }

  function updateCanvasDimensions() {
    const srcCanvas = src1CanvasRef.current;
    const dstCanvas = dstCanvasRef.current;
    const { width, height } = liveVideo ?? { width: 0, height: 0 };
    srcCanvas.width = dstCanvas.width = width;
    srcCanvas.height = dstCanvas.height = height;
  }

  function updateSourceImage1() {
    const srcCanvas = src1CanvasRef.current;
    const video = document.getElementById('video');
    const ctx = srcCanvas.getContext('2d', { willReadFrequently: true });
    ctx.drawImage(video, 0, 0);
  }

  function updateSourceImage2() {
    const srcCanvas = src2CanvasRef.current;
    srcCanvas.width = bitmap2.width;
    srcCanvas.height = bitmap2.height;
    const ctx = srcCanvas.getContext('2d', { willReadFrequently: true });
    ctx.drawImage(bitmap2, 0, 0);
  }

  async function handleImage2Change(evt) {
    const { files } = evt.target;
    if (files.length >= 1) {
      const bitmap = await createImageBitmap(files[0]);
      setBitmap2(bitmap);
    }
  }

  function handleResetClick() {
    setParameters({});
  }

  function renderControls() {
    if (!kernelInfo) {
      return;
    }
    const controls = Object.entries(kernelInfo.parameters).map(([ name, info ], index) => {
      const {
        type,
        defaultValue,
        maxValue,
        minValue,
        stepInterval,
        description
      } = info;
      let currentValue = parameters[name] ?? defaultValue;
      switch (type) {
        case 'int':
        case 'float': {
          const value = currentValue;
          const min = minValue;
          const max = maxValue;
          const step = stepInterval ?? getStepInterval(min, max, type);
          const props1 = {
            type: 'range', value, min, max, step,
            onChange: (evt) => {
              const newValue = parseFloat(evt.target.value);
              setParameters({ ...parameters, [name]: newValue });
            },
          };
          const props2 = { ...props1, type: 'number' };
          return (
            <div key={index} className="control">
              <div title={description}>{name}</div>
              <input {...props1} />
              <input {...props2} />
            </div>
          );
        }
        case 'bool': {
          const value = currentValue;
          const props = {
            value: currentValue,
            onChange: (evt) => {
              const newValue = evt.target.value === 'true';
              setParameters({ ...parameters, [name]: newValue });
            }
          };
          return (
            <div key={index} className="control">
              <div title={description}>{name}</div>
              <select {...props}>
                <option>false</option>
                <option>true</option>
              </select>
            </div>
          );
        }
        case 'int2': case 'int3': case 'int4':
        case 'float2': case 'float3': case 'float4': {
          const width = parseInt(type.slice(-1));
          const indices = [ 0, 1, 2, 3 ].slice(0, width);
          if (!currentValue) {
            currentValue = indices.map(i => 0);
          }
          const inputs = indices.map((i) => {
            const value = currentValue[i];
            const min = minValue?.[i];
            const max = maxValue?.[i];
            const step = stepInterval?.[i] ?? getStepInterval(min, max, type.slice(0, -1));
            const props = {
              type: 'number', value, min, max, step,
              onChange: (evt) => {
                const newValue = [ ...currentValue ];
                newValue[i] = parseFloat(evt.target.value);
                setParameters({ ...parameters, [name]: newValue });
              },
            };
            return (
              <span key={i} className="element">
                <input {...props} />
              </span>
            );
          });
          return (
            <div key={index} className="control">
              <div title={description}>{name}</div>
              <div className="vector">{inputs}</div>
            </div>
          );
        }
        case 'bool2': case 'bool3': case 'bool4': {
          const width = parseInt(type.slice(-1));
          const indices = [ 0, 1, 2, 3 ].slice(0, width);
          if (!currentValue) {
            currentValue = indices.map(i => false);
          }
          const inputs = indices.map((i) => {
            const value = currentValue[i];
            const props = {
              value,
              onChange: (evt) => {
                const newValue = [ ...currentValue ];
                newValue[i] = evt.target.value === 'true';
                console.log(newValue);
                setParameters({ ...parameters, [name]: newValue });
              },
            };
            return (
              <span key={i} className="element">
                <select {...props}>
                  <option>false</option>
                  <option>true</option>
                </select>
              </span>
            );
          });
          return (
            <div key={index} className="control">
              <div title={description}>{name}</div>
              <div className="vector">{inputs}</div>
            </div>
          );
        }
        case 'float2x2': case 'float3x3': case 'float4x4': {
          const width = parseInt(type.slice(-1));
          const indices = [ 0, 1, 2, 3 ].slice(0, width);
          if (!currentValue) {
            currentValue = indices.map(i => indices.map(j => 0));
          }
          const columns = indices.map((i) => {
            const inputs = indices.map((j) => {
              const value = currentValue[i][j];
              const min = minValue?.[i]?.[j];
              const max = maxValue?.[i]?.[j];
              const step = stepInterval?.[i]?.[j] ?? getStepInterval(min, max, 'float');
              const props = { type: 'number', value, min, max, step,
                onChange: (evt) => {
                  const newValue = [ ...currentValue ];
                  newValue[i] = [ ...currentValue[i] ];
                  newValue[i][j] = parseFloat(evt.target.value);
                  setParameters({ ...parameters, [name]: newValue });
                },
              };
              return (
                <div key={j} className="element">
                  <input {...props} />
                </div>
              );
            });
            return <div key={i} className="column">{inputs}</div>;
          });
          return (
            <div key={index} className="control">
              <div title={description}>{name}</div>
              <div className="matrix">{columns}</div>
            </div>
          );
        }
      }
    });
    controls.push(
      <div key={controls.length} className="control button">
        <button onClick={handleResetClick}>Reset</button>
      </div>
    )
    return controls;
  }

  useEffect(() => {
    const url = new URL(location);
    const imgName2 = url.searchParams.get('i2') ?? 'fontmap';
    import(`../img/${imgName2}.png`).then(async ({ default: url }) => {
      const req = await fetch(url);
      const blob = await req.blob();
      const bitmap = await createImageBitmap(blob);
      setBitmap2(bitmap);
    });
    const filter = url.searchParams.get('f') ?? 'asciimii';
    import(`../pbk/${filter}.pbk`).then((library) => {
      setLibrary(library);
    });
  }, []);
  useEffect(() => {
    if (bitmap2) {
      updateSourceImage2();
      const url = new URL(location);
      const sizeName2 = url.searchParams.get('s2');
      const widthName2 = url.searchParams.get('w2');
      const heightName2 = url.searchParams.get('h2');
      if (sizeName2) {
        parameters[sizeName2] = [ bitmap2.width, bitmap2.height ];
      }
      if (widthName2) {
        parameters[widthName2] = bitmap2.width;
      }
      if (heightName2) {
        parameters[heightName2] = bitmap2.height;
      }
    }
  }, [ bitmap2 ]);
  useEffect(() => {
    if (library) {
      const { getKernelInfo } = library;
      getKernelInfo().then(setKernelInfo);
    }
  }, [ library ]);
  useEffect(() => {
    updateCanvasDimensions();
    if (liveVideo && library) {
      const update = () => {
        updateSourceImage1();
        updateDestinationImage();
      };
      const interval = setInterval(update, 1000 / 24);
      return () => clearInterval(interval);
    }
  }, [ liveVideo, bitmap2, library, parameters ]);
  useEffect(() => {
    if (kernelInfo) {
      document.title += `: ${kernelInfo.description}`;
    }
  }, [ kernelInfo ]);

  return (
    <div className="App">
      <div className="display">
        <div className="frame">
          <div>
            Input 1:
          </div>
          <StreamVideo id="video" srcObject={liveVideo?.stream} muted />
          <div>
            Input 2:
            <label className="change-btn">
              change
              <input type="file" accept="image/*" onChange={handleImage2Change} />
            </label>
          </div>
          <canvas ref={src2CanvasRef}></canvas>
        </div>
        <div className="frame">
          <div>Output:</div>
          <canvas ref={dstCanvasRef}></canvas>
        </div>
      </div>
      <div className="controls">
        {renderControls()}
      </div>
    </div>
  );
}

function getStepInterval(minValue, maxValue, type) {
  if (type === 'float') {
    const s = `${minValue}`;
    const dot = s.indexOf('.');
    if (dot !== -1) {
      return 1 / (10 ** (s.length - dot - 1));
    }
    const range = maxValue - minValue;
    if (range <= 2) {
      return 0.01;
    } else if (range <= 20) {
      return 0.05;
    } else if (range <= 200) {
      return 0.5;
    }
  }
}

export default App
