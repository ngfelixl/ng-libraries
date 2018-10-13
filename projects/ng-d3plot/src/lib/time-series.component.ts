import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { select, axisBottom, axisLeft, line, scaleTime, extent, scaleLinear, max } from 'd3';

@Component({
  selector: 'd3p-time-series',
  template: ``,
  styles: [`
    :host { width: 100%; }
    :host > * { width: 100%; }
  `]
})
export class TimeSeriesComponent implements OnInit, AfterViewInit {
  @Input() data: { date: Date, value: number }[];

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    const width = 800;
    const height = 500;
    const margin = ({top: 20, right: 30, bottom: 30, left: 40});

    const svg = select('d3p-line-chart').append('svg')
      .attr('width', width)
      .attr('height', height);

    const x = scaleTime()
      .domain(extent(this.data, d => d.date))
      .range([margin.left, width - margin.right]);

    const y = scaleLinear()
      .domain([0, max(this.data, d => d.value)]).nice()
      .range([height - margin.bottom, margin.top]);

    const xAxis = g => g
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(axisBottom(x).ticks(width / 80).tickSizeOuter(0));

    const yAxis = g => g
      .attr('transform', `translate(${margin.left},0)`)
      .call(axisLeft(y).ticks(6, '.0f'))
      .call(g1 => g1.select('.domain').remove())
      .call(g1 => g1.select('.tick:last-of-type text').clone()
        .attr('x', 3)
        .attr('text-anchor', 'start')
        .attr('font-weight', 'bold')
        .text((<any>this.data).value));

    const d3line = line()
      .defined(d => !isNaN((<any>d).value))
      .x(d => x((<any>d).date))
      .y(d => y((<any>d).value));

    svg.append('g')
      .call(xAxis);

    svg.append('g')
      .call(yAxis);

    svg.append('path')
      .datum(this.data)
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 1.5)
      .attr('stroke-linejoin', 'round')
      .attr('stroke-linecap', 'round')
      .attr('d', <any>d3line);
  }

}
