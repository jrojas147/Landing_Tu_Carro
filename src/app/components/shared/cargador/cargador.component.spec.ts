import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CargadorComponent } from './cargador.component';

describe('CargadorComponent', () => {
  let component: CargadorComponent;
  let fixture: ComponentFixture<CargadorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CargadorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CargadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
