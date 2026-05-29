import { FluxGridLogo } from './FluxGridLogo';

const siteLinks = [
  { label: 'Missed Revenue', href: '#leaks' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Book Demo', href: '#demo' },
];

const contactLinks = [
  { label: 'hello@fluxgrid.io', href: 'mailto:hello@fluxgrid.io' },
  { label: '(800) 555-1234', href: 'tel:+18005551234' },
  { label: 'Privacy', href: '#' },
  { label: 'Terms', href: '#' },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div className="footer-main">
          <div className="footer-brand">
            <a href="#" className="logo footer-logo">
              <FluxGridLogo size="md" />
            </a>
            <p>After-hours phone coverage for electrical contractors.</p>
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
          <span className="footer-bottom-tag">Built for electrical shop owners</span>
        </div>
      </div>
    </footer>
  );
}
