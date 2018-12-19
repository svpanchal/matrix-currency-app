import { Injectable } from '@angular/core';
import { Http, } from '@angular/http';
import {HttpClient, HttpErrorResponse, HttpRequest, HttpResponse } from '@angular/common/http';

import { Observable } from 'rxjs';
import 'rxjs/';
import { catchError, map } from 'rxjs/operators';

export const
    REQUEST_TYPE_GET = 'GET',
    REQUEST_TYPE_POST = 'POST',
    REQUEST_TYPE_PUT = 'PUT',
    REQUEST_TYPE_DELETE = 'DELETE';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiKey = '6c96388ed5f8824e3cd0eb5d370fe783';
  // private apiBaseUrl = 'http://data.fixer.io/api';
  private apiBaseUrl = 'https://free.currencyconverterapi.com/api/v6/convert?q=';
  private sampleReqParams = 'EUR_USD';
  private urlEnd = '&compact=ultra';

  constructor(
    private _httpClient: HttpClient,
  ) { }

  public callApiService<T>(req: HttpRequest<any>): Observable<T> {
    let response;
  switch (req.method) {
      case REQUEST_TYPE_GET:
        response = this._httpClient.get<T>(`${this.apiBaseUrl}${req.url}${this.urlEnd}`);
          map(res => {
            return res;
          }),
          catchError(err => {
            return Observable.throw(err);
          });
          break;
      // case REQUEST_TYPE_POST:
      //   response = this._httpClient.post<T>(`${this.apiBaseUrl}/${this.endpointCurrentRates}${this.apiKey}`, req.body);
      //     map(res => {
      //       return res;
      //     }),
      //     catchError(err => {
      //       return Observable.throw(err);
      //     });
      //   break;
      // case REQUEST_TYPE_PUT:
      //   response = this._httpClient.put<T>(`${this.apiBaseUrl}/${this.endpointCurrentRates}${this.apiKey}`, req.body);
      //     map(res => {
      //       return res;
      //     }),
      //     catchError(err => {
      //       return Observable.throw(err);
      //     });
      //   break;
      // case REQUEST_TYPE_DELETE:
      //   response = this._httpClient.delete<T>(`${this.apiBaseUrl}/${this.endpointCurrentRates}${this.apiKey}`);
      //     map(res => {
      //       return res;
      //     }),
      //     catchError(err => {
      //       return Observable.throw(err);
      //     });
      //   break;
      default:
          throw new Error(`invalid value provided for RequestType => [${req.method}]`);
  }
  return response;
}


}
