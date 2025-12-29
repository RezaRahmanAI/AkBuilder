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
  showEditModal = false;
  selectedGallery: Gallery | null = null;
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
    this.selectedGallery = null;
    this.showCreateModal = true;
  }

  openEditModal(item: Gallery) {
    this.selectedGallery = { ...item };
    this.showEditModal = true;
  }

  closeModal() {
    this.showCreateModal = false;
    this.showEditModal = false;
    this.selectedGallery = null;
  }

  onGallerySaved() {
    this.fetchGalleries();
    this.closeModal();
  }

  toggleActiveStatus(id: string, isActive: boolean) {
    this.galleryService.toggleActiveStatus(id, isActive).subscribe({
      next: (response) => {
        if (response === 'Data not found.') {
          this.galleryService.showError(response);
        } else {
          this.galleryService.showSuccess(
            response ||
              `Gallery item ${isActive ? 'activated' : 'deactivated'} successfully`
          );
          this.fetchGalleries();
        }
      },
      error: (error) => {
        this.galleryService.showError(
          `Failed to ${isActive ? 'activate' : 'deactivate'} item: ${
            error.message || 'Unknown error'
          }`
        );
        console.error(error);
      },
    });
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
