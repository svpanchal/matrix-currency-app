import { Injectable } from '@angular/core';

import { ApiService, REQUEST_TYPE_GET } from '../services/api.service';
import { HttpRequest, HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class AppStartupActions {

    constructor(
        private _apiService: ApiService,
    ) { }

    public initializeApp() {
        const req = new HttpRequest(REQUEST_TYPE_GET, '');
        this._apiService.callApiService(req).subscribe(
            (response) => {
                if (response) {
                    console.log(response);
                } else {
                    alert('Error hitting GET RATES api');
                }
            },
            (err: HttpErrorResponse) => {
                console.log('hit httpErrorResponse');
            });
    }

}
