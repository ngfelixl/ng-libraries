import { TestBed, inject } from '@angular/core/testing';

import { IconImportService } from './icon-import.service';

describe('IconImportService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        IconImportService,
        { provide: 'icons', useValue: { key: 'account_circle', path: './assets/mat-icons' }}
      ]
    });
  });

  it('should be created', inject([IconImportService], (service: IconImportService) => {
    expect(service).toBeTruthy();
  }));

});
