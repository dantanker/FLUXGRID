import { CircuitLines } from './CircuitLines';
import { DemoCtaButton } from './DemoCtaButton';
import { IntegrationLogos } from './IntegrationLogos';
import { Reveal } from './motion/Reveal';
import { SiteVideo } from './SiteVideo';
import { useHeroCursor } from '../hooks/useHeroCursor';

export function HeroScroll() {
  const { sectionRef, isHovering, onMouseMove, onMouseEnter, onMouseLeave } = useHeroCursor();

  return (
    <section
      ref={sectionRef}
      className={`hero-section${isHovering ? ' is-hovering' : ''}`}
      id="integrations"
      onMouseMove={onMouseMove}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="hero-section__wash" aria-hidden="true" />
      <CircuitLines />

      <div className="container hero-grid">
        <Reveal className="hero-copy" delay={0.05}>
          <h1 className="hero-headline">Never Miss Another Job</h1>
          <p className="hero-lead">
            Our <strong>24/7 digital receptionist</strong> handles the noise, qualifies your
            leads, and books them straight into your calendar while you&apos;re on the job.
          </p>
          <div className="hero-actions">
            <DemoCtaButton>Book a demo</DemoCtaButton>
          </div>
        </Reveal>

        <Reveal className="hero-visual" delay={0.12} direction="right">
          <SiteVideo
            src="/videos/receptionist-hero.mov"
            poster="/videos/thumbs/receptionist-hero.jpg"
            label="Digital receptionist demo video"
            className="video-spot--receptionist"
          />
        </Reveal>
      </div>

      <Reveal className="container hero-integrations" delay={0.2}>
        <IntegrationLogos />
      </Reveal>
    </section>
  );
}
