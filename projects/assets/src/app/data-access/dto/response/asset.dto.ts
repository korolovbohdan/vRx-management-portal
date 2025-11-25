export interface AssetResponseDto {
  id: string;
  name: string;
  type: string;
  owner: string;
  purchaseDate: string; // ISO string format
  value: number;
  vulnerabilities: VulnerabilityResponseDto[];
}

export class VulnerabilityResponseDto {
  id: string;
  name: string;
  description: string;
  severity: string;
  discoveredDate: string; // ISO string format
}
