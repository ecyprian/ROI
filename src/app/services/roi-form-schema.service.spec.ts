import { TestBed } from '@angular/core/testing';

import { RoiFormSchemaService } from './roi-form-schema.service';

xdescribe('RoiFormSchemaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RoiFormSchemaService = TestBed.get(RoiFormSchemaService);
    expect(service).toBeTruthy();
  });
});
