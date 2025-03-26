import type { MenuBarItems, SearchEngineEntry, ServiceLinks } from '../types';

export interface AppSettings {
  jokesEnabled: boolean;
  defaultLinks: boolean;
  customLinks: ServiceLinks;
  customMenuLinks: MenuBarItems;
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
  showNews: boolean;
  activeSearchEngine: string;
  wallpaper: string;
  wallpaperUrl: string;

  [key: string]: any;
}
