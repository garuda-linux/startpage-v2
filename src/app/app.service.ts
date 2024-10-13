import { ElementRef, Injectable, Renderer2 } from "@angular/core"
import { defaultSettings } from "../../config"
import { StartpageSettings } from "./types"

@Injectable({
    providedIn: "root",
})
export class AppService {
    public settings: StartpageSettings = {} as StartpageSettings
    public data: any = {}

    constructor() {
        this.loadSettings()
    }

    /**
     * Load settings from local storage.
     */
    loadSettings(): StartpageSettings {
        const settings = localStorage.getItem("settings")
        if (settings !== null) {
            this.settings = JSON.parse(settings) as StartpageSettings
        } else {
            this.settings = defaultSettings as StartpageSettings
        }
        return this.settings
    }

    /**
     * Save settings to local storage.
     * Saves settings from the AppService instance if no settings are provided.
     * @param settings Settings object to save, optional.
     */
    saveSettings(settings?: StartpageSettings): void {
        if (settings) {
            this.settings = settings
        }
        localStorage.setItem("settings", JSON.stringify(this.settings))
    }

    /**
     * Loads a new startpage background.
     * @param el ElementRef to the body element.
     * @param renderer Renderer2 to the body element.
     * @param wallpaper URL to the wallpaper to load.
     */
    loadWallpaper(el: ElementRef, renderer: Renderer2, wallpaper: string | null): void {
        if (wallpaper === null) {
            renderer.removeStyle(el.nativeElement.ownerDocument.body, "backgroundImage")
        } else {
            renderer.setStyle(el.nativeElement.ownerDocument.body, "background-image", `url(${wallpaper})`)
        }
    }

    /**
     * Apply wallpaper style to the body element.
     * @param el ElementRef to the origin element.
     * @param renderer Renderer2 to the origin element.
     */
    applyWallpaperStyle(el: ElementRef, renderer: Renderer2): void {
        renderer.setStyle(
            el.nativeElement.ownerDocument.body,
            "background-size",
            this.settings.wallpaperFit ? "contain" : "",
        )

        // const blur = this.settings.wallpaperBlur ? "blur(16px)" : ""
        // renderer.setStyle(el.nativeElement.ownerDocument.body, "filter", blur)
    }

    /**
     * Save data to the AppService instance.
     * @param key Key to save the data under.
     * @param data Data to save.
     */
    saveData(key: any, data: any): void {
        this.data[key] = data
    }

    /**
     * Get data from the AppService instance.
     * @param key Key to get the data from.
     * @returns Data saved under the key.
     */
    getData(key: any): any {
        return this.data[key]
    }
}
