import { Injectable } from '@angular/core';
import { Http, RequestOptions, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/internal/Observable';
import { AppSettingsService } from './app-settings.service';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private httpClient: HttpClient,
    protected settings: AppSettingsService
  ) { }

  public get(url: string, params?: any);
  public get<T>(url: string, params?: any): Observable<T>;

  public get<T>(url: string, params?: any): Observable<T> {
    const options = {
      headers: new HttpHeaders(
        {
            'Content-Type': 'application/json',
        }),
      params: params
    };

    return this.httpClient.get<T>(this.buildUrl(url), options);
  }

  public post(url: string, payload: any);
  public post<T>(url: string, payload: T): Observable<T>;

  public post<T>(url: string, payload: any): Observable<T> {
    const options = {
      headers: new HttpHeaders(
        {
            'Content-Type': 'application/json',
        }),
    };

    return this.httpClient.post<T>(this.buildUrl(url), payload, options);
  }

  public put(url: string, payload: any);
  public put<T>(url: string, payload: T): Observable<T>;

  public put<T>(url: string, payload: any): Observable<T> {
    const options = {
      headers: new HttpHeaders(
        {
            'Content-Type': 'application/json',
        }),
    };

    return this.httpClient.put<T>(this.buildUrl(url), payload, options);
  }

  protected buildUrl(relativeUrl: string) {
    return this.settings.getBaseUrl() + relativeUrl;
  }
}
