interface VantaEffect {
  destroy: () => void;
}

interface VantaNetOptions {
  el: HTMLElement | string;
  THREE: typeof window.THREE;
  mouseControls?: boolean;
  touchControls?: boolean;
  gyroControls?: boolean;
  minHeight?: number;
  minWidth?: number;
  scale?: number;
  scaleMobile?: number;
  color?: number;
  backgroundColor?: number;
  points?: number;
  maxDistance?: number;
  spacing?: number;
}

interface VantaStatic {
  NET: (options: VantaNetOptions) => VantaEffect;
}

declare global {
  interface Window {
    THREE: {
      REVISION: string;
      WebGLRenderer: new (...args: unknown[]) => unknown;
      [key: string]: unknown;
    };
    VANTA?: VantaStatic;
  }
}

export {};
