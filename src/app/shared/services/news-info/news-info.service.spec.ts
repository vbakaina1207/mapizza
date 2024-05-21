/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { NewsInfoService } from './news-info.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CollectionReference, DocumentData, DocumentReference, Firestore } from '@angular/fire/firestore';
import { AngularFirestore, AngularFirestoreCollection, QueryFn } from '@angular/fire/compat/firestore';

// class FirestoreMock extends Firestore {
//   firestore: any;
//   public collection<TObject>(name: string, queryFn?: QueryFn): CollectionReference<DocumentData> {
//     const ref = this.firestore.collection('tobjects');
//     if (!queryFn) { queryFn = (ref) => ref; }
//     return new CollectionReference<DocumentData> (ref, queryFn(ref));
//   }
// }

class FirestoreMock {
  collection<T>(name: string): CollectionReference<T> {
    return {
      id: name,
      path: name,
      firestore: this,
      withConverter: () => this
    } as unknown as CollectionReference<T>;
  }

  doc<T>(path: string): DocumentReference<T> {
    return {
      id: path.split('/').pop() || '',
      path,
      firestore: this,
      withConverter: () => this
    } as unknown as DocumentReference<T>;
  }

  // Add other methods if necessary
}

describe('Service: NewsInfo', () => {
  let firestoreMock: FirestoreMock;

  beforeEach(async () => {
    firestoreMock = new FirestoreMock();

    await TestBed.configureTestingModule({
      providers: [
        NewsInfoService,
        { provide: Firestore, useValue: { } },
      ],
      imports: [HttpClientTestingModule]
    }).compileComponents();
  });

  it('should be created', inject([NewsInfoService], (service: NewsInfoService) => {
    expect(service).toBeTruthy();
  }));

  
});
// describe('Service: NewsInfo', () => {
//   beforeEach(async() => {
//     await TestBed.configureTestingModule({
//       providers: [
//         NewsInfoService,
//         { provide: Firestore, useValue: {} },
//       ],
//       imports: [
//         HttpClientTestingModule
//       ]
//     }).compileComponents();
//   });

//   it('should ...', inject([NewsInfoService], (service: NewsInfoService) => {
//     expect(service).toBeTruthy();
//   }));
// });

/* tslint:disable:no-unused-variable */

// import { TestBed, inject } from '@angular/core/testing';
// import { NewsInfoService } from './news-info.service';
// import { HttpClientTestingModule } from '@angular/common/http/testing';
// import {
//   Firestore,
//   CollectionReference,
//   addDoc,
//   collectionData,
//   deleteDoc,
//   doc,
//   docData,
//   updateDoc,
//   collection,
//   DocumentData
// } from '@angular/fire/firestore';
// import { of } from 'rxjs';
// import { INewsAddRequest } from '../../interfaces/news/news-info.interface';

// class FirestoreMock {
//   private data = new Map<string, any>();

//   collection<T>(name: string): CollectionReference<DocumentData> {
//     return {
//       idField: 'id',
//       valueChanges: jasmine.createSpy('valueChanges').and.returnValue(of([])),
//       doc: jasmine.createSpy('doc').and.callFake((id: string) => ({
//         valueChanges: jasmine.createSpy('valueChanges').and.returnValue(of(this.data.get(id) || {})),
//         set: jasmine.createSpy('set').and.callFake((data: T) => {
//           this.data.set(id, data);
//           return Promise.resolve();
//         }),
//         update: jasmine.createSpy('update').and.callFake((data: T) => {
//           this.data.set(id, { ...this.data.get(id), ...data });
//           return Promise.resolve();
//         }),
//         delete: jasmine.createSpy('delete').and.callFake(() => {
//           this.data.delete(id);
//           return Promise.resolve();
//         }),
//       }))
//     } as unknown as CollectionReference<DocumentData>;
//   }

