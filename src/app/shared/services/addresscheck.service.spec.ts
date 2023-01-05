import { TestBed } from '@angular/core/testing';

import { AddresscheckService } from './addresscheck.service';

describe('AddresscheckService', () => {
  let service: AddresscheckService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddresscheckService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
