import { isPlatformBrowser } from "@angular/common"
import {
    Component,
    ElementRef,
    Inject,
    OnInit,
    PLATFORM_ID,
    Renderer2,
} from "@angular/core"
import { RouterModule } from "@angular/router"
import { initFlowbite } from "flowbite"
import { loadTheme } from "./functions"
import { MenubarComponent } from "./menubar/menubar.component"
import { RedirectGuard } from "./redirect/redirect.guard"

@Component({
    standalone: true,
    imports: [RouterModule, MenubarComponent],
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrl: "./app.component.scss",
    providers: [RedirectGuard],
})
export class AppComponent implements OnInit {
    title = "Garuda Startpage"

    constructor(
        @Inject(PLATFORM_ID) private platformId: object,
        private el: ElementRef,
        private renderer: Renderer2,
    ) {}

    ngOnInit(): void {
        if (isPlatformBrowser(this.platformId)) {
            initFlowbite()
        }

        const theme = localStorage.getItem("settings")
        if (theme) {
            const parsedSettings = JSON.parse(theme)

            if (parsedSettings.theme) {
                loadTheme(parsedSettings.theme, this.renderer, this.el)
            } else {
                this.setDefaultTheme()
            }
        } else {
            this.setDefaultTheme()
        }
    }

    private setDefaultTheme(): void {
        this.renderer.setStyle(
            this.el.nativeElement.ownerDocument.body,
            "backgroundColor",
            "#1e1e2e",
        )
    }
}
