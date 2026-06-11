import { FluxGridLogo } from './FluxGridLogo';
import { DemoCtaButton } from './DemoCtaButton';
import { useHeaderScroll } from '../hooks/useHeaderScroll';

export function SiteHeader() {
  const scrolled = useHeaderScroll();

  return (
    <header className={scrolled ? 'is-scrolled' : undefined}>
      <div className="container nav-container">
        <a href="#" className="logo">
          <FluxGridLogo size="md" />
        </a>
        <DemoCtaButton className="cta-btn nav header-mobile-cta">See demo</DemoCtaButton>
        <nav>
          <a href="#leaks">The problem</a>
          <a href="#how-it-works">How it works</a>
          <a href="#about">About</a>
          <a href="#faq">FAQ</a>
          <DemoCtaButton className="cta-btn nav">See demo</DemoCtaButton>
        </nav>
      </div>
    </header>
  );
}
