import { ContainerScroll } from '@/components/ui/container-scroll-animation';
import { HeroScrollDemo } from './HeroScrollDemo';

export function HeroScroll() {
  return (
    <section className="hero-scroll-section" id="integrations">
      <ContainerScroll
        titleComponent={
          <>
            <h1 className="text-3xl md:text-5xl font-extrabold text-white uppercase tracking-tight leading-tight">
              Automate Your Dispatch.{' '}
              <span className="text-[#ff9500]">Never Miss Another Lead.</span>
            </h1>
            <p className="mt-6 text-base md:text-lg text-white/70 max-w-2xl mx-auto leading-relaxed">
              FluxGrid intercepts, qualifies, and schedules every lead to your calendar 24/7.
            </p>
          </>
        }
      >
        <HeroScrollDemo />
      </ContainerScroll>
    </section>
  );
}
