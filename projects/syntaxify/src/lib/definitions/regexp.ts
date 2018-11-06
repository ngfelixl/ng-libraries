export const REGEXP = {
  cStyleComments: new RegExp(/(\/\*[\w\'\s\r\n\*]*\*\/)|(\/\/[\w\s\']*)|(&lt;![--\s\w\>\/]*&gt;)/g),
  cStyleComments1: new RegExp(/[^\n]*\n|\/\*(.|[\r\n])*?\*/g),

  markupStyleComments: new RegExp(/\<!--[\s\S]+--\>/g),

  javascriptStrings: new RegExp(/["'`]{1}[\s\S]+["'`]{1}/),
  typescriptStrings: new RegExp(/(\`[\s\S]*\`)|(&#039;(.*?)(&#039;))|(&quot;(.*?)&quot;)/g)
};
