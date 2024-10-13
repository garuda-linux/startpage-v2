import { CommonModule } from "@angular/common"
import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    Renderer2,
} from "@angular/core"
import { FormControl, FormsModule, ReactiveFormsModule } from "@angular/forms"
import { flavorEntries } from "@catppuccin/palette"
import {
    SearchEngine,
    defaultSettings,
    searchEngineMappings,
} from "../../../config"
import { AppService } from "../app.service"
import { loadTheme } from "../functions"
import { LinkSectionComponent } from "../link-section/link-section.component"
import { NewsComponent } from "../news/news.component"
import { SearchComponent } from "../search/search.component"
import { ToastComponent } from "../toast/toast.component"
import { StartpageSettings, StartpageTheme } from "../types"

@Component({
    selector: "app-settings",
    standalone: true,
    imports: [
        CommonModule,
        LinkSectionComponent,
        NewsComponent,
        SearchComponent,
        FormsModule,
        ReactiveFormsModule,
        ToastComponent,
    ],
    templateUrl: "./settings.component.html",
    styleUrl: "./settings.component.css",
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsComponent implements AfterViewInit {
    protected readonly searchEngineMappings = searchEngineMappings
    protected readonly flavors = flavorEntries

    // Default settings
    settings: StartpageSettings = defaultSettings

    theme = new FormControl("Choose your theme")
    searchEngine = new FormControl("Choose your search engine")
    searchEngineUrl = new FormControl(
        "Set a custom search engine URL (omit %s)",
    )
    searchEngineName = new FormControl("")
    welcomeText = new FormControl(" Welcome! 👋🏻")

    showToast = false

    constructor(
        private appService: AppService,
        private cdr: ChangeDetectorRef,
        private el: ElementRef,
        private renderer: Renderer2,
    ) {}

    ngAfterViewInit(): void {
        this.loadSettings()
        this.cdr.detectChanges()
    }

    private loadSettings(): void {
        if (this.appService.settings.theme !== undefined) {
            this.theme.setValue(this.appService.settings.theme)
            this.settings.theme = this.appService.settings.theme
        } else {
            this.theme.setValue(this.settings.theme)
        }
        if (this.appService.settings.searchEngine !== undefined) {
            this.searchEngine.setValue(this.appService.settings.searchEngine)
            this.settings.searchEngine = this.appService.settings.searchEngine
        } else {
            this.searchEngine.setValue(this.settings.searchEngine)
        }
        if (this.appService.settings.welcomeText !== undefined) {
            this.welcomeText.setValue(this.appService.settings.welcomeText)
            this.settings.welcomeText = this.appService.settings.welcomeText
        } else {
            this.welcomeText.setValue(this.settings.welcomeText)
        }
        if (this.appService.settings.searchEngineUrl !== undefined) {
            this.searchEngineUrl.setValue(
                this.appService.settings.searchEngineUrl,
            )
            this.settings.searchEngineUrl =
                this.appService.settings.searchEngineUrl
        } else {
            this.welcomeText.setValue(this.settings.searchEngineUrl)
        }
        if (this.appService.settings.searchEngineName !== undefined) {
            this.searchEngineName.setValue(
                this.appService.settings.searchEngineName,
            )
            this.settings.searchEngineName =
                this.appService.settings.searchEngineName
        }
    }

    saveSettings(): void {
        const settings: StartpageSettings = {
            searchEngine: this.searchEngine.value as SearchEngine,
            searchEngineName: this.searchEngineName.value as string,
            searchEngineUrl: this.searchEngineUrl.value as string,
            theme: this.theme.value as StartpageTheme,
            welcomeText: this.welcomeText.value as string,
        }

        if (settings.theme !== this.settings.theme) {
            loadTheme(settings.theme, this.renderer, this.el)
        }
        this.settings = settings
        this.appService.saveSettings(settings)

        this.showToast = true
        setTimeout(() => {
            this.showToast = false
            this.cdr.detectChanges()
        }, 2500)

        this.cdr.detectChanges()
    }
}
