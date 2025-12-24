import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { AboutUs } from '../../../models/model';
import { AppStore } from '../../../store/app.store';

@Injectable({
  providedIn: 'root',
})
export class AboutUsService {
  constructor(private toastr: ToastrService, private store: AppStore) {}

  getAboutUs(): Observable<AboutUs[]> {
    return of(this.store.aboutPage().aboutEntries);
  }

  createAboutUs(aboutUs: AboutUs): Observable<string> {
    this.store.createAboutEntry(aboutUs);
    return of('About Us created successfully');
  }

  editAboutUs(aboutUs: AboutUs): Observable<string> {
    this.store.updateAboutEntry(aboutUs);
    return of('About Us updated successfully');
  }

  deleteAboutUs(id: string): Observable<string> {
    this.store.deleteAboutEntry(id);
    return of('About Us deleted successfully');
  }

  showSuccess(message: string) {
    this.toastr.success(message, '', {
      positionClass: 'toast-top-right',
      timeOut: 5000,
      closeButton: true,
    });
  }

  showError(message: string) {
    this.toastr.error(message, '', {
      positionClass: 'toast-top-right',
      timeOut: 5000,
      closeButton: true,
    });
  }
}
