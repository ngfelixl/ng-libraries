import { Component, Input, EventEmitter, Output, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Section } from '../../models';
import { Subscription } from 'rxjs';

@Component({
  selector: 'docu-section-form',
  template: `
    <mat-card>
      <mat-card-content>
        <div [formGroup]="sectionForm" class="form">
          <docu-form-header [form]="sectionForm" (action)="action.emit($event)"><ng-content></ng-content></docu-form-header>
          <docu-simple-form *ngIf="type === 'text'" [form]="content"></docu-simple-form>
          <docu-simple-form *ngIf="type === 'title'" [form]="content"></docu-simple-form>
          <docu-code-form *ngIf="type === 'code'" [form]="content"></docu-code-form>
        </div>
        <docu-section [section]="section"></docu-section>
      </mat-card-content>
    </mat-card>
  `,
  styles: [`
    :host { display: block; }
    mat-card-content { display: flex; flex-wrap: wrap;  }
    .form { flex: 1 1 350px; }
    docu-section { flex: 1 1 400px; }
  `]
})
export class SectionFormComponent implements OnInit, OnDestroy {
  @Input() sectionForm: FormGroup;
  @Output() action = new EventEmitter<string>();
  type: string;
  subscription: Subscription;

  constructor() {}

  get section(): Section { return this.sectionForm.value as Section; }
  // get type(): string { return this.sectionForm.get('type').value as string; }
  get content(): FormGroup { return this.sectionForm.get('content') as FormGroup; }

  ngOnInit() {
    this.subscription = this.sectionForm.get('type').valueChanges.subscribe(type => {
      const temp = this.type;
      this.type = null;
      switch (temp) {
        case 'code':
          this.content.removeControl('language');
          this.content.removeControl('code');
          break;
        default:
          this.content.removeControl('text');
      }

      switch (type) {
        case 'code':
          this.content.addControl('language', new FormControl(null));
          this.content.addControl('code', new FormControl(null));
          break;
        default:
          this.content.addControl('text', new FormControl());
      }
      this.type = type;
    });
    this.type = this.sectionForm.get('type').value;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
