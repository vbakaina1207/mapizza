/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { PageService } from './page.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('Service: Page', () => {
  beforeEach(async() => {
    await TestBed.configureTestingModule({
      providers: [PageService],
      imports: [
        HttpClientTestingModule
      ]
    }).compileComponents();
  });

  it('should ...', inject([PageService], (service: PageService) => {
    expect(service).toBeTruthy();
  }));
});
