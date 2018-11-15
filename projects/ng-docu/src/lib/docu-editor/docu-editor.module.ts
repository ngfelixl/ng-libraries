import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { components } from './components/index';
import { MaterialModule } from './material.module';
import { SharedModule } from '../shared/shared.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FormGroupCreateService } from './services/form-group-create.service';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule,
    DragDropModule
  ],
  declarations: [
    components
  ],
  providers: [
    FormGroupCreateService
  ],
  exports: [
    components
  ]
})
export class DocuEditorModule {}
