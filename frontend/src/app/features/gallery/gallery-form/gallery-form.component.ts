import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { GalleryService } from '../../../services/gallery.service';

@Component({
  selector: 'app-gallery-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './gallery-form.component.html',
  styleUrls: ['./gallery-form.component.css'],
})
export class GalleryFormComponent {
  galleryTypes = ['Residential', 'Commercial', 'Land', 'Other'];
  galleryType = '';
  order: number | null = null;
  selectedFiles: File[] = [];

  @Input() mode: 'create' = 'create';
  @Output() close = new EventEmitter<void>();
  @Output() saved = new EventEmitter<void>();

  constructor(private galleryService: GalleryService) {}

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.selectedFiles = input.files ? Array.from(input.files) : [];
  }

  saveGallery() {
    if (!this.galleryType) {
      this.galleryService.showError('Please select a gallery type.');
      return;
    }

    if (!this.selectedFiles.length) {
      this.galleryService.showError('Please select at least one image.');
      return;
    }

    if (this.order === null || Number.isNaN(this.order) || this.order < 0) {
      this.galleryService.showError('Please enter a valid order.');
      return;
    }

    const formData = new FormData();
    formData.append('type', this.galleryType);
    formData.append('order', String(this.order));
    for (const file of this.selectedFiles) {
      formData.append('images', file);
    }

    this.galleryService.createGallery(formData).subscribe({
      next: (response) => {
        this.galleryService.showSuccess(
          response || 'Gallery items created successfully'
        );
        this.resetForm();
        this.saved.emit();
      },
      error: (error) => {
        this.galleryService.showError(
          `Failed to create gallery item: ${error.message || 'Unknown error'}`
        );
        console.error(error);
      },
    });
  }

  resetForm() {
    this.galleryType = '';
    this.order = null;
    this.selectedFiles = [];
  }

  closeModal() {
    this.close.emit();
  }
}
