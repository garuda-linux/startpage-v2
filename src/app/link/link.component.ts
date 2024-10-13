import { CommonModule, NgOptimizedImage } from "@angular/common"
import { AfterViewInit, Component, Input } from "@angular/core"
import { RouterLink } from "@angular/router"
import { generateRouterLink } from "../functions"

@Component({
    selector: "app-link",
    standalone: true,
    imports: [CommonModule, NgOptimizedImage, RouterLink],
    templateUrl: "./link.component.html",
    styleUrl: "./link.component.css",
})
export class LinkComponent implements AfterViewInit {
    @Input() link!: string
    @Input() title!: string
    @Input() icon!: string
    @Input() subtitle!: string
    @Input() tag!: string
    routerLink: string | undefined

    ngAfterViewInit() {
        this.routerLink = generateRouterLink(this.title)
    }
}
