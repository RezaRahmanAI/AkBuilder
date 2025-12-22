import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidePanelComponent } from '../side-panel/side-panel.component';
import { SidePanelService } from '../../services/sidepanel.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, SidePanelComponent, RouterLink],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  constructor(public sidePanel: SidePanelService) {}

  @HostListener('document:click', ['$event'])
  handleClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (
      !target.closest('.side-panel') &&
      !target.closest('[data-menu-trigger]') &&
      !target.closest('.carousel') &&
      !target.closest('#splide01') &&
      !target.closest('.next-splide') &&
      !target.closest('.prev-splide') &&
      !target.closest('#next') &&
      !target.closest('#prev')
    ) {
      this.sidePanel.close();
    }
  }
}
