const PAUSE_OTHERS = 'fluxgrid:pause-other-videos';

type PauseDetail = { ownerId: string };

/** Tell every other SiteVideo to pause / close so only one plays at a time. */
export function claimVideoPlayback(ownerId: string) {
  if (typeof window === 'undefined') {
    return;
  }
  window.dispatchEvent(new CustomEvent<PauseDetail>(PAUSE_OTHERS, { detail: { ownerId } }));
}

export function subscribePauseOthers(ownerId: string, onPause: () => void) {
  const handler = (event: Event) => {
    const detail = (event as CustomEvent<PauseDetail>).detail;
    if (!detail || detail.ownerId === ownerId) {
      return;
    }
    onPause();
  };

  window.addEventListener(PAUSE_OTHERS, handler);
  return () => window.removeEventListener(PAUSE_OTHERS, handler);
}
