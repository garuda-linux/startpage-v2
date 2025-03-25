import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, type CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class RedirectGuard implements CanActivate {
  canActivate(route: ActivatedRouteSnapshot): boolean {
    window.location.href = route.data['externalUrl'];
    return true;
  }
}
