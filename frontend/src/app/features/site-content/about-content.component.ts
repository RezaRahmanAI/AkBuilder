import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  AboutCtaContent,
  AboutHeroContent,
  AboutUs,
  CoreValue,
  CoreValuesSectionContent,
  ProjectStats,
} from '../../models/model';
import { SiteStoreService } from '../../store/site-store.service';

@Component({
  selector: 'app-about-content',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './about-content.component.html',
  styleUrls: ['./about-content.component.css'],
})
export class AboutContentComponent implements OnInit {
  aboutForm!: AboutUs;
  statsForm!: ProjectStats;
  heroForm!: AboutHeroContent;
  coreValuesSectionForm!: CoreValuesSectionContent;
  coreValues: CoreValue[] = [];
  ctaForm!: AboutCtaContent;
  newCoreValue: CoreValue = this.emptyCoreValue();
  saveMessage = '';

  constructor(private siteStore: SiteStoreService) {}

  ngOnInit(): void {
    this.resetFromStore();
  }

  resetFromStore(): void {
    this.aboutForm = { ...this.siteStore.about() };
    this.statsForm = { ...this.siteStore.stats() };
    this.heroForm = { ...this.siteStore.aboutHero() };
    this.coreValuesSectionForm = { ...this.siteStore.coreValuesSection() };
    this.coreValues = this.siteStore.coreValues().map((value) => ({
      ...value,
    }));
    this.ctaForm = { ...this.siteStore.aboutCta() };
    this.newCoreValue = this.emptyCoreValue();
    this.saveMessage = '';
  }

  addCoreValue(): void {
    if (!this.newCoreValue.title.trim() || !this.newCoreValue.description.trim()) {
      this.saveMessage = 'Provide a title and description for the core value.';
      return;
    }
    this.coreValues.push({
      ...this.newCoreValue,
      id: this.newCoreValue.id || this.generateId('core-value'),
    });
    this.newCoreValue = this.emptyCoreValue();
    this.saveMessage = '';
  }

  removeCoreValue(id: string): void {
    this.coreValues = this.coreValues.filter((value) => value.id !== id);
  }

  saveAll(): void {
    this.siteStore.updateAbout(this.aboutForm);
    this.siteStore.updateStats(this.statsForm);
    this.siteStore.updateAboutHero(this.heroForm);
    this.siteStore.updateCoreValuesSection(this.coreValuesSectionForm);
    this.siteStore.updateCoreValues(this.coreValues);
    this.siteStore.updateAboutCta(this.ctaForm);
    this.saveMessage = 'About content updated successfully.';
  }

  private emptyCoreValue(): CoreValue {
    return {
      id: '',
      title: '',
      description: '',
      icon: 'ri-verified-badge-line',
    };
  }

  private generateId(prefix: string): string {
    return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
  }
}
