import { Component, Input, EventEmitter, Output, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { Section } from '../../models';
import { Subscription } from 'rxjs';

@Component({
  selector: 'docu-section-form',
  template: `
    <mat-card>
      <mat-card-content>
        <div [formGroup]="sectionForm" class="form">
          <docu-form-header [form]="sectionForm" (action)="action.emit($event)"><ng-content></ng-content></docu-form-header>
          <div class="section-form">
            <docu-simple-form *ngIf="isSimple(type)" [form]="content"></docu-simple-form>
            <docu-code-form *ngIf="type === 'code'" [form]="content"></docu-code-form>
            <docu-tabs-form *ngIf="type === 'tabs'" [form]="content" [documentations]="section?.content.documentations"></docu-tabs-form>
          </div>
        </div>
        <docu-section [section]="sectionForm.value"></docu-section>
      </mat-card-content>
    </mat-card>
  `,
  styles: [`
    :host {
      margin-bottom: 16px;
      display: flex;
      flex: 1;
      flex-direction: row;
      transition: box-shadow 200ms cubic-bezier(0, 0, 0.2, 1);
      align-items: center;
      justify-content: space-between;
      box-sizing: border-box;
    }
    mat-card { flex: 1; }
    mat-card-content { display: flex; flex-wrap: wrap; }
    .form { flex: 1 1 350px; }
    docu-section { flex: 1 1 400px; }
    .section-form { background-color: rgba(0, 0, 0, 0.1); padding: 4px; box-sizing: border-box; border-radius: 4px; }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SectionFormComponent implements OnInit, OnDestroy {
  @Input() sectionForm: FormGroup;
  @Input() section: FormGroup;
  @Output() action = new EventEmitter<string>();
  type: string;
  subscription: Subscription;

  constructor() {}

  get sectionFormValkue(): Section { return this.sectionForm.value as Section; }
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
        case 'tabs':
          this.content.removeControl('documentations');
          break;
        default:
          this.content.removeControl('text');
      }

      switch (type) {
        case 'code':
          this.content.addControl('language', new FormControl(null));
          this.content.addControl('code', new FormControl(''));
          break;
        case 'tabs':
          this.content.addControl('documentations', new FormArray([]));
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

  isSimple(type: string): boolean {
    return ['text', 'title', 'citation', 'math'].includes(type);
  }
}
