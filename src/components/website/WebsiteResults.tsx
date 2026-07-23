import { useEffect, useRef, useState } from 'react';
import { Reveal } from '../motion/Reveal';
import { GROWTH_SUITE_PROTOTYPE_URL } from '../GrowthSuiteSection';

const PREVIEW_WIDTH = 1440;
const PREVIEW_HEIGHT = 810;

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
    <div ref={wrapRef} className="website-results__iframe-wrap">
      <iframe
        className="website-results__iframe"
        src={GROWTH_SUITE_PROTOTYPE_URL}
        title="Custom electrician website prototype"
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

export function WebsiteResults() {
  return (
    <section className="website-results" id="website-results" aria-label="Website preview">
      <div className="container website-results__inner">
        <Reveal className="website-results__preview">
          <ScaledWebsitePreview />
        </Reveal>

        <Reveal className="website-results__cta" delay={0.12}>
          <a
            href={GROWTH_SUITE_PROTOTYPE_URL}
            className="cta-btn website-results__btn"
            target="_blank"
            rel="noopener noreferrer"
          >
            Check out the site
          </a>
        </Reveal>
      </div>
    </section>
  );
}
