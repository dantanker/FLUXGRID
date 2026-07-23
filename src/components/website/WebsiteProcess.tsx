import { useCallback, useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import processWalkthrough from '../../assets/website/process-walkthrough.png';
import processGoLive from '../../assets/website/process-go-live.png';
import processCustomers from '../../assets/website/process-customers.png';
import { Reveal } from '../motion/Reveal';

const steps = [
  {
    num: '01',
    title: 'Custom Walkthrough',
    text: 'A quick Zoom call to see your custom site, and see exactly how your shop will stand out.',
    image: processWalkthrough,
    imageAlt: 'Laptop showing a Zoom walkthrough of a custom electrician website',
  },
  {
    num: '02',
    title: 'Go Live',
    text: "I'll handle the technical side and get your professional site live fast.",
    image: processGoLive,
    imageAlt: 'Phone preview of a live VoltGuard electrician website',
  },
  {
    num: '03',
    title: 'Get More Customers',
    text: 'Start winning more jobs with a site that builds instant trust.',
    image: processCustomers,
    imageAlt: 'Phone showing a new electrical service lead notification',
  },
] as const;

const STEP_DURATION_MS = 5200;

export function WebsiteProcess() {
  const [activeStep, setActiveStep] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const resumeTimerRef = useRef<number | null>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.25 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (reduceMotion || userPaused || !isInView) {
      return;
    }

    const timer = window.setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, STEP_DURATION_MS);

    return () => window.clearInterval(timer);
  }, [reduceMotion, userPaused, isInView]);

  const pauseAutoplay = useCallback(() => {
    setUserPaused(true);
    if (resumeTimerRef.current) {
      window.clearTimeout(resumeTimerRef.current);
    }
    resumeTimerRef.current = window.setTimeout(() => {
      setUserPaused(false);
    }, 10000);
  }, []);

  useEffect(() => {
    return () => {
      if (resumeTimerRef.current) {
        window.clearTimeout(resumeTimerRef.current);
      }
    };
  }, []);

  const selectStep = (index: number) => {
    setActiveStep(index);
    pauseAutoplay();
  };

  return (
    <section
      ref={sectionRef}
      className="website-process"
      id="website-process"
      aria-labelledby="website-process-heading"
    >
      <div className="container website-process__inner">
        <Reveal className="website-process__intro">
          <p className="website-process__eyebrow">Process</p>
          <h2 id="website-process-heading" className="website-process__title">
            Your roadmap to a site that wins jobs
          </h2>
        </Reveal>

        <div className="website-roadmap">
          <div className="website-roadmap__timeline">
            <div className="website-roadmap__rail" aria-hidden="true">
              <span className="website-roadmap__rail-line" />
              <span
                className="website-roadmap__rail-progress"
                style={{ height: `${((activeStep + 1) / steps.length) * 100}%` }}
              />
            </div>

            <ol className="website-roadmap__steps">
              {steps.map((step, index) => {
                const isActive = activeStep === index;

                return (
                  <li key={step.num}>
                    <button
                      type="button"
                      className={`website-roadmap__step${isActive ? ' is-active' : ''}${index < activeStep ? ' is-done' : ''}`}
                      aria-current={isActive ? 'step' : undefined}
                      onClick={() => selectStep(index)}
                      onMouseEnter={() => selectStep(index)}
                      onFocus={() => selectStep(index)}
                    >
                      <span className="website-roadmap__marker" aria-hidden="true">
                        <span className="website-roadmap__marker-core">{step.num}</span>
                      </span>
                      <span className="website-roadmap__copy">
                        <span className="website-roadmap__label">{step.title}</span>
                        <span className="website-roadmap__text">{step.text}</span>
                      </span>
                      {!reduceMotion && isActive ? (
                        <span className="website-roadmap__timer" aria-hidden="true" />
                      ) : null}
                    </button>
                  </li>
                );
              })}
            </ol>
          </div>

          <div className="website-roadmap__stage" aria-live="polite" aria-atomic="true">
            {steps.map((step, index) => (
              <figure
                key={step.num}
                className={`website-roadmap__figure website-roadmap__figure--${step.num}${activeStep === index ? ' is-active' : ''}`}
                aria-hidden={activeStep !== index}
              >
                <img
                  src={step.image}
                  alt={step.imageAlt}
                  decoding="async"
                  draggable={false}
                />
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
