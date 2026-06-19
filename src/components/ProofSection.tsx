import { useCallback, useState } from 'react';
import { Reveal } from './motion/Reveal';
import { VapiInterceptionModal } from './VapiInterceptionModal';

export function ProofSection() {
  const [isVapiOpen, setIsVapiOpen] = useState(false);
  const closeVapiModal = useCallback(() => setIsVapiOpen(false), []);
  const openVapiModal = useCallback(() => setIsVapiOpen(true), []);

  return (
    <>
      <section className="proof-section" id="leaks" aria-labelledby="proof-headline">
        <div className="container proof-inner">
          <Reveal className="proof-copy">
            <h2 id="proof-headline" className="proof-headline">
              You aren&apos;t losing jobs to better companies. You&apos;re losing them to faster
              responses.
            </h2>
            <p className="proof-subhead">
              Homeowners don&apos;t leave voicemails. They just click the next electrician on
              Google. If your team misses a call, that job is gone forever.
            </p>
            <button type="button" className="cta-btn proof-cta" onClick={openVapiModal}>
              Hear FluxGrid answer a call
            </button>
          </Reveal>
        </div>
      </section>

      <VapiInterceptionModal isOpen={isVapiOpen} onClose={closeVapiModal} />
    </>
  );
}
