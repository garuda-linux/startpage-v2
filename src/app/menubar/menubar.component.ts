import { NgClass, NgStyle } from "@angular/common"
import { Component } from "@angular/core"
import { MenuItem } from "primeng/api"
import { AvatarModule } from "primeng/avatar"
import { ButtonModule } from "primeng/button"
import { FluidModule } from "primeng/fluid"
import { MenubarModule } from "primeng/menubar"
import { StyleClassModule } from "primeng/styleclass"
import { ToolbarModule } from "primeng/toolbar"

@Component({
    selector: "app-menubar",
    standalone: true,
    imports: [
        MenubarModule,
        ToolbarModule,
        ButtonModule,
        AvatarModule,
        NgClass,
        FluidModule,
        StyleClassModule,
        NgStyle,
    ],
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
    ]

    navigateTo(url: string | undefined) {
        window.open(url, "_blank")
    }
}
