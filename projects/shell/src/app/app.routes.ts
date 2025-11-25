import {Routes} from '@angular/router';
import {loadRemoteModule} from '@angular-architects/native-federation';

export const routes: Routes = [
  {
    path: 'assets',
    loadChildren: () =>
      loadRemoteModule('assets', './Routes').then((m) => m.routes),
  },
  {
    path: 'findings',
    loadChildren: () =>
      loadRemoteModule('findings', './Routes').then((m) => m.routes),
  },
  {
    path: 'users',
    loadChildren: () =>
      loadRemoteModule('users', './Routes').then((m) => m.routes),
  },
];
