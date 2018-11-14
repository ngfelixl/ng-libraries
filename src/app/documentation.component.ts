import { Component, ChangeDetectorRef } from '@angular/core';

import { Documentation } from 'ng-docu';

@Component({
  selector: 'app-documentation',
  template: `
    <docu-editor [documentation]="documentation" (changes)="docuChanged($event)"></docu-editor>
    <docu-container [documentation]="documentation"></docu-container>
  `,
  styles: [`
    :host { display: grid; grid-template-columns: 1fr 1fr; }
  `]
})
export class DocumentationComponent {
  documentation = {
    title: 'I am a documentation',
    sections: [
      { type: 'title', content: 'I am an article' },
      { type: 'text', content: 'I am the first paragraph' },
      { type: 'code', content: { code: '@Component() I am code', language: 'typescript' } }
    ]
  };

  constructor(private cd: ChangeDetectorRef) {}

  docuChanged(documentation: any) {
    this.documentation = documentation;
    this.cd.detectChanges();
  }
}
