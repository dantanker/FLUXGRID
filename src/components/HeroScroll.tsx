import { ArrowRight } from 'lucide-react';
import { ContainerScroll } from '@/components/ui/container-scroll-animation';
import { HeroScrollDemo } from './HeroScrollDemo';
import { IntegrationsBar } from './IntegrationsBar';

export function HeroScroll() {
  return (
    <section className="hero-scroll-section">
      <ContainerScroll
        titleComponent={
          <>
            <h1 className="px-2 text-[1.625rem] leading-[1.15] sm:text-3xl md:text-5xl font-extrabold text-white uppercase tracking-tight">
              Your crew is on a job.{' '}
              <span className="text-[#ff9500]">The emergency call still gets answered.</span>
            </h1>
            <p className="mt-3 sm:mt-4 px-2 text-sm sm:text-base md:text-lg text-white/70 max-w-2xl mx-auto leading-relaxed">
              FluxGrid picks up when your office can&apos;t — nights, weekends, and busy days.
              It asks the right electrical safety questions, flags true emergencies, and books the
              job into ServiceTitan, Jobber, or Housecall Pro. You wake up to work on the board,
              not voicemails to chase.
            </p>
          </>
        }
        actionComponent={
          <div className="hero-cta-stack">
            <a href="#demo" className="cta-btn inline-flex text-sm sm:text-base px-5 sm:px-8">
              <span className="sm:hidden">Book Free Walkthrough</span>
              <span className="hidden sm:inline">Book a Free 10-Min Walkthrough</span>
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
            <p className="hero-trust-line px-4 text-center text-xs sm:text-[13px]">
              Sounds like your shop · You approve every script · Keep your existing number
            </p>
          </div>
        }
      >
        <HeroScrollDemo />
      </ContainerScroll>
      <IntegrationsBar variant="hero" />
    </section>
  );
}
