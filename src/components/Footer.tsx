import { FluxGridLogo } from './FluxGridLogo';
import { useDemoModal } from '../context/DemoModalContext';

const siteLinks = [
  { label: 'The problem', href: '#leaks' },
  { label: 'How it works', href: '#how-it-works' },
  { label: 'FAQ', href: '#faq' },
];

const contactLinks = [
  { label: 'hello@fluxgrid.io', href: 'mailto:hello@fluxgrid.io' },
  { label: '(800) 555-1234', href: 'tel:+18005551234' },
  { label: 'Privacy', href: '#' },
  { label: 'Terms', href: '#' },
];

export function Footer() {
  const { openDemoModal } = useDemoModal();
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div className="footer-main">
          <div className="footer-brand">
            <a href="#" className="logo footer-logo">
              <FluxGridLogo size="md" variant="light" />
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
                <li>
                  <button type="button" className="footer-link-button" onClick={openDemoModal}>
                    Book demo
                  </button>
                </li>
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
          <span className="footer-bottom-tag">Electrical contractors only</span>
        </div>
      </div>
    </footer>
  );
}
