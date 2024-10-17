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
import { Title } from "@angular/platform-browser"
import { flavorEntries } from "@catppuccin/palette"
import {
    SearchEngine,
    amountForumPostsSettings,
    defaultSettings,
    logos,
    searchEngineMappings,
    wallpapers,
} from "../../../config"
import { AppService } from "../app.service"
import { loadTheme, setPageTitle } from "../functions"
import { LinkSectionComponent } from "../link-section/link-section.component"
import { NewsComponent } from "../news/news.component"
import { SearchComponent } from "../search/search.component"
import { ToastComponent } from "../toast/toast.component"
import { ServiceLinks, StartpageSettings, StartpageTheme } from "../types"

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
    protected readonly logos = logos
    protected readonly searchEngineMappings = searchEngineMappings
    protected readonly wallpapers = wallpapers

    // Default settings
    settings = defaultSettings as StartpageSettings

    customLinks = new FormControl()
    customTitle = new FormControl()
    defaultLinks = new FormControl()
    jokesEnabled = new FormControl()
    logo = new FormControl()
    logoUrl = new FormControl()
    theme = new FormControl()
    searchEngine = new FormControl()
    searchEngineUrl = new FormControl()
    searchEngineName = new FormControl()
    welcomeText = new FormControl()
    wallpaper = new FormControl()
    wallpaperCustomUrl = new FormControl()
    wallpaperFit = new FormControl()
    wallpaperBlur = new FormControl()

    showToast = false

    constructor(
        private appService: AppService,
        private cdr: ChangeDetectorRef,
        private el: ElementRef,
        private renderer: Renderer2,
        private titleService: Title,
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
            customLinks: this.customLinks.value as ServiceLinks,
            customTitle: this.customTitle.value,
            defaultLinks: this.defaultLinks.value,
            jokesEnabled: this.jokesEnabled.value,
            logo: this.logo.value,
            logoUrl: this.logoUrl.value,
            searchEngine: this.searchEngine.value as SearchEngine,
            searchEngineName: this.searchEngineName.value,
            searchEngineUrl: this.searchEngineUrl.value,
            theme: this.theme.value as StartpageTheme,
            wallpaper: this.wallpaper.value,
            wallpaperBlur: this.wallpaperBlur.value,
            wallpaperCustomUrl: this.wallpaperCustomUrl.value,
            wallpaperFit: this.wallpaperFit.value,
            welcomeText: this.welcomeText.value,
        }

        this.appService.saveSettings(settings)
        this.appService.getSettings.next(settings)

        if (settings.theme !== this.settings.theme) {
            loadTheme(settings.theme, this.renderer, this.el)
        }

        this.loadWallpaper(settings)
        this.loadWallpaperStyle()
        setPageTitle(this.titleService, settings.customTitle)

        this.settings = settings

        this.showToast = true
        setTimeout(() => {
            this.showToast = false
            this.cdr.detectChanges()
        }, 2500)

        this.cdr.detectChanges()
    }

    loadWallpaper(settings: StartpageSettings): void {
        if (settings.wallpaper === "custom") {
            this.appService.loadWallpaper(this.el, this.renderer, settings["wallpaperCustomUrl"])
        } else if (settings.wallpaper !== "") {
            this.appService.loadWallpaper(this.el, this.renderer, settings.wallpaper)
        } else if (settings.wallpaper === "") {
            this.appService.loadWallpaper(this.el, this.renderer, null)
        }
    }

    loadWallpaperStyle(kind?: string): void {
        this.appService.applyWallpaperStyle(this.el, this.renderer, kind)
    }
}
