import { FormEvent, useState } from 'react';

type DemoFormData = {
  name: string;
  shopName: string;
  phone: string;
  email: string;
  crm: string;
  weeklyCalls: string;
};

const initialForm: DemoFormData = {
  name: '',
  shopName: '',
  phone: '',
  email: '',
  crm: '',
  weeklyCalls: '',
};

export function DemoSection() {
  const [form, setForm] = useState<DemoFormData>(initialForm);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (field: keyof DemoFormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const subject = encodeURIComponent('FluxGrid Demo Request');
    const body = encodeURIComponent(
      `Name: ${form.name}\nShop: ${form.shopName}\nPhone: ${form.phone}\nEmail: ${form.email}\nCRM: ${form.crm}\nWeekly calls: ${form.weeklyCalls}`,
    );

    window.location.href = `mailto:hello@fluxgrid.io?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="final-box demo-box" id="demo">
        <h2>We&apos;ll be in touch</h2>
        <p>
          Thanks, {form.name || 'there'}. Expect a call or email within 1 business day to schedule
          your walkthrough. If your email app didn&apos;t open, reach us at{' '}
          <a href="mailto:hello@fluxgrid.io">hello@fluxgrid.io</a>.
        </p>
        <a href="tel:+18005551234" className="cta-btn">
          Or call (800) 555-1234 <i className="fa-solid fa-phone" />
        </a>
      </div>
    );
  }

  return (
    <div className="final-box demo-box" id="demo">
      <h2>See a Real Emergency Call — Live</h2>
      <p>
        10 minutes. We&apos;ll walk through a sample after-hours call — sparking panel, no power,
        the works — and show exactly how it hits your CRM. No pressure, no 45-minute sales deck.
      </p>

      <form className="demo-form" onSubmit={handleSubmit}>
        <div className="demo-form-grid">
          <label>
            Your name
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder="Mike Reynolds"
            />
          </label>
          <label>
            Shop name
            <input
              type="text"
              required
              value={form.shopName}
              onChange={(e) => handleChange('shopName', e.target.value)}
              placeholder="Riverside Electric"
            />
          </label>
          <label>
            Phone
            <input
              type="tel"
              required
              value={form.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              placeholder="(555) 123-4567"
            />
          </label>
          <label>
            Email
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => handleChange('email', e.target.value)}
              placeholder="you@yourshop.com"
            />
          </label>
          <label>
            CRM / software
            <select
              required
              value={form.crm}
              onChange={(e) => handleChange('crm', e.target.value)}
            >
              <option value="">Select one</option>
              <option value="ServiceTitan">ServiceTitan</option>
              <option value="Jobber">Jobber</option>
              <option value="Housecall Pro">Housecall Pro</option>
              <option value="Other">Other / Custom</option>
            </select>
          </label>
          <label>
            Weekly inbound calls (approx.)
            <select
              required
              value={form.weeklyCalls}
              onChange={(e) => handleChange('weeklyCalls', e.target.value)}
            >
              <option value="">Select range</option>
              <option value="Under 25">Under 25</option>
              <option value="25–75">25–75</option>
              <option value="75–150">75–150</option>
              <option value="150+">150+</option>
            </select>
          </label>
        </div>

        <button type="submit" className="cta-btn full-width">
          Request Live Walkthrough <i className="fa-solid fa-calendar" />
        </button>
      </form>
    </div>
  );
}
