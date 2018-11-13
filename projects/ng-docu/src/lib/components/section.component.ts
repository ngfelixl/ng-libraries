import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'docu-section',
  template: `
    <app-title *ngIf="paragraph?.type === 'title'">{{paragraph?.text}}</app-title>
    <app-image *ngIf="paragraph?.type === 'image'" [url]="paragraph?.text"></app-image>
    <app-text *ngIf="paragraph?.type === 'text'" [text]="paragraph?.text"></app-text>
    <app-math *ngIf="paragraph?.type === 'math'" [math]="paragraph?.text"></app-math>
    <app-code *ngIf="paragraph?.type === 'code'" [innerHTML]="paragraph?.text | syntaxPipe"></app-code>
    <app-citation *ngIf="paragraph?.type === 'citation'" [citation]="paragraph?.text"></app-citation>
    <app-tree *ngIf="paragraph?.type === 'tree'" [tree]="paragraph?.text"></app-tree>
    <app-accordion *ngIf="paragraph?.type === 'accordion'" [accordion]="paragraph?.text"></app-accordion>
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
