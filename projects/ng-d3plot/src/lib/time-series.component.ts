import { Component, AfterViewInit, Input, ElementRef, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { select, axisBottom, axisLeft, line, scaleTime, extent, scaleLinear, max, ScaleLinear, ScaleTime, curveMonotoneX } from 'd3';
import { debounceTime } from 'rxjs/operators';

import { Config } from './models/config';
import { BaseClass } from './base-class';

@Component({
  selector: 'd3p-time-series',
  template: ``,
  styles: [`
    :host { display: block; width: 100%; }
    :host > * { width: 100%; }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimeSeriesComponent extends BaseClass implements AfterViewInit, OnDestroy {
  @Input() data: { date: Date, value: number }[] = [];
  @Input() config: Config;
  private x: ScaleTime<number, number>;
  private y: ScaleLinear<number, number>;
  private xAxis: (g: any) => any;
  private yAxis: (g: any) => any;

  constructor(private element: ElementRef) {
    super();
  }

  ngAfterViewInit() {
    this.width = this.element.nativeElement.clientWidth;
    const ar = this.config && this.config.aspectRatio ? this.config.aspectRatio : 4 / 3;
    this.height = Math.round(this.width / ar);

    this.svg = select(this.element.nativeElement)
      .append('div')
      .classed('svg-container', true)
      .append('svg')
      .attr('preserveAspectRatio', 'xMinYMin meet')
      .attr('viewBox', `0 0 ${this.width} ${this.height}`)
      .classed('svg-content-responsive', true);

    this.scale();
    this.draw();

    this.subscription = this.resize$.pipe(
      debounceTime(200)
    ).subscribe(() => {
      this.scale();
      this.draw();
    });
  }

  scale() {
    this.width = this.element.nativeElement.clientWidth;
    const ar = this.config && this.config.aspectRatio ? this.config.aspectRatio : 4 / 3;
    this.height = Math.round(this.width / ar);

    this.svg.attr('viewBox', `0 0 ${this.width} ${this.height}`);

    this.x = scaleTime()
      .domain(extent(this.data, d => d.date))
      .range([this.margin.left, this.width - this.margin.right]);


    this.y = scaleLinear()
      .domain([0, max(this.data, d => d.value)])
      .range([this.height - this.margin.bottom, this.margin.top]);

    this.xAxis = g => g
      .attr('transform', `translate(0,${this.height - this.margin.bottom})`)
      .call(axisBottom(this.x).ticks(this.width / 80).tickSizeOuter(0));

    this.yAxis = g => g
      .attr('transform', `translate(${this.margin.left},0)`)
      .call(axisLeft(this.y).ticks(6, '.0f'))
      .call(g1 => g1.select('.domain'))
      .call(g1 => g1.select('.tick:last-of-type text').clone()
        .attr('x', 3)
        .attr('text-anchor', 'start')
        .attr('font-weight', 'bold')
        .text((<any>this.data).value));
  }

  draw() {
    if (this.svg) {
      this.svg.selectAll('g').remove();
      this.svg.selectAll('path').remove();
      this.svg.selectAll('text').remove();
      this.svg.selectAll('.dot').remove();
    }

    const d3line = line()
      .defined(d => !isNaN((<any>d).value))
      .x(d => this.x((<any>d).date))
      .y(d => this.y((<any>d).value))
      .curve(curveMonotoneX);

    this.svg.append('g')
      .call(this.xAxis);

    // Title
    this.svg.append('text')
      .attr('transform', `translate(${this.width / 2}, 25)`)
      .style('font-family', 'roboto, sans-serif, helvetica')
      .style('text-anchor', 'middle')
      .style('font-size', '18px')
      .text(this.config && this.config.title ? this.config.title : '');

    // xLabel
    this.svg.append('text')
      .attr('transform', `translate(${this.width / 2 + (this.margin.left - this.margin.right) / 2},
        ${this.height - this.margin.bottom + 35})`)
      .style('text-anchor', 'middle')
      .style('font-family', 'roboto, sans-serif, helvetica')
      .style('font-size', '14px')
      .text(this.config && this.config.xLabel ? this.config.xLabel : '');

    // yLabel
    this.svg.append('text')
      .attr('transform', `translate(${10}, ${this.height / 2 + (this.margin.top - this.margin.bottom) / 2}) rotate(-90)`)
      .style('text-anchor', 'middle')
      .style('font-family', 'roboto, sans-serif, helvetica')
      .style('font-size', '14px')
      .text(this.config && this.config.yLabel ? this.config.yLabel : '');

    this.svg.append('g')
      .call(this.yAxis);

    this.svg.append('path')
      .datum(this.data)
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 1.5)
      .attr('stroke-linejoin', 'round')
      .attr('stroke-linecap', 'round')
      .attr('d', <any>d3line)
      .attr('class', 'point');

    this.svg.selectAll('.dot')
      .data(this.data)
      .enter().append('circle')
      .attr('class', 'dot')
      .attr('stroke', 'steelblue')
      .attr('fill', 'steelblue')
      .attr('cx', (d) => this.x(d.date))
      .attr('cy', (d) => this.y(d.value))
      .attr('r', 3);
  }

  handleMouseOver() {
    console.log('Mouse event');
    // Use D3 to select element, change color and size
    /* select(this).attr({
      fill: 'orange',
      r: 50 * 2
    }); */
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
