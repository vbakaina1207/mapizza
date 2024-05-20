/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { TypeProductService } from './type-product.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('Service: TypeProduct', () => {
  beforeEach(async() => {
    await TestBed.configureTestingModule({
      providers: [TypeProductService],
      imports: [
        HttpClientTestingModule
      ]
    }).compileComponents();
  });

  it('should ...', inject([TypeProductService], (service: TypeProductService) => {
    expect(service).toBeTruthy();
  }));
});
