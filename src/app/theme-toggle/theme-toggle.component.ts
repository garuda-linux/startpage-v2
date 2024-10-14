import { CommonModule } from "@angular/common"
import { Component, ElementRef, Renderer2 } from "@angular/core"
import { AppService } from "../app.service"
import { loadTheme } from "../functions"
import { ToastComponent } from "../toast/toast.component"

@Component({
    selector: "app-theme-toggle",
    standalone: true,
    imports: [CommonModule, ToastComponent],
    templateUrl: "./theme-toggle.component.html",
    styleUrl: "./theme-toggle.component.css",
})
export class ThemeToggleComponent {
    currentTheme: undefined | string = "mocha"
    showToast = false
    text = "Try changing the theme! 🎨"
    buttonText = "I prefer some Latte ☕️"

    constructor(
        private appService: AppService,
        private el: ElementRef,
        private renderer: Renderer2,
    ) {
        this.appService.getSettings.subscribe({
            next: (settings) => {
                this.currentTheme = settings.theme
            },
        })
    }

    toggleTheme(): void {
        const appCtp = document.getElementById("app-ctp") as HTMLElement
        if (appCtp === null) return
        const classList = appCtp.classList

        const settings = this.appService.settings

        // Need to change this if classes get changed or rearranged
        switch (this.currentTheme) {
            case "mocha":
                classList.remove("mocha")
                this.currentTheme = loadTheme("latte", this.renderer, this.el)
                settings.theme = "latte"
                this.buttonText = "I prefer some Latte ☕️"
                break
            case "latte":
                classList.remove("latte")
                this.currentTheme = loadTheme("frappe", this.renderer, this.el)
                settings.theme = "frappe"
                this.buttonText = "Nah, Frappé is better ☕️"
                break
            case "frappe":
                classList.remove("frappe")
                this.currentTheme = loadTheme("macchiato", this.renderer, this.el)
                settings.theme = "macchiato"
                this.buttonText = "Let me order Macchiato ☕️"
                break
            case "macchiato":
                classList.remove("macchiato")
                this.currentTheme = loadTheme("mocha", this.renderer, this.el)
                settings.theme = "mocha"
                this.buttonText = "Mocha is best, after all ☕️"
        }
    }
}
