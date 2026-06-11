import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { DemoCtaButton } from './DemoCtaButton';

const founderName = 'Peter';

const systemSteps = [
  {
    label: 'Answers immediately',
    text: 'Day, night, or weekends—the moment a call comes in, the receptionist picks up. No voicemail delay.',
  },
  {
    label: 'Qualifies the job',
    text: 'It asks the same questions your dispatcher would: service area, urgency, job type, and contact details.',
  },
  {
    label: 'Books into your shop',
    text: 'Qualified jobs drop straight into ServiceTitan, Jobber, Housecall Pro, or your existing calendar.',
  },
];

const whyPoints = [
  {
    label: 'We stay in our lane',
    text: "We won't pretend to know your trade. We built one system that does one job: catch the calls you miss.",
  },
  {
    label: 'You talk to the builder',
    text: 'No account rep shuffle. You get the person who built your receptionist and launches it for your shop.',
  },
  {
    label: 'Live in about a week',
    text: 'No new dashboard for your crew. We plug into what you already use and handle the setup behind the scenes.',
  },
];

const slides = [
  { id: 'who', step: '01', label: 'Who we are' },
  { id: 'problem', step: '02', label: 'The problem' },
  { id: 'system', step: '03', label: 'The system' },
  { id: 'cta', step: '04', label: 'Hear it live' },
] as const;

function AboutSlideContent({ index }: { index: number }) {
  if (index === 0) {
    return (
      <>
        <h3 className="about-heading">We Don&apos;t Wire Houses. We Answer the Phone.</h3>
        <p>
          FluxGrid is an automation agency built around <strong>one product</strong>: a 24/7 missed
          call receptionist for electrical contractors.
        </p>
        <p>
          I&apos;m not an electrician. I won&apos;t pretend to know your code book or walk your
          panel schedules. <strong>What I do know is what happens when your phone rings and nobody
          picks up</strong>—and what that costs a shop that already has more work than hours in the
          day.
        </p>
        <p>
          I built this because shop owners kept telling me the same story: strong crews, steady
          demand, and <strong>jobs slipping away between sites</strong> because the line couldn&apos;t
          keep up.
        </p>
        <p className="about-signoff">&mdash; {founderName}, Founder</p>
      </>
    );
  }

  if (index === 1) {
    return (
      <>
        <h3 className="about-heading">When You&apos;re on a Job, the Phone Doesn&apos;t Wait.</h3>
        <p>
          You&apos;re on a ladder, in a crawl space, or hands-deep in a live panel. The phone rings.
          You can&apos;t answer. <strong>That caller doesn&apos;t leave a polite message—they dial
          the next electrician on Google.</strong>
        </p>
        <p>
          You paid for that lead. Your crew had the skill to close it.{' '}
          <strong>The job went to whoever picked up first.</strong> That pattern repeats every week
          until the front of your shop works as hard as the trucks in the field.
        </p>
      </>
    );
  }

  if (index === 2) {
    return (
      <>
        <h3 className="about-heading">One Product. One Job: Catch Every Call.</h3>
        <p>
          We don&apos;t sell marketing packages or bloated software suites. FluxGrid runs a{' '}
          <strong>missed call receptionist</strong> built specifically for electrical shops.
        </p>
        <p className="about-lead">When a call comes in and you can&apos;t answer:</p>
        <ul className="about-list">
          {systemSteps.map((step) => (
            <li key={step.label}>
              <strong>{step.label}:</strong> {step.text}
            </li>
          ))}
        </ul>
      </>
    );
  }

  return (
    <>
      <h3 className="about-heading">Why Shops Work With FluxGrid</h3>
      <blockquote className="about-quote">
        <strong>We&apos;re not a trade shop selling you software.</strong> We&apos;re an automation
        agency that only serves electrical contractors—and we built the receptionist around how your
        callers actually behave.
      </blockquote>
      <ul className="about-list">
        {whyPoints.map((point) => (
          <li key={point.label}>
            <strong>{point.label}:</strong> {point.text}
          </li>
        ))}
      </ul>
      <p className="about-lead about-lead--cta">
        <strong>Ten minutes on the phone.</strong> You listen while the receptionist runs a live
        intake—then watch the job land in your CRM.
      </p>
      <DemoCtaButton className="cta-btn cta-btn--primary about-cta">
        Hear a demo call
      </DemoCtaButton>
    </>
  );
}

export function AboutScrollStory() {
  const [activeIndex, setActiveIndex] = useState(0);
  const reduceMotion = useReducedMotion();

  return (
    <div className="container about-panel-wrap">
      <div className="about-section-intro">
        <p className="about-panel-eyebrow">About FluxGrid</p>
        <h2 id="about-heading" className="about-title">
          Built by an automation shop, for electrical shops.
        </h2>
        <p className="about-section-lead">
          One missed call receptionist. No trade pretense. Tap a chapter below to read the full
          story.
        </p>
      </div>

      <div className="about-panel-card">
        <div className="about-panel-body">
          <nav className="about-panel-rail" aria-label="About chapters">
            {slides.map((slide, index) => (
              <button
                key={slide.id}
                type="button"
                className={`about-panel-rail__step${index === activeIndex ? ' is-active' : ''}`}
                aria-current={index === activeIndex ? 'step' : undefined}
                onClick={() => setActiveIndex(index)}
              >
                <span className="about-panel-rail__num">{slide.step}</span>
                <span className="about-panel-rail__label">{slide.label}</span>
              </button>
            ))}
          </nav>

          <div className="about-panel-viewport">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                className="about-panel-slide"
                initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                <AboutSlideContent index={activeIndex} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
