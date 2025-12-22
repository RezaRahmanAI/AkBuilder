import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BlogSummary } from '../../models/model';

@Component({
  selector: 'app-blog-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './blog-card.component.html',
  styleUrls: ['./blog-card.component.css'],
})
export class BlogCardComponent {
  @Input({ required: true }) blog!: BlogSummary;
  @Input() variant: 'feature' | 'highlight' | 'grid' = 'grid';
  @Input() baseUrl = '';

  imageUrl(image?: string | null): string {
    if (!image) {
      return '/images/banner/banner-3.png';
    }

    if (!this.baseUrl) {
      return image;
    }

    return `${this.baseUrl}/api/attachment/get/${image}`;
  }

  authorPhoto(picture?: string | null): string {
    if (!picture) {
      return 'none';
    }

    if (!this.baseUrl) {
      return `url('${picture}')`;
    }

    return `url('${this.baseUrl}/api/attachment/get/${picture}')`;
  }

  initials(name?: string | null): string {
    if (!name) {
      return 'AT';
    }

    const parts = name.trim().split(/\s+/);
    const first = parts[0]?.[0] ?? '';
    const last = parts.length > 1 ? parts[parts.length - 1]?.[0] ?? '' : '';
    return `${first}${last}`.toUpperCase() || 'AT';
  }

  readingTime(description?: string | null): string {
    const words = description?.trim().split(/\s+/).filter(Boolean).length ?? 0;
    const minutes = Math.max(1, Math.ceil(words / 200));
    return `${minutes} min read`;
  }
}
