import { useCallback, useEffect, useRef, useState } from 'react';
import step1IncomingCall from '../assets/how-it-works/step-1-incoming-call.png';
import step2CallDetails from '../assets/how-it-works/step-2-call-details.png';
import step3JobsBoard from '../assets/how-it-works/step-3-jobs-board.png';
import { Reveal } from './motion/Reveal';

const steps = [
  {
    num: '01',
    title: 'Intercept the Lead',
    description:
      'FluxGrid captures the high value emergency calls your shop misses, routing them instantly behind the scenes with no new phone numbers required.',
    image: step1IncomingCall,
    imageAlt: 'Incoming emergency call intercepted on your shop line',
  },
  {
    num: '02',
    title: 'Instant AI Qualification',
    description:
      'The engine runs a multi point triage in real time, pulling the fault, location, and urgency so your team knows when an urgent dispatch is required.',
    image: step2CallDetails,
    imageAlt: 'FluxGrid extracting caller name, phone, location, and electrical issue during live triage',
  },
  {
    num: '03',
    title: 'Auto Book the Job',
    description:
      'The qualified job lands on your team\'s schedule with priority tags and triage notes. Your electricians show up, clear the ticket, and the board stays current.',
    image: step3JobsBoard,
    imageAlt: 'Customer intake board with booked jobs, urgency tags, and triage notes',
  },
] as const;

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

function EditorialTimeline() {
  const [activeStep, setActiveStep] = useState(0);
  const stepRefs = useRef<(HTMLElement | null)[]>([]);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const observers: IntersectionObserver[] = [];

    stepRefs.current.forEach((element, index) => {
      if (!element) {
        return;
      }

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveStep(index);
            }
          });
        },
        {
          root: null,
          rootMargin: '-35% 0px -35% 0px',
          threshold: 0,
        },
      );

      observer.observe(element);
      observers.push(observer);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, [prefersReducedMotion]);

  const activateStep = useCallback((index: number) => {
    setActiveStep(index);
    stepRefs.current[index]?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });
  }, []);

  const activeStepData = steps[activeStep];

  return (
    <div className="hiw-editorial">
      <div className="hiw-mobile-stack">
        <div className="hiw-mobile-cards" role="tablist" aria-label="How FluxGrid works">
          {steps.map((step, index) => {
            const isActive = activeStep === index;

            return (
              <button
                key={step.num}
                type="button"
                role="tab"
                id={`hiw-mobile-tab-${index}`}
                aria-selected={isActive}
                aria-controls="hiw-mobile-detail-panel"
                className={`hiw-mobile-card${isActive ? ' is-active' : ''}`}
                onClick={() => setActiveStep(index)}
              >
                <span className="hiw-mobile-card__num" aria-hidden="true">
                  {step.num}
                </span>
                <span className="hiw-mobile-card__title">{step.title}</span>
              </button>
            );
          })}
        </div>

        <div
          id="hiw-mobile-detail-panel"
          role="tabpanel"
          aria-labelledby={`hiw-mobile-tab-${activeStep}`}
          className="hiw-mobile-detail"
        >
          <div className="hiw-mobile-detail__copy">
            <span className="hiw-mobile-detail__num" aria-hidden="true">
              {activeStepData.num}
            </span>
            <h3 className="hiw-mobile-detail__title">{activeStepData.title}</h3>
            <p className="hiw-mobile-detail__description">{activeStepData.description}</p>
          </div>
          <figure className="hiw-mobile-detail__visual">
            <img
              src={activeStepData.image}
              alt={activeStepData.imageAlt}
              decoding="async"
              draggable={false}
            />
          </figure>
        </div>
      </div>

      <div className="hiw-timeline" role="list" aria-label="How FluxGrid works">
        {steps.map((step, index) => {
          const isActive = activeStep === index;

          return (
            <article
              key={step.num}
              ref={(node) => {
                stepRefs.current[index] = node;
              }}
              className={`hiw-step${isActive ? ' is-active' : ''}`}
              role="listitem"
              onMouseEnter={() => setActiveStep(index)}
              onFocus={() => setActiveStep(index)}
            >
              <button
                type="button"
                className="hiw-step__trigger"
                aria-current={isActive ? 'step' : undefined}
                onClick={() => activateStep(index)}
              >
                <span className="hiw-step__num" aria-hidden="true">
                  {step.num}
                </span>
                <span className="hiw-step__content">
                  <span className="hiw-step__title">{step.title}</span>
                  <span className="hiw-step__description">{step.description}</span>
                </span>
              </button>
            </article>
          );
        })}
      </div>

      <div className="hiw-visual-panel" aria-live="polite" aria-atomic="true">
        {steps.map((step, index) => (
          <figure
            key={step.num}
            className={`hiw-visual${activeStep === index ? ' is-active' : ''}`}
            aria-hidden={activeStep !== index}
          >
            <img src={step.image} alt={step.imageAlt} decoding="async" draggable={false} />
          </figure>
        ))}
      </div>
    </div>
  );
}

export function HowItWorksSection() {
  return (
    <section className="process-section hiw-section" id="how-it-works" aria-labelledby="process-heading">
      <div className="hiw-section__grid" aria-hidden="true" />
      <div className="container process-inner hiw-inner">
        <Reveal className="process-header hiw-header">
          <h2 id="process-heading" className="process-eyebrow hiw-eyebrow">
            How it works
          </h2>
        </Reveal>

        <EditorialTimeline />
      </div>
    </section>
  );
}
