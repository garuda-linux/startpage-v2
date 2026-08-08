import { type Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'settings',
    loadComponent: () => import('./settings/settings.component').then((c) => c.SettingsComponent),
  },
  {
    path: 'not-found',
    loadComponent: () => import('./not-found/not-found.component').then((c) => c.NotFoundComponent),
  },
  {
    path: '**',
    redirectTo: 'not-found',
  },
];
