import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

export interface PageHeroStat {
  label: string;
  value: string;
  detail?: string;
}

@Component({
  selector: 'app-page-hero',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './page-hero.component.html',
  styleUrls: ['./page-hero.component.css'],
})
export class PageHeroComponent {
  @Input() eyebrow = 'Design-forward living';
  @Input() title = '';
  @Input() subtitle = '';
  @Input() accent = '';
  @Input() ctaLabel?: string;
  @Input() ctaLink?: string;
  @Input() secondaryLabel?: string;
  @Input() secondaryLink?: string;
  @Input() background = '/images/banner/banner-3.png';
  @Input() stats: PageHeroStat[] = [];
  @Input() alignment: 'left' | 'center' = 'left';
}
