import { DemoCtaButton } from './DemoCtaButton';

export function MobileStickyCta() {
  return (
    <div className="mobile-sticky-cta" aria-label="Quick actions">
      <a href="tel:+18005551234" className="mobile-sticky-cta__call">
        <i className="fa-solid fa-phone" /> Call
      </a>
      <DemoCtaButton className="mobile-sticky-cta__book cta-btn">Book Demo</DemoCtaButton>
    </div>
  );
}
