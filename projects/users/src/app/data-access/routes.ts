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
    path: 'create',
    loadComponent: () => import('../feature/form/form').then(m => m.Form)
  },
  {
    path: '**',
    redirectTo: 'list'
  }
];
