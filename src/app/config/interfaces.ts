import type { SearchEngineEntry, ServiceLinks } from '../types';

export interface AppSettings {
  jokesEnabled: boolean;
  defaultLinks: boolean;
  customLinks: ServiceLinks;
  fitWallpaper: boolean;
  blurBackground: boolean;
  customTitle: string;
  welcomeText: string;
  logoUrl: string;
  logo: string;
  username: string;
  searchEngines: SearchEngineEntry[];
  searchEngineUrl: string;
  searchEngineName: string;
  activeSearchEngine: string;
  wallpaper: string;
  wallpaperUrl: string;
  [key: string]: any;
}
