import { ElementRef, inject, Injectable, Renderer2, signal } from '@angular/core';
import { AppSettings } from './interfaces';
import { Title } from '@angular/platform-browser';
import { serviceLinks } from '../../../config';
import { WallpaperService } from '../wallpaper/wallpaper.service';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  private readonly title = inject(Title);
  private readonly wallpaperService = inject(WallpaperService);

  initialized = signal<boolean>(false);
  settings = signal<AppSettings>({
    jokesEnabled: true,
    customLinks: [],
    customTitle: '',
    defaultLinks: true,
    fitWallpaper: true,
    blurBackground: false,
    username: '',
    welcomeText: '',
    logo: '',
    wallpaper: 'none',
    wallpaperUrl: '',
    logoUrl: '/assets/garuda-purple.svg',
    searchEngines: [],
    searchEngineName: '',
    searchEngineUrl: '',
    activeSearchEngine: 'searxng-privau',
  });

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
}
