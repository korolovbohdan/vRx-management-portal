import {IQueryAsset} from '../common/dto/request.dto';
import {Asset} from '../models/asset.model';
import {AssetDetail} from '../models/asset-detail.model';
import {patchState, signalState, signalStore, withMethods, withState} from '@ngrx/signals';
import {setError, setLoaded, setLoading, withCallState} from '@angular-architects/ngrx-toolkit';
import {inject} from '@angular/core';
import {AssetsService} from '../services/assets.service';
import {rxMethod} from '@ngrx/signals/rxjs-interop';
import {pipe, switchMap, tap} from 'rxjs';
import {tapResponse} from '@ngrx/operators';

type State = {
  queryParams: IQueryAsset;
  list: Asset[];
  asset: AssetDetail | null;
}

const initialState = signalState<State>({
  queryParams: {},
  list: [],
  asset: null,
});

export const AssetStore = signalStore(
  withState(initialState),
  withCallState(),
  withMethods((store, assetsService = inject(AssetsService)) => ({
    loadList: rxMethod<IQueryAsset | void>(
      pipe(
        tap((query) =>
          patchState(store, {
            queryParams: query || initialState.queryParams(),
            ...setLoading<string>()
          })
        ),
        switchMap(() => {
          return assetsService.getAssetsMock(store.queryParams())
            .pipe(
              tapResponse({
                next: (data) => {
                  patchState(store, {
                    ...setLoaded<string>(),
                    list: data
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
    loadOne: rxMethod<string>(
      pipe(
        tap(() =>
          patchState(store, {
            ...setLoading<string>()
          })
        ),
        switchMap((id) => {
          return assetsService.getAssetById(id)
            .pipe(
              tapResponse({
                next: (data) => {
                  patchState(store, {
                    ...setLoaded<string>(),
                    asset: data
                  })
                },
                error: (err) => {
                  patchState(store, {
                    ...setError<string>(err),
                    asset: null
                  })
                }
              })
            )
        })
      ))
  }))
);