//   doc<T>(path: string) {
//     return {
//       valueChanges: jasmine.createSpy('valueChanges').and.returnValue(of({})),
//       set: jasmine.createSpy('set').and.returnValue(Promise.resolve()),
//       update: jasmine.createSpy('update').and.returnValue(Promise.resolve()),
//       delete: jasmine.createSpy('delete').and.returnValue(Promise.resolve()),
//     };
//   }

//   addDoc(collectionRef: CollectionReference<DocumentData>, data: DocumentData) {
//     const id = Math.random().toString(36).substring(2);
//     this.data.set(id, data);
//     return Promise.resolve({ id });
//   }
// }

// describe('Service: NewsInfo', () => {
//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       providers: [
//         NewsInfoService,
//         { provide: Firestore, useClass: FirestoreMock },
//       ],
//       imports: [
//         HttpClientTestingModule
//       ]
//     }).compileComponents();
//   });

//   it('should be created', inject([NewsInfoService], (service: NewsInfoService) => {
//     expect(service).toBeTruthy();
//   }));

//   it('should get all news', inject([NewsInfoService], (service: NewsInfoService) => {
//     service.getAllFirebase().subscribe(data => {
//       expect(data).toEqual([]);
//     });
//   }));

//   it('should get one news by id', inject([NewsInfoService], (service: NewsInfoService) => {
//     const id = 'test-id';
//     service.getOneFirebase(id).subscribe(data => {
//       expect(data).toEqual({});
//     });
//   }));

//   it('should create news', inject([NewsInfoService], async (service: NewsInfoService) => {
//     const news = { title: 'Test News' } as INewsAddRequest;
//     const docRef = await service.createFirebase(news);
//     expect(docRef.id).toBeTruthy();
//   }));

//   it('should update news', inject([NewsInfoService], async (service: NewsInfoService) => {
//     const news = { title: 'Updated News' } as INewsAddRequest;
//     const id = 'test-id';
//     await service.updateFirebase(news, id);
//     service.getOneFirebase(id).subscribe(data => {
//       expect(data).toEqual(news);
//     });
//   }));

//   it('should delete news', inject([NewsInfoService], async (service: NewsInfoService) => {
//     const id = 'test-id';
//     await service.deleteFirebase(id);
//     service.getOneFirebase(id).subscribe(data => {
//       expect(data).toEqual({});
//     });
//   }));
// });
// import { TestBed } from '@angular/core/testing';
// import { NewsInfoService } from './news-info.service';
// import { HttpClientTestingModule } from '@angular/common/http/testing';
// import {
//   Firestore,
//   doc,
//   collection,
//   CollectionReference,
//   DocumentData,
//   DocumentReference,
//   addDoc,
//   getDoc,
//   getDocs,
//   updateDoc,
//   deleteDoc,
// } from '@angular/fire/firestore';
// import { of } from 'rxjs';
// import { INewsAddRequest, INewsAddResponse } from '../../interfaces/news/news-info.interface';

// class FirestoreMock {
//   data = new Map<string, any>();

//   collection<T = DocumentData>(name: string): CollectionReference<T> {
//     const collectionRef = {
//       id: name,
//       path: name,
//       firestore: this,
//       parent: null,
//       withConverter: () => this,
//     } as unknown as CollectionReference<T>;
//     return collectionRef;
//   }

//   doc<T = DocumentData>(path: string): DocumentReference<T> {
//     const docRef = {
//       id: path.split('/').pop() || '',
//       path,
//       firestore: this,
//       parent: null,
//       withConverter: () => this,
//     } as unknown as DocumentReference<T>;
//     return docRef;
//   }

//   async addDoc<T = DocumentData>(ref: CollectionReference<T>, data: T): Promise<void> {
//     this.data.set(`${ref.path}/${(data as any).id}`, data);
//   }

//   async setDoc<T = DocumentData>(ref: DocumentReference<T>, data: T): Promise<void> {
//     this.data.set(ref.path, data);
//   }

