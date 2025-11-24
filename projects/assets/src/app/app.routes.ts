import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'list'
  },
  {
    path: 'list',
    loadComponent: () => import('./pages/list/list').then(m => m.List)
  },
  {
    path: ':id',
    loadComponent: () => import('./pages/details/details').then(m => m.Details)
  },
  {
    path: '**',
    redirectTo: 'list'
  }
];
