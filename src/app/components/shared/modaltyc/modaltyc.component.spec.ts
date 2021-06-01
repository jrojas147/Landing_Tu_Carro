import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModaltycComponent } from './modaltyc.component';

describe('ModaltycComponent', () => {
  let component: ModaltycComponent;
  let fixture: ComponentFixture<ModaltycComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModaltycComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModaltycComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
