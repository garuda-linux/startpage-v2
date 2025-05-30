import type { MenuBarItems, SearchEngineEntry, ServiceLinks } from '../types';
import type { AvailableJokeSources } from '../jokes/jokes';
import type { AppTheme } from '../theme';
import type { AutocompleteProvider } from '../../../config';

export interface AppSettings {
  activeJoke: AvailableJokeSources;
  activeSearchEngine: string;
  activeTheme: AppTheme;
  avatarEnabled: boolean;
  avatarUrl: string;
  autocompleteProvider: AutocompleteProvider;
  autoGridCols: boolean;
  blurBackground: boolean;
  blurStrength: 1 | 2 | 3 | 4;
  corsProxy: string;
  customLinks: ServiceLinks;
  customMenuLinks: MenuBarItems;
  customTitle: string;
  defaultLinks: boolean;
  darkMode: boolean;
  fitWallpaper: boolean;
  gridCols: number;
  jokesEnabled: boolean;
  language: string;
  languageChanged: boolean;
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
