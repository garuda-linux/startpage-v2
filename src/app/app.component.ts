import {
    Component,
    ElementRef,
    Inject,
    OnInit,
    PLATFORM_ID,
    Renderer2,
} from "@angular/core"
import { RouterModule } from "@angular/router"
import { MenubarComponent } from "./menubar/menubar.component"

import { isPlatformBrowser } from "@angular/common"
import { HttpClient } from "@angular/common/http"
import { initFlowbite } from "flowbite"
import { loadTheme } from "./functions"

@Component({
    standalone: true,
    imports: [RouterModule, MenubarComponent],
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrl: "./app.component.scss",
    providers: [],
})
export class AppComponent implements OnInit {
    title = "Garuda Startpage"

    constructor(
        @Inject(PLATFORM_ID) private platformId: object,
        private el: ElementRef,
        private renderer: Renderer2,
    ) {}

    ngOnInit() {
        if (isPlatformBrowser(this.platformId)) {
            initFlowbite()
        }

        const theme = localStorage.getItem("theme")
        if (theme && theme !== "mocha") {
            loadTheme(theme, this.renderer, this.el)
        } else {
            this.renderer.setStyle(
                this.el.nativeElement.ownerDocument.body,
                "backgroundColor",
                "#1e1e2e",
            )
        }
    }
}
