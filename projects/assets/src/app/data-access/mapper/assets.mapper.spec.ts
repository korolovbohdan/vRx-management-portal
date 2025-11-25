import {AssetsMapper} from './assets.mapper';
import {IAssetResponse, IAssetDetailResponse} from '../common/dto/response.dto';
import {Asset} from '../models/asset.model';
import {AssetDetail} from '../models/asset-detail.model';
import {Vulnerability} from '../models/vulnerability.model';

describe('AssetsMapper', () => {
  describe('toAssetModel', () => {
    it('should map IAssetResponse to Asset model', () => {
      const response: IAssetResponse = {
        id: '1',
        name: 'Test Asset',
        status: 'active',
        owner: 'Test Owner'
      };

      const result = AssetsMapper.toAssetModel(response);

      expect(result).toBeInstanceOf(Asset);
      expect(result.id).toBe('1');
      expect(result.name).toBe('Test Asset');
      expect(result.status).toBe('active');
      expect(result.owner).toBe('Test Owner');
    });

    it('should handle all asset properties correctly', () => {
      const response: IAssetResponse = {
        id: 'test-id',
        name: 'Asset Name',
        status: 'inactive',
        owner: 'Owner Name'
      };

      const result = AssetsMapper.toAssetModel(response);

      expect(result.id).toBe('test-id');
      expect(result.name).toBe('Asset Name');
      expect(result.status).toBe('inactive');
      expect(result.owner).toBe('Owner Name');
    });
  });

  describe('toAssetModelList', () => {
    it('should map array of IAssetResponse to array of Asset models', () => {
      const responses: IAssetResponse[] = [
        {id: '1', name: 'Asset 1', status: 'active', owner: 'Owner 1'},
        {id: '2', name: 'Asset 2', status: 'inactive', owner: 'Owner 2'},
        {id: '3', name: 'Asset 3', status: 'active', owner: 'Owner 3'}
      ];

      const result = AssetsMapper.toAssetModelList(responses);

      expect(result.length).toBe(3);
      expect(result[0]).toBeInstanceOf(Asset);
      expect(result[1]).toBeInstanceOf(Asset);
      expect(result[2]).toBeInstanceOf(Asset);
      expect(result[0].id).toBe('1');
      expect(result[1].id).toBe('2');
      expect(result[2].id).toBe('3');
    });

    it('should return empty array for empty input', () => {
      const responses: IAssetResponse[] = [];

      const result = AssetsMapper.toAssetModelList(responses);

      expect(result.length).toBe(0);
      expect(Array.isArray(result)).toBe(true);
    });

    it('should map each item using toAssetModel', () => {
      const responses: IAssetResponse[] = [
        {id: '1', name: 'Asset 1', status: 'active', owner: 'Owner 1'}
      ];

      const result = AssetsMapper.toAssetModelList(responses);

      expect(result[0]).toEqual(AssetsMapper.toAssetModel(responses[0]));
    });
  });

  describe('toVulnerabilityModelList', () => {
    it('should map array of IVulnerabilityResponse to array of Vulnerability models', () => {
      const responses: IAssetDetailResponse['vulnerabilities'] = [
        {id: 'vuln1', severity: 'high', description: 'High severity vulnerability'},
        {id: 'vuln2', severity: 'medium', description: 'Medium severity vulnerability'}
      ];

      const result = AssetsMapper.toVulnerabilityModelList(responses);

      expect(result.length).toBe(2);
      expect(result[0]).toBeInstanceOf(Vulnerability);
      expect(result[1]).toBeInstanceOf(Vulnerability);
      expect(result[0].id).toBe('vuln1');
      expect(result[0].severity).toBe('high');
      expect(result[0].description).toBe('High severity vulnerability');
      expect(result[1].id).toBe('vuln2');
      expect(result[1].severity).toBe('medium');
      expect(result[1].description).toBe('Medium severity vulnerability');
    });

    it('should return empty array for empty input', () => {
      const responses: IAssetDetailResponse['vulnerabilities'] = [];

      const result = AssetsMapper.toVulnerabilityModelList(responses);

      expect(result.length).toBe(0);
      expect(Array.isArray(result)).toBe(true);
    });

    it('should map vulnerability properties in correct order', () => {
      const responses: IAssetDetailResponse['vulnerabilities'] = [
        {id: 'v1', severity: 'low', description: 'Low severity'}
      ];

      const result = AssetsMapper.toVulnerabilityModelList(responses);

      expect(result[0].id).toBe('v1');
      expect(result[0].description).toBe('Low severity');
      expect(result[0].severity).toBe('low');
    });
  });

  describe('toAssetDetailModel', () => {
    it('should map IAssetDetailResponse to AssetDetail model', () => {
      const response: IAssetDetailResponse = {
        id: '1',
        name: 'Test Asset',
        status: 'active',
        owner: 'Test Owner',
        vulnerabilities: [
          {id: 'vuln1', severity: 'high', description: 'Vulnerability 1'}
        ]
      };

      const result = AssetsMapper.toAssetDetailModel(response);

      expect(result).toBeInstanceOf(AssetDetail);
      expect(result).toBeInstanceOf(Asset);
      expect(result.id).toBe('1');
      expect(result.name).toBe('Test Asset');
      expect(result.status).toBe('active');
      expect(result.owner).toBe('Test Owner');
      expect(result.vulnerabilities.length).toBe(1);
      expect(result.vulnerabilities[0]).toBeInstanceOf(Vulnerability);
    });

    it('should map vulnerabilities correctly', () => {
      const response: IAssetDetailResponse = {
        id: '1',
        name: 'Test Asset',
        status: 'active',
        owner: 'Test Owner',
        vulnerabilities: [
          {id: 'vuln1', severity: 'high', description: 'Vuln 1'},
          {id: 'vuln2', severity: 'medium', description: 'Vuln 2'}
        ]
      };

      const result = AssetsMapper.toAssetDetailModel(response);

      expect(result.vulnerabilities.length).toBe(2);
      expect(result.vulnerabilities[0].id).toBe('vuln1');
      expect(result.vulnerabilities[1].id).toBe('vuln2');
    });

    it('should handle empty vulnerabilities array', () => {
      const response: IAssetDetailResponse = {
        id: '1',
        name: 'Test Asset',
        status: 'active',
        owner: 'Test Owner',
        vulnerabilities: []
      };

      const result = AssetsMapper.toAssetDetailModel(response);

      expect(result.vulnerabilities.length).toBe(0);
      expect(Array.isArray(result.vulnerabilities)).toBe(true);
    });

    it('should handle undefined vulnerabilities by using empty array', () => {
      const response: IAssetDetailResponse = {
        id: '1',
        name: 'Test Asset',
        status: 'active',
        owner: 'Test Owner',
        vulnerabilities: undefined as any
      };

      const result = AssetsMapper.toAssetDetailModel(response);

      expect(result.vulnerabilities.length).toBe(0);
      expect(Array.isArray(result.vulnerabilities)).toBe(true);
    });

    it('should create AssetDetail that extends Asset correctly', () => {
      const response: IAssetDetailResponse = {
        id: '1',
        name: 'Test Asset',
        status: 'active',
        owner: 'Test Owner',
        vulnerabilities: []
      };

      const result = AssetsMapper.toAssetDetailModel(response);

      expect(result instanceof AssetDetail).toBe(true);
      expect(result instanceof Asset).toBe(true);
      expect(result.id).toBe('1');
      expect(result.name).toBe('Test Asset');
      expect(result.status).toBe('active');
      expect(result.owner).toBe('Test Owner');
    });
  });
});
