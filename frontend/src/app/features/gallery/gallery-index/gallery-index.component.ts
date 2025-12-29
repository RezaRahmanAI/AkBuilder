import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Gallery } from '../../../models/model';
import { GalleryService } from '../../../services/gallery.service';
import { GalleryFormComponent } from '../gallery-form/gallery-form.component';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-gallery-index',
  standalone: true,
  imports: [CommonModule, GalleryFormComponent],
  templateUrl: './gallery-index.component.html',
  styleUrls: ['./gallery-index.component.css'],
})
export class GalleryIndexComponent implements OnInit {
  galleries: Gallery[] = [];
  showCreateModal = false;
  apiBaseUrl = environment.baseUrl;

  constructor(private galleryService: GalleryService) {}

  ngOnInit() {
    this.fetchGalleries();
  }

  fetchGalleries() {
    this.galleryService.getGalleries().subscribe({
      next: (data) => {
        this.galleries = data;
      },
      error: (error) => {
        this.galleryService.showError(
          'Failed to fetch gallery items: ' +
            (error.message || 'Unknown error')
        );
        console.error(error);
      },
    });
  }

  openCreateModal() {
    this.showCreateModal = true;
  }

  closeModal() {
    this.showCreateModal = false;
  }

  onGallerySaved() {
    this.fetchGalleries();
    this.closeModal();
  }

  deleteGallery(id: string) {
    this.galleryService.deleteGallery(id).subscribe({
      next: (response) => {
        this.galleryService.showSuccess(
          response || 'Gallery item deleted successfully'
        );
        this.fetchGalleries();
      },
      error: (error) => {
        this.galleryService.showError(
          `Failed to delete gallery item: ${
            error.message || 'Unknown error'
          }`
        );
        console.error(error);
      },
    });
  }
}
