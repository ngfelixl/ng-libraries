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
import { DocuModule, DocuEditorModule } from 'ng-docu';
import { DocumentationComponent } from './documentation.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
