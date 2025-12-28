import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Faq } from '../models/model';
import { AppStore } from '../store/app.store';

@Injectable({
  providedIn: 'root',
})
export class FaqService {
  constructor(private store: AppStore) {}

  getFaqs(): Observable<Faq[]> {
    return of(this.store.faqs());
  }

  getFaq(id: number): Observable<Faq> {
    return of(this.store.faqs().find((faq) => faq.id === id) as Faq);
  }

  createFaq(faq: Faq): Observable<Faq> {
    return of(this.store.addFaq(faq));
  }

  updateFaq(faq: Faq): Observable<Faq> {
    return of(this.store.updateFaq(faq));
  }

  deleteFaq(id: number): Observable<void> {
    this.store.deleteFaq(id);
    return of(void 0);
  }
}
