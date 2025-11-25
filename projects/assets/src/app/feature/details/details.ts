import {Component, computed, inject, OnInit, signal} from '@angular/core';
import {AssetsApplicationService} from '../../data-access/application/assets-application.service';
import {ActivatedRoute} from '@angular/router';
import {map} from 'rxjs';
import {AssetStore} from '../../data-access/store/asset.store';

@Component({
  selector: 'app-details',
  templateUrl: './details.html',
  styleUrl: './details.scss',
  providers: [AssetsApplicationService, AssetStore],
})
export class Details implements OnInit {
  private _assetApplicationService = inject(AssetsApplicationService);

  private _activatedRoute = inject(ActivatedRoute);

  protected asset = this._assetApplicationService.asset;

  protected isAssetIdProvided = signal(true);

  protected isLoading = computed(() =>
    this._assetApplicationService.callState() === 'loading'
  )

  ngOnInit(): void {
    this._activatedRoute.paramMap.pipe(
      map(params => params.get('id'))
    ).subscribe(id => {
      if (id !== null) {
        this._assetApplicationService.loadAssetDetail(id);
      } else {
        this.isAssetIdProvided.set(false)
      }
    });
  }
}
