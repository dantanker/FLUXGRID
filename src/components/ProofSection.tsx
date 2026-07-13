import { Reveal } from './motion/Reveal';

export function ProofSection() {
  return (
    <section className="proof-section" id="leaks" aria-labelledby="proof-headline">
      <div className="container proof-inner">
        <Reveal className="proof-copy">
          <h2 id="proof-headline" className="proof-headline">
            You aren&apos;t losing jobs to better companies. You&apos;re losing them to faster
            responses.
          </h2>
          <p className="proof-subhead">
            Homeowners don&apos;t leave voicemails. They click the next electrician on Google.
            Miss the call and that job is <strong>gone forever</strong>.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
