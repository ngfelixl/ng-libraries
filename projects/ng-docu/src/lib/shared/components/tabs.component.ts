import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Documentation } from '../../models';

@Component({
  selector: 'docu-tabs',
  template: `
    <mat-tab-group>
      <mat-tab *ngFor="let tab of tabs">
        <ng-template mat-tab-label>{{tab.title}}</ng-template>
        <docu-container [documentation]="tab"></docu-container>
      </mat-tab>
    </mat-tab-group>
  `,
  styles: [``],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabsComponent {
  @Input() tabs: Documentation[];
}
