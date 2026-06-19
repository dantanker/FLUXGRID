import { DemoCtaButton } from './DemoCtaButton';
import { siteCopy } from '../content/siteCopy';
import { Reveal } from './motion/Reveal';

export function AboutSection() {
  const { eyebrow, title, subtitle, letter, cta } = siteCopy.about;

  return (
    <section className="about-section" id="about" aria-labelledby="about-heading">
      <div className="container about-inner">
        <Reveal>
          <p className="about-eyebrow">{eyebrow}</p>
          <h2 id="about-heading" className="about-title">
            {title}
          </h2>
          <p className="about-subtitle">{subtitle}</p>
        </Reveal>

        <Reveal delay={0.06}>
          <div className="about-letter">
            {letter.map((paragraph) => (
              <p key={paragraph.slice(0, 32)}>{paragraph}</p>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <DemoCtaButton className="about-cta">{cta}</DemoCtaButton>
        </Reveal>
      </div>
    </section>
  );
}
