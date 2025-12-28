import { provideZoneChangeDetection } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { register } from 'swiper/element/bundle';
import 'aos/dist/aos.css';

register();

bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true, runCoalescing: true }),
    ...(appConfig?.providers ?? []),
    provideAnimations(),
    provideHttpClient(),
    provideToastr(),
  ],
}).catch((err) => console.error(err));
