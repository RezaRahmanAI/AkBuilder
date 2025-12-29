import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

export interface ExploreItem {
  id: number;
  title: string;
  route: string;
  icon: string;
  description: string;
  cta: string;
}

@Component({
  selector: 'app-project-explore',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './project-explore.component.html',
  styleUrls: ['./project-explore.component.css'],
})
export class ProjectExploreComponent {
  projects: ExploreItem[] = [
    {
      id: 1,
      title: 'Ongoing Residences',
      route: '/projects',
      icon: 'construction',
      description:
        'Track the progress of our current developments and see how we elevate every neighborhood we touch.',
      cta: 'View progress',
    },
    {
      id: 2,
      title: 'Upcoming Landmark',
      route: '/projects',
      icon: 'architecture',
      description:
        'Discover what is next in our pipeline with early access to plans, amenities, and investment opportunities.',
      cta: 'View pipeline',
    },
    {
      id: 3,
      title: 'Completed Masterpieces',
      route: '/projects',
      icon: 'apartment',
      description:
        'Browse the portfolio of delivered properties and experience the craftsmanship that defines our builds.',
      cta: 'View portfolio',
    },
  ];
}
