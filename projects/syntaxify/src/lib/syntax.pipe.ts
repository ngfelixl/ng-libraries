import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { languages } from './languages';

@Pipe({
  name: 'syntaxify'
})
export class SyntaxPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(code: string, args?: any): any {
    const language = args && languages[args];
    console.log(language, args, code);
    if (language) {
      code = code ? escapeHtml(code) : '';
      for (const entry of Object.entries(language.keywords)) {
        const regexp = new RegExp(`\\b${entry[0]}\\b`, 'g');
        code = code.replace(regexp, `\<span style="color: ${entry[1]};"\>$&\<\/span\>`);
      }

      // Comments
      code = code.replace(language.comments.regexp, language.comments.replace);
      code = code.replace(language.strings.regexp, language.strings.replace);

      if (language.languageSpecific) {
        code = language.languageSpecific(code);
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
