import { BaseLanguage } from '../models/base-language';
import { COLORS } from '../colors';

interface Language extends BaseLanguage {
  decorators: {
    regexp: RegExp,
    replace: string;
    color: string;
  };
}

export const typescript: Language = {
  keywords: {
    from: COLORS.blue
  },
  strings: {
    regexp: new RegExp(/(\`[\s\S]*\`)|(&#039;(.*?)(&#039;\n\r))|(&quot;(.*?)&quot;)/g),
    replace: ''
  },
  comments: {
    regexp: new RegExp(/(\/\*[\w\'\s\r\n\*]*\*\/)|(\/\/[\w\s\']*)|(&lt;![--\s\w\>\/]*&gt;)/g),
    replace: ''
  },
  decorators: {
    regexp: new RegExp(/(^@[a-zA-Z]+)[^\(]+/g),
    replace: `\<span style="color: ${this.color}"\>$&\<\/span\>`,
    color: '#0f0f0f'
  },
  languageSpecific: (code: string) => {
    return code;
  }
};
