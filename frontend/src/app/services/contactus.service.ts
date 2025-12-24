// src/app/services/contactus.service.ts
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Contactus } from '../models/model';
import { AppStore } from '../store/app.store';

@Injectable({
  providedIn: 'root',
})
export class ContactusService {
  constructor(private store: AppStore) {}

  // Get all contact submissions with pagination
  getAll(page: number = 1, pageSize: number = 10): Observable<Contactus[]> {
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const submissions = this.store
      .contactSubmissions()
      .slice(start, end)
      .map((item) => ({
        ...item,
        date: item.date ? new Date(item.date) : undefined,
      }));
    return of(submissions);
  }

  // Create a new contact submission
  create(contact: Contactus): Observable<string> {
    this.store.addContactSubmission(contact);
    return of('Form Successfully Submitted');
  }

  delete(id: string): Observable<string> {
    this.store.deleteContactSubmission(id);
    return of('Contact submission deleted');
  }
}
