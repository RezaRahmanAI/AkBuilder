import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProjectStats } from '../../../models/model';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroSectionComponent {
  @Input() stats: ProjectStats = {
    ongoing: 0,
    upcoming: 0,
    completed: 0,
  };
  @Input() heroContent: {
    eyebrow: string;
    title: string;
    description: string;
    backgroundImage: string;
    primaryCtaLabel: string;
    primaryCtaLink: string;
    secondaryCtaLabel: string;
    secondaryCtaLink: string;
  } = {
    eyebrow: '',
    title: '',
    description: '',
    backgroundImage: '',
    primaryCtaLabel: '',
    primaryCtaLink: '',
    secondaryCtaLabel: '',
    secondaryCtaLink: '',
  };
  @Input() statsLabels: {
    ongoing: string;
    upcoming: string;
    completed: string;
  } = {
    ongoing: 'Ongoing Projects',
    upcoming: 'Upcoming Projects',
    completed: 'Completed Projects',
  };
}
