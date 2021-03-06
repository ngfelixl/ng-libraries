import { Component, HostBinding, ChangeDetectionStrategy, Input } from '@angular/core';
import { Code } from '../../models/section-types';

@Component({
  selector: 'docu-code',
  template: `
    <mat-card>
      <mat-card-content [innerHTML]="code?.code | syntaxPipe:code?.language">
      </mat-card-content>
    </mat-card>
  `,
  styles: [`
    mat-card-content {
      display: inline-block;
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
  @Input() code: Code;
}
