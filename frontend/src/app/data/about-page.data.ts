import { AboutUs, ProjectStats } from '../models/model';

export const ABOUT_PAGE_DATA: { about: AboutUs; stats: ProjectStats } = {
  about: {
    id: 'local-about-page',
    history:
      'AK Builders Ltd has grown from a local construction team into a trusted real estate partner in Rajshahi. We focus on thoughtfully planned communities that blend modern amenities with lasting craftsmanship.',
    vision:
      'To shape sustainable neighborhoods where every family feels secure, connected, and proud to call home.',
    visionImage: '/images/banner/banner_1.jpg',
    mission:
      'Deliver transparent, people-first real estate solutions through quality construction, responsible development, and long-term community care.',
    missionImage: '/images/land.jpg',
    ownerName: 'AK Builders Leadership',
    ownerDesignation: 'Managing Director',
    ownerSpeech:
      'Our commitment is to build homes that enrich lives and neighborhoods that stand the test of time.',
    ownerImage: '/images/service.jpg',
    facebook: 'https://www.facebook.com',
    linkedIn: 'https://www.linkedin.com',
    twitter: 'https://www.twitter.com',
  },
  stats: {
    ongoing: 7,
    upcoming: 4,
    completed: 28,
  },
};
