import { useCallback, useEffect, useRef, useState } from 'react';
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

const STEP_AUTO_MS = 5500;
const STEP_MANUAL_MS = 11000;

function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setPrefersReducedMotion(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  return prefersReducedMotion;
}

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
  showProgress,
  progressKey,
  progressDurationMs,
}: {
  step: (typeof steps)[number];
  isActive: boolean;
  onSelect: () => void;
  showProgress?: boolean;
  progressKey?: string;
  progressDurationMs: number;
}) {
  return (
    <button
      type="button"
      className={`process-step-card${isActive ? ' is-active' : ''}`}
      aria-current={isActive ? 'step' : undefined}
      onClick={onSelect}
    >
      {isActive && showProgress ? (
        <span
          key={progressKey}
          className="process-step-card__progress"
          style={{ animationDuration: `${progressDurationMs}ms` }}
          aria-hidden="true"
        />
      ) : null}
      <span className="process-step__num">{step.num}</span>
      <h3 className="process-step__title">{step.title}</h3>
      <p className="process-step__description">{step.description}</p>
    </button>
  );
}

function ProcessShowcase() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [activeStep, setActiveStep] = useState(0);
  const [progressCycle, setProgressCycle] = useState(0);
  const [progressDurationMs, setProgressDurationMs] = useState(STEP_AUTO_MS);
  const timerRef = useRef<number | null>(null);
  const autoAdvanceEnabled = !prefersReducedMotion;

  const clearTimer = useCallback(() => {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const scheduleNext = useCallback(
    (delay: number) => {
      clearTimer();
      setProgressDurationMs(delay);

      if (!autoAdvanceEnabled) {
        return;
      }

      timerRef.current = window.setTimeout(() => {
        if (document.visibilityState === 'hidden') {
          scheduleNext(delay);
          return;
        }

        setActiveStep((current) => (current + 1) % steps.length);
        setProgressCycle((cycle) => cycle + 1);
        scheduleNext(STEP_AUTO_MS);
      }, delay);
    },
    [autoAdvanceEnabled, clearTimer],
  );

  useEffect(() => {
    scheduleNext(STEP_AUTO_MS);
    return clearTimer;
  }, [scheduleNext, clearTimer]);

  const selectStep = (index: number) => {
    setActiveStep(index);
    setProgressCycle((cycle) => cycle + 1);
    scheduleNext(STEP_MANUAL_MS);
  };

  return (
    <div className="process-showcase">
      <div className="process-showcase__steps" role="tablist" aria-label="How FluxGrid works">
        {steps.map((step, index) => (
          <ProcessStepCard
            key={step.num}
            step={step}
            isActive={activeStep === index}
            onSelect={() => selectStep(index)}
            showProgress={autoAdvanceEnabled && activeStep === index}
            progressKey={`${index}-${progressCycle}`}
            progressDurationMs={progressDurationMs}
          />
        ))}
      </div>

      <div className="process-showcase__visual">
        <div className="process-visual-viewport">
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

export function HowItWorksSection() {
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

        <ProcessShowcase />
      </div>
    </section>
  );
}
