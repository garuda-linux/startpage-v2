import { Injectable } from "@angular/core"
import { ActivatedRouteSnapshot, CanActivate, Router } from "@angular/router"

@Injectable({
    providedIn: "root",
})
export class RedirectGuard implements CanActivate {
    constructor(private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot): boolean {
        window.location.href = route.data["externalUrl"]
        return true
    }
}
