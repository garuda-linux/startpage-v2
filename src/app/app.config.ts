import { provideHttpClient } from '@angular/common/http';
import {
  type ApplicationConfig,
  inject,
  isDevMode,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter, Router, withInMemoryScrolling, withViewTransitions } from '@angular/router';
import { provideGarudaNG } from '@garudalinux/core/config';
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
      { font: "'Inter Variable', system-ui, sans-serif" },
      {
        theme: {
          options: {
            darkModeSelector: '.p-dark',
          },
        },
        ripple: false,
        // Overlays render at body level: inside a frosted card they could only blur the card itself
        overlayAppendTo: 'body',
        inputStyle: 'outlined',
      },
    ),
    provideRouter(
      routes,
      withInMemoryScrolling({ anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled' }),
      withViewTransitions({
        skipInitialTransition: true,
        onViewTransitionCreated: ({ transition }) => {
          const router = inject(Router);
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
      // The active preset is a lazy chunk: load it before the first render so nothing paints unstyled
      await configService.applyTheme(configService.settings().activeTheme);
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
    }),
    { provide: APP_CONFIG, useValue: environment },
  ],
};
