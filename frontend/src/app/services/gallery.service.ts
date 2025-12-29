import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../environments/environment';
import { Gallery } from '../models/model';

@Injectable({
  providedIn: 'root',
})
export class GalleryService {
  private apiBaseUrl = environment.baseUrl;

  constructor(private http: HttpClient, private toastr: ToastrService) {}

  getGalleries(): Observable<Gallery[]> {
    return this.http.get<Gallery[]>(`${this.apiBaseUrl}/api/gallery`);
  }

  getActiveGalleries(): Observable<Gallery[]> {
    return this.http.get<Gallery[]>(`${this.apiBaseUrl}/api/gallery/active`);
  }

  createGallery(formData: FormData): Observable<string> {
    return this.http.post(`${this.apiBaseUrl}/api/gallery/create`, formData, {
      responseType: 'text',
    });
  }

  editGallery(formData: FormData): Observable<string> {
    return this.http.post(`${this.apiBaseUrl}/api/gallery/edit`, formData, {
      responseType: 'text',
    });
  }

  toggleActiveStatus(id: string, isActive: boolean): Observable<string> {
    return this.http.post(
      `${this.apiBaseUrl}/api/gallery/itemactiveinactive?id=${id}&value=${isActive}`,
      {},
      { responseType: 'text' }
    );
  }

  deleteGallery(id: string): Observable<string> {
    return this.http.post(
      `${this.apiBaseUrl}/api/gallery/delete?id=${id}`,
      {},
      { responseType: 'text' }
    );
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
