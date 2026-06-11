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
    detail: '45 seconds pass. No callback received.',
    variant: 'dropoff' as const,
  },
  {
    number: 'Step 5',
    label: 'Lost Revenue',
    detail: 'Back to Google. Clicks your closest competitor.',
    variant: 'default' as const,
  },
];

export function ProofSection() {
  return (
    <section className="proof-section" id="leaks" aria-labelledby="proof-headline">
      <div className="proof-section__grid electrical-grid-bg" aria-hidden="true" />

      <div className="container proof-layout">
        <div className="proof-copy">
          <h2 id="proof-headline" className="proof-headline">
            You aren&apos;t losing jobs to better companies. You&apos;re losing them to faster
            responses.
          </h2>
          <p className="proof-subhead">
            Homeowners and property managers don&apos;t leave voicemails—they just click the next
            listing on Google. If your team is tied up for even five minutes, that revenue is gone
            forever.
          </p>
        </div>

        <div className="proof-journey" role="region" aria-label="Customer search journey">
          <ol className="proof-journey__list">
            {journeySteps.map((step, index) => (
              <li
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
                  <p className="proof-journey__detail">
                    {step.variant === 'dropoff' ? <>[ {step.detail} ]</> : step.detail}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
