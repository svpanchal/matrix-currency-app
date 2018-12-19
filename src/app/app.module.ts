import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { StoreModule } from '@ngrx/store';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app/app.component';
import { AppStartupActions } from './actionHandlers/app-startup.actions';
import { ApiService } from './services/api.service';
import { APP_STORES } from './app.stores';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule, ReactiveFormsModule,
    HttpModule,
  ],
  providers: [
    AppStartupActions,
    ApiService,
    // StoreModule.forRoot([APP_STORES])
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
