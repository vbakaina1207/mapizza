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

describe('Service: Vacancy', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VacancyService,
        //  { provide: AngularFirestore, useValue: { collection: () => ({}) } }, 
        {
          provide: Firestore, useValue: {            
          collection: () => ({
            doc: () => ({
              set: () => Promise.resolve(),
              get: () => Promise.resolve(),
              update: () => Promise.resolve(),
              delete: () => Promise.resolve(),
            }),
        }) } },
        // AngularFireModule.initializeApp(environment.firebase).providers,
        
        // { provide: Firestore, useExisting: AngularFirestore },
        // AngularFireModule,
        
      ],
      imports: [
        HttpClientTestingModule,
        AngularFireStorageModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
      ]
    });
      // .overrideProvider(Firestore, { useValue: { collection: () => ({}) } }); 

  });

  it('should ...', inject([VacancyService], (service: VacancyService) => {
    expect(service).toBeTruthy();
  }));
});
