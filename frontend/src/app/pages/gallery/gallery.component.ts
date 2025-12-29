import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalleryService } from '../../services/gallery.service';
import { Gallery } from '../../models/model';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css',
})
export class GalleryComponent implements OnInit {
  galleries: Gallery[] = [];
  filteredGalleries: Gallery[] = [];
  categories: string[] = ['All Projects'];
  activeCategory = 'All Projects';
  baseUrl = environment.baseUrl;

  constructor(private galleryService: GalleryService) {}

  ngOnInit(): void {
    this.loadGallery();
  }

  loadGallery(): void {
    this.galleryService.getActiveGalleries().subscribe({
      next: (data) => {
        this.galleries = data || [];
        const categorySet = new Set(
          this.galleries
            .map((item) => item.category)
            .filter((category) => category && category.trim())
        );
        this.categories = ['All Projects', ...Array.from(categorySet)];
        this.applyFilter(this.activeCategory);
      },
      error: (error) => {
        this.galleryService.showError(
          `Failed to load gallery: ${error.message || 'Unknown error'}`
        );
        console.error(error);
      },
    });
  }

  applyFilter(category: string): void {
    this.activeCategory = category;
    if (category === 'All Projects') {
      this.filteredGalleries = [...this.galleries];
      return;
    }
    this.filteredGalleries = this.galleries.filter(
      (item) => item.category?.toLowerCase() === category.toLowerCase()
    );
  }

  imageUrl(image: string): string {
    return image
      ? `${this.baseUrl}/api/attachment/get/${image}`
      : 'https://img.freepik.com/free-vector/illustration-gallery-icon_53876-27002.jpg';
  }

  onImageError(event: Event): void {
    const target = event.target as HTMLImageElement;
    target.src =
      'https://img.freepik.com/free-vector/illustration-gallery-icon_53876-27002.jpg';
  }

  categoryIcon(category: string): string {
    const key = category.toLowerCase();
    if (key.includes('residential')) {
      return 'apartment';
    }
    if (key.includes('commercial')) {
      return 'domain';
    }
    if (key.includes('mixed')) {
      return 'storefront';
    }
    if (key.includes('industrial')) {
      return 'factory';
    }
    return 'category';
  }
}
