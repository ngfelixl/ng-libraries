
import { HostListener } from '@angular/core';
import { Subject } from 'rxjs';
import { Selection, BaseType } from 'd3';

export class BaseClass {
  public margin = ({top: 30, right: 10, bottom: 35, left: 40});
  public height: number;
  public width: number;
  public svg: Selection<BaseType, {}, HTMLElement, any>;
  public resize$ = new Subject();

  @HostListener('window:resize', [])
  onresize() {
    this.resize$.next();
  }
}
