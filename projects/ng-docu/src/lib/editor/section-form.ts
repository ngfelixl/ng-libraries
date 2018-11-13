import { Component, ChangeDetectionStrategy, Input, EventEmitter, Output, HostBinding, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'docu-section-form',
  template: `
    <div [formGroup]="paragraphForm" class="paragraphForm bg-primary-50 mat-elevation-z1" [class.expanded]="expanded">
      <div class="header">
        <mat-form-field>
          <mat-select formControlName="type" placeholder="Type">
            <mat-option value="title">Title</mat-option>
            <mat-option value="text">Text</mat-option>
            <mat-option value="code">Code</mat-option>
            <mat-option value="math">Math</mat-option>
            <mat-option value="image">Image</mat-option>
            <mat-option value="citation">Citation</mat-option>
            <mat-option value="accordion">Accordion</mat-option>
            <mat-option value="tree">Tree</mat-option>
          </mat-select>
        </mat-form-field>
        <div class="action-buttons">
          <button type="button" mat-icon-button (click)="moveUp.emit()"><mat-icon svgIcon="keyboard_arrow_up"></mat-icon></button>
          <button type="button" mat-icon-button (click)="moveDown.emit()"><mat-icon svgIcon="keyboard_arrow_down"></mat-icon></button>
          <button type="button" mat-icon-button (click)="add.emit()"><mat-icon svgIcon="add"></mat-icon></button>
          <button type="button" mat-icon-button (click)="delete.emit()"><mat-icon svgIcon="delete"></mat-icon></button>
          <button type="button" mat-icon-button (click)="expanded = false" [disabled]="!type || !text.value">
            <mat-icon svgIcon="visibility_off"></mat-icon>
          </button>
        </div>
      </div>
      <div *ngIf="type === 'image'">
        <input type="hidden" formControlName="text">
        <input type="file" #file class="file-form-field" (change)="uploadImage(file.files)">
        <button mat-button type="button" (click)="file.click()">Select Image</button>
        <mat-progress-bar *ngIf="uploading" [value]="uploadProgress" mode="determinate"></mat-progress-bar>
      </div>
      <mat-form-field *ngIf="type !== 'image'">
        <textarea cdkTextareaAutosize matInput formControlName="text" placeholder="Text"></textarea>
      </mat-form-field>
    </div>
    <app-paragraph [paragraph]="paragraphForm.value" (click)="toggleExpansion()"></app-paragraph>
  `,
  styles: [`
    .paragraphForm { display: none; padding: 8px; box-sizing: border-box; }
    .paragraphForm.expanded { display: block; }

    :host { display: flex; box-sizing: border-box; flex-wrap: wrap; }
    :host.expanded { padding: 16px; }
    :host > * { flex: 1 1 256px; width: 0; }
    mat-form-field { width: 100%; }
    app-paragraph { cursor: pointer; }

    .header { display: flex; flex-wrap: wrap-reverse; }
    .header > mat-form-field { flex: 1 1 144px; }
    .action-buttons { flex: 0 0 auto; }

    .file-form-field { display: none; }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ParagraphFormComponent implements OnInit {
  @Input() sectionForm: FormGroup;
  @Output() moveUp = new EventEmitter();
  @Output() moveDown = new EventEmitter();
  @Output() delete = new EventEmitter();
  @Output() add = new EventEmitter();
  @Output() upload = new EventEmitter<File>();
  @HostBinding('class.expanded') expanded = true;

  get type(): string { return this.sectionForm.get('type').value as string; }
  get text(): FormControl { return this.sectionForm.get('text') as FormControl; }

  ngOnInit() {
    this.expanded = !this.type || !this.text.value;
  }

  toggleExpansion() {
    this.expanded = !this.expanded;
  }
}
