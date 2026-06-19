import { DemoCtaButton } from './DemoCtaButton';
import { siteCopy } from '../content/siteCopy';
import { Reveal } from './motion/Reveal';

export function ClosingCta() {
  const { eyebrow, title, text, cta, note } = siteCopy.closingCta;

  return (
    <section className="closing-cta" aria-labelledby="closing-cta-heading">
      <div className="container closing-cta__inner">
        <Reveal className="closing-cta__content">
          <p className="closing-cta__eyebrow">{eyebrow}</p>
          <h2 id="closing-cta-heading" className="closing-cta__title">
            {title}
          </h2>
          <p className="closing-cta__text">{text}</p>

          <DemoCtaButton className="closing-cta__btn">{cta}</DemoCtaButton>

          <p className="closing-cta__note">{note}</p>
        </Reveal>
      </div>
    </section>
  );
}
