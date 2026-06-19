import { siteCopy } from '../content/siteCopy';
import { Reveal } from './motion/Reveal';

export function DifferentiatorStrip() {
  const { headline, subhead } = siteCopy.differentiator;

  return (
    <section className="differentiator-strip" aria-label="Why automation works">
      <div className="container differentiator-strip__inner">
        <Reveal>
          <p className="differentiator-strip__headline">{headline}</p>
          <p className="differentiator-strip__subhead">{subhead}</p>
        </Reveal>
      </div>
    </section>
  );
}
