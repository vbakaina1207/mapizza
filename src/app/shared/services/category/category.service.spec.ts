/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { CategoryService } from './category.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { Firestore } from '@angular/fire/firestore';
import { of } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';

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
  };
  
  beforeEach(async() => {

    await TestBed.configureTestingModule({
      providers: [
        { providers: CategoryService, useValue: categoryServiceStub },
        { provide: Firestore, useValue:{} },
      ],
      imports: [
        HttpClientTestingModule,
        AngularFireStorageModule,        
      ]
    }).compileComponents();
    httpTestingController = TestBed.inject( HttpTestingController );
    categoryService = TestBed.inject(CategoryService);
  });


  it('should ...', inject([CategoryService], (service: CategoryService) => {
    expect(service).toBeTruthy();
  }));
});
