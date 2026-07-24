import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useCallback, useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react';
import step1IncomingCall from '../assets/how-it-works/step-1-incoming-call.png';
import step2CallDetails from '../assets/how-it-works/step-2-call-details.png';
import step3JobsBoard from '../assets/how-it-works/step-3-jobs-board.png';
import { Reveal } from './motion/Reveal';

const steps = [
  {
    num: '01',
    title: 'Intercept the Lead',
    shortTitle: 'Intercept',
    description:
      "FluxGrid captures those high value emergency calls you're missing and handles them instantly. No new phone number, no hassle.",
    image: step1IncomingCall,
    imageAlt: 'Incoming emergency call intercepted on your shop line',
  },
  {
    num: '02',
    title: 'Instant AI Qualification',
    shortTitle: 'Qualify',
    description:
      "Your digital receptionist instantly vets every caller, checking if it's residential or commercial, the location, and the urgency, so you know exactly which leads are worth your time.",
    image: step2CallDetails,
    imageAlt: 'FluxGrid extracting caller name, phone, location, and electrical issue during live triage',
  },
  {
    num: '03',
    title: 'Auto Book the Job',
    shortTitle: 'Book',
    description:
      'The qualified lead lands straight on your schedule with full details. You and your customer both get an instant confirmation text, so the job is locked in before you even lift a finger.',
    image: step3JobsBoard,
    imageAlt: 'Customer intake board with booked jobs, urgency tags, and triage notes',
  },
] as const;

const STEP_DURATION_MS = 4800;
const ease = [0.22, 1, 0.36, 1] as const;

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

function MobileStory() {
  const [activeStep, setActiveStep] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const stackRef = useRef<HTMLDivElement>(null);
  const resumeTimerRef = useRef<number | null>(null);
  const dragStartX = useRef<number | null>(null);
  const reduceMotion = useReducedMotion();
  const active = steps[activeStep];

  useEffect(() => {
    const node = stackRef.current;
    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.35 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (reduceMotion || userPaused || !isInView) {
      return;
    }

    const timer = window.setInterval(() => {
      setActiveStep((current) => (current + 1) % steps.length);
    }, STEP_DURATION_MS);

    return () => window.clearInterval(timer);
  }, [reduceMotion, userPaused, isInView, activeStep]);

  useEffect(() => {
    return () => {
      if (resumeTimerRef.current !== null) {
        window.clearTimeout(resumeTimerRef.current);
      }
    };
  }, []);

  const selectStep = useCallback((index: number) => {
    setActiveStep(index);
    setUserPaused(true);

    if (resumeTimerRef.current !== null) {
      window.clearTimeout(resumeTimerRef.current);
    }

    resumeTimerRef.current = window.setTimeout(() => {
      setUserPaused(false);
    }, STEP_DURATION_MS * 2);
  }, []);

  const goPrev = useCallback(() => {
    selectStep((activeStep - 1 + steps.length) % steps.length);
  }, [activeStep, selectStep]);

  const goNext = useCallback(() => {
    selectStep((activeStep + 1) % steps.length);
  }, [activeStep, selectStep]);

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType === 'mouse' && event.button !== 0) {
      return;
    }
    dragStartX.current = event.clientX;
  };

  const onPointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (dragStartX.current === null) {
      return;
    }

    const delta = event.clientX - dragStartX.current;
    dragStartX.current = null;

    if (Math.abs(delta) < 40) {
      return;
    }

    if (delta < 0) {
      goNext();
    } else {
      goPrev();
    }
  };

  return (
    <div ref={stackRef} className="hiw-mobile-stack">
      <div
        className="hiw-mobile-stage"
        aria-live="polite"
        aria-atomic="true"
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={() => {
          dragStartX.current = null;
        }}
      >
        {steps.map((step, index) => (
          <figure
            key={step.num}
            className={`hiw-mobile-stage__frame${activeStep === index ? ' is-active' : ''}`}
            aria-hidden={activeStep !== index}
          >
            <img src={step.image} alt={step.imageAlt} decoding="async" draggable={false} />
          </figure>
        ))}

        <button
          type="button"
          className="hiw-mobile-nav hiw-mobile-nav--prev"
          aria-label="Previous step"
          onClick={(event) => {
            event.stopPropagation();
            goPrev();
          }}
          onPointerDown={(event) => event.stopPropagation()}
        >
          <span aria-hidden="true">‹</span>
        </button>
        <button
          type="button"
          className="hiw-mobile-nav hiw-mobile-nav--next"
          aria-label="Next step"
          onClick={(event) => {
            event.stopPropagation();
            goNext();
          }}
          onPointerDown={(event) => event.stopPropagation()}
        >
          <span aria-hidden="true">›</span>
        </button>
      </div>

      <div className="hiw-mobile-copy">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={active.num}
            className="hiw-mobile-copy__inner"
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.4, ease }}
          >
            <p className="hiw-mobile-copy__num" aria-hidden="true">
              {active.num}
            </p>
            <h3 className="hiw-mobile-copy__title">{active.title}</h3>
            <p className="hiw-mobile-copy__description">{active.description}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="hiw-mobile-steps" role="tablist" aria-label="How FluxGrid works">
        {steps.map((step, index) => {
          const isActive = activeStep === index;
          const shortLabel = step.shortTitle;

          return (
            <button
              key={step.num}
              type="button"
              role="tab"
              id={`hiw-mobile-tab-${index}`}
              aria-selected={isActive}
              aria-label={`Step ${step.num}: ${step.title}`}
              className={`hiw-mobile-steps__btn${isActive ? ' is-active' : ''}`}
              onClick={() => selectStep(index)}
            >
              <span className="hiw-mobile-steps__num">{step.num}</span>
              <span className="hiw-mobile-steps__label">{shortLabel}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
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
      <MobileStory />

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
          <p className="hiw-eyebrow">Process</p>
          <h2 id="process-heading" className="hiw-title">
            How it works
          </h2>
        </Reveal>

        <EditorialTimeline />
      </div>
    </section>
  );
}
