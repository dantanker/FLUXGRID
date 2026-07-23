const VIDEO_CDN = 'https://cdn.jsdelivr.net/gh/dantanker/FLUXGRID@main/public/videos';

// Local public files for reliable preview/deploy; CDN kept as a secondary source after push.
const LOCAL_VIDEOS = '/videos';

export const SITE_VIDEOS = {
  receptionistHero: {
    src: `${LOCAL_VIDEOS}/receptionist-hero.mp4`,
    poster: `${LOCAL_VIDEOS}/thumbs/receptionist-hero.jpg`,
  },
  websiteHero: {
    src: `${LOCAL_VIDEOS}/website-hero.mp4`,
    poster: `${LOCAL_VIDEOS}/thumbs/website-hero.jpg`,
  },
  fullPackage: {
    src: `${VIDEO_CDN}/full-package.mp4`,
    poster: `${VIDEO_CDN}/thumbs/full-package.jpg`,
  },
} as const;
