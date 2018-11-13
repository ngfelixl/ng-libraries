import { Section } from './section';

export interface Documentation {
  title: string;
  subtitle?: string;
  sections: Section[];
  tags?: string[];
}
