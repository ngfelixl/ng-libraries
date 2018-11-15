import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'docu-simple-form',
  template: `
    <mat-form-field [formGroup]="form">
      <textarea cdkTextareaAutosize matInput formControlName="text" placeholder="Text"></textarea>
    </mat-form-field>
  `,
  styles: []
})
export class SimpleFormComponent {
  @Input() form: FormGroup;
}
