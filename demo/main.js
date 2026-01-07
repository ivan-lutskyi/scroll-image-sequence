import { initScrollImageSequence } from '../dist/index.js';

const canvas = document.querySelector('#sequence-canvas');
const statusEl = document.querySelector('[data-status]');
const frameEl = document.querySelector('[data-frame]');

if (canvas) {
  const frameCount = 100;
  const pad = (index) => String(index + 1).padStart(5, '0');
  const stage = document.querySelector('.stage');
  const scrollArea =
    stage?.offsetHeight && stage.offsetHeight > window.innerHeight
      ? stage.offsetHeight - window.innerHeight
      : window.innerHeight * 2.5;

  initScrollImageSequence({
    canvas,
    frameCount,
    imagePath: (index) =>
      `./amimation_imgs/MAIN_FIG_ANIM_EXPLODE_${pad(index)}-min.jpg`,
    scrollArea,
    onLoaded: () => {
      if (statusEl) {
        statusEl.textContent = 'ready';
      }
    },
    onFrame: (frameIndex) => {
      if (frameEl) {
        frameEl.textContent = String(frameIndex + 1);
      }
    },
  });
}
