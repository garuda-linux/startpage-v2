import { ContactLinks, LogoList, MenuBarItems, ServiceLinks, WallpaperList } from './src/app/types';

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

export type SearchEngine = (typeof searchEngineMappings)[number]['name'] | 'custom';
export type AutocompleteProvider = (typeof autocompleteProviders)[number]['name'];

export interface SearchEngineEntry {
  name: string;
  prettyName: string;
  url: string;
}

// Available search engines and their URLs
export const searchEngineMappings: SearchEngineEntry[] = [
  {
    name: 'searxng',
    prettyName: 'SearxNG',
    url: 'https://searx.garudalinux.org/search?q=%s',
  },
  {
    name: 'whoogle',
    prettyName: 'Whoogle',
    url: 'https://search.garudalinux.org/search?q=%s',
  },
  // This seems to be one of the better instances.
  // Doesn't nag with Cloudflare Captcha unlike ours.
  // Running it unprotected made it sadly necessary, however.
  {
    name: 'searxng-privau',
    prettyName: 'SearxNG (priv.au)',
    url: 'https://priv.au/search?q=%s',
  },
  {
    name: 'google',
    prettyName: 'Google',
    url: 'https://www.google.com/search?q=%s',
  },
  {
    name: 'ecosia',
    prettyName: 'Ecosia',
    url: 'https://www.ecosia.org/search?q=%s',
  },
  {
    name: 'duckduckgo',
    prettyName: 'DuckDuckGo',
    url: 'https://duckduckgo.com/?q=%s',
  },
  {
    name: 'startpage',
    prettyName: 'Startpage',
    url: 'https://www.startpage.com/do/search?q=%s',
  },
  {
    name: 'brave',
    prettyName: 'Brave',
    url: 'https://search.brave.com/search?q=%s',
  },
  {
    name: 'custom',
    prettyName: 'Custom',
    url: '',
  },
];

// Autocomplete providers for the search engines
export const autocompleteProviders: SearchEngineEntry[] = [
  {
    name: 'startpage',
    prettyName: 'Startpage',
    url: 'https://www.startpage.com/osuggestions?q=%s',
  },
  {
    name: 'brave',
    prettyName: 'Brave',
    url: 'https://search.brave.com/api/suggest?q=%s',
  },
  {
    name: 'none',
    prettyName: 'None',
    url: '',
  },
];

// Which wallpapers are available to choose from
// Url needs to be either a local file or a URL, if local, it must be relative
// to being in the public folder.
export const wallpapers: WallpaperList = [
  {
    name: 'None',
    url: 'none',
  },
  {
    name: 'Shaded Landscape',
    url: 'assets/wallpapers/shaded-landscape.png',
  },
  {
    name: 'Evening Sky',
    url: 'assets/wallpapers/evening-sky.png',
  },
  {
    name: 'Abstract Swirls',
    url: 'assets/wallpapers/abstract-swirls.jpg',
  },
  {
    name: 'City Horizon',
    url: 'assets/wallpapers/city-horizon.jpg',
  },
  {
    name: 'River City',
    url: 'assets/wallpapers/river-city.jpg',
  },
  {
    name: 'City Asteroid Attack',
    url: 'assets/wallpapers/city-asteroid-attack.jpg',
  },
  {
    name: 'Clouds',
    url: 'assets/wallpapers/clouds.jpg',
  },
  {
    name: 'Puffy Stars',
    url: 'assets/wallpapers/puffy-stars.jpg',
  },
  {
    name: 'Rainy Window',
    url: 'assets/wallpapers/rainy-window.jpeg',
  },
  {
    name: 'Vivid Line',
    url: 'assets/wallpapers/vivid-line.png',
  },
  {
    name: 'Horizon Mocha',
    url: 'assets/wallpapers/horizon-mocha.jpg',
  },
  {
    name: 'Mokka SGS',
    url: 'assets/wallpapers/mokka-sgs.png',
  },
  {
    name: 'Garuda M V1',
    url: 'assets/wallpapers/garuda-m-v1.png',
  },
  {
    name: 'Mokka Tree',
    url: 'assets/wallpapers/mokka-tree.jpg',
  },
  {
    name: 'Mokkaxero',
    url: 'assets/wallpapers/mokkaxero.jpg',
  },
  {
    name: 'Puffy stars',
    url: 'assets/wallpapers/puffy-stars.jpg',
  },
  {
    name: 'Rainy window',
    url: 'assets/wallpapers/rainy-window.jpeg',
  },
  {
    name: 'River city',
    url: 'assets/wallpapers/river-city.jpg',
  },
  {
    name: 'Shaded landscape',
    url: 'assets/wallpapers/shaded-landscape.png',
  },
  {
    name: 'Vivid line',
    url: 'assets/wallpapers/vivid-line.png',
  },
  { name: 'Custom', url: 'custom' },
];

// List for logo shown on the main page. Needs to have a fitting file in the public/logos folder.
export const logos: LogoList = [
  { name: 'Black Metal', url: 'assets/logos/black-metal.png' },
  { name: 'Blue Metal', url: 'assets/logos/blue-metal.png' },
  { name: 'Blue', url: 'assets/logos/blue.png' },
  { name: 'Dr460nized', url: 'assets/logos/dr460nized.png' },
  { name: 'Green', url: 'assets/logos/green.png' },
  { name: 'Maroon Lavender', url: 'assets/logos/maroon-lavender.png' },
  { name: 'Metal', url: 'assets/logos/metal.png' },
  { name: 'Orange', url: 'assets/logos/orange.png' },
  { name: 'Petrol', url: 'assets/logos/petrol.png' },
  { name: 'Pink', url: 'assets/logos/pink.png' },
  { name: 'Red', url: 'assets/logos/red.png' },
  { name: 'Solid', url: 'assets/logos/solid.png' },
  { name: 'Violet Orange', url: 'assets/logos/violet-orange.png' },
  { name: 'Custom', url: 'custom' },
];
