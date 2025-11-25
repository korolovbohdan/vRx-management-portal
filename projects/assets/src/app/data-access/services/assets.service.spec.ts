import {TestBed} from '@angular/core/testing';
import {AssetsService} from './assets.service';
import {IQueryAsset} from '../common/dto/request.dto';

describe('AssetsService', () => {
  let service: AssetsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssetsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getAssetsMock', () => {
    it('should return an Observable of asset array', (done) => {
      const query: IQueryAsset = {};
      service.getAssetsMock(query).subscribe({
        next: (assets) => {
          expect(assets).toBeDefined();
          expect(Array.isArray(assets)).toBe(true);
          expect(assets.length).toBe(10);
          done();
        },
        error: (err) => {
          fail(`Expected success but got error: ${err}`);
          done();
        }
      });
    });

    it('should return assets with correct structure', (done) => {
      const query: IQueryAsset = {};
      service.getAssetsMock(query).subscribe({
        next: (assets) => {
          assets.forEach(asset => {
            expect(asset.id).toBeDefined();
            expect(asset.name).toBeDefined();
            expect(asset.status).toBeDefined();
            expect(asset.owner).toBeDefined();
            expect(typeof asset.id).toBe('string');
            expect(typeof asset.name).toBe('string');
            expect(typeof asset.status).toBe('string');
            expect(typeof asset.owner).toBe('string');
          });
          done();
        },
        error: (err) => {
          fail(`Expected success but got error: ${err}`);
          done();
        }
      });
    });

    it('should return expected mock data', (done) => {
      const query: IQueryAsset = {};
      service.getAssetsMock(query).subscribe({
        next: (assets) => {
          expect(assets[0]).toEqual({
            id: '1',
            name: 'Asset 1',
            status: 'active',
            owner: 'Owner A'
          });
          expect(assets[1]).toEqual({
            id: '2',
            name: 'Asset 2',
            status: 'inactive',
            owner: 'Owner B'
          });
          done();
        },
        error: (err) => {
          fail(`Expected success but got error: ${err}`);
          done();
        }
      });
    });

    it('should handle query parameter (even though mock ignores it)', (done) => {
      const query: IQueryAsset = {
        sort: 'name',
        order: 'asc',
        status: 'active',
        owner: 'Owner A'
      };
      service.getAssetsMock(query).subscribe({
        next: (assets) => {
          expect(assets).toBeDefined();
          expect(assets.length).toBe(10);
          done();
        },
        error: (err) => {
          fail(`Expected success but got error: ${err}`);
          done();
        }
      });
    });
  });

  describe('getAssetByIdMock', () => {
    it('should return an Observable of asset detail', (done) => {
      const id = '1';
      service.getAssetByIdMock(id).subscribe({
        next: (asset) => {
          expect(asset).toBeDefined();
          expect(asset.id).toBe(id);
          done();
        },
        error: (err) => {
          fail(`Expected success but got error: ${err}`);
          done();
        }
      });
    });

    it('should return asset detail with correct structure', (done) => {
      const id = '1';
      service.getAssetByIdMock(id).subscribe({
        next: (asset) => {
          expect(asset.id).toBeDefined();
          expect(asset.name).toBeDefined();
          expect(asset.status).toBeDefined();
          expect(asset.owner).toBeDefined();
          expect(asset.vulnerabilities).toBeDefined();
          expect(Array.isArray(asset.vulnerabilities)).toBe(true);
          done();
        },
        error: (err) => {
          fail(`Expected success but got error: ${err}`);
          done();
        }
      });
    });

    it('should return asset with correct id', (done) => {
      const id = 'test-id-123';
      service.getAssetByIdMock(id).subscribe({
        next: (asset) => {
          expect(asset.id).toBe(id);
          expect(asset.name).toBe(`Asset ${id}`);
          expect(asset.owner).toBe(`Owner ${id}`);
          done();
        },
        error: (err) => {
          fail(`Expected success but got error: ${err}`);
          done();
        }
      });
    });

    it('should return vulnerabilities with correct structure', (done) => {
      const id = '1';
      service.getAssetByIdMock(id).subscribe({
        next: (asset) => {
          expect(asset.vulnerabilities.length).toBe(2);
          asset.vulnerabilities.forEach(vuln => {
            expect(vuln.id).toBeDefined();
            expect(vuln.description).toBeDefined();
            expect(vuln.severity).toBeDefined();
            expect(typeof vuln.id).toBe('string');
            expect(typeof vuln.description).toBe('string');
            expect(typeof vuln.severity).toBe('string');
          });
          expect(asset.vulnerabilities[0]).toEqual({
            id: 'vuln1',
            description: 'Vulnerability 1',
            severity: 'high'
          });
          done();
        },
        error: (err) => {
          fail(`Expected success but got error: ${err}`);
          done();
        }
      });
    });

    it('should return different asset details for different ids', (done) => {
      const id1 = '1';
      const id2 = '2';
      let asset1: any;
      let asset2: any;

      service.getAssetByIdMock(id1).subscribe({
        next: (asset) => {
          asset1 = asset;
          service.getAssetByIdMock(id2).subscribe({
            next: (asset) => {
              asset2 = asset;
              expect(asset1.id).not.toBe(asset2.id);
              expect(asset1.name).not.toBe(asset2.name);
              expect(asset1.owner).not.toBe(asset2.owner);
              done();
            },
            error: (err) => {
              fail(`Expected success but got error: ${err}`);
              done();
            }
          });
        },
        error: (err) => {
          fail(`Expected success but got error: ${err}`);
          done();
        }
      });
    });
  });
});

