import { useId, useState } from 'react';
import { siteCopy } from '../content/siteCopy';
import { Reveal } from './motion/Reveal';

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);
  const baseId = useId();
  const { eyebrow, title, items } = siteCopy.faq;

  return (
    <section className="faq-section" id="faq" aria-labelledby="faq-heading">
      <div className="container faq-inner">
        <Reveal className="faq-header">
          <p className="faq-eyebrow">{eyebrow}</p>
          <h2 id="faq-heading" className="faq-title">
            {title}
          </h2>
        </Reveal>

        <div className="faq-accordion">
          {items.map((item, index) => {
            const isOpen = openIndex === index;
            const panelId = `${baseId}-panel-${index}`;
            const buttonId = `${baseId}-button-${index}`;

            return (
              <article
                key={item.num}
                className={`faq-item${isOpen ? ' is-open' : ''}`}
              >
                <h3 className="faq-item__heading">
                  <button
                    id={buttonId}
                    type="button"
                    className="faq-item__trigger"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  >
                    <span className="faq-item__num">{item.num}</span>
                    <span className="faq-item__question">{item.question}</span>
                    <span className="faq-item__toggle" aria-hidden="true">
                      <span className="faq-item__toggle-bar" />
                      <span className="faq-item__toggle-bar faq-item__toggle-bar--vertical" />
                    </span>
                  </button>
                </h3>

                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  aria-hidden={!isOpen}
                  className="faq-item__panel"
                >
                  <div className="faq-item__panel-inner">
                    <p className="faq-item__answer">{item.answer}</p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
