import { Component, AfterViewInit, Input, ElementRef, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { select, scaleOrdinal, pie as pieD3, arc as arcD3, interpolate } from 'd3';

import { Config } from './models/config';
import { BaseClass } from './base-class';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'd3p-pie',
  template: ``,
  styles: [`
    :host { display: block; width: 100%; }
    :host > * { width: 100%; }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PieComponent extends BaseClass implements AfterViewInit, OnDestroy {
  @Input() data: { label: string, value: number}[] = [];
  @Input() config: Config & {
    color?: string[]
  };
  private padding = 10;

  constructor(private element: ElementRef) {
    super();
  }

  ngAfterViewInit() {
    this.width = this.element.nativeElement.clientWidth;
    const ar = this.config && this.config.aspectRatio ? this.config.aspectRatio : 4 / 3;
    this.height = Math.round(this.width / ar);
    const radius = Math.min(this.width - 2 * this.padding, this.height - 2 * this.padding) / 2;
    const color = scaleOrdinal(this.config && this.config.color
      ? this.config.color
      : ['#66c2a5', '#fc8d62', '#8da0cb', '#e78ac3', '#a6d854', '#ffd92f']);

    this.svg = select(this.element.nativeElement)
      .append('div')
      .classed('svg-container', true)
      .append('svg')
      .attr('preserveAspectRatio', 'xMinYMin meet')
      .attr('viewBox', `0 0 ${this.width} ${this.height}`)
      .attr('class', 'svg-content-responsive')
      .append('g')
      .attr('transform', `translate(${this.width / 2}, ${this.height / 2})`);

    const pie = pieD3()
      .value(d => (<any>d).value)
      .sort(null);

    const arc = arcD3()
      .innerRadius(0)
      .outerRadius(radius);

    const labelArc = arcD3()
      .outerRadius(radius - 40)
      .innerRadius(radius - 40);

    updatePieChart(this.svg, pie, arc, labelArc, color, this.data);


    this.subscription = this.resize$.pipe(
      debounceTime(200)
    ).subscribe(() => {
      this.scale();
    });
  }


  scale() {
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}

function updatePieChart(svg, pie, arc, labelArc, color, data) {
  const g = svg.selectAll('.arc')
    .data(pie(data))
    .enter().append('g')
    .attr('class', 'arc');


  const path = g.append('path')
    .attr('fill', (d, i) => color(i))
    .attr('d', arc)
    .attr('stroke', 'white')
    .attr('stroke-width', '3px')
    .each(function(d) { this._current = d; });

  // path.transition().duration(200).attrTween('d', arcTween.bind({ arcFn: arc}));

  g.append('text')
    .attr('transform', (d) => `translate(${labelArc.centroid(d)})`)
    .attr('dy', '.35em')
    .style('font-family', 'roboto, sans-serif, helvetica')
    .style('text-anchor', 'middle')
    .text(d =>  d.data.label);
}

function arcTween(a) {
  const i = interpolate(this._current, a);
  this._current = i(1);

  const arc = arcD3()
    .innerRadius(0)
    .outerRadius(200);

  return (t) => arc(i(t));
}
