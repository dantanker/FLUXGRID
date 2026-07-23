import { useEffect, useRef, useState } from 'react';
import { createPortal, flushSync } from 'react-dom';

type SiteVideoProps = {
  src: string;
  poster: string;
  label: string;
  className?: string;
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
    // Width-only: trackpads/Safari on MacBook must not be treated as phones.
    const media = window.matchMedia('(max-width: 992px)');
    const update = () => setIsMobile(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  return isMobile;
}

type VideoElementWithWebkit = HTMLVideoElement & {
  webkitEnterFullscreen?: () => void;
};

async function enterNativeFullscreen(video: HTMLVideoElement) {
  const webkitVideo = video as VideoElementWithWebkit;

  try {
    if (video.requestFullscreen) {
      await video.requestFullscreen();
      return;
    }

    const anyVideo = video as HTMLVideoElement & {
      webkitRequestFullscreen?: () => Promise<void> | void;
    };
    if (typeof anyVideo.webkitRequestFullscreen === 'function') {
      await anyVideo.webkitRequestFullscreen();
      return;
    }

    if (typeof webkitVideo.webkitEnterFullscreen === 'function') {
      webkitVideo.webkitEnterFullscreen();
    }
  } catch {
    // Stay in the in-page player with native controls.
  }
}

export function SiteVideo({ src, poster, label, className }: SiteVideoProps) {
  const playerRef = useRef<HTMLVideoElement>(null);
  const isMobile = useIsMobileVideo();
  const [open, setOpen] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

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
    if (video) {
      video.pause();
      try {
        video.currentTime = 0;
      } catch {
        // Safari can throw if metadata is not ready yet.
      }
      if (document.fullscreenElement === video) {
        void document.exitFullscreen?.();
      }
    }
    setOpen(false);
  };

  const openPlayer = async () => {
    // Mount the <video> inside this click so play() keeps the user gesture (Safari/iOS).
    flushSync(() => {
      setOpen(true);
    });

    const video = playerRef.current;
    if (!video) {
      return;
    }

    try {
      // Do not seek before play — Safari throws InvalidStateError and aborts playback.
      await video.play();
      if (isMobile) {
        void enterNativeFullscreen(video);
      }
    } catch {
      setPlaying(false);
    }
  };

  const togglePlayback = async () => {
    const video = playerRef.current;
    if (!video) {
      return;
    }

    if (video.paused) {
      try {
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
      // Ignore seek errors before metadata is ready.
    }
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <>
      <div className={['video-spot', className].filter(Boolean).join(' ')}>
        <img className="video-spot__poster" src={poster} alt="" draggable={false} />

        <button
          type="button"
          className="video-spot__toggle"
          onClick={() => {
            void openPlayer();
          }}
          aria-label={`Open ${label}`}
        >
          <span className="video-spot__icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="28" height="28">
              <path d="M8 5.5v13l11-6.5-11-6.5z" fill="currentColor" />
            </svg>
          </span>
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
                        {playing ? (
                          <svg viewBox="0 0 24 24" width="26" height="26">
                            <rect x="6" y="5" width="4" height="14" rx="1" fill="currentColor" />
                            <rect x="14" y="5" width="4" height="14" rx="1" fill="currentColor" />
                          </svg>
                        ) : (
                          <svg viewBox="0 0 24 24" width="26" height="26">
                            <path d="M8 5.5v13l11-6.5-11-6.5z" fill="currentColor" />
                          </svg>
                        )}
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
                      {playing ? (
                        <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                          <rect x="6" y="5" width="4" height="14" rx="1" fill="currentColor" />
                          <rect x="14" y="5" width="4" height="14" rx="1" fill="currentColor" />
                        </svg>
                      ) : (
                        <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                          <path d="M8 5.5v13l11-6.5-11-6.5z" fill="currentColor" />
                        </svg>
                      )}
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
