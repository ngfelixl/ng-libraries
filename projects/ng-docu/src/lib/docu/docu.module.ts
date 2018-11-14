import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { components } from './components/index';
import { pipes } from './pipes/index';
import { UpdateMetaService } from './services/update-meta.service';
import { MaterialModule } from './material.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule
  ],
  declarations: [
    components,
    pipes
  ],
  providers: [
    UpdateMetaService
  ],
  exports: [
    components,
    pipes
  ]
})
export class DocuModule {}
