import { CommonModule, NgOptimizedImage } from "@angular/common"
import { Component } from "@angular/core"
import { FormsModule } from "@angular/forms"
import { AutoFocus } from "primeng/autofocus"
import { DataViewModule } from "primeng/dataview"
import { FluidModule } from "primeng/fluid"
import { ImageModule } from "primeng/image"
import { InputTextModule } from "primeng/inputtext"
import { ToastModule } from "primeng/toast"
import { LinkComponent } from "../link/link.component"
import { NewsComponent } from "../news/news.component"

@Component({
    selector: "app-home",
    standalone: true,
    imports: [
        CommonModule,
        LinkComponent,
        FluidModule,
        InputTextModule,
        AutoFocus,
        FormsModule,
        ImageModule,
        DataViewModule,
        NgOptimizedImage,
        NewsComponent,
    ],
    templateUrl: "./home.component.html",
    styleUrl: "./home.component.css",
})
export class HomeComponent {
    services = [
        {
            link: "https://bitwarden.garudalinux.org",
            title: "Vaultwarden",
            icon: "pictures/vaultwarden.svg",
            subtitle: "Selfhosted password storage",
            tag: "Bitwarden",
        },
        {
            link: "https://searx.garudalinux.org",
            title: "SearxNG",
            icon: "pictures/searxng.svg",
            subtitle: "Privacy-respecting meta search engine",
            tag: "SearxNG",
        },
        {
            link: "https://reddit.garudalinux.org",
            title: "Redlib",
            icon: "pictures/redlib.svg",
            subtitle: "Lightweight frontend for Reddit",
            tag: "Redlib",
        },
        {
            link: "https://lemmy.garudalinux.org",
            title: "Lemmy",
            icon: "pictures/lemmy.svg",
            subtitle: "Privacy-respecting Reddit alternative",
            tag: "Lemmy",
        },
        {
            link: "https://lingva.garudalinux.org",
            title: "Lingva",
            icon: "pictures/lingva.svg",
            subtitle: "Privacy-respecting translation engine",
            tag: "Lingva",
        },
        {
            link: "https://builds.garudalinux.org/iso/garuda/",
            title: "ISO builds",
            icon: "pictures/iso.webp",
            subtitle: "Garuda Iso Builds",
            tag: "ISO Builds",
        },
        {
            link: "https://bin.garudalinux.org",
            title: "PrivateBin",
            icon: "pictures/privatebin.png",
            subtitle: "Encrypted pastebin - minimalist & open source",
            tag: "PrivateBin",
        },
        {
            link: "https://search.garudalinux.org",
            title: "Whoogle",
            icon: "pictures/whoogle.svg",
            subtitle: "Privacy-respecting Google search engine",
            tag: "Whoogle",
        },
        {
            link: "https://librey.garudalinux.org",
            title: "LibreY",
            icon: "pictures/librey.png",
            subtitle: "Privacy-respecting Meta search engine",
            tag: "LibreY",
        },
        {
            link: "https://social.garudalinux.org",
            title: "Mastodon",
            icon: "pictures/mastodon.svg",
            subtitle: "Privacy-respecting Twitter alternative",
            tag: "Mastodon",
        },
        {
            link: "https://status.garudalinux.org",
            title: "Statuspage",
            icon: "pictures/freshstatus.svg",
            subtitle: "Statuspage",
            tag: "Statuspage",
        },
        {
            link: "https://stats.garudalinux.org",
            title: "Uptimes",
            icon: "pictures/freshping.svg",
            subtitle: "Uptime stats",
            tag: "Uptimes",
        },
    ]

    contact = [
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
            logo: "pictures/bluesky.png",
            subtitle: "Get some news from Garuda",
            tag: "Bluesky",
        },
    ]

    searchTerm = ""

    search($event: any) {
        window.location.href = `https://searx.garudalinux.org/search?q=${this.searchTerm}`
    }
}
