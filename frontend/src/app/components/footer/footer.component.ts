import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SiteStoreService } from '../../store/site-store.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent {
  private siteStore = inject(SiteStoreService);
  readonly currentYear: number = new Date().getFullYear();
  readonly settings = this.siteStore.settings;
  readonly footerSocialLinks = computed(() =>
    this.settings().socialLinks.filter((link) => link.showInFooter)
  );

  footerNote(): string {
    const note = this.settings().footerNote || '';
    return note.replace('{{year}}', String(this.currentYear));
  }
}
