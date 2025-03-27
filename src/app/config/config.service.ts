import { type ElementRef, inject, Injectable, type Renderer2, signal } from '@angular/core';
import type { AppSettings } from './interfaces';
import { Title } from '@angular/platform-browser';
import { WallpaperService } from '../wallpaper/wallpaper.service';
import { menubarItems, serviceLinks } from '../../../config';
import { usePreset } from '@primeng/themes';
import { backgroundColors, scrollbarColors, themes } from '../theme';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  defaultSettings: AppSettings = {
    activeJoke: 'dev-excuses',
    activeSearchEngine: 'searxng-privau',
    activeTheme: 'Catppuccin Mocha/Latte Aura',
    avatarEnabled: true,
    avatarUrl: '/assets/avatars/cat.png',
    blurBackground: false,
    customLinks: serviceLinks,
    customMenuLinks: menubarItems,
    customTitle: "Garuda's Startpage",
    defaultLinks: true,
    darkMode: true,
    fitWallpaper: true,
    jokesEnabled: true,
    logo: 'assets/logos/violet-orange.png',
    logoUrl: 'assets/logos/violet-orange.png',
    searchEngineName: '',
    searchEngineUrl: '',
    searchEngines: [],
    showNews: true,
    translationVersion: 1,
    username: '',
    wallpaper: 'none',
    wallpaperUrl: '',
    welcomeText: '',
  };

  initialized = signal<boolean>(false);
  settings = signal<AppSettings>(this.defaultSettings);

  private readonly document = inject(DOCUMENT);
  private readonly title = inject(Title);
  private readonly wallpaperService = inject(WallpaperService);

  constructor() {
    this.initStore().then((pendingConfigUpdate) => {
      if (pendingConfigUpdate) {
        this.settings.update((prev) => ({ ...prev, ...pendingConfigUpdate }));
      }
      this.initialized.set(true);
    });
  }

  /**
   * Update configuration value in both the service and the store.
   * @param key The configuration key to update.
   * @param value The new value for the configuration key.
   * @param renderer The renderer to use for DOM manipulation.
   * @param el The element reference to the DOM element.
   * @param write Whether to write the value to local storage.
   */
  updateConfig(key: string, value: any, renderer?: Renderer2, el?: ElementRef, write = true): void {
    this.settings.update((prev: AppSettings) => ({ ...prev, [key]: value }));
    if (write) localStorage.setItem('settings', JSON.stringify(this.settings()));
    this.syncSetting(key, value, renderer, el);
  }

  /**
   * Initializes the configuration settings, specifically here because
   * we have renderer and element references.
   * @param renderer The renderer to use for DOM manipulation.
   * @param el The element reference to the DOM element.
   */
  initConfig(renderer: Renderer2, el: ElementRef) {
    for (const key of Object.keys(this.settings())) {
      const value = this.settings()[key];
      this.syncSetting(key, value, renderer, el);
    }
  }

  /**
   * Restores settings from a file.
   * @param file The file containing the settings to restore.
   * @param renderer The renderer to use for DOM manipulation.
   * @param el The element reference to the DOM element.
   */
  async restoreSettings(file: File, renderer: Renderer2, el: ElementRef): Promise<void> {
    const buffer: ArrayBuffer = await file.arrayBuffer();
    const blob: Blob = new Blob([buffer], { type: 'application/json' });
    const content: string = await blob.text();

    try {
      const settings = JSON.parse(content) as Partial<AppSettings>;
      this.iterateSettings(settings, renderer, el);
      localStorage.setItem('settings', JSON.stringify(settings));
    } catch (error) {
      console.error('Error parsing settings file:', error);
    }
  }

  /**
   * Resets the settings to their default values.
   * @param renderer The renderer to use for DOM manipulation.
   * @param el The element reference to the DOM element.
   */
  resetSettings(renderer: Renderer2, el: ElementRef): void {
    const settings = this.defaultSettings as { [key: string]: any };
    this.iterateSettings(settings, renderer, el);
  }

  /**
   * Iterates through the settings and updates the configuration.
   * @param settings The settings object containing key-value pairs to update.
   * @param renderer The renderer to use for DOM manipulation.
   * @param el The element reference to the DOM element.
   * @private
   */
  private iterateSettings(settings: { [key: string]: any }, renderer?: Renderer2, el?: ElementRef) {
    for (const key of Object.keys(settings)) {
      if (Object.prototype.hasOwnProperty.call(this.settings(), key)) {
        this.updateConfig(key, settings[key], renderer, el);
      } else {
        console.warn(`Key "${key}" not found in settings, ignoring`);
      }
    }
  }

  /**
   * Initializes the settings signal, overwriting the default settings with saved ones.
   * @returns A promise that resolves to the saved settings or an empty object if none are found.
   * @private
   */
  private async initStore(): Promise<Partial<AppSettings>> {
    const settings: { [key: string]: any } = {};
    const savedSettings: string | null = localStorage.getItem('settings');
    if (savedSettings) {
      try {
        return JSON.parse(savedSettings);
      } catch (err: any) {
        console.error('Error parsing settings:', err);
        return {};
      }
    }

    return settings;
  }

  /**
   * Synchronizes a specific setting with the current state.
   * @param key The configuration key to synchronize.
   * @param value The new value for the configuration key.
   * @param renderer The renderer to use for DOM manipulation.
   * @param el The element reference to the DOM element.
   * @private
   */
  private syncSetting(key: string, value: any, renderer?: Renderer2, el?: ElementRef) {
    switch (key) {
      case 'customTitle': {
        this.title.setTitle(value);
        break;
      }
      case 'wallpaper': {
        if (renderer && el) {
          this.wallpaperService.loadWallpaper(value, renderer, el, this.settings().wallpaperUrl);
        }
        break;
      }
      case 'fitWallpaper':
      case 'blurBackground': {
        if (renderer && el) {
          this.wallpaperService.applyWallpaperStyle(key, value, renderer, el);
        }
        break;
      }
      case 'activeTheme': {
        usePreset(themes[value]);
        break;
      }
      case 'darkMode': {
        const flavors = this.settings().activeTheme.includes('Mocha') ? 'primary' : 'alt';
        if (value === true) {
          this.document.documentElement.classList.add('p-dark');
          if (flavors === 'primary') {
            this.document.documentElement.style.scrollbarColor = scrollbarColors.primary.dark;
            this.document.documentElement.style.backgroundColor = backgroundColors.primary.dark;
          } else {
            this.document.documentElement.style.scrollbarColor = scrollbarColors.alt.dark;
            this.document.documentElement.style.backgroundColor = backgroundColors.alt.dark;
          }
        } else {
          this.document.documentElement.classList.remove('p-dark');
          if (flavors === 'primary') {
            this.document.documentElement.style.scrollbarColor = scrollbarColors.primary.light;
            this.document.documentElement.style.backgroundColor = backgroundColors.primary.light;
          } else {
            this.document.documentElement.style.scrollbarColor = scrollbarColors.alt.light;
            this.document.documentElement.style.backgroundColor = backgroundColors.alt.light;
          }
        }
      }
    }
  }
}
