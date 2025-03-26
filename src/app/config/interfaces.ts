import type { MenuBarItems, SearchEngineEntry, ServiceLinks } from '../types';
import type { AvailableJokeSources } from '../jokes/jokes';

export interface AppSettings {
  activeJoke: AvailableJokeSources;
  activeSearchEngine: string;
  blurBackground: boolean;
  customLinks: ServiceLinks;
  customMenuLinks: MenuBarItems;
  customTitle: string;
  defaultLinks: boolean;
  fitWallpaper: boolean;
  jokesEnabled: boolean;
  logo: string;
  logoUrl: string;
  searchEngineName: string;
  searchEngineUrl: string;
  searchEngines: SearchEngineEntry[];
  showNews: boolean;
  translationVersion: number;
  username: string;
  wallpaper: string;
  wallpaperUrl: string;
  welcomeText: string;

  [key: string]: any;
}
