import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AboutPageStat, AboutUs, Team } from '../../models/model';
import { environment } from '../../environments/environment';
import { AboutUsService } from '../../services/about-us.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent implements OnInit {
  baseUrl = environment.baseUrl;
  fallbackHeroImage =
    'https://lh3.googleusercontent.com/aida-public/AB6AXuD2UxjLiDNblHUR0KUkEinNEFGsaMh55ZLgjEfuklocfEDX22-EEK05FjkokFqatHrIrHsEmskZEE4Rgqr8VgtFRBaG1ZB5O4m1ALKPf7V06Jqd94AJZxVt3LP3WPZ-PzeCb--Y0mPAeQfcf0WK-CQDNoygHH01wxa5LwzEoHrCMJifUk2OW_B0ScC1ZvVrcKm2-CYafD9cCePvLYJ-WtSQDdzBC6VNV5S3mlOVfWLB5fFC9OwpfjmONJa8UgC1MFEMLrden2P_Jw';
  fallbackHistoryImage =
    'https://lh3.googleusercontent.com/aida-public/AB6AXuB68PP69_rC7h2ZO-k1a1Z3CDxJ4R6VXhKcWOvKrNmiv5pXZ1zbwDD7PkaJZA1xZ9NBB2JHwOrvNWRkVZFco9d_9sfEH3QTtmm8H9EY4K-TUux15vfVVGC07I5HyMNfWt0N0_eXSdWQUtJ4kd9HB7ar0nl9vNcC1WQkwBBE-6ub8YrKAIG6rd3bHDt4UDYr14fWukcCKwRqyiUd9vGb4Qa9nJrU67cAnO6omYCmomKKH-vxRCtwrxFkT5136miczn0_NEUAzmueFQ';
  fallbackHistoryImageAlt =
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCQzVIg2ya8ynG-cRBGe8avlm9kUp4n1hxBNv6LU3zyKfwOP_uYk52-Ez23Zf1dp7t11nH-75T8x0SMedP3AQtz10Yj8ddKGz3VbL-Jnufqh0FEo_upALKMb_F0GM5EqI-JYpazmXf8h8dUdfT5wDbyKtIQD2AK3BxuY10AYWwPbWYMIv5vwqJdv_nug484Im6nBw277XgsxG6jMJe_R77Ohi3zaItVH6ch4UgtJfR5kGNOVE3qpBNJMS-R7JbBTDqlwiCnwcUB2w';

  coreValues = [
    {
      title: 'Integrity',
      description:
        'Transparent communication and accountability keep every promise we make to residents and partners.',
      icon: 'verified',
    },
    {
      title: 'Expertise',
      description:
        'Seasoned teams blend local insight with global standards to guide confident real estate decisions.',
      icon: 'lightbulb',
    },
    {
      title: 'Community',
      description:
        'We create vibrant neighborhoods with shared amenities, thoughtful design, and long-term stewardship.',
      icon: 'groups',
    },
  ];

  state: {
    about: AboutUs;
    teams: Team[];
    stats: AboutPageStat[];
  } = {
    about: {
      id: '',
      history: '',
      vision: '',
      visionImage: '',
      mission: '',
      missionImage: '',
      ownerName: '',
      ownerDesignation: '',
      ownerSpeech: '',
      ownerImage: '',
      twitter: '',
      linkedIn: '',
      facebook: '',
    },
    teams: [],
    stats: [],
  };
  
  constructor(private aboutUsService: AboutUsService) {}

  ngOnInit(): void {
    this.fetchAboutPage();
  }

  get heroBackground(): string {
    return (
      this.state.about?.missionImage ||
      this.state.about?.visionImage ||
      this.fallbackHeroImage
    );
  }

  get historyPrimaryImage(): string {
    return this.state.about?.missionImage || this.fallbackHistoryImage;
  }

  get historySecondaryImage(): string {
    return this.state.about?.visionImage || this.fallbackHistoryImageAlt;
  }

  private fetchAboutPage(): void {
    this.aboutUsService.getAboutPageData().subscribe({
      next: (data) => {
        const about = data?.about;
        this.state.about = {
          id: about?.id ?? '',
          history: about?.history ?? '',
          vision: about?.vision ?? '',
          visionImage: this.getImageUrl(about?.visionImage),
          mission: about?.mission ?? '',
          missionImage: this.getImageUrl(about?.missionImage),
          ownerName: about?.ownerName ?? '',
          ownerDesignation: about?.ownerDesignation ?? '',
          ownerSpeech: about?.ownerSpeech ?? '',
          ownerImage: this.getImageUrl(about?.ownerImage),
          twitter: about?.twitter ?? '',
          linkedIn: about?.linkedIn ?? '',
          facebook: about?.facebook ?? '',
        };
        this.state.stats = data?.stats ?? [];
        this.state.teams = (data?.teams || []).map<Team>((member) => ({
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
        this.aboutUsService.showError(
          `Failed to fetch About page data: ${error.message || 'Unknown error'}`
        );
        console.error('Error fetching About page data:', error);
      },
    });
  }

  private getImageUrl(imagePath?: string | null): string {
    if (!imagePath) {
      return '';
    }
    if (imagePath.startsWith('http')) {
      return imagePath;
    }
    return `${this.baseUrl}/api/attachment/get/${imagePath}`;
  }
}
