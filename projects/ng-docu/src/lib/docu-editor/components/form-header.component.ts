import { Component, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'docu-form-header',
  template: `
    <mat-card color="primary" [style.backgroundColor]="'#000'">
      <mat-card-content>
        <mat-form-field [formGroup]="form">
          <mat-select formControlName="type" placeholder="Type">
            <mat-option *ngFor="let option of options" [value]="option.toLowerCase()">{{option}}</mat-option>
          </mat-select>
        </mat-form-field>
        <div class="action-buttons">
          <ng-content></ng-content>
          <!--<button type="button" mat-icon-button (click)="action.emit('moveUp')"><mat-icon>keyboard_arrow_up</mat-icon></button>
          <button type="button" mat-icon-button (click)="action.emit('moveDown')"><mat-icon>keyboard_arrow_down</mat-icon></button>-->

          <button type="button" mat-icon-button (click)="action.emit('add')"><mat-icon>add</mat-icon></button>
          <button type="button" mat-icon-button (click)="action.emit('delete')"><mat-icon>delete</mat-icon></button>

          <!--<button type="button" mat-icon-button (click)="expanded = false" [disabled]="!type || !text.value">
            <mat-icon>visibility_off</mat-icon>
          </button>-->
        </div>
      </mat-card-content>
    </mat-card>
  `,
  styles: [`
    :host { display: flex; }
    .action-buttons { display: grid; grid-template-columns: 1fr 1fr 1fr; }
  `]
})
export class FormHeaderComponent {
  @Input() form: FormGroup;
  @Output() action = new EventEmitter<string>();
  options = ['Title', 'Text', 'Code'];
}
