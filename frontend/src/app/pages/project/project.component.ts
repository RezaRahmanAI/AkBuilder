import { Component, AfterViewInit, NgZone, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
// import { LenisService } from '../../services/lenis.service';
import { ScrollService } from '../../services/scroll.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../models/model';

type ProjectItem = Project;

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css'],
})
export class ProjectsComponent implements AfterViewInit, OnDestroy {
  scrollTransform = 'translateY(-60px)';
  selectedCategory: string = 'all';
  selectedType: string = 'all';

  state = {
    list: [] as ProjectItem[],
  };

  private destroy$ = new Subject<void>();

  constructor(
    private projectService: ProjectService,
    // private lenisService: LenisService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private scrollService: ScrollService,
    private zone: NgZone
  ) {
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

  ngAfterViewInit(): void {
    // Read category from query params (e.g., /projects?category=Ongoing)
    this.route.queryParams.subscribe((params) => {
      const category = params['category'] || 'all';
      this.selectedCategory = category;

      // Fetch projects with the pre-set filter
      this.getActiveProjects();
    });
  }

  getActiveProjects(): void {
    const category = this.selectedCategory || 'all';
    const type = this.selectedType || 'all';

    this.projectService.getActiveProjects().subscribe({
      next: (projects) => {
        const filtered = projects.filter((project) => {
          const matchesCategory =
            category === 'all' || project.category === category;
          const matchesType = type === 'all' || project.type === type;
          return matchesCategory && matchesType;
        });

        this.state.list = filtered.sort((a, b) => {
          // Put items without order at the bottom
          if (a.order == null && b.order == null) return 0;
          if (a.order == null) return 1;
          if (b.order == null) return -1;

          return a.order - b.order; // ascending
        });

        if (!filtered.length) {
          this.toastr.info(
            'No projects match your filters. Try adjusting criteria.',
            'No Results'
          );
        }
      },
      error: (err) => {
        console.error('Error fetching projects:', err);
        this.state.list = [];
        this.toastr.error(
          'Failed to load projects. Please try again.',
          'Error'
        );
      },
    });
  }

  resetFilters(): void {
    this.selectedCategory = 'all';
    this.selectedType = 'all';
    this.getActiveProjects();
  }

  onImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    if (img.src !== '/images/fallback.png') {
      img.src = '/images/fallback.png';
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  setCategory(category: string): void {
    this.selectedCategory = category;
    this.getActiveProjects();
  }

  updateType(type: string): void {
    this.selectedType = type;
    this.getActiveProjects();
  }

  statusBadgeClass(category: string): string {
    switch (category) {
      case 'Ongoing':
        return 'status-badge status-badge--ongoing';
      case 'Upcoming':
        return 'status-badge status-badge--upcoming';
      case 'Completed':
        return 'status-badge status-badge--completed';
      default:
        return 'status-badge';
    }
  }

  statusDotClass(category: string): string {
    switch (category) {
      case 'Ongoing':
        return 'status-dot status-dot--ongoing';
      case 'Upcoming':
        return 'status-dot status-dot--upcoming';
      case 'Completed':
        return 'status-dot status-dot--completed';
      default:
        return 'status-dot';
    }
  }

  statusLabel(category: string | undefined): string {
    return (category || 'Ongoing').toUpperCase();
  }

  categoryButtonClass(category: string): string {
    const isActive = this.selectedCategory === category;
    return `filter-pill ${isActive ? 'filter-pill--active' : ''}`;
  }
}
