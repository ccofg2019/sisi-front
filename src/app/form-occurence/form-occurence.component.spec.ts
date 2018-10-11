import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormOccurenceComponent } from './form-occurence.component';

describe('FormOccurenceComponent', () => {
  let component: FormOccurenceComponent;
  let fixture: ComponentFixture<FormOccurenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormOccurenceComponent ]
    })
    .compileComponents();
  }));
 
  beforeEach(() => {
    fixture = TestBed.createComponent(FormOccurenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
