import {
  AboutCtaContent,
  AboutHeroContent,
  AboutUs,
  ContactPageContent,
  CoreValue,
  CoreValuesSectionContent,
  ProjectStats,
  SiteSettings,
} from '../models/model';

export const ABOUT_CONTENT_SEED: AboutUs = {
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
};

export const ABOUT_STATS_SEED: ProjectStats = {
  ongoing: 7,
  upcoming: 4,
  completed: 28,
};

export const ABOUT_HERO_SEED: AboutHeroContent = {
  eyebrow: 'Since 2005',
  title: 'Redefining Real Estate since 2005',
  description:
    'We empower families to find not just a house, but a home where memories are made.',
  backgroundImage:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuD2UxjLiDNblHUR0KUkEinNEFGsaMh55ZLgjEfuklocfEDX22-EEK05FjkokFqatHrIrHsEmskZEE4Rgqr8VgtFRBaG1ZB5O4m1ALKPf7V06Jqd94AJZxVt3LP3WPZ-PzeCb--Y0mPAeQfcf0WK-CQDNoygHH01wxa5LwzEoHrCMJifUk2OW_B0ScC1ZvVrcKm2-CYafD9cCePvLYJ-WtSQDdzBC6VNV5S3mlOVfWLB5fFC9OwpfjmONJa8UgC1MFEMLrden2P_Jw',
  primaryCtaLabel: 'View Our Listings',
  primaryCtaLink: '/projects',
  secondaryCtaLabel: 'Meet Our Team',
  secondaryCtaLink: '/contact',
  statsLabels: {
    ongoing: 'Ongoing Projects',
    upcoming: 'Upcoming Projects',
    completed: 'Completed Projects',
  },
};

export const CORE_VALUES_SECTION_SEED: CoreValuesSectionContent = {
  eyebrow: 'Our Core Values',
  title: 'Principles that shape every promise',
  description:
    'From transparency to community focus, these commitments guide how we plan, build, and care for every resident.',
};

export const CORE_VALUES_SEED: CoreValue[] = [
  {
    id: 'integrity',
    title: 'Integrity',
    description:
      'Transparent communication and accountability keep every promise we make to residents and partners.',
    icon: 'ri-verified-badge-line',
  },
  {
    id: 'expertise',
    title: 'Expertise',
    description:
      'Seasoned teams blend local insight with global standards to guide confident real estate decisions.',
    icon: 'ri-lightbulb-flash-line',
  },
  {
    id: 'community',
    title: 'Community',
    description:
      'We create vibrant neighborhoods with shared amenities, thoughtful design, and long-term stewardship.',
    icon: 'ri-team-line',
  },
];

export const ABOUT_CTA_SEED: AboutCtaContent = {
  title: 'Ready to find your dream home?',
  description:
    'Join the families who discovered their perfect address with us. Let’s talk about the neighborhood that fits your life.',
  primaryCtaLabel: 'Browse Listings',
  primaryCtaLink: '/projects',
  secondaryCtaLabel: 'Contact Agent',
  secondaryCtaLink: '/contact',
};

export const CONTACT_PAGE_SEED: ContactPageContent = {
  title: 'Get in Touch',
  description:
    'Have questions about a listing or need a valuation? Our team is ready to help you find your dream property.',
  formTitle: 'Send us a message',
  privacyNote: 'We respect your privacy and will never share your info.',
  submitLabel: 'Send Message',
  interestOptions: [
    'Buying a Property',
    'Selling a Property',
    'Renting a Property',
    'Property Valuation',
    'Other Inquiry',
  ],
  mapCtaLabel: 'Open in Google Maps',
  contactInfoTitle: 'Contact Information',
  phoneLabel: 'Phone',
  emailLabel: 'Email',
  addressLabel: 'Visit Us',
  namePlaceholder: 'John Doe',
  phonePlaceholder: '+1 (555) 000-0000',
  emailPlaceholder: 'john@example.com',
  messagePlaceholder: "I'm interested in listing #4059...",
  agentTitle: 'Chat with an Agent',
  agentStatus: 'Online now',
  agentResponseTime: 'Typical reply in 5m',
  agentImage:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDtrD6rs9T5Ofl-mDsF4Fxg1GSB2VF-5meM467Or0TNI8yi3Cph4T0d_u2gDkcd3F7dmJYn7lgbST2oWVwx6YVxWzElxVJOVxJdApYbrYjygRzMTBSzguPBXnJB83Oit9BYR-BD4HWRP8A5g4bjv1ZaPM249kDaY_EMPwP3XYAm15fo6P9YqsjeWQu_LWCRWes5XqMQnIvh3ey0U6yTwuyKPtnnlBgpKfww9X0sQCYo00F7vdAWI-IYHuXSkt3FgVN_yMQXErYbXw',
};

export const SITE_SETTINGS_SEED: SiteSettings = {
  companyName: 'AK Builders',
  footerDescription:
    'Building the future of comfortable living with craftsmanship, community, and care.',
  address: '#57, BSCIC Shilpo Nogori, Ahamed Nogor, Sopura, Rajshahi.',
  phones: ['01762194232', '01339347540'],
  email: 'ashavendevltd@gmail.com',
  mapLink: 'https://maps.google.com',
  mapImage:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDtpBN_b9dwikjQlvb2hWERtCa34yFdw8nzbD2qjLhBFbPbPD6EnrwjvstYl3ndE3XFSuF_3HCdN1UGWHlwe6WXJCxxVyEbjpKtDEHaKYJkt3achV-nFv3A2aqH2N45puos3ajgmRJvU0PuQVhBH87ohiGAv2EGVSZGQpc1ZqYZ098l1DQ92f5f_yX6FWsUgEGOZjGgoE6_YzFfltKVhS7kZ6mxM-4sAP4HpldUcC1_bAPXiocEgKl9OX88ycwT8XwdW3m949SRZA',
  footerNote: '© {{year}} AK Builders. All rights reserved.',
  socialLinks: [
    {
      id: 'facebook',
      label: 'Facebook',
      url: 'https://www.facebook.com/HavenDeveloperLtd',
      icon: 'ri-facebook-fill',
      showInFooter: true,
      showInFloating: true,
    },
    {
      id: 'instagram',
      label: 'Instagram',
      url: 'https://instagram.com',
      icon: 'ri-instagram-line',
      showInFooter: true,
      showInFloating: false,
    },
    {
      id: 'linkedin',
      label: 'LinkedIn',
      url: 'https://linkedin.com',
      icon: 'ri-linkedin-fill',
      showInFooter: true,
      showInFloating: false,
    },
  ],
};
