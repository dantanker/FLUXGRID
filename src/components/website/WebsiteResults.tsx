import { useEffect, useRef, useState } from 'react';
import { Reveal } from '../motion/Reveal';
import { GROWTH_SUITE_PROTOTYPE_URL } from '../GrowthSuiteSection';

const DESKTOP_PREVIEW = { width: 1440, height: 810 };
const MOBILE_PREVIEW = { width: 390, height: 780 };

function useIsMobilePreview() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(max-width: 992px)');
    const update = () => setIsMobile(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  return isMobile;
}

function ScaledWebsitePreview() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);
  const isMobile = useIsMobilePreview();
  const preview = isMobile ? MOBILE_PREVIEW : DESKTOP_PREVIEW;

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) {
      return;
    }

    const updateScale = () => {
      setScale(wrap.clientWidth / preview.width);
    };

    updateScale();

    const observer = new ResizeObserver(updateScale);
    observer.observe(wrap);

    return () => observer.disconnect();
  }, [preview.width]);

  return (
    <div
      ref={wrapRef}
      className={`website-results__iframe-wrap${isMobile ? ' website-results__iframe-wrap--mobile' : ''}`}
    >
      <iframe
        className="website-results__iframe"
        src={GROWTH_SUITE_PROTOTYPE_URL}
        title="Custom electrician website prototype"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allow="fullscreen"
        style={{
          width: preview.width,
          height: preview.height,
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
