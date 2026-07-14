import { useEffect, useRef, useState } from 'react';
import { Reveal } from './motion/Reveal';

export const GROWTH_SUITE_PROTOTYPE_URL = 'https://voltguard-rouge.vercel.app/';

/** Replace with your high-impact website mockup image path */
const MOBILE_MOCKUP_SRC = '/growth-suite-mockup.svg';
const MOBILE_MOCKUP_ALT = 'Professional website prototype mockup';

/** Desktop viewport size rendered inside the preview, then scaled down */
const PREVIEW_WIDTH = 1440;
const PREVIEW_HEIGHT = 810;

function PrototypeCta({ className }: { className?: string }) {
  return (
    <a
      href={GROWTH_SUITE_PROTOTYPE_URL}
      className={['cta-btn', className].filter(Boolean).join(' ')}
      target="_blank"
      rel="noopener noreferrer"
    >
      View Website Prototype
    </a>
  );
}

function ScaledWebsitePreview() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) {
      return;
    }

    const updateScale = () => {
      setScale(wrap.clientWidth / PREVIEW_WIDTH);
    };

    updateScale();

    const observer = new ResizeObserver(updateScale);
    observer.observe(wrap);

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={wrapRef} className="growth-suite-section__iframe-wrap">
      <iframe
        className="growth-suite-section__iframe"
        src={GROWTH_SUITE_PROTOTYPE_URL}
        title="Live website prototype"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allow="fullscreen"
        style={{
          width: PREVIEW_WIDTH,
          height: PREVIEW_HEIGHT,
          transform: `scale(${scale})`,
          opacity: scale > 0 ? 1 : 0,
        }}
      />
    </div>
  );
}

export function GrowthSuiteSection() {
  return (
    <section
      className="growth-suite-section"
      id="growth-suite"
      aria-labelledby="growth-suite-heading"
    >
      <div className="container growth-suite-section__inner">
        <div className="growth-suite-section__layout">
          <Reveal className="growth-suite-section__copy">
            <p className="growth-suite-section__eyebrow">The Growth Suite</p>
            <h2 id="growth-suite-heading" className="growth-suite-section__title">
              The Growth Suite
            </h2>
            <p className="growth-suite-section__text">
              Whether you&apos;re starting from scratch or your current site needs a professional
              overhaul, we build lead-capturing homes for your business. Each site is fully
              optimized for SEO to make sure you&apos;re the obvious choice when customers are
              searching for a pro.
            </p>
            <div className="growth-suite-section__actions growth-suite-section__actions--desktop">
              <PrototypeCta />
            </div>
          </Reveal>

          <Reveal className="growth-suite-section__media" delay={0.1} direction="right">
            <ScaledWebsitePreview />

            <figure className="growth-suite-section__mobile-visual">
              <img
                src={MOBILE_MOCKUP_SRC}
                alt={MOBILE_MOCKUP_ALT}
                width={1200}
                height={900}
                decoding="async"
                draggable={false}
              />
            </figure>

            <div className="growth-suite-section__actions growth-suite-section__actions--mobile">
              <PrototypeCta className="growth-suite-section__cta--full" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
