import { CommonModule } from "@angular/common"
import { Component } from "@angular/core"
import { FormsModule } from "@angular/forms"
import { contactLinks, serviceLinks } from "../../../config"
import { LinkComponent } from "../link/link.component"

@Component({
    selector: "app-link-section",
    standalone: true,
    imports: [CommonModule, FormsModule, LinkComponent],
    templateUrl: "./link-section.component.html",
    styleUrl: "./link-section.component.css",
})
export class LinkSectionComponent {
    protected readonly contactLinks = contactLinks
    protected readonly serviceLinks = serviceLinks
}
