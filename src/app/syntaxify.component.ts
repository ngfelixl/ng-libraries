import { Component } from '@angular/core';

@Component({
  selector: 'app-syntaxify',
  template: `
    <pre class="code" [innerHTML]="typescriptCode | syntaxify:'typescript'"></pre>
  `,
  styles: [`
    .code {
      padding: 18px;
      background-color: #ccc;
      border-radius: 16px;
      white-space: preserve;
    }
  `]
})
export class SyntaxifyComponent {
  typescriptCode = `@Component({
  selector: 'app-syntaxify'
})
export class SyntaxifyComponent {
  stringVar = "this is a string";
  numVar = 42; // The solution for everything
}`;
}
