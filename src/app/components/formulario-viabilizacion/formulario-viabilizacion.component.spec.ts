import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioViabilizacionComponent } from './formulario-viabilizacion.component';

describe('FormularioViabilizacionComponent', () => {
  let component: FormularioViabilizacionComponent;
  let fixture: ComponentFixture<FormularioViabilizacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormularioViabilizacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioViabilizacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
