import { Component, AfterViewInit, Input, ElementRef, HostListener } from '@angular/core';
import { select, axisBottom, axisLeft, scaleLinear, max, Selection, BaseType,
  ScaleLinear, scaleIdentity, histogram, Bin, ScaleIdentity } from 'd3';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'd3p-histogram',
  template: ``,
  styles: [`
    :host { display: block; width: 100%; }
    :host > * { width: 100%; }
  `]
})
export class HistogramComponent implements AfterViewInit {
  @Input() data: { [key: string]: any }[] = [];
  @Input() config: {
    key: string;
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

  @HostListener('window:resize', [])
  onresize() {
    this.resize$.next();
  }

  constructor(private element: ElementRef) {}

  ngAfterViewInit() {
    this.width = this.element.nativeElement.clientWidth;
    this.height = Math.round(this.width / 4 * 3);

    this.svg = select('d3p-histogram')
      .append('div')
      .classed('svg-container', true)
      .append('svg')
      .attr('preserveAspectRatio', 'xMinYMin meet')
      .attr('viewBox', `0 0 ${this.width} ${this.height}`)
      .classed('svg-content-responsive', true);

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
  }

  draw() {
  }
}
