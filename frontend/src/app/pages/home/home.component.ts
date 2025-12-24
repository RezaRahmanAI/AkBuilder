import { AfterViewInit, Component } from '@angular/core';
import { VisionBannerComponent } from '../../components/vision-banner/vision-banner.component';
import { TestimonialCarouselComponent } from '../../components/testimonial/testimonial.component';
import { HeroSlideComponent } from '../../components/hero-slide/hero-slide.component';
import { SliderComponent } from '../../components/slider/slider.component';
import { ProjectExploreComponent } from '../../components/project-explore/project-explore.components';
import { AnimationService } from '../../services/animation.service';
import { CommonModule } from '@angular/common';
import { FollowUpdateComponent } from '../../components/follow-update/follow-update.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    ProjectExploreComponent,
    VisionBannerComponent,
    TestimonialCarouselComponent,
    SliderComponent,
    HeroSlideComponent,
    FollowUpdateComponent
],
  templateUrl: './home.component.html',
})
export class HomeComponent implements AfterViewInit {
  constructor(private anim: AnimationService) {}

  ngAfterViewInit() {
    this.anim.animateOnScroll('.fade-up');
    this.anim.animateOnScroll('.zoom-in');

  }
}
