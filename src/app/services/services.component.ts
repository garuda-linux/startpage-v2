import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './services.component.html',
  styleUrl: './services.component.css'
})
export class ServicesComponent {
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
}
