/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { NewsInfoService } from './news-info.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('Service: NewsInfo', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NewsInfoService],
      imports: [
        HttpClientTestingModule
      ]
    });
  });

  it('should ...', inject([NewsInfoService], (service: NewsInfoService) => {
    expect(service).toBeTruthy();
  }));
});
