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
      'FluxGrid captures the high-value emergency calls your shop misses. It routes instantly behind the scenes—no new phone numbers required, completely seamless to your existing line.',
    image: step1IncomingCall,
    imageAlt: 'Incoming emergency call intercepted on your shop line',
  },
  {
    num: '02',
    title: 'Instant AI Qualification',
    description:
      'The engine immediately conducts a multi-point triage. It extracts the critical data live—identifying the exact electrical fault, customer location, and whether it requires an urgent dispatch.',
    image: step2CallDetails,
    imageAlt: 'FluxGrid extracting caller name, phone, location, and electrical issue during live triage',
  },
  {
    num: '03',
    title: 'Auto-Book the Job',
    description:
      'The qualified job drops instantly onto your team’s schedule with automated priority tags and comprehensive triage notes. Your electricians just show up and clear the ticket.',
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

  return (
    <div className="hiw-editorial">
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

              <div
                className={`hiw-step__visual hiw-step__visual--mobile${isActive ? ' is-active' : ''}`}
                aria-hidden={!isActive}
              >
                <img src={step.image} alt={step.imageAlt} decoding="async" draggable={false} />
              </div>
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
