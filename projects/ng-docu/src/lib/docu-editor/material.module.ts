import { NgModule } from '@angular/core';
import { MatIconModule, MatFormFieldModule, MatSelectModule, MatInputModule } from '@angular/material';

@NgModule({
  exports: [
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule
  ]
})
export class MaterialModule {}
