import { ContainerScroll } from '@/components/ui/container-scroll-animation';
import { HeroScrollDemo } from './HeroScrollDemo';

export function HeroScroll() {
  return (
    <section className="hero-scroll-section" id="integrations">
      <ContainerScroll
        titleComponent={
          <h1 className="text-3xl md:text-5xl font-extrabold text-white uppercase tracking-tight leading-tight">
            The 24/7 Automated Dispatcher for Electrical Shops.
            <span className="block text-[#ff9500]">Never Miss Another High-Ticket Lead.</span>
          </h1>
        }
      >
        <HeroScrollDemo />
      </ContainerScroll>
    </section>
  );
}
