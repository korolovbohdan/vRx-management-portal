import {ComponentFixture, TestBed} from '@angular/core/testing';
import {List} from './list';
import {AssetsApplicationService} from '../../data-access/application/assets-application.service';
import {Asset} from '../../data-access/models/asset.model';
import {signal} from '@angular/core';
import {IQueryAsset} from '../../data-access/common/dto/request.dto';
import {Router} from '@angular/router';

describe('List', () => {
  let component: List;
  let fixture: ComponentFixture<List>;
  let mockAssetsApplicationService: jasmine.SpyObj<AssetsApplicationService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const mockListAssets = signal<Asset[]>([]);
    const mockQueryParams = signal<IQueryAsset>({});
    const mockCallState = signal<string>('idle');

    mockAssetsApplicationService = jasmine.createSpyObj(
      'AssetsApplicationService',
      ['loadByQueryParams'],
      {
        listAssets: mockListAssets,
        queryParams: mockQueryParams,
        callState: mockCallState
      }
    );

    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [List],
      providers: [
        {provide: AssetsApplicationService, useValue: mockAssetsApplicationService},
        {provide: Router, useValue: mockRouter}
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(List);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('initialization', () => {
    it('should inject AssetsApplicationService', () => {
      expect(component['_assetsApplicationService']).toBeDefined();
      expect(component['_assetsApplicationService']).toBe(mockAssetsApplicationService);
    });

    it('should expose listAssets signal from service', () => {
      expect((component as any).listAssets).toBeDefined();
      expect((component as any).listAssets).toBe(mockAssetsApplicationService.listAssets);
    });

    it('should expose queryParams signal from service', () => {
      expect((component as any).queryParams).toBeDefined();
      expect((component as any).queryParams).toBe(mockAssetsApplicationService.queryParams);
    });

    it('should expose callState signal from service', () => {
      expect((component as any).callState).toBeDefined();
      expect((component as any).callState).toBe(mockAssetsApplicationService.callState);
    });

    it('should call loadByQueryParams on ngOnInit', () => {
      expect(mockAssetsApplicationService.loadByQueryParams).not.toHaveBeenCalled();
      component.ngOnInit();
      expect(mockAssetsApplicationService.loadByQueryParams).toHaveBeenCalledWith();
      expect(mockAssetsApplicationService.loadByQueryParams).toHaveBeenCalledTimes(1);
    });
  });

  describe('template rendering', () => {
    it('should render table with empty assets list', () => {
      (mockAssetsApplicationService.listAssets as any).set([]);
      fixture.detectChanges();

      const compiled = fixture.nativeElement as HTMLElement;
      const table = compiled.querySelector('p-table');
      expect(table).toBeTruthy();
    });

    it('should render table with assets data', () => {
      const testAssets: Asset[] = [
        new Asset('1', 'Asset 1', 'active', 'Owner 1'),
        new Asset('2', 'Asset 2', 'inactive', 'Owner 2'),
        new Asset('3', 'Asset 3', 'active', 'Owner 3')
      ];

      (mockAssetsApplicationService.listAssets as any).set(testAssets);
      fixture.detectChanges();

      const compiled = fixture.nativeElement as HTMLElement;
      const table = compiled.querySelector('p-table');
      expect(table).toBeTruthy();
    });

    it('should display table headers', () => {
      fixture.detectChanges();

      const compiled = fixture.nativeElement as HTMLElement;
      const headers = compiled.querySelectorAll('th');
      expect(headers.length).toBe(4);
      expect(headers[0].textContent?.trim()).toBe('Id');
      expect(headers[1].textContent?.trim()).toBe('Name');
      expect(headers[2].textContent?.trim()).toBe('Status');
      expect(headers[3].textContent?.trim()).toBe('Owner');
    });

    it('should render asset rows with correct data', () => {
      const testAssets: Asset[] = [
        new Asset('1', 'Asset 1', 'active', 'Owner 1'),
        new Asset('2', 'Asset 2', 'inactive', 'Owner 2')
      ];

      (mockAssetsApplicationService.listAssets as any).set(testAssets);
      fixture.detectChanges();

      const compiled = fixture.nativeElement as HTMLElement;
      // Note: PrimeNG table renders content dynamically, so we check for the component existence
      const table = compiled.querySelector('p-table');
      expect(table).toBeTruthy();
      expect(table?.getAttribute('ng-reflect-value')).toBeDefined();
    });
  });

  describe('signals reactivity', () => {
    it('should update when listAssets signal changes', () => {
      const initialAssets: Asset[] = [new Asset('1', 'Asset 1', 'active', 'Owner 1')];
      (mockAssetsApplicationService.listAssets as any).set(initialAssets);
      fixture.detectChanges();

      expect((component as any).listAssets().length).toBe(1);

      const updatedAssets: Asset[] = [
        new Asset('1', 'Asset 1', 'active', 'Owner 1'),
        new Asset('2', 'Asset 2', 'inactive', 'Owner 2')
      ];
      (mockAssetsApplicationService.listAssets as any).set(updatedAssets);
      fixture.detectChanges();

      expect((component as any).listAssets().length).toBe(2);
    });

    it('should reflect queryParams changes', () => {
      const initialParams: IQueryAsset = {};
      (mockAssetsApplicationService.queryParams as any).set(initialParams);
      fixture.detectChanges();

      expect((component as any).queryParams()).toEqual({});

      const updatedParams: IQueryAsset = {sort: 'name', order: 'asc'};
      (mockAssetsApplicationService.queryParams as any).set(updatedParams);
      fixture.detectChanges();

      expect((component as any).queryParams()).toEqual(updatedParams);
    });

    it('should reflect callState changes', () => {
      (mockAssetsApplicationService.callState as any).set('idle');
      fixture.detectChanges();

      expect((component as any).callState()).toBe('idle');

      (mockAssetsApplicationService.callState as any).set('loading');
      fixture.detectChanges();

      expect((component as any).callState()).toBe('loading');
    });
  });
});
