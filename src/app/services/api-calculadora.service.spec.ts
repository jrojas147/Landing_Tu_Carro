import { TestBed } from '@angular/core/testing';

import { ApiCalculadoraService } from './api-calculadora.service';

describe('ApiCalculadoraService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiCalculadoraService = TestBed.get(ApiCalculadoraService);
    expect(service).toBeTruthy();
  });
});
