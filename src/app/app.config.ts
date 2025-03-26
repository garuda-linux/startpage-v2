import { provideHttpClient } from '@angular/common/http';
import {
  type ApplicationConfig,
  inject,
  isDevMode,
  provideAppInitializer,
  provideExperimentalZonelessChangeDetection,
} from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { provideGarudaNG } from '@garudalinux/core';
import { APP_CONFIG } from '../environments/app-config.token';
import { environment } from '../environments/environment.dev';
import { routes } from './app.routes';
import { TranslocoHttpLoader } from './transloco-loader';
import { provideTransloco } from '@jsverse/transloco';
import { provideTranslocoPersistLang } from '@jsverse/transloco-persist-lang';
import { ConfigService } from './config/config.service';
import { provideTranslocoPersistTranslations } from '@jsverse/transloco-persist-translations';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimationsAsync(),
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
    provideRouter(routes),
    provideExperimentalZonelessChangeDetection(),
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
    provideTranslocoPersistLang({
      storage: {
        useValue: localStorage,
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
