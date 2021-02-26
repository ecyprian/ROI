import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RadioButtonsFormEntryComponent } from './radio-buttons-form-entry.component';

describe('RadioButtonsFormEntryComponent', () => {
  let component: RadioButtonsFormEntryComponent;
  let fixture: ComponentFixture<RadioButtonsFormEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RadioButtonsFormEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RadioButtonsFormEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
