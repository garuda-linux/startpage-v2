import { computed, DOCUMENT, inject, Injectable, signal } from '@angular/core';
import type { AppSettings } from './interfaces';
import { Title } from '@angular/platform-browser';
import { menubarItems, serviceLinks } from '../../../config';
import { usePreset } from '@openng/optimus-ui-themes';
import { type AppTheme, backgroundColors, loadThemePreset, scrollbarColors } from '../theme';
import { browserUses24h } from '../functions';

import { TranslocoService } from '@jsverse/transloco';
import { firstValueFrom } from 'rxjs';

/**
 * Bump when saved settings need a one-time migration in main.ts
 */
export const SETTINGS_VERSION = 3;

export const DEFAULT_LOGO = 'assets/garuda-purple.svg';

/**
 * Bump whenever translation files gain or change keys, to invalidate cached translations
 */
export const TRANSLATION_VERSION = 13;

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  defaultSettings: AppSettings = {
    activeJoke: 'dev-excuses',
    activeSearchEngine: 'searxng-privau',
    activeTheme: 'Catppuccin Mocha/Latte Aura',
    avatarEnabled: true,
    avatarUrl: '',
    autocompleteProvider: 'none',
    autoGridCols: true,
    blurBackground: false,
    blurStrength: 1,
    clock24h: browserUses24h(),
    clockStyle: 'compact',
    corsProxy: '',
    customLinks: serviceLinks,
    customMenuLinks: menubarItems,
    customTitle: '',
    defaultLinks: true,
    darkMode: true,
    fitWallpaper: true,
    gridCols: 3,
    jokesEnabled: true,
    language: 'en',
    languageChanged: false,
    logo: DEFAULT_LOGO,
    logoStyle: 'large',
    logoUrl: '',
    motion: 'full',
    newsSource: 'garuda',
    openInNewTab: true,
    panelBlur: 2,
    rssTitle: '',
    rssUrl: '',
    searchEngineName: '',
    searchEngineUrl: '',
    searchEngines: [],
    settingsVersion: SETTINGS_VERSION,
    showClock: true,
    showGreeting: true,
    showLinkLabels: true,
    showLogo: true,
    showNews: true,
    tileDensity: 'comfortable',
    translationVersion: TRANSLATION_VERSION,
    username: '',
    wallpaper: 'none',
    wallpaperUrl: '',
    welcomeText: '',
  };

  initialized = signal<boolean>(false);
  settings = signal<AppSettings>(this.defaultSettings);

  readonly logoSource = computed<string | null>(() => {
    const { logo, logoUrl } = this.settings();
    if (logo === 'none') return null;
    if (logo === 'custom' && logoUrl) return logoUrl;
    // Unknown or empty values (e.g. older "default", or "custom" without an image) fall back
    return logo && logo !== 'custom' && logo !== 'default' ? logo : DEFAULT_LOGO;
  });

  private readonly document = inject(DOCUMENT);
  private readonly title = inject(Title);
  private readonly translocoService = inject(TranslocoService);

  constructor() {
    this.initStore().then((pendingConfigUpdate) => {
      if (pendingConfigUpdate) {
        this.settings.update((prev) => ({ ...prev, ...pendingConfigUpdate }));
      }
      this.initialized.set(true);
    });

    if (!this.settings().languageChanged) {
      const lang = navigator.language.split('-')[0];
      if ((this.translocoService.getAvailableLangs() as string[]).includes(lang)) {
        this.translocoService.setActiveLang(lang);
      }
    } else {
      this.translocoService.setActiveLang(this.settings().language);
    }
  }

  updateConfig(key: string, value: any, write = true): void {
    this.settings.update((prev: AppSettings) => ({ ...prev, [key]: value }));
    if (write) localStorage.setItem('settings', JSON.stringify(this.settings()));
    void this.syncSetting(key, value);
  }

  initConfig() {
    for (const key of Object.keys(this.settings())) {
      const value = this.settings()[key];
      void this.syncSetting(key, value);
    }
  }

  async restoreSettings(file: File): Promise<void> {
    const buffer: ArrayBuffer = await file.arrayBuffer();
    const blob: Blob = new Blob([buffer], { type: 'application/json' });
    const content: string = await blob.text();

    try {
      const settings = JSON.parse(content) as Partial<AppSettings>;
      this.iterateSettings(settings);
      localStorage.setItem('settings', JSON.stringify(settings));
    } catch (error) {
      console.error('Error parsing settings file:', error);
    }
  }

  resetSettings(): void {
    const settings = this.defaultSettings as { [key: string]: any };

    localStorage.clear();
    this.iterateSettings(settings);
  }

  private iterateSettings(settings: { [key: string]: unknown }) {
    for (const key of Object.keys(settings)) {
      if (Object.prototype.hasOwnProperty.call(this.settings(), key)) {
        this.updateConfig(key, settings[key]);
      } else {
        console.warn(`Key "${key}" not found in settings, ignoring`);
      }
    }
  }

  /**
   * Saved settings from localStorage, or an empty object when none are stored or they fail to parse
   */
  private async initStore(): Promise<Partial<AppSettings>> {
    const savedSettings: string | null = localStorage.getItem('settings');
    if (!savedSettings) return {};
    try {
      return JSON.parse(savedSettings);
    } catch (err: any) {
      console.error('Error parsing settings:', err);
      return {};
    }
  }

  private async syncSetting(key: string, value: any) {
    switch (key) {
      case 'customTitle': {
        if (!this.settings().customTitle) {
          await firstValueFrom(this.translocoService.load(this.settings().language));
          this.title.setTitle(this.translocoService.translate('menu.defaultTitle'));
        } else {
          this.title.setTitle(value);
        }
        break;
      }
      case 'activeTheme': {
        await this.applyTheme(value);
        break;
      }
      case 'darkMode': {
        this.handleMiscColors(value as boolean);
        break;
      }
      case 'language': {
        this.translocoService.setActiveLang(value);
        break;
      }
      case 'panelBlur': {
        this.document.documentElement.style.setProperty('--sp-glass-blur', `blur(${Number(value) || 0}px)`);
        break;
      }
      case 'motion': {
        this.document.documentElement.dataset['motion'] = value;
        break;
      }
    }
  }

  private themeRequest = 0;

  /**
   * Load and apply a theme preset. Presets are separate chunks, so only the chosen one is
   * downloaded. When themes are switched quickly, only the most recent pick is applied.
   */
  async applyTheme(theme: string): Promise<void> {
    const request = ++this.themeRequest;
    const preset = await loadThemePreset(theme);
    if (request !== this.themeRequest) return;
    usePreset(preset);
    this.handleMiscColors(this.settings().darkMode);
  }

  /**
   * Sets background and scrollbar colors, as well as dark mode
   */
  private handleMiscColors(value: boolean) {
    const activeTheme: AppTheme = this.settings().activeTheme;

    let scrollbarColor: string;
    let backgroundColor: string;

    if (activeTheme.includes('Catppuccin')) {
      const flavors = activeTheme.includes('Mocha') ? 'primary' : 'alt';

      if (value) {
        if (flavors === 'primary') {
          scrollbarColor = scrollbarColors.primary.dark;
          backgroundColor = backgroundColors.primary.dark;
        } else {
          scrollbarColor = scrollbarColors.alt.dark;
          backgroundColor = backgroundColors.alt.dark;
        }
      } else {
        if (flavors === 'primary') {
          scrollbarColor = scrollbarColors.primary.light;
          backgroundColor = backgroundColors.primary.light;
        } else {
          scrollbarColor = scrollbarColors.alt.light;
          backgroundColor = backgroundColors.alt.light;
        }
      }
    } else if (activeTheme.includes('Dr460nized')) {
      scrollbarColor = value ? scrollbarColors.dr460nized.dark : scrollbarColors.dr460nized.light;
      backgroundColor = value ? backgroundColors.dr460nized.dark : backgroundColors.dr460nized.light;
    } else if (activeTheme.includes('Vo1ded')) {
      if (value) {
        scrollbarColor = scrollbarColors.vo1ded.dark;
        backgroundColor = backgroundColors.vo1ded.dark;
      } else {
        scrollbarColor = scrollbarColors.vo1ded.light;
        backgroundColor = backgroundColors.vo1ded.light;
      }
    }

    this.document.documentElement.classList.toggle('p-dark', value);
    this.document.documentElement.style.backgroundColor = backgroundColor!;
    // Native controls, scrollbars and the mobile browser chrome follow the active theme
    this.document.documentElement.style.colorScheme = value ? 'dark' : 'light';
    // Theme presets leave some surfaces dark in light mode. Expose the real base colour per mode
    this.document.documentElement.style.setProperty('--sp-base', backgroundColor!);
    this.document.querySelector('meta[name="theme-color"]')?.setAttribute('content', backgroundColor!);
    this.document.documentElement.style.scrollbarColor = scrollbarColor!;
  }
}
