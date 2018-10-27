import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewOccurrenceComponent } from './view-occurrence.component';

describe('ViewOccurrenceComponent', () => {
  let component: ViewOccurrenceComponent;
  let fixture: ComponentFixture<ViewOccurrenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewOccurrenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewOccurrenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
