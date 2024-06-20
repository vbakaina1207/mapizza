/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { NewsService } from './news.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import {  Firestore} from '@angular/fire/firestore';
import { of } from 'rxjs';
import { INewsRequest, INewsResponse } from '../../interfaces/news/news.interface';


  describe('Service: News', () => {
    let newsService: NewsService;

    const newsServiceStub = {
      getOneFirebase: (id: string) => of({ id: id, page: 1 }),
      getAllFirebase: () => of([{ 
        id: '1', 
        page: {id: 1, page: 1},
      name: 'test news',
      path: '',
      description: 'test description',
      imagePath: '',
      detail:{}
      }]),    
      createFirebase: (news: INewsRequest) => Promise.resolve({
        id: '1',
        ...news
      } as INewsResponse),
      updateFirebase: (news: Partial<INewsRequest>, id: string) => of({ id: id, ...news }),
      deleteFirebase: (id: string) => of({ 
        id: id, 
        page: {id: 1, page: 1},
      name: 'test news',
      path: '',
      description: 'test description',
      imagePath: '',
      detail:{}
      }),
    };
  
      const getAllFirebaseStub = jasmine.createSpyObj('NewsService', ['getAllFirebase']);
      const getOneFirebaseStub = jasmine.createSpyObj('NewsService', ['getOneFirebase']);
      const createFirebaseStub = jasmine.createSpyObj('NewsService', ['createFirebase']);
      const updateFirebaseStub = jasmine.createSpyObj('NewsService', ['updateFirebase']);
      const deleteFirebaseStub = jasmine.createSpyObj('NewsService', ['deleteFirebase']);

  beforeEach(async() => {
    await TestBed.configureTestingModule({      
      providers: [
        
        { provide: NewsService, useValue: {} },    
      ], 
      imports: [
        HttpClientTestingModule,
        AngularFireModule.initializeApp(environment.firebase),
      ]
    }).compileComponents();

    newsService = TestBed.inject(NewsService);
  });
  
  it('should ...', inject([NewsService], (service: NewsService) => {
    expect(service).toBeTruthy();
  }));

  
  it('should fetch a single news item by ID', inject([NewsService], (service: NewsService) => {
    const expectedTypeData: INewsResponse = {
      id: '1',
      page: {id: 1, page: 1},
      name: 'test news',
      path: '',
      description: 'test description',
      imagePath: '',
      detail:{
        id: '',
        title: '',
        description: '',
        imagePath: '',
        detail: []
      }
    };
    const expectedTypeProduct = of(expectedTypeData);
    const id = '1';
    getOneFirebaseStub.getOneFirebase.and.returnValue(of(expectedTypeProduct));    
  }));

  it('should fetch all news items', inject([NewsService], (service: NewsService) => {
    // const service = TestBed.inject(NewsService);
    const expectedPage = [
      { id: '1',page: {id: 1, page: 1},
      name: 'test news',
      path: '',
      description: 'test description',
      imagePath: '',
      detail:{
        id: '',
        title: '',
        description: '',
        imagePath: '',
        detail: []
      }}
    ];
    getAllFirebaseStub.getAllFirebase.and.returnValue(of(expectedPage));

    getAllFirebaseStub.getAllFirebase()
      .subscribe((news: any) => {
        expect(news).toEqual(expectedPage);        
      });
  }));
  

  it('updateFirebase should return a page ', async () => {
    
    const expectedData: INewsResponse = {
      id: 1,
      page: {id: 1, page: 1},
      name: 'test news',
      path: '',
      description: 'test description',
      imagePath: '',
      detail:{
        id: '',
        title: '',
        description: '',
        imagePath: '',
        detail: []
      }
    };
    const expectedPage = of(expectedData);
    const id = '1';
    updateFirebaseStub.updateFirebase.and.returnValue(of(expectedPage));
    
  });

  it('deleteFirebase should return a page ', async () => {
    
    const expectedData: INewsResponse = {
      id: 1,
      page: {id: 1, page: 1},
      name: 'test news',
      path: '',
      description: 'test description',
      imagePath: '',
      detail:{
        id: '',
        title: '',
        description: '',
        imagePath: '',
        detail: []
      }
    };
    const expectedPage = of(expectedData);
    const id = '1';
    deleteFirebaseStub.deleteFirebase.and.returnValue(of(expectedPage));
    
  });

  it('createFirebase should return new page ', async () => {
    
    const expectedData: INewsResponse = {
      id: 1,
      page: {id: 1, page: 1},
      name: 'test news',
      path: '',
      description: 'test description',
      imagePath: '',
      detail:{
        id: '',
        title: '',
        description: '',
        imagePath: '',
        detail: []
      }
    };
    const expectedPage = of(expectedData);
    const id = '1';
    createFirebaseStub.createFirebase.and.returnValue(of(expectedPage));
    
  });
});


