import { TestBed, inject } from '@angular/core/testing';

import { NgD3plotService } from './ng-d3plot.service';

describe('NgD3plotService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NgD3plotService]
    });
  });

  it('should be created', inject([NgD3plotService], (service: NgD3plotService) => {
    expect(service).toBeTruthy();
  }));
});
