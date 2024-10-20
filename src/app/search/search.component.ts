import { CommonModule, DOCUMENT, NgOptimizedImage } from "@angular/common";
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterLink } from "@angular/router";
import { SearchEngine, defaultLogo, searchEngineMappings } from "../../../config";
import { AppService } from "../app.service";
import { SearchEngineEntry } from "../types";

@Component({
    selector: "app-search",
    standalone: true,
    imports: [CommonModule, FormsModule, RouterLink, NgOptimizedImage],
    templateUrl: "./search.component.html",
    styleUrl: "./search.component.css",
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent implements OnInit {
    searchTerm = "";
    searchEngine: SearchEngine = "searxng";
    searchEngineData: SearchEngineEntry;
    logo = "/logos/violet-orange.png";

    constructor(
        private appService: AppService,
        private cdr: ChangeDetectorRef,
        @Inject(DOCUMENT) public document: Document,
    ) {
        this.searchEngine = this.appService.settings.searchEngine;

        // @ts-expect-error: is always defined
        this.searchEngineData = searchEngineMappings.find((engine) => {
            return engine.name === this.searchEngine;
        });
        if (this.searchEngine === "custom") {
            this.searchEngineData.url = this.appService.settings.searchEngineUrl;
            this.searchEngineData.prettyName = this.appService.settings.searchEngineName
                ? this.appService.settings.searchEngineName
                : "Custom";
        }
    }

    ngOnInit(): void {
        this.appService.getSettings.subscribe((settings) => {
            this.searchEngine = settings.searchEngine;

            if (settings.logo === "custom" && this.appService.settings.logoUrl !== undefined) {
                this.logo = this.appService.settings.logoUrl;
            } else if (settings.logo === undefined) {
                this.logo = defaultLogo;
                this.appService.settings.logo = defaultLogo;
            } else {
                this.logo = settings.logo;
            }
            this.cdr.detectChanges();
        });
    }

    /**
     * Navigate to the search engine with the search term.
     */
    navToSearchEngine(): void {
        const url = new URL(this.searchEngineData.url);
        url.searchParams.set("q", this.searchTerm);

        // if (this.searchEngineData.url.match(/garudalinux\.org/)) url.searchParams.set("c", c)

        window.location.href = url.toString();
    }
}
