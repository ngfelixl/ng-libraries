import { Component, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-documentation',
  template: `
    <mat-tab-group color="accent">
      <mat-tab label="Editor"><docu-editor [documentation]="documentation" (save)="docuChanged($event)"></docu-editor></mat-tab>
      <mat-tab label="Document"><docu-article [documentation]="documentation"></docu-article></mat-tab>
    </mat-tab-group>
  `,
  styles: [`:host { display: block; margin: 16px; }`]
})
export class DocumentationComponent {
  documentation = {
    sections: [
      { type: 'title', content: { text: 'How to write articles with ng-docu' } },
      { type: 'text', content: { text: 'This is a demonstration article for writing documentations or articles with *ng-docu*. The types one can use to style the sections are **title**, **text**, **code**, **math** and **citation**. To reorder the sections use the drag-handle next to the *type* input field and drag it to the target position. Press *save* to update the output.'} },
      { type: 'text', content: { text: 'Some types have got different *forms*, e.g. **title** is just a single textarea, whereas **code** has the inputs `language` (dropdown select) and `code` (textarea). The following section contains a code demonstration example. (Note that syntax highlighting is in a very early stage and needs more improvements.)' } },
      { type: 'code', content: { code: `import { Component } from '@angular/core';

@Component()
export class; MyComponent; {

}`, language: 'typescript' } },
      { type: 'text', content: { text: 'To use latex in your documents just select **math** as the type and insert your latex expressions. Inline math for text sections is currently not supported.' } },
      { type: 'title', content: { text: 'Example: Runge-Kutta' } },
      { type: 'text', content: { text: 'There is an initial conditions problem with the following definition:' } },
      { type: 'math', content: { text: `y'(t) = f(t, y(t)), \\qquad y(t_0) = y_0, \\qquad y: \\R \\rightarrow \\R^d`} },
      { type: 'text', content: { text: 'where *y(t)* is the exact solution. Runge-Kutta is a numerical integration method which determines the function value at different *t* \'s and sums each value with a weight to get the next value.' } },
      { type: 'math', content: { text: 'y_{n+1} = y_n + h\\sum_{j=1}^s b_jk_j' } }
    ]
  };

  constructor(private cd: ChangeDetectorRef) {}

  docuChanged(documentation: any) {
    this.documentation = documentation;
    console.log(documentation);
    this.cd.detectChanges();
  }
}
