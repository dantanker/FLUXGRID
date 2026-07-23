import { Link, useLocation } from 'react-router-dom';
import { FluxGridLogo } from './FluxGridLogo';
import { DemoCtaButton } from './DemoCtaButton';
import { WebsiteMockupCtaButton } from './WebsiteMockupCtaButton';
import { useHeaderScroll } from '../hooks/useHeaderScroll';

export function SiteHeader() {
  const scrolled = useHeaderScroll();
  const { pathname } = useLocation();
  const isWebsitePage = pathname.startsWith('/websites');

  const headerCta = isWebsitePage ? (
    <>
      <Link to="/" className="header-mobile-link">
        Receptionist
      </Link>
      <WebsiteMockupCtaButton className="nav header-mobile-cta">
        Get my mockup
      </WebsiteMockupCtaButton>
      <nav>
        <Link to="/">Get Your Digital Receptionist</Link>
        <WebsiteMockupCtaButton className="nav">Get my mockup</WebsiteMockupCtaButton>
      </nav>
    </>
  ) : (
    <>
      <Link to="/websites" className="header-mobile-link">
        Websites
      </Link>
      <DemoCtaButton className="nav header-mobile-cta">Book a demo</DemoCtaButton>
      <nav>
        <Link to="/websites">Get Your Custom Website</Link>
        <DemoCtaButton className="nav">Book a demo</DemoCtaButton>
      </nav>
    </>
  );

  return (
    <header className={scrolled ? 'is-scrolled' : undefined}>
      <div className="container nav-container">
        <Link to="/" className="logo">
          <FluxGridLogo size="md" />
        </Link>
        {headerCta}
      </div>
    </header>
  );
}
