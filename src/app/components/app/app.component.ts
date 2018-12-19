import { Component, OnDestroy, OnInit } from '@angular/core';

import { AppStartupActions } from '../../actionHandlers/app-startup.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'matrix-currency-app';

  constructor(
    private _appStartupActions: AppStartupActions,
  ) { }

  public ngOnInit() {
      // let angular initialization finish before calling any backend APIs
      window.setTimeout(() => this._appStartupActions.initializeApp(), 100);
      console.log('hit appcomponent');
  }

  public ngOnDestroy() {}


}
