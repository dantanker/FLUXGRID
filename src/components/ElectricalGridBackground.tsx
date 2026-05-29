import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

const VANTA_OPTIONS = {
  mouseControls: true,
  touchControls: true,
  gyroControls: false,
  minHeight: 200.0,
  minWidth: 200.0,
  scale: 1.0,
  scaleMobile: 1.0,
  color: 0x00e5ff,
  backgroundColor: 0x090d16,
  points: 15.0,
  maxDistance: 20.0,
  spacing: 15.0,
};

function waitForVanta(maxAttempts = 120): Promise<NonNullable<typeof window.VANTA>> {
  return new Promise((resolve, reject) => {
    let attempts = 0;

    const check = () => {
      if (window.VANTA?.NET && window.THREE) {
        resolve(window.VANTA);
        return;
      }

      attempts += 1;
      if (attempts >= maxAttempts) {
        reject(new Error('Vanta NET failed to load'));
        return;
      }

      requestAnimationFrame(check);
    };

    check();
  });
}

export function ElectricalGridBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let effect: { destroy?: () => void } | undefined;
    let cancelled = false;

    waitForVanta()
      .then((VANTA) => {
        if (cancelled || !containerRef.current) return;

        effect = VANTA.NET({
          el: containerRef.current,
          THREE: window.THREE,
          ...VANTA_OPTIONS,
        });
      })
      .catch((error) => {
        console.error(error);
      });

    return () => {
      cancelled = true;
      effect?.destroy?.();
    };
  }, []);

  return createPortal(
    <div
      id="electrical-grid-bg"
      ref={containerRef}
      className="electrical-grid-bg"
      aria-hidden="true"
    />,
    document.body,
  );
}
