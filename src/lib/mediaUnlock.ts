const UNLOCKED_KEY = 'fluxgrid-media-unlocked';
const GESTURE_AT_KEY = 'fluxgrid-media-gesture-at';
const UNLOCKED_EVENT = 'fluxgrid:media-unlocked';

let silentAudio: HTMLAudioElement | null = null;
let tonePlayed = false;

function playSilentUnlockTone() {
  if (tonePlayed) {
    return;
  }
  tonePlayed = true;

  try {
    if (!silentAudio) {
      silentAudio = new Audio(
        'data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA',
      );
      silentAudio.preload = 'auto';
    }
    silentAudio.volume = 0.01;
    void silentAudio
      .play()
      .then(() => {
        silentAudio?.pause();
      })
      .catch(() => undefined);
  } catch {
    // Ignore Audio construction failures.
  }

  try {
    const AudioCtx =
      window.AudioContext ||
      (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (AudioCtx) {
      const ctx = new AudioCtx();
      void ctx
        .resume()
        .then(() => ctx.close())
        .catch(() => undefined);
    }
  } catch {
    // Ignore AudioContext failures.
  }
}

export function markMediaUnlocked() {
  const wasUnlocked = isMediaUnlocked();

  try {
    sessionStorage.setItem(UNLOCKED_KEY, '1');
    sessionStorage.setItem(GESTURE_AT_KEY, String(Date.now()));
  } catch {
    // Ignore storage failures (private mode, etc.).
  }

  playSilentUnlockTone();

  if (typeof window !== 'undefined' && !wasUnlocked) {
    window.dispatchEvent(new Event(UNLOCKED_EVENT));
  } else if (typeof window !== 'undefined') {
    // Still notify listeners so a newly mounted hero can unmute.
    window.dispatchEvent(new Event(UNLOCKED_EVENT));
  }
}

export function isMediaUnlocked() {
  try {
    return sessionStorage.getItem(UNLOCKED_KEY) === '1';
  } catch {
    return false;
  }
}

/** True when a user gesture happened recently (helps unmuted play after route changes). */
export function hasRecentMediaGesture(withinMs = 4000) {
  try {
    const raw = sessionStorage.getItem(GESTURE_AT_KEY);
    if (!raw) {
      return false;
    }
    const at = Number(raw);
    return Number.isFinite(at) && Date.now() - at <= withinMs;
  } catch {
    return false;
  }
}

/** Clicks/keys on the site unlock unmuted playback for page entry. */
export function armMediaUnlockOnGesture() {
  if (typeof window === 'undefined') {
    return () => undefined;
  }

  const unlock = () => {
    markMediaUnlocked();
  };

  window.addEventListener('pointerdown', unlock, true);
  window.addEventListener('keydown', unlock, true);

  return () => {
    window.removeEventListener('pointerdown', unlock, true);
    window.removeEventListener('keydown', unlock, true);
  };
}

export function subscribeMediaUnlocked(onUnlock: () => void) {
  if (typeof window === 'undefined') {
    return () => undefined;
  }

  window.addEventListener(UNLOCKED_EVENT, onUnlock);
  return () => window.removeEventListener(UNLOCKED_EVENT, onUnlock);
}
