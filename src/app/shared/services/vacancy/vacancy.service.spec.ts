// /* tslint:disable:no-unused-variable */

// import { TestBed, async, inject } from '@angular/core/testing';
// import { VacancyService } from './vacancy.service';
// import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
// import { CollectionReference, Firestore } from '@angular/fire/firestore';
// import { AngularFireModule } from '@angular/fire/compat';
// import { AngularFireStorageModule } from '@angular/fire/compat/storage';
// import { Auth } from '@angular/fire/auth';
// import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreModule } from '@angular/fire/compat/firestore';
// import { environment } from 'src/environments/environment';
// import { BehaviorSubject, of } from 'rxjs';
// import { AccountService } from '../account/account.service';
// import { ActivatedRoute } from '@angular/router';
// import { IVacancyResponse } from '../../interfaces/vacancy/vacancy.interface';

// xdescribe('Service: Vacancy', () => {
//   let httpTestingController: HttpTestingController;
//   let vacancyService: VacancyService;

//   const vacancyServiceStub = {
//     getAllFirebase: () => of([
//       {
//         id: '1',
//         name: 'new vacancy',
//         path: '',
//         description: '',
//         imagePath: ''
//       }
//     ]),
//     getOneFirebase: (id: string) => of(
//       {
//         id: id,
//         name: 'new vacancy',
//         path: '',
//         description: '',
//         imagePath: ''
//       }
//     ),
//     createFirebase: (vacancy: IVacancyResponse) => of({ ...vacancy }),
//     updateFirebase: (vacancy : Partial<IVacancyResponse>, id: string) => of({ id: id, ...vacancy  }),
//     deleteFirebase: (id: string) => of({
//       id: id, 
//       name: 'new vacancy',
//       path: '',
//       description: '',
//       imagePath: '' }),
//   };

//   const firestoreStub = {
//     collection: jasmine.createSpy().and.returnValue({
//     get: jasmine.createSpy().and.returnValue(of([]))
//   })
// };


//   const vacancies = [
//       {
//         id: '1',
//         name: 'new vacancy',
//         path: '',
//         description: '',
//         imagePath: ''
//       }
//   ]
  
//   const mockFirestore = {
//     collection: (path: string) => ({
//       doc: (id: string) => ({
//         get: () => of({
//           id: id,
//           name: 'new vacancy',
//           path: '',
//           description: '',
//           imagePath: ''
//         }),
//         update: (data: any) => Promise.resolve(),
//         delete: () => Promise.resolve(),
//         set: (data: any) => Promise.resolve()
//       }),
//       add: (data: any) => Promise.resolve({ id: '1' }),
//       get: () => of(vacancies)
//     })
//   };

  
//   //   where: () => ({
//   //       get: () => of([{ 
//   //         id: '1',
//   //         name: 'new vacancy',
//   //         path: '',
//   //         description: '',
//   //         imagePath: ''
//   //       }])
//   //     })
//   // };

// //   const mockFirestore = {
// // collection: jasmine.createSpy('collection').and.callFake((path: string) => {
// //     return {
// //       path,
// //       id: 'mockCollectionId'
// //     };
// //   }),
// //   doc: jasmine.createSpy('doc').and.callFake((path: string) => {
// //     return {
// //       path,
// //       id: 'mockDocId'
// //     };
// //   }),
// //   addDoc: jasmine.createSpy('addDoc').and.returnValue(Promise.resolve({})),
// //   docData: jasmine.createSpy('docData').and.returnValue(of({})),
// //   updateDoc: jasmine.createSpy('updateDoc').and.returnValue(Promise.resolve()),
// //   deleteDoc: jasmine.createSpy('deleteDoc').and.returnValue(Promise.resolve())
// // };

//   beforeEach(async() => {
//     await TestBed.configureTestingModule({
//       imports: [
//         HttpClientTestingModule,       
//       ],
//       providers: [          
//         { provide: VacancyService, useValue: vacancyServiceStub },     
        
//         { provide: Firestore, useValue: {}}
//       ],      
      
//     }).compileComponents();
    
//     vacancyService = TestBed.inject(VacancyService);
//     httpTestingController = TestBed.inject(HttpTestingController);

//     // Mock getAllFirebase
//   spyOn(vacancyService, 'getAllFirebase').and.returnValue(of(vacancies));

//   });

//   // afterEach(() => {
//   //   httpTestingController.verify();
//   // });

//   it('should ...', inject([VacancyService], (service: VacancyService) => {
//     expect(service).toBeTruthy();
//   }));

//   // it('should get all vacancies', inject([VacancyService], (service: VacancyService) => {
//   //   service.getAllFirebase().subscribe((vacancies) => {
//   //     expect(vacancies.length).toBeGreaterThan(0);
//   //   });
//   // }));

// });

// import { TestBed, inject } from '@angular/core/testing';
// import { VacancyService } from './vacancy.service';
// import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
// import { Firestore } from '@angular/fire/firestore';
// import { of } from 'rxjs';
// import { IVacancyResponse } from '../../interfaces/vacancy/vacancy.interface';

// xdescribe('Service: Vacancy', () => {
//   let httpTestingController: HttpTestingController;
//   let vacancyService: VacancyService;

  

//   const vacancyServiceMock = {
//     getOneFirebase: jasmine.createSpy('getOneFirebase').and.returnValue(of({} as IVacancyResponse))
//   };

//   beforeEach(async() => {
//     await TestBed.configureTestingModule({
//       imports: [
//         HttpClientTestingModule,       
//       ],
//       providers: [          
//         { provide: VacancyService, useValue: vacancyServiceMock },
//         // { provide: Firestore, useValue: firestoreStub }
//       ],      
      
