import { expect } from 'chai';
import { readFile, writeFile } from 'fs/promises';
import sharp from 'sharp';
import 'mocha-skip-if';

import { convertPixelBender } from '../src/index.js';

skip.if(process.env.npm_lifecycle_event === 'coverage').
describe('Integration tests', function() {
  before(function() {
    process.env.NODE_ENV = 'production';
    process.env.ZIGAR_CLEAN = '';
  })
  it('should correctly translate advanced-stereographic.pbk', async function() {
    this.timeout(60000);
    const name = 'advanced-stereographic';
    await translate(name);
    await apply(name, { src: 'malgorzata-socha.png' });
  })
  it('should correctly translate alpha-from-max-color.pbk', async function() {
    this.timeout(60000);
    const name = 'alpha-from-max-color';
    await translate(name);
    await apply(name, { src: 'malgorzata-socha.png' });
  })
  it('should correctly translate asciimii.pbk', async function() {
    this.timeout(60000);
    const name = 'asciimii';
    await translate(name);
    const params = {
      size: 8,
      charCount: 58
    };
    await apply(name, {
      src: 'malgorzata-socha.png',
      text: 'fontmap.png',
    }, params);
  })
  it('should correctly translate bezier-aligner.pbk', async function() {
    this.timeout(60000);
    const name = 'bezier-aligner';
    await translate(name);
    const params = {
      startpoint: [ 12, 72 ],
      control1: [ 240, 228 ],
      control2: [ 336, 300 ],
      endpoint: [ 600, 200 ],
      scale: [ 0.5, 0.5 ],
      imagewidth: 165
    };
    await apply(name, {
      background: 'malgorzata-socha.png',
      texture: 'telephone-cord.png'
    }, params);
  })
  it('should correctly translate blendmode-color.pbk', async function() {
    this.timeout(60000);
    const name = 'blendmode-color';
    await translate(name);
    await apply(name, {
      src1: 'malgorzata-socha.png',
      src2: 'mandelbrot.png',
    });
  })
  it('should correctly translate blendmode-color2.pbk', async function() {
    this.timeout(60000);
    const name = 'blendmode-color2';
    await translate(name);
    await apply(name, {
      src1: 'malgorzata-socha.png',
      src2: 'mandelbrot.png',
    });
  })
  it('should correctly translate brightness-threshold.pbk', async function() {
    this.timeout(60000);
    const name = 'brightness-threshold';
    await translate(name);
    const params = {
      threshold: [ 0.25, 0.75 ],
    };
    await apply(name, { source: 'malgorzata-socha.png' }, params);
  })
  it('should correctly translate bulge.pbk', async function() {
    this.timeout(60000);
    const name = 'bulge';
    await translate(name);
    const params = {
      center: [ 200, 200 ],
      amplitude: 2
    };
    await apply(name, { src: 'malgorzata-socha.png' }, params);
  })
  it('should correctly translate bumpmap.pbk', async function() {
    this.timeout(60000);
    const name = 'bumpmap';
    await translate(name);
    const params = {
      lightwidth: 3000,
      reflection: 0.4,
      refl_tolerance: 30,
    };
    await apply(name, {
      src: 'zig-logo.png',
      img: 'wood.png',
    }, params);
  })
  it('should correctly translate cassini.pbk', async function() {
    this.timeout(60000);
    const name = 'cassini';
    await translate(name);
    await apply(name, { src: 'malgorzata-socha.png' });
  })
  it('should correctly translate checker-fill.pbk', async function() {
    this.timeout(60000);
    const name = 'checker-fill';
    await translate(name);
    await apply(name, {});
  })
  it('should correctly translate chihuly.pbk', async function() {
    this.timeout(60000);
    const name = 'chihuly';
    await translate(name);
    await apply(name, { inputImage: 'malgorzata-socha.png' });
  })
  it('should correctly translate circle-pattern.pbk', async function() {
    this.timeout(60000);
    const name = 'circle-pattern';
    await translate(name);
    const params = {
      fill: 0.2,
      scale: 1,
      distort: [ 5, 2 ],
      center: [ 325, 120 ],
      minSolid: 0.001,
      maxSolid: 0.04,
    };
    await apply(name, { src: 'malgorzata-socha.png' }, params);
  })
  it('should correctly translate circle-pixels.pbk', async function() {
    this.timeout(60000);
    const name = 'circle-pixels';
    await translate(name);
    const params = {
      dist: 19,
      size: 1,
      edgeAlpha: 18,
    };
    await apply(name, { src: 'malgorzata-socha.png' }, params);
  })
  it('should correctly translate circular-disks.pbk', async function() {
    this.timeout(60000);
    const name = 'circular-disks';
    await translate(name);
    const params = {
      size: 6,
      radius: 0.45,
      base: [ 340, 100 ],
    };
    await apply(name, { src: 'malgorzata-socha.png' }, params);
  })
  it('should correctly translate color-burn.pbk', async function() {
    this.timeout(60000);
    const name = 'color-burn';
    await translate(name);
    await apply(name, {
      dst: 'malgorzata-socha.png',
      src: 'mandelbrot.png',
    });
  })
  it('should correctly translate color-dodge.pbk', async function() {
    this.timeout(60000);
    const name = 'color-dodge';
    await translate(name);
    await apply(name, {
      dst: 'malgorzata-socha.png',
      src: 'mandelbrot.png',
    });
  })
  it('should correctly translate color.pbk', async function() {
    this.timeout(60000);
    const name = 'color';
    await translate(name);
    await apply(name, {
      dst: 'malgorzata-socha.png',
      src: 'mandelbrot.png',
    });
  })
  it('should correctly translate complex-inverse.pbk', async function() {
    this.timeout(60000);
    const name = 'complex-inverse';
    await translate(name);
    const params = {
      a: [ -0.2, -0.4 ],
      b: [ -0.7, -1.1 ],
      c: [ 0, 0.1 ],
      d: [ 2, -1.6 ],
      distort: [ 20, 20 ],
      imagesize: [ 500, 225 ],
      center: [ 420, 420 ],
      focus: 0,
      scale: 300,
      fill: 0.5,
    };
    await apply(name, { src: 'malgorzata-socha.png' }, params);
  })
  it('should correctly translate complex-rational.pbk', async function() {
    this.timeout(60000);
    const name = 'complex-rational';
    await translate(name);
    const params = {
      a: [ 0.8, 0.6 ],
      b: [ -110, 22 ],
      c: [ 0, 0 ],
      d: [ 62, 34 ],
      size: [ 390, 290 ],
      center: [ 160, 200 ],
    };
    await apply(name, { src: 'malgorzata-socha.png' }, params);
  })
  it('should correctly translate cross-stitch.pbk', async function() {
    this.timeout(60000);
    const name = 'cross-stitch';
    await translate(name);
    await apply(name, { src: 'malgorzata-socha.png' });
  })
  it('should correctly translate crystallize.pbk', async function() {
    this.timeout(60000);
    const name = 'crystallize';
    await translate(name);
    await apply(name, { src: 'malgorzata-socha.png' });
  })
  it('should correctly translate cubes-03.pbk', async function() {
    this.timeout(60000);
    const name = 'cubes-03';
    await translate(name);
    const params = {
      center: [ 240, 190 ],
      spin: [ 0.6, 1, 0.2 ],
      plunge: 1,
      cellDensity: 0.03,
      radius: 180,
    };
    await apply(name, { unused: 'malgorzata-socha.png' }, params);
  })
  it('should correctly translate cubic-space.pbk', async function() {
    this.timeout(60000);
    const name = 'cubic-space';
    await translate(name);
    await apply(name, { src: 'malgorzata-socha.png' });
  })
  it('should correctly translate deformer.pbk', async function() {
    this.timeout(60000);
    const name = 'deformer';
    await translate(name);
    const params = {
      center_x: 249,
      center_y: 200,
      imageHeight: 384,
      stretch: 1,
    }
    await apply(name, { src: 'malgorzata-socha.png' }, params);
  })
  it('should correctly translate displace.pbk', async function() {
    this.timeout(60000);
    const name = 'displace';
    await translate(name);
    const params = { amplitude: [ 100, -100 ] };
    await apply(name, {
      src: 'malgorzata-socha.png',
      src1: 'mandelbrot.png'
    }, params);
  })
  it('should correctly translate dilate-circle.pbk', async function() {
    this.timeout(60000);
    const name = 'dilate-circle';
    await translate(name);
    await apply(name, { i: 'malgorzata-socha.png' });
  })
  it('should correctly translate dilate-cross.pbk', async function() {
    this.timeout(60000);
    const name = 'dilate-cross';
    await translate(name);
    await apply(name, { i: 'malgorzata-socha.png' });
  })
  it('should correctly translate dilate-diamond.pbk', async function() {
    this.timeout(60000);
    const name = 'dilate-diamond';
    await translate(name);
    await apply(name, { i: 'malgorzata-socha.png' });
  })
  it('should correctly translate dilate-quad.pbk', async function() {
    this.timeout(60000);
    const name = 'dilate-quad';
    await translate(name);
    await apply(name, { i: 'malgorzata-socha.png' });
  })
  it('should correctly translate disks.pbk', async function() {
    this.timeout(60000);
    const name = 'disks';
    await translate(name);
    await apply(name, { src: 'malgorzata-socha.png' });
  })
  it('should correctly translate droste.pbk', async function() {
    this.timeout(60000);
    const name = 'droste';
    await translate(name);
    await apply(name, { oImage: 'malgorzata-socha.png' });
  })
  it('should correctly translate dynamic-palette.pbk', async function() {
    this.timeout(60000);
    const name = 'dynamic-palette';
    await translate(name);
    const params = {
      palette: 4,
    };
    await apply(name, { src1: 'malgorzata-socha.png' }, params);
  })
  it('should correctly translate erode-circle.pbk', async function() {
    this.timeout(60000);
    const name = 'erode-circle';
    await translate(name);
    await apply(name, { i: 'malgorzata-socha.png' });
  })
  it('should correctly translate erode-cross.pbk', async function() {
    this.timeout(60000);
    const name = 'erode-cross';
    await translate(name);
    await apply(name, { i: 'malgorzata-socha.png' });
  })
  it('should correctly translate erode-diamond.pbk', async function() {
    this.timeout(60000);
    const name = 'erode-diamond';
    await translate(name);
    await apply(name, { i: 'malgorzata-socha.png' });
  })
  it('should correctly translate erode-quad.pbk', async function() {
    this.timeout(60000);
    const name = 'erode-quad';
    await translate(name);
    await apply(name, { i: 'malgorzata-socha.png' });
  })
  it('should correctly translate escherizer.pbk', async function() {
    this.timeout(60000);
    const name = 'escherizer';
    await translate(name);
    await apply(name, { src: 'malgorzata-socha.png' });
  })
  it('should correctly translate exclusion.pbk', async function() {
    this.timeout(60000);
    const name = 'exclusion';
    await translate(name);
    await apply(name, {
      dst: 'malgorzata-socha.png',
      src: 'mandelbrot.png',
    });
  })
  it('should correctly translate focus-linear-blur.pbk', async function() {
    this.timeout(60000);
    const name = 'focus-linear-blur';
    await translate(name);
    await apply(name, { src: 'malgorzata-socha.png' });
  })
  it('should correctly translate fractal-explorer.pbk', async function() {
    this.timeout(60000);
    const name = 'fractal-explorer';
    await translate(name);
    const params = {
    };
    await apply(name, {}, params);
  })
  it('should correctly translate frei-chen.pbk', async function() {
    this.timeout(60000);
    const name = 'frei-chen';
    await translate(name);
    const params = {
      threshold: 0.25,
      factor: 4,
    };
    await apply(name, { src: 'malgorzata-socha.png' }, params);
  })
  it('should correctly translate green-screen.pbk', async function() {
    this.timeout(60000);
    const name = 'green-screen';
    await translate(name);
    await apply(name, { src: 'helicopter.png' });
  })
  it('should correctly translate hex-cells.pbk', async function() {
    this.timeout(60000);
    const name = 'hex-cells';
    await translate(name);
    const params = { size: 10 };
    await apply(name, { img: 'malgorzata-socha.png' }, params);
  })
  it('should correctly translate high-contrast.pbk', async function() {
    this.timeout(60000);
    const name = 'high-contrast';
    await translate(name);
    await apply(name, { src: 'malgorzata-socha.png' });
  })
  it('should correctly translate hue.pbk', async function() {
    this.timeout(60000);
    const name = 'hue';
    await translate(name);
    await apply(name, {
      dst: 'malgorzata-socha.png',
      src: 'mandelbrot.png',
    });
  })
  it('should correctly translate hypno.pbk', async function() {
    this.timeout(60000);
    const name = 'hypno';
    await translate(name);
    const params = {
      imgSize: [ 512, 384 ],
      center: [ 256, 192 ],
    };
    await apply(name, { src: 'malgorzata-socha.png' }, params);
  })
  it('should correctly translate invert-rgb.pbk', async function() {
    this.timeout(60000);
    const name = 'invert-rgb';
    await translate(name);
    await apply(name, { src: 'malgorzata-socha.png' });
  })
  it('should correctly translate jitter.pbk', async function() {
    this.timeout(60000);
    const name = 'jitter';
    await translate(name);
    await apply(name, { src: 'malgorzata-socha.png' });
  })
  it('should correctly translate levels.pbk', async function() {
    this.timeout(60000);
    const name = 'levels';
    await translate(name);
    const params = {
      blue: [ 0.5, 1 ],
      luminance: [ 0.5, 1 ],
    };
    await apply(name, { src: 'malgorzata-socha.png' }, params);
  })
  it('should correctly translate luminosity.pbk', async function() {
    this.timeout(60000);
    const name = 'luminosity';
    await translate(name);
    await apply(name, {
      dst: 'malgorzata-socha.png',
      src: 'mandelbrot.png',
    });
  })
  it('should correctly translate mandelbulb-quick.pbk', async function() {
    this.timeout(60000);
    const name = 'mandelbulb-quick';
    await translate(name);
    await apply(name, {});
  })
  it('should correctly translate mandelbulb.pbk', async function() {
    this.timeout(60000);
    const name = 'mandelbulb';
    await translate(name);
    await apply(name, {});
  })
  it('should correctly translate mercator.pbk', async function() {
    this.timeout(60000);
    const name = 'mercator';
    await translate(name);
    const params = {
      center: 320,
      width: 400
    };
    await apply(name, { src: 'malgorzata-socha.png' }, params);
  })
  it('should correctly translate metallic.pbk', async function() {
    this.timeout(60000);
    const name = 'metallic';
    await translate(name);
    const params = {
      lightsource: [ 240, 230, 50 ],
      shininess: 35,
      shadow: 0.4,
      relief: 3.25,
      stripesize: [ 256, 10 ],
      viewDirection: [ 0.5, 0.02, 1 ],
    };
    await apply(name, {
      source: 'zig-logo.png',
      stripe: 'stripe.png',
    }, params);
  })
  it('should correctly translate newton-raphson.pbk', async function() {
    this.timeout(60000);
    const name = 'newton-raphson';
    await translate(name);
    await apply(name, {});
  })
  it('should correctly translate outline.pbk', async function() {
    this.timeout(60000);
    const name = 'outline';
    await translate(name);
    await apply(name, { src: 'malgorzata-socha.png' });
  })
  it('should correctly translate outline2.pbk', async function() {
    this.timeout(60000);
    const name = 'outline2';
    await translate(name);
    await apply(name, { src: 'malgorzata-socha.png' });
  })
  it('should correctly translate painting.pbk', async function() {
    this.timeout(60000);
    const name = 'painting';
    await translate(name);
    await apply(name, { src: 'malgorzata-socha.png' });
  })
  it('should correctly translate pencil.pbk', async function() {
    this.timeout(60000);
    const name = 'pencil';
    await translate(name);
    await apply(name, { src: 'malgorzata-socha.png' });
  })
  it('should correctly translate pixelate.pbk', async function() {
    this.timeout(60000);
    const name = 'pixelate';
    await translate(name);
    const params = { dimension: 10 };
    await apply(name, { inputImage: 'malgorzata-socha.png' }, params);
  })
  it('should correctly translate plasma.pbk', async function() {
    this.timeout(60000);
    const name = 'plasma';
    await translate(name);
    const params = {
      size: [ 400, 400 ],
      distort: 0.1,
      color_offset: [ 0, 1.5, 1 ],
    };
    await apply(name, {}, params);
  })
  it('should correctly translate planes.pbk', async function() {
    this.timeout(60000);
    const name = 'planes';
    await translate(name);
    const params = {
      imgSize: [ 512, 384 ],
      center: [ 256, 192 ],
    };
    await apply(name, { src: 'malgorzata-socha.png' }, params);
  })
  it('should correctly translate posterize.pbk', async function() {
    this.timeout(60000);
    const name = 'posterize';
    await translate(name);
    await apply(name, { src: 'malgorzata-socha.png' });
  })
  it('should correctly translate quaternion-julia.pbk', async function() {
    this.timeout(60000);
    const name = 'quaternion-julia';
    await translate(name);
    const params = {
      size: [ 400, 400 ],
    };
    await apply(name, {}, params);
  })
  it('should correctly translate radial-caleidoscope.pbk', async function() {
    this.timeout(60000);
    const name = 'radial-caleidoscope';
    await translate(name);
    const params = {
      angle: 0.45,
      direction: 0,
      basepoint: [ 190, 70 ],
    };
    await apply(name, { src: 'malgorzata-socha.png' }, params);
  })
  it('should correctly translate random-pixelation.pbk', async function() {
    this.timeout(60000);
    const name = 'random-pixelation';
    await translate(name);
    await apply(name, { src: 'malgorzata-socha.png' });
  })
  it('should correctly translate rays.pbk', async function() {
    this.timeout(60000);
    const name = 'rays';
    await translate(name);
    const params = {
      imgSize: [ 512, 384 ],
      center: [ 256, 192 ],
    };
    await apply(name, { src: 'malgorzata-socha.png' }, params);
  })
  it('should correctly translate rays2.pbk', async function() {
    this.timeout(60000);
    const name = 'rays2';
    await translate(name);
    const params = {
      imgSize: [ 512, 384 ],
      center: [ 256, 192 ],
    };
    await apply(name, { src: 'malgorzata-socha.png' }, params);
  })
  it('should correctly translate raytracer.pbk', async function() {
    this.timeout(60000);
    const name = 'raytracer';
    await translate(name);
    const params = {
      outputWidth: 512,
      outputHeight: 512,
    };
    await apply(name, {}, params);
  })
  it('should correctly translate rt-julia.pbk', async function() {
    this.timeout(60000);
    const name = 'rt-julia';
    await translate(name);
    const params = {
      width: 400,
      height: 300,
      c: [ -0.04, -0.02, -0.28, 0.11 ],
      w: 0.02,
      camDistance: 2.5,
      rotationY: -0.4,

      outputWidth: 400,
      outputHeight: 300,
    };
    await apply(name, { inputUsedToTest: 'malgorzata-socha.png' }, params);
  })
  it('should correctly translate rt-terrain.pbk', async function() {
    this.timeout(60000);
    const name = 'rt-terrain';
    await translate(name);
    const params = {
    };
    await apply(name, { inputUsedToTest: 'malgorzata-socha.png' }, params);
  })
  it('should correctly translate ripple-blocks.pbk', async function() {
    this.timeout(60000);
    const name = 'ripple-blocks';
    await translate(name);
    await apply(name, { src: 'malgorzata-socha.png' });
  })
  it('should correctly translate saturation.pbk', async function() {
    this.timeout(60000);
    const name = 'saturation';
    await translate(name);
    await apply(name, {
      dst: 'malgorzata-socha.png',
      src: 'mandelbrot.png',
    });
  })
  it('should correctly translate sepia.pbk', async function() {
    this.timeout(60000);
    const name = 'sepia';
    await translate(name);
    const params = { intensity: 0.2 };
    await apply(name, { src: 'malgorzata-socha.png' }, params);
  })
  it('should correctly translate sharpen.pbk', async function() {
    this.timeout(60000);
    const name = 'sharpen';
    await translate(name);
    await apply(name, { src: 'malgorzata-socha.png' });
  })
  it('should correctly translate simple.pbk', async function() {
    this.timeout(60000);
    const name = 'simple';
    await translate(name);
    await apply(name, { src: 'malgorzata-socha.png' });
  })
  it('should correctly translate simple-box-blur.pbk', async function() {
    this.timeout(60000);
    const name = 'simple-box-blur';
    await translate(name);
    await apply(name, { src: 'malgorzata-socha.png' });
  })
  it('should correctly translate simple-point-light.pbk', async function() {
    this.timeout(60000);
    const name = 'simple-point-light';
    await translate(name);
    await apply(name, { src: 'malgorzata-socha.png' });
  })
  it('should correctly translate skin-color-filter.pbk', async function() {
    this.timeout(60000);
    const name = 'skin-color-filter';
    await translate(name);
    await apply(name, { src: 'malgorzata-socha.png' });
  })
  it('should correctly translate smart-ssao.pbk', async function() {
    this.timeout(60000);
    const name = 'smart-ssao';
    await translate(name);
    await apply(name, { depthmap: 'malgorzata-socha.png' });
  })
  it('should correctly translate slices.pbk', async function() {
    this.timeout(60000);
    const name = 'slices';
    await translate(name);
    await apply(name, { src: 'malgorzata-socha.png' });
  })
  it('should correctly translate smart-normal-map.pbk', async function() {
    this.timeout(60000);
    const name = 'smart-normal-map';
    await translate(name);
    await apply(name, { src: 'malgorzata-socha.png' });
  })
  it('should correctly translate smudger.pbk', async function() {
    this.timeout(60000);
    const name = 'smudger';
    await translate(name);
    await apply(name, { src: 'malgorzata-socha.png' });
  })
  it('should correctly translate soft-light.pbk', async function() {
    this.timeout(60000);
    const name = 'soft-light';
    await translate(name);
    await apply(name, {
      dst: 'malgorzata-socha.png',
      src: 'mandelbrot.png',
    });
  })
  it('should correctly translate sphere.pbk', async function() {
    this.timeout(60000);
    const name = 'sphere';
    await translate(name);
    const params = {
      imgSize: [ 256, 256 ],
      center: [ 250, 192 ],
      offset: [ 0, 0 ],
    };
    await apply(name, { src: 'malgorzata-socha.png' }, params);
  })
  it('should correctly translate star.pbk', async function() {
    this.timeout(60000);
    const name = 'star';
    await translate(name);
    const params = {
      imgSize: [ 512, 384 ],
      center: [ 250, 192 ],
      offset: [ 0, 0 ],
    };
    await apply(name, { src: 'malgorzata-socha.png' }, params);
  })
  it('should correctly translate tint.pbk', async function() {
    this.timeout(60000);
    const name = 'tint';
    await translate(name);
    const params = {
      amount: 0.25,
      color: [ 1, 0, 0, ],
    };
    await apply(name, { src: 'malgorzata-socha.png' }, params);
  })
  it('should correctly translate tunnel.pbk', async function() {
    this.timeout(60000);
    const name = 'tunnel';
    await translate(name);
    const params = {
      imgSize: [ 512, 384 ],
      center: [ 256, 192 ],
    };
    await apply(name, { src: 'malgorzata-socha.png' }, params);
  })
  it('should correctly translate tunnel2.pbk', async function() {
    this.timeout(60000);
    const name = 'tunnel2';
    await translate(name);
    const params = {
      imgSize: [ 512, 384 ],
      center: [ 256, 192 ],
    };
    await apply(name, { src: 'malgorzata-socha.png' }, params);
  })
  it('should correctly translate tunnel3.pbk', async function() {
    this.timeout(60000);
    const name = 'tunnel3';
    await translate(name);
    const params = {
      imgSize: [ 512, 384 ],
      center: [ 256, 192 ],
    };
    await apply(name, { src: 'malgorzata-socha.png' }, params);
  })
  it('should correctly translate tunnel4.pbk', async function() {
    this.timeout(60000);
    const name = 'tunnel4';
    await translate(name);
    const params = {
      imgSize: [ 512, 384 ],
      center: [ 256, 192 ],
    };
    await apply(name, { src: 'malgorzata-socha.png' }, params);
  })
  it('should correctly translate twirl.pbk', async function() {
    this.timeout(60000);
    const name = 'twirl';
    await translate(name);
    const params = {
      radius: 300,
      center: [ 250, 330 ],
      twirlAngle: 55,
      outputWidth: 512,
      outputHeight: 480,
    };
    await apply(name, { oImage: 'malgorzata-socha.png' }, params);
  })
  it('should correctly translate vertical-scroll.pbk', async function() {
    this.timeout(60000);
    const name = 'vertical-scroll';
    await translate(name);
    await apply(name, { src: 'malgorzata-socha.png' });
  })
  it('should correctly translate vortex.pbk', async function() {
    this.timeout(60000);
    const name = 'vortex';
    await translate(name);
    const params = {
      imgSize: [ 512, 384 ],
      center: [ 250, 192 ],
      offset: [ 0, 0 ],
    };
    await apply(name, { src: 'malgorzata-socha.png' }, params);
  })
  it('should correctly translate warp.pbk', async function() {
    this.timeout(60000);
    const name = 'warp';
    await translate(name);
    const params = {
      image_h: 300,
      center: [ 340, 180 ],
      tick: 0.5,
      spread: 460,
    };
    await apply(name, { src: 'malgorzata-socha.png' }, params);
  })
  it('should correctly translate wave.pbk', async function() {
    this.timeout(60000);
    const name = 'wave';
    await translate(name);
    const params = {
      center: [ 125, 220 ],
      amplitude: 5,
      frequency: 2,
    };
    await apply(name, { src: 'malgorzata-socha.png' }, params);
  })
  it('should correctly translate zoom-blur-focus.pbk', async function() {
    this.timeout(60000);
    const name = 'zoom-blur-focus';
    await translate(name);
    await apply(name, { src: 'malgorzata-socha.png' });
  })
})

