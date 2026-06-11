import { DemoCtaButton } from './DemoCtaButton';
import { Reveal } from './motion/Reveal';

const demoSteps = [
  'Listen to a live electrical intake call',
  'Hear your shop greeting and intake questions',
  'Watch the job book into your CRM',
];

export function ClosingCta() {
  return (
    <section className="closing-cta">
      <div className="container closing-cta__layout">
        <Reveal className="closing-cta__copy">
          <p className="closing-cta__eyebrow">Demo call</p>
          <h2 className="closing-cta__title">Hear what your callers hear.</h2>
          <p className="closing-cta__text">
            Ten minutes on the phone. You listen in while we run a real call — then watch it land
            in your CRM.
          </p>
          <DemoCtaButton className="cta-btn cta-btn--primary">See a demo call</DemoCtaButton>
          <p className="closing-cta__note">No commitment · Live in about a week</p>
        </Reveal>

        <Reveal className="closing-cta__preview" delay={0.1} direction="right">
          <div aria-label="What the demo covers">
            <p className="closing-cta__preview-label">What you&apos;ll walk through</p>
            <ol className="closing-cta__steps">
              {demoSteps.map((step, index) => (
                <li key={step} className="closing-cta__step">
                  <span className="closing-cta__step-num">{String(index + 1).padStart(2, '0')}</span>
                  <span className="closing-cta__step-text">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
