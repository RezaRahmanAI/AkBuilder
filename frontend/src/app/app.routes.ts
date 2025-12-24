import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ProjectsComponent } from './pages/project/project.component';
import { ProjectDetailsComponent } from './pages/project-details/project-details.component';
import { ContactComponent } from './pages/contact/contact.component';
import { BlogComponent } from './pages/blog/blog.component';
import { BlogDetailsComponent } from './pages/blog-details/blog-details.component';

import { DashboardComponent } from './features/dashboard/dashboard.component';
import { AuthGuard } from './pipes/auth-guard';
import { DashboardHomeComponent } from './features/dashboard/dashboard-home/dashboard-home.component';
import { ProjectsIndexComponent } from './features/projects/projects-index/projects-index.component';
import { ProjectCreateComponent } from './features/projects/project-create/project-create.component';
import { ProjectEditComponent } from './features/projects/project-edit/project-edit.component';
import { ProjectFeaturesComponent } from './features/projects/project-features/project-features.component';
import { TeamsIndexComponent } from './features/teams/teams-index/teams-index.component';
import { ClientComponent } from './features/client/client.component';
import { BlogsIndexComponent } from './features/blogs/blogs-index/blogs-index.component';
import { OffersIndexComponent } from './features/offers/offers-index/offers-index.component';
import { AboutUsIndexComponent } from './features/about-us/about-us-index/about-us-index.component';
import { FaqComponent } from './features/faq/faq.component';
import { TestimonialsIndexComponent } from './features/testimonials/testimonials-index/testimonials-index.component';
import { AboutContentComponent } from './features/site-content/about-content.component';
import { SiteSettingsComponent } from './features/site-settings/site-settings.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: {
      title: 'AK Builders Ltd | Trusted Real Estate in Rajshahi, Bangladesh',
      description:
        'AK Builders Ltd is a premier real estate developer in Rajshahi, Bangladesh, offering quality residential, commercial and mixed-use projects. Discover your dream home with us.',
    },
  },
  {
    path: 'home',
    component: HomeComponent,
    data: {
      title: 'AK Builders Ltd | Trusted Real Estate in Rajshahi, Bangladesh',
      description:
        'AK Builders Ltd is a premier real estate developer in Rajshahi, Bangladesh, offering quality residential, commercial and mixed-use projects. Discover your dream home with us.',
    },
  },
  {
    path: 'about',
    component: AboutComponent,
    data: {
      title: 'About AK Builders Ltd | Real Estate Company in Rajshahi',
      description:
        'Learn about AK Builders Ltd — our vision, mission, team and commitment to quality construction in Rajshahi. Building sustainable & trusted real estate since',
    },
  },
  {
    path: 'blogs',
    component: BlogComponent,
    data: {
      title:
        'AK Builders Blog | Real Estate Tips & Property Insights in Bangladesh',
      description:
        'Stay updated with AK Builders’ latest real estate tips, property investment guides, housing trends, and construction news in Rajshahi and across Bangladesh.',
    },
  },
  {
    path: 'blogs/:id',
    component: BlogDetailsComponent,
    data: {
      title: 'Blog Details | AK Builders Ltd',
      description:
        'Read detailed insights on real estate, property investment, and construction trends from AK Builders in Rajshahi and Bangladesh.',
    },
  },
  {
    path: 'projects',
    component: ProjectsComponent,
    data: {
      title: 'Our Projects | AK Builders Ltd — Rajshahi Properties',
      description:
        'Explore the latest residential, commercial, and mixed-use projects by AK Builders in Rajshahi. View project features, floor plans & pricing.',
    },
  },
  {
    path: 'projectdetails/:id',
    component: ProjectDetailsComponent,
    data: {
      title: 'Project Details | AK Builders Ltd',
      description:
        'Discover detailed information, features, floor plans, and pricing of AK Builders’ real estate projects in Rajshahi.',
    },
  },
  {
    path: 'contact',
    component: ContactComponent,
    data: {
      title: 'Contact AK Builders Ltd | Get in Touch — Rajshahi, BD',
      description:
        'Need more info or want to visit a property? Contact AK Builders Ltd in Rajshahi. Call us, email us or visit our office to discuss your real estate needs.',
    },
  },
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: DashboardHomeComponent },
      { path: 'teams', component: TeamsIndexComponent },
      { path: 'clients', component: ClientComponent },
      { path: 'testimonials', component: TestimonialsIndexComponent },
      { path: 'blogs', component: BlogsIndexComponent },
      { path: 'offers', component: OffersIndexComponent },
      { path: 'about-us', component: AboutUsIndexComponent },
      { path: 'about-content', component: AboutContentComponent },
      { path: 'faq', component: FaqComponent },
      { path: 'settings', component: SiteSettingsComponent },
      {
        path: 'projects',
        children: [
          { path: '', component: ProjectsIndexComponent },
          { path: 'create', component: ProjectCreateComponent },
          { path: ':id/edit', component: ProjectEditComponent },
          { path: ':id/features', component: ProjectFeaturesComponent },
        ],
      },
    ],
  },
];
