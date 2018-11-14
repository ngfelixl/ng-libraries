import { Code } from './code';

export interface Section {
  type: string;
  content: string | Code;
}
