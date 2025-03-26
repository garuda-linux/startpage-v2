import { type ElementRef, inject, Injectable, type Renderer2, signal } from '@angular/core';
import type { AppSettings } from './interfaces';
import { Title } from '@angular/platform-browser';
import { serviceLinks } from '../../../config';
import { WallpaperService } from '../wallpaper/wallpaper.service';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  initialized = signal<boolean>(false);
  settings = signal<AppSettings>({
    activeSearchEngine: 'searxng-privau',
    blurBackground: false,
    customLinks: [],
    customTitle: "Garuda's Startpage",
    defaultLinks: true,
    fitWallpaper: true,
    jokesEnabled: true,
    logo: 'assets/logos/violet-orange.png',
    logoUrl: 'assets/logos/violet-orange.png',
    searchEngineName: '',
    searchEngineUrl: '',
    searchEngines: [],
    username: '',
    wallpaper: 'none',
    wallpaperUrl: '',
    welcomeText: '',
  });
  private readonly title = inject(Title);
  private readonly wallpaperService = inject(WallpaperService);

  constructor() {
    this.initStore().then((pendingConfigUpdate) => {
      if (pendingConfigUpdate) {
        this.settings.set({ ...this.settings(), ...pendingConfigUpdate });
      }

      if (this.settings().customLinks.length === 0) {
        this.updateConfig('customLinks', serviceLinks);
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
   */
  updateConfig(key: string, value: any, renderer?: Renderer2, el?: ElementRef): void {
    this.settings.update((prev) => ({ ...prev, [key]: value }));
    localStorage.setItem('settings', JSON.stringify(this.settings()));

    this.syncSetting(key, value, renderer, el);
  }

  /**
   * Initializes the configuration settings.
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
   */
  async restoreSettings(file: File): Promise<void> {
    const buffer: ArrayBuffer = await file.arrayBuffer();
    const blob: Blob = new Blob([buffer], { type: 'application/json' });
    const content: string = await blob.text();

    try {
      const settings = JSON.parse(content) as Partial<AppSettings>;
      for (const key of Object.keys(settings)) {
        if (Object.prototype.hasOwnProperty.call(this.settings(), key)) {
          this.settings.update((prev: AppSettings) => ({ ...prev, [key]: settings[key] }));
        } else {
          console.warn(`Key "${key}" not found in settings, ignoring`);
        }
      }
      localStorage.setItem('settings', JSON.stringify(settings));
    } catch (error) {
      console.error('Error parsing settings file:', error);
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
    }
  }
}
