import { ElementRef, Renderer2 } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { CatppuccinFlavor, flavors } from "@catppuccin/palette";

/**
 * Loads the selected theme.
 * @param theme The theme to load (one of CatppuccinFlavor).
 * @param renderer The renderer to use.
 * @param el The element to apply the theme to.
 */
export function loadTheme(theme: string, renderer: Renderer2, el: ElementRef) {
    const appCtp = document.getElementById("app-ctp");
    if (appCtp === null) return;
    if (appCtp.classList.contains(theme)) {
        return theme;
    }

    appCtp.classList.remove("mocha", "latte", "frappe", "macchiato");
    appCtp.classList.add(theme);

    const flavor = theme as unknown as CatppuccinFlavor;

    // @ts-expect-error - this is always a valid color
    const flavorColor = flavors[flavor].colors.base.hex;
    renderer.setStyle(el.nativeElement.ownerDocument.body, "backgroundColor", flavorColor);
    return theme;
}

/**
 * Set the page title.
 * @param titleService The title service to use.
 * @param customTitle The custom title to set.
 */
export function setPageTitle(titleService: Title, customTitle: string | undefined) {
    if (customTitle !== "" && customTitle !== undefined && customTitle !== null) {
        titleService.setTitle(customTitle);
    } else {
        titleService.setTitle("Garuda Startpage");
    }
}
