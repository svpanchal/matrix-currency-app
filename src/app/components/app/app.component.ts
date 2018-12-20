import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { AppStartupActions } from '../../actionHandlers/app-startup.actions';
import { CurrencyRates } from 'src/app/models/currencyRates';
import { HttpErrorResponse } from '@angular/common/http';
import { CurrencyData } from 'src/app/models/currencyData';
import * as Data from 'src/app/constants/data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  public currencyForm: FormGroup;
  public currencyCodes: Array<string> = [];
  public conversionRate: number;
  public currencyArray: Array<CurrencyData> = [];
  public isResultDisplayed: boolean = false;
  public displayedInputCurrencyValue: string;
  public displayedInputCurrency: string;
  public displayedConvertedCurrencyValue: string;
  public displayedConvertedCurrency: string;
  public inputCurrency: CurrencyData;
  public convertedCurrency: CurrencyData;

  constructor(
    private _fb: FormBuilder,
    private _appStartupActions: AppStartupActions,
  ) { }

  public ngOnInit() {
    const initialRates = `USD_EUR`;
    // let angular initialization finish before calling any backend APIs
    // window.setTimeout(() => this._appStartupActions.getRate(initialRates), 100);

    this.currencyForm = this._fb.group({
      inputCurrencyValue: '',
      convertedCurrencyValue: '',
      inputCurrencyType: '',
      convertedCurrencyType: ''
    });
    this.currencyArray = Data.CURRENCY_DATA;
    this.assignComponentProperties();
  }

  private assignComponentProperties(): void {
    this.currencyForm = this._fb.group({
      inputCurrencyValue: '',
      convertedCurrencyValue: '',
      inputCurrencyType: '',
      convertedCurrencyType: ''
    });
  }

  public ngOnDestroy() { }

  public convertValues(): number {

    const inputNumber = this.currencyForm.get('inputCurrencyValue').value;
    //  take the rate returned from the API and do the math using the form values, return the converted value
    if (!this.conversionRate || !inputNumber) {
      return 0;
    }

    const convertedValue = parseInt(inputNumber, 10) * this.conversionRate;
    this.currencyForm.get('convertedCurrencyValue').setValue(convertedValue);
    this.setDisplayValues();
  }

  public setDisplayValues(): void {
    this.isResultDisplayed = true;
    this.displayedConvertedCurrencyValue = this.currencyForm.get('convertedCurrencyValue').value;
    this.displayedInputCurrencyValue = this.currencyForm.get('inputCurrencyValue').value;
    this.displayedInputCurrency = this.currencyForm.get('inputCurrencyType').value;
    this.displayedConvertedCurrency = this.currencyForm.get('convertedCurrencyType').value;
  }

  public setCurrenciesForConversion(): void {
    const requestedCurrencies = this.setCurrenciesForGetRateReq();
    if (!requestedCurrencies) {
      return;
    }

    this._appStartupActions.getRate(requestedCurrencies)
      .subscribe(
        (response) => {
          if (response && Object.keys(response) && Object.keys(response).length) {
            const responseObj = response;
            this.conversionRate = responseObj[Object.keys(responseObj)[0]];
            console.log('yay!', this.conversionRate);
          } else {
            console.log('Error returning rates; please try again');
          }
        },
        (err: HttpErrorResponse) => {
          console.log('Error returning rates =>', err);
        }
      );
  }

  private setCurrenciesForGetRateReq(): string {
    const inputCurrencyType = this.currencyForm.get('inputCurrencyType').value;
    const convertedCurrencyType = this.currencyForm.get('convertedCurrencyType').value;

    if (!inputCurrencyType || !convertedCurrencyType) {
      alert('You are missing key data, please enter the currencies you wish you convert');
    }

    const currencyValues = `${inputCurrencyType}_${convertedCurrencyType}`;
    return currencyValues;
  }

}
