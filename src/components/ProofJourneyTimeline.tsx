import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion';
import { Fragment, useCallback, useEffect, useRef, useState } from 'react';

const STEP_AUTO_MS = 5500;
const STEP_MANUAL_MS = 11000;
const ease = [0.22, 1, 0.36, 1] as const;

export type JourneyStep = {
  number: string;
  label: string;
  detail: string;
  variant: 'default' | 'dropoff';
  action?: 'vapi-interception';
};

type ProofJourneyTimelineProps = {
  steps: JourneyStep[];
  onOpenVapi: () => void;
};

export function ProofJourneyTimeline({ steps, onOpenVapi }: ProofJourneyTimelineProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(rootRef, { amount: 0.35 });
  const reduceMotion = useReducedMotion();
  const [activeStep, setActiveStep] = useState(0);
  const [progressCycle, setProgressCycle] = useState(0);
  const [progressDurationMs, setProgressDurationMs] = useState(STEP_AUTO_MS);
  const timerRef = useRef<number | null>(null);
  const autoAdvance = !reduceMotion;

  const clearTimer = useCallback(() => {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const bumpProgress = useCallback(() => {
    setProgressCycle((cycle) => cycle + 1);
  }, []);

  const scheduleNext = useCallback(
    (delay: number) => {
      clearTimer();
      setProgressDurationMs(delay);

      if (!autoAdvance || !isInView) {
        return;
      }

      timerRef.current = window.setTimeout(() => {
        if (document.visibilityState === 'hidden') {
          scheduleNext(delay);
          return;
        }

        setActiveStep((current) => (current + 1) % steps.length);
        bumpProgress();
        scheduleNext(STEP_AUTO_MS);
      }, delay);
    },
    [autoAdvance, bumpProgress, clearTimer, isInView, steps.length],
  );

  useEffect(() => {
    if (!isInView) {
      clearTimer();
      return;
    }

    scheduleNext(STEP_AUTO_MS);
    return clearTimer;
  }, [isInView, scheduleNext, clearTimer]);

  const goToStep = (index: number) => {
    setActiveStep(index);
    bumpProgress();
    scheduleNext(STEP_MANUAL_MS);
  };

  const step = steps[activeStep];
  const totalLabel = steps[steps.length - 1].number;

  return (
    <div ref={rootRef} className="proof-journey-card">
      <div className="proof-journey-card__header">
        <p className="proof-journey-card__eyebrow">Customer journey</p>
        <p className="proof-journey-card__count" aria-live="polite">
          {step.number}
          <span> / {totalLabel}</span>
        </p>
      </div>

      <div className="proof-journey-track" role="tablist" aria-label="Journey steps">
        {steps.map((item, index) => {
          const isActive = index === activeStep;
          const isReached = index <= activeStep;

          return (
            <Fragment key={item.number}>
              {index > 0 ? (
                <span
                  className={`proof-journey-track__bridge${isReached ? ' is-filled' : ''}${item.variant === 'dropoff' && isActive ? ' is-dropoff' : ''}`}
                  aria-hidden="true"
                />
              ) : null}

              <button
                type="button"
                role="tab"
                id={`proof-journey-tab-${item.number}`}
                aria-controls="proof-journey-stage-panel"
                aria-selected={isActive}
                className={[
                  'proof-journey-track__step',
                  isActive ? 'is-active' : '',
                  isReached ? 'is-reached' : '',
                  item.variant === 'dropoff' ? 'is-dropoff' : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
                onClick={() => goToStep(index)}
              >
                <span className="proof-journey-track__dot">{item.number}</span>
                <span className="proof-journey-track__label">{item.label}</span>
              </button>
            </Fragment>
          );
        })}
      </div>

      <div className="proof-journey-stage">
        <span className="proof-journey-stage__watermark" aria-hidden="true">
          {step.number}
        </span>

        <div className="proof-journey-stage__panel" id="proof-journey-stage-panel">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={step.number}
              role="tabpanel"
              aria-labelledby={`proof-journey-tab-${step.number}`}
              className={`proof-journey-stage__slide proof-journey-stage__slide--${step.variant}`}
              initial={reduceMotion ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -10 }}
              transition={{ duration: 0.42, ease }}
            >
              <p className="proof-journey-stage__kicker">{step.number}</p>
              <h3 className="proof-journey-stage__title">{step.label}</h3>

              {step.action === 'vapi-interception' ? (
                <button
                  type="button"
                  className="cta-btn proof-journey__interception-btn"
                  onClick={onOpenVapi}
                >
                  {step.detail}
                </button>
              ) : (
                <p className="proof-journey-stage__detail">{step.detail}</p>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {autoAdvance ? (
          <div className="proof-journey-stage__progress" aria-hidden="true">
            <span
              key={progressCycle}
              className="proof-journey-stage__progress-bar"
              style={{ animationDuration: `${progressDurationMs}ms` }}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}
