import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { SETTINGS_VERSION, TRANSLATION_VERSION } from './app/config/config.service';

/**
 * Drop persisted translations when they are older than this build's strings.
 * Done before bootstrap so the loader never serves stale keys for a visit.
 */
try {
  const settings = JSON.parse(localStorage.getItem('settings') ?? '{}');
  const version = settings.settingsVersion ?? 0;
  if (version < SETTINGS_VERSION) {
    // v1: development builds saved panelBlur 32 and showLogo false as defaults. Restore the real defaults
    if (version < 1) {
      if (settings.panelBlur === 32) settings.panelBlur = 2;
      settings.showLogo = true;
    }
    // v2: pt-br was offered without a translation file
    if (settings.language === 'pt-br') settings.language = 'pt';
    settings.settingsVersion = SETTINGS_VERSION;
    if (Object.keys(settings).length > 1) localStorage.setItem('settings', JSON.stringify(settings));
  }
  if ((settings.translationVersion ?? 0) < TRANSLATION_VERSION) {
    localStorage.removeItem('translations');
    localStorage.removeItem('translations/timestamp');
    localStorage.setItem('settings', JSON.stringify({ ...settings, translationVersion: TRANSLATION_VERSION }));
  }
} catch {
  // Corrupt storage is handled by ConfigService, nothing to clean up here
}

bootstrapApplication(AppComponent, appConfig).catch((err) => console.error(err));
