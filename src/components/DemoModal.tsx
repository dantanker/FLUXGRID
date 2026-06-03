import { FormEvent, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { submitLead } from '../api/submitLead';
import { useDemoModal } from '../context/DemoModalContext';
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

export function DemoModal() {
  const { isDemoModalOpen, closeDemoModal } = useDemoModal();
  const [form, setForm] = useState<DemoFormData>(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!isDemoModalOpen) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeDemoModal();
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isDemoModalOpen, closeDemoModal]);

  useEffect(() => {
    if (!isDemoModalOpen) {
      setSubmitted(false);
      setIsSubmitting(false);
      setForm(initialForm);
    }
  }, [isDemoModalOpen]);

  const handleChange = (field: keyof DemoFormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    try {
      await submitLead({
        name: form.name,
        shopName: form.shopName,
        phone: form.phone,
        email: form.email,
        crm: form.crm,
        weeklyCalls: form.weeklyCalls,
      });
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isDemoModalOpen) {
    return null;
  }

  return createPortal(
    <div
      className="demo-modal-backdrop fixed inset-0 z-[1100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      onClick={closeDemoModal}
      role="presentation"
    >
      <div className="fluxgrid-app demo-modal-inner" onClick={(event) => event.stopPropagation()}>
        <div
          className={`demo-modal-card final-box demo-box${submitted ? ' demo-modal-card--success' : ''}`}
          role="dialog"
          aria-modal="true"
          aria-labelledby="demo-modal-title"
        >
          <button
            type="button"
            className="demo-modal-close"
            onClick={closeDemoModal}
            aria-label="Close demo request form"
          >
            <i className="fa-solid fa-xmark" aria-hidden="true" />
          </button>

          {submitted ? (
            <div className="demo-modal-success">
              <h2 id="demo-modal-title">Let&apos;s Lock In Your 10-Minute Walkthrough</h2>
              <p>
                Select a time below that works best for you. We&apos;ll simulate a live emergency
                call hitting your CRM.
              </p>
              <div className="demo-scheduling-widget">
                <iframe
                  src="https://calendly.com"
                  width="100%"
                  height="500px"
                  style={{ border: 0 }}
                />
              </div>
            </div>
          ) : (
            <>
              <h2 id="demo-modal-title">See FluxGrid in Action</h2>
              <p>
                A 10-minute, zero-pressure walkthrough showing exactly how we intercept leads and
                drop them into your CRM.
              </p>

              <form className="demo-form" onSubmit={handleSubmit}>
                <div className="demo-form-grid">
                  <label>
                    Your name
                    <input
                      type="text"
                      required
                      disabled={isSubmitting}
                      value={form.name}
                      onChange={(event) => handleChange('name', event.target.value)}
                      placeholder="Mike Reynolds"
                    />
                  </label>
                  <label>
                    Shop name
                    <input
                      type="text"
                      required
                      disabled={isSubmitting}
                      value={form.shopName}
                      onChange={(event) => handleChange('shopName', event.target.value)}
                      placeholder="Riverside Electric"
                    />
                  </label>
                  <label>
                    Phone
                    <input
                      type="tel"
                      required
                      disabled={isSubmitting}
                      value={form.phone}
                      onChange={(event) => handleChange('phone', event.target.value)}
                      placeholder="(555) 123-4567"
                    />
                  </label>
                  <label>
                    Email
                    <input
                      type="email"
                      required
                      disabled={isSubmitting}
                      value={form.email}
                      onChange={(event) => handleChange('email', event.target.value)}
                      placeholder="you@yourshop.com"
                    />
                  </label>
                  <label>
                    CRM / software
                    <select
                      required
                      disabled={isSubmitting}
                      value={form.crm}
                      onChange={(event) => handleChange('crm', event.target.value)}
                    >
                      <option value="">Select one</option>
                      <option value="ServiceTitan">ServiceTitan</option>
                      <option value="Jobber">Jobber</option>
                      <option value="Housecall Pro">Housecall Pro</option>
                      <option value="Custom">Custom</option>
                      <option value="Other">Other</option>
                    </select>
                  </label>
                  <label>
                    Weekly inbound calls (approx.)
                    <select
                      required
                      disabled={isSubmitting}
                      value={form.weeklyCalls}
                      onChange={(event) => handleChange('weeklyCalls', event.target.value)}
                    >
                      <option value="">Select range</option>
                      <option value="Under 25">Under 25</option>
                      <option value="25–75">25–75</option>
                      <option value="75–150">75–150</option>
                      <option value="150+">150+</option>
                    </select>
                  </label>
                </div>

                <button type="submit" className="cta-btn full-width" disabled={isSubmitting}>
                  {isSubmitting ? 'Connecting...' : 'Request Live Walkthrough 📅'}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
}
