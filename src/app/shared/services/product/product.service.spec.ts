/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { ProductService } from './product.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { IProductRequest, IProductResponse } from '../../interfaces/product/product.interface';
import { of } from 'rxjs';
import { ITypeAdditionResponse } from '../../interfaces/type-addition/type-addition.interfaces';

describe('Service: Product', () => {
  let httpTestingController: HttpTestingController;
  let productService: ProductService;


  const productServiceStub = {
    getOneFirebase: (id: string) => of({
      id: id,
      category: { id: 1, name: '', path: '', imagePath: '' },
      type_product: { id: 1, name: '', path: '', imgPath: '' },
      type_addition: [{ id: 1, name: '', path: '', description: '', weight: '25', price: 25, imagePath: '', isSauce: false }],
      selected_addition: [{}],
      name: '', path: '', ingredients: ' ', weight: '', price: 12, addition_price: 0, bonus: 0, imagePath: '', count: 1
    }),
    getAllByCategoryFirebase: () => of([{
      id: '1',
      category: { id: 1, name: '', path: '', imagePath: '' },
      type_product: { id: 1, name: '', path: '', imgPath: '' },
      type_addition: [{ id: 1, name: 'type', path: '', description: '', weight: '25', price: 25, imagePath: '', isSauce: false }] as ITypeAdditionResponse[],
      selected_addition: [{ id: 1, name: 'type', path: '', description: '', weight: '25', price: 25, imagePath: '', isSauce: false }] as ITypeAdditionResponse[],
      name: 'Product Name', path: '', ingredients: 'products', weight: '', price: 12, addition_price: 0, bonus: 0, imagePath: '', count: 1
    }]),
    getAllFirebase: () => of([
      {
        id: '1',
      category: { id: 1, name: '', path: '', imagePath: '' },
      type_product: { id: 1, name: '', path: '', imgPath: '' },
      type_addition: [{ id: 1, name: 'type', path: '', description: '', weight: '25', price: 25, imagePath: '', isSauce: false }] as ITypeAdditionResponse[],
      selected_addition: [{ id: 1, name: 'type', path: '', description: '', weight: '25', price: 25, imagePath: '', isSauce: false }] as ITypeAdditionResponse[],
      name: 'Product Name', path: '', ingredients: 'products', weight: '', price: 12, addition_price: 0, bonus: 0, imagePath: '', count: 1
    }
    ]),    
    updateFirebase: ( product: Partial<IProductResponse>, id: string) => of({
      id: id,
      ...product
    })
  };
  
  const products = [
    {
      id: 1,
      category: { id: 1, name: '', path: '', imagePath: '' },
      type_product: { id: 1, name: '', path: '', imgPath: '' },
      type_addition: [{ id: 1, name: '', path: '', description: '', weight: '25', price: 25, imagePath: '', isSauce: false }],
      selected_addition: [{}],
      name: '', path: '', ingredients: ' ', weight: '', price: 12, addition_price: 0, bonus: 0, imagePath: '', count: 1
    }
  ];

  const product = {
    id: 1,
    category: { id: 1, name: '', path: '', imagePath: '' },
    type_product: { id: 1, name: '', path: '', imgPath: '' },
    type_addition: [{ id: 1, name: '', path: '', description: '', weight: '25', price: 25, imagePath: '', isSauce: false }],
    selected_addition: [{}],
    name: '', path: '', ingredients: ' ', weight: '', price: 12, addition_price: 0, bonus: 0, imagePath: '', count: 1
  };

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      providers: [
      { provide: ProductService, useValue: productServiceStub },
      ],
      imports: [ HttpClientTestingModule ]
    }).compileComponents();

    productService = TestBed.inject(ProductService);
    httpTestingController = TestBed.inject(HttpTestingController);

    // Mock getAllFirebase
  spyOn(productService, 'getAllFirebase').and.returnValue(of(products)); 
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should ...', inject([ProductService], (service: ProductService) => {
    expect(service).toBeTruthy();
  }));



  // it('can test HttpClient.get', () => {
  //   spyOn(productService, 'getAllFirebase').and.returnValue(of(products)); 
  //   const data = [
  //     {
  //     id: 1,
  //       price_old: 100,
  //     imagePath: '',
  //     count: 5
  //   },
  //     {
  //       id: 2,
  //       price_old: 200,
  //       imagePath: '',
  //       count: 15
  //     }]
  //   productService.getAllFirebase().subscribe((response: any) => expect(response).toBe(data));
  //   const req = httpTestingController.expectOne('http://localhost:3000/products');
  //   expect(req.request.method).toBe('GET');
  //   req.flush(data);
  // });



  // it('should send create request and return new product', () => {
  //   const productRequest: IProductRequest = {
  //     category: {
  //       id: 1,
  //       name: 'rol',
  //       path: 'rol',
  //       imagePath: 'www.monosuschi',
  //     },
  //     type_product: {
  //       id: 1,
  //       name: 'set',
  //       path: 'set',
  //       imgPath: 'www.monosuschi',
  //     },
  //     type_addition: [{
  //         id: 1,
  //         name: 'souce',
  //         path: 'souce',
  //         description: 'souce',
  //         weight: '20',
  //         price: 50,
  //         imagePath: 'souce',
  //         isSauce: true,
  //       }],
  //     selected_addition: [{
  //         id: 1,
  //         name: 'souce',
  //         path: 'souce',
  //         description: 'souce',
  //         weight: '20',
  //         price: 50,
  //         imagePath: 'souce',
  //         isSauce: true,
  //       }],
  //     name: 'california',
  //     path: 'california',
  //     ingredients: 'fish',
  //     weight: '120',
  //     price: 200,
  //     addition_price: 300,
  //     bonus: 8,
  //     imagePath: 'www.monosushi',
  //     count: 2,      
  //   };

  //   const expectedProduct: IProductResponse = {
  //     id: 3,
  //     category: {
  //       id: 1,
  //       name: 'rol',
  //       path: 'rol',
  //       imagePath: 'www.monosuschi',
  //     },
  //     type_product: {
  //       id: 1,
  //       name: 'set',
  //       path: 'set',
  //       imgPath: 'www.monosuschi',
  //     },
  //     type_addition: [{
  //         id: 1,
  //         name: 'souce',
  //         path: 'souce',
  //         description: 'souce',
  //         weight: '20',
  //         price: 50,
  //         imagePath: 'souce',
  //         isSauce: true,
  //       }],
  //     selected_addition: [{
  //         id: 1,
  //         name: 'souce',
  //         path: 'souce',
  //         description: 'souce',
  //         weight: '20',
  //         price: 50,
  //         imagePath: 'souce',
  //         isSauce: true,
  //       }],
  //     name: 'california',
  //     path: 'california',
  //     ingredients: 'fish',
  //     weight: '120',
  //     price: 200,
  //     addition_price: 300,
  //     bonus: 8,
  //     imagePath: 'www.monosushi',
  //     count: 2
  //   };

  //   productService.createFirebase(productRequest).then((result: any) => {
  //     expect(result).toEqual(expectedProduct);
  //   });

  //   const expectedUrl = 'http://localhost:3000/products';
  //   const testRequest = httpTestingController.expectOne(expectedUrl);

  //   expect(testRequest.request.method).toEqual('POST');
  //   expect(testRequest.request.body).toEqual(productRequest);

  //   testRequest.flush(expectedProduct);
  // });

});
