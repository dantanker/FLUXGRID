import { Link } from 'react-router-dom';
import { Reveal } from './motion/Reveal';
import { SiteVideo } from './SiteVideo';

export const GROWTH_SUITE_PROTOTYPE_URL = 'https://voltguard-rouge.vercel.app/';

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
            <p className="growth-suite-section__eyebrow">The Full Package</p>
            <h2 id="growth-suite-heading" className="growth-suite-section__title">
              The Full Package
            </h2>
            <p className="growth-suite-section__text">
              Whether you&apos;re starting from scratch or your current site needs a professional
              overhaul, we build lead-capturing homes for your business. Each site is fully
              optimized for SEO to make sure you&apos;re the obvious choice when customers are
              searching for a pro.
            </p>
            <div className="growth-suite-section__actions">
              <Link to="/websites" className="cta-btn growth-suite-section__cta">
                Check it out
              </Link>
            </div>
          </Reveal>

          <Reveal className="growth-suite-section__media" delay={0.1} direction="right">
            <SiteVideo
              src="/videos/full-package.mov"
              poster="/videos/thumbs/full-package.jpg"
              label="Full package demo video"
              className="video-spot--full-package"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
