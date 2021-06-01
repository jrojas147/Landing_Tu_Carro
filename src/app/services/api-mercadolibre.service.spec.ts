import { TestBed } from '@angular/core/testing';

import { ApiMercadolibreService } from './api-mercadolibre.service';

describe('ApiMercadolibreService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiMercadolibreService = TestBed.get(ApiMercadolibreService);
    expect(service).toBeTruthy();
  });
});
