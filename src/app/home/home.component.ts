import { CommonModule } from "@angular/common"
import { Component, ViewChild, ViewContainerRef } from "@angular/core"
import { FormsModule } from "@angular/forms"
import { AutoFocus } from "primeng/autofocus"
import { FluidModule } from "primeng/fluid"
import { ImageModule } from "primeng/image"
import { InputTextModule } from "primeng/inputtext"
import { LinkComponent } from "../link/link.component"

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
            title: "Searx",
            icon: "pictures/searx.svg",
            subtitle: "Privacy-respecting metasearch engine",
            tag: "Searx",
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
            title: "ISO Builds",
            icon: "pictures/iso.svg",
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
            title: "General statuspage",
            icon: "pictures/freshstatus.svg",
            subtitle: "Statuspage",
            tag: "Statuspage",
        },
        {
            link: "https://stats.garudalinux.org",
            title: "Uptime monitoring",
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
            title: "Telegram (bridged)",
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
            link: "https://irc.garudalinux.org",
            title: "IRC (bridged)",
            logo: "pictures/thelounge.png",
            subtitle: "Use the official Garuda IRC",
            tag: "IRC",
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
