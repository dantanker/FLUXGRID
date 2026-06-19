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
    <div
      className="demo-modal-backdrop vapi-interception-backdrop fixed inset-0 z-[1100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="fluxgrid-app demo-modal-inner vapi-interception-inner"
        onClick={(event) => event.stopPropagation()}
      >
        <div
          className="demo-modal-card final-box vapi-interception-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="vapi-interception-title"
        >
          <button
            type="button"
            className="demo-modal-close"
            onClick={onClose}
            aria-label="Close voice demo"
          >
            <i className="fa-solid fa-xmark" aria-hidden="true" />
          </button>

          <h2 id="vapi-interception-title">Hear FluxGrid answer the call</h2>

          <VapiVoiceDemo />
        </div>
      </div>
    </div>,
    document.body,
  );
}
