import { WebsiteMockupCtaButton } from '../WebsiteMockupCtaButton';
import { Reveal } from '../motion/Reveal';
import { SiteVideo } from '../SiteVideo';

export function WebsiteHero() {
  return (
    <section className="website-hero" id="website-hero" aria-labelledby="website-hero-heading">
      <div className="container website-hero__grid">
        <Reveal className="website-hero__copy" delay={0.05}>
          <p className="website-hero__eyebrow">Your Custom Website</p>
          <h1 id="website-hero-heading" className="website-hero__title">
            Premium sites for electricians
          </h1>
          <p className="website-hero__lead">
            Stop losing jobs to competition. I&apos;ll build you a professional site that wins jobs
            and makes you the obvious choice.
          </p>
          <div className="website-hero__actions">
            <WebsiteMockupCtaButton>Get my mockup</WebsiteMockupCtaButton>
          </div>
        </Reveal>

        <Reveal className="website-hero__visual" delay={0.12} direction="right">
          <SiteVideo
            src="/videos/website-hero.mp4"
            poster="/videos/thumbs/website-hero.jpg"
            label="Custom electrician website demo video"
          />
        </Reveal>
      </div>
    </section>
  );
}
