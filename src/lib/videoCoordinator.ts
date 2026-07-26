const PAUSE_OTHERS = 'fluxgrid:pause-other-videos';
const PLAYBACK_RELEASED = 'fluxgrid:video-playback-released';

type PauseDetail = { ownerId: string };
type ReleaseDetail = { ownerId: string };

let activeOwnerId: string | null = null;

/** Tell every other SiteVideo to pause / close so only one plays at a time. */
export function claimVideoPlayback(ownerId: string) {
  if (typeof window === 'undefined') {
    return;
  }
  activeOwnerId = ownerId;
  window.dispatchEvent(new CustomEvent<PauseDetail>(PAUSE_OTHERS, { detail: { ownerId } }));
}

/** Caller stopped — autoplay heroes can resume if nothing else is active. */
export function releaseVideoPlayback(ownerId: string) {
  if (typeof window === 'undefined') {
    return;
  }
  if (activeOwnerId !== ownerId) {
    return;
  }
  activeOwnerId = null;
  window.dispatchEvent(
    new CustomEvent<ReleaseDetail>(PLAYBACK_RELEASED, { detail: { ownerId } }),
  );
}

export function getActiveVideoOwner() {
  return activeOwnerId;
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

export function subscribePlaybackReleased(ownerId: string, onRelease: (fromId: string) => void) {
  const handler = (event: Event) => {
    const detail = (event as CustomEvent<ReleaseDetail>).detail;
    if (!detail || detail.ownerId === ownerId) {
      return;
    }
    onRelease(detail.ownerId);
  };

  window.addEventListener(PLAYBACK_RELEASED, handler);
  return () => window.removeEventListener(PLAYBACK_RELEASED, handler);
}
