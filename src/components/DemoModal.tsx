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
};

const initialForm: DemoFormData = {
  name: '',
  shopName: '',
  phone: '',
};

const MODAL_COPY = {
  demo: {
    title: 'Book a demo',
    description:
      '15 minutes on Zoom is all it takes to hear the engine live, watch the leads get qualified, and watch it hit our live board.',
    submitLabel: 'Book my demo',
    submittingLabel: 'Submitting…',
    closeFormLabel: 'Close demo request form',
    scheduleTitle: 'Schedule your demo',
  },
  website: {
    title: "We'll build a custom mockup for your shop",
    description:
      "Pick a time on the calendar and we'll walk you through the design.",
    submitLabel: 'Get my mockup',
    submittingLabel: 'Submitting…',
    closeFormLabel: 'Close mockup request form',
    scheduleTitle: 'Schedule your mockup walkthrough',
  },
} as const;

export function DemoModal() {
  const { isDemoModalOpen, modalVariant, closeDemoModal } = useDemoModal();
  const copy = MODAL_COPY[modalVariant];
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

    const scrollFocusedFieldIntoView = (event: FocusEvent) => {
      const target = event.target;
      if (!(target instanceof HTMLElement) || !target.closest('.demo-form')) {
        return;
      }

      if (!window.matchMedia('(max-width: 768px)').matches) {
        return;
      }

      window.setTimeout(() => {
        target.scrollIntoView({ block: 'center', behavior: 'smooth' });
      }, 320);
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    document.addEventListener('focusin', scrollFocusedFieldIntoView);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('focusin', scrollFocusedFieldIntoView);
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
      await submitLead({
        name: form.name,
        shopName: form.shopName,
        phone: form.phone,
      });
      setSchedulingPrefill({
        name: form.name,
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
      className="demo-modal-backdrop fixed inset-0 z-[1100] flex items-start justify-center overflow-y-auto overscroll-contain bg-black/60 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-[max(0.75rem,env(safe-area-inset-top))] backdrop-blur-sm md:items-center md:overflow-hidden md:p-4"
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
              aria-label={copy.closeFormLabel}
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
                {copy.scheduleTitle}
              </h2>
              {schedulingPrefill ? <CalendlyInlineEmbed prefill={schedulingPrefill} /> : null}
            </div>
          ) : (
            <>
              <h2 id="demo-modal-title">{copy.title}</h2>
              <p>{copy.description}</p>

              <form className="demo-form" onSubmit={handleSubmit}>
                <div className="demo-form-grid demo-form-grid--compact">
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
                </div>

                <button type="submit" className="cta-btn full-width" disabled={isSubmitting}>
                  {isSubmitting ? copy.submittingLabel : copy.submitLabel}
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
