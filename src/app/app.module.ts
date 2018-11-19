import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SyntaxifyComponent } from './syntaxify.component';
import { D3plotComponent } from './d3plot.component';
import {
  LineChartModule,
  PieModule,
  TimeSeriesModule,
  HistogramModule } from '../../projects/ng-d3plot/src/public_api';
import { SyntaxifyModule } from '../../projects/syntaxify/src/public_api';
import { DocuModule, DocuEditorModule } from '../../projects/ng-docu/src/public_api';
import { DocumentationComponent } from './documentation.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';

import { MatTabsModule, MatToolbarModule } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    SyntaxifyComponent,
    D3plotComponent,
    DocumentationComponent
  ],
  imports: [
    BrowserModule,
    LineChartModule,
    PieModule,
    TimeSeriesModule,
    HistogramModule,
    SyntaxifyModule,
    DocuModule,
    DocuEditorModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatTabsModule,
    MatToolbarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
