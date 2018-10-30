import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormIrregularityComponent } from './form-irregularity.component';

describe('FormIrregularityComponent', () => {
  let component: FormIrregularityComponent;
  let fixture: ComponentFixture<FormIrregularityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormIrregularityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormIrregularityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
