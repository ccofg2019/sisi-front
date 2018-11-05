import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewIrregularityComponent } from './view-irregularity.component';

describe('ViewIrregularityComponent', () => {
  let component: ViewIrregularityComponent;
  let fixture: ComponentFixture<ViewIrregularityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewIrregularityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewIrregularityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
