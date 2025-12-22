import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeroSectionComponent } from './hero-section/hero-section.component';
import { HistoryComponent } from './history/history.component';
import { MissionVisionComponent } from './mission-vision/mission-vision.component';
import { TeamModalComponent } from './team-modal/team-modal.component';
import { ProjectStats, Team } from '../../models/model';
import { TeamComponent } from './team/team.component';
import { environment } from '../../environments/environment';
import { AnimationService } from '../../services/animation.service';
import { TeamService } from '../../services/team.service';
import { ABOUT_PAGE_DATA } from '../../data/about-page.data';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    HeroSectionComponent,
    HistoryComponent,
    MissionVisionComponent,
    TeamComponent,
    TeamModalComponent,
  ],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent implements OnInit, AfterViewInit {
  baseUrl = environment.baseUrl;

  coreValues = [
    {
      title: 'Integrity',
      description:
        'Transparent communication and accountability keep every promise we make to residents and partners.',
      icon: 'ri-verified-badge-line',
    },
    {
      title: 'Expertise',
      description:
        'Seasoned teams blend local insight with global standards to guide confident real estate decisions.',
      icon: 'ri-lightbulb-flash-line',
    },
    {
      title: 'Community',
      description:
        'We create vibrant neighborhoods with shared amenities, thoughtful design, and long-term stewardship.',
      icon: 'ri-team-line',
    },
  ];

  state: {
    about: {
      history?: string;
      ownerName?: string;
      ownerDesignation?: string;
      ownerSpeech?: string;
      ownerImage?: string;
      mission?: string;
      missionImage?: string;
      vision?: string;
      visionImage?: string;
      facebook?: string;
      linkedIn?: string;
      twitter?: string;
    };
    teams: Team[];
    selectedTeamMember: Team | null;
    stats: ProjectStats;
  } = {
    about: {
      history: '',
      ownerName: '',
      ownerDesignation: '',
      ownerSpeech: '',
      ownerImage: '',
      mission: '',
      missionImage: '',
      vision: '',
      visionImage: '',
      twitter: '',
      linkedIn: '',
      facebook: '',
    },
    teams: [],
    selectedTeamMember: null,
    stats: {
      ongoing: 0,
      upcoming: 0,
      completed: 0,
    },
  };

  expandedSections: { [key: string]: boolean } = {
    history: true, 
    missionVision: false,
    ownerSpeech: false,
    team: false,
  };

  isModalVisible = false;

  constructor(private teamService: TeamService, private anim: AnimationService) {}

  ngAfterViewInit() {
    this.anim.animateOnScroll('.fade-up');
    this.anim.animateOnScroll('.zoom-in');
  }

  ngOnInit(): void {
    this.setAboutData();
    this.fetchTeams();
  }

  setAboutData(): void {
    const { about, stats } = ABOUT_PAGE_DATA;
    this.state.about = {
      history: about.history || '',
      ownerName: about.ownerName || '',
      ownerDesignation: about.ownerDesignation || '',
      ownerSpeech: about.ownerSpeech || '',
      twitter: about.twitter || '',
      facebook: about.facebook || '',
      linkedIn: about.linkedIn || '',
      ownerImage: about.ownerImage || '/images/fallback.png',
      mission: about.mission || '',
      missionImage: about.missionImage || '/images/fallback.png',
      vision: about.vision || '',
      visionImage: about.visionImage || '/images/fallback.png',
    };
    this.state.stats = stats || this.state.stats;
  }

  fetchTeams(): void {
    this.teamService.getActiveTeams().subscribe({
      next: (data: Team[]) => {
        this.state.teams = (data || []).map<Team>((member) => ({
          id: String(member.id),
          name: member.name,
          designation: member.designation,
          image: member.image
            ? `${this.baseUrl}/api/attachment/get/${member.image}`
            : '/images/fallback.png',
          description: member.description ?? '',
          facebook: member.facebook ?? '',
          twiter: member.twiter ?? '',
          linkthen: member.linkthen ?? '',
          isActive: member.isActive,
          order: member.order ?? 0,
        }));
      },
      error: (error) => {
        this.teamService.showError(
          `Failed to fetch team data: ${error.message || 'Unknown error'}`
        );
        console.error('Error fetching team data:', error);
      },
    });
  }

  toggleSection(section: string): void {
    this.expandedSections[section] = !this.expandedSections[section];
  }

  onToggle(member: Team | null = null): void {
    this.state.selectedTeamMember = member ? { ...member } : null;
    this.isModalVisible = !this.isModalVisible;
  }

  onImageError(event: Event, fallback = '/images/fallback.png'): void {
    const img = event.target as HTMLImageElement;
    if (img && img.src !== fallback) {
      img.src = fallback;
    }
  }
}
