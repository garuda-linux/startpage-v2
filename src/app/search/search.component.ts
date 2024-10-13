import { CommonModule } from "@angular/common"
import { Component } from "@angular/core"
import { FormsModule } from "@angular/forms"
import { RouterLink } from "@angular/router"
import { SearchEngine, searchEngineMappings } from "../../../config"
import { AppService } from "../app.service"
import { SearchEngineEntry } from "../types"

@Component({
    selector: "app-search",
    standalone: true,
    imports: [CommonModule, FormsModule, RouterLink],
    templateUrl: "./search.component.html",
    styleUrl: "./search.component.css",
})
export class SearchComponent {
    searchTerm = ""
    searchEngine: SearchEngine = "searxng"
    searchEngineData: SearchEngineEntry

    constructor(private appService: AppService) {
        this.searchEngine = this.appService.settings.searchEngine

        // @ts-expect-error: is always defined
        this.searchEngineData = searchEngineMappings.find((engine) => {
            return engine.name === this.searchEngine
        })
        if (this.searchEngine === "custom") {
            this.searchEngineData.url = this.appService.settings.searchEngineUrl
            this.searchEngineData.prettyName = this.appService.settings.searchEngineName
                ? this.appService.settings.searchEngineName
                : "Custom"
        }
    }

    navToSearchEngine() {
        window.location.href = `${this.searchEngineData.url}${this.searchTerm}`
    }
}
