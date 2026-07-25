import { useEffect, useId, useRef, useState } from 'react';
import { createPortal, flushSync } from 'react-dom';
import { useLocation } from 'react-router-dom';
import { markMediaUnlocked, subscribeMediaUnlocked } from '../lib/mediaUnlock';
import { claimVideoPlayback, subscribePauseOthers } from '../lib/videoCoordinator';

type SiteVideoProps = {
  src: string;
  poster: string;
  label: string;
  className?: string;
  /** Hero: autoplay + loop with sound until the user pauses. */
  autoplay?: boolean;
  withSound?: boolean;
};

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) {
    return '0:00';
  }

  const whole = Math.floor(seconds);
  const mins = Math.floor(whole / 60);
  const secs = whole % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

function useIsMobileVideo() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(max-width: 992px)');
    const update = () => setIsMobile(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  return isMobile;
}

function PlayIcon({ size = 18 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
      <path d="M8 5.5v13l11-6.5-11-6.5z" fill="currentColor" />
    </svg>
  );
}

function PauseIcon({ size = 18 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
      <rect x="6" y="5" width="4" height="14" rx="1" fill="currentColor" />
      <rect x="14" y="5" width="4" height="14" rx="1" fill="currentColor" />
    </svg>
  );
}

function FullscreenIcon({ size = 18 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" fill="none">
      <path
        d="M8 3H4v4M16 3h4v4M8 21H4v-4M16 21h4v-4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function SiteVideo({
  src,
  poster,
  label,
  className,
  autoplay = false,
  withSound = false,
}: SiteVideoProps) {
  const ownerId = useId();
  const { pathname } = useLocation();
  const spotRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<HTMLVideoElement>(null);
  const openRef = useRef(false);
  const resumeAtRef = useRef(0);
  /** Only true after the user presses pause — never set by autoplay / browser policy. */
  const userPausedRef = useRef(false);
  const isMobile = useIsMobileVideo();
  const [open, setOpen] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [previewPlaying, setPreviewPlaying] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  openRef.current = open;

  const pauseSelf = () => {
    const preview = previewRef.current;
    if (preview) {
      if (Number.isFinite(preview.currentTime)) {
        resumeAtRef.current = preview.currentTime;
      }
      if (!preview.paused) {
        preview.pause();
      }
    }

    const player = playerRef.current;
    if (player) {
      if (Number.isFinite(player.currentTime)) {
        resumeAtRef.current = player.currentTime;
      }
      if (!player.paused) {
        player.pause();
      }
    }

    // Another video took over — stay paused until the user presses play again.
    userPausedRef.current = true;

    if (openRef.current) {
      setOpen(false);
      setPlaying(false);
    }
  };

  useEffect(() => subscribePauseOthers(ownerId, pauseSelf), [ownerId]);

  // Manual (full package): start off — play/pause listeners only.
  useEffect(() => {
    if (autoplay) {
      return;
    }

    const video = previewRef.current;
    if (!video) {
      return;
    }

    userPausedRef.current = true;
    video.loop = true;
    video.pause();

    const onPlay = () => setPreviewPlaying(true);
    const onPause = () => setPreviewPlaying(false);

    video.addEventListener('play', onPlay);
    video.addEventListener('pause', onPause);
    setPreviewPlaying(!video.paused);

    return () => {
      video.removeEventListener('play', onPlay);
      video.removeEventListener('pause', onPause);
    };
  }, [autoplay, src, pathname]);

  // Hero: start video + sound on page entry; keep going until the user pauses.
  useEffect(() => {
    if (!autoplay) {
      return;
    }

    const video = previewRef.current;
    if (!video) {
      return;
    }

    let cancelled = false;
    userPausedRef.current = false;

    video.loop = true;
    video.playsInline = true;
    video.setAttribute('playsinline', '');
    video.setAttribute('webkit-playsinline', '');

    const onPlay = () => setPreviewPlaying(true);
    const onPause = () => setPreviewPlaying(false);

    video.addEventListener('play', onPlay);
    video.addEventListener('pause', onPause);

    const playWithSound = async () => {
      if (cancelled || openRef.current || userPausedRef.current) {
        return false;
      }

      claimVideoPlayback(ownerId);
      video.loop = true;

      if (withSound) {
        video.muted = false;
        video.volume = 1;
        try {
          await video.play();
          markMediaUnlocked();
          return true;
        } catch {
          // Keep trying — browsers may allow it after a gesture.
        }
      }

      // Last resort so the picture still moves; sound attaches on next gesture.
      video.muted = true;
      try {
        await video.play();
      } catch {
        return false;
      }
      return false;
    };

    const forceSound = () => {
      if (cancelled || userPausedRef.current || openRef.current || !withSound) {
        return;
      }
      video.muted = false;
      video.volume = 1;
      markMediaUnlocked();
      if (video.paused) {
        claimVideoPlayback(ownerId);
        void video.play().catch(() => undefined);
      }
    };

    void playWithSound();

    const onReady = () => {
      void playWithSound();
    };
    video.addEventListener('loadeddata', onReady);
    video.addEventListener('canplay', onReady);

    const spot = spotRef.current;
    let observer: IntersectionObserver | undefined;
    if (spot && typeof IntersectionObserver !== 'undefined') {
      observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((entry) => entry.isIntersecting)) {
            void playWithSound();
          }
        },
        { threshold: 0.15 },
      );
      observer.observe(spot);
    }

    const unsubscribeUnlock = subscribeMediaUnlocked(forceSound);

    // First interaction on the site = turn sound on (browser policy fallback).
    const onGesture = () => {
      forceSound();
    };
    window.addEventListener('pointerdown', onGesture, true);
    window.addEventListener('keydown', onGesture, true);
    window.addEventListener('touchstart', onGesture, true);

    const retries = [0, 100, 250, 500, 1000, 2000].map((ms) =>
      window.setTimeout(() => {
        void playWithSound();
      }, ms),
    );

    return () => {
      cancelled = true;
      retries.forEach((id) => window.clearTimeout(id));
      observer?.disconnect();
      unsubscribeUnlock();
      window.removeEventListener('pointerdown', onGesture, true);
      window.removeEventListener('keydown', onGesture, true);
      window.removeEventListener('touchstart', onGesture, true);
      video.removeEventListener('loadeddata', onReady);
      video.removeEventListener('canplay', onReady);
      video.removeEventListener('play', onPlay);
      video.removeEventListener('pause', onPause);
    };
  }, [autoplay, withSound, src, ownerId, pathname]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  useEffect(() => {
    if (!open) {
      setPlaying(false);
      setCurrentTime(0);
      return;
    }

    const video = playerRef.current;
    if (!video) {
      return;
    }

    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    const onTimeUpdate = () => setCurrentTime(video.currentTime);
    const onLoaded = () => setDuration(video.duration || 0);
    const onDurationChange = () => setDuration(video.duration || 0);

    video.addEventListener('play', onPlay);
    video.addEventListener('pause', onPause);
    video.addEventListener('timeupdate', onTimeUpdate);
    video.addEventListener('loadedmetadata', onLoaded);
    video.addEventListener('durationchange', onDurationChange);

    return () => {
      video.removeEventListener('play', onPlay);
      video.removeEventListener('pause', onPause);
      video.removeEventListener('timeupdate', onTimeUpdate);
      video.removeEventListener('loadedmetadata', onLoaded);
      video.removeEventListener('durationchange', onDurationChange);
    };
  }, [open, src]);

  const closeLightbox = () => {
    const video = playerRef.current;
    let leaveAt = resumeAtRef.current;

    if (video) {
      if (Number.isFinite(video.currentTime)) {
        leaveAt = video.currentTime;
        resumeAtRef.current = leaveAt;
      }
      video.pause();
    }
    setOpen(false);

    const preview = previewRef.current;
    if (!preview || userPausedRef.current) {
      return;
    }

    try {
      if (leaveAt > 0) {
        preview.currentTime = leaveAt;
      }
    } catch {
      // ignore
    }

    claimVideoPlayback(ownerId);
    preview.loop = true;
    preview.muted = false;
    preview.volume = 1;
    void preview.play().catch(() => undefined);
  };

  const openPlayer = async () => {
    // Opening expand counts as choosing this video — pause others and allow resume after close.
    userPausedRef.current = false;
    claimVideoPlayback(ownerId);

    const preview = previewRef.current;
    const startAt =
      preview && Number.isFinite(preview.currentTime) && preview.currentTime > 0
        ? preview.currentTime
        : resumeAtRef.current;

    resumeAtRef.current = startAt;
    preview?.pause();

    flushSync(() => {
      setOpen(true);
    });

    const video = playerRef.current;
    if (!video) {
      return;
    }

    const seekToResume = () => {
      if (!(startAt > 0.05)) {
        return;
      }
      try {
        video.currentTime = startAt;
        setCurrentTime(startAt);
      } catch {
        // ignore
      }
    };

    try {
      video.muted = false;
      video.volume = 1;
      if (video.readyState >= 1) {
        seekToResume();
      } else {
        video.addEventListener('loadedmetadata', seekToResume, { once: true });
      }
      await video.play();
      seekToResume();
    } catch {
      setPlaying(false);
    }
  };

  const togglePreviewPlayback = async () => {
    const video = previewRef.current;
    if (!video) {
      return;
    }

    if (video.paused) {
      // Manual play — always with sound.
      userPausedRef.current = false;
      claimVideoPlayback(ownerId);
      video.loop = true;
      video.muted = false;
      video.volume = 1;
      markMediaUnlocked();
      try {
        await video.play();
      } catch {
        video.muted = true;
        await video.play().catch(() => undefined);
      }
      return;
    }

    // Manual pause — stays paused until they press play again.
    userPausedRef.current = true;
    resumeAtRef.current = video.currentTime;
    video.pause();
  };

  const togglePlayback = async () => {
    const video = playerRef.current;
    if (!video) {
      return;
    }

    if (video.paused) {
      claimVideoPlayback(ownerId);
      try {
        video.muted = false;
        await video.play();
      } catch {
        setPlaying(false);
      }
      return;
    }

    video.pause();
  };

  const seekTo = (value: number) => {
    const video = playerRef.current;
    if (!video || !Number.isFinite(value)) {
      return;
    }

    try {
      video.currentTime = value;
      setCurrentTime(value);
    } catch {
      // ignore
    }
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;
  const showHoverChrome = hovered || !previewPlaying;

  return (
    <>
      <div
        ref={spotRef}
        className={[
          'video-spot',
          autoplay ? 'video-spot--autoplay' : 'video-spot--manual',
          showHoverChrome ? 'is-hovering' : '',
          !previewPlaying ? 'is-paused' : '',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <video
          ref={previewRef}
          className="video-spot__poster video-spot__media"
          src={src}
          poster={poster}
          aria-label={label}
          autoPlay={autoplay}
          loop
          playsInline
          preload={autoplay ? 'auto' : 'metadata'}
        />

        <button
          type="button"
          className="video-spot__center-btn"
          onClick={() => {
            void togglePreviewPlayback();
          }}
          aria-label={previewPlaying ? `Pause ${label}` : `Play ${label}`}
        >
          {previewPlaying ? <PauseIcon size={28} /> : <PlayIcon size={28} />}
        </button>

        <button
          type="button"
          className="video-spot__side-btn"
          onClick={() => {
            void openPlayer();
          }}
          aria-label={`Expand ${label}`}
        >
          <FullscreenIcon size={18} />
        </button>
      </div>

      {open
        ? createPortal(
            <div
              className={`video-lightbox${isMobile ? ' video-lightbox--mobile' : ''}`}
              role="dialog"
              aria-modal="true"
              aria-label={label}
            >
              <button
                type="button"
                className="video-lightbox__backdrop"
                aria-label="Close video"
                onClick={closeLightbox}
              />

              <div className="video-lightbox__panel">
                <button
                  type="button"
                  className="video-lightbox__close"
                  aria-label="Close video"
                  onClick={closeLightbox}
                >
                  <span aria-hidden="true">×</span>
                </button>

                <div className="video-lightbox__stage">
                  <video
                    ref={playerRef}
                    className="video-lightbox__media"
                    poster={poster}
                    aria-label={label}
                    controls={isMobile}
                    playsInline
                    preload="metadata"
                    controlsList={isMobile ? undefined : 'nodownload'}
                  >
                    <source src={src} type="video/mp4" />
                  </video>

                  {!isMobile ? (
                    <button
                      type="button"
                      className={`video-lightbox__play${playing ? ' is-playing' : ''}`}
                      onClick={togglePlayback}
                      aria-label={playing ? `Pause ${label}` : `Play ${label}`}
                    >
                      <span className="video-lightbox__play-icon" aria-hidden="true">
                        {playing ? <PauseIcon size={26} /> : <PlayIcon size={26} />}
                      </span>
                    </button>
                  ) : null}
                </div>

                {!isMobile ? (
                  <div className="video-lightbox__controls">
                    <button
                      type="button"
                      className="video-lightbox__ctrl-btn"
                      onClick={togglePlayback}
                      aria-label={playing ? 'Pause' : 'Play'}
                    >
                      {playing ? <PauseIcon /> : <PlayIcon />}
                    </button>

                    <span className="video-lightbox__time">{formatTime(currentTime)}</span>

                    <label className="video-lightbox__scrub">
                      <span className="sr-only">Seek video</span>
                      <input
                        type="range"
                        min={0}
                        max={duration || 0}
                        step={0.1}
                        value={currentTime}
                        onChange={(event) => seekTo(Number(event.target.value))}
                        style={{ ['--progress' as string]: `${progress}%` }}
                      />
                    </label>

                    <span className="video-lightbox__time">{formatTime(duration)}</span>
                  </div>
                ) : null}
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
