import { useCallback, useEffect, useId, useRef, useState, type CSSProperties, type PointerEvent } from 'react';
import chaosBefore from '../assets/proof/chaos-before.png';
import calmAfter from '../assets/proof/calm-after.png';
import { Reveal } from './motion/Reveal';

function VoltIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 32"
      width="14"
      height="18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M14 2L4 16h7l-2 14 12-18h-7l2-10z" fill="currentColor" />
    </svg>
  );
}

export function ProofSection() {
  const [position, setPosition] = useState(50);
  const [dragging, setDragging] = useState(false);
  const frameRef = useRef<HTMLDivElement>(null);
  const sliderId = useId();

  const setFromClientX = useCallback((clientX: number) => {
    const frame = frameRef.current;
    if (!frame) {
      return;
    }

    const rect = frame.getBoundingClientRect();
    if (rect.width <= 0) {
      return;
    }

    const next = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(100, Math.max(0, next)));
  }, []);

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.button !== 0) {
      return;
    }

    event.currentTarget.setPointerCapture(event.pointerId);
    setDragging(true);
    setFromClientX(event.clientX);
  };

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!event.currentTarget.hasPointerCapture(event.pointerId)) {
      return;
    }
    setFromClientX(event.clientX);
  };

  const endDrag = (event: PointerEvent<HTMLDivElement>) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    setDragging(false);
  };

  useEffect(() => {
    if (!dragging) {
      return;
    }

    const previous = document.body.style.userSelect;
    document.body.style.userSelect = 'none';
    return () => {
      document.body.style.userSelect = previous;
    };
  }, [dragging]);

  return (
    <section className="proof-section" id="leaks" aria-labelledby="proof-headline">
      <div className="container proof-inner">
        <Reveal className="proof-copy">
          <p className="proof-eyebrow">The Problem</p>
          <h2 id="proof-headline" className="proof-headline">
            The Chaos vs. The Calm
          </h2>
          <p className="proof-subhead">
            Stop letting high-value leads vanish into your voicemail and start winning your time
            back.
          </p>
        </Reveal>

        <Reveal className="proof-compare" delay={0.08} direction="left">
          <div
            ref={frameRef}
            className={`proof-compare__frame${dragging ? ' is-dragging' : ''}`}
            style={{ '--compare-pos': `${position}%` } as CSSProperties}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
            role="img"
            aria-label="Before and after comparison of missed calls versus FluxGrid lead alerts"
          >
            <img
              src={calmAfter}
              alt=""
              width={1024}
              height={1024}
              className="proof-compare__image proof-compare__image--after"
              draggable={false}
            />

            <div className="proof-compare__before" aria-hidden="true">
              <img
                src={chaosBefore}
                alt=""
                width={1024}
                height={1024}
                className="proof-compare__image proof-compare__image--before"
                draggable={false}
              />
            </div>

            <div className="proof-compare__divider" aria-hidden="true">
              <span className="proof-compare__handle">
                <VoltIcon className="proof-compare__volt" />
              </span>
            </div>

            <label className="sr-only" htmlFor={sliderId}>
              Reveal chaos versus calm
            </label>
            <input
              id={sliderId}
              className="proof-compare__range"
              type="range"
              min={0}
              max={100}
              value={Math.round(position)}
              onChange={(event) => setPosition(Number(event.target.value))}
              onPointerDown={(event) => event.stopPropagation()}
              aria-valuetext={`${Math.round(position)} percent chaos shown`}
            />
          </div>
          <p className="proof-compare__hint">Drag the volt to compare</p>
        </Reveal>
      </div>
    </section>
  );
}
