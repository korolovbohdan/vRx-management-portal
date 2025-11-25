import {ComponentFixture, TestBed} from '@angular/core/testing';
import {Details} from './details';
import {AssetsApplicationService} from '../../data-access/application/assets-application.service';
import {ActivatedRoute} from '@angular/router';
import {BehaviorSubject, of} from 'rxjs';
import {AssetDetail} from '../../data-access/models/asset-detail.model';
import {Asset} from '../../data-access/models/asset.model';
import {Vulnerability} from '../../data-access/models/vulnerability.model';
import {signal} from '@angular/core';

describe('Details', () => {
  let component: Details;
  let fixture: ComponentFixture<Details>;
  let mockAssetsApplicationService: jasmine.SpyObj<AssetsApplicationService>;
  let mockActivatedRoute: any;
  let paramMapSubject: BehaviorSubject<any>;

  beforeEach(async () => {
    const mockAsset = signal<AssetDetail | null>(null);
    const mockCallState = signal<string>('idle');

    mockAssetsApplicationService = jasmine.createSpyObj(
      'AssetsApplicationService',
      ['loadAssetDetail'],
      {
        asset: mockAsset,
        callState: mockCallState
      }
    );

    paramMapSubject = new BehaviorSubject({
      get: (key: string) => null
    });

    mockActivatedRoute = {
      paramMap: paramMapSubject.asObservable()
    };

    await TestBed.configureTestingModule({
      imports: [Details],
      providers: [
        {provide: AssetsApplicationService, useValue: mockAssetsApplicationService},
        {provide: ActivatedRoute, useValue: mockActivatedRoute}
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Details);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    paramMapSubject.complete();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('initialization', () => {
    it('should inject AssetsApplicationService', () => {
      expect(component['_assetApplicationService']).toBeDefined();
      expect(component['_assetApplicationService']).toBe(mockAssetsApplicationService);
    });

    it('should inject ActivatedRoute', () => {
      expect(component['_activatedRoute']).toBeDefined();
      expect(component['_activatedRoute']).toBe(mockActivatedRoute);
    });

    it('should expose asset signal from service', () => {
      expect((component as any).asset).toBeDefined();
      expect((component as any).asset).toBe(mockAssetsApplicationService.asset);
    });

    it('should initialize isAssetIdProvided as true', () => {
      expect((component as any).isAssetIdProvided()).toBe(true);
    });

    it('should have isLoading computed signal', () => {
      expect((component as any).isLoading).toBeDefined();
    });
  });

  describe('ngOnInit', () => {
    it('should load asset detail when id is provided in route params', () => {
      const testId = 'test-id-123';
      paramMapSubject.next({
        get: (key: string) => key === 'id' ? testId : null
      });

      component.ngOnInit();

      expect(mockAssetsApplicationService.loadAssetDetail).toHaveBeenCalledWith(testId);
      expect(mockAssetsApplicationService.loadAssetDetail).toHaveBeenCalledTimes(1);
    });

    it('should set isAssetIdProvided to false when id is null', () => {
      paramMapSubject.next({
        get: (key: string) => null
      });

      expect((component as any).isAssetIdProvided()).toBe(true);
      component.ngOnInit();
      expect((component as any).isAssetIdProvided()).toBe(false);
    });

    it('should handle multiple route param changes', () => {
      const firstId = 'id-1';
      paramMapSubject.next({
        get: (key: string) => key === 'id' ? firstId : null
      });

      component.ngOnInit();
      expect(mockAssetsApplicationService.loadAssetDetail).toHaveBeenCalledWith(firstId);

      const secondId = 'id-2';
      paramMapSubject.next({
        get: (key: string) => key === 'id' ? secondId : null
      });

      expect(mockAssetsApplicationService.loadAssetDetail).toHaveBeenCalledWith(secondId);
      expect(mockAssetsApplicationService.loadAssetDetail).toHaveBeenCalledTimes(2);
    });

    it('should not call loadAssetDetail when id is null', () => {
      paramMapSubject.next({
        get: (key: string) => null
      });

      component.ngOnInit();

      expect(mockAssetsApplicationService.loadAssetDetail).not.toHaveBeenCalled();
    });
  });

  describe('isLoading computed signal', () => {
    it('should return true when callState is loading', () => {
      (mockAssetsApplicationService.callState as any).set('loading');
      fixture.detectChanges();

      expect((component as any).isLoading()).toBe(true);
    });

    it('should return false when callState is not loading', () => {
      (mockAssetsApplicationService.callState as any).set('idle');
      fixture.detectChanges();

      expect((component as any).isLoading()).toBe(false);

      (mockAssetsApplicationService.callState as any).set('loaded');
      fixture.detectChanges();

      expect((component as any).isLoading()).toBe(false);
    });

    it('should update reactively when callState changes', () => {
      (mockAssetsApplicationService.callState as any).set('idle');
      fixture.detectChanges();
      expect((component as any).isLoading()).toBe(false);

      (mockAssetsApplicationService.callState as any).set('loading');
      fixture.detectChanges();
      expect((component as any).isLoading()).toBe(true);

      (mockAssetsApplicationService.callState as any).set('loaded');
      fixture.detectChanges();
      expect((component as any).isLoading()).toBe(false);
    });
  });

  describe('template rendering', () => {
    it('should show message when asset ID is not provided', () => {
      (component as any).isAssetIdProvided.set(false);
      fixture.detectChanges();

      const compiled = fixture.nativeElement as HTMLElement;
      const message = compiled.querySelector('p');
      expect(message?.textContent).toContain('No asset ID provided');
    });

    it('should show loading message when isLoading is true', () => {
      (component as any).isAssetIdProvided.set(true);
      (mockAssetsApplicationService.callState as any).set('loading');
      fixture.detectChanges();

      const compiled = fixture.nativeElement as HTMLElement;
      const loadingMessage = compiled.querySelector('p');
      expect(loadingMessage?.textContent).toContain('Loading asset details');
    });

    it('should display asset details when loaded', () => {
      const testAsset = new AssetDetail(
        '1',
        'Test Asset',
        'active',
        'Test Owner',
        [
          new Vulnerability('v1', 'high', 'Test vulnerability 1'),
          new Vulnerability('v2', 'medium', 'Test vulnerability 2')
        ]
      );

      (component as any).isAssetIdProvided.set(true);
      (mockAssetsApplicationService.callState as any).set('loaded');
      (mockAssetsApplicationService.asset as any).set(testAsset);
      fixture.detectChanges();

      const compiled = fixture.nativeElement as HTMLElement;
      const assetInfo = compiled.querySelector('.asset-info');
      expect(assetInfo).toBeTruthy();
    });

    it('should display asset ID when asset is loaded', () => {
      const testAsset = new AssetDetail(
        'test-id',
        'Test Asset',
        'active',
        'Test Owner',
        []
      );

      (component as any).isAssetIdProvided.set(true);
      (mockAssetsApplicationService.callState as any).set('loaded');
      (mockAssetsApplicationService.asset as any).set(testAsset);
      fixture.detectChanges();

      const compiled = fixture.nativeElement as HTMLElement;
      const idElement = Array.from(compiled.querySelectorAll('p')).find(
        p => p.textContent?.includes('ID:')
      );
      expect(idElement?.textContent).toContain('test-id');
    });

    it('should display asset name when asset is loaded', () => {
      const testAsset = new AssetDetail(
        '1',
        'My Test Asset',
        'active',
        'Test Owner',
        []
      );

      (component as any).isAssetIdProvided.set(true);
      (mockAssetsApplicationService.callState as any).set('loaded');
      (mockAssetsApplicationService.asset as any).set(testAsset);
      fixture.detectChanges();

      const compiled = fixture.nativeElement as HTMLElement;
      const nameElement = Array.from(compiled.querySelectorAll('p')).find(
        p => p.textContent?.includes('Name:')
      );
      expect(nameElement?.textContent).toContain('My Test Asset');
    });

    it('should display vulnerabilities when asset has them', () => {
      const testAsset = new AssetDetail(
        '1',
        'Test Asset',
        'active',
        'Test Owner',
        [
          new Vulnerability('v1', 'high', 'Vulnerability 1'),
          new Vulnerability('v2', 'medium', 'Vulnerability 2')
        ]
      );

      (component as any).isAssetIdProvided.set(true);
      (mockAssetsApplicationService.callState as any).set('loaded');
      (mockAssetsApplicationService.asset as any).set(testAsset);
      fixture.detectChanges();

      const compiled = fixture.nativeElement as HTMLElement;
      const vulnerabilitiesSection = compiled.querySelector('.asset-vulnerabilities');
      expect(vulnerabilitiesSection).toBeTruthy();
    });

    it('should display heading for asset details', () => {
      fixture.detectChanges();

      const compiled = fixture.nativeElement as HTMLElement;
      const heading = compiled.querySelector('h2');
      expect(heading?.textContent).toContain('Asset Details');
    });

    it('should display vulnerabilities heading when vulnerabilities exist', () => {
      const testAsset = new AssetDetail(
        '1',
        'Test Asset',
        'active',
        'Test Owner',
        [new Vulnerability('v1', 'high', 'Test vulnerability')]
      );

      (component as any).isAssetIdProvided.set(true);
      (mockAssetsApplicationService.callState as any).set('loaded');
      (mockAssetsApplicationService.asset as any).set(testAsset);
      fixture.detectChanges();

      const compiled = fixture.nativeElement as HTMLElement;
      const vulnerabilitiesHeading = compiled.querySelector('h3');
      expect(vulnerabilitiesHeading?.textContent).toContain('Vulnerabilities');
    });
  });

  describe('asset signal reactivity', () => {
    it('should update when asset signal changes', () => {
      expect((component as any).asset()).toBeNull();

      const testAsset = new AssetDetail(
        '1',
        'Test Asset',
        'active',
        'Test Owner',
        []
      );
      (mockAssetsApplicationService.asset as any).set(testAsset);
      fixture.detectChanges();

      expect((component as any).asset()).toBeTruthy();
      expect((component as any).asset()?.id).toBe('1');
      expect((component as any).asset()?.name).toBe('Test Asset');
    });

    it('should handle null asset', () => {
      (mockAssetsApplicationService.asset as any).set(null);
      fixture.detectChanges();

      expect((component as any).asset()).toBeNull();
    });
  });
});
