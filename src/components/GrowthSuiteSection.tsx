import { Link } from 'react-router-dom';
import { Reveal } from './motion/Reveal';
import { SiteVideo } from './SiteVideo';
import { SITE_VIDEOS } from '../config/videos';

export const GROWTH_SUITE_PROTOTYPE_URL = 'https://voltguard-rouge.vercel.app/';

type GrowthSuiteSectionProps = {
  ctaLabel?: string;
  ctaTo?: string;
};

export function GrowthSuiteSection({
  ctaLabel = 'Check it out',
  ctaTo = '/websites',
}: GrowthSuiteSectionProps) {
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
              Your Business Growth System
            </h2>
            <p className="growth-suite-section__text">
              Whether you&apos;re starting from scratch or your current site needs a professional
              overhaul, we build high converting lead capture systems for your business. We make
              sure you&apos;re the obvious choice when customers are searching for a pro. Check out
              the video below to see the system in action.
            </p>
            <div className="growth-suite-section__actions">
              <Link to={ctaTo} className="cta-btn growth-suite-section__cta">
                {ctaLabel}
              </Link>
            </div>
          </Reveal>

          <Reveal className="growth-suite-section__media" delay={0.1} direction="right">
            <SiteVideo
              src={SITE_VIDEOS.fullPackage.src}
              poster={SITE_VIDEOS.fullPackage.poster}
              label="Full package demo video"
              className="video-spot--full-package"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
