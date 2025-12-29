export interface Testimonial {
  id: string;
  name: string;
  description: string;
  image: string;
  contentType: 'Image' | 'Video' | '';
  content: string;
  order: number;
  isActive: boolean;
  customerType: 'Customer' | 'Land Owner' | '';
}

export interface LandownerData {
  name: string;
  phone: string;
  email: string;
  locality: string;
  landCategory: string;
  frontRoadWidth?: string;
  facing?: string;
  address: string;
  message: string;
}

export interface Slide {
  image: string;
  alt: string;
  author: string;
  title: string;
  topic: string;
  description: string;
  thumbnailTitle: string;
  thumbnailDescription: string;
}

export interface Offer {
  id: string;
  title: string;
  description: string;
  picture: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
}

export interface Team {
  id: string;
  name: string;
  designation: string;
  description: string;
  facebook: string;
  twiter: string;
  linkthen: string;
  image: string;
  isActive: boolean;
  order: number;
}

export interface Gallery {
  type: string;
  img: string;
  order: number;
}

export interface Consultant {
  id: string;
  name: string;
  location: string;
  image: string;
  isInterior: number;
}

export interface AboutUs {
  id: string;
  history: string;
  vision: string;
  visionImage: string;
  mission: string;
  missionImage: string;
}

export interface ProjectStats {
  ongoing: number;
  upcoming: number;
  completed: number;
}

export interface AboutCoreValue {
  title: string;
  description: string;
  icon: string;
}

export interface AboutCoreValuesSection {
  eyebrow: string;
  title: string;
  description: string;
  values: AboutCoreValue[];
}

export interface AboutPageContent {
  aboutEntries: AboutUs[];
  stats: ProjectStats;
  coreValuesSection: AboutCoreValuesSection;
  hero: {
    eyebrow: string;
    title: string;
    description: string;
    backgroundImage: string;
    primaryCtaLabel: string;
    primaryCtaLink: string;
    secondaryCtaLabel: string;
    secondaryCtaLink: string;
  };
  statsLabels: {
    ongoing: string;
    upcoming: string;
    completed: string;
  };
  cta: {
    title: string;
    description: string;
    primaryLabel: string;
    primaryLink: string;
    secondaryLabel: string;
    secondaryLink: string;
  };
}

export interface ProjectDashboardSummary {
  total: number;
  active: number;
  ongoing: number;
  upcoming: number;
  completed: number;
  recentProjects: Project[];
}

export interface AboutPageData {
  about: AboutUs | null;
  teams: Team[];
  stats: ProjectStats;
}

export interface Contactus {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  date?: Date;
}

export interface SocialLink {
  id: string;
  label: string;
  url: string;
  iconClass: string;
  colorClass?: string;
}

export interface Settings {
  companyName: string;
  footerDescription: string;
  address: string;
  phones: string[];
  email: string;
  socialLinks: SocialLink[];
  floatingLinks: SocialLink[];
}

export interface ContactMetaItem {
  label: string;
  value: string;
  url?: string;
}

export interface ContactCard {
  id: string;
  icon: string;
  title: string;
  description: string;
  meta: ContactMetaItem[];
  ctaLabel: string;
  ctaUrl: string;
  ctaExternal?: boolean;
}

export interface ContactHeroContent {
  title: string;
  eyebrow: string;
  breadcrumbLabel: string;
  backgroundImage: string;
  highlight: string;
  primaryCtaLabel: string;
  primaryCtaLink: string;
  secondaryCtaLabel: string;
  secondaryCtaLink: string;
}

export interface ContactInfoMapContent {
  eyebrow: string;
  title: string;
  description: string;
  stats: { label: string; value: string }[];
  formTitle: string;
  formDescription: string;
  submitLabel: string;
  privacyNote: string;
  mapBadge: string;
  mapDescription: string;
  mapIframeUrl: string;
  highlights: { label: string; value: string }[];
}

export interface ContactPageContent {
  hero: ContactHeroContent;
  getInTouch: {
    eyebrow: string;
    title: string;
    description: string;
    cards: ContactCard[];
    banner: {
      eyebrow: string;
      title: string;
      ctaLabel: string;
      ctaUrl: string;
    };
  };
  infoMap: ContactInfoMapContent;
}

export interface Faq {
  id: number;
  question: string;
  answer: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  createDate: string;
  address: string;
  thumbnail: string;
  category: string;
  type: string;
  content: string;
  contentType: string;
  offerTitle: string;
  offerDateTime: string;
  isActive: boolean;
  landArea: string;
  builtUpArea: string;
  height: string;
  numberOfApartments: number;
  numberOfParking: number;
  noOfMotorParking: number;
  unitPerFloors: string;
  sizeOfEachApartment: string;
  mapLink: string;
  pdfFile: string;
  videoLink: string;
  order: number;
  canSchedule?: boolean;
}

export interface ProjectFeature {
  id: string;
  title: string;
  description: string;
  icon: string;
  order: number;
  projectId: string;
  isActive?: boolean;
}

export interface Blog {
  id: string;
  title: string;
  description: string;
  image: string;
  isActive: boolean;
  createdDate?: string;
  postedDate?: string;
  offerDateTime?: string;
  userId?: string;
}

export interface BlogSummary {
  id: string;
  title: string;
  description: string;
  image: string;
  name?: string;
  picture?: string;
  postedDate?: string;
  offerDate?: string;
}
