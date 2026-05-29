import { ArrowRight } from 'lucide-react';
import heroIphone from '../assets/hero-iphone.png';
import { IntegrationChip, INTEGRATIONS } from './integrations/IntegrationChip';

export function HeroScrollDemo() {
  return (
    <div className="hero-phone-stage">
      <div className="hero-integrations-panel">
        <p className="hero-integrations-label">
          Books jobs directly into the dispatch software you already use
        </p>

        <div className="hero-integrations-row">
          {INTEGRATIONS.map((item) => (
            <IntegrationChip key={item.id} id={item.id} label={item.label} />
          ))}
        </div>
      </div>

      <div className="hero-phone-center">
        <div className="relative z-10 mx-auto w-full max-w-[260px] sm:max-w-[280px] md:max-h-full md:max-w-none">
          <img
            src={heroIphone}
            alt="FluxGrid answering a new lead call on iPhone"
            width={925}
            height={1976}
            decoding="async"
            className="hero-phone-image h-auto w-full object-contain object-center [transform:translateZ(0)]"
            draggable={false}
          />

          <div className="pointer-events-none absolute inset-0">
            <div className="pointer-events-auto absolute left-1/2 top-[41%] w-[72%] -translate-x-1/2 -translate-y-1/2">
              <a
                href="#how-it-works"
                className="cta-btn inline-flex w-full items-center justify-center gap-1.5 whitespace-nowrap px-2 py-2.5 text-[9px] leading-none sm:gap-2 sm:px-3 sm:py-3 sm:text-[10px] md:text-[11px]"
              >
                See How It Works
                <ArrowRight className="h-3 w-3 shrink-0 sm:h-3.5 sm:w-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
