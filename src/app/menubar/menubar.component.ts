import { NgClass, NgStyle } from "@angular/common"
import { Component } from "@angular/core"

@Component({
    selector: "app-menubar",
    standalone: true,
    imports: [NgClass, NgStyle],
    templateUrl: "./menubar.component.html",
    styleUrl: "./menubar.component.css",
})
export class MenubarComponent {
    items = [
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
    settingName = false

    setName() {
        this.settingName = true
    }
}
