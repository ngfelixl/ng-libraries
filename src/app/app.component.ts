import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: [`
    :host { display: grid; grid-template-columns: 1fr 1fr; }

  `]
})
export class AppComponent {
  title = 'libraries';
  date = new Date();
  data = [
    { date: new Date().setDate(this.date.getDate() - 4), value: 1 },
    { date: new Date().setDate(this.date.getDate() - 3), value: 3 },
    { date: new Date().setDate(this.date.getDate() - 2), value: 2 },
    { date: new Date().setDate(this.date.getDate() - 1), value: 5 },
    { date: new Date().setDate(this.date.getDate() - 0), value: 2 }
  ];

  dataHist = [
    3, 4.3, 2.45, 32, 12.3, 45.1, 2.3, 4, 2.5, 6.5, 7.5, 20.1, 22.2
  ];

  dataLine = [
    { x: 0, y: 1 },
    { x: 1, y: 4 },
    { x: 2, y: 5 },
    { x: 3, y: 3 },
    { x: 4, y: 5 }
  ];

  config = {
    xLabel: 'xLabel',
    yLabel: 'yLabel',
    title: 'Time Series'
  };

  configLine = {
    xLabel: 'xLabel',
    yLabel: 'yLabel',
    title: 'Line Chart'
  };

  configHist = {
  };
}
