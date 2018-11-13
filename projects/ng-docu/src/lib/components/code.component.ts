import { Component, HostBinding, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'docu-code',
  template: ``,
  styles: [`
    :host {
      display: inline-block;
      border-radius: 8px;
      font-family: 'Source Code Pro', monospace, roboto, sans-serif;
      box-sizing: border-box;
      padding: 16px;
      white-space: pre;
      overflow-x: auto;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CodeComponent {
  @HostBinding('class.bg-primary-100') bgPrimary = true;
  @HostBinding('class.mat-elevation-z1') elevation = true;
}
