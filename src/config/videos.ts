const LOCAL_VIDEOS = '/videos'

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
    src: `${LOCAL_VIDEOS}/full-package.mp4`,
    poster: `${LOCAL_VIDEOS}/thumbs/full-package.jpg`,
  },
} as const
