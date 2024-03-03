/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { NewsInfoService } from './news-info.service';

describe('Service: NewsInfo', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NewsInfoService]
    });
  });

  it('should ...', inject([NewsInfoService], (service: NewsInfoService) => {
    expect(service).toBeTruthy();
  }));
});
