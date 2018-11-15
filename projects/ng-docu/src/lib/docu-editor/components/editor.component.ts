import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { Documentation, Section } from '../../models';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { FormGroupCreateService } from '../services/form-group-create.service';

@Component({
  selector: 'docu-editor',
  template: `
    <form [formGroup]="documentationForm" (ngSubmit)="save.emit(documentationForm.value)">
      <div formArrayName="sections" class="list" cdkDropList (cdkDropListDropped)="drop($event)">
        <docu-section-form
          *ngFor="let section of sections.controls; let i = index"
          class="list-item"
          [sectionForm]="section"
          [formGroupName]="i"
          (action)="do($event, i)" cdkDrag cdkDragLockAxis="y">
          <button type="button" class="drag-handle" mat-icon-button cdkDragHandle><mat-icon>drag_handle</mat-icon></button>
        </docu-section-form>
      </div>
      <button mat-raised-button color="primary">Save</button>
    </form>
  `,
  styles: [`
    .cdk-drag-animating { transition: transform 250ms cubig-bezier(0, 0, 0.2, 1); }
    .cdk-drag-placeholder { opacity: 0; }
    .list-item.cdk-drag-preview {
      box-shadow: 0 5px 5px -3px rgba(0, 0, 0, 0.2),
                  0 8px 10px 1px rgba(0, 0, 0, 0.14),
                  0 3px 14px 2px rgba(0, 0, 0, 0.12);
    }
    .list .list-item { display: block; transition: box-shadow 200ms cubic-bezier(0, 0, 0.2, 1); }
    .list.cdk-drop-list-dragging .list-item:not(.cdk-drag-placeholder) {
      transition: transform 250ms cubic-bezier(0, 0, 0.2, 1);
    }
    .cdk-drag-animating {
      transition: transform 250ms cubic-bezier(0, 0, 0.2, 1);
    }
    .drag-handle { cursor: move; }
  `]
})
export class EditorComponent implements OnInit {
  documentationForm: FormGroup;
  @Input() documentation: Documentation;
  @Output() changed = new EventEmitter<Documentation>();
  @Output() save = new EventEmitter<Documentation>();

  constructor(private formGroupCreate: FormGroupCreateService) {
    this.documentationForm = new FormGroup({
      title: new FormControl(null),
      sections: new FormArray([]),
      tags: new FormControl([])
    });
  }

  get sections(): FormArray {
    return this.documentationForm.get('sections') as FormArray;
  }

  drop(event: CdkDragDrop<FormGroup[]>) {
    const currentItem = this.sections.at(event.currentIndex);
    const previousItem = this.sections.at(event.previousIndex);

    this.sections.setControl(event.currentIndex, previousItem);
    this.sections.setControl(event.previousIndex, currentItem);
  }

  ngOnInit() {
    if (this.documentation) {
      this.adjustRows(this.documentation.sections);
    }
  }

  adjustRows(sections) {
    this.documentationForm.reset();
    if (sections.length === 0) {
      this.sections.push(this.createSection());
    } else {
      for (const section of sections) {
        const item = this.createSection(section);
        item.patchValue(section);
        this.sections.push(item);
      }
    }
  }

  do(action: string, index: number) {
    switch (action) {
      case 'add': this.addAfter(index); break;
      case 'delete': this.delete(index); break;
    }
  }


  addAfter(at: number) { this.sections.insert(at + 1, this.createSection()); }
  addEnd() { this.sections.push(this.createSection()); }
  delete(index: number) { this.sections.removeAt(index); }

  createSection(item?: Section): FormGroup {
    if (item) {
      let formGroup: FormGroup;
      switch (item.type) {
        case 'code': formGroup = this.formGroupCreate.code(item); break;
        default: formGroup = this.formGroupCreate.default(item);
      }
      formGroup.patchValue(item);
      return formGroup;
    } else {
      return this.formGroupCreate.default();
    }
  }
}
