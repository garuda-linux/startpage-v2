import { provideHttpClient } from '@angular/common/http';
import {
  type ApplicationConfig,
  inject,
  isDevMode,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter, Router, withViewTransitions } from '@angular/router';
import { provideGarudaNG } from '@garudalinux/core';
import { APP_CONFIG } from '../environments/app-config.token';
import { environment } from '../environments/environment.dev';
import { routes } from './app.routes';
import { TranslocoHttpLoader } from './transloco-loader';
import { provideTransloco } from '@jsverse/transloco';
import { ConfigService } from './config/config.service';
import { provideTranslocoPersistTranslations } from '@jsverse/transloco-persist-translations';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideGarudaNG(
      { font: 'InterVariable' },
      {
        theme: {
          options: {
            darkModeSelector: '.p-dark',
          },
        },
        ripple: true,
        inputStyle: 'outlined',
      },
    ),
    provideRouter(
      routes,
      withViewTransitions({
        skipInitialTransition: true,
        onViewTransitionCreated: ({ transition }) => {
          const router = inject(Router);
          try {
            const nav = router.currentNavigation();
            const info = nav?.extras?.info as any;

            if (info?.disableViewTransition) {
              const style = document.createElement('style');
              style.id = 'skip-transition';
              style.textContent = '* { view-transition-name: none !important; }';
              document.head.appendChild(style);

              transition.finished.finally(() => {
                const el = document.getElementById('skip-transition');
                if (el) el.remove();
                document.body.classList.remove('is-transitioning');
              });
            } else {
              transition.finished.finally(() => {
                document.body.classList.remove('is-transitioning');
              });
            }
          } catch {
            // Ignore parse errors, let transition proceed
          }
        },
      }),
    ),
    provideZonelessChangeDetection(),
    provideHttpClient(),
    provideAppInitializer(async () => {
      const configService = inject(ConfigService);
      while (!configService.initialized()) {
        await new Promise<void>((resolve) => {
          setTimeout(() => resolve(), 0);
        });
      }
    }),
    provideTransloco({
      config: {
        availableLangs: environment.availableLanguages,
        defaultLang: environment.defaultLanguage,
        fallbackLang: environment.defaultLanguage,
        missingHandler: {
          useFallbackTranslation: true,
        },
        prodMode: !isDevMode(),
        reRenderOnLangChange: true,
      },
    }),
    provideTranslocoPersistTranslations({
      loader: TranslocoHttpLoader,
      storage: { useValue: localStorage },
      storageKey: 'translations',
      ttl: 86_400,
    }),
    { provide: APP_CONFIG, useValue: environment },
  ],
};
