import { Mic, PhoneCall, PhoneOff } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import Vapi from '@vapi-ai/web';
import { isVapiConfigured, vapiAssistantId, vapiPublicKey } from '../config/vapi';

type CallStatus = 'idle' | 'connecting' | 'live' | 'ended' | 'error';

export function VapiVoiceDemo() {
  const vapiRef = useRef<Vapi | null>(null);
  const statusRef = useRef<CallStatus>('idle');
  const [status, setStatus] = useState<CallStatus>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isEnding, setIsEnding] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [volumeLevel, setVolumeLevel] = useState(0);

  const updateStatus = useCallback((next: CallStatus) => {
    statusRef.current = next;
    setStatus(next);
  }, []);

  useEffect(() => {
    if (!isVapiConfigured) {
      return;
    }

    const vapi = new Vapi(vapiPublicKey);
    vapiRef.current = vapi;

    vapi.on('call-start', () => {
      setIsEnding(false);
      updateStatus('live');
      setErrorMessage(null);
    });

    vapi.on('call-end', () => {
      setIsEnding(false);
      setIsSpeaking(false);
      setVolumeLevel(0);
      updateStatus('ended');
    });

    vapi.on('speech-start', () => setIsSpeaking(true));
    vapi.on('speech-end', () => setIsSpeaking(false));
    vapi.on('volume-level', (level) => setVolumeLevel(level));

    vapi.on('call-start-failed', (event) => {
      setIsEnding(false);
      setIsSpeaking(false);
      setVolumeLevel(0);
      updateStatus('error');
      setErrorMessage(event.error || 'Could not start the demo.');
    });

    vapi.on('error', (error) => {
      setIsEnding(false);
      setIsSpeaking(false);
      setVolumeLevel(0);
      const message =
        error instanceof Error
          ? error.message
          : typeof error?.message === 'string'
            ? error.message
            : 'Something went wrong.';
      updateStatus('error');
      setErrorMessage(message);
    });

    return () => {
      void vapi.stop().catch(() => undefined);
      vapiRef.current = null;
    };
  }, [updateStatus]);

  const startCall = async () => {
    const vapi = vapiRef.current;
    if (!vapi || statusRef.current === 'connecting' || statusRef.current === 'live') {
      return;
    }

    updateStatus('connecting');
    setErrorMessage(null);
    setIsEnding(false);
    setIsSpeaking(false);
    setVolumeLevel(0);

    try {
      await vapi.start(vapiAssistantId);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Could not start the demo.';
      updateStatus('error');
      setErrorMessage(message);
    }
  };

  const hangUp = async () => {
    const vapi = vapiRef.current;
    if (!vapi || isEnding) {
      return;
    }

    if (statusRef.current !== 'connecting' && statusRef.current !== 'live') {
      return;
    }

    setIsEnding(true);
    setErrorMessage(null);

    try {
      vapi.end();
    } catch {
      // Fall through to stop().
    }

    try {
      await vapi.stop();
    } catch {
      // Ensure UI still resets if the SDK already tore down the call.
    }

    setIsEnding(false);
    setIsSpeaking(false);
    setVolumeLevel(0);
    updateStatus('ended');
  };

  const statusText =
    status === 'connecting'
      ? 'Connecting…'
      : status === 'live'
        ? isSpeaking
          ? 'FluxGrid is speaking'
          : 'Listening…'
        : status === 'ended'
          ? 'Call ended'
          : status === 'error'
            ? 'Demo unavailable'
            : 'Tap start to begin';

  if (!isVapiConfigured) {
    return (
      <p className="vapi-demo-note vapi-demo-note--error">
        Voice demo is not configured yet.
      </p>
    );
  }

  const onCall = status === 'connecting' || status === 'live';
  const micActive = status === 'live';
  const micPulse = micActive && (isSpeaking || volumeLevel > 0.08);

  return (
    <div className="vapi-demo">
      <div className={`vapi-demo-stage${micActive ? ' is-live' : ''}`}>
        <div
          className={`vapi-demo-mic${micActive ? ' is-live' : ''}${micPulse ? ' is-active' : ''}`}
          style={{ transform: `scale(${1 + volumeLevel * 0.24})` }}
          aria-hidden="true"
        >
          <Mic size={26} strokeWidth={2.1} />
        </div>
      </div>

      <p
        className={`vapi-demo-status${status === 'live' ? ' vapi-demo-status--live' : ''}${status === 'idle' ? ' vapi-demo-status--idle' : ''}`}
        aria-live="polite"
      >
        {status === 'live' ? <span className="vapi-demo-status__dot" aria-hidden="true" /> : null}
        {statusText}
      </p>

      {errorMessage ? <p className="vapi-demo-note vapi-demo-note--error">{errorMessage}</p> : null}

      <div className="vapi-demo-actions">
        {!onCall ? (
          <button
            type="button"
            className="cta-btn full-width"
            onClick={() => void startCall()}
          >
            <PhoneCall size={17} strokeWidth={2.2} aria-hidden="true" />
            {status === 'ended' || status === 'error' ? 'Try again' : 'Start demo'}
          </button>
        ) : (
          <button
            type="button"
            className="cta-btn cta-btn--secondary full-width"
            onClick={() => void hangUp()}
            disabled={isEnding}
          >
            <PhoneOff size={17} strokeWidth={2.2} aria-hidden="true" />
            {isEnding ? 'Hanging up…' : 'Hang up'}
          </button>
        )}
      </div>
    </div>
  );
}
