import {ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {providePrimeNG} from 'primeng/config';

export const appConfig: ApplicationConfig = {
  providers: [
    providePrimeNG({
      theme: {
        options: {
          cssLayer: {
            name: 'primeng',
            order: 'primeng',
          },
        },
      }
    }),
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
  ]
};