function resolve(relPath) {
  return new URL(relPath, import.meta.url).pathname;
}

const pkbDir = resolve('./pbk-samples');
const zigDir = resolve('./zig-output');
const imgInDir = resolve('./img-input');
const imgOutDir = resolve('./img-output');

async function translate(name) {
  const pbkCode = await readFile(`${pkbDir}/${name}.pbk`, 'utf8');
  const zigCode = convertPixelBender(pbkCode);
  const path = `${zigDir}/${name}.zig`;
  let oldZigCode = '';
  try {
    oldZigCode = await readFile(path, 'utf-8');
  } catch (err) {
  }
  if (zigCode !== oldZigCode) {
    await writeFile(path, zigCode);
  }
}

async function apply(name, sources, options = {}) {
  const {
    outputWidth,
    outputHeight,
    ...params
  } = options;
  const { apply, allocate } = await import(`${zigDir}/${name}.zig`);
  const input = { ...params };
  let width = 400, height = 400, channels = 4, depth = 'uchar', srcCount = 0;
  for (const [ srcName, filename ] of Object.entries(sources)) {
    let img = sharp(`${imgInDir}/${filename}`);
    img = img.ensureAlpha();
    img = img.raw();
    const { data, info } = await img.toBuffer({ resolveWithObject: true });
    input[srcName] = {
      pixels: data,
      width: info.width,
      height: info.height
    };
    if (srcCount++ === 0) {
      width = info.width;
      height = info.height;
    }
  }
  if (outputWidth !== undefined) {
    width = outputWidth;
  }
  if (outputHeight !== undefined) {
    height = outputHeight;
  }
  const output = allocate(width, height);
  apply(input, output);
  const outputImages = Object.values(output);
  for (const [ index, image ] of outputImages.entries())  {
    const filename = (outputImages.length > 1) ? name + index : name;
    const dstPixels = image.pixels.typedArray;
    sharp(dstPixels, {
      raw: { width, height, channels, depth, premultiplied: true },
    }).png().toFile(`${imgOutDir}/${filename}.png`);
  }
}
