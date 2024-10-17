import { CommonModule } from "@angular/common"
import { AfterViewInit, Component, Input } from "@angular/core"

@Component({
    selector: "app-toast",
    standalone: true,
    imports: [CommonModule],
    templateUrl: "./toast.component.html",
    styleUrl: "./toast.component.css",
})
export class ToastComponent implements AfterViewInit {
    @Input() text = ""
    @Input() showCloseButton = true
    @Input() show = false
    @Input() alert = false

    textColor = "text-maroon"

    ngAfterViewInit(): void {
        if (this.alert) this.textColor = "text-red"
    }
}
