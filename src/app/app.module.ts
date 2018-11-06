import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SyntaxifyComponent } from './syntaxify.component';
import { D3plotComponent } from './d3plot.component';
import {
  LineChartModule,
  PieModule,
  TimeSeriesModule,
  HistogramModule } from 'ng-d3plot';

import { SyntaxifyModule } from 'syntaxify';

@NgModule({
  declarations: [
    AppComponent,
    SyntaxifyComponent,
    D3plotComponent
  ],
  imports: [
    BrowserModule,
    LineChartModule,
    PieModule,
    TimeSeriesModule,
    HistogramModule,
    SyntaxifyModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
