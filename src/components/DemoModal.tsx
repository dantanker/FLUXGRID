import { FormEvent, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { CalendlyInlineEmbed } from './CalendlyInlineEmbed';
import { submitLead } from '../api/submitLead';
import { type CalendlyPrefill } from '../config/calendly';
import { useDemoModal } from '../context/DemoModalContext';
import { formatUsPhoneInput, isCompleteUsPhone } from '../utils/formatUsPhone';
type DemoFormData = {
  name: string;
  shopName: string;
  phone: string;
  email: string;
  crm: string;
  crmOther: string;
  weeklyCalls: string;
};

const initialForm: DemoFormData = {
  name: '',
  shopName: '',
  phone: '',
  email: '',
  crm: '',
  crmOther: '',
  weeklyCalls: '',
};

const CRM_OPTIONS_REQUIRING_DETAILS = new Set(['Custom', 'Other']);

function needsCrmDetails(crm: string) {
  return CRM_OPTIONS_REQUIRING_DETAILS.has(crm);
}

export function DemoModal() {
  const { isDemoModalOpen, closeDemoModal } = useDemoModal();
  const [form, setForm] = useState<DemoFormData>(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [schedulingPrefill, setSchedulingPrefill] = useState<CalendlyPrefill | null>(null);

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
      setSchedulingPrefill(null);
      setForm(initialForm);
    }
  }, [isDemoModalOpen]);

  const handleChange = (field: keyof DemoFormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleCrmChange = (value: string) => {
    setForm((prev) => ({
      ...prev,
      crm: value,
      crmOther: needsCrmDetails(value) ? prev.crmOther : '',
    }));
  };

  const handlePhoneChange = (value: string) => {
    handleChange('phone', formatUsPhoneInput(value));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSubmitting || !isCompleteUsPhone(form.phone)) {
      return;
    }

    setIsSubmitting(true);

    try {
      const crm =
        needsCrmDetails(form.crm) && form.crmOther.trim()
          ? `${form.crm}: ${form.crmOther.trim()}`
          : form.crm;

      await submitLead({
        name: form.name,
        shopName: form.shopName,
        phone: form.phone,
        email: form.email,
        crm,
        weeklyCalls: form.weeklyCalls,
      });
      setSchedulingPrefill({
        name: form.name,
        email: form.email,
        phone: form.phone,
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
      <div
        className={`fluxgrid-app demo-modal-inner${submitted ? ' demo-modal-inner--scheduling' : ''}`}
        onClick={(event) => event.stopPropagation()}
      >
        <div
          className={`demo-modal-card final-box demo-box${submitted ? ' demo-modal-card--success' : ''}`}
          role="dialog"
          aria-modal="true"
          aria-labelledby="demo-modal-title"
        >
          {!submitted ? (
            <button
              type="button"
              className="demo-modal-close"
              onClick={closeDemoModal}
              aria-label="Close demo request form"
            >
              <i className="fa-solid fa-xmark" aria-hidden="true" />
            </button>
          ) : null}

          {submitted ? (
            <div className="demo-modal-success demo-modal-success--embed">
              <div className="demo-modal-embed-header">
                <button
                  type="button"
                  className="demo-modal-close demo-modal-close--embed"
                  onClick={closeDemoModal}
                  aria-label="Close scheduling"
                >
                  <i className="fa-solid fa-xmark" aria-hidden="true" />
                </button>
              </div>
              <h2 id="demo-modal-title" className="demo-modal-sr-title">
                Schedule your demo call
              </h2>
              {schedulingPrefill ? <CalendlyInlineEmbed prefill={schedulingPrefill} /> : null}
            </div>
          ) : (
            <>
              <h2 id="demo-modal-title">See a demo call</h2>
              <p>
                10 minutes on the phone is all it takes to hear the engine live, watch leads get
                qualified, and see the full ticket hit our live dispatch board.
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
                      inputMode="numeric"
                      autoComplete="tel"
                      maxLength={14}
                      disabled={isSubmitting}
                      value={form.phone}
                      onChange={(event) => handlePhoneChange(event.target.value)}
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
                      onChange={(event) => handleCrmChange(event.target.value)}
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
                      <option value="25 to 75">25 to 75</option>
                      <option value="75 to 150">75 to 150</option>
                      <option value="150+">150+</option>
                    </select>
                  </label>
                  {needsCrmDetails(form.crm) ? (
                    <label className="demo-form-full">
                      What CRM or software do you use?
                      <input
                        type="text"
                        required
                        disabled={isSubmitting}
                        value={form.crmOther}
                        onChange={(event) => handleChange('crmOther', event.target.value)}
                        placeholder="Tell us what you run today"
                      />
                    </label>
                  ) : null}
                </div>

                <button type="submit" className="cta-btn full-width" disabled={isSubmitting}>
                  {isSubmitting ? 'Submitting…' : 'Book my demo call'}
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
