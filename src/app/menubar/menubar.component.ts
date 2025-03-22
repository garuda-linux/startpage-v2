import { NgClass, NgStyle } from "@angular/common";
import { Component, ViewChild } from "@angular/core";
import { RouterLink } from "@angular/router";
import { menubarItems } from "../../../config";
import { AppService } from "../app.service";
import { ThemeToggleComponent } from "../theme-toggle/theme-toggle.component";
import { MenuBarItems } from "../types";

@Component({
    selector: "app-menubar",
    standalone: true,
    imports: [RouterLink, ThemeToggleComponent],
    templateUrl: "./menubar.component.html",
    styleUrl: "./menubar.component.css",
})
export class MenubarComponent {
    items: MenuBarItems = menubarItems;
    welcomeText: string;

    constructor(private appService: AppService) {
        this.appService.getSettings.subscribe((settings) => {
            this.welcomeText = settings.welcomeText;
        });
        this.welcomeText = this.appService.settings.welcomeText;
    }
}
