import {Routes} from '@angular/router';
import {safeMfaLoader} from 'shared';

export const routes: Routes = [
  {
    path: 'assets',
    loadChildren: () => safeMfaLoader('assets', './Routes').then(m => m.routes)
  },
  {
    path: 'findings',
    loadChildren: () =>
      safeMfaLoader('findings', './Routes').then(m => m.routes)
  },
  {
    path: 'users',
    loadChildren: () =>
      safeMfaLoader('users', './Routes').then(m => m.routes)
  },
];
