import { Injectable, Inject } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

export interface IconsConfig {
  keys: string[];
  path: string;
}

@Injectable()
export class IconImportService {
  icons: IconsConfig;

  constructor (
    private iconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    @Inject('icons') icons: IconsConfig
  ) {
    this.icons = icons;
  }

  register() {
    for (const icon of this.icons.keys) {
      this.iconRegistry.addSvgIcon(
        icon,
        this.domSanitizer.bypassSecurityTrustResourceUrl(`${this.icons.path}/baseline-${icon}-24px.svg`)
      );
    }
  }
}
