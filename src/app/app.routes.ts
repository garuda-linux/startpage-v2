import { Route } from "@angular/router"
import { contactLinks, serviceLinks } from "../../config"
import { generateRouterLink } from "./functions"
import { HomeComponent } from "./home/home.component"
import { RedirectGuard } from "./redirect/redirect.guard"
import { SettingsComponent } from "./settings/settings.component"
import { ContactLinks, MenuarBarItems, ServiceLinks } from "./types"

function generateExternalLinks(
    linkMap: ContactLinks | MenuarBarItems | ServiceLinks,
): Route[] {
    return Object.values(linkMap).map((key) => {
        return {
            path: generateRouterLink(key.title),
            canActivate: [RedirectGuard],
            component: RedirectGuard,
            data: {
                externalUrl: key.link ? key.link : key.url,
            },
        }
    })
}

export const appRoutes: Route[] = [
    {
        path: "",
        component: HomeComponent,
    },
    {
        path: "settings",
        component: SettingsComponent,
    },
    ...generateExternalLinks(contactLinks),
    ...generateExternalLinks(serviceLinks),
    {
        path: "**",
        redirectTo: "",
    },
]
