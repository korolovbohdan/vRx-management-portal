import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {MenuItem} from 'primeng/api';
import {Menubar, MenubarModule} from 'primeng/menubar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Menubar],
  providers: [
    MenubarModule
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  items: MenuItem[] = [
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
