/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MassageService } from './massage.service';

describe('Service: Message', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MassageService]
    });
  });

  it('should ...', inject([MassageService], (service: MassageService) => {
    expect(service).toBeTruthy();
  }));
});
