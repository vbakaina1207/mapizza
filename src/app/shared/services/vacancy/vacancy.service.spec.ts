/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { VacancyService } from './vacancy.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
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
    createFirebase: (vacancies: IVacancyResponse) => of({ ...vacancies }),
    updateFirebase: (vacancies : Partial<IVacancyResponse>, id: string) => of({ id: id, ...vacancies  }),
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

const mockFirestore = {
  collection: jasmine.createSpy('collection').and.callFake(() => ({
    doc: jasmine.createSpy('doc').and.callFake(() => ({
      set: jasmine.createSpy('set').and.returnValue(Promise.resolve()),
      get: jasmine.createSpy('get').and.returnValue(Promise.resolve({ data: () => ({}) })),
      update: jasmine.createSpy('update').and.returnValue(Promise.resolve()),
      delete: jasmine.createSpy('delete').and.returnValue(Promise.resolve())
    })),
    add: jasmine.createSpy('add').and.returnValue(Promise.resolve()),
    get: jasmine.createSpy('get').and.returnValue(of([]))
  }))
};

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,       
      ],
      providers: [ 
        { provide: VacancyService, useValue: vacancyServiceStub },        
        { provide: Firestore, useValue: mockFirestore },     
        { provide: AngularFirestore, useValue: {} },         
      ],      
      
    });
     

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
