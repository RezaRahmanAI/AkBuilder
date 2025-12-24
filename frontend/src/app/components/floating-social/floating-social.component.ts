import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SiteStoreService } from '../../store/site-store.service';

@Component({
  selector: 'app-floating-social',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './floating-social.component.html',
  styleUrls: ['./floating-social.component.css'],
})
export class FloatingSocialComponent {
  private siteStore = inject(SiteStoreService);
  isOpen = false;
  isSpinning = false;
  readonly floatingLinks = computed(() =>
    this.siteStore.settings().socialLinks.filter((link) => link.showInFloating)
  );

  toggleSocialIcons(): void {
    this.isSpinning = true;
    setTimeout(() => {
      this.isOpen = !this.isOpen;
      this.isSpinning = false;
    }, 300); // wait for spin before toggling
  }
}
