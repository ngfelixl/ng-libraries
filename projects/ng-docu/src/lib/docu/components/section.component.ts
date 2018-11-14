import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'docu-section',
  template: `
    <docu-title *ngIf="section?.type === 'title'">{{section?.content}}</docu-title>
    <docu-text *ngIf="section?.type === 'text'" [text]="section?.content"></docu-text>
    <docu-code *ngIf="section?.type === 'code'" [code]="section?.content"></docu-code>
    <!--<docu-citation *ngIf="paragraph?.type === 'citation'" [citation]="paragraph?.content"></docu-citation>-->

    <!--
      <app-image *ngIf="paragraph?.type === 'image'" [url]="paragraph?.content"></app-image>
      <app-math *ngIf="paragraph?.type === 'math'" [math]="paragraph?.content"></app-math>
      <app-citation *ngIf="paragraph?.type === 'citation'" [citation]="paragraph?.content"></app-citation>
      <app-tree *ngIf="paragraph?.type === 'tree'" [tree]="paragraph?.content"></app-tree>
      <app-accordion *ngIf="paragraph?.type === 'accordion'" [accordion]="paragraph?.content"></app-accordion>
    -->
  `,
  styles: [`
    :host { display: block; margin: 0 auto; max-width: 1280px; padding: 16px; box-sizing: border-box; z-index: 1; }
    :host > * { width: 100%; }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SectionComponent {
  @Input() section;
}
