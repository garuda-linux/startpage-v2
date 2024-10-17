import { isPlatformBrowser } from "@angular/common"
import { Component, ElementRef, Inject, OnInit, PLATFORM_ID, Renderer2 } from "@angular/core"
import { Title } from "@angular/platform-browser"
import { RouterModule } from "@angular/router"
import { initFlowbite } from "flowbite"
import { AppService } from "./app.service"
import { loadTheme, setPageTitle } from "./functions"
import { MenubarComponent } from "./menubar/menubar.component"
import { RedirectGuard } from "./redirect/redirect.guard"
import { StartpageSettings } from "./types"

@Component({
    standalone: true,
    imports: [RouterModule, MenubarComponent],
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrl: "./app.component.scss",
    providers: [RedirectGuard, AppService],
})
export class AppComponent implements OnInit {
    title = "Garuda Startpage"
    settings: StartpageSettings = {} as StartpageSettings

    constructor(
        private appService: AppService,
        @Inject(PLATFORM_ID) private platformId: object,
        private el: ElementRef,
        private renderer: Renderer2,
        private titleService: Title,
    ) {
        this.appService.getSettings.subscribe((settings) => {
            this.settings = settings
        })
        if (this.settings.theme) {
            loadTheme(this.settings.theme, this.renderer, this.el)
        }
        setPageTitle(this.titleService, this.settings.customTitle)
        this.appService.applyWallpaperStyle(this.el, this.renderer)
        this.appService.loadWallpaper(this.el, this.renderer, this.appService.settings.wallpaper)
    }

    ngOnInit(): void {
        if (isPlatformBrowser(this.platformId)) {
            initFlowbite()
        }
    }
}
