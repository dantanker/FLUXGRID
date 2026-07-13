import { useEffect, useRef } from 'react';
import {
  buildCalendlyEmbedUrl,
  buildCalendlyWidgetPrefill,
  type CalendlyPrefill,
} from '../config/calendly';

declare global {
  interface Window {
    Calendly?: {
      initInlineWidget: (options: {
        url: string;
        parentElement: HTMLElement;
        resize?: boolean;
        prefill?: {
          name?: string;
          email?: string;
          location?: string;
          customAnswers?: Record<string, string>;
        };
      }) => void;
    };
  }
}

let calendlyScriptPromise: Promise<void> | null = null;

function loadCalendlyScript() {
  if (window.Calendly) {
    return Promise.resolve();
  }

  if (!calendlyScriptPromise) {
    calendlyScriptPromise = new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://assets.calendly.com/assets/external/widget.js';
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('Failed to load Calendly embed'));
      document.head.appendChild(script);
    });
  }

  return calendlyScriptPromise;
}

type CalendlyInlineEmbedProps = {
  prefill: CalendlyPrefill;
};

export function CalendlyInlineEmbed({ prefill }: CalendlyInlineEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;

    loadCalendlyScript()
      .then(() => {
        if (cancelled || !containerRef.current || !window.Calendly) {
          return;
        }

        containerRef.current.innerHTML = '';

        window.Calendly.initInlineWidget({
          url: buildCalendlyEmbedUrl(prefill),
          parentElement: containerRef.current,
          prefill: buildCalendlyWidgetPrefill(prefill),
          resize: false,
        });
      })
      .catch(() => {
        if (cancelled || !containerRef.current) {
          return;
        }

        containerRef.current.innerHTML = '';
        const iframe = document.createElement('iframe');
        iframe.title = 'Schedule your demo';
        iframe.src = buildCalendlyEmbedUrl(prefill);
        iframe.width = '100%';
        iframe.height = '100%';
        iframe.style.border = '0';
        iframe.style.display = 'block';
        containerRef.current.appendChild(iframe);
      });

    return () => {
      cancelled = true;
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, [prefill]);

  return (
    <div
      ref={containerRef}
      className="demo-scheduling-widget demo-scheduling-widget--inline"
      aria-label="Schedule your demo"
    />
  );
}
