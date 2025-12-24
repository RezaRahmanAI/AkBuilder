import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppStore } from '../../../store/app.store';

@Component({
  selector: 'app-get-in-touch',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './get-in-touch.component.html',
  styleUrl: './get-in-touch.component.css'
})
export class GetInTouchComponent {
  private readonly store = inject(AppStore);
  readonly settings = this.store.settings;
  readonly contactPage = computed(() => {
    const page = this.store.contactPage();
    const settings = this.store.settings();
    const updatedCards = page.getInTouch.cards.map((card) => {
      if (card.id === 'consultation') {
        return {
          ...card,
          meta: card.meta.map((meta) =>
            meta.label === 'Email'
              ? { ...meta, value: settings.email, url: `mailto:${settings.email}` }
              : meta
          ),
        };
      }
      if (card.id === 'specialist') {
        const phoneValue = settings.phones.join(', ');
        return {
          ...card,
          meta: card.meta.map((meta) =>
            meta.label === 'Phone'
              ? { ...meta, value: phoneValue, url: `tel:${settings.phones[0] ?? ''}` }
              : meta
          ),
        };
      }
      if (card.id === 'studio') {
        return {
          ...card,
          meta: card.meta.map((meta) =>
            meta.label === 'Location'
              ? { ...meta, value: settings.address }
              : meta
          ),
        };
      }
      return card;
    });
    return {
      ...page,
      getInTouch: {
        ...page.getInTouch,
        cards: updatedCards,
      },
    };
  });

  constructor() {}
}
