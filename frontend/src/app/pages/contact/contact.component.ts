import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { SiteStoreService } from '../../store/site-store.service';

interface ContactFormState {
  name: string;
  phone: string;
  email: string;
  interest: string;
  message: string;
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent {
  private siteStore = inject(SiteStoreService);
  readonly contactPage = this.siteStore.contactPage;
  readonly settings = this.siteStore.settings;

  form: ContactFormState = {
    name: '',
    phone: '',
    email: '',
    interest: '',
    message: '',
  };

  isSuccess = false;
  errorMessage = '';

  constructor() {
    const firstOption = this.contactPage().interestOptions?.[0] ?? '';
    this.form.interest = firstOption;
  }

  submit(formRef: NgForm): void {
    this.errorMessage = '';
    this.isSuccess = false;

    if (formRef.invalid) {
      this.errorMessage = 'Please complete the required fields before sending.';
      return;
    }

    this.siteStore.addContactSubmission({
      name: this.form.name.trim(),
      email: this.form.email.trim(),
      phone: this.form.phone.trim(),
      interest: this.form.interest.trim(),
      message: this.form.message.trim(),
    });

    this.isSuccess = true;
    formRef.resetForm({
      name: '',
      phone: '',
      email: '',
      interest: this.contactPage().interestOptions?.[0] ?? '',
      message: '',
    });
  }
}
