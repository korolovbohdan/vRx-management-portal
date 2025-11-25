import {Injectable, inject} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpService} from 'shared';
import {IQueryFinding} from '../common/dto/request.dto';
import {IFindingResponse} from '../common/dto/response.dto';

@Injectable({
  providedIn: 'root'
})
export class FindingsService {
  private readonly http = inject(HttpService);
  private readonly baseUrl = '/findings';

  /**
   * Get all finding
   * @returns Observable of finding array
   */
  getFindings(query: IQueryFinding): Observable<IFindingResponse[]> {
    return this.http.get<IFindingResponse[]>(this.baseUrl, {params: query});
  }

  /**
   * Get mock findings for testing
   * @returns Observable of mock finding array
   */
  getFindingsMock(): Observable<IFindingResponse[]> {
    const mockFindings: IFindingResponse[] = [
      {id: '1', assetId: '1', severity: 'high', title: 'Finding 1', status: 'open'},
      {id: '2', assetId: '2', severity: 'medium', title: 'Finding 2', status: 'in progress'},
      {id: '3', assetId: '3', severity: 'low', title: 'Finding 3', status: 'resolved'},
      {id: '4', assetId: '1', severity: 'high', title: 'Finding 4', status: 'open'},
      {id: '5', assetId: '2', severity: 'medium', title: 'Finding 5', status: 'in progress'},
      {id: '6', assetId: '3', severity: 'low', title: 'Finding 6', status: 'resolved'},
      {id: '7', assetId: '1', severity: 'high', title: 'Finding 7', status: 'open'},
      {id: '8', assetId: '2', severity: 'medium', title: 'Finding 8', status: 'in progress'},
      {id: '9', assetId: '3', severity: 'low', title: 'Finding 9', status: 'resolved'},
      {id: '10', assetId: '1', severity: 'high', title: 'Finding 10', status: 'open'},
    ];
    return new Observable<IFindingResponse[]>(observer => {
      observer.next(mockFindings);
      observer.complete();
    });
  }

  /**
   * Update finding status
   * @param id Finding ID
   * @param status New status (e.g., 'resolved')
   * @returns Observable of updated finding
   */
  updateFindingStatus(id: string, status: string): Observable<void> {
    return this.http.patch<void>(`${this.baseUrl}/${id}`, {status});
  }

  /**
   * Mock update finding status for testing
   * @param id Finding ID
   * @param status New status
   * @returns Observable of void
   */
  updateFindingStatusMock(id: string, status: string): Observable<void> {
    return new Observable<void>(observer => {
      console.log(`Mock update finding ${id} status to ${status}`);
      observer.next();
      observer.complete();
    });
  }
}

