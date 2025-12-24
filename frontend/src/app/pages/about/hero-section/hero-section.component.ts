import {
  ChangeDetectionStrategy,
  Component,
  Input,
  NgZone,
  OnDestroy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ScrollService } from '../../../services/scroll.service';
import { ProjectStats } from '../../../models/model';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroSectionComponent implements OnDestroy {
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
  scrollTransform = 'translateY(-60px)';
  private destroy$ = new Subject<void>();

  constructor(private scrollService: ScrollService, private zone: NgZone) {
    this.zone.runOutsideAngular(() => {
      this.scrollService.scrollY$
        .pipe(takeUntil(this.destroy$))
        .subscribe((scrollY) => {
          const transform = `translateY(${scrollY * 0.3 - 60}px)`;
          if (transform !== this.scrollTransform) {
            this.zone.run(() => {
              this.scrollTransform = transform;
            });
          }
        });
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
