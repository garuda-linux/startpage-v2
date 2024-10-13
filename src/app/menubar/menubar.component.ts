import { NgClass, NgStyle } from "@angular/common"
import { AfterViewInit, Component } from "@angular/core"
import { RouterLink } from "@angular/router"
import { menubarItems } from "../../../config"
import { generateRouterLink } from "../functions"
import { MenuarBarItems } from "../types"

@Component({
    selector: "app-menubar",
    standalone: true,
    imports: [NgClass, NgStyle, RouterLink],
    templateUrl: "./menubar.component.html",
    styleUrl: "./menubar.component.css",
})
export class MenubarComponent implements AfterViewInit {
    items: MenuarBarItems = menubarItems

    ngAfterViewInit() {
        for (const item of this.items) {
            item.routerLink = generateRouterLink(item.title)
        }
    }
}
