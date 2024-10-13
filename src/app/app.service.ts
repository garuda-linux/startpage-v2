import { Injectable } from "@angular/core"
import { defaultSettings } from "../../config"
import { StartpageSettings } from "./types"

@Injectable({
    providedIn: "root",
})
export class AppService {
    public settings: StartpageSettings = {} as StartpageSettings

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
            this.settings = defaultSettings
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
}
