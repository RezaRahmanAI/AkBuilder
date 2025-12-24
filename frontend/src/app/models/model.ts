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
  ownerName: string;
  ownerDesignation: string;
  ownerSpeech: string;
  ownerImage: string;
  facebook: string;
  linkedIn: string;
  twitter: string;
}

export interface ProjectStats {
  ongoing: number;
  upcoming: number;
  completed: number;
}

export interface CoreValue {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface AboutHeroContent {
  eyebrow: string;
  title: string;
  description: string;
  backgroundImage: string;
  primaryCtaLabel: string;
  primaryCtaLink: string;
  secondaryCtaLabel: string;
  secondaryCtaLink: string;
  statsLabels: {
    ongoing: string;
    upcoming: string;
    completed: string;
  };
}

export interface AboutCtaContent {
  title: string;
  description: string;
  primaryCtaLabel: string;
  primaryCtaLink: string;
  secondaryCtaLabel: string;
  secondaryCtaLink: string;
}

export interface CoreValuesSectionContent {
  eyebrow: string;
  title: string;
  description: string;
}

export interface ContactPageContent {
  title: string;
  description: string;
  formTitle: string;
  privacyNote: string;
  submitLabel: string;
  interestOptions: string[];
  mapCtaLabel: string;
  contactInfoTitle: string;
  phoneLabel: string;
  emailLabel: string;
  addressLabel: string;
  namePlaceholder: string;
  phonePlaceholder: string;
  emailPlaceholder: string;
  messagePlaceholder: string;
  agentTitle: string;
  agentStatus: string;
  agentResponseTime: string;
  agentImage: string;
}

export interface SocialLink {
  id: string;
  label: string;
  url: string;
  icon: string;
  showInFooter: boolean;
  showInFloating: boolean;
}

export interface SiteSettings {
  companyName: string;
  footerDescription: string;
  address: string;
  phones: string[];
  email: string;
  mapLink: string;
  mapImage: string;
  footerNote: string;
  socialLinks: SocialLink[];
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone?: string;
  interest: string;
  message: string;
  date: string;
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
