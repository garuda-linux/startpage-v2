import { NgClass, NgStyle } from "@angular/common"
import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ViewChild,
} from "@angular/core"
import { RouterLink } from "@angular/router"
import { menubarItems } from "../../../config"
import { AppService } from "../app.service"
import { generateRouterLink } from "../functions"
import { ThemeToggleComponent } from "../theme-toggle/theme-toggle.component"
import { MenuarBarItems } from "../types"

@Component({
    selector: "app-menubar",
    standalone: true,
    imports: [NgClass, NgStyle, RouterLink, ThemeToggleComponent],
    templateUrl: "./menubar.component.html",
    styleUrl: "./menubar.component.css",
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenubarComponent implements AfterViewInit {
    items: MenuarBarItems = menubarItems
    titleText = "Welcome! 👋🏻"

    @ViewChild(ThemeToggleComponent) themeToggle!: ThemeToggleComponent

    constructor(
        private appService: AppService,
        private cdr: ChangeDetectorRef,
    ) {}

    ngAfterViewInit() {
        for (const item of this.items) {
            item.routerLink = generateRouterLink(item.title)
        }

        if (this.appService.settings.welcomeText) {
            this.titleText = this.appService.settings.welcomeText
        }
        this.cdr.detectChanges()
    }
}
