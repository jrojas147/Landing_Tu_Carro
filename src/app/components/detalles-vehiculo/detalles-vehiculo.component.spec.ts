import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesVehiculoComponent } from './detalles-vehiculo.component';

describe('DetallesVehiculoComponent', () => {
  let component: DetallesVehiculoComponent;
  let fixture: ComponentFixture<DetallesVehiculoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetallesVehiculoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetallesVehiculoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
