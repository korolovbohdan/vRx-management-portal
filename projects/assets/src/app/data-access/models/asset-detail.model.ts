import {Asset} from './asset.model';
import {Vulnerability} from './vulnerability.model';


export class AssetDetail extends Asset {
  constructor(
    id: string,
    name: string,
    status: string,
    owner: string,
    readonly vulnerabilities: Vulnerability[]
  ) {
    super(id, name, status, owner);
  }
}
