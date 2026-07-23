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
            You didn&apos;t start an electrical business to become a full-time secretary.
          </h2>
          <p className="vision-section__text">
            You didn&apos;t build this shop to live in paperwork. You built it to do the work,
            take care of customers, and actually make it home for dinner. We&apos;re here to
            handle the chaos on the phones so you can stop drowning in admin and get back to
            the freedom you started this business for.
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
