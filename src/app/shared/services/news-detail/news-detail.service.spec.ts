/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { NewsDetailService } from './news-detail.service';

describe('Service: NewsDetail', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NewsDetailService]
    });
  });

  it('should ...', inject([NewsDetailService], (service: NewsDetailService) => {
    expect(service).toBeTruthy();
  }));
});
