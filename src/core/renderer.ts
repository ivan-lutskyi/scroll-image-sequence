export function renderFrame(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  width: number,
  height: number
): void {
  if (width <= 0 || height <= 0) {
    return;
  }

  const imgWidth = img.naturalWidth || img.width;
  const imgHeight = img.naturalHeight || img.height;

  if (imgWidth <= 0 || imgHeight <= 0) {
    return;
  }

  ctx.clearRect(0, 0, width, height);

  const canvasRatio = width / height;
  const imageRatio = imgWidth / imgHeight;

  let drawWidth = width;
  let drawHeight = height;

  if (imageRatio > canvasRatio) {
    drawWidth = width;
    drawHeight = width / imageRatio;
  } else {
    drawHeight = height;
    drawWidth = height * imageRatio;
  }

  const offsetX = (width - drawWidth) / 2;
  const offsetY = (height - drawHeight) / 2;

  ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
}
