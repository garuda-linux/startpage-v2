import { CommonModule, NgOptimizedImage } from "@angular/common"
import { AfterViewInit, Component, ElementRef, Renderer2 } from "@angular/core"
import { FormsModule } from "@angular/forms"
import { contactLinks, serviceLinks } from "../../../config"
import { loadTheme } from "../functions"
import { LinkSectionComponent } from "../link-section/link-section.component"
import { LinkComponent } from "../link/link.component"
import { NewsComponent } from "../news/news.component"
import { SearchComponent } from "../search/search.component"
import { ContactLinks, ServiceLinks } from "../types"

@Component({
    selector: "app-home",
    standalone: true,
    imports: [
        CommonModule,
        LinkComponent,
        FormsModule,
        NgOptimizedImage,
        NewsComponent,
        LinkSectionComponent,
        SearchComponent,
    ],
    templateUrl: "./home.component.html",
    styleUrl: "./home.component.css",
})
export class HomeComponent implements AfterViewInit {
    currentTheme: undefined | string = "mocha"

    constructor(
        private el: ElementRef,
        private renderer: Renderer2,
    ) {}

    ngAfterViewInit(): void {
        const savedTheme = localStorage.getItem("theme")
        if (savedTheme) {
            this.currentTheme = savedTheme
        } else {
            const toast = document.getElementById(
                "toast-reminder",
            ) as HTMLElement
            toast.classList.add("flex")
            toast.classList.remove("hidden")
        }
    }

    toggleTheme(): void {
        const appCtp = document.getElementById("app-ctp") as HTMLElement
        if (appCtp === null) return
        const classList = appCtp.classList

        // Need to change this if classes get changed or rearranged
        switch (this.currentTheme) {
            case "mocha":
                classList.remove("mocha")
                this.currentTheme = loadTheme("latte", this.renderer, this.el)
                localStorage.setItem("theme", "latte")
                break
            case "latte":
                classList.remove("latte")
                this.currentTheme = loadTheme("frappe", this.renderer, this.el)
                localStorage.setItem("theme", "frappe")
                break
            case "frappe":
                classList.remove("frappe")
                this.currentTheme = loadTheme(
                    "macchiato",
                    this.renderer,
                    this.el,
                )
                localStorage.setItem("theme", "macchiato")
                break
            case "macchiato":
                classList.remove("macchiato")
                this.currentTheme = loadTheme("mocha", this.renderer, this.el)
                localStorage.setItem("theme", "mocha")
        }
    }
}
