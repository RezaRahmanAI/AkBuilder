import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollService } from '../../services/scroll.service';
import { SidePanelService } from '../../services/sidepanel.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-side-panel',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './side-panel.component.html',
  styleUrls: ['./side-panel.component.css'],
})
export class SidePanelComponent implements OnDestroy {
  constructor(
    public sidePanel: SidePanelService,
    private scrollService: ScrollService,
    private router: Router
  ) {}

  scrollToSection(sectionId: string) {
    this.scrollService.scrollTo(`#${sectionId}`);
    this.sidePanel.close();
  }

  ngOnDestroy() {
    // No subscription to clean up
  }
}
