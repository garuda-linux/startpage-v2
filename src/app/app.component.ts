import { Component, OnInit } from "@angular/core"
import { RouterModule } from "@angular/router"
import { PrimeNGConfig } from "primeng/api"
import { MenuModule } from "primeng/menu"
import { MenubarModule } from "primeng/menubar"
import { Aura } from "primeng/themes/aura"
import { MenubarComponent } from "./menubar/menubar.component"

@Component({
    standalone: true,
    imports: [RouterModule, MenubarModule, MenuModule, MenubarComponent],
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrl: "./app.component.scss",
})
export class AppComponent implements OnInit {
    title = "startpage-v2"

    constructor(private primengConfig: PrimeNGConfig) {
        this.primengConfig.theme.set({
            preset: Aura,
            options: {
                prefix: "p",
                darkModeSelector: "system",
                cssLayer: false,
            },
        })
    }

    ngOnInit() {
        this.primengConfig.ripple.set(true)
    }
}
