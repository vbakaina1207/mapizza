/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { CategoryService } from './category.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { of } from 'rxjs';


describe('Service: Category', () => {
  let httpTestingController: HttpTestingController;
  let categoryService: CategoryService;
  
  const categoryServiceStub = {
    getOneFirebase: (id: string) =>
      of({
        id: id,
        name: 'test category',
        path: '',
        imagePath: '',
      }),

      getAllFirebase: () =>
        of([{
          id: 1,
          name: 'test category',
          path: '',
          imagePath: '',
        }]),
  };
  
  beforeEach(async() => {

    await TestBed.configureTestingModule({
      providers: [
        { provide: CategoryService, useValue: categoryServiceStub },       
      ],
      imports: [
        HttpClientTestingModule             
      ]
    }).compileComponents();
    httpTestingController = TestBed.inject( HttpTestingController );
    categoryService = TestBed.inject(CategoryService);
  });


  it('should ...', inject([CategoryService], (service: CategoryService) => {
    expect(service).toBeTruthy();
  }));
});