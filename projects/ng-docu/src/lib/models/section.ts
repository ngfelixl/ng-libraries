import { Code, Text } from './section-types';
import { Documentation } from 'ng-docu/ng-docu';

export interface Section {
  type: string;
  content: Text | Code | Documentation[];
}
