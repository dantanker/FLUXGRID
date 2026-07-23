import { useCallback, useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import processCustomers from '../../assets/website/process-customers.png';
import featureMobilePhone from '../../assets/website/feature-mobile-phone.png';
import featureVan from '../../assets/website/feature-pro-van.png';

const DOMAIN = 'voltguard.com';

type FeatureId = 'domain' | 'mobile' | 'leads' | 'pro';

type Feature = {
  id: FeatureId;
  num: string;
  title: string;
  shortTitle: string;
};

const features: Feature[] = [
  { id: 'domain', num: '01', title: 'Custom Domain', shortTitle: 'Domain' },
  { id: 'mobile', num: '02', title: 'Mobile Optimization', shortTitle: 'Mobile' },
  { id: 'leads', num: '03', title: 'Instant Lead Capture', shortTitle: 'Leads' },
  { id: 'pro', num: '04', title: 'Premium Brand Image', shortTitle: 'Brand' },
];

function DomainVisual({ active }: { active: boolean }) {
  const reduceMotion = useReducedMotion();
  const [typed, setTyped] = useState(reduceMotion ? DOMAIN.length : 0);

  useEffect(() => {
    if (!active) {
      return;
    }

    if (reduceMotion) {
      setTyped(DOMAIN.length);
      return;
    }

    setTyped(0);
    let i = 0;
    const typeTimer = window.setInterval(() => {
      i += 1;
      setTyped(i);
      if (i >= DOMAIN.length) {
        window.clearInterval(typeTimer);
      }
    }, 52);

    return () => window.clearInterval(typeTimer);
  }, [active, reduceMotion]);

  const shown = DOMAIN.slice(0, typed);
  const done = typed >= DOMAIN.length;

  return (
    <div className="feature-visual feature-visual--domain">
      <div className="feature-google">
        <div className="feature-google__logo" aria-hidden="true">
          <span style={{ color: '#4285F4' }}>G</span>
          <span style={{ color: '#EA4335' }}>o</span>
          <span style={{ color: '#FBBC05' }}>o</span>
          <span style={{ color: '#4285F4' }}>g</span>
          <span style={{ color: '#34A853' }}>l</span>
          <span style={{ color: '#EA4335' }}>e</span>
        </div>

        <div className="feature-google__bar">
          <svg
            className="feature-google__search-icon"
            viewBox="0 0 24 24"
            width="16"
            height="16"
            aria-hidden="true"
          >
            <path
              fill="currentColor"
              d="M15.5 14h-.79l-.28-.27A6.47 6.47 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5Zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14Z"
            />
          </svg>

          <div className="feature-google__input" aria-label={DOMAIN}>
            <span className="feature-google__typed">{shown}</span>
            <motion.span
              className="feature-google__caret"
              aria-hidden="true"
              animate={
                reduceMotion || done ? { opacity: done ? 0 : 1 } : { opacity: [1, 0, 1] }
              }
              transition={
                done ? { duration: 0.15 } : { duration: 0.7, repeat: Infinity, ease: 'linear' }
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function MobileVisual({ active }: { active: boolean }) {
  return (
    <div className={`feature-visual feature-visual--mobile${active ? ' is-active' : ''}`}>
      <div className="feature-phone">
        <div className="feature-phone__bezel">
          <div className="feature-phone__screen">
            <img
              className="feature-phone__shot"
              src={featureMobilePhone}
              alt="Mobile-optimized electrician website on an iPhone"
              draggable={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function LeadsVisual({ active }: { active: boolean }) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="feature-visual feature-visual--leads">
      <div className="feature-leads">
        <img
          className="feature-leads__img"
          src={processCustomers}
          alt="Phone lock screen with a New Lead notification"
        />
        <motion.div
          className="feature-leads__ping"
          aria-hidden="true"
          animate={
            active && !reduceMotion
              ? { scale: [0.75, 1.4], opacity: [0.5, 0] }
              : { opacity: 0 }
          }
          transition={{ duration: 1.35, repeat: Infinity, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}

function ProVisual({ active }: { active: boolean }) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="feature-visual feature-visual--pro">
      <figure className="feature-pro">
        <motion.img
          className="feature-pro__img"
          src={featureVan}
          alt="Branded electrician van with professional vehicle wrap"
          animate={active && !reduceMotion ? { scale: 1.04 } : { scale: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        />
      </figure>
    </div>
  );
}

function FeatureMedia({ id, active }: { id: FeatureId; active: boolean }) {
  switch (id) {
    case 'domain':
      return <DomainVisual active={active} />;
    case 'mobile':
      return <MobileVisual active={active} />;
    case 'leads':
      return <LeadsVisual active={active} />;
    case 'pro':
      return <ProVisual active={active} />;
  }
}

export function WebsiteFeatureSpotlight() {
  const [active, setActive] = useState(0);
  const dragStartX = useRef<number | null>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const selectFeature = useCallback((index: number) => {
    setActive(index);
  }, []);

  useEffect(() => {
    const list = listRef.current;
    if (!list) {
      return;
    }

    const activeButton = list.querySelector<HTMLButtonElement>('.feature-pin__item.is-active');
    if (!activeButton) {
      return;
    }

    const listRect = list.getBoundingClientRect();
    const buttonRect = activeButton.getBoundingClientRect();
    const nextLeft =
      list.scrollLeft + (buttonRect.left - listRect.left) - (listRect.width - buttonRect.width) / 2;

    list.scrollTo({ left: Math.max(0, nextLeft), behavior: 'smooth' });
  }, [active]);

  const onStagePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType === 'mouse' && event.button !== 0) {
      return;
    }
    dragStartX.current = event.clientX;
  };

  const onStagePointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (dragStartX.current === null) {
      return;
    }

    const delta = event.clientX - dragStartX.current;
    dragStartX.current = null;

    if (Math.abs(delta) < 48) {
      return;
    }

    if (delta < 0) {
      setActive((prev) => Math.min(features.length - 1, prev + 1));
    } else {
      setActive((prev) => Math.max(0, prev - 1));
    }
  };

  return (
    <section className="website-features" id="website-features">
      <div className="container website-features__inner">
        <div className="feature-pin">
          <div className="feature-pin__layout">
            <div className="feature-pin__copy">
              <p className="feature-pin__eyebrow">Feature spotlight</p>
              <ul ref={listRef} className="feature-pin__list" aria-label="Website features">
                {features.map((feature, index) => (
                  <li key={feature.id}>
                    <button
                      type="button"
                      className={`feature-pin__item${active === index ? ' is-active' : ''}`}
                      onMouseEnter={() => selectFeature(index)}
                      onFocus={() => selectFeature(index)}
                      onClick={() => selectFeature(index)}
                      aria-current={active === index ? 'true' : undefined}
                    >
                      <span className="feature-pin__num">{feature.num}</span>
                      <span className="feature-pin__title feature-pin__title--full">
                        {feature.title}
                      </span>
                      <span className="feature-pin__title feature-pin__title--short">
                        {feature.shortTitle}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div
              className="feature-pin__stage"
              aria-live="polite"
              onPointerDown={onStagePointerDown}
              onPointerUp={onStagePointerUp}
              onPointerCancel={() => {
                dragStartX.current = null;
              }}
            >
              {features.map((feature, index) => (
                <div
                  key={feature.id}
                  className={`feature-pin__frame${active === index ? ' is-active' : ''}`}
                  aria-hidden={active !== index}
                >
                  <FeatureMedia id={feature.id} active={active === index} />
                </div>
              ))}
            </div>

            <div className="feature-pin__dots" aria-hidden="true">
              {features.map((feature, index) => (
                <span
                  key={feature.id}
                  className={`feature-pin__dot${active === index ? ' is-active' : ''}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
