import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { AppStartupActions } from '../../actionHandlers/app-startup.actions';
import { CurrencyRates } from 'src/app/models/currencyRates';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  public currencyForm: FormGroup;
  public currencyCodes: Array<string> = [];
  public conversionRate: number;
  public currencyFormValueChangesSubscription: any;
  private currencyValuesForUrl: string;

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

      this.assignComponentProperties();
    }

    private assignComponentProperties(): void {
        this.currencyForm = this._fb.group({
          inputCurrencyValue: '',
          convertedCurrencyValue: '',
          inputCurrencyType: '',
          convertedCurrencyType: ''
        });

        this.currencyFormValueChangesSubscription = this.currencyForm.valueChanges.subscribe(val => {
          const inputCurrencyType = this.currencyForm.get('inputCurrencyType').value;
          const convertedCurrencyType = this.currencyForm.get('convertedCurrencyType').value;

          if (inputCurrencyType && convertedCurrencyType) {
            if (!this.currencyValuesForUrl) {
              this.setCurrenciesForGetRateReq(inputCurrencyType, convertedCurrencyType);
            }
          }
      });
    }


  public ngOnDestroy() {
    this.currencyFormValueChangesSubscription.unsubscribe();
  }

  public convertValues(): number {
    const inputNumber = this.currencyForm.get('inputCurrencyValue').value;
    if (!this.conversionRate || !inputNumber) {
      alert('You are missing key data, please select the currencies you wish to convert and a value');
      return 0;
    }

    const convertedValue = parseInt(inputNumber, 10) * this.conversionRate;
    this.currencyForm.get('convertedCurrencyValue').setValue(convertedValue);
  }

  private setCurrenciesForConversion(): void {
    if (!this.currencyValuesForUrl) {
      alert('You are missing key data, please select the currencies you wish to convert');
    }

    this._appStartupActions.getRate(this.currencyValuesForUrl)
      .subscribe(
        (response) => {
          if (response && Object.keys(response) && Object.keys(response).length) {
            const responseObj = response;
            this.conversionRate = responseObj[Object.keys(responseObj)[0]];
            console.log(`yay! here is the conversion rate for ${this.currencyValuesForUrl}`, this.conversionRate);
          } else {
            console.log('Error returning rates; please try again');
          }
        },
        (err: HttpErrorResponse) => {
          console.log('Error returning rates =>', err);
        }
      );
  }

  private setCurrenciesForGetRateReq(inputCurrencyType, convertedCurrencyType): void {
    if (!inputCurrencyType || !convertedCurrencyType) {
      alert('You are missing key data, please select the currencies you wish to convert');
    }

    const currencyValues = `${inputCurrencyType}_${convertedCurrencyType}`;
    this.currencyValuesForUrl = currencyValues;
    console.log(this.currencyValuesForUrl);
    this.setCurrenciesForConversion();
  }

}
