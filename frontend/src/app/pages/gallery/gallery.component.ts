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
  galleryTypes: string[] = ['All', 'Residential', 'Commercial', 'Land', 'Other'];
  activeType = 'All';
  baseUrl = environment.baseUrl;
  selectedImageUrl: string | null = null;
  selectedImageType: string | null = null;

  constructor(private galleryService: GalleryService) {}

  ngOnInit(): void {
    this.loadGallery();
  }

  loadGallery(type?: string): void {
    const selectedType = type && type !== 'All' ? type : undefined;
    this.galleryService.getGalleries(selectedType).subscribe({
      next: (data) => {
        this.galleries = data || [];
        this.filteredGalleries = [...this.galleries];
      },
      error: (error) => {
        this.galleryService.showError(
          `Failed to load gallery: ${error.message || 'Unknown error'}`
        );
        console.error(error);
      },
    });
  }

  applyFilter(type: string): void {
    this.activeType = type;
    this.loadGallery(type);
  }

  openImage(item: Gallery): void {
    this.selectedImageUrl = this.imageUrl(item.image);
    this.selectedImageType = item.type || 'Project';
  }

  closeImage(): void {
    this.selectedImageUrl = null;
    this.selectedImageType = null;
  }

  imageUrl(img: string): string {
    return img
      ? `${this.baseUrl}/api/attachment/get/${img}`
      : 'https://img.freepik.com/free-vector/illustration-gallery-icon_53876-27002.jpg';
  }

  onImageError(event: Event): void {
    const target = event.target as HTMLImageElement;
    target.src =
      'https://img.freepik.com/free-vector/illustration-gallery-icon_53876-27002.jpg';
  }

  categoryIcon(type: string): string {
    const key = type.toLowerCase();
    if (key.includes('residential')) {
      return 'apartment';
    }
    if (key.includes('commercial')) {
      return 'domain';
    }
    if (key.includes('land')) {
      return 'terrain';
    }
    return 'category';
  }
}
