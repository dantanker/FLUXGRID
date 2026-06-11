import { FluxGridLogo } from './FluxGridLogo';

const siteLinks = [
  { label: 'The problem', href: '#leaks' },
  { label: 'How it works', href: '#how-it-works' },
  { label: 'About', href: '#about' },
  { label: 'FAQ', href: '#faq' },
];

const contactLinks = [
  { label: 'hello@fluxgrid.io', href: 'mailto:hello@fluxgrid.io' },
  { label: '(800) 555-1234', href: 'tel:+18005551234' },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div className="footer-main">
          <div className="footer-brand">
            <a href="#" className="logo footer-logo">
              <FluxGridLogo size="sm" variant="light" />
            </a>
            <p className="footer-brand-tagline">
              24/7 AI missed call receptionists built to quality leads and secure jobs for
              electrical shops.
            </p>
          </div>

          <nav className="footer-nav" aria-label="Footer">
            <div className="footer-nav-col">
              <span className="footer-nav-label">Site</span>
              <ul>
                {siteLinks.map((link) => (
                  <li key={link.label}>
                    <a href={link.href}>{link.label}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer-nav-col">
              <span className="footer-nav-label">Contact</span>
              <ul>
                {contactLinks.map((link) => (
                  <li key={link.label}>
                    <a href={link.href}>{link.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </div>

        <div className="footer-bottom">
          <span>&copy; {year} FluxGrid</span>
          <span className="footer-bottom-meta">
            <a href="#">Privacy</a>
            <span className="footer-bottom-sep" aria-hidden="true">
              ·
            </span>
            <a href="#">Terms</a>
            <span className="footer-bottom-sep" aria-hidden="true">
              ·
            </span>
            <span>Electrical contractors only</span>
          </span>
        </div>
      </div>
    </footer>
  );
}
