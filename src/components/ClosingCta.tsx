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
            Spend 10 minutes on the phone to hear the engine live, see how it instantly qualifies
            leads, and watch the complete job ticket stream onto our live dispatch board.
          </p>

          <DemoCtaButton className="closing-cta__btn">Book a demo call</DemoCtaButton>

          <p className="closing-cta__note">No commitment · Typically live within a week</p>
        </Reveal>
      </div>
    </section>
  );
}
