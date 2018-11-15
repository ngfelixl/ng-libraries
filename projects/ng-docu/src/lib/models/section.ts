import { Code, Text } from './section-types';

export interface Section {
  type: string;
  content: Text | Code;
}
