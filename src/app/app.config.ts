import { provideHttpClient } from '@angular/common/http';
import {
  type ApplicationConfig,
  isDevMode,
  LOCALE_ID,
  provideExperimentalZonelessChangeDetection,
} from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { provideGarudaNG } from '@garudalinux/core';
import { APP_CONFIG } from '../environments/app-config.token';
import { environment } from '../environments/environment.dev';
import { routes } from './app.routes';
import { Catppuccin } from './theme';
import { TranslocoHttpLoader } from './transloco-loader';
import { provideTransloco } from '@jsverse/transloco';
import { provideTranslocoPersistLang } from '@jsverse/transloco-persist-lang';
import { provideTranslocoLocale } from '@jsverse/transloco-locale';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimationsAsync(),
    provideGarudaNG(
      { font: 'InterVariable' },
      {
        theme: {
          preset: Catppuccin,
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
      loader: TranslocoHttpLoader,
    }),
    provideTranslocoLocale({
      langToLocaleMapping: {
        en: 'en-US',
        de: 'de-DE',
      },
    }),
    provideTranslocoPersistLang({
      storage: {
        useValue: localStorage,
      },
    }),
    { provide: APP_CONFIG, useValue: environment },
    { provide: LOCALE_ID, useValue: 'en-GB' },
  ],
};
