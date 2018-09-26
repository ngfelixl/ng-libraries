import { TestBed, inject } from '@angular/core/testing';

import { IconImportService } from './icon-import.service';

describe('MatIconImportService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IconImportService]
    });
  });

  it('should be created', inject([IconImportService], (service: IconImportService) => {
    expect(service).toBeTruthy();
  }));
});
