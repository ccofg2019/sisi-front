import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListIrregularitiesComponent } from './list-irregularities.component';

describe('ListIrregularitiesComponent', () => {
  let component: ListIrregularitiesComponent;
  let fixture: ComponentFixture<ListIrregularitiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListIrregularitiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListIrregularitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
