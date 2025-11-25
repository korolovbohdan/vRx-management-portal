import {inject, Injectable} from '@angular/core';
import {AssetStore} from '../store/asset.store';
import {IQueryAsset} from '../common/dto/request.dto';

@Injectable({
  providedIn: 'root'
})
export class AssetsApplicationService {
  private readonly _store = inject(AssetStore)

  listAssets = this._store.list;

  queryParams = this._store.queryParams;

  asset = this._store.asset;

  callState = this._store.callState;

  loadByQueryParams(queryParams?: IQueryAsset): void {
    this._store.loadList(queryParams);
  }

  loadAssetDetail(id: string): void {
    this._store.loadOne(id);
  }
}
