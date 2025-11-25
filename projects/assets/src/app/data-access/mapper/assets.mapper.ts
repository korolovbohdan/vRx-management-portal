import {Injectable} from '@angular/core';
import {Asset} from '../models/asset.model';
import {IAssetDetailResponse, IAssetResponse} from '../common/dto/response.dto';
import {AssetDetail} from '../models/asset-detail.model';
import {Vulnerability} from '../models/vulnerability.model';

@Injectable({
  providedIn: 'root',
})
export class AssetsMapper {
  static toAssetModel(data: IAssetResponse): Asset {
    return new Asset(
      data.id,
      data.name,
      data.status,
      data.owner
    )
  }

  static toAssetModelList(data: IAssetResponse[]): Asset[] {
    return data.map(AssetsMapper.toAssetModel);
  }

  static toAssetDetailModel(data: IAssetDetailResponse): AssetDetail {
    return new AssetDetail(
      data.id,
      data.name,
      data.status,
      data.owner,
      AssetsMapper.toVulnerabilityModelList(data.vulnerabilities || [])
    )
  }

  static toVulnerabilityModelList(data: IAssetDetailResponse['vulnerabilities']): Vulnerability[] {
    return data.map(v =>
      new Vulnerability(v.id, v.description, v.severity)
    );
  }
}
