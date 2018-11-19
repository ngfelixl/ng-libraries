import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';

import { D3plotComponent } from './d3plot.component';
import { DocumentationComponent } from './documentation.component';

const routes: Route[] = [
  { path: 'ng-d3plot', component: D3plotComponent },
  { path: 'documentation', component: DocumentationComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
