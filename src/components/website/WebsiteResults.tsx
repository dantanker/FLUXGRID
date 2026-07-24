import { useEffect, useRef, useState } from 'react';
import { Reveal } from '../motion/Reveal';
import { GROWTH_SUITE_PROTOTYPE_URL } from '../GrowthSuiteSection';
import desktopPreview from '../../assets/website/desktop-preview.jpg';

const DESKTOP_PREVIEW = { width: 1440, height: 810 };

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

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) {
      return;
    }

    const updateScale = () => {
      setScale(wrap.clientWidth / DESKTOP_PREVIEW.width);
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
          width: DESKTOP_PREVIEW.width,
          height: DESKTOP_PREVIEW.height,
          transform: `scale(${scale})`,
          opacity: scale > 0 ? 1 : 0,
        }}
      />
    </div>
  );
}

function StaticDesktopPreview() {
  return (
    <div className="website-results__static-wrap">
      <img
        className="website-results__static-img"
        src={desktopPreview}
        alt="Desktop preview of a custom electrician website"
        decoding="async"
        draggable={false}
      />
    </div>
  );
}

export function WebsiteResults() {
  const isMobile = useIsMobilePreview();

  return (
    <section className="website-results" id="website-results" aria-label="Website preview">
      <div className="container website-results__inner">
        <Reveal className="website-results__preview">
          {isMobile ? <StaticDesktopPreview /> : <ScaledWebsitePreview />}
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
