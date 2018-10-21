import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOccurenceComponent } from './list-occurence.component';

describe('ListOcorrenceComponent', () => {
  let component: ListOccurenceComponent;
  let fixture: ComponentFixture<ListOccurenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListOccurenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOccurenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
