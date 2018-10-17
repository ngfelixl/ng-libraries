import { Component, AfterViewInit, Input, ElementRef, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { select } from 'd3';
import { Subscription } from 'rxjs';

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
  @Input() config: Config;

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
      .attr('class', 'svg-content-responsive');

    this.subscription = this.resize$.pipe(
      debounceTime(200)
    ).subscribe(() => {
      this.scale();
    });
  }

  scale() {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
