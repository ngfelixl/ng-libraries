import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'docu-tabs-form',
  template: `
    <div [formGroup]="form">
      <mat-tab-group formArrayName="documentations">
        <mat-tab *ngFor="let documentationForm of documentations?.controls; let i = index">
          <ng-template mat-tab-label>{{documentationForm.value.title}}</ng-template>
          <docu-documentation-form [form]="documentationForm" [documentation]="documentationForm.value"></docu-documentation-form>
        </mat-tab>
        <mat-tab label="+ Add" (click)="addTab($event)">
          <mat-form-field>
            <input matInput placeholder="Tab label" #title>
          </mat-form-field>
          <button type="button" mat-flat-button color="accent" (click)="addTab(title.value)">Create Tab</button>
        </mat-tab>
      </mat-tab-group>
    </div>
  `,
  styles: [``],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabsFormComponent {
  @Input() form: FormGroup;

  get documentations() { return this.form.get('documentations') as FormArray; }
  title(index: number) { return this.documentations.at(index).get('title').value as string; }

  addTab(title: string) {
    console.log('New Tab', title);
    const documentation = this.createSubDocumentation();
    documentation.patchValue({title: title});
    console.log(documentation.value);
    this.documentations.push(documentation);
    // console.log(this.documentations.at(0).value.title);
  }

  createSubDocumentation(): FormGroup {
    return new FormGroup({
      title: new FormControl('Hello'),
      sections: new FormArray([])
    });
  }
}
