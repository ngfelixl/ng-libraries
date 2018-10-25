import { SyntaxPipe } from './syntax.pipe';
import { inject } from '@angular/core/testing';
import { DomSanitizer } from '@angular/platform-browser';

describe('SyntaxPipe', () => {
  it('create an instance', inject([DomSanitizer], (domSanitizer: DomSanitizer) => {
    const pipe = new SyntaxPipe(domSanitizer);
    expect(pipe).toBeTruthy();
  }));
});
