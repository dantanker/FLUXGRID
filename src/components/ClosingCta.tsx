import { DemoCtaButton } from './DemoCtaButton';
import { Reveal } from './motion/Reveal';

export function ClosingCta() {
  return (
    <section className="closing-cta" aria-labelledby="closing-cta-heading">
      <div className="container closing-cta__inner">
        <Reveal className="closing-cta__content">
          <p className="closing-cta__eyebrow">Demo call</p>
          <h2 id="closing-cta-heading" className="closing-cta__title">
            Book a walkthrough for your shop.
          </h2>
          <p className="closing-cta__text">
            10 minutes on the phone is all it takes to hear the engine live, watch leads get
            qualified, and see the full ticket hit our live dispatch board.
          </p>

          <DemoCtaButton className="closing-cta__btn">Book a demo call</DemoCtaButton>

          <p className="closing-cta__note">No commitment. Typically live within a week.</p>
        </Reveal>
      </div>
    </section>
  );
}
