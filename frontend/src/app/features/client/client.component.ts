import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactSubmission } from '../../models/model';
import { SiteStoreService } from '../../store/site-store.service';

@Component({
  selector: 'app-client',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './client.component.html',
  styleUrl: './client.component.css',
})
export class ClientComponent {
  private siteStore = inject(SiteStoreService);
  readonly contacts = this.siteStore.contactSubmissions;
  selectedId: string | null = null;

  selectSubmission(id: string): void {
    this.selectedId = id;
  }

  selectedSubmission(): ContactSubmission | undefined {
    if (!this.selectedId) {
      return undefined;
    }
    return this.siteStore.getSubmissionById(this.selectedId);
  }

  deleteSubmission(id: string): void {
    this.siteStore.deleteContactSubmission(id);
    if (this.selectedId === id) {
      this.selectedId = null;
    }
  }
}