//   async updateDoc<T = DocumentData>(ref: DocumentReference<T>, data: Partial<T>): Promise<void> {
//     const existingData = this.data.get(ref.path) || {};
//     this.data.set(ref.path, { ...existingData, ...data });
//   }

//   async deleteDoc<T = DocumentData>(ref: DocumentReference<T>): Promise<void> {
//     this.data.delete(ref.path);
//   }

//   getDoc<T = DocumentData>(ref: DocumentReference<T>): Promise<DocumentData | undefined> {
//     return Promise.resolve(this.data.get(ref.path));
//   }

//   getDocs<T = DocumentData>(ref: CollectionReference<T>): Promise<DocumentData[]> {
//     const docs: DocumentData[] = [];
//     this.data.forEach((value, key) => {
//       if (key.startsWith(ref.path)) {
//         docs.push(value);
//       }
//     });
//     return Promise.resolve(docs);
//   }
// }

// describe('Service: NewsInfo', () => {
//   let service: NewsInfoService;
//   let firestoreMock: FirestoreMock;

//   beforeEach(async () => {
//     firestoreMock = new FirestoreMock();

//     await TestBed.configureTestingModule({
//       providers: [
//         NewsInfoService,
//         { provide: Firestore, useValue: firestoreMock },
//       ],
//       imports: [HttpClientTestingModule],
//     }).compileComponents();

//     service = TestBed.inject(NewsInfoService);
//   });

//   it('should be created', () => {
//     expect(service).toBeTruthy();
//   });

//   it('should get all news', async () => {
//     const mockData: INewsAddResponse[] = [
//       { id: '1', title: 'Test News 1', description: 'Desc 1', imagePath: 'path1.jpg', detail: [] },
//       { id: '2', title: 'Test News 2', description: 'Desc 2', imagePath: 'path2.jpg', detail: [] }
//     ];
//     firestoreMock.data.set('newsInfo/1', mockData[0]);
//     firestoreMock.data.set('newsInfo/2', mockData[1]);

//     service.getAllFirebase().subscribe((data) => {
//       expect(data).toEqual(mockData);
//     });
//   });

//   it('should get one news by id', async () => {
//     const id = '1';
//     const mockData: INewsAddResponse = { id, title: 'Test News', description: 'Desc', imagePath: 'path.jpg', detail: [] };
//     firestoreMock.data.set(`newsInfo/${id}`, mockData);

//     service.getOneFirebase(id).subscribe((data) => {
//       expect(data).toEqual(mockData);
//     });
//   });

//   it('should create news', async () => {
//     const news: INewsAddRequest = { title: 'Test News', description: 'Desc', imagePath: 'path.jpg', detail: [] };
//     await service.createFirebase(news);
//     expect(firestoreMock.data.size).toBe(1);
//   });

//   it('should update news', async () => {
//     const id = '1';
//     const initialData: INewsAddResponse = { id, title: 'Initial News', description: 'Initial Desc', imagePath: 'initial.jpg', detail: [] };
//     firestoreMock.data.set(`newsInfo/${id}`, initialData);

//     const updatedData: INewsAddRequest = { title: 'Updated News', description: 'Updated Desc', imagePath: 'updated.jpg', detail: [] };
//     await service.updateFirebase(updatedData, id);

//     const finalData = firestoreMock.data.get(`newsInfo/${id}`);
//     expect(finalData.title).toBe(updatedData.title);
//   });

//   it('should delete news', async () => {
//     const id = '1';
//     const mockData: INewsAddResponse = { id, title: 'Test News', description: 'Desc', imagePath: 'path.jpg', detail: [] };
//     firestoreMock.data.set(`newsInfo/${id}`, mockData);

//     await service.deleteFirebase(id);

//     const finalData = firestoreMock.data.get(`newsInfo/${id}`);
//     expect(finalData).toBeUndefined();
//   });
// });
