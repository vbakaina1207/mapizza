/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { VacancyService } from './vacancy.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CollectionReference, Firestore } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { Auth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, of } from 'rxjs';
import { AccountService } from '../account/account.service';
import { ActivatedRoute } from '@angular/router';
import { IVacancyResponse } from '../../interfaces/vacancy/vacancy.interface';

describe('Service: Vacancy', () => {
  let httpTestingController: HttpTestingController;
  let vacancyService: VacancyService;

  const vacancyServiceStub = {
    getAllFirebase: () => of([
      {
        id: '1',
        name: 'new vacancy',
        path: '',
        description: '',
        imagePath: ''
      }
    ]),
    getOneFirebase: (id: string) => of(
      {
        id: id,
        name: 'new vacancy',
        path: '',
        description: '',
        imagePath: ''
      }
    ),
    createFirebase: (vacancy: IVacancyResponse) => of({ ...vacancy }),
    updateFirebase: (vacancy : Partial<IVacancyResponse>, id: string) => of({ id: id, ...vacancy  }),
    deleteFirebase: (id: string) => of({
      id: id, 
      name: 'new vacancy',
      path: '',
      description: '',
      imagePath: '' }),
  };

  const firestoreStub = {
    collection: jasmine.createSpy().and.returnValue({
    get: jasmine.createSpy().and.returnValue(of([]))
  })
};

// const mockFirestore = {
//   collection: jasmine.createSpy('collection').and.callFake(() => ({
//     doc: jasmine.createSpy('doc').and.callFake(() => ({
//       set: jasmine.createSpy('set').and.returnValue(Promise.resolve()),
//       get: jasmine.createSpy('get').and.returnValue(Promise.resolve({ data: () => ({}) })),
//       update: jasmine.createSpy('update').and.returnValue(Promise.resolve()),
//       delete: jasmine.createSpy('delete').and.returnValue(Promise.resolve())
//     })),
//     add: jasmine.createSpy('add').and.returnValue(Promise.resolve()),
//     get: jasmine.createSpy('get').and.returnValue(of([]))
//   }))
// };

  const vacancies = [
      {
        id: '1',
        name: 'new vacancy',
        path: '',
        description: '',
        imagePath: ''
      }
  ]
  
  const mockFirestore = {
    collection: (path: string) => ({
      doc: (id: string) => ({
        get: () => of({
          id: id,
          name: 'new vacancy',
          path: '',
          description: '',
          imagePath: ''
        }),
        update: (data: any) => Promise.resolve(),
        delete: () => Promise.resolve(),
        set: (data: any) => Promise.resolve()
      }),
      add: (data: any) => Promise.resolve({ id: '1' }),
      get: () => of(vacancies)
    })
  };

  // const mockFirestore = {
  //   collection: (path: string) => ({
  //     doc: (id: string) => ({
  //       get: () => of({
  //         id: id,
  //         name: 'new vacancy',
  //         path: '',
  //         description: '',
  //         imagePath: ''
  //       }),
  //       update: (data: any) => of({ id: '1', ...data }),
  //       add: (data: any) => of({ id: '1', ...data })
  //     }),
  //     get: () => of(vacancies)
  //   }),
  //   where: () => ({
  //       get: () => of([{ 
  //         id: '1',
  //         name: 'new vacancy',
  //         path: '',
  //         description: '',
  //         imagePath: ''
  //       }])
  //     })
  // };

//   const mockFirestore = {
// collection: jasmine.createSpy('collection').and.callFake((path: string) => {
//     return {
//       path,
//       id: 'mockCollectionId'
//     };
//   }),
//   doc: jasmine.createSpy('doc').and.callFake((path: string) => {
//     return {
//       path,
//       id: 'mockDocId'
//     };
//   }),
//   addDoc: jasmine.createSpy('addDoc').and.returnValue(Promise.resolve({})),
//   docData: jasmine.createSpy('docData').and.returnValue(of({})),
//   updateDoc: jasmine.createSpy('updateDoc').and.returnValue(Promise.resolve()),
//   deleteDoc: jasmine.createSpy('deleteDoc').and.returnValue(Promise.resolve())
// };

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,       
      ],
      providers: [          
        { provide: VacancyService, useValue: vacancyServiceStub },     
        
        { provide: Firestore, useValue: mockFirestore },     
            
      ],      
      
    }).compileComponents();
    
    vacancyService = TestBed.inject(VacancyService);
    httpTestingController = TestBed.inject(HttpTestingController);

    // Mock getAllFirebase
  spyOn(vacancyService, 'getAllFirebase').and.returnValue(of(vacancies));

  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should ...', inject([VacancyService], (service: VacancyService) => {
    expect(service).toBeTruthy();
  }));

  it('should get all vacancies', inject([VacancyService], (service: VacancyService) => {
    service.getAllFirebase().subscribe((vacancies) => {
      expect(vacancies.length).toBeGreaterThan(0);
    });
  }));

});
