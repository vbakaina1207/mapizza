/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { NewsDetailService } from './news-detail.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('Service: NewsDetail', () => {
  beforeEach(async() => {
    await TestBed.configureTestingModule({
      providers: [NewsDetailService],
      imports: [
        HttpClientTestingModule
      ]
    }).compileComponents();
  });

  it('should ...', inject([NewsDetailService], (service: NewsDetailService) => {
    expect(service).toBeTruthy();
  }));
});
