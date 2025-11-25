import {TestBed} from '@angular/core/testing';
import {AssetsApplicationService} from './assets-application.service';
import {AssetStore} from '../store/asset.store';
import {IQueryAsset} from '../common/dto/request.dto';
import {Asset} from '../models/asset.model';
import {AssetDetail} from '../models/asset-detail.model';
import {Vulnerability} from '../models/vulnerability.model';
import {signal} from '@angular/core';

describe('AssetsApplicationService', () => {
  let service: AssetsApplicationService;
  let mockStore: any;

  beforeEach(() => {
    const mockList = signal<Asset[]>([]);
    const mockQueryParams = signal<IQueryAsset>({});
    const mockAsset = signal<AssetDetail | null>(null);
    const mockCallState = signal<any>({});

    mockStore = jasmine.createSpyObj('AssetStore', ['loadList', 'loadOne'], {
      list: mockList,
      queryParams: mockQueryParams,
      asset: mockAsset,
      callState: mockCallState
    });

    TestBed.configureTestingModule({
      providers: [
        AssetsApplicationService,
        {provide: AssetStore, useValue: mockStore}
      ]
    });
    service = TestBed.inject(AssetsApplicationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('properties', () => {
    it('should expose listAssets from store', () => {
      expect(service.listAssets).toBeDefined();
      expect(service.listAssets).toBe(mockStore.list);
    });

    it('should expose queryParams from store', () => {
      expect(service.queryParams).toBeDefined();
      expect(service.queryParams).toBe(mockStore.queryParams);
    });

    it('should expose asset from store', () => {
      expect(service.asset).toBeDefined();
      expect(service.asset).toBe(mockStore.asset);
    });

    it('should expose callState from store', () => {
      expect(service.callState).toBeDefined();
      expect(service.callState).toBe(mockStore.callState);
    });
  });

  describe('loadByQueryParams', () => {
    it('should call store.loadList with query params', () => {
      const queryParams: IQueryAsset = {
        sort: 'name',
        order: 'asc',
        status: 'active'
      };

      service.loadByQueryParams(queryParams);

      expect(mockStore.loadList).toHaveBeenCalledWith(queryParams);
      expect(mockStore.loadList).toHaveBeenCalledTimes(1);
    });

    it('should call store.loadList with undefined when no params provided', () => {
      service.loadByQueryParams();

      expect(mockStore.loadList).toHaveBeenCalledWith(undefined);
      expect(mockStore.loadList).toHaveBeenCalledTimes(1);
    });

    it('should handle empty query params object', () => {
      const queryParams: IQueryAsset = {};

      service.loadByQueryParams(queryParams);

      expect(mockStore.loadList).toHaveBeenCalledWith(queryParams);
    });

    it('should handle query params with all properties', () => {
      const queryParams: IQueryAsset = {
        sort: 'status',
        order: 'desc',
        status: 'inactive',
        owner: 'Test Owner'
      };

      service.loadByQueryParams(queryParams);

      expect(mockStore.loadList).toHaveBeenCalledWith(queryParams);
    });
  });

  describe('loadAssetDetail', () => {
    it('should call store.loadOne with asset id', () => {
      const id = 'test-id-123';

      service.loadAssetDetail(id);

      expect(mockStore.loadOne).toHaveBeenCalledWith(id);
      expect(mockStore.loadOne).toHaveBeenCalledTimes(1);
    });

    it('should handle different asset ids', () => {
      const id1 = 'asset-1';
      const id2 = 'asset-2';

      service.loadAssetDetail(id1);
      service.loadAssetDetail(id2);

      expect(mockStore.loadOne).toHaveBeenCalledWith(id1);
      expect(mockStore.loadOne).toHaveBeenCalledWith(id2);
      expect(mockStore.loadOne).toHaveBeenCalledTimes(2);
    });

    it('should handle empty string id', () => {
      const id = '';

      service.loadAssetDetail(id);

      expect(mockStore.loadOne).toHaveBeenCalledWith(id);
    });
  });

  describe('integration with store', () => {
    it('should reflect store state changes in exposed properties', () => {
      const testAssets = [
        new Asset('1', 'Asset 1', 'active', 'Owner 1'),
        new Asset('2', 'Asset 2', 'inactive', 'Owner 2')
      ];
      const testQueryParams: IQueryAsset = {sort: 'name', order: 'asc'};
      const testAssetDetail = new AssetDetail(
        '1',
        'Asset 1',
        'active',
        'Owner 1',
        [new Vulnerability('v1', 'high', 'Test vulnerability')]
      );

      (mockStore.list as any).set(testAssets);
      (mockStore.queryParams as any).set(testQueryParams);
      (mockStore.asset as any).set(testAssetDetail);

      expect(service.listAssets()).toEqual(testAssets);
      expect(service.queryParams()).toEqual(testQueryParams);
      expect(service.asset()).toEqual(testAssetDetail);
    });
  });
});
