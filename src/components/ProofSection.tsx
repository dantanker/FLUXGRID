import { useCallback, useState } from 'react';
import { Reveal, RevealItem, RevealStagger } from './motion/Reveal';
import { VapiInterceptionModal } from './VapiInterceptionModal';

const journeySteps = [
  {
    number: 'Step 1',
    label: 'Search',
    detail: '"Emergency Electrician Near Me"',
    variant: 'default' as const,
  },
  {
    number: 'Step 2',
    label: 'Action',
    detail: 'Clicks your business profile & calls.',
    variant: 'default' as const,
  },
  {
    number: 'Step 3',
    label: 'Friction',
    detail: 'Phone rings out. Line is busy or goes to voicemail.',
    variant: 'default' as const,
  },
  {
    number: 'Step 4',
    label: 'The Drop-Off',
    detail: 'See it in action',
    variant: 'dropoff' as const,
    action: 'vapi-interception' as const,
  },
  {
    number: 'Step 5',
    label: 'Lost Revenue',
    detail: 'Back to Google. Clicks your closest competitor.',
    variant: 'default' as const,
  },
];

export function ProofSection() {
  const [isVapiOpen, setIsVapiOpen] = useState(false);
  const closeVapiModal = useCallback(() => setIsVapiOpen(false), []);

  return (
    <>
      <section className="proof-section" id="leaks" aria-labelledby="proof-headline">
        <div className="container proof-layout">
          <Reveal className="proof-copy">
            <h2 id="proof-headline" className="proof-headline">
              You aren&apos;t losing jobs to better companies. You&apos;re losing them to faster
              responses.
            </h2>
            <p className="proof-subhead">
              Homeowners and property managers don&apos;t leave voicemails. They just click the next
              listing on Google. If your team is tied up for even five minutes, that revenue is gone
              forever.
            </p>
          </Reveal>

          <Reveal className="proof-journey" delay={0.08} direction="right">
            <div role="region" aria-label="Customer search journey">
              <RevealStagger as="ol" className="proof-journey__list" stagger={0.07}>
                {journeySteps.map((step, index) => (
                  <RevealItem
                    as="li"
                    key={step.number}
                    className={`proof-journey__item proof-journey__item--${step.variant}`}
                  >
                    <div className="proof-journey__track" aria-hidden="true">
                      <span className="proof-journey__dot" />
                      {index < journeySteps.length - 1 ? (
                        <span className="proof-journey__line" />
                      ) : null}
                    </div>
                    <div className="proof-journey__content">
                      <p className="proof-journey__heading">
                        <span className="proof-journey__number">{step.number}</span>
                        <span className="proof-journey__label">{step.label}</span>
                      </p>
                      {'action' in step && step.action === 'vapi-interception' ? (
                        <button
                          type="button"
                          className="cta-btn proof-journey__interception-btn"
                          onClick={() => setIsVapiOpen(true)}
                        >
                          {step.detail}
                        </button>
                      ) : (
                        <p className="proof-journey__detail">{step.detail}</p>
                      )}
                    </div>
                  </RevealItem>
                ))}
              </RevealStagger>
            </div>
          </Reveal>
        </div>
      </section>

      <VapiInterceptionModal isOpen={isVapiOpen} onClose={closeVapiModal} />
    </>
  );
}
