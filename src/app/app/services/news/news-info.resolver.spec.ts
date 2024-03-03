import { TestBed } from '@angular/core/testing';

import { NewsInfoResolver } from './news-info.resolver';

describe('NewsInfoResolver', () => {
  let resolver: NewsInfoResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(NewsInfoResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
