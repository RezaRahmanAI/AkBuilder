import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestimonialService } from '../../services/testimonial.service';
import { Testimonial } from '../../models/model';
import { environment } from '../../environments/environment';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-testimonial',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './testimonial.component.html',
  styleUrls: ['./testimonial.component.css'],
})
export class TestimonialCarouselComponent implements OnInit, OnDestroy {
  testimonials: Testimonial[] = [];
  baseURL = environment.baseUrl;
  private subscription: Subscription = new Subscription();

  constructor(private testimonialService: TestimonialService) {}

  ngOnInit(): void {
    this.loadTestimonials();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  loadTestimonials(): void {
    this.subscription.add(
      this.testimonialService.getActiveTestimonials().subscribe({
        next: (res: Testimonial[]) => {
          this.testimonials = res.filter((t) => t.isActive);
          if (this.testimonials.length === 0) {
            this.testimonialService.showError('No active testimonials found.');
          }
        },
        error: (err) => console.error(err),
      })
    );
  }

  getImageUrl(testimonial: Testimonial): string {
    return testimonial.image
      ? `${this.baseURL}/api/attachment/get/${testimonial.image}`
      : 'https://img.freepik.com/free-vector/illustration-gallery-icon_53876-27002.jpg';
  }

  onImageError(event: Event): void {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src =
      'https://img.freepik.com/free-vector/illustration-gallery-icon_53876-27002.jpg';
  }
}
