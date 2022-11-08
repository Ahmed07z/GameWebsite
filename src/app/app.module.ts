import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import{HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { GaugeModule } from 'angular-gauge';
import { FormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { HomeComponent } from './home/home.component';
import {HttpHeadersInterceptor} from './interceptors/http-headers.interceptor';
import {HttpErrorsInterceptor} from './interceptors/http-errors.interceptor';
import { GameDetailsComponent } from './game-details/game-details.component';
import { GameTabsComponent } from './game-tabs/game-tabs.component';
import{FilterPipes} from './Pipes/searchfilter.pipe'

@NgModule({
  declarations: [
    AppComponent,
    SearchBarComponent,
    HomeComponent,
    GameDetailsComponent,
    FilterPipes,
    GameTabsComponent
  ],
  imports: [
    BrowserModule,
    GaugeModule.forRoot(),
    MatTabsModule,
    HttpClientModule,
    MatIconModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS,
      useClass:HttpHeadersInterceptor,
      multi:true
    },
    {provide:HTTP_INTERCEPTORS,
      useClass:HttpErrorsInterceptor,
      multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
