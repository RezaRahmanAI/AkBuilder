import { computed, Injectable, signal } from '@angular/core';
import {
  AboutPageContent,
  AboutUs,
  ContactPageContent,
  Contactus,
  ProjectStats,
  Settings,
} from '../models/model';

interface AppState {
  aboutPage: AboutPageContent;
  contactPage: ContactPageContent;
  settings: Settings;
  contactSubmissions: Contactus[];
}

const seededAbout: AboutUs = {
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

const seededStats: ProjectStats = {
  ongoing: 7,
  upcoming: 4,
  completed: 28,
};

const initialState: AppState = {
  aboutPage: {
    aboutEntries: [seededAbout],
    stats: seededStats,
    coreValuesSection: {
      eyebrow: 'Our Core Values',
      title: 'Principles that shape every promise',
      description:
        'From transparency to community focus, these commitments guide how we plan, build, and care for every resident.',
      values: [
        {
          title: 'Integrity',
          description:
            'Transparent communication and accountability keep every promise we make to residents and partners.',
          icon: 'ri-verified-badge-line',
        },
        {
          title: 'Expertise',
          description:
            'Seasoned teams blend local insight with global standards to guide confident real estate decisions.',
          icon: 'ri-lightbulb-flash-line',
        },
        {
          title: 'Community',
          description:
            'We create vibrant neighborhoods with shared amenities, thoughtful design, and long-term stewardship.',
          icon: 'ri-team-line',
        },
      ],
    },
    hero: {
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
    },
    statsLabels: {
      ongoing: 'Ongoing Projects',
      upcoming: 'Upcoming Projects',
      completed: 'Completed Projects',
    },
    cta: {
      title: 'Ready to find your dream home?',
      description:
        'Join the families who discovered their perfect address with us. Let’s talk about the neighborhood that fits your life.',
      primaryLabel: 'Browse Listings',
      primaryLink: '/projects',
      secondaryLabel: 'Contact Agent',
      secondaryLink: '/contact',
    },
  },
  contactPage: {
    hero: {
      title: 'Contact',
      eyebrow: "Let's create a connection",
      breadcrumbLabel: 'Contact',
      backgroundImage: '/images/banner/banner-3.png',
      highlight:
        'Stills • Motion • Atmospheres',
    },
    getInTouch: {
      eyebrow: 'Ways to reach us',
      title: 'A concierge team dedicated to making every conversation memorable.',
      description:
        'Whether you prefer a private tour, a quick voice note, or a detailed proposal, our specialists respond with the same care we give our residences.',
      cards: [
        {
          id: 'consultation',
          icon: 'ri-customer-service-2-line',
          title: 'Book a Consultation',
          description:
            'Share your vision and we will curate a personalised presentation with pricing, 3D walkthroughs, and availability.',
          meta: [
            {
              label: 'Email',
              value: 'ashavendevltd@gmail.com',
              url: 'mailto:ashavendevltd@gmail.com',
            },
            {
              label: 'Response',
              value: 'Within 12 hours',
            },
          ],
          ctaLabel: 'Schedule now',
          ctaUrl: '#connect',
          ctaExternal: false,
        },
        {
          id: 'specialist',
          icon: 'ri-smartphone-line',
          title: 'Talk to a Specialist',
          description:
            'Speak directly with our advisors for real-time updates on unit availability, payment plans, and on-site visits.',
          meta: [
            {
              label: 'Phone',
              value: '01762194232, 01339347540',
              url: 'tel:+8801762194232',
            },
            {
              label: 'WhatsApp',
              value: '01762194232',
              url: 'https://wa.me/01762194232',
            },
          ],
          ctaLabel: 'Call us today',
          ctaUrl: 'tel:+8801762194232',
          ctaExternal: false,
        },
        {
          id: 'studio',
          icon: 'ri-map-pin-2-line',
          title: 'Visit our Studio',
          description:
            'Immerse yourself in our material library and experience our model galleries with one-on-one guidance from the team.',
          meta: [
            {
              label: 'Location',
              value: '#57,BSCIC Shilpo Nogori,Ahamed Nogor,Sopura,Rajshahi.',
            },
            {
              label: 'Hours',
              value: 'Saturday – Thursday, 10:00am – 7:00pm',
            },
          ],
          ctaLabel: 'Get directions',
          ctaUrl: 'https://maps.app.goo.gl/bdA2QxSXGC4Bp2uH8',
          ctaExternal: true,
        },
      ],
      banner: {
        eyebrow: 'Priority support',
        title: 'Dedicated lifestyle curators for landowners & investors.',
        ctaLabel: 'Email our concierge',
        ctaUrl: 'mailto:landowners@ashaven.com',
      },
    },
    infoMap: {
      eyebrow: 'TELL US ABOUT YOUR VISION',
      title: 'We orchestrate every detail—simply share your aspirations.',
      description:
        'Complete the form and our concierge will design a bespoke plan with curated residences, floor plans, and financial guidance tailored to you.',
      stats: [
        { label: 'Families guided home', value: '450+' },
        { label: 'Client satisfaction', value: '98%' },
        { label: 'Average response time', value: '24h' },
      ],
      formTitle: 'Your details',
      formDescription:
        'We keep your information private and only use it to coordinate your experience.',
      submitLabel: 'Submit enquiry',
      privacyNote: 'By submitting, you agree to our friendly privacy policy.',
      mapBadge: 'Showroom & Experience Centre',
      mapDescription:
        'Tour our model residences, material library, and immersive planning studio.',
      mapIframeUrl:
        'https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d1816.9133006603704!2d88.60534652694886!3d24.387334802924492!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sas%20haven%20developer%20rajshahi!5e0!3m2!1sen!2sbd!4v1760330603927!5m2!1sen!2sbd',
      highlights: [
        {
          label: 'Parking',
          value: 'Complimentary valet on arrival',
        },
        {
          label: 'Weekend Hours',
          value: 'Friday visits by appointment only',
        },
        {
          label: 'Virtual Access',
          value: 'Live video tours available globally',
        },
      ],
    },
  },
  settings: {
    companyName: 'AK Builders',
    footerDescription:
      'Building the future of comfortable living with craftsmanship, community, and care.',
    address: '#57, BSCIC Shilpo Nogori, Ahamed Nogor, Sopura, Rajshahi.',
    phones: ['01762194232', '01339347540'],
    email: 'ashavendevltd@gmail.com',
    socialLinks: [
      {
        id: 'facebook',
        label: 'Facebook',
        url: 'https://www.facebook.com/HavenDeveloperLtd',
        iconClass: 'ri-facebook-fill',
      },
      {
        id: 'instagram',
        label: 'Instagram',
        url: 'https://instagram.com',
        iconClass: 'ri-instagram-line',
      },
      {
        id: 'linkedin',
        label: 'LinkedIn',
        url: 'https://linkedin.com',
        iconClass: 'ri-linkedin-fill',
      },
    ],
    floatingLinks: [
      {
        id: 'floating-facebook',
        label: 'Facebook',
        url: 'https://www.facebook.com/HavenDeveloperLtd',
        iconClass: 'ri-facebook-fill',
        colorClass: 'bg-[#1877F2]',
      },
    ],
  },
  contactSubmissions: [],
};

@Injectable({
  providedIn: 'root',
})
export class AppStore {
  private readonly state = signal<AppState>(initialState);

  readonly aboutPage = computed(() => this.state().aboutPage);
  readonly contactPage = computed(() => this.state().contactPage);
  readonly settings = computed(() => this.state().settings);
  readonly contactSubmissions = computed(() => this.state().contactSubmissions);

  updateSettings(settings: Settings): void {
    this.state.update((current) => ({
      ...current,
      settings: { ...settings },
    }));
  }

  updateAboutEntry(entry: AboutUs): void {
    this.state.update((current) => ({
      ...current,
      aboutPage: {
        ...current.aboutPage,
        aboutEntries: current.aboutPage.aboutEntries.map((item) =>
          item.id === entry.id ? { ...entry } : item
        ),
      },
    }));
  }

  createAboutEntry(entry: AboutUs): void {
    this.state.update((current) => ({
      ...current,
      aboutPage: {
        ...current.aboutPage,
        aboutEntries: [
          ...current.aboutPage.aboutEntries,
          { ...entry, id: entry.id || this.generateId('about') },
        ],
      },
    }));
  }

  deleteAboutEntry(id: string): void {
    this.state.update((current) => ({
      ...current,
      aboutPage: {
        ...current.aboutPage,
        aboutEntries: current.aboutPage.aboutEntries.filter(
          (entry) => entry.id !== id
        ),
      },
    }));
  }

  addContactSubmission(contact: Contactus): Contactus {
    const submission: Contactus = {
      ...contact,
      id: contact.id || this.generateId('contact'),
      date: contact.date ?? new Date(),
    };
    this.state.update((current) => ({
      ...current,
      contactSubmissions: [submission, ...current.contactSubmissions],
    }));
    return submission;
  }

  deleteContactSubmission(id: string): void {
    this.state.update((current) => ({
      ...current,
      contactSubmissions: current.contactSubmissions.filter(
        (item) => item.id !== id
      ),
    }));
  }

  private generateId(prefix: string): string {
    return `${prefix}-${Math.random().toString(36).slice(2, 9)}-${Date.now()}`;
  }
}
