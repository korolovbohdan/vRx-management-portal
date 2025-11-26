import {Component, inject, OnInit, Signal} from '@angular/core';
import {UsersApplicationService} from '../../data-access/application/users-application.service';
import {User} from '../../data-access/models/user.model';
import {UserStore} from '../../data-access/store/user.store';
import {TableModule} from 'primeng/table';
import {RouterLink} from '@angular/router';
import {ButtonModule} from 'primeng/button';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-list',
  templateUrl: './list.html',
  styleUrl: './list.scss',
  imports: [
    TableModule,
    RouterLink,
    ButtonModule,
    DatePipe,
  ],
  providers: [
    UserStore,
    UsersApplicationService,
  ]
})
export class List implements OnInit {
  private readonly _usersApplicationService = inject(UsersApplicationService);

  protected listUsers: Signal<User[]> = this._usersApplicationService.listUsers;

  protected queryParams = this._usersApplicationService.queryParams;

  protected callState = this._usersApplicationService.callState;

  ngOnInit(): void {
    this._usersApplicationService.loadByQueryParams();
  }

  protected deleteUser(user: User): void {
    if (confirm(`Are you sure you want to delete user "${user.name}"?`)) {
      this._usersApplicationService.deleteUser(user.id);
    }
  }
}

