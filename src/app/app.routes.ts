import { Route } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SettingsComponent } from './settings/settings.component';

export const appRoutes: Route[] = [
    {
        path: "",
        component: HomeComponent,
    },
    {
        path: "settings",
        component: SettingsComponent,
    },
    {
        path: "**",
        redirectTo: "",
    },
]
