import type { ContactLinks, LogoList, MenuBarItems, ServiceLinks, WallpaperList } from './src/app/types';

// These are the items inside the menu.
export const menubarItems: MenuBarItems = [
  {
    icon: 'pi pi-home',
    label: 'Home',
    translocoKey: 'menu.home',
    url: 'https://garudalinux.org',
    id: 'gho',
  },
  {
    label: 'Forum',
    url: 'https://forum.garudalinux.org',
    translocoKey: 'menu.forum',
    icon: 'pi pi-users',
    id: 'gfo',
  },
  {
    label: 'GitLab',
    url: 'https://gitlab.com/garuda-linux',
    translocoKey: 'menu.gitlab',
    icon: 'pi pi-server',
    id: 'ggi',
  },
  {
    label: 'About Us',
    url: 'https://garudalinux.org/about',
    translocoKey: 'menu.aboutUs',
    icon: 'pi pi-info',
    id: 'gab',
  },
  {
    label: 'Garuda Wiki',
    url: 'https://wiki.garudalinux.org',
    translocoKey: 'menu.garudaWiki',
    icon: 'pi pi-book',
    id: 'ggw',
  },
  {
    label: 'Arch Wiki',
    url: 'https://wiki.archlinux.org',
    translocoKey: 'menu.archWiki',
    icon: 'pi pi-book',
    id: 'gaw',
  },
  {
    label: 'Donate',
    url: 'https://garudalinux.org/donate',
    translocoKey: 'menu.donate',
    icon: 'pi pi-heart',
    id: 'gdo',
  },
  {
    label: 'Settings',
    routerLink: '/settings',
    translocoKey: 'menu.settings',
    icon: 'pi pi-cog',
    id: 'gse',
  },
];

// Change this to add or remove links from the contacts section.
export const contactLinks: ContactLinks = [
  {
    link: 'https://forum.garudalinux.org',
    title: 'Forum',
    logo: 'assets/pictures/forum.png',
    subtitle: 'Use the official forum',
  },
  {
    link: 'https://garudalinux.org/telegram',
    title: 'Telegram',
    logo: 'assets/pictures/telegram.svg',
    subtitle: 'Chat with us on Telegram',
  },
  {
    link: 'https://garudalinux.org/discord',
    title: 'Discord',
    logo: 'assets/pictures/discord.svg',
    subtitle: 'Chat with us on Discord',
  },
  {
    link: 'https://bsky.app/profile/garudalinux.bsky.social',
    title: 'Bluesky',
    logo: 'assets/pictures/bluesky.svg',
    subtitle: 'Get some news from Garuda',
  },
  {
    link: 'https://social.garudalinux.org',
    title: 'Mastodon',
    logo: 'assets/pictures/mastodon.svg',
    subtitle: 'Engage with us on Mastodon',
  },
];

