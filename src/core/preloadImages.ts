import type { ImagePathResolver } from '../types.js';

export function preloadImages(
  frameCount: number,
  imagePath: ImagePathResolver,
  onLoaded?: () => void
): HTMLImageElement[] {
  if (frameCount <= 0) {
    onLoaded?.();
    return [];
  }

  const images: HTMLImageElement[] = new Array(frameCount);
  let loadedCount = 0;

  const handleLoad = () => {
    loadedCount += 1;
    if (loadedCount >= frameCount) {
      onLoaded?.();
    }
  };

  for (let i = 0; i < frameCount; i += 1) {
    const img = new Image();
    img.onload = handleLoad;
    img.onerror = handleLoad;
    img.src = imagePath(i);
    images[i] = img;
  }

  return images;
}
