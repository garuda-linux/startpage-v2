import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { CardModule } from 'primeng/card';
import { PanelModule } from 'primeng/panel';
import { Ripple } from 'primeng/ripple';
import { TagModule } from 'primeng/tag';
import { ChipModule } from 'primeng/chip';

@Component({
    selector: "app-link",
    standalone: true,
    imports: [
        CommonModule,
        Ripple,
        PanelModule,
        AvatarModule,
        TagModule,
        CardModule,
        NgOptimizedImage,
        ChipModule,
    ],
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
        }, 500)
    }
}
