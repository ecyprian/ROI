import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportType1Component } from './report-type1.component';

describe('ReportType1Component', () => {
  let component: ReportType1Component;
  let fixture: ComponentFixture<ReportType1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportType1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportType1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
