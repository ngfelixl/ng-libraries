# Response plots with D3

[![Build Status](https://travis-ci.org/ngfelixl/ng-libraries.svg?branch=master)](https://travis-ci.org/ngfelixl/ng-libraries)

[D3js](https://d3js.org/) based plotting for Angular. This module focuses on easy usage and responsiveness. It provides plots in a  custom or default 4:3 aspect ratio,
at a dynamic width of 100% parents width. On window resize the plots scale, and after resize (200ms) they redraw.

![Animation](https://github.com/ngfelixl/ng-libraries/blob/master/projects/ng-d3plot/img/animation_plots.gif)

## Installation

```sh
npm i ng-d3plot
#or
yarn add ng-d3plot
```

# Usage

In your root (or whatever) module import the needed modules.

```typescript
import { HistogramModule, LineChartModule, TimeSeriesModule } from 'ng-d3plot';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HistogramModule,
    LineChartModule,
    TimeSeriesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

In the modules component templates use the tags as follows

```html
<d3p-histogram [data]="data" [config]="config"></d3p-histogram>
<d3p-time-series [data]="data" [config]="config"></d3p-time-series>
<d3p-line-chart [data]="dataLine" [config]="configLine"></d3p-line-chart>
```

Where the `@Input()`s are of type.

|             | Time Series                           | Line Chart                       | Histogram                      |
|-------------|---------------------------------------|----------------------------------|--------------------------------|
| `data`      | `Array<{date: Date, value: number}>`  | `Array<{x: number, y: number}>`  | `Array<number>`                |
| `config`    | `Config`                              | `Config`                         | `Config & { ticks?: number }`  |

the basic `Config` interface looks like

```typescript
interface Config {
  xLabel?: string;
  yLabel?: string;
  title?: string;
  aspectRatio?: number;
}
```

## TBD

It is planned to add simple map (country: value) and pie charts.

## Get in contact

- Check the [authors website](https://felixlemke.com)
- Get in touch via [twitter](https://twitter.com/ngfelixl) or [facebook](https://www.facebook.com/ngfelixlemke/)