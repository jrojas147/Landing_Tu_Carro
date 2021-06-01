import { TestBed } from '@angular/core/testing';

import { ScanparamsService } from './scanparams.service';

describe('ScanparamsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ScanparamsService = TestBed.get(ScanparamsService);
    expect(service).toBeTruthy();
  });
});
