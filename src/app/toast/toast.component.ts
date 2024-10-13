import { CommonModule } from "@angular/common"
import { Component, Input } from "@angular/core"

@Component({
    selector: "app-toast",
    standalone: true,
    imports: [CommonModule],
    templateUrl: "./toast.component.html",
    styleUrl: "./toast.component.css",
})
export class ToastComponent {
    @Input() text = ""
    @Input() showCloseButton = true
    @Input() show = false
}
