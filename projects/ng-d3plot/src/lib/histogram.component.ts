import { Component, AfterViewInit, Input, ElementRef, ChangeDetectionStrategy, OnDestroy, OnChanges } from '@angular/core';
import { select, extent, axisBottom, axisLeft, scaleLinear, max as d3Max, ScaleLinear, histogram, Bin } from 'd3';
import { debounceTime } from 'rxjs/operators';

import { Config } from './models/config';
import { BaseClass } from './base-class';

@Component({
  selector: 'd3p-histogram',
  template: ``,
  styles: [`
    :host { display: block; width: 100%; }
    :host > * { width: 100%; }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HistogramComponent extends BaseClass implements AfterViewInit, OnDestroy, OnChanges {
  @Input() data: number[] = [];
  @Input() config: Config & {
    ticks?: number
  };
  private x: ScaleLinear<number, number>;
  private y: ScaleLinear<number, number>;
  private xAxis: (g: any) => any;
  private yAxis: (g: any) => any;
  private bins: Bin<number, number>[];

  constructor(private element: ElementRef) {
    super();
  }

  ngOnChanges() {
    this.draw();
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
      .attr('class', 'svg-content-responsive');

    this.draw();

    this.subscription = this.resize$.pipe(
      debounceTime(200)
    ).subscribe(() => {
      this.scale();
      this.draw();
    });
  }

  draw() {
    if (this.svg) {
      this.svg.select('.x-axis').remove();
      this.svg.select('.y-axis').remove();
      this.svg.selectAll('rect').remove();

      this.x = scaleLinear()
        .domain(extent(this.data)).nice()
        .range([this.margin.left, this.width - this.margin.right]);

      this.bins = histogram()
        .domain((<any>this.x).domain())
        .thresholds(this.x.ticks(this.config && this.config.ticks ? this.config.ticks : 10))(this.data);

      this.y = scaleLinear()
        .domain([0, +d3Max(this.bins, (d: any[]) => d.length)]).nice()
        .range([this.height - this.margin.bottom, this.margin.top]);

      this.xAxis = g => g
        .attr('transform', `translate(0,${this.height - this.margin.bottom})`)
        .attr('class', 'x-axis')
        .call(axisBottom(this.x).tickSizeOuter(0))
        .call(g00 => g.append('text')
          .attr('x', this.width - this.margin.right)
          .attr('y', -4)
          .attr('fill', '#000')
          .attr('font-weight', 'bold')
          .attr('text-anchor', 'end')
          .text(this.config && this.config.xLabel ? this.config.xLabel : ''));

      this.yAxis = g => g
        .attr('transform', `translate(${this.margin.left},0)`)
        .attr('class', 'y-axis')
        .call(axisLeft(this.y))
        .call(g0 => g0.select('.domain').remove())
        .call(g0 => g0.select('.tick:last-of-type text').clone()
          .attr('x', 4)
          .attr('text-anchor', 'start')
          .attr('font-weight', 'bold')
          .text(this.config && this.config.yLabel ? this.config.yLabel : ''));

      const bar = this.svg.append('g')
        .attr('fill', 'steelblue')
        .selectAll('rect')
        .data(this.bins)
        .enter().append('rect')
        .attr('x', (d: any) => this.x(d.x0) + 1)
        .attr('width', (d: any) => Math.max(0, this.x(d.x1) - this.x(d.x0) - 1))
        .attr('y', (d: any) => this.y(d.length))
        .attr('height', (d: any) => this.y(0) - this.y(d.length));

      this.svg.append('g')
        .call(this.xAxis);

      this.svg.append('g')
        .call(this.yAxis);
    }
  }

  scale() {
    this.width = this.element.nativeElement.clientWidth;
    const ar = this.config && this.config.aspectRatio ? this.config.aspectRatio : 4 / 3;
    this.height = Math.round(this.width / ar);

    this.svg.attr('viewBox', `0 0 ${this.width} ${this.height}`);

    this.x.range([this.margin.left, this.width - this.margin.right]);
    this.y.range([this.height - this.margin.bottom, this.margin.top]);

    this.svg.selectAll('rect')
      .attr('x', (d: any) => this.x(d.x0) + 1)
      .attr('width', (d: any) => Math.max(0, this.x(d.x1) - this.x(d.x0) - 1))
      .attr('y', (d: any) => this.y(d.length))
      .attr('height', (d: any) => this.y(0) - this.y(d.length));

    this.svg.selectAll('.y-axis')
      .attr('transform', `translate(${this.margin.left},0)`)
      .call(axisLeft(this.y));

    this.svg.selectAll('.x-axis')
      .attr('transform', `translate(0,${this.height - this.margin.bottom})`)
      .call(axisBottom(this.x).tickSizeOuter(0));
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
