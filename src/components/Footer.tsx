import { Link, useLocation } from 'react-router-dom';
import { FluxGridLogo } from './FluxGridLogo';

const contactLinks = [
  { label: 'fluxgridai@gmail.com', href: 'mailto:fluxgridai@gmail.com' },
  { label: '(224) 628-0040', href: 'tel:+12246280040', className: 'footer-phone' },
];

export function Footer() {
  const year = new Date().getFullYear();
  const { pathname } = useLocation();
  const isWebsitePage = pathname.startsWith('/websites');

  const crossLink = isWebsitePage
    ? { label: 'Get Your Digital Receptionist', to: '/' }
    : { label: 'Get Your Custom Website', to: '/websites' };

  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div className="footer-main">
          <div className="footer-brand">
            <Link to="/" className="logo footer-logo">
              <FluxGridLogo size="sm" variant="light" />
            </Link>
            <p className="footer-brand-tagline">
              {isWebsitePage
                ? "Stop losing jobs to competition. We'll build you a professional site that wins jobs and makes you the obvious choice."
                : "Our 24/7 digital receptionist handles the noise, qualifies your leads, and books them straight into your calendar while you're on the job."}
            </p>
          </div>

          <nav className="footer-nav" aria-label="Footer">
            <div className="footer-nav-col">
              <span className="footer-nav-label">Site</span>
              <ul>
                <li>
                  <Link to={crossLink.to}>{crossLink.label}</Link>
                </li>
              </ul>
            </div>

            <div className="footer-nav-col">
              <span className="footer-nav-label">Contact</span>
              <ul>
                {contactLinks.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className={link.className}>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </div>

        <div className="footer-bottom">
          <span>&copy; {year} FluxGrid. All rights reserved.</span>
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
