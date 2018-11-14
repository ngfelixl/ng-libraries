import { Component, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'docu-section-form',
  template: `
    <div [formGroup]="sectionForm">
      <div class="header">
        <mat-form-field>
          <mat-select formControlName="type" placeholder="Type">
            <mat-option *ngFor="let option of options" [value]="option.toLowerCase()">{{option}}</mat-option>
          </mat-select>
        </mat-form-field>
        <div class="action-buttons">
          <!--
            <button type="button" mat-icon-button (click)="action.emit('moveUp')"><mat-icon svgIcon="keyboard_arrow_up"></mat-icon></button>
            <button type="button" mat-icon-button (click)="action.emit('moveDown')">
              <mat-icon svgIcon="keyboard_arrow_down"></mat-icon>
            </button>
            <button type="button" mat-icon-button (click)="action.emit('add')"><mat-icon svgIcon="add"></mat-icon></button>
            <button type="button" mat-icon-button (click)="action.emit('delete')"><mat-icon svgIcon="delete"></mat-icon></button>
            <button type="button" mat-icon-button (click)="expanded = false" [disabled]="!type || !text.value">
              <mat-icon svgIcon="visibility_off"></mat-icon>
            </button>
          -->
        </div>
      </div>
      <mat-form-field *ngIf="type === 'text'">
        <textarea cdkTextareaAutosize matInput formControlName="content" placeholder="Text"></textarea>
      </mat-form-field>
    </div>
  `,
  styles: []
})
export class SectionFormComponent {
  @Input() sectionForm: FormGroup;
  @Output() action = new EventEmitter<string>();

  options = ['Title', 'Text', 'Code'];

  get type(): string { return this.sectionForm.get('type').value as string; }
}
