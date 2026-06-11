import { AboutScrollStory } from './AboutScrollStory';

export function AboutSection() {
  return (
    <section className="about-section" id="about" aria-labelledby="about-heading">
      <div className="about-section__grid electrical-grid-bg" aria-hidden="true" />
      <AboutScrollStory />
    </section>
  );
}
