import { BaseLanguage } from '../models/base-language';
import { COLORS } from '../definitions/colors';
import { REGEXP } from '../definitions/regexp';

export const typescript: BaseLanguage = {
  keywords: {
    const: COLORS.blue,
    debugger: COLORS.blue,
    delete: COLORS.blue,
    extends: COLORS.blue,
    false: COLORS.blue,
    function: COLORS.blue,
    in: COLORS.blue,
    instanceOf: COLORS.blue,
    new: COLORS.blue,
    null: COLORS.blue,
    super: COLORS.blue,
    enum: COLORS.blue,
    this: COLORS.blue,
    class: COLORS.blue,
    true: COLORS.blue,
    typeof: COLORS.blue,
    let: COLORS.blue,
    void: COLORS.blue,
    with: COLORS.blue,
    var: COLORS.blue,

    break: COLORS.purple,
    case: COLORS.purple,
    catch: COLORS.purple,
    continue: COLORS.purple,
    default: COLORS.purple,
    do: COLORS.purple,
    else: COLORS.purple,
    for: COLORS.purple,
    finally: COLORS.purple,
    if: COLORS.purple,
    from: COLORS.purple,
    import: COLORS.purple,
    export: COLORS.purple,
    switch: COLORS.purple,
    throw: COLORS.purple,
    try: COLORS.purple,
    while: COLORS.purple,
    return: COLORS.purple
  },
  strings: {
    regexp: REGEXP.typescriptStrings,
    replace: `\<span style="color: ${COLORS.red}"\>$&\<\/span\>`
  },
  comments: {
    regexp: REGEXP.cStyleComments,
    replace: `\<span style="color: ${COLORS.grey}"\>$&\<\/span\>`
  },
  languageSpecific: (code: string) => {
    const decorators = {
      regexp: new RegExp(/(^@[a-zA-Z]+)[^\(]+/g),
      replace: `\<span style="color: ${COLORS.green}"\>$&\<\/span\>`
    };

    code = code.replace(decorators.regexp, decorators.replace);
    return code;
  }
};
