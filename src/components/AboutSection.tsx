const founderName = 'Peter';

const aboutContent = {
  eyebrow: 'About me',
  statement:
    "I don't know how to wire a house—that's your expertise. I built FluxGrid to handle the tedious office calls in the background so you can focus on doing what you do best.",
} as const;

export function AboutSection() {
  return (
    <section className="about-section" id="about" aria-labelledby="about-heading">
      <div className="about-section__grid electrical-grid-bg" aria-hidden="true" />

      <div className="container about-inner">
        <p className="about-eyebrow">{aboutContent.eyebrow}</p>

        <h2 id="about-heading" className="about-statement">
          &ldquo;{aboutContent.statement}&rdquo;
        </h2>

        <p className="about-signoff">&mdash; {founderName}, Founder</p>
      </div>
    </section>
  );
}
