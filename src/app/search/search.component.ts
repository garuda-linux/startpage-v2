import { CommonModule } from "@angular/common"
import { Component } from "@angular/core"
import { FormsModule } from "@angular/forms"
import { RouterLink } from "@angular/router"
import { SearchEngine, searchEngineMappings } from "../../../config"
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
    searchEngineData: SearchEngineEntry | undefined
    searchEngineMappings: Map<SearchEngine, SearchEngineEntry> = new Map<
        SearchEngine,
        SearchEngineEntry
    >()

    constructor() {
        const savedEngine = localStorage.getItem("searchEngine") as SearchEngine
        if (savedEngine) {
            this.searchEngine = savedEngine
        } else {
            localStorage.setItem("searchEngine", "searxng")
        }

        for (const engine of searchEngineMappings) {
            this.searchEngineMappings.set(engine.name as SearchEngine, engine)
        }

        this.searchEngineData = this.searchEngineMappings.get(this.searchEngine)
        if (this.searchEngine === "custom") {
            const customEngine = localStorage.getItem("searchEngineCustom")
            if (!customEngine && !this.searchEngineData) return
            // @ts-ignore
            this.searchEngineData.url = customEngine
        }
    }

    navToSearchEngine() {
        window.location.href = `${this.searchEngineData?.url}${this.searchTerm}`
    }
}
