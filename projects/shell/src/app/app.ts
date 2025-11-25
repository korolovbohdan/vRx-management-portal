import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {MenuItem} from 'primeng/api';
import {MenubarModule} from 'primeng/menubar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
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
      routerLink: 'asset'
    },
    {
      label: 'Findings',
      icon: 'pi pi-key',
      routerLink: 'finding'
    },
    {
      label: 'Users',
      icon: 'pi pi-users',
      routerLink: 'users'
    },
  ];
}
