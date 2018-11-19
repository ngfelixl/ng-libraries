import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Documentation } from '../../models';

@Component({
  selector: 'docu-tabs',
  template: `
    <mat-tabs-group>
      <mat-tab></mat-tab>
      <mat-tab></mat-tab>
    </mat-tabs-group>
  `,
  styles: [``],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabsComponent {
  @Input() tabs: Documentation[];
}
