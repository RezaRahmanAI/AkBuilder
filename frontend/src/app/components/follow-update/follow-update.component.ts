import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BlogSlideComponent } from '../blog-slide/blog-slide.component';

@Component({
  selector: 'app-follow-update',
  standalone: true,
  imports: [BlogSlideComponent, RouterModule],
  templateUrl: './follow-update.component.html',
  styleUrl: './follow-update.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FollowUpdateComponent {}
