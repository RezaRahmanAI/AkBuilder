import { AfterViewInit, Component, OnInit, effect, inject } from '@angular/core';
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
import { ProjectService } from '../../services/project.service';
import { AppStore } from '../../store/app.store';

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
  private readonly store = inject(AppStore);

  coreValuesSection = this.store.aboutPage().coreValuesSection;
  ctaSection = this.store.aboutPage().cta;
  heroSection = this.store.aboutPage().hero;
  statsLabels = this.store.aboutPage().statsLabels;

  state: {
    about: {
      history?: string;
      mission?: string;
      missionImage?: string;
      vision?: string;
      visionImage?: string;
    };
    teams: Team[];
    selectedTeamMember: Team | null;
    stats: ProjectStats;
  } = {
    about: {
      history: '',
      mission: '',
      missionImage: '',
      vision: '',
      visionImage: '',
    },
    teams: [],
    selectedTeamMember: null,
    stats: {
      ongoing: 0,
      upcoming: 0,
      completed: 0,
    },
  };

  isModalVisible = false;

  constructor(
    private teamService: TeamService,
    private anim: AnimationService,
    private projectService: ProjectService
  ) {
    effect(() => {
      const aboutPage = this.store.aboutPage();
      this.setAboutData(aboutPage);
      this.coreValuesSection = aboutPage.coreValuesSection;
      this.ctaSection = aboutPage.cta;
      this.heroSection = aboutPage.hero;
      this.statsLabels = aboutPage.statsLabels;
    });
  }

  ngAfterViewInit() {
    this.anim.animateOnScroll('.fade-up');
    this.anim.animateOnScroll('.zoom-in');
  }

  ngOnInit(): void {
    this.fetchTeams();
    this.fetchProjectStats();
  }

  setAboutData(pageData = this.store.aboutPage()): void {
    const about = pageData.aboutEntries[0];
    const stats = pageData.stats;
    this.state.about = {
      history: about?.history || '',
      mission: about?.mission || '',
      missionImage: about?.missionImage || '/images/fallback.png',
      vision: about?.vision || '',
      visionImage: about?.visionImage || '/images/fallback.png',
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

  fetchProjectStats(): void {
    this.projectService.getDashboardSummary().subscribe({
      next: (summary) => {
        this.state.stats = {
          ongoing: summary?.ongoing ?? this.state.stats.ongoing,
          upcoming: summary?.upcoming ?? this.state.stats.upcoming,
          completed: summary?.completed ?? this.state.stats.completed,
        };
      },
      error: (error) => {
        this.projectService.showError(
          `Failed to fetch project stats: ${error.message || 'Unknown error'}`
        );
        console.error('Error fetching project stats:', error);
      },
    });
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
