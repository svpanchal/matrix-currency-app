import { Injectable } from '@angular/core';

import { ApiService, REQUEST_TYPE_GET } from '../services/api.service';
import { HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { CurrenciesResponse } from '../models/currenciesResponse';
import { CurrencyData } from '../models/currencyData';

@Injectable()
export class AppStartupActions {
    public currencyArray: Array<CurrencyData> = [];

    constructor(
        private _apiService: ApiService,
    ) { }

    public getRate(rates): Observable<CurrenciesResponse> {
        const req = new HttpRequest(REQUEST_TYPE_GET, `${rates}`);
        return this._apiService.callApiService<CurrenciesResponse>(req);

        // this._apiService.callApiService(req).subscribe(
        //     (response) => {
        //         if (response) {
        //             console.log(response);
        //         } else {
        //             alert('Error hitting GET RATES api');
        //         }
        //     },
        //     (err: HttpErrorResponse) => {
        //         console.log('hit httpErrorResponse');
        //     });
    }

}
