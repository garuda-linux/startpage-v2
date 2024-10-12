import { Component, OnInit } from "@angular/core"
import { RouterModule } from "@angular/router"
import { PrimeNGConfig } from "primeng/api"
import { MenuModule } from "primeng/menu"
import { MenubarModule } from "primeng/menubar"
import { definePreset, palette, usePreset } from "primeng/themes"
import { Aura } from "primeng/themes/aura"
import { MenubarComponent } from "./menubar/menubar.component"

@Component({
    standalone: true,
    imports: [RouterModule, MenubarModule, MenuModule, MenubarComponent],
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrl: "./app.component.scss",
    providers: [],
})
export class AppComponent implements OnInit {
    title = "startpage-v2"

    constructor(private primengConfig: PrimeNGConfig) {}

    ngOnInit() {
        this.primengConfig.ripple.set(true)
        this.primengConfig.theme.set({
            preset: Aura,
            options: {
                prefix: "p",
                darkModeSelector: "system",
                cssLayer: false,
            },
        })
    }

    MyPreset = definePreset(Aura, {
        semantic: {
            primary: {
                50: "{zinc.50}",
                100: "{zinc.100}",
                200: "{zinc.200}",
                300: "{zinc.300}",
                400: "{zinc.400}",
                500: "{zinc.500}",
                600: "{zinc.600}",
                700: "{zinc.700}",
                800: "{zinc.800}",
                900: "{zinc.900}",
                950: "{zinc.950}",
            },
            colorScheme: {
                light: {
                    primary: {
                        color: "{zinc.950}",
                        inverseColor: "#ffffff",
                        hoverColor: "{zinc.900}",
                        activeColor: "{zinc.800}",
                    },
                    highlight: {
                        background: "{zinc.950}",
                        focusBackground: "{zinc.700}",
                        color: "#ffffff",
                        focusColor: "#ffffff",
                    },
                },
                dark: {
                    primary: {
                        color: "{zinc.50}",
                        inverseColor: "{zinc.950}",
                        hoverColor: "{zinc.100}",
                        activeColor: "{zinc.200}",
                    },
                    highlight: {
                        background: "rgba(250, 250, 250, .16)",
                        focusBackground: "rgba(250, 250, 250, .24)",
                        color: "rgba(255,255,255,.87)",
                        focusColor: "rgba(255,255,255,.87)",
                    },
                },
            },
        },
    })
}
