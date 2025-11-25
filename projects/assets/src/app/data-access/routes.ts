import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'list'
  },
  {
    path: 'list',
    loadComponent: () => import('../feature/list/list').then(m => m.List)
  },
  {
    path: ':id',
    loadComponent: () => import('../feature/details/details').then(m => m.Details)
  },
  {
    path: '**',
    redirectTo: 'list'
  }
];
