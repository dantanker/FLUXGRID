import { useCallback, useState } from 'react';
import { siteCopy } from '../content/siteCopy';
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
              {siteCopy.proof.headline}
            </h2>
            <p className="proof-subhead">{siteCopy.proof.subhead}</p>
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

