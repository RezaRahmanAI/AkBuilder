import { Injectable, NgZone } from '@angular/core';
import { Observable, fromEvent, of } from 'rxjs';
import {
  distinctUntilChanged,
  map,
  shareReplay,
  startWith,
  throttleTime,
} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ScrollService {
  readonly scrollY$: Observable<number>;

  constructor(private zone: NgZone) {
    if (typeof window === 'undefined') {
      this.scrollY$ = of(0);
      return;
    }

    this.scrollY$ = this.zone.runOutsideAngular(() =>
      fromEvent(window, 'scroll', { passive: true }).pipe(
        startWith(window.scrollY || window.pageYOffset || 0),
        map(() => window.scrollY || window.pageYOffset || 0),
        throttleTime(50, undefined, { leading: true, trailing: true }),
        distinctUntilChanged(),
        shareReplay({ bufferSize: 1, refCount: true })
      )
    );
  }

  scrollTo(
    target: number | string | HTMLElement,
    options: ScrollIntoViewOptions & { top?: number } = {}
  ): void {
    if (typeof window === 'undefined') return;

    const top = this.resolveTarget(target);
    const behavior = options.behavior ?? 'smooth';
    window.scrollTo({ top, behavior });
  }

  private resolveTarget(target: number | string | HTMLElement): number {
    if (typeof target === 'number') return target;

    if (typeof target === 'string') {
      const element = document.querySelector(target);
      if (element instanceof HTMLElement) {
        return (
          element.getBoundingClientRect().top +
          (window.scrollY || window.pageYOffset || 0)
        );
      }
      return 0;
    }

    if (target instanceof HTMLElement) {
      return (
        target.getBoundingClientRect().top +
        (window.scrollY || window.pageYOffset || 0)
      );
    }

    return 0;
  }
}
