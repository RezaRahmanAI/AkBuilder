import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SidePanelService {
  open$ = signal(false);

  toggle() {
    this.open$.set(!this.open$());
  }

  open() {
    this.open$.set(true);
  }

  close() {
    this.open$.set(false);
  }
}
