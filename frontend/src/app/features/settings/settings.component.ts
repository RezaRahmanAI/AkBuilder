import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppStore } from '../../store/app.store';
import { Settings, SocialLink } from '../../models/model';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
})
export class SettingsComponent {
  private readonly store = inject(AppStore);
  settings: Settings = this.cloneSettings(this.store.settings());
  newSocialLink: SocialLink = this.createEmptyLink();
  newFloatingLink: SocialLink = this.createEmptyLink();
  newPhone = '';
  lastSaved: Date | null = null;

  saveSettings(): void {
    this.store.updateSettings(this.settings);
    this.lastSaved = new Date();
  }

  addSocialLink(): void {
    if (!this.newSocialLink.label || !this.newSocialLink.url) return;
    this.settings.socialLinks = [
      ...this.settings.socialLinks,
      { ...this.newSocialLink, id: this.generateId('social') },
    ];
    this.newSocialLink = this.createEmptyLink();
  }

  removeSocialLink(id: string): void {
    this.settings.socialLinks = this.settings.socialLinks.filter(
      (link) => link.id !== id
    );
  }

  addFloatingLink(): void {
    if (!this.newFloatingLink.label || !this.newFloatingLink.url) return;
    this.settings.floatingLinks = [
      ...this.settings.floatingLinks,
      { ...this.newFloatingLink, id: this.generateId('floating') },
    ];
    this.newFloatingLink = this.createEmptyLink();
  }

  removeFloatingLink(id: string): void {
    this.settings.floatingLinks = this.settings.floatingLinks.filter(
      (link) => link.id !== id
    );
  }

  addPhone(): void {
    if (!this.newPhone) return;
    this.settings.phones = [...this.settings.phones, this.newPhone];
    this.newPhone = '';
  }

  removePhone(index: number): void {
    this.settings.phones = this.settings.phones.filter((_, i) => i !== index);
  }

  private createEmptyLink(): SocialLink {
    return {
      id: '',
      label: '',
      url: '',
      iconClass: '',
      colorClass: '',
    };
  }

  private cloneSettings(settings: Settings): Settings {
    return JSON.parse(JSON.stringify(settings)) as Settings;
  }

  private generateId(prefix: string): string {
    return `${prefix}-${Math.random().toString(36).slice(2, 8)}-${Date.now()}`;
  }
}
