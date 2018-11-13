import { NgModule } from '@angular/core';
import { components } from './components';

import { UpdateMetaService } from './services/update-meta.service';

@NgModule({
  imports: [
  ],
  declarations: [components],
  providers: [UpdateMetaService],
  exports: [components]
})
export class NgDocuModule { }
