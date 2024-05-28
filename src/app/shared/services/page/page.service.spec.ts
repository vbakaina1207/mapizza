/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { PageService } from './page.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { CollectionReference, DocumentData, Firestore, deleteDoc, docData, updateDoc } from '@angular/fire/firestore';


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
        PageService,
        { provide: Firestore, useValue: firestoreMock }
      ],
      imports: [
        HttpClientTestingModule
      ]
    }).compileComponents();
  });

  it('should be created', inject([PageService], (service: PageService) => {
    expect(service).toBeTruthy();
  }));

  // it('should ...', inject([PageService], (service: PageService) => {
  //   expect(service).toBeTruthy();
  // }));
});