// Change this to add or remove links from the services section.
export const serviceLinks: ServiceLinks = [
  {
    link: 'https://searx.garudalinux.org',
    title: 'SearxNG',
    icon: 'assets/pictures/searxng.svg',
    subtitle: 'Privacy-respecting meta search',
    id: 'gsx',
  },
  {
    link: 'https://bitwarden.garudalinux.org',
    title: 'Vaultwarden',
    icon: 'assets/pictures/vaultwarden.svg',
    subtitle: 'Selfhosted password storage',
    id: 'gbw',
  },
  {
    link: 'https://reddit.garudalinux.org',
    title: 'Redlib',
    icon: 'assets/pictures/redlib.svg',
    subtitle: 'Lightweight frontend for Reddit',
    id: 'grl',
  },
  {
    link: 'https://social.garudalinux.org',
    title: 'Mastodon',
    icon: 'assets/pictures/mastodon.svg',
    subtitle: 'Privacy-respecting Twitter alternative',
    id: 'gms',
  },
  {
    link: 'https://bin.garudalinux.org',
    title: 'PrivateBin',
    icon: 'assets/pictures/privatebin.png',
    subtitle: 'Encrypted pastebin',
    id: 'gpv',
  },
  {
    link: 'https://search.garudalinux.org',
    title: 'Whoogle',
    icon: 'assets/pictures/whoogle.svg',
    subtitle: 'Privacy-respecting Google',
    id: 'gwh',
  },
  {
    link: 'https://librey.garudalinux.org',
    title: 'LibreY',
    icon: 'assets/pictures/librey.png',
    subtitle: 'Privacy-respecting meta search',
    id: 'gli',
  },
  {
    link: 'https://lingva.garudalinux.org',
    title: 'Lingva',
    icon: 'assets/pictures/lingva.png',
    subtitle: 'Privacy-respecting translator',
    id: 'glv',
  },
  {
    link: 'https://builds.garudalinux.org/iso/garuda/',
    title: 'Downloads',
    icon: 'assets/pictures/iso.webp',
    subtitle: 'Garuda ISO builds',
    id: 'gdo',
  },
  {
    link: 'https://status.garudalinux.org',
    title: 'Statuspage',
    icon: 'assets/pictures/uptime-kuma.svg',
    subtitle: 'Status page',
    id: 'gst',
  },
];

export type SearchEngine = (typeof searchEngineMappings)[number]['items'][number]['value'];
export type Wallpaper = (typeof wallpapers)[number]['items'][number]['value'];
export type AutocompleteProvider = (typeof autocompleteProviders)[number]['items'][number]['value'];

export interface SearchEngineEntry {
  value: string;
  label: string;
  url?: string;
}

export type SearchEngineList = {
  label: string;
  items: SearchEngineEntry[];
}[];

// Available search engines and their URLs
export const searchEngineMappings: SearchEngineList = [
  {
    label: 'Special',
    items: [
      {
        value: 'custom',
        label: 'Custom',
        url: '',
      },
    ],
  },
  {
    label: 'Predefined',
    items: [
      {
        value: 'searxng',
        label: 'SearxNG',
        url: 'https://searx.garudalinux.org/search?q=%s',
      },
      {
        value: 'whoogle',
        label: 'Whoogle',
        url: 'https://search.garudalinux.org/search?q=%s',
      },
      // This seems to be one of the better instances.
      // Doesn't nag with Cloudflare Captcha unlike ours.
      // Running it unprotected made it sadly necessary, however.
      {
        value: 'searxng-privau',
        label: 'SearxNG (priv.au)',
        url: 'https://priv.au/search?q=%s',
      },
      {
        value: 'google',
        label: 'Google',
        url: 'https://www.google.com/search?q=%s',
      },
      {
        value: 'ecosia',
        label: 'Ecosia',
        url: 'https://www.ecosia.org/search?q=%s',
      },
      {
        value: 'duckduckgo',
        label: 'DuckDuckGo',
        url: 'https://duckduckgo.com/?q=%s',
      },
      {
        value: 'startpage',
        label: 'Startpage',
        url: 'https://www.startpage.com/do/search?q=%s',
      },
      {
        value: 'brave',
        label: 'Brave',
        url: 'https://search.brave.com/search?q=%s',
      },
      {
        value: 'custom',
        label: 'Custom',
        url: '',
      },
    ].sort((a, b) => a.label.localeCompare(b.label)),
  },
];

// Autocomplete providers for the search engines
export const autocompleteProviders: SearchEngineList = [
  {
    label: 'Special',
    items: [
      {
        label: 'None',
        value: 'none',
      },
    ],
  },
  {
    label: 'Predefined',
    items: [
      {
        value: 'startpage',
        label: 'Startpage',
        url: 'https://www.startpage.com/osuggestions?q=%s',
      },
      {
        value: 'brave',
        label: 'Brave',
        url: 'https://search.brave.com/api/suggest?q=%s',
      },
    ].sort((a, b) => a.label.localeCompare(b.label)),
  },
];

