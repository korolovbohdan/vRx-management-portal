import {VulnerabilityModel} from './valnerability.model';
import {EAssetType} from '../../shared/enum/asset-type.enum';

export class Asset {
  constructor(
    public id: string, // from test task
    public name: string, // from test task
    public type: EAssetType,
    public owner: string,
    public purchaseDate: Date,
    public value: number,
    public vulnerabilities: VulnerabilityModel[] // from test task
  ) {}
}
