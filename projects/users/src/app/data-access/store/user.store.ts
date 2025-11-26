import {CreateUserDto, IQueryUser} from '../common/dto/request.dto';
import {User} from '../models/user.model';
import {patchState, signalState, signalStore, withMethods, withState} from '@ngrx/signals';
import {CallState, setError, setLoaded, setLoading, withCallState} from '@angular-architects/ngrx-toolkit';
import {inject} from '@angular/core';
import {UsersService} from '../services/users.service';
import {rxMethod} from '@ngrx/signals/rxjs-interop';
import {pipe, switchMap, tap} from 'rxjs';
import {tapResponse} from '@ngrx/operators';
import {UsersMapper} from '../mapper/users.mapper';

type State = {
  queryParams: IQueryUser;
  list: User[];
  createCallState: CallState;
  deleteCallState: CallState;
}

const initialState = signalState<State>({
  queryParams: {},
  list: [],
  createCallState: 'init',
  deleteCallState: 'init',
});

export const UserStore = signalStore(
  withState(initialState),
  withCallState(),
  withMethods((store, usersService = inject(UsersService)) => ({
    loadList: rxMethod<IQueryUser | void>(
      pipe(
        tap((query) =>
          patchState(store, {
            queryParams: query || initialState.queryParams(),
            ...setLoading<string>()
          })
        ),
        switchMap(() => {
          return usersService.getUsersMock(store.queryParams())
            .pipe(
              tapResponse({
                next: (data) => {
                  patchState(store, {
                    ...setLoaded<string>(),
                    list: UsersMapper.toUserModelList(data)
                  })
                },
                error: (err) => {
                  patchState(store, {
                    ...setError<string>(err),
                    list: []
                  })
                }
              })
            )
        })
      )
    ),
    createUser: rxMethod<CreateUserDto>(
      pipe(
        tap((userData) =>
          patchState(store, {
            ...setLoading<string>(),
            createCallState: 'loading'
          })
        ),
        switchMap((userData) => {
          return usersService.createUserMock(userData)
            .pipe(
              tapResponse({
                next: (data) => {
                  const newUser = UsersMapper.toUserModel(data);
                  patchState(store, {
                    ...setLoaded<string>('create'),
                    createCallState: 'loaded',
                    list: [...store.list(), newUser]
                  })
                },
                error: (err) => {
                  patchState(store, {
                    ...setError<string>(err, 'create'),
                    createCallState: 'init'
                  })
                }
              })
            )
        })
      ),
    ),
    deleteUser: rxMethod<string>(
      pipe(
        tap((id) =>
          patchState(store, {
            ...setLoading<string>('delete'),
            deleteCallState: 'loading'
          })
        ),
        switchMap((id) => {
          return usersService.deleteUserMock(id)
            .pipe(
              tapResponse({
                next: () => {
                  // Remove the user from the list
                  const updatedList = store.list().filter(user => user.id !== id);
                  patchState(store, {
                    ...setLoaded<string>('delete'),
                    deleteCallState: 'loaded',
                    list: updatedList
                  })
                },
                error: (err) => {
                  patchState(store, {
                    ...setError<string>(err, 'delete'),
                    deleteCallState: 'init'
                  })
                }
              })
            )
        })
      )
    )
  }))
);
