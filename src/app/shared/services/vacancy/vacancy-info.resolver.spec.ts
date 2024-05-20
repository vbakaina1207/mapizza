import { TestBed } from '@angular/core/testing';

import { VacancyInfoResolver } from './vacancy-info.resolver';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('VacancyInfoResolver', () => {
  let resolver: VacancyInfoResolver;
  type VacancyInfoResolver = /*unresolved*/ any;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    }).compileComponents();
    resolver = TestBed.inject(VacancyInfoResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
