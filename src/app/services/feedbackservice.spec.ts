import { TestBed } from '@angular/core/testing';

import { Feedbackservice } from './feedbackservice';

describe('Feedbackservice', () => {
  let service: Feedbackservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Feedbackservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
