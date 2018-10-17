
import { HostListener } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { Selection, BaseType } from 'd3';

export class BaseClass {
  public margin = ({top: 30, right: 20, bottom: 35, left: 40});
  public height: number;
  public width: number;
  public svg: Selection<BaseType, {}, HTMLElement, any>;
  public resize$ = new Subject();
  public subscription: Subscription;

  @HostListener('window:resize', [])
  onresize() {
    this.resize$.next();
  }
}
