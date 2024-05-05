/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FaqService } from './faq.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Firestore, addDoc, collectionData } from '@angular/fire/firestore';;
import { AngularFireStorage, AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFireModule } from '@angular/fire/compat';

import { FirebaseApp, FirebaseAppModule, getApp, initializeApp, provideFirebaseApp } from '@angular/fire/app';
import * as firebase from 'firebase/compat';
import { Auth } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreCollectionGroup, AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { of } from 'rxjs';

describe('Service: Faq', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        FaqService,
        { provide: Firestore, useValue: {} },    
        { provide: AngularFirestore, useValue: {} },        
        // AngularFirestoreCollection,      
          // { 
          // provide: Firestore,
          // useValue: {
            // collection: jasmine.createSpy('collection').and.returnValue({
            //   valueChanges: jasmine.createSpy('valueChanges').and.returnValue(of([]))
            // }),
            // doc: jasmine.createSpy('doc').and.returnValue({
            //   valueChanges: jasmine.createSpy('valueChanges').and.returnValue(of({}))
            // }),
            // add: jasmine.createSpy('add').and.returnValue(Promise.resolve({})),
        //   }
        // },
      ],
      imports: [
        HttpClientTestingModule,
        // AngularFireAuthModule,
        AngularFireModule.initializeApp(environment.firebase),  
        AngularFirestoreModule     
        // AngularFireModule
      ]
    }).compileComponents();
  });

  it('should ...', inject([FaqService], (service: FaqService) => {
    expect(service).toBeTruthy();
  }));
});
