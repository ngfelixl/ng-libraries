import { Component, Input, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { Documentation } from '../../models';
import { Subscription } from 'rxjs';

@Component({
  selector: 'docu-editor',
  template: `
    <form [formGroup]="documentationForm">
      <div formArrayName="sections">
        <docu-section-form
          *ngFor="let section of sections.controls; let i = index"
          [sectionForm]="section"
          [formGroupName]="i"
          (action)="do($event, i)">
        </docu-section-form>
      </div>
    </form>
  `,
  styles: []
})
export class EditorComponent implements OnInit, OnDestroy {
  documentationForm: FormGroup;
  @Input() documentation: Documentation;
  @Output() changed = new EventEmitter<Documentation>();
  private subscription: Subscription;

  constructor() {
    this.documentationForm = new FormGroup({
      title: new FormControl(null),
      sections: new FormArray([]),
      tags: new FormControl([])
    });
  }

  ngOnInit() {
    if (this.documentation) {
      this.adjustRows(this.documentation.sections);
    }

    this.subscription = this.documentationForm.valueChanges.subscribe(documentation => {
      this.changed.emit(this.documentationForm.value);
    });
  }

  adjustRows(sections) {
    this.documentationForm.reset();
    if (sections.length === 0) {
      this.sections.push(this.createSection());
    } else {
      for (const section of sections) {
        const item = this.createSection();
        item.patchValue(section);
        this.sections.push(item);
      }
    }
  }

  do(action: string, index: number) {
    switch (action) {
      case 'moveUp': this.moveUp(index); break;
      case 'moveDown': this.moveDown(index); break;
      case 'add': this.addAfter(index); break;
      case 'delete': this.delete(index); break;
    }
  }

  get sections(): FormArray {
    return this.documentationForm.get('sections') as FormArray;
  }

  moveUp(index: number) {
    if (index > 0) {
      const temp = this.sections.at(index);
      this.sections.controls[index] = this.sections.at(index - 1);
      this.sections.controls[index - 1] = temp;
    }
  }

  moveDown(index: number) {
    if (index < this.sections.length - 1) {
      const temp = this.sections.at(index);
      this.sections.controls[index] = this.sections.at(index + 1);
      this.sections.controls[index + 1] = temp;
    }
  }

  addAfter(at: number) {
    this.sections.insert(at + 1, this.createSection());
  }

  addEnd() {
    this.sections.push(this.createSection());
  }

  delete(index: number) {
    this.sections.removeAt(index);
  }

  createSection(): FormGroup {
    return new FormGroup({
      type: new FormControl(null),
      content: new FormControl(null)
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
