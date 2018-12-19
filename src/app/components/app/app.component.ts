import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { AppStartupActions } from '../../actionHandlers/app-startup.actions';
import { CurrencyRates } from 'src/app/models/currencyRates';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  public currencyForm: FormGroup;
  public currencyCodes: Array<string> = [];
  public convertedRate: number;

  constructor(
    private _fb: FormBuilder,
    private _appStartupActions: AppStartupActions,
  ) { }

  public ngOnInit() {
    const initialRates = `USD_EUR`;
      // let angular initialization finish before calling any backend APIs
      window.setTimeout(() => this._appStartupActions.getRate(initialRates), 100);

      this.currencyForm = this._fb.group({
        inputCurrencyValue: '',
        convertedCurrencyValue: '',
        inputCurrencyType: '',
        convertedCurrencyType: ''
      });

      this.assignComponentProperties();
    }

    private assignComponentProperties(): void {
      if (this.convertedRate) {
        this.currencyForm = this._fb.group({
          inputCurrencyValue: '',
          convertedCurrencyValue: this.convertedRate,
          inputCurrencyType: '',
          convertedCurrencyType: ''
        });
      } else {
        this.currencyForm = this._fb.group({
          inputCurrencyValue: '',
          convertedCurrencyValue: '',
          inputCurrencyType: '',
          convertedCurrencyType: ''
        });
      }
    }

  public ngOnDestroy() {}

  public convertValues(): number {
    //  take the rate returned from the API and do the math using the form values, return the converted value

    return 0;
  }

  public buildRequestForApi(): void {
    const inputCurrencyType = this.currencyForm.get('inputCurrencyType').value;
    const convertedCurrencyType = this.currencyForm.get('convertedCurrencyType').value;

    console.log(inputCurrencyType, convertedCurrencyType);
    const requestedRates = `${inputCurrencyType}_${convertedCurrencyType}`;
    console.log(requestedRates);
    this._appStartupActions.getRate(requestedRates);
  }


}
