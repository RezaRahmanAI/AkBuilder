import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ContactusService } from '../../../services/contactus.service';
import { Contactus } from '../../../models/model';
import { AppStore } from '../../../store/app.store';


@Component({
  selector: 'app-contact-info-map',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact-info-map.component.html'
})
export class ContactInfoMapComponent implements OnInit {
  contactForm: FormGroup;
  isMapLoaded = false;
  submitMessage: string | null = null;
  isSubmitting = false;
  showPopup = false;
  mapUrl: SafeResourceUrl;
  private readonly store = inject(AppStore);
  readonly settings = this.store.settings;

  constructor(
    private fb: FormBuilder,
    private contactusService: ContactusService,
    private sanitizer: DomSanitizer
  ) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      subject: ['', [Validators.required, Validators.minLength(3)]],
      message: ['', [Validators.required, Validators.minLength(10)]],
    });
    this.mapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d58842.778249690564!2d89.5270762!3d22.8145538!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ff91b47f842d43%3A0x2e39a7e6f26ea400!2sA.K%20tower!5e0!3m2!1sen!2sbd!4v1767181354117!5m2!1sen!2sbd'
    );
  }

  ngOnInit(): void {}

  readonly contactPage = this.store.contactPage;

  onMapLoad(): void {
    this.isMapLoaded = true;
  }

  onSubmit(): void {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.submitMessage = null;

    const contact: Contactus = this.contactForm.value;

    this.contactusService.create(contact).subscribe({
      next: (response) => {
        this.isSubmitting = false;
        this.submitMessage = response; // e.g., "Form Successfully Submitted"
        this.contactForm.reset();
        this.showPopup = true;
        console.log('Form submitted successfully:', response);
      },
      error: (err) => {
        this.isSubmitting = false;
        this.submitMessage = 'Error submitting form. Please try again.';
        console.error('Submission error:', err);
      },
    });
  }

  isFieldInvalid(field: string): boolean {
    const control = this.contactForm.get(field);
    return !!control && control.invalid && (control.touched || control.dirty);
  }

  closePopup(): void {
    this.showPopup = false;
  }
}
