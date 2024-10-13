import { ElementRef, Renderer2 } from "@angular/core"
import { CatppuccinFlavor, flavors } from "@catppuccin/palette"

/**
 * Loads the selected theme.
 * @param theme The theme to load (one of CatppuccinFlavor).
 * @param renderer The renderer to use.
 * @param el The element to apply the theme to.
 */
export function loadTheme(theme: string, renderer: Renderer2, el: ElementRef) {
    const appCtp = document.getElementById("app-ctp")
    if (appCtp === null) return
    if (appCtp.classList.contains(theme)) {
        return theme
    }

    appCtp.classList.remove("mocha", "latte", "frappe", "macchiato")
    appCtp.classList.add(theme)

    const flavor = theme as unknown as CatppuccinFlavor

    // @ts-expect-error - this is always a valid color
    const flavorColor = flavors[flavor].colors.base.hex
    renderer.setStyle(
        el.nativeElement.ownerDocument.body,
        "backgroundColor",
        flavorColor,
    )
    return theme
}

/**
 * Generate a routerLink as a string.
 * @param title The title to generate the routerLink from.
 * @returns The generated routerLink
 */
export function generateRouterLink(title: string): string {
    return title.toLowerCase().replace(/\s/g, "-")
}
