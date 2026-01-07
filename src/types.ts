/** Resolves a frame index to an image URL. */
export type ImagePathResolver = (index: number) => string;

export interface InitScrollImageSequenceOptions {
  /** Canvas element used for rendering the image sequence. */
  canvas: HTMLCanvasElement;
  /** Total number of frames in the sequence. */
  frameCount: number;
  /** Function that maps a frame index to an image URL. */
  imagePath: ImagePathResolver;
  /** Scrollable distance in pixels used to map scroll progress to frames. */
  scrollArea?: number;
  /** Whether to bind a resize listener to keep the canvas in sync. */
  resize?: boolean;
  /** Called once all frames have finished loading. */
  onLoaded?: () => void;
  /** Called on each frame update with the active frame index. */
  onFrame?: (frameIndex: number) => void;
}
