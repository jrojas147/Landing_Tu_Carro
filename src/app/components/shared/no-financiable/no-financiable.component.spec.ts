import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoFinanciableComponent } from './no-financiable.component';

describe('NoFinanciableComponent', () => {
  let component: NoFinanciableComponent;
  let fixture: ComponentFixture<NoFinanciableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoFinanciableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoFinanciableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
