import {inject, Injectable} from '@angular/core';
import {UserStore} from '../store/user.store';
import {CreateUserDto, IQueryUser} from '../common/dto/request.dto';

@Injectable({
  providedIn: 'root'
})
export class UsersApplicationService {
  private readonly _store = inject(UserStore)

  listUsers = this._store.list;

  queryParams = this._store.queryParams;

  callState = this._store.callState;

  createCallState = this._store.createCallState;

  deleteCallState = this._store.deleteCallState;

  loadByQueryParams(queryParams?: IQueryUser): void {
    this._store.loadList(queryParams);
  }

  createUser(userData: CreateUserDto): void {
    this._store.createUser(userData);
  }

  deleteUser(id: string): void {
    this._store.deleteUser(id);
  }
}
