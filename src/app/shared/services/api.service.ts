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

  public get(url: string, params?: HttpParams);
  public get<T>(url: string, params?: HttpParams): Observable<T>;

  public get<T>(url: string, params?: HttpParams): Observable<T> {
    const options = {
      headers: new HttpHeaders(
        {
            'Content-Type': 'application/json',
        }),
      params: params
    };

    return this.httpClient.get<T>(this.buildUrl(url), options);
  }

  // private objToSearchParams(obj): HttpParams {
  //   const params: HttpParams = new HttpParams();
  //   for (const key in obj) {
  //     if (obj.hasOwnProperty(key)) {
  //       if (Array.isArray(obj[key])) {
  //         for (let i = 0; i < obj[key].length; i++) {
  //           params.set(`${key}[${i}]`, obj[key][i]);
  //         }
  //       } else {
  //         params.set(key, obj[key]);
  //       }
  //     }
  //   }

  //   if (obj && obj instanceof Map) {
  //     obj.forEach((value, name) => params.set(name, value));
  //   }

  //   return params;
  // }

   // public get(url: string, params?: any) {
  //   // return this.request(new RequestOptions({
  //   //   method: RequestMethod.Get,
  //   //   url: url,
  //   //   params: this.objToSearchParams(params)
  //   // }));
  //   return this.httpClient.get(this.buildUrl(url));
  // }

  // private request(options: RequestOptions, acceptType = 'application/json'): Observable<any> {
  //   if (options.body) {
  //     options.headers.append('Content-Type', 'application/json');
  //   }

  //   options.headers.append('Accept', acceptType);
  //   options.url = this.getUrl(options.url);

  //   const request = new Request(options);
  // }

  // private objToSearchParams(obj): URLSearchParams {
  //   const params: URLSearchParams = new URLSearchParams();
  //   for (const key in obj) {
  //     if (obj.hasOwnProperty(key)) {
  //       if (Array.isArray(obj[key])) {
  //         for (let i = 0; i < obj[key].length; i++) {
  //           params.set(`${key}[${i}]`, obj[key][i]);
  //         }
  //       } else {
  //         params.set(key, obj[key]);
  //       }
  //     }
  //   }

  //   if (obj && obj instanceof Map) {
  //     obj.forEach((value, name) => params.set(name, value));
  //   }

  //   return params;
  // }

  protected buildUrl(relativeUrl: string) {
    return this.settings.getBaseUrl() + relativeUrl;
  }
}
