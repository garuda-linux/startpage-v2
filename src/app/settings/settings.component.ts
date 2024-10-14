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
    amountForumPostsSettings,
    defaultSettings,
    searchEngineMappings,
    wallpapers,
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
    protected readonly amountForumPostsSettings = amountForumPostsSettings
    protected readonly flavors = flavorEntries
    protected readonly searchEngineMappings = searchEngineMappings
    protected readonly wallpapers = wallpapers

    // Default settings
    settings = defaultSettings as StartpageSettings

    jokesEnabled = new FormControl()
    theme = new FormControl("Choose your theme")
    searchEngine = new FormControl("Choose your search engine")
    searchEngineUrl = new FormControl("Set a custom search engine URL (omit %s)")
    searchEngineName = new FormControl("")
    welcomeText = new FormControl(" Welcome! 👋🏻")
    wallpaper = new FormControl()
    wallpaperCustomUrl = new FormControl("")
    wallpaperFit = new FormControl(false)
    wallpaperBlur = new FormControl(false)

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
        for (const key in defaultSettings) {
            if (this.appService.settings[key] !== undefined) {
                this.settings[key] = this.appService.settings[key]
                const stringIndexedThis = this as { [key: string]: any }
                stringIndexedThis[key].setValue(this.appService.settings[key])
            } else {
                this.settings[key] = defaultSettings[key]
            }
        }
    }

    saveSettings(): void {
        const settings: StartpageSettings = {
            jokesEnabled: this.jokesEnabled.value,
            searchEngine: this.searchEngine.value as SearchEngine,
            searchEngineName: this.searchEngineName.value as string,
            searchEngineUrl: this.searchEngineUrl.value as string,
            theme: this.theme.value as StartpageTheme,
            wallpaper: this.wallpaper.value as string,
            wallpaperBlur: this.wallpaperBlur.value as boolean,
            wallpaperCustomUrl: this.wallpaperCustomUrl.value as string,
            wallpaperFit: this.wallpaperFit.value as boolean,
            welcomeText: this.welcomeText.value as string,
        }

        this.appService.saveSettings(settings)
        this.appService.getSettings.next(settings)

        if (settings.theme !== this.settings.theme) {
            loadTheme(settings.theme, this.renderer, this.el)
        }

        if (settings.wallpaper === "custom") {
            this.appService.loadWallpaper(this.el, this.renderer, settings["wallpaperCustomUrl"])
            this.applyWallpaperStyle()
        } else if (settings.wallpaper !== "" && settings.wallpaper !== this.settings.wallpaper) {
            this.appService.loadWallpaper(this.el, this.renderer, settings.wallpaper)
            this.applyWallpaperStyle()
        } else if (settings.wallpaper === "") {
            this.appService.loadWallpaper(this.el, this.renderer, null)
        }
        this.settings = settings

        this.showToast = true
        setTimeout(() => {
            this.showToast = false
            this.cdr.detectChanges()
        }, 2500)

        this.cdr.detectChanges()
    }

    applyWallpaperStyle(): void {
        this.appService.applyWallpaperStyle(this.el, this.renderer)
    }
}
