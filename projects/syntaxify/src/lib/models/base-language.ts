export interface BaseLanguage {
  keywords: { [key: string]: string };
  strings: {
    regexp: RegExp,
    replace: string
  };
  comments: {
    regexp: RegExp;
    replace: string;
  };
  languageSpecific?: (code: string) => string;
}
