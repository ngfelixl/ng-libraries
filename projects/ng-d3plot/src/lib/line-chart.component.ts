import { Component, AfterViewInit, Input, ElementRef, HostListener } from '@angular/core';
import { select, axisBottom, axisLeft, line, scaleLinear, max, Selection, BaseType, ScaleLinear, curveMonotoneX } from 'd3';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'd3p-line-chart',
  template: ``,
  styles: [`
    :host { display: block; width: 100%; }
    :host > * { width: 100%; }
  `]
})
export class LineChartComponent implements AfterViewInit {
  @Input() data: { x: number, y: number }[] = [];
  @Input() config: {
    xLabel?: string;
    yLabel?: string;
    title?: string;
  };
  private height: number;
  private width: number;
  private resize$ = new Subject();
  private svg: Selection<BaseType, {}, HTMLElement, any>;
  private margin = ({top: 30, right: 10, bottom: 35, left: 40});
  private x: ScaleLinear<number, number>;
  private y: ScaleLinear<number, number>;
  private xAxis: (g: any) => any;
  private yAxis: (g: any) => any;

  @HostListener('window:resize', [])
  onresize() {
    this.resize$.next();
  }

  constructor(private element: ElementRef) {}

  ngAfterViewInit() {
    this.width = this.element.nativeElement.clientWidth;
    this.height = Math.round(this.width / 4 * 3);

    this.svg = select('d3p-line-chart')
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
      debounceTime(200)
    ).subscribe(() => {
      this.scale();
      this.draw();
    });
  }

  scale() {
    this.width = this.element.nativeElement.clientWidth;
    this.height = Math.round(this.width / 4 * 3);

    this.svg.attr('viewBox', `0 0 ${this.width} ${this.height}`);

    this.x = scaleLinear()
      .domain([0, max(this.data, d => d.x)])
      .range([this.margin.left, this.width - this.margin.right]);


    this.y = scaleLinear()
      .domain([0, max(this.data, d => d.y)])
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
        .text((<any>this.data).y));
  }

  draw() {
    if (this.svg) {
      this.svg.selectAll('g').remove();
      this.svg.selectAll('path').remove();
      this.svg.selectAll('text').remove();
      this.svg.selectAll('.dot').remove();
      this.svg.selectAll('.mouseDot').remove();
    }

    const d3line = line()
      .defined(d => !isNaN((<any>d).y))
      .x(d => this.x((<any>d).x))
      .y(d => this.y((<any>d).y))
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
      .attr('d', <any>d3line);

    this.svg.selectAll('.dot')
      .data(this.data)
      .enter().append('circle')
      .attr('class', 'dot')
      .attr('stroke', 'steelblue')
      .attr('fill', 'steelblue')
      .attr('cx', (d) => this.x(d.x))
      .attr('cy', (d) => this.y(d.y))
      .attr('r', 3);

    this.svg.selectAll('.mouseDot')
      .data(this.data)
      .enter()
      .append('circle')
      .attr('class', 'mouseDot')
      .attr('cx', (d) => this.x((<any>d).x))
      .attr('cy', (d) => this.y((<any>d).y))
      .attr('r', 10)
      .attr('fill', 'rgba(0,0,0,0)')
      .on('mouseover', (d, i) => {
        /* console.log(d, i);
        this.svg.append('.helper')
          .datum([{x: d.x, y: 0}, {x: d.x, y: d.y}, {x: 0, y: d.y}])
          .enter()
          .attr('class', 'helper')
          .attr('fill', 'none')
          .attr('stroke', '#aaa')
          .attr('stroke-width', 1)
          .attr('stroke-linejoin', 'round')
          .attr('stroke-linecap', 'round')
          .attr('d', <any>d3line); */
      });
  }
}
