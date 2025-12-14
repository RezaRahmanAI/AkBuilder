import { Component } from '@angular/core';
import { BlogFormComponent } from "../../features/blogs/blog-form/blog-form.component";
import { BlogListComponent } from "./blog-list/blog-list.component";
import { PageHeroComponent } from '../../components/page-hero/page-hero.component';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [PageHeroComponent, BlogFormComponent, BlogListComponent],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css'
})
export class BlogComponent {

}
