import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <mat-toolbar color="primary" class="mat-elevation-z4">
      ng-libraries
      <span style="flex: 1"></span>
      <span class="copyright">(c) 2018 Felix Lemke</span>
    </mat-toolbar>
    <nav mat-tab-nav-bar>
      <a mat-tab-link routerLink="documentation" routerLinkActive #rla="routerLinkActive" [active]="rla.isActive">ng-docu</a>
      <a mat-tab-link routerLink="ng-d3plot" routerLinkActive #rlb="routerLinkActive" [active]="rlb.isActive">ng-d3plot</a>
    </nav>
    <main>
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [`
    .copyright { font-size: 12px; }
    mat-toolbar { z-index: 12; }
    nav { z-index: 2; }
  `]
})
export class AppComponent {
}
