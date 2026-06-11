import heroIphone from '../assets/hero-iphone.png';
import { CircuitLines } from './CircuitLines';
import { DemoCtaButton } from './DemoCtaButton';
import { IntegrationLogos } from './IntegrationLogos';
import { Reveal } from './motion/Reveal';

export function HeroScroll() {
  return (
    <section className="hero-section" id="integrations">
      <div className="hero-electrical-grid electrical-grid-bg" aria-hidden="true" />
      <CircuitLines />

      <div className="container hero-grid">
        <Reveal className="hero-copy" delay={0.05}>
          <h1 className="hero-headline">We answer your shop phone when you can&apos;t.</h1>
          <p className="hero-lead">
            After hours and busy days, FluxGrid takes the call and books the job into your CRM.
            Same phone number. No new employees.
          </p>
          <div className="hero-actions">
            <DemoCtaButton className="cta-btn cta-btn--primary">See a demo call</DemoCtaButton>
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
