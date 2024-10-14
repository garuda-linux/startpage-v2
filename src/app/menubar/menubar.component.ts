import { NgClass, NgStyle } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { menubarItems } from '../../../config';
import { AppService } from '../app.service';
import { ThemeToggleComponent } from '../theme-toggle/theme-toggle.component';
import { MenuBarItems, StartpageSettings } from '../types';

@Component({
    selector: "app-menubar",
    standalone: true,
    imports: [NgClass, NgStyle, RouterLink, ThemeToggleComponent],
    templateUrl: "./menubar.component.html",
    styleUrl: "./menubar.component.css",
})
export class MenubarComponent {
    items: MenuBarItems = menubarItems
    settings: StartpageSettings = {} as StartpageSettings

    @ViewChild(ThemeToggleComponent) themeToggle!: ThemeToggleComponent

    constructor(private appService: AppService) {
        this.appService.getSettings.subscribe((settings) => {
            this.settings = settings
        })
    }
}
