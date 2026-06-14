import { DemoCtaButton } from './DemoCtaButton';
import { Reveal } from './motion/Reveal';

export function AboutSection() {
  return (
    <section className="about-section" id="about" aria-labelledby="about-heading">
      <div className="container about-inner">
        <Reveal>
          <p className="about-eyebrow">About us</p>
          <h2 id="about-heading" className="about-title">
            You run the shop. We watch the line.
          </h2>
          <p className="about-subtitle">
            For electrical contractors who are great at the work but tired of losing calls because
            everyone&apos;s on a job.
          </p>
        </Reveal>

        <Reveal delay={0.06}>
          <div className="about-letter">
            <p>
              FluxGrid is an automation agency with a single purpose:{' '}
              <strong>make sure a missed call doesn&apos;t become a missed job.</strong>
            </p>
            <p>
              We built it after talking with shop owners who had full crews and packed schedules
              but no good answer when the phone rang at the wrong time. If that sounds like your
              shop, the rest of this page shows what that gap costs and how we close it.
            </p>
            <p>
              When you come on board, we handle the setup, connect to your CRM, and keep
              everything running in the background. <strong>Your techs keep their routine.</strong>{' '}
              You stay focused on running the business, not babysitting software.
            </p>
            <p className="about-closing">
              We&apos;re easy to reach, straightforward to work with, and happy to prove it on a
              live call.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <DemoCtaButton className="about-cta">See a demo call</DemoCtaButton>
        </Reveal>
      </div>
    </section>
  );
}
