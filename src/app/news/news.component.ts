import { CommonModule } from "@angular/common"
import { Component } from "@angular/core"

@Component({
    selector: "app-news",
    standalone: true,
    imports: [CommonModule],
    templateUrl: "./news.component.html",
    styleUrl: "./news.component.css",
})
export class NewsComponent {}
