/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { NewsService } from './news.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { CollectionReference, DocumentReference, Firestore} from '@angular/fire/firestore';
import { BehaviorSubject, of } from 'rxjs';


// const FirestoreStub = {
//   collection: (_name: string) => {
//     return {
//       doc: (_id: string) => ({
//         valueChanges: () => new BehaviorSubject({ foo: 'bar' }),
//         set: (_d: any) => new Promise<void>((resolve, _reject) => resolve()),
//         get: () => new Promise((resolve, _reject) => resolve({})),
//         update: (_d: any) => new Promise<void>((resolve, _reject) => resolve()),
//         delete: () => new Promise<void>((resolve, _reject) => resolve()),
//       }),
//       add: (_d: any) => new Promise<void>((resolve, _reject) => resolve()),
//       get: () => new Promise((resolve, _reject) => resolve({})), // Доданий метод заглушки для get
//     };
//   },
//   doc: (_path: string) => ({
//     valueChanges: () => new BehaviorSubject({ foo: 'bar' }),
//     set: (_d: any) => new Promise<void>((resolve, _reject) => resolve()),
//     get: () => new Promise((resolve, _reject) => resolve({})),
//     update: (_d: any) => new Promise<void>((resolve, _reject) => resolve()),
//     delete: () => new Promise<void>((resolve, _reject) => resolve()),
//   }),
// };

// describe('Service: News', () => {
//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       providers: [
//         NewsService,
//         { provide: Firestore, useValue: {FirestoreStub } },
//       ],
//       imports: [
//         HttpClientTestingModule,
            
//         AngularFireModule.initializeApp(environment.firebase) ,
//         // AngularFirestoreModule
//       ]
//     });
//   });
// const FirestoreStub = {
//   collection: (name: string) => ({
//     doc: (_id: string) => ({
//       valueChanges: () => new BehaviorSubject({ foo: 'bar' }),
//       set: (_d: any) => new Promise<void>((resolve, _reject) => resolve()),
//     }),
//   }),
// };

// Використовуйте цю заглушку в тестах
// TestBed.configureTestingModule({
//   providers: [
//     NewsService,
//     { provide: Firestore, useValue: {} },
//   ],
//   imports: [
//     HttpClientTestingModule,
//     AngularFireModule.initializeApp(environment.firebase),
//   ]
// });

// describe('Service: News', () => {
//   let firestoreStub: any;

//   beforeEach(() => {
//     firestoreStub = {
//       collection: jasmine.createSpy('collection').and.returnValue({
//         doc: jasmine.createSpy('doc').and.returnValue({
//           valueChanges: jasmine.createSpy('valueChanges').and.returnValue(of({ foo: 'bar' })),
//         }),
//       }),
//     };

//     TestBed.configureTestingModule({      
  describe('Service: Vacancy', () => {
  beforeEach(async() => {
    await TestBed.configureTestingModule({      
      providers: [
        NewsService,
        { provide: Firestore, useValue: {} },    
      ], 
      imports: [
        HttpClientTestingModule,
        AngularFireModule.initializeApp(environment.firebase),
      ]
    }).compileComponents();
  });
  
  it('should ...', inject([NewsService], (service: NewsService) => {
    expect(service).toBeTruthy();
  }));
});
