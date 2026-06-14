import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { VapiVoiceDemo } from './VapiVoiceDemo';

type VapiInterceptionModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function VapiInterceptionModal({ isOpen, onClose }: VapiInterceptionModalProps) {
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return createPortal(
    <div className="vapi-interception-backdrop" role="presentation">
      <div
        className="fluxgrid-app vapi-interception-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="vapi-interception-title"
      >
        <button
          type="button"
          className="vapi-interception-close"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>

        <h2 id="vapi-interception-title" className="vapi-interception-title">
          Hear FluxGrid answer the call
        </h2>

        <VapiVoiceDemo />
      </div>
    </div>,
    document.body,
  );
}
