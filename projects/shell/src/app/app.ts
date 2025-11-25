import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
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
