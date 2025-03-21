import { CommonModule } from "@angular/common"
import { Component } from "@angular/core"
import { FormsModule } from "@angular/forms"
import { contactLinks, serviceLinks } from "../../../config"
import { AppService } from "../app.service"
import { LinkComponent } from "../link/link.component"
import { ToastComponent } from "../toast/toast.component"
import { ServiceLinks } from "../types"

@Component({
    selector: "app-link-section",
    standalone: true,
    imports: [CommonModule, FormsModule, LinkComponent, ToastComponent],
    templateUrl: "./link-section.component.html",
    styleUrl: "./link-section.component.css",
})
export class LinkSectionComponent {
    protected readonly contactLinks = contactLinks
    protected readonly serviceLinks = serviceLinks

    customLinks = ""
    defaultLinks
    parsedLinks: ServiceLinks = []
    showJsonInvalid = false
    toastText = ""

    constructor(private appService: AppService) {
        this.customLinks = this.appService.settings["customLinks"]
        this.defaultLinks = this.appService.settings["defaultLinks"]
        this.parseLinks()

        this.appService.getSettings.subscribe((settings) => {
            this.customLinks = settings["customLinks"]
            this.parseLinks()
        })
    }

    private parseLinks(): void {
        if (!this.customLinks || this.customLinks === "") {
            this.parsedLinks = []
            return
        }

        try {
            this.parsedLinks = JSON.parse(this.customLinks)
        } catch (err: any) {
            console.error("Failed to parse custom links", err)
            this.toastText = "Failed to parse custom links, JSON is invalid."
            this.showJsonInvalid = true
            this.parsedLinks = []
        }
    }
}
