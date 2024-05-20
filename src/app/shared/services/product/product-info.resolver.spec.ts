import { TestBed } from '@angular/core/testing';

import { ProductInfoResolver } from './product-info.resolver';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ProductInfoResolver', () => {
  let resolver: ProductInfoResolver;
  type ProductInfoResolver = /*unresolved*/ any;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports:[ HttpClientTestingModule]
    }).compileComponents();
    resolver = TestBed.inject(ProductInfoResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
