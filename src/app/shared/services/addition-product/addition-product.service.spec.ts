/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AdditionProductService } from './addition-product.service';

describe('Service: AdditionProduct', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdditionProductService]
    });
  });

  it('should ...', inject([AdditionProductService], (service: AdditionProductService) => {
    expect(service).toBeTruthy();
  }));
});
