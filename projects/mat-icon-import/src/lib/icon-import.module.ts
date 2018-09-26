import { NgModule, ModuleWithProviders } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { IconImportService } from './icon-import.service';

@NgModule({
  imports: [ HttpClientModule ]
})
export class IconImportModule {
  static forRoot(keys: string[], path: string): ModuleWithProviders {
    return {
      ngModule: IconImportModule,
      providers: [
        IconImportService,
        { provide: 'icons', useValue: { keys, path } }
      ]
    };
  }
}
