export type CalendlyPrefill = {
  name: string;
  email: string;
  phone: string;
};

const DEFAULT_CALENDLY_EMBED_URL = 'https://calendly.com/peterdankov66/30min';

export function getCalendlyEventUrl(): string {
  return import.meta.env.VITE_CALENDLY_EMBED_URL?.trim() || DEFAULT_CALENDLY_EMBED_URL;
}

export function formatPhoneForCalendlyPrefill(phone: string) {
  const digits = phone.replace(/\D/g, '');
  const location = digits.length === 10 ? `+1${digits}` : digits;

  return { digits, location };
}

export function buildCalendlyEmbedUrl({ name, email, phone }: CalendlyPrefill): string {
  const url = new URL(getCalendlyEventUrl());

  url.searchParams.set('name', name.trim());
  url.searchParams.set('email', email.trim());

  const { digits, location } = formatPhoneForCalendlyPrefill(phone);
  if (digits) {
    url.searchParams.set('location', location);
  }

  url.searchParams.set('hide_gdpr_banner', '1');
  url.searchParams.set('background_color', 'ffffff');
  url.searchParams.set('text_color', '1a1d24');
  url.searchParams.set('primary_color', '8f6f1a');

  return url.toString();
}

export function buildCalendlyWidgetPrefill({ name, email, phone }: CalendlyPrefill) {
  const { digits, location } = formatPhoneForCalendlyPrefill(phone);

  return {
    name: name.trim(),
    email: email.trim(),
    ...(digits ? { location } : {}),
  };
}
