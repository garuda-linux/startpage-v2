import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { NgClass } from '@angular/common';

@Component({
    selector: "app-menubar",
    standalone: true,
    imports: [MenubarModule, ToolbarModule, ButtonModule, AvatarModule, NgClass],
    templateUrl: "./menubar.component.html",
    styleUrl: "./menubar.component.css",
})
export class MenubarComponent {
    items: MenuItem[] = [
        {
            label: "Homepage",
            url: "https://garudalinux.org",
            title: "Homepage",
        },
        {
            label: "GitLab",
            url: "https://gitlab.com/garuda-linux",
            title: "GitLab",
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
            label: "Forum",
            url: "https://forum.garudalinux.org",
            title: "Forum",
        },
        {
            label: "Donate",
            url: "https://garudalinux.org/donate.html",
            title: "Donate",
        },
        {
            label: "About us",
            url: "https://garudalinux.org/about.html",
            title: "About us",
        },
    ]

    constructor() {}

    navigateTo(url: string | undefined) {
        window.open(url, "_blank")
    }
}
