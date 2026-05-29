import { ArrowRight } from 'lucide-react';
import { ContainerScroll } from '@/components/ui/container-scroll-animation';
import { HeroScrollDemo } from './HeroScrollDemo';

export function HeroScroll() {
  return (
    <section className="hero-scroll-section">
      <ContainerScroll
        titleComponent={
          <>
            <h1 className="text-3xl md:text-5xl font-extrabold text-white uppercase tracking-tight leading-tight">
              Stop losing electrical jobs because you{' '}
              <span className="text-[#ff9500]">missed a call</span>.
            </h1>
            <p className="mt-6 text-base md:text-lg text-white/70 max-w-2xl mx-auto leading-relaxed">
              FluxGrid is the 24/7 Intelligent Dispatch Engine built for electrical shop owners. It
              instantly answers, qualifies with trade logic, and logs jobs straight into your CRM.
            </p>
          </>
        }
        actionComponent={
          <a href="#demo" className="cta-btn inline-flex">
            See Engine Demo <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        }
      >
        <HeroScrollDemo />
      </ContainerScroll>
    </section>
  );
}
