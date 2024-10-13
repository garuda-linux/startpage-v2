import { CommonModule, NgOptimizedImage } from "@angular/common"
import { ChangeDetectionStrategy, Component } from "@angular/core"
import { FormsModule } from "@angular/forms"
import { amountForumPostsHome } from "../../../config"
import { LinkSectionComponent } from "../link-section/link-section.component"
import { LinkComponent } from "../link/link.component"
import { NewsComponent } from "../news/news.component"
import { SearchComponent } from "../search/search.component"
import { ToastComponent } from "../toast/toast.component"

@Component({
    selector: "app-home",
    standalone: true,
    imports: [
        CommonModule,
        LinkComponent,
        FormsModule,
        NgOptimizedImage,
        NewsComponent,
        LinkSectionComponent,
        SearchComponent,
        ToastComponent,
    ],
    templateUrl: "./home.component.html",
    styleUrl: "./home.component.css",
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
    protected readonly amountForumPostsHome = amountForumPostsHome
}
