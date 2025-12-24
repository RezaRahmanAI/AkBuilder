import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppStore } from '../../store/app.store';

@Component({
  selector: 'app-floating-social',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './floating-social.component.html',
  styleUrls: ['./floating-social.component.css'],
})
export class FloatingSocialComponent {
  isOpen = false;
  isSpinning = false;
  private readonly store = inject(AppStore);
  readonly settings = this.store.settings;

  toggleSocialIcons(): void {
    this.isSpinning = true;
    setTimeout(() => {
      this.isOpen = !this.isOpen;
      this.isSpinning = false;
    }, 300); // wait for spin before toggling
  }
}
