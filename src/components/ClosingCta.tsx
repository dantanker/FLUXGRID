import { DemoCtaButton } from './DemoCtaButton';
import { Reveal } from './motion/Reveal';

export function ClosingCta() {
  return (
    <section className="closing-cta" aria-labelledby="closing-cta-heading">
      <div className="closing-cta__grid electrical-grid-bg" aria-hidden="true" />

      <div className="container closing-cta__inner">
        <Reveal className="closing-cta__content">
          <p className="closing-cta__eyebrow">Demo call</p>
          <h2 id="closing-cta-heading" className="closing-cta__title">
            Book a walkthrough for your shop.
          </h2>
          <p className="closing-cta__text">
            Ten minutes on the phone. Hear a live intake, review your greeting and qualifying
            questions, and watch the job book into your dispatch system.
          </p>

          <DemoCtaButton className="closing-cta__btn">Book a demo call</DemoCtaButton>

          <p className="closing-cta__note">No commitment · Typically live within a week</p>
        </Reveal>
      </div>
    </section>
  );
}
