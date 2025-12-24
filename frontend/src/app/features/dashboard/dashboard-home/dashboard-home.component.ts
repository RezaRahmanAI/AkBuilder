import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Contactus, Project, ProjectDashboardSummary } from '../../../models/model';
import { ContactusService } from '../../../services/contactus.service';
import { ProjectService } from '../../../services/project.service';
import { environment } from '../../../environments/environment';


@Component({
  selector: 'app-dashboard-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.css'],
})
export class DashboardHomeComponent implements OnInit {
  totalInquiries = 0;
  projects: Project[] = [];
  inquiriesError: string | null = null;
  projectsError: string | null = null;
  projectSummary: ProjectDashboardSummary | null = null;
  baseUrl = environment.baseUrl;
  Math = Math;

  constructor(
    private contactusService: ContactusService,
    private projectService: ProjectService
  ) {}

  ngOnInit(): void {
    this.loadInquiries();
    this.loadProjects();
  }

  loadInquiries(): void {
    let page = 1;
    const pageSize = 100; // Large pageSize to minimize requests
    let allContacts: Contactus[] = [];

    const fetchPage = () => {
      this.contactusService.getAll(page, pageSize).subscribe({
        next: (contacts: Contactus[]) => {
          allContacts = [...allContacts, ...contacts];
          if (contacts.length === pageSize) {
            page++;
            fetchPage();
          } else {
            this.totalInquiries = allContacts.length;
            this.inquiriesError = null;
          }
        },
        error: (error: Error) => {
          this.inquiriesError = error.message;
          this.totalInquiries = 0;
        },
      });
    };
    fetchPage();
  }

  loadProjects(): void {
    this.projectService.getDashboardSummary().subscribe({
      next: (summary: ProjectDashboardSummary) => {
        this.projectSummary = summary;
        this.projects = summary.recentProjects ?? [];
        this.projectsError = null;
      },
      error: (error: Error) => {
        this.projectsError = error.message;
        this.projectService.showError(error.message);
        this.projects = [];
        this.projectSummary = null;
      },
    });
  }

  statusBadgeClass(category: string | null | undefined): string {
    if (!category) {
      return 'bg-steel/10 text-steel border border-steel/30';
    }
    switch (category.toLowerCase()) {
      case 'ongoing':
        return 'bg-brand/15 text-charcoal border border-brand/30';
      case 'upcoming':
        return 'bg-accent/15 text-charcoal border border-accent/40';
      case 'completed':
        return 'bg-power/15 text-charcoal border border-power/30';
      default:
        return 'bg-steel/10 text-steel border border-steel/30';
    }
  }

  statusDotClass(category: string | null | undefined): string {
    if (!category) {
      return 'bg-steel';
    }
    switch (category.toLowerCase()) {
      case 'ongoing':
        return 'bg-brand';
      case 'upcoming':
        return 'bg-accent';
      case 'completed':
        return 'bg-power';
      default:
        return 'bg-steel';
    }
  }

  onImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    if (img.src !== '/images/fallback.png') {
      img.src = '/images/fallback.png';
    }
  }
}
