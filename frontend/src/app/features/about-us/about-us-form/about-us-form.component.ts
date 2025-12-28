import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AboutUsService } from '../services/about-us.service';
import { CommonModule } from '@angular/common';
import { AboutUs } from '../../../models/model';

@Component({
  selector: 'app-about-us-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './about-us-form.component.html',
  styleUrls: ['./about-us-form.component.css'],
})
export class AboutUsFormComponent {
  @Input() set aboutUs(value: AboutUs | null) {
    this._aboutUs = value ? { ...value } : { ...this.defaultAboutUs };
  }
  @Input() mode: 'create' | 'edit' = 'create';
  @Output() close = new EventEmitter<void>();
  @Output() saved = new EventEmitter<void>();

  private defaultAboutUs: AboutUs = {
    id: '',
    history: '',
    vision: '',
    visionImage: '',
    mission: '',
    missionImage: '',
  };

  _aboutUs: AboutUs = { ...this.defaultAboutUs };

  constructor(private aboutUsService: AboutUsService) {}

  saveAboutUs() {
    const serviceMethod =
      this.mode === 'create'
        ? this.aboutUsService.createAboutUs(this._aboutUs)
        : this.aboutUsService.editAboutUs(this._aboutUs);
    serviceMethod.subscribe({
      next: (response) => {
        this.aboutUsService.showSuccess(
          response ||
            `About Us ${
              this.mode === 'create' ? 'created' : 'updated'
            } successfully`
        );
        this.saved.emit();
      },
      error: (error) => {
        this.aboutUsService.showError(
          `Failed to ${
            this.mode === 'create' ? 'create' : 'update'
          } About Us: ${error.message || 'Unknown error'}`
        );
        console.error('API error:', error);
      },
    });
  }

  closeModal() {
    this.close.emit();
  }
}
