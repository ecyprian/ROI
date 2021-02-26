import { TestBed } from '@angular/core/testing';

import { DialogModelService } from './dialog-model.service';

describe('DialogModelService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DialogModelService = TestBed.get(DialogModelService);
    expect(service).toBeTruthy();
  });
});
