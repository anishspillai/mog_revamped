import { TestBed } from '@angular/core/testing';

import { SortLabelChangeService } from './sort-label-change.service';

describe('SortLabelChangeService', () => {
  let service: SortLabelChangeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SortLabelChangeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
