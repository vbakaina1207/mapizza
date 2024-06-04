/* tslint:disable:no-unused-variable */

import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { AdditionProductService } from './addition-product.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

describe('Service: AdditionProduct', () => {
  let component: AdditionProductService;
  let fixture: ComponentFixture<AdditionProductService>;

  const serviceAdditionProductStub = {
    getOneFirebase: (id: string) => of({      
      id: id, 
      name: 'test type',
      description: '',
      weight: '25',
      price: 5,
      imagePath: '',
      isSauce: false
    }),
    getAllFirebase: () => of([
      { id: 1, 
        name: 'test type', 
        description: '',
        weight: '25',
        price: 5,
        imagePath: '',
        isSauce: false}
    ]),
    getAllBySauceFirebase: (isSauce: boolean) => of([
      { id: 1, 
        name: 'test type', 
        description: '',
        weight: '25',
        price: 5,
        imagePath: '',
        isSauce: isSauce}
    ])
  };
  
  beforeEach(async() => {
    await TestBed.configureTestingModule({
      providers: [
        { provide: AdditionProductService, useValue: serviceAdditionProductStub }
      ],
      imports: [
        HttpClientTestingModule
      ]
    }).compileComponents();
  });

  it('should ...', inject([AdditionProductService], (service: AdditionProductService) => {
    expect(service).toBeTruthy();
  }));
});