//     }).compileComponents();
    
//     vacancyService = TestBed.inject(VacancyService);
//     httpTestingController = TestBed.inject(HttpTestingController);
//   });

//   it('should ...', inject([VacancyService], (service: VacancyService) => {
//     expect(service).toBeTruthy();
//   }));

//   // Add more tests here
// });


import { TestBed, inject } from '@angular/core/testing';
import { VacancyService } from './vacancy.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { IVacancyResponse } from '../../interfaces/vacancy/vacancy.interface';
import { Firestore } from '@angular/fire/firestore';
import { collection, DocumentData } from '@firebase/firestore';

describe('Service: Vacancy', () => {
  let httpTestingController: HttpTestingController;
  let vacancyService: VacancyService;

  // const vacancyServiceMock = {
  //   getOneFirebase: jasmine.createSpy('getOneFirebase').and.returnValue(of({} as IVacancyResponse)),
  //   getAllFirebase: jasmine.createSpy('getAllFirebase').and.returnValue(of({} as IVacancyResponse)),
  //   createFirebase: jasmine.createSpy('createFirebase').and.returnValue(of({} as IVacancyResponse)),
  //   updateFirebase: jasmine.createSpy('updateFirebase').and.returnValue(of({} as IVacancyResponse)),
  //   deleteFirebase: jasmine.createSpy('deleteFirebase').and.returnValue(of({} as IVacancyResponse))
  // };
  const mockVacancy: IVacancyResponse = {
    id: '1',
    name: 'Sample Vacancy',
    path: '',
    description: 'A test vacancy description',
    imagePath: ''
  };

  // const vacancyServiceMock = {
  //   getOneFirebase: jasmine.createSpy('getOneFirebase').and.returnValue(of(mockVacancy)),
  //   getAllFirebase: jasmine.createSpy('getAllFirebase').and.returnValue(of([mockVacancy])),
  //   createFirebase: jasmine.createSpy('createFirebase').and.returnValue(of(mockVacancy)),
  //   updateFirebase: jasmine.createSpy('updateFirebase').and.returnValue(of(mockVacancy)),
  //   deleteFirebase: jasmine.createSpy('deleteFirebase').and.returnValue(of(mockVacancy))
  // };

  const vacancyServiceMock = {
    getOneFirebase: (id: string) => of({
      id: id,
      name: 'Sample Vacancy',
      path: '',
      description: 'A test vacancy description',
      imagePath: ''
    }),
    getAllFirebase: () => of([{
      id: 1,
      name: 'Sample Vacancy',
      path: '',
      description: 'A test vacancy description',
      imagePath: ''
    }]),
  updateFirebase: ( vacancy: Partial<IVacancyResponse>, id: string) => of({
    id: id,
    ...vacancy
  }),
  createFirebase: (vacancy: IVacancyResponse) => of({ ...vacancy }),
//     updateFirebase: (vacancy : Partial<IVacancyResponse>, id: string) => of({ id: id, ...vacancy  }),
    deleteFirebase: (id: string) => of({
      id: id, 
      name: 'new vacancy',
      path: '',
      description: '',
      imagePath: '' }),
};
  const firestoreMock = {
    collection: jasmine.createSpy('collection').and.callFake((path: string) => {
      return {
        withConverter: () => ({
          get: () => of({ docs: [{ id: '1', data: () => mockVacancy }] })
        })
      };
    }),
    doc: jasmine.createSpy('doc').and.callFake((path: string) => {
      return {
        withConverter: () => ({
          get: () => of({ exists: true, id: '1', data: () => mockVacancy })
        })
      };
    })
  };
  // const firestoreMock = jasmine.createSpyObj('Firestore', {
  //   collection: jasmine.createSpy('collection').and.returnValue({
  //     withConverter: jasmine.createSpy('withConverter').and.returnValue({
  //       get: jasmine.createSpy('get').and.returnValue(Promise.resolve({
  //         docs: [{ id: '1', data: () => mockVacancy }]
  //       }))
  //     })
  //   }),
  //   doc: jasmine.createSpy('doc').and.returnValue({
  //     withConverter: jasmine.createSpy('withConverter').and.returnValue({
  //       get: jasmine.createSpy('get').and.returnValue(Promise.resolve({
  //         exists: true,
  //         id: '1',
  //         data: () => mockVacancy
  //       }))
  //     })
  //   })
  // });

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,       
      ],
      providers: [          
        { provide: VacancyService, useValue: vacancyServiceMock },
       
        { provide: Firestore, useValue: firestoreMock } 
      ],      
      
    }).compileComponents();
    
    vacancyService = TestBed.inject(VacancyService);
    // httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should ...', inject([VacancyService], (service: VacancyService) => {
    expect(service).toBeTruthy();
  }));

  // it('should get one vacancy by id', inject([VacancyService], (service: VacancyService) => {
  //   service.getOneFirebase('1').subscribe((vacancy) => {
  //     expect(vacancy).toEqual(mockVacancy);
  //   });
  //   expect(vacancyServiceMock.getOneFirebase).toHaveBeenCalledWith('1');
  // }));


  // it('should get all vacancies', inject([VacancyService], (service: VacancyService) => {
  //   service.getAllFirebase().subscribe((vacancies) => {
  //     expect(vacancies).toEqual([mockVacancy]);
  //   });
  //   expect(vacancyServiceMock.getAllFirebase).toHaveBeenCalled();
  // }));

  it('should get all vacancies', inject([VacancyService], (service: VacancyService) => {
        service.getAllFirebase().subscribe((vacancies) => {
          expect(vacancies.length).toBeGreaterThan(0);
        });
      }));
  

  
});
