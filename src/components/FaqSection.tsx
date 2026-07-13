import { useId, useState } from 'react';
import { Reveal } from './motion/Reveal';

const faqItems = [
  {
    num: '01',
    question: 'Will this alienate my older customers who hate talking to "bots"?',
    answer:
      'No. FluxGrid doesn\'t sound like a robotic chat menu. It uses an advanced natural language engine designed to handle conversational phone dialogue smoothly. Your customers simply feel like they are talking to a highly efficient, professional live receptionist who gets them booked immediately.',
  },
  {
    num: '02',
    question: 'Does it integrate with my existing software?',
    answer:
      'Yes. FluxGrid integrates with the platforms you already use, including ServiceTitan, Jobber, and Housecall Pro. Customer data, priority tags, and triage notes flow into your active schedule without overwriting your manual dispatcher settings.',
  },
  {
    num: '03',
    question: 'What happens if a call is an absolute, extreme electrical emergency?',
    answer:
      'The system is hardwired for immediate triage. If the engine identifies an immediate safety hazard (like sparking panels, fire, or smoke), it instantly escalates the issue, tags it as a critical emergency, and routes the ticket to your designated on call technician according to your exact priority rules.',
  },
  {
    num: '04',
    question: 'Do I have to change my main business phone number?',
    answer:
      'Not at all. You keep your exact same number. FluxGrid sits cleanly behind your existing phone line, acting as an automated safety net to instantly intercept calls only when your line is busy, when you\'re out on a job, or after hours.',
  },
  {
    num: '05',
    question: 'How long does it take to get live?',
    answer:
      'We handle setup, testing, and CRM integration for you. Your digital receptionist will be live and protecting your revenue in exactly 7 days.',
  },
] as const;

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia('(max-width: 640px)').matches ? -1 : 0,
  );
  const baseId = useId();

  return (
    <section className="faq-section" id="faq" aria-labelledby="faq-heading">
      <div className="container faq-inner">
        <Reveal className="faq-header">
          <p className="faq-eyebrow">FAQ</p>
          <h2 id="faq-heading" className="faq-title">
            Frequently asked questions
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
