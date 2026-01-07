/** Options for binding scroll progress to frame updates. */
export interface BindScrollOptions {
  frameCount: number;
  scrollArea: number;
  onUpdate: (frameIndex: number) => void;
}

export function bindScroll(options: BindScrollOptions): () => void {
  const { frameCount, scrollArea, onUpdate } = options;
  const maxFrameIndex = Math.max(0, frameCount - 1);
  const maxScrollArea = Math.max(1, scrollArea);

  let rafId: number | null = null;

  const update = () => {
    const scrollTop =
      window.scrollY ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;
    const progress = Math.min(1, Math.max(0, scrollTop / maxScrollArea));
    const frameIndex = Math.min(
      maxFrameIndex,
      Math.max(0, Math.floor(progress * maxFrameIndex))
    );
    onUpdate(frameIndex);
  };

  const onScroll = () => {
    if (rafId !== null) {
      return;
    }
    rafId = window.requestAnimationFrame(() => {
      rafId = null;
      update();
    });
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  update();

  return () => {
    window.removeEventListener('scroll', onScroll);
    if (rafId !== null) {
      window.cancelAnimationFrame(rafId);
      rafId = null;
    }
  };
}
