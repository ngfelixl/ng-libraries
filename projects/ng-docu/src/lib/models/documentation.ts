import { Section } from './section';

export interface SectionsContainer {
  sections: Section[];
}

export interface Documentation {
  title: string;
  subtitle?: string;
  sections: Section[];
  tags?: string[];
}
