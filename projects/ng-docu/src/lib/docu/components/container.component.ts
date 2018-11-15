import { Component, Input, OnInit } from '@angular/core';
import { Documentation } from '../../models/documentation';
import { UpdateMetaService } from '../services/update-meta.service';
import { MetaData } from '../../models/meta-data';
import { Text } from '../../models/section-types';

@Component({
  selector: 'docu-container',
  template: `
    <article>
      <h2>{{documentation?.title}}</h2>
      <docu-section *ngFor="let section of documentation?.sections" [section]="section"></docu-section>
    </article>
  `
})
export class ContainerComponent implements OnInit {
  @Input() documentation: Documentation;
  @Input() updateMeta = false;

  constructor(private updateMetaService: UpdateMetaService) {}

  ngOnInit() {
    if (this.updateMeta && this.documentation) {
      const firstParagraph = this.documentation.sections
        ? this.documentation.sections.find(o => o.type === 'text')
        : null;
      const meta: MetaData = {
        title: this.documentation.title,
        description: firstParagraph ? (<Text>firstParagraph.content).text : ''
      };
      this.updateMetaService.update(meta);
    }
  }
}
