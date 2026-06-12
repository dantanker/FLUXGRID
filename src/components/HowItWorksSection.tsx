import { motion, useReducedMotion } from 'framer-motion';
import step1IncomingCall from '../assets/how-it-works/step-1-incoming-call.png';
import step2CallDetails from '../assets/how-it-works/step-2-call-details.png';
import step3JobsBoard from '../assets/how-it-works/step-3-jobs-board.png';
import { Reveal } from './motion/Reveal';

const ease = [0.22, 1, 0.36, 1] as const;

const viewport = { once: true, amount: 0.25 as const };

const steps = [
  {
    num: '01',
    title: 'Answer your line',
    description:
      "When you're closed or on another call. Same number your customers already dial.",
    image: step1IncomingCall,
    imageAlt: 'Incoming call answered on your shop line',
  },
  {
    num: '02',
    title: 'Qualify the job',
    description:
      "Your intake questions — what's wrong, where, and whether it needs the on-call tech now.",
    image: step2CallDetails,
    imageAlt: 'Call details captured in your CRM',
  },
  {
    num: '03',
    title: 'Book to your CRM',
    description:
      'Job lands with notes and priority. Dispatch handles it like any other job.',
    image: step3JobsBoard,
    imageAlt: 'New job on your dispatch board',
  },
] as const;

export function HowItWorksSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="process-section" id="how-it-works" aria-labelledby="process-heading">
      <div className="process-section__grid electrical-grid-bg" aria-hidden="true" />

      <div className="container process-inner">
        <Reveal className="process-header">
          <p className="process-eyebrow">How it works</p>
          <h2 id="process-heading" className="process-title">
            Same number. Job on your board.
          </h2>
          <p className="process-lead">
            Live in about a week. Nothing new for your crew.
          </p>
        </Reveal>

        <div className="process-flow-wrap">
          {!reduceMotion ? (
            <motion.div
              className="process-flow__line"
              aria-hidden="true"
              initial={{ scaleY: 0, opacity: 0 }}
              whileInView={{ scaleY: 1, opacity: 1 }}
              viewport={viewport}
              transition={{ duration: 1, ease, delay: 0.05 }}
              style={{ transformOrigin: 'top center' }}
            />
          ) : (
            <div className="process-flow__line" aria-hidden="true" />
          )}

          <ol className="process-flow">
            {steps.map((step, index) => {
              const copyX = index % 2 === 0 ? -24 : 24;
              const visualX = index % 2 === 0 ? 32 : -32;
              const rowDelay = index * 0.12;

              return (
                <li
                  key={step.num}
                  className={`process-row${index % 2 === 1 ? ' process-row--reverse' : ''}`}
                >
                  {reduceMotion ? (
                    <div className="process-row__marker" aria-hidden="true">
                      <span className="process-row__dot" />
                    </div>
                  ) : (
                    <motion.div
                      className="process-row__marker"
                      aria-hidden="true"
                      initial={{ scale: 0, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={viewport}
                      transition={{ duration: 0.4, ease, delay: rowDelay + 0.05 }}
                    >
                      <span className="process-row__dot" />
                    </motion.div>
                  )}

                  <div className="process-row__body">
                    {reduceMotion ? (
                      <div className="process-row__copy" data-step={step.num}>
                        <span className="process-step__num">{step.num}</span>
                        <h3 className="process-step__title">{step.title}</h3>
                        <p className="process-step__description">{step.description}</p>
                      </div>
                    ) : (
                      <motion.div
                        className="process-row__copy"
                        data-step={step.num}
                        initial={{ opacity: 0, x: copyX }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={viewport}
                        transition={{ duration: 0.6, ease, delay: rowDelay + 0.1 }}
                      >
                        <span className="process-step__num">{step.num}</span>
                        <h3 className="process-step__title">{step.title}</h3>
                        <p className="process-step__description">{step.description}</p>
                      </motion.div>
                    )}

                    {reduceMotion ? (
                      <div className="process-row__visual">
                        <div className="process-row__frame">
                          <div className="process-row__chrome" aria-hidden="true">
                            <span />
                            <span />
                            <span />
                          </div>
                          <img
                            src={step.image}
                            alt={step.imageAlt}
                            loading="lazy"
                            decoding="async"
                          />
                        </div>
                      </div>
                    ) : (
                      <motion.div
                        className="process-row__visual"
                        initial={{ opacity: 0, x: visualX, scale: 0.96 }}
                        whileInView={{ opacity: 1, x: 0, scale: 1 }}
                        viewport={viewport}
                        transition={{ duration: 0.65, ease, delay: rowDelay + 0.2 }}
                      >
                        <div className="process-row__frame">
                          <div className="process-row__chrome" aria-hidden="true">
                            <span />
                            <span />
                            <span />
                          </div>
                          <img
                            src={step.image}
                            alt={step.imageAlt}
                            loading="lazy"
                            decoding="async"
                          />
                        </div>
                      </motion.div>
                    )}
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
