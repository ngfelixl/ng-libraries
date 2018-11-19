import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'docu-tabs-form',
  template: ``,
  styles: [``],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabsFormComponent {
  @Input() form: FormGroup;
}
