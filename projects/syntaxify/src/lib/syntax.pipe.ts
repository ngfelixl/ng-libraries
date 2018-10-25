import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { languages } from './languages/languages';

@Pipe({
  name: 'syntax'
})
export class SyntaxPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(code: string, args?: any): any {
    const language = args && args[0] && languages[args[0]];
    if (language) {
      code = code ? escapeHtml(code) : '';
      for (const entry of Object.entries(language.keywords)) {
        const regexp = new RegExp(`\\b${entry[0]}\\b`, 'g');
        code = code.replace(regexp, `\<span style="color: ${entry[1]};"\>$&\<\/span\>`);
      }
    }
    return this.sanitizer.bypassSecurityTrustHtml(code);
  }

}

function escapeHtml(unsafe: string) {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
