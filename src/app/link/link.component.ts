import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
    selector: "app-link",
    standalone: true,
    imports: [CommonModule, NgOptimizedImage],
    templateUrl: "./link.component.html",
    styleUrl: "./link.component.css",
})
export class LinkComponent {
    @Input() link!: string
    @Input() title!: string
    @Input() icon!: string
    @Input() subtitle!: string
    @Input() tag!: string

    navigateTo(link: string) {
        setTimeout(() => {
            window.open(link, "_blank")
        }, 0)
    }
}
