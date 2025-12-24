import { Injectable, signal } from '@angular/core';
import {
  AboutCtaContent,
  AboutHeroContent,
  AboutUs,
  ContactPageContent,
  ContactSubmission,
  CoreValue,
  CoreValuesSectionContent,
  ProjectStats,
  SiteSettings,
} from '../models/model';
import {
  ABOUT_CONTENT_SEED,
  ABOUT_CTA_SEED,
  ABOUT_HERO_SEED,
  ABOUT_STATS_SEED,
  CONTACT_PAGE_SEED,
  CORE_VALUES_SEED,
  CORE_VALUES_SECTION_SEED,
  SITE_SETTINGS_SEED,
} from './seed-data';

@Injectable({
  providedIn: 'root',
})
export class SiteStoreService {
  private aboutSignal = signal<AboutUs>({ ...ABOUT_CONTENT_SEED });
  private statsSignal = signal<ProjectStats>({ ...ABOUT_STATS_SEED });
  private heroSignal = signal<AboutHeroContent>({ ...ABOUT_HERO_SEED });
  private coreValuesSignal = signal<CoreValue[]>([...CORE_VALUES_SEED]);
  private coreValuesSectionSignal = signal<CoreValuesSectionContent>({
    ...CORE_VALUES_SECTION_SEED,
  });
  private ctaSignal = signal<AboutCtaContent>({ ...ABOUT_CTA_SEED });
  private contactPageSignal = signal<ContactPageContent>({
    ...CONTACT_PAGE_SEED,
  });
  private settingsSignal = signal<SiteSettings>({ ...SITE_SETTINGS_SEED });
  private submissionsSignal = signal<ContactSubmission[]>([]);

  readonly about = this.aboutSignal.asReadonly();
  readonly stats = this.statsSignal.asReadonly();
  readonly aboutHero = this.heroSignal.asReadonly();
  readonly coreValues = this.coreValuesSignal.asReadonly();
  readonly coreValuesSection = this.coreValuesSectionSignal.asReadonly();
  readonly aboutCta = this.ctaSignal.asReadonly();
  readonly contactPage = this.contactPageSignal.asReadonly();
  readonly settings = this.settingsSignal.asReadonly();
  readonly contactSubmissions = this.submissionsSignal.asReadonly();

  updateAbout(content: AboutUs): void {
    this.aboutSignal.set({ ...content });
  }

  updateStats(stats: ProjectStats): void {
    this.statsSignal.set({ ...stats });
  }

  updateAboutHero(content: AboutHeroContent): void {
    this.heroSignal.set({ ...content });
  }

  updateCoreValues(values: CoreValue[]): void {
    this.coreValuesSignal.set(values.map((value) => ({ ...value })));
  }

  updateCoreValuesSection(content: CoreValuesSectionContent): void {
    this.coreValuesSectionSignal.set({ ...content });
  }

  updateAboutCta(content: AboutCtaContent): void {
    this.ctaSignal.set({ ...content });
  }

  updateContactPage(content: ContactPageContent): void {
    this.contactPageSignal.set({ ...content });
  }

  updateSettings(settings: SiteSettings): void {
    this.settingsSignal.set({ ...settings });
  }

  addContactSubmission(submission: Omit<ContactSubmission, 'id' | 'date'>): void {
    const newSubmission: ContactSubmission = {
      ...submission,
      id: this.generateId(),
      date: new Date().toISOString(),
    };
    this.submissionsSignal.update((items) => [newSubmission, ...items]);
  }

  deleteContactSubmission(id: string): void {
    this.submissionsSignal.update((items) =>
      items.filter((item) => item.id !== id)
    );
  }

  getSubmissionById(id: string): ContactSubmission | undefined {
    return this.submissionsSignal().find((item) => item.id === id);
  }

  private generateId(): string {
    if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
      return crypto.randomUUID();
    }
    return `submission-${Date.now()}-${Math.random().toString(16).slice(2)}`;
  }
}
