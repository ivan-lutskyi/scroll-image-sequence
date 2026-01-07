# scroll-image-sequence

Canvas-based scroll-driven image sequence animation.

## Install
npm install scroll-image-sequence

## Usage
```js
import { initScrollImageSequence } from 'scroll-image-sequence';

initScrollImageSequence({
  canvas: document.querySelector('#hero'),
  frameCount: 100,
  imagePath: (i) =>
    `/imgs/FIG_${String(i).padStart(4, '0')}.jpg`,
});
```

## API
```ts
initScrollImageSequence(options: InitScrollImageSequenceOptions): void
```

```ts
interface InitScrollImageSequenceOptions {
  canvas: HTMLCanvasElement;
  frameCount: number;
  imagePath: (index: number) => string;
  scrollArea?: number; // px, default = window.innerHeight * 2
  resize?: boolean; // default = true
  onLoaded?: () => void;
  onFrame?: (frameIndex: number) => void;
}
```

## Notes
- This library is framework-agnostic and only touches the provided canvas.
- For demos, ensure your server can serve ES modules from `dist/`.
