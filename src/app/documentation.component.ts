import { Component, ChangeDetectorRef } from '@angular/core';

import { Documentation } from '../../projects/ng-docu/src/public_api';

@Component({
  selector: 'app-documentation',
  template: `
    <docu-editor [documentation]="documentation" (save)="docuChanged($event)"></docu-editor>
    <docu-container [documentation]="documentation"></docu-container>
  `,
  styles: [`
    :host { display: grid; grid-template-columns: 2fr 1fr; padding: 16px; }
  `]
})
export class DocumentationComponent {
  documentation = {
    sections: [
      { type: 'title', content: { text: 'I am an article' } },
      { type: 'text', content: { text: 'I am the first paragraph' } },
      { type: 'code', content: { code: `import { Component } from '@angular/core';

@Component()
export class MyComponent {

}`, language: 'typescript' } }
    ]
  };

  constructor(private cd: ChangeDetectorRef) {}

  docuChanged(documentation: any) {
    this.documentation = documentation;
    console.log(documentation);
    this.cd.detectChanges();
  }
}
