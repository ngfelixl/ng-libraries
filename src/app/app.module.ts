import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LineChartModule, TimeSeriesModule } from 'ng-d3plot';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    LineChartModule,
    TimeSeriesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
