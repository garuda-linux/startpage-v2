import { DOCUMENT, isPlatformBrowser } from "@angular/common";
import { Component, ElementRef, Inject, OnInit, PLATFORM_ID, Renderer2 } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { RouterModule, RouterOutlet } from "@angular/router";
import { initFlowbite } from "flowbite";
import { routeAnimations } from "./app.routes";
import { AppService } from "./app.service";
import { loadTheme, setPageTitle } from "./functions";
import { MenubarComponent } from "./menubar/menubar.component";
import { RedirectGuard } from "./redirect/redirect.guard";
import { StartpageSettings } from "./types";

@Component({
    standalone: true,
    imports: [RouterModule, MenubarComponent],
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrl: "./app.component.scss",
    providers: [RedirectGuard, AppService],
    animations: [routeAnimations],
})
export class AppComponent implements OnInit {
    title = "Garuda Startpage";
    settings: StartpageSettings = {} as StartpageSettings;

    constructor(
        @Inject(DOCUMENT) private document: Document,
        @Inject(PLATFORM_ID) private platformId: object,
        private appService: AppService,
        private el: ElementRef,
        private renderer: Renderer2,
        private titleService: Title,
    ) {
        this.appService.getSettings.subscribe((settings) => {
            this.settings = settings;
        });
        if (this.settings.theme) {
            loadTheme(this.settings.theme, this.renderer, this.el);
        }
        if (this.settings.fontMode) {
            this.document.documentElement.classList.add("dark");
        } else {
            this.document.documentElement.classList.remove("dark");
        }
        setPageTitle(this.titleService, this.settings.customTitle);
        this.appService.applyWallpaperStyle(this.el, this.renderer);
        this.appService.loadWallpaper(this.el, this.renderer, this.appService.settings.wallpaper);
    }

    ngOnInit(): void {
        if (isPlatformBrowser(this.platformId)) {
            initFlowbite();
        }
    }

    /**
     * Returns the animation state of the next page for page transitions
     * @param outlet Router outlet element
     * @returns The animation state of the target route
     */
    prepareRoute(outlet: RouterOutlet): string {
        return outlet.activatedRouteData["animationState"];
    }
}
