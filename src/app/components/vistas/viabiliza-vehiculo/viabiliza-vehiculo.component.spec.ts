import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViabilizaVehiculoComponent } from './viabiliza-vehiculo.component';

describe('ViabilizaVehiculoComponent', () => {
  let component: ViabilizaVehiculoComponent;
  let fixture: ComponentFixture<ViabilizaVehiculoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViabilizaVehiculoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViabilizaVehiculoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
