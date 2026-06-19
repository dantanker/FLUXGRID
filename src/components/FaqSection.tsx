import { useId, useState } from 'react';
import { Reveal } from './motion/Reveal';

const faqItems = [
  {
    num: '01',
    question: 'How does it work?',
    answer:
      'When you miss a call, FluxGrid answers on your line, runs your intake questions, and books the job into your CRM, usually in under a minute.',
  },
  {
    num: '02',
    question: 'Do I have to learn new software?',
    answer:
      'No. There is no dashboard to log into and nothing new for your crew to learn. We run everything in the background so you stay focused on the trucks.',
  },
  {
    num: '03',
    question: 'Who do I contact if I need help?',
    answer:
      "You call us directly. FluxGrid isn't a faceless corporation. We built it, we launch it for your shop, and you get a direct line when you need us.",
  },
] as const;

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);
  const baseId = useId();

  return (
    <section className="faq-section" id="faq" aria-labelledby="faq-heading">
      <div className="container faq-inner">
        <Reveal className="faq-header">
          <p className="faq-eyebrow">FAQ</p>
          <h2 id="faq-heading" className="faq-title">
            Straight answers for shop owners.
          </h2>
        </Reveal>

        <div className="faq-accordion">
          {faqItems.map((item, index) => {
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
