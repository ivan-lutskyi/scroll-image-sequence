// src/index.ts
import { preloadImages } from './core/preloadImages.js';
import { bindScroll } from './core/scrollController.js';
import { renderFrame } from './core/renderer.js';
import type { InitScrollImageSequenceOptions } from './types.js';
export type { InitScrollImageSequenceOptions, ImagePathResolver } from './types.js';

export function initScrollImageSequence(
  options: InitScrollImageSequenceOptions
): void {
  const {
    canvas,
    frameCount,
    imagePath,
    scrollArea = window.innerHeight * 2,
    resize = true,
    onLoaded,
    onFrame,
  } = options;

  if (frameCount <= 0) {
    onLoaded?.();
    return;
  }

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    return;
  }

  const setCanvasSize = () => {
    const targetWidth = canvas.clientWidth || window.innerWidth;
    const targetHeight = canvas.clientHeight || window.innerHeight;

    if (canvas.width !== targetWidth) {
      canvas.width = targetWidth;
    }
    if (canvas.height !== targetHeight) {
      canvas.height = targetHeight;
    }
  };

  setCanvasSize();

  let currentFrame = 0;
  let images: HTMLImageElement[] = [];
  const renderCurrentFrame = () => {
    const img = images[currentFrame];
    if (img) {
      renderFrame(ctx, img, canvas.width, canvas.height);
    }
  };

  images = preloadImages(frameCount, imagePath, () => {
    renderCurrentFrame();
    onLoaded?.();
  });

  const cleanupScroll = bindScroll({
    frameCount,
    scrollArea,
    onUpdate: (frameIndex) => {
      if (frameIndex === currentFrame) {
        return;
      }
      currentFrame = frameIndex;
      renderCurrentFrame();
      onFrame?.(frameIndex);
    },
  });

  let cleanupResize: (() => void) | null = null;

  if (resize) {
    const onResize = () => {
      setCanvasSize();
      renderCurrentFrame();
    };
    window.addEventListener('resize', onResize);
    cleanupResize = () => window.removeEventListener('resize', onResize);
  }

  const cleanupAll = () => {
    cleanupResize?.();
    cleanupScroll();
    window.removeEventListener('beforeunload', cleanupAll);
  };

  window.addEventListener('beforeunload', cleanupAll);
}
