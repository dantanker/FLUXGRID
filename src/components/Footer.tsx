import { FluxGridLogo } from './FluxGridLogo';

const footerLinks = {
  product: [
    { label: 'The Problem', href: '#leaks' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Integrations', href: '#integrations' },
    { label: 'FAQ', href: '#faq' },
  ],
  company: [
    { label: 'Book a Demo', href: '#demo' },
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
    { label: 'Contact', href: 'mailto:hello@fluxgrid.io' },
  ],
};

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div className="footer-top">
          <div className="footer-brand">
            <a href="#" className="logo footer-logo">
              <FluxGridLogo size="md" variant="dark" />
            </a>
            <p>
              The 24/7 Intelligent Dispatch Engine built for electrical contractors. Never miss
              another emergency call while you&apos;re in the field.
            </p>
            <div className="footer-status">
              <span className="footer-status-dot" />
              Engine online · 24/7 monitoring
            </div>
          </div>

          <div className="footer-links-grid">
            <div className="footer-col">
              <h4>Product</h4>
              <ul>
                {footerLinks.product.map((link) => (
                  <li key={link.label}>
                    <a href={link.href}>{link.label}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer-col">
              <h4>Company</h4>
              <ul>
                {footerLinks.company.map((link) => (
                  <li key={link.label}>
                    <a href={link.href}>{link.label}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer-col footer-cta-col">
              <h4>Ready to deploy?</h4>
              <p>Get your dispatch engine live in under 7 business days.</p>
              <a href="#demo" className="cta-btn footer-cta">
                Schedule Demo <i className="fa-solid fa-arrow-right" />
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span>&copy; {year} FluxGrid. All rights reserved.</span>
          <span className="footer-bottom-tag">Built for electrical shop owners</span>
        </div>
      </div>
    </footer>
  );
}
