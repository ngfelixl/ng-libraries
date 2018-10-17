import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {
  LineChartModule,
  PieModule,
  TimeSeriesModule,
  HistogramModule } from 'ng-d3plot';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    LineChartModule,
    PieModule,
    TimeSeriesModule,
    HistogramModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
