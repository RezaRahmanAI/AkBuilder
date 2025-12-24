import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SiteSettings, SocialLink } from '../../models/model';
import { SiteStoreService } from '../../store/site-store.service';

@Component({
  selector: 'app-site-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './site-settings.component.html',
  styleUrls: ['./site-settings.component.css'],
})
export class SiteSettingsComponent implements OnInit {
  settingsForm!: SiteSettings;
  newPhone = '';
  newSocialLink: SocialLink = this.emptySocialLink();
  saveMessage = '';

  constructor(private siteStore: SiteStoreService) {}

  ngOnInit(): void {
    this.resetFromStore();
  }

  resetFromStore(): void {
    this.settingsForm = {
      ...this.siteStore.settings(),
      phones: [...this.siteStore.settings().phones],
      socialLinks: this.siteStore
        .settings()
        .socialLinks.map((link) => ({ ...link })),
    };
    this.saveMessage = '';
  }

  addPhone(): void {
    const trimmed = this.newPhone.trim();
    if (!trimmed) {
      return;
    }
    this.settingsForm.phones.push(trimmed);
    this.newPhone = '';
  }

  removePhone(index: number): void {
    this.settingsForm.phones.splice(index, 1);
  }

  addSocialLink(): void {
    if (!this.newSocialLink.label.trim() || !this.newSocialLink.url.trim()) {
      this.saveMessage = 'Provide a label and URL for the social link.';
      return;
    }
    this.settingsForm.socialLinks.push({
      ...this.newSocialLink,
      id: this.newSocialLink.id || this.generateId('social'),
    });
    this.newSocialLink = this.emptySocialLink();
    this.saveMessage = '';
  }

  removeSocialLink(id: string): void {
    this.settingsForm.socialLinks = this.settingsForm.socialLinks.filter(
      (link) => link.id !== id
    );
  }

  saveSettings(): void {
    this.siteStore.updateSettings(this.settingsForm);
    this.saveMessage = 'Settings saved successfully.';
  }

  private emptySocialLink(): SocialLink {
    return {
      id: '',
      label: '',
      url: '',
      icon: 'ri-facebook-fill',
      showInFooter: true,
      showInFloating: false,
    };
  }

  private generateId(prefix: string): string {
    return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
  }
}
