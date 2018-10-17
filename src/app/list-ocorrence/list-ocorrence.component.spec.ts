import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOcorrenceComponent } from './list-ocorrence.component';

describe('ListOcorrenceComponent', () => {
  let component: ListOcorrenceComponent;
  let fixture: ComponentFixture<ListOcorrenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListOcorrenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOcorrenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
