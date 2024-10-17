import { CommonModule, NgOptimizedImage } from "@angular/common"
import { Component, Input } from "@angular/core"
import { RouterLink } from "@angular/router"

@Component({
    selector: "app-link",
    standalone: true,
    imports: [CommonModule, NgOptimizedImage, RouterLink],
    templateUrl: "./link.component.html",
    styleUrl: "./link.component.css",
})
export class LinkComponent {
    @Input() link!: string
    @Input() title!: string
    @Input() icon!: string
    @Input() subtitle!: string
    @Input() tag!: string
}
