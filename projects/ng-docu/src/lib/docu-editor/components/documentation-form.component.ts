import { Component, ChangeDetectionStrategy, Input, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormControl } from '@angular/forms';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Documentation, Section } from '../../models';
import { FormGroupCreateService } from '../services/form-group-create.service';

@Component({
  selector: 'docu-documentation-form',
  template: `
    <div [formGroup]="form">
      <div formArrayName="sections" class="list" cdkDropList (cdkDropListDropped)="drop($event)">
        <docu-section-form
          *ngFor="let section of sections?.controls; let i = index"
          class="list-item"
          [sectionForm]="section"
          [formGroupName]="i"
          (action)="do($event, i)" cdkDrag cdkDragLockAxis="y">
          <button type="button" class="drag-handle" mat-icon-button cdkDragHandle matTooltip="Drag item">
            <mat-icon>unfold_more</mat-icon>
          </button>
        </docu-section-form>
      </div>
    </div>`,
  styles: [`
    .cdk-drag-placeholder { opacity: 0; }
    .list-item.cdk-drag-preview {
      box-sizing: border-box;
      box-shadow: 0 5px 5px -3px rgba(0, 0, 0, 0.2),
                  0 8px 10px 1px rgba(0, 0, 0, 0.14),
                  0 3px 14px 2px rgba(0, 0, 0, 0.12);
    }
    .list { display: block; max-width: 100%; min-height: 60px; width: 100%; }
    .list.cdk-drop-list-dragging .list-item:not(.cdk-drag-placeholder) {
      transition: transform 250ms cubic-bezier(0, 0, 0.2, 1);
    }
    .cdk-drag-animating {
      transition: transform 250ms cubic-bezier(0, 0, 0.2, 1);
    }
    .drag-handle { cursor: move; }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DocumentationFormComponent implements OnInit {
  @Input() form: FormGroup;
  @Input() documentation: Documentation;

  constructor(private formGroupCreate: FormGroupCreateService) {
    this.form = new FormGroup({
      title: new FormControl(null),
      sections: new FormArray([]),
      tags: new FormControl([])
    });
  }

  ngOnInit() {
    if (this.documentation) {
      this.adjustRows(this.documentation.sections);
    }
  }

  get sections(): FormArray {
    return this.form.get('sections') as FormArray;
  }

  addAfter(at: number) { this.sections.insert(at + 1, this.createSection()); }
  addEnd() { this.sections.push(this.createSection()); }
  delete(index: number) { this.sections.removeAt(index); }


  drop(event: CdkDragDrop<FormGroup[]>) {
    const dir = event.currentIndex > event.previousIndex ? 1 : -1;

    const from = event.previousIndex;
    const to = event.currentIndex;
    for (let i = from; i * dir < to * dir; i = i + dir) {
      const previous = this.sections.at(i);
      const current = this.sections.at(i + dir);
      this.sections.setControl(i, current);
      this.sections.setControl(i + dir, previous);
    }
  }


  do(action: string, index: number) {
    switch (action) {
      case 'add': this.addAfter(index); break;
      case 'delete': this.delete(index); break;
    }
  }


  createSection(item?: Section): FormGroup {
    if (item) {
      let formGroup: FormGroup;
      switch (item.type) {
        case 'code': formGroup = this.formGroupCreate.code(item); break;
        case 'tabs': formGroup = this.formGroupCreate.tabs(item); break;
        default: formGroup = this.formGroupCreate.default(item);
      }
      formGroup.patchValue(item);
      return formGroup;
    } else {
      return this.formGroupCreate.default();
    }
  }

  adjustRows(sections) {
    this.form.reset();
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
}
