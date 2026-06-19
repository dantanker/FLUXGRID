import heroIphone from '../assets/hero-iphone.png';
import { CircuitLines } from './CircuitLines';
import { DemoCtaButton } from './DemoCtaButton';
import { IntegrationLogos } from './IntegrationLogos';
import { Reveal } from './motion/Reveal';
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
            Our <strong>24/7 digital dispatcher</strong> turns missed calls into booked jobs,
            qualifying every lead and scheduling them straight into your CRM.
          </p>
          <div className="hero-actions">
            <DemoCtaButton>See a demo call</DemoCtaButton>
          </div>
        </Reveal>

        <Reveal className="hero-visual" delay={0.12} direction="right">
          <div className="hero-phone-frame">
            <span className="hero-phone-ring" aria-hidden="true" />
            <span className="hero-phone-ring hero-phone-ring--2" aria-hidden="true" />
            <img
              src={heroIphone}
              alt="FluxGrid answering an electrical service call"
              width={925}
              height={1976}
              decoding="async"
              className="hero-phone-image"
              draggable={false}
            />
          </div>
        </Reveal>
      </div>

      <Reveal className="container hero-integrations" delay={0.2}>
        <IntegrationLogos />
      </Reveal>
    </section>
  );
}
