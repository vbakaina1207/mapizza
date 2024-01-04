/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { VacancyService } from './vacancy.service';

describe('Service: Vacancy', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VacancyService]
    });
  });

  it('should ...', inject([VacancyService], (service: VacancyService) => {
    expect(service).toBeTruthy();
  }));
});
