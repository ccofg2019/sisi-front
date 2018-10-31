import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormFunctionaryComponent } from './form-functionary.component';

describe('FormFunctionaryComponent', () => {
  let component: FormFunctionaryComponent;
  let fixture: ComponentFixture<FormFunctionaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormFunctionaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormFunctionaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
