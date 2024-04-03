/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { NewsDetailService } from './news-detail.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('Service: NewsDetail', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NewsDetailService],
      imports: [
        HttpClientTestingModule
      ]
    });
  });

  it('should ...', inject([NewsDetailService], (service: NewsDetailService) => {
    expect(service).toBeTruthy();
  }));
});
