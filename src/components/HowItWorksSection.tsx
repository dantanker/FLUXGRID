import { useEffect, useState } from 'react';
import step1IncomingCall from '../assets/how-it-works/step-1-incoming-call.png';
import step2CallDetails from '../assets/how-it-works/step-2-call-details.png';
import step3JobsBoard from '../assets/how-it-works/step-3-jobs-board.png';
import { Reveal } from './motion/Reveal';

const steps = [
  {
    num: '01',
    title: 'Answer your line',
    description:
      "When you're closed or on another call. Same number your customers already dial.",
    image: step1IncomingCall,
    imageAlt: 'Incoming call answered on your shop line',
    visual: 'phone' as const,
  },
  {
    num: '02',
    title: 'Qualify the job',
    description:
      "Your intake questions cover what's wrong, where, and whether it needs the on-call tech now.",
    image: step2CallDetails,
    imageAlt: 'Call details captured in your CRM',
    visual: 'browser' as const,
  },
  {
    num: '03',
    title: 'Book to your CRM',
    description:
      'Job lands with notes and priority. Dispatch handles it like any other job.',
    image: step3JobsBoard,
    imageAlt: 'New job on your dispatch board',
    visual: 'browser' as const,
  },
] as const;

function ProcessVisualFrame({ step }: { step: (typeof steps)[number] }) {
  if (step.visual === 'phone') {
    return (
      <div className="process-visual-phone">
        <img src={step.image} alt={step.imageAlt} decoding="async" />
      </div>
    );
  }

  return (
    <div className="process-row__frame">
      <div className="process-row__chrome" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <div className="process-row__frame-body">
        <img src={step.image} alt={step.imageAlt} decoding="async" />
      </div>
    </div>
  );
}

function ProcessStepCard({
  step,
  isActive,
  onSelect,
}: {
  step: (typeof steps)[number];
  isActive: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      className={`process-step-card${isActive ? ' is-active' : ''}`}
      aria-current={isActive ? 'step' : undefined}
      onClick={onSelect}
    >
      <span className="process-step__num">{step.num}</span>
      <h3 className="process-step__title">{step.title}</h3>
      <p className="process-step__description">{step.description}</p>
    </button>
  );
}

function ProcessShowcase() {
  const [activeStep, setActiveStep] = useState(0);
  const active = steps[activeStep];

  return (
    <div className="process-showcase">
      <div className="process-showcase__steps">
        {steps.map((step, index) => (
          <ProcessStepCard
            key={step.num}
            step={step}
            isActive={activeStep === index}
            onSelect={() => setActiveStep(index)}
          />
        ))}
      </div>

      <div className="process-showcase__visual" aria-live="polite">
        <div className={`process-visual-viewport process-visual-viewport--${active.visual}`}>
          {steps.map((step, index) => (
            <div
              key={step.num}
              className={`process-visual-slide process-visual-slide--${step.visual}${activeStep === index ? ' is-active' : ''}`}
              aria-hidden={activeStep !== index}
            >
              <ProcessVisualFrame step={step} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProcessStacked() {
  return (
    <ol className="process-stack">
      {steps.map((step) => (
        <li key={step.num} className="process-stack__item">
          <article className="process-step-card is-active">
            <span className="process-step__num">{step.num}</span>
            <h3 className="process-step__title">{step.title}</h3>
            <p className="process-step__description">{step.description}</p>
          </article>
          <div className="process-stack__visual">
            <ProcessVisualFrame step={step} />
          </div>
        </li>
      ))}
    </ol>
  );
}

export function HowItWorksSection() {
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(max-width: 900px)').matches,
  );

  useEffect(() => {
    const media = window.matchMedia('(max-width: 900px)');
    const update = () => setIsMobile(media.matches);
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  return (
    <section className="process-section" id="how-it-works" aria-labelledby="process-heading">
      <div className="container process-inner">
        <Reveal className="process-header">
          <p className="process-eyebrow">How it works</p>
          <h2 id="process-heading" className="process-title">
            Same number. Job on your board.
          </h2>
          <p className="process-lead">Live in about a week. Nothing new for your crew.</p>
        </Reveal>

        {isMobile ? <ProcessStacked /> : <ProcessShowcase />}
      </div>
    </section>
  );
}
