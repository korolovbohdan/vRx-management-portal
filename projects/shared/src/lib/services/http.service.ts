import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpContext } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface HttpOptions {
  headers?: HttpHeaders | { [header: string]: string | string[] };
  params?: HttpParams | { [param: string]: any };
  context?: HttpContext;
  observe?: 'body';
  reportProgress?: boolean;
  responseType?: 'json';
  withCredentials?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private readonly http = inject(HttpClient);

  /**
   * Performs a GET request
   * @param url The endpoint URL
   * @param options Optional HTTP options
   * @returns Observable of the response.dto.ts body
   */
  get<T>(url: string, options?: HttpOptions): Observable<T> {
    return this.http.get<T>(url, { ...options, observe: 'body' });
  }

  /**
   * Performs a POST request
   * @param url The endpoint URL
   * @param body The request body
   * @param options Optional HTTP options
   * @returns Observable of the response.dto.ts body
   */
  post<T>(url: string, body: any, options?: HttpOptions): Observable<T> {
    return this.http.post<T>(url, body, { ...options, observe: 'body' });
  }

  /**
   * Performs a PUT request
   * @param url The endpoint URL
   * @param body The request body
   * @param options Optional HTTP options
   * @returns Observable of the response.dto.ts body
   */
  put<T>(url: string, body: any, options?: HttpOptions): Observable<T> {
    return this.http.put<T>(url, body, { ...options, observe: 'body' });
  }

  /**
   * Performs a PATCH request
   * @param url The endpoint URL
   * @param body The request body
   * @param options Optional HTTP options
   * @returns Observable of the response.dto.ts body
   */
  patch<T>(url: string, body: any, options?: HttpOptions): Observable<T> {
    return this.http.patch<T>(url, body, { ...options, observe: 'body' });
  }

  /**
   * Performs a DELETE request
   * @param url The endpoint URL
   * @param options Optional HTTP options
   * @returns Observable of the response.dto.ts body
   */
  delete<T>(url: string, options?: HttpOptions): Observable<T> {
    return this.http.delete<T>(url, { ...options, observe: 'body' });
  }
}

