/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { TypeProductService } from './type-product.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

describe('Service: TypeProduct', () => {

  const serviceTypeProductStub = {
    getOneFirebase: (id: string) => of({      
      id: 1, name: 'test type', path: '', imgPath: '' 
    }),
    getAllFirebase: () => of([
      { id: 1, name: 'test type', path: '', imgPath: '' }
    ])
  };
  beforeEach(async() => {
    await TestBed.configureTestingModule({
      providers: [
        {provide: TypeProductService, useValue: serviceTypeProductStub }
      ],
      imports: [
        HttpClientTestingModule
      ]
    }).compileComponents();
  });

  it('should ...', inject([TypeProductService], (service: TypeProductService) => {
    expect(service).toBeTruthy();
  }));
});
