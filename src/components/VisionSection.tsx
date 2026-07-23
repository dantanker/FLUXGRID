import heroIphone from '../assets/hero-iphone.png';
import { DemoCtaButton } from './DemoCtaButton';
import { Reveal } from './motion/Reveal';

export function VisionSection() {
  return (
    <section className="vision-section" id="vision" aria-labelledby="vision-heading">
      <div className="container vision-section__inner">
        <Reveal className="vision-section__content">
          <p className="vision-section__eyebrow">Vision</p>
          <h2 id="vision-heading" className="vision-section__title">
            No More Missed Opportunities
          </h2>
          <p className="vision-section__text">
            We&apos;re here to simplify your lead flow so you can focus on the job, and no
            high value call gets ignored, helping you grow without the burnout.
          </p>

          <DemoCtaButton className="vision-section__btn">Book a demo</DemoCtaButton>
          <p className="vision-section__note">No commitment. Typically live within a week.</p>
        </Reveal>

        <Reveal className="vision-section__visual" delay={0.12} direction="right">
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
    </section>
  );
}
