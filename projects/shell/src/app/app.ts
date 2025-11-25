import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {Menubar} from 'primeng/menubar';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Menubar],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  items: MenuItem[] = [
    {
      label: 'Dashboard',
      icon: 'pi pi-home',
      routerLink: 'dashboard'
    },
    {
      label: 'Assets',
      icon: 'pi pi-folder',
      routerLink: 'assets'
    },
    {
      label: 'Findings',
      icon: 'pi pi-key',
      routerLink: 'findings'
    },
    {
      label: 'Users',
      icon: 'pi pi-users',
      routerLink: 'users'
    },
  ];
}
