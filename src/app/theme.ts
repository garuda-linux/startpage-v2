import { garudaThemes, type GarudaThemeName } from '@garudalinux/themes';

/*
 * The few Catppuccin colours used outside the theme presets. Kept as constants so the
 * palette package only loads with the Catppuccin presets that actually need it.
 */
const catppuccin = {
  latte: { base: '#eff1f5', surface0: '#ccd0da' },
  mocha: { base: '#1e1e2e', surface0: '#313244', mauve: '#cba6f7' },
  frappe: { base: '#303446', surface0: '#414559' },
  macchiato: { base: '#24273a', surface0: '#363a4f', mauve: '#c6a0f6' },
};

export const scrollbarColors = {
  primary: {
    light: `${catppuccin.latte.surface0} rgba(230, 233, 239, 0.5)`,
    dark: `${catppuccin.mocha.surface0} rgba(24, 24, 37, 0.5)`,
  },
  alt: {
    light: `${catppuccin.frappe.surface0} rgba(48, 52, 70, 0.5)`,
    dark: `${catppuccin.macchiato.surface0} rgba(36, 39, 58, 0.5)`,
  },
  dr460nized: {
    light: '#e2e8f0 #f1c5f4',
    dark: '#42454e rgba(12, 14, 20, 0.5)',
  },
  vo1ded: {
    light: '#dfdafa #aa96ef',
    dark: '#8c6ce6 #4b2989',
  },
};
export const backgroundColors = {
  primary: {
    light: catppuccin.latte.base,
    dark: catppuccin.mocha.base,
  },
  alt: {
    light: catppuccin.frappe.base,
    dark: catppuccin.macchiato.base,
  },
  dr460nized: {
    light: '#f8fafc',
    dark: '#0f121a',
  },
  vo1ded: {
    light: '#fbfafe',
    dark: '#291d44',
  },
};

/**
 * Each app theme name mapped to its lazily loaded Garuda preset
 */
export const themes: Record<AppTheme, GarudaThemeName> = {
  'Catppuccin Mocha/Latte Aura': 'catppuccin-aura',
  'Catppuccin Mocha/Latte Nora': 'catppuccin-nora',
  'Catppuccin Mocha/Latte Material': 'catppuccin-material',
  'Catppuccin Mocha/Latte Lara': 'catppuccin-lara',
  'Catppuccin Macchiato/Frappe Aura': 'catppuccin-aura-alt',
  'Catppuccin Macchiato/Frappe Nora': 'catppuccin-nora-alt',
  'Catppuccin Macchiato/Frappe Material': 'catppuccin-material-alt',
  'Catppuccin Macchiato/Frappe Lara': 'catppuccin-lara-alt',
  'Dr460nized Aura': 'dr460nized-aura',
  'Dr460nized Nora': 'dr460nized-nora',
  'Dr460nized Material': 'dr460nized-material',
  'Dr460nized Lara': 'dr460nized-lara',
  'Vo1ded Aura': 'vo1ded-aura',
  'Vo1ded Nora': 'vo1ded-nora',
  'Vo1ded Material': 'vo1ded-material',
  'Vo1ded Lara': 'vo1ded-lara',
};

export const DEFAULT_THEME: AppTheme = 'Catppuccin Mocha/Latte Aura';

/**
 * Download the preset for a theme. Only the chosen preset and its one Optimus base are fetched.
 * Unknown names (e.g. from an old settings file) fall back to the default theme.
 */
export function loadThemePreset(theme: string) {
  const name = themes[theme as AppTheme] ?? themes[DEFAULT_THEME];
  return garudaThemes[name]();
}

export type AppTheme =
  | 'Catppuccin Mocha/Latte Aura'
  | 'Catppuccin Mocha/Latte Nora'
  | 'Catppuccin Mocha/Latte Material'
  | 'Catppuccin Mocha/Latte Lara'
  | 'Catppuccin Macchiato/Frappe Aura'
  | 'Catppuccin Macchiato/Frappe Nora'
  | 'Catppuccin Macchiato/Frappe Material'
  | 'Catppuccin Macchiato/Frappe Lara'
  | 'Dr460nized Aura'
  | 'Dr460nized Nora'
  | 'Dr460nized Material'
  | 'Dr460nized Lara'
  | 'Vo1ded Aura'
  | 'Vo1ded Nora'
  | 'Vo1ded Material'
  | 'Vo1ded Lara';

export interface ThemeFamily {
  name: string;
  label: string;
  /**
   * Accent and base colour for the swatch preview, dark variant
   */
  accent: string;
  base: string;
}

/**
 * Theme presets are "<family> <style>". The customize drawer picks the two halves separately.
 */
export const themeFamilies: ThemeFamily[] = [
  { name: 'Catppuccin Mocha/Latte', label: 'Mocha', accent: catppuccin.mocha.mauve, base: catppuccin.mocha.base },
  {
    name: 'Catppuccin Macchiato/Frappe',
    label: 'Macchiato',
    accent: catppuccin.macchiato.mauve,
    base: catppuccin.macchiato.base,
  },
  { name: 'Dr460nized', label: 'Dr460nized', accent: '#d03cdb', base: '#0f121a' },
  { name: 'Vo1ded', label: 'Vo1ded', accent: '#9068e0', base: '#291d44' },
];

export const themeStyles = ['Aura', 'Nora', 'Material', 'Lara'] as const;
export type ThemeStyle = (typeof themeStyles)[number];

export function splitTheme(theme: string): { family: string; style: ThemeStyle } {
  const idx = theme.lastIndexOf(' ');
  return { family: theme.slice(0, idx), style: theme.slice(idx + 1) as ThemeStyle };
}
