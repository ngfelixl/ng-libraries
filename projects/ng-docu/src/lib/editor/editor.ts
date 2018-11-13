import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Documentation } from '../models/documentation';

@Component({
  selector: 'docu-editor',
  template: ``,
  styles: []
})
export class EditorComponent {
  @Input() documentationForm: FormGroup;
  @Input() documentation: Documentation;
}
