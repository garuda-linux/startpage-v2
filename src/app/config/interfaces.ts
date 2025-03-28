import type { MenuBarItems, SearchEngineEntry, ServiceLinks } from '../types';
import type { AvailableJokeSources } from '../jokes/jokes';
import { AppTheme } from '../theme';

export interface AppSettings {
  activeJoke: AvailableJokeSources;
  activeSearchEngine: string;
  activeTheme: AppTheme;
  avatarEnabled: boolean;
  avatarUrl: string;
  blurBackground: boolean;
  customLinks: ServiceLinks;
  customMenuLinks: MenuBarItems;
  customTitle: string;
  defaultLinks: boolean;
  darkMode: boolean;
  fitWallpaper: boolean;
  jokesEnabled: boolean;
  language: string;
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
