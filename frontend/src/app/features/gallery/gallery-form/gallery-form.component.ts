import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Gallery } from '../../../models/model';
import { GalleryService } from '../../../services/gallery.service';

@Component({
  selector: 'app-gallery-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './gallery-form.component.html',
  styleUrls: ['./gallery-form.component.css'],
})
export class GalleryFormComponent {
  private defaultGallery: Gallery = {
    id: '',
    title: '',
    category: '',
    location: '',
    image: '',
    isActive: true,
    order: 0,
  };

  _gallery: Gallery = this.defaultGallery;
  selectedFile: File | null = null;

  @Input() set gallery(value: Gallery | null) {
    this._gallery = value ? { ...value } : { ...this.defaultGallery };
  }
  @Input() mode: 'create' | 'edit' = 'create';
  @Output() close = new EventEmitter<void>();
  @Output() saved = new EventEmitter<void>();

  constructor(private galleryService: GalleryService) {}

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  saveGallery() {
    const formData = new FormData();
    formData.append('title', this._gallery.title || '');
    formData.append('category', this._gallery.category || '');
    formData.append('location', this._gallery.location || '');
    formData.append('order', String(this._gallery.order ?? 0));
    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }
    if (this.mode === 'edit') {
      formData.append('id', this._gallery.id || '');
    }

    const serviceMethod =
      this.mode === 'create'
        ? this.galleryService.createGallery(formData)
        : this.galleryService.editGallery(formData);
    serviceMethod.subscribe({
      next: (response) => {
        this.galleryService.showSuccess(
          response ||
            `Gallery item ${
              this.mode === 'create' ? 'created' : 'updated'
            } successfully`
        );
        this.saved.emit();
      },
      error: (error) => {
        this.galleryService.showError(
          `Failed to ${this.mode === 'create' ? 'create' : 'update'} gallery item: ${
            error.message || 'Unknown error'
          }`
        );
        console.error(error);
      },
    });
  }

  closeModal() {
    this.close.emit();
  }
}
