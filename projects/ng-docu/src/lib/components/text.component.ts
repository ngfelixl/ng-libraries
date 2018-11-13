import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'docu-text',
  template: `<section [innerHTML]="text | textPipe"></section>`,
  styles: [`
    :host { line-height: 32px; font-size: 18px; white-space: pre-wrap; word-wrap:break-word; }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TextComponent {
  @Input() text;
}
