import { DefaultSettings, SearchEngineList, StartpageTheme, WallpaperList } from "./src/app/types"

const isProd = true
export const GARUDA_FORUM_URL = isProd ? "https://forum.garudalinux.org" : "http://localhost:8010/proxy"

// These are the items inside the menu.
export const menubarItems = [
    {
        label: "Homepage",
        url: "https://garudalinux.org",
        title: "Homepage",
    },
    {
        label: "Forum",
        url: "https://forum.garudalinux.org",
        title: "Forum",
    },
    {
        label: "GitLab",
        url: "https://gitlab.com/garuda-linux",
        title: "GitLab",
    },
    {
        label: "About us",
        url: "https://garudalinux.org/about.html",
        title: "About us",
    },
    {
        label: "Garuda Wiki",
        url: "https://wiki.garudalinux.org",
        title: "Garuda Wiki",
    },
    {
        label: "Arch Wiki",
        url: "https://wiki.archlinux.org",
        title: "Arch Wiki",
    },
    {
        label: "Donate",
        url: "https://garudalinux.org/donate.html",
        title: "Donate",
    },
    {
        label: "Settings",
        routerLink: "/settings",
        title: "Settings",
    },
]

// Change this to add or remove links from the contacts section.
export const contactLinks = [
    {
        link: "https://forum.garudalinux.org",
        title: "Forum",
        logo: "pictures/garuda-logo-orange.png",
        subtitle: "Use the official forum",
        tag: "Forum",
    },
    {
        link: "https://telegram.me/garudalinux",
        title: "Telegram",
        logo: "pictures/telegram.svg",
        subtitle: "Chat with us on Telegram",
        tag: "Telegram",
    },
    {
        link: "https://garudalinux.org/discord",
        title: "Discord",
        logo: "pictures/discord.svg",
        subtitle: "Chat with us on Discord",
        tag: "Discord",
    },
    {
        link: "https://bsky.app/profile/garudalinux.bsky.social",
        title: "Bluesky",
        logo: "pictures/bluesky.svg",
        subtitle: "Get some news from Garuda",
        tag: "Bluesky",
    },
]

// Change this to add or remove links from the services section.
export const serviceLinks = [
    {
        link: "https://searx.garudalinux.org",
        title: "SearxNG",
        icon: "pictures/searxng.svg",
        subtitle: "Privacy-respecting meta search",
    },
    {
        link: "https://bitwarden.garudalinux.org",
        title: "Vaultwarden",
        icon: "pictures/vaultwarden.svg",
        subtitle: "Selfhosted password storage",
    },
    {
        link: "https://reddit.garudalinux.org",
        title: "Redlib",
        icon: "pictures/redlib.svg",
        subtitle: "Lightweight frontend for Reddit",
    },
    {
        link: "https://lemmy.garudalinux.org",
        title: "Lemmy",
        icon: "pictures/lemmy.svg",
        subtitle: "Privacy-respecting Reddit alternative",
    },
    {
        link: "https://social.garudalinux.org",
        title: "Mastodon",
        icon: "pictures/mastodon.svg",
        subtitle: "Privacy-respecting Twitter alternative",
    },
    {
        link: "https://bin.garudalinux.org",
        title: "PrivateBin",
        icon: "pictures/privatebin.png",
        subtitle: "Encrypted pastebin",
    },
    {
        link: "https://search.garudalinux.org",
        title: "Whoogle",
        icon: "pictures/whoogle.svg",
        subtitle: "Privacy-respecting Google",
    },
    {
        link: "https://librey.garudalinux.org",
        title: "LibreY",
        icon: "pictures/librey.png",
        subtitle: "Privacy-respecting meta search",
    },
    {
        link: "https://lingva.garudalinux.org",
        title: "Lingva",
        icon: "pictures/lingva.svg",
        subtitle: "Privacy-respecting translator",
    },
    {
        link: "https://builds.garudalinux.org/iso/garuda/",
        title: "ISO builds",
        icon: "pictures/iso.webp",
        subtitle: "Garuda ISO builds",
    },

    {
        link: "https://status.garudalinux.org",
        title: "Statuspage",
        icon: "pictures/freshstatus.svg",
        subtitle: "Status page",
    },
    {
        link: "https://stats.garudalinux.org",
        title: "Uptimes",
        icon: "pictures/freshping.svg",
        subtitle: "Uptime stats",
    },
]

// Available search engines and their URLs (without %s)
export type SearchEngine = "searxng" | "searxng-privau" | "whoogle" | "google" | "custom"
export const searchEngineMappings: SearchEngineList = [
    {
        name: "searxng",
        prettyName: "SearxNG",
        url: "https://searx.garudalinux.org",
    },
    {
        name: "whoogle",
        prettyName: "Whoogle",
        url: "https://search.garudalinux.org",
    },
    // This seems to be one of the better instances.
    // Doesn't nag with Cloudflare Captcha unlike ours.
    // Running it unprotected made it sadly necessary, however.
    {
        name: "searxng-privau",
        prettyName: "SearxNG (priv.au)",
        url: "https://priv.au",
    },
    {
        name: "google",
        prettyName: "Google",
        url: "https://www.google.com/search",
    },
    {
        name: "custom",
        prettyName: "Custom",
        url: "",
    },
]

// These are the settings defaults used
export const defaultSettings: DefaultSettings = {
    jokesEnabled: true,
    searchEngine: "searxng-privau" as SearchEngine,
    searchEngineName: "Custom",
    searchEngineUrl: "Set a custom search engine URL (omit %s)",
    theme: "mocha" as StartpageTheme,
    wallpaper: "",
    wallpaperBlur: false,
    wallpaperCustomUrl: "",
    wallpaperFit: false,
    welcomeText: " Welcome! 👋🏻",
}

// How many forum posts to load
export const amountForumPostsHome = 9
export const amountForumPostsSettings = 7

// Which wallpapers are available to choose from
// Url needs to be either a local file or a URL, if local, it must be relative
// to being in the public folder.
export const wallpapers: WallpaperList = [
    {
        name: "None",
        url: "",
    },
    {
        name: "Shaded Landscape",
        url: "wallpapers/shaded-landscape.png",
    },
    {
        name: "Evening Sky",
        url: "wallpapers/evening-sky.png",
    },
    { name: "Custom", url: "custom" },
]

// Don't delete
export const c = "nft5zX8CPAL4TW"
