import { Component, Input } from '@angular/core';

@Component({
  selector: 'docu-simple-form',
  template: `
    <mat-form-field>
      <textarea cdkTextareaAutosize matInput formControlName="text" placeholder="Text"></textarea>
    </mat-form-field>
  `,
  styles: []
})
export class SimpleFormComponent {}
