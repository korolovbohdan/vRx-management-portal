import {inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {IQueryAsset} from '../common/dto/request.dto';
import {IAssetDetailResponse, IAssetResponse} from '../common/dto/response.dto';
import {HttpService} from 'shared';

@Injectable({
  providedIn: 'root'
})
export class AssetsService {
  private readonly http = inject(HttpService);
  private readonly baseUrl = '/assets';

  /**
   * Get all asset
   * @returns Observable of asset array
   */
  // getAssets(query: IQueryAsset): Observable<IAssetResponse[]> {
  //   return this.http.get<IAssetResponse[]>(this.baseUrl, {params: query});
  // }

  /**
   * Get mock assets for testing
   * @returns Observable of mock asset array
   */
  getAssetsMock(query: IQueryAsset): Observable<IAssetResponse[]> {
    const mockAssets: IAssetResponse[] = [
      {id: '1', name: 'Asset 1', status: 'active', owner: 'Owner A'},
      {id: '2', name: 'Asset 2', status: 'inactive', owner: 'Owner B'},
      {id: '3', name: 'Asset 3', status: 'active', owner: 'Owner C'},
      {id: '4', name: 'Asset 4', status: 'active', owner: 'Owner D'},
      {id: '5', name: 'Asset 5', status: 'inactive', owner: 'Owner E'},
      {id: '6', name: 'Asset 6', status: 'active', owner: 'Owner F'},
      {id: '7', name: 'Asset 7', status: 'active', owner: 'Owner G'},
      {id: '8', name: 'Asset 8', status: 'inactive', owner: 'Owner H'},
      {id: '9', name: 'Asset 9', status: 'active', owner: 'Owner I'},
      {id: '10', name: 'Asset 10', status: 'inactive', owner: 'Owner J'},
    ];
    return new Observable<IAssetResponse[]>(observer => {
      observer.next(mockAssets);
      observer.complete();
    });
  }

  /**
   * Get asset by ID
   * @param id Asset ID
   * @returns Observable of asset detail
   */
  // getAssetById(id: string): Observable<IAssetDetailResponse> {
  //   return this.http.get<IAssetDetailResponse>(`${this.baseUrl}/${id}`);
  // }

  /**
   * Get mock asset detail by ID for testing
   * @param id
   */
  getAssetByIdMock(id: string): Observable<IAssetDetailResponse> {
    const mockAssetDetail: IAssetDetailResponse = {
      id,
      name: `Asset ${id}`,
      status: 'active',
      owner: `Owner ${id}`,
      vulnerabilities: [
        {id: 'vuln1', description: 'Vulnerability 1', severity: 'high'},
        {id: 'vuln2', description: 'Vulnerability 2', severity: 'medium'},
      ],
    };
    return new Observable<IAssetDetailResponse>(observer => {
      observer.next(mockAssetDetail);
      observer.complete();
    });
  }
}

