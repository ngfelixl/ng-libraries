import { Component, AfterViewInit, Input, ElementRef, HostListener } from '@angular/core';
import { select, axisBottom, axisLeft, line, scaleTime, extent, scaleLinear, max, Selection, BaseType, ScaleLinear, ScaleTime } from 'd3';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'd3p-time-series',
  template: ``,
  styles: [`
    :host { display: block; width: 100%; }
    :host > * { width: 100%; }
  `]
})
export class TimeSeriesComponent implements AfterViewInit {
  @Input() data: { date: Date, value: number }[];
  @Input() config: {
    xLabel: string;
    yLabel: string;
  };
  private height: number;
  private width: number;
  private resize$ = new Subject();
  private svg: Selection<BaseType, {}, HTMLElement, any>;
  private margin = ({top: 20, right: 30, bottom: 30, left: 40});
  private x: ScaleTime<number, number>;
  private y: ScaleLinear<number, number>;
  private xAxis: (g: any) => any;
  private yAxis: (g: any) => any;

  @HostListener('window:resize', ['$event'])
  onresize(event) {
    this.resize$.next();
  }

  constructor(private element: ElementRef) {}

  ngAfterViewInit() {
    this.width = this.element.nativeElement.clientWidth;
    this.height = Math.round(this.width / 4 * 3);

    this.svg = select('d3p-time-series')
      .append('div')
      .classed('svg-container', true)
      .append('svg')
      .attr('preserveAspectRatio', 'xMinYMin meet')
      .attr('viewBox', `0 0 ${this.width} ${this.height}`)
      .classed('svg-content-responsive', true);

    this.svg.selectAll('p').exit().transition().duration(500).style('opacity', 0);

    this.scale();
    this.draw();

    this.resize$.pipe(
      debounceTime(1000)
    ).subscribe(() => {
      this.scale();
      this.draw();
    });
  }

  scale() {
    this.width = this.element.nativeElement.clientWidth;
    this.height = Math.round(this.width / 4 * 3);

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
    }

    const d3line = line()
      .defined(d => !isNaN((<any>d).value))
      .x(d => this.x((<any>d).date))
      .y(d => this.y((<any>d).value));

    this.svg.append('g')
      .call(this.xAxis);

    this.svg.append('text')
      .attr('transform', `translate(${this.width / 2}, ${this.height - this.margin.bottom + 30})`)
      .style('text-anchor', 'middle')
      .text(this.config ? this.config.xLabel : '');

    this.svg.append('g')
      .call(this.yAxis);

    this.svg.append('path')
      .datum(this.data)
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 1.5)
      .attr('stroke-linejoin', 'round')
      .attr('stroke-linecap', 'round')
      .attr('d', <any>d3line);
  }

}
