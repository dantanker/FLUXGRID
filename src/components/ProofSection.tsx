import { useCallback, useState } from 'react';
import { Reveal } from './motion/Reveal';
import { ProofJourneyTimeline } from './ProofJourneyTimeline';
import { VapiInterceptionModal } from './VapiInterceptionModal';

const journeySteps = [
  {
    number: '01',
    label: 'Search',
    detail: '"Emergency Electrician Near Me"',
    variant: 'default' as const,
  },
  {
    number: '02',
    label: 'Action',
    detail: 'Clicks your business profile and calls.',
    variant: 'default' as const,
  },
  {
    number: '03',
    label: 'Friction',
    detail: 'Phone rings out. Line is busy or goes to voicemail.',
    variant: 'default' as const,
  },
  {
    number: '04',
    label: 'The Drop-Off',
    detail: 'See it in action',
    variant: 'dropoff' as const,
    action: 'vapi-interception' as const,
  },
  {
    number: '05',
    label: 'Lost Revenue',
    detail: 'Back to Google. Clicks your closest competitor.',
    variant: 'default' as const,
  },
];

export function ProofSection() {
  const [isVapiOpen, setIsVapiOpen] = useState(false);
  const closeVapiModal = useCallback(() => setIsVapiOpen(false), []);
  const openVapiModal = useCallback(() => setIsVapiOpen(true), []);

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
            <ProofJourneyTimeline steps={journeySteps} onOpenVapi={openVapiModal} />
          </Reveal>
        </div>
      </section>

      <VapiInterceptionModal isOpen={isVapiOpen} onClose={closeVapiModal} />
    </>
  );
}
