import { NgModule } from '@angular/core';
import { MatIconModule, MatFormFieldModule, MatSelectModule, MatInputModule, MatButtonModule, MatCardModule } from '@angular/material';

@NgModule({
  exports: [
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule
  ]
})
export class MaterialModule {}
