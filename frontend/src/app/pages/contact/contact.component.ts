import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactHeroComponent } from './contact-hero/contact-hero.component';
import { ContactInfoMapComponent } from './contact-info-map/contact-info-map.component';
import { FaqComponent } from './faq/faq.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    CommonModule,
    ContactHeroComponent,
    ContactInfoMapComponent,
    FaqComponent,
  ],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent {}
