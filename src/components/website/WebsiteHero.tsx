import { CircuitLines } from '../CircuitLines';
import { IntegrationLogos } from '../IntegrationLogos';
import { WebsiteMockupCtaButton } from '../WebsiteMockupCtaButton';
import { Reveal } from '../motion/Reveal';
import { SiteVideo } from '../SiteVideo';
import { SITE_VIDEOS } from '../../config/videos';
import { useHeroCursor } from '../../hooks/useHeroCursor';

export function WebsiteHero() {
  const { sectionRef, isHovering, onMouseMove, onMouseEnter, onMouseLeave } = useHeroCursor();

  return (
    <section
      ref={sectionRef}
      className={`website-hero${isHovering ? ' is-hovering' : ''}`}
      id="website-hero"
      aria-labelledby="website-hero-heading"
      onMouseMove={onMouseMove}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="hero-section__wash" aria-hidden="true" />
      <CircuitLines />

      <div className="container website-hero__grid">
        <Reveal className="website-hero__copy" delay={0.05}>
          <p className="website-hero__eyebrow">Your Custom Website</p>
          <h1 id="website-hero-heading" className="website-hero__title">
            Premium sites for electricians
          </h1>
          <p className="website-hero__lead">
            Stop losing jobs to competition. I&apos;ll build you a professional site that wins jobs
            and makes you the obvious choice.
          </p>
          <div className="website-hero__actions">
            <WebsiteMockupCtaButton>Get my mockup</WebsiteMockupCtaButton>
          </div>
        </Reveal>

        <Reveal className="website-hero__visual" delay={0.12} direction="right">
          <SiteVideo
            src={SITE_VIDEOS.websiteHero.src}
            poster={SITE_VIDEOS.websiteHero.poster}
            label="Custom electrician website demo video"
          />
        </Reveal>
      </div>

      <Reveal className="container hero-integrations" delay={0.2}>
        <IntegrationLogos />
      </Reveal>
    </section>
  );
}
