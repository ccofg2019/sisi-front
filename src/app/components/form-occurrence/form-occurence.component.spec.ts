import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormOccurrenceComponent } from './form-occurrence.component';

describe('FormOccurrenceComponent', () => {
  let component: FormOccurrenceComponent;
  let fixture: ComponentFixture<FormOccurrenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormOccurrenceComponent ]
    })
    .compileComponents();
  }));
 
  beforeEach(() => {
    fixture = TestBed.createComponent(FormOccurrenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