// Which wallpapers are available to choose from
// Url needs to be either a local file or a URL, if local, it must be relative
// to being in the public folder.
export const wallpapers: WallpaperList = [
  {
    label: 'Special',
    items: [
      {
        label: 'None',
        value: 'none',
      },
      { label: 'Custom', value: 'custom' },
    ],
  },
  {
    label: 'Predefined',
    items: [
      {
        label: 'Shaded Landscape',
        value: 'assets/wallpapers/shaded-landscape.png',
      },
      {
        label: 'Evening Sky',
        value: 'assets/wallpapers/evening-sky.png',
      },
      {
        label: 'Abstract Swirls',
        value: 'assets/wallpapers/abstract-swirls.jpg',
      },
      {
        label: 'City Horizon',
        value: 'assets/wallpapers/city-horizon.jpg',
      },
      {
        label: 'River City',
        value: 'assets/wallpapers/river-city.jpg',
      },
      {
        label: 'City Asteroid Attack',
        value: 'assets/wallpapers/city-asteroid-attack.jpg',
      },
      {
        label: 'Clouds',
        value: 'assets/wallpapers/clouds.jpg',
      },
      {
        label: 'Puffy Stars',
        value: 'assets/wallpapers/puffy-stars.jpg',
      },
      {
        label: 'Rainy Window',
        value: 'assets/wallpapers/rainy-window.jpeg',
      },
      {
        label: 'Vivid Line',
        value: 'assets/wallpapers/vivid-line.png',
      },
      {
        label: 'Horizon Mocha',
        value: 'assets/wallpapers/horizon-mocha.jpg',
      },
      {
        label: 'Mokka SGS',
        value: 'assets/wallpapers/mokka-sgs.png',
      },
      {
        label: 'Garuda M V1',
        value: 'assets/wallpapers/garuda-m-v1.png',
      },
      {
        label: 'Mokka Tree',
        value: 'assets/wallpapers/mokka-tree.jpg',
      },
      {
        label: 'Mokkaxero',
        value: 'assets/wallpapers/mokkaxero.jpg',
      },
      {
        label: 'Puffy stars',
        value: 'assets/wallpapers/puffy-stars.jpg',
      },
      {
        label: 'Rainy window',
        value: 'assets/wallpapers/rainy-window.jpeg',
      },
      {
        label: 'River city',
        value: 'assets/wallpapers/river-city.jpg',
      },
      {
        label: 'Shaded landscape',
        value: 'assets/wallpapers/shaded-landscape.png',
      },
      {
        label: 'Vivid line',
        value: 'assets/wallpapers/vivid-line.png',
      },
    ].sort((a, b) => a.label.localeCompare(b.label)),
  },
];

// List for logo shown on the main page. Needs to have a fitting file in the public/logos folder.
export const logos: LogoList = [
  {
    label: 'Special',
    items: [{ label: 'Custom', value: 'custom' }],
  },
  {
    label: 'Predefined',
    items: [
      { label: 'Blue Metal', value: 'assets/logos/blue-metal.png' },
      { label: 'Blue', value: 'assets/logos/blue.png' },
      { label: 'Dr460nized', value: 'assets/logos/dr460nized.png' },
      { label: 'Green', value: 'assets/logos/green.png' },
      { label: 'Maroon Lavender', value: 'assets/logos/maroon-lavender.png' },
      { label: 'Metal', value: 'assets/logos/metal.png' },
      { label: 'Orange', value: 'assets/logos/orange.png' },
      { label: 'Petrol', value: 'assets/logos/petrol.png' },
      { label: 'Pink', value: 'assets/logos/pink.png' },
      { label: 'Red', value: 'assets/logos/red.png' },
      { label: 'Solid', value: 'assets/logos/solid.png' },
      { label: 'Violet Orange', value: 'assets/logos/violet-orange.png' },
    ].sort((a, b) => a.label.localeCompare(b.label)),
  },
];
