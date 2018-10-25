import { NgModule, ModuleWithComponentFactories } from '@angular/core';
import { SyntaxPipe } from './syntax.pipe';
import { ModuleWithProviders } from '@angular/compiler/src/core';

@NgModule({
  imports: [
  ],
  declarations: [SyntaxPipe],
  exports: [SyntaxPipe]
})
export class SyntaxifyModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SyntaxifyModule
    };
  }
}
