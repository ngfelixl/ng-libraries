import { Component } from '@angular/core';

@Component({
  selector: 'app-d3plot',
  template: `
    <d3p-histogram [data]="dataHist" [config]="configHist"></d3p-histogram>
    <d3p-time-series [data]="data" [config]="config"></d3p-time-series>
    <d3p-line-chart [data]="dataLine" [config]="configLine"></d3p-line-chart>
    <d3p-pie [data]="pieData" [config]="configPie"></d3p-pie>
  `,
  styles: [`
    :host { display: grid; grid-template-columns: repeat(auto-fill, minmax(256px, 1fr)); }
  `]
})
export class D3plotComponent {
  date = new Date();
  data = [];

  pieData = [];

  dataHist = [
    3, 4.3, 2.45, 32, 12.3, 45.1, 2.3, 4, 2.5, 6.5, 7.5, 20.1, 22.2
  ];
  dataHist1 = [
    3, 4.3, 2.45, 32, 12.3, 45.1, 2.3, 4, 2.5, 6.5, 7.5, 20.1, 22.2
  ];
  dataHist0 = [
    36, 45.3, 23.45, 32, 12.3, 45.1, 2.3, 4, 2.5, 6.5, 17.5, 20.1, 22.2
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
    title: 'Time Series',
    aspectRatio: 16 / 10
  };

  configLine = {
    xLabel: 'xLabel',
    yLabel: 'yLabel',
    title: 'Line Chart',
    aspectRatio: 16 / 10
  };

  configHist = {
    aspectRatio: 16 / 10
  };

  configPie = {
    aspectRatio: 16 / 10
  };

  constructor() {
    setInterval(() => {
      this.dataHist = this.dataHist1;
      setTimeout(() => {
        this.dataHist = this.dataHist0;
      }, 1000);
    }, 2000);

    setTimeout(() => {
      this.data = [
        { date: new Date().setDate(this.date.getDate() - 4), value: 1 },
        { date: new Date().setDate(this.date.getDate() - 3), value: 3 },
        { date: new Date().setDate(this.date.getDate() - 2), value: 2 },
        { date: new Date().setDate(this.date.getDate() - 1), value: 5 },
        { date: new Date().setDate(this.date.getDate() - 0), value: 2 }
      ];

      this.pieData = [
        { label: 'Twitter', value: 20 },
        { label: 'Facebook', value: 15 },
        { label: 'Instagram', value: 7 }
      ];
    }, 200);
  }

}
