import { TestBed } from '@angular/core/testing';

import { CentralesRiesgoService } from './centrales-riesgo.service';

describe('CentralesRiesgoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CentralesRiesgoService = TestBed.get(CentralesRiesgoService);
    expect(service).toBeTruthy();
  });
});
