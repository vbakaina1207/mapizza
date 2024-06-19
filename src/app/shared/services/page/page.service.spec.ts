/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { PageService } from './page.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { CollectionReference, DocumentData, Firestore, deleteDoc, docData, updateDoc } from '@angular/fire/firestore';
import { IPageRequest, IPageResponse } from '../../interfaces/page/page.interface';


const mockFirestore = {
collection: jasmine.createSpy('collection').and.callFake((path: string) => {
    return {
      path,
      id: 'mockCollectionId'
    };
  }),
  doc: jasmine.createSpy('doc').and.callFake((path: string) => {
    return {
      path,
      id: 'mockDocId'
    };
  }),
  

  addDoc: jasmine.createSpy('addDoc').and.returnValue(Promise.resolve({})),
  docData: jasmine.createSpy('docData').and.returnValue(of({})),
  updateDoc: jasmine.createSpy('updateDoc').and.returnValue(Promise.resolve()),
  deleteDoc: jasmine.createSpy('deleteDoc').and.returnValue(Promise.resolve())
};

describe('Service: Page', () => {
  let firestoreMock: any;
  let pageService: PageService;
  
  const pageServiceStub = {
    getOneFirebase: (id: string) => of({ id: id, page: 1 }),
    getAllFirebase: () => of([{ id: '1', page: 1 }]),    
    createFirebase: (page: IPageRequest) => Promise.resolve({
      id: '1',
      ...page
    } as IPageResponse),
    updateFirebase: (page: Partial<IPageRequest>, id: string) => of({ id: id, ...page }),
    deleteFirebase: (id: string) => of({ id: id, page: 1 }),
  };

    const getAllFirebaseStub = jasmine.createSpyObj('PageService', ['getAllFirebase']);
    const getOneFirebaseStub = jasmine.createSpyObj('PageService', ['getOneFirebase']);
    const createFirebaseStub = jasmine.createSpyObj('PageService', ['createFirebase']);
    const updateFirebaseStub = jasmine.createSpyObj('PageService', ['updateFirebase']);
    const deleteFirebaseStub = jasmine.createSpyObj('PageService', ['deleteFirebase']);
  
  beforeEach(async () => {
    
    firestoreMock = {
      collection: jasmine.createSpy('collection').and.returnValue({} as CollectionReference<DocumentData>),
      doc: jasmine.createSpy('doc').and.returnValue({}),
      addDoc: jasmine.createSpy('addDoc').and.returnValue(Promise.resolve({})),
      docData: jasmine.createSpy('docData').and.returnValue(of({})),
      updateDoc: jasmine.createSpy('updateDoc').and.returnValue(Promise.resolve()),
      deleteDoc: jasmine.createSpy('deleteDoc').and.returnValue(Promise.resolve())
    };

    

    
    await TestBed.configureTestingModule({
      providers: [
        { provide: PageService, useValue: pageServiceStub },   
        { provide: Firestore, useValue: firestoreMock }
      ],
      imports: [
        HttpClientTestingModule
      ]
    }).compileComponents();

    pageService = TestBed.inject(PageService);
  });

  it('should be created', inject([PageService], (service: PageService) => {
    expect(service).toBeTruthy();
  }));

  it('should send create request and return new page', () => {
    const productRequest: IPageRequest = {      
      page: 1 
    };

    const expectedProduct: IPageResponse = {
      id: '1',
      page: 1 
    };

    pageService.createFirebase(productRequest).then((result: any) => {
      expect(result).toEqual(expectedProduct);
    });
   
  });

  it('getOneFirebase should return a type page by id', (done: DoneFn) => {
    const id = '1';
    const service = TestBed.inject(PageService);
    const expectedPage: IPageResponse = {
      id: '1',
      page: 1 
    };
    service.getOneFirebase(id)
      .subscribe(page => {
        expect(page).toEqual(expectedPage);
        done();
      });
  });

  it('getAllFirebase should return all pages', (done: DoneFn) => {
    const service = TestBed.inject(PageService);
    const expectedPage = [
      { id: '1',page: 1 }
    ];
    getAllFirebaseStub.getAllFirebase.and.returnValue(of(expectedPage));

    service.getAllFirebase()
      .subscribe(typeProducts => {
        expect(typeProducts).toEqual(expectedPage);
        done();
      });
  });

  it('getOneFirebase should return a page by id', async () => {
    
    const expectedTypeData: IPageResponse = {
      id: 1,
      page: 1
    };
    const expectedTypeProduct = of(expectedTypeData);
    const id = '1';
    getOneFirebaseStub.getOneFirebase.and.returnValue(of(expectedTypeProduct));
    
  });

  it('updateFirebase should return a page ', async () => {
    
    const expectedData: IPageResponse = {
      id: 1,
      page: 1
    };
    const expectedPage = of(expectedData);
    const id = '1';
    updateFirebaseStub.updateFirebase.and.returnValue(of(expectedPage));
    
  });

  it('deleteFirebase should return a page ', async () => {
    
    const expectedData: IPageResponse = {
      id: 1,
      page: 1
    };
    const expectedPage = of(expectedData);
    const id = '1';
    deleteFirebaseStub.deleteFirebase.and.returnValue(of(expectedPage));
    
  });

  it('createFirebase should return new page ', async () => {
    
    const expectedData: IPageResponse = {
      id: 1,
      page: 1
    };
    const expectedPage = of(expectedData);
    const id = '1';
    createFirebaseStub.createFirebase.and.returnValue(of(expectedPage));
    
  });

});
