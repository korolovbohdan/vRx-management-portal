import {Component, inject, OnInit, Signal} from '@angular/core';
import {AssetsApplicationService} from '../../data-access/application/assets-application.service';
import {Asset} from '../../data-access/models/asset.model';
import {AssetStore} from '../../data-access/store/asset.store';
import {TableModule} from 'primeng/table';
import {RouterLink} from '@angular/router';
import {HttpService} from 'shared';

@Component({
  selector: 'app-list',
  templateUrl: './list.html',
  styleUrl: './list.scss',
  imports: [
    TableModule,
    RouterLink,
  ],
  providers: [
    HttpService,
    AssetStore,
    AssetsApplicationService,
  ]
})
export class List implements OnInit {
  private readonly _assetsApplicationService = inject(AssetsApplicationService);

  protected listAssets: Signal<Asset[]> = this._assetsApplicationService.listAssets;

  protected queryParams = this._assetsApplicationService.queryParams;

  protected callState = this._assetsApplicationService.callState;

  ngOnInit(): void {
    this._assetsApplicationService.loadByQueryParams();
  }
}
