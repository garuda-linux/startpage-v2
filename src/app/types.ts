import type { SearchEngine } from '../../config';

export interface MenuBarLink {
  icon: string;
  label: string;
  routerLink?: string;
  url?: string;
  translocoKey: string;
}

export type MenuBarItems = MenuBarLink[];

export interface ContactLink {
  link: string;
  logo: string;
  routerLink?: string;
  subtitle: string;
  title: string;
}

export type ContactLinks = ContactLink[];

export interface ServiceLink {
  icon: string;
  link: string;
  routerLink?: string;
  subtitle: string;
  title: string;
  id?: string;
}

export type ServiceLinks = ServiceLink[];

export interface SearchEngineEntry {
  name: SearchEngine;
  prettyName: string;
  url: string;
}

export type SearchEngineList = SearchEngineEntry[];

export interface WallpaperEntry {
  name: string;
  url: string | null;
}

export type WallpaperList = WallpaperEntry[];

export interface Logo {
  name: string;
  url: string;
}

export type LogoList = Logo[];
