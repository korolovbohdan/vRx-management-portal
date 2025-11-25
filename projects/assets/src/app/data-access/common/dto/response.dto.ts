export interface IAssetResponse {
  id: string;
  name: string;
  status: string;
  owner: string;
}

export interface IAssetDetailResponse extends IAssetResponse {
  vulnerabilities: IVulnerabilityResponse[];
}

export interface IVulnerabilityResponse {
  id: string;
  severity: string;
  description: string;
}
