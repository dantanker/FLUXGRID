const VIDEO_CDN = 'https://cdn.jsdelivr.net/gh/dantanker/FLUXGRID@main/public/videos';

export const SITE_VIDEOS = {
  receptionistHero: {
    src: `${VIDEO_CDN}/receptionist-hero.mp4`,
    poster: `${VIDEO_CDN}/thumbs/receptionist-hero.jpg`,
  },
  websiteHero: {
    src: `${VIDEO_CDN}/website-hero.mp4`,
    poster: `${VIDEO_CDN}/thumbs/website-hero.jpg`,
  },
  fullPackage: {
    src: `${VIDEO_CDN}/full-package.mp4`,
    poster: `${VIDEO_CDN}/thumbs/full-package.jpg`,
  },
} as const;
