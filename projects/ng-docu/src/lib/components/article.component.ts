import { Component, Input, OnInit } from '@angular/core';
import { Documentation } from '../models/documentation';
import { UpdateMetaService } from '../services/update-meta.service';
import { MetaData } from '../models/meta-data';

@Component({
  selector: 'docu-article',
  template: `
    <article>
      <docu-section *ngFor="let section of documentation?.sections"></docu-section>
    </article>
  `
})
export class ArticleComponent implements OnInit {
  @Input() documentation: Documentation;
  @Input() updateMeta = false;

  constructor(private updateMetaService: UpdateMetaService) {}

  ngOnInit() {
    if (this.updateMeta && this.documentation) {
      const firstParagraph = this.documentation.sections ? this.documentation.sections.find(o => o.type === 'text') : null;
      const meta: MetaData = {
        title: this.documentation.title,
        description: firstParagraph ? firstParagraph.text : ''
      };
      this.updateMetaService.update(meta);
    }
  }
}
