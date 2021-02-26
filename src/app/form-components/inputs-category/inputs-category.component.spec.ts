import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputsCategoryComponent } from './inputs-category.component';

describe('InputsCategoryComponent', () => {
  let component: InputsCategoryComponent;
  let fixture: ComponentFixture<InputsCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputsCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputsCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
