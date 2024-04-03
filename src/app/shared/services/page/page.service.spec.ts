/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PageService } from './page.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('Service: Page', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PageService],
      imports: [
        HttpClientTestingModule
      ]
    });
  });

  it('should ...', inject([PageService], (service: PageService) => {
    expect(service).toBeTruthy();
  }));
});
