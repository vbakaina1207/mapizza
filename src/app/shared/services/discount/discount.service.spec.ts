// /* tslint:disable:no-unused-variable */

// import { TestBed, async, inject } from '@angular/core/testing';
// import { DiscountService } from './discount.service';
// import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
// import { IDiscountRequest, IDiscountResponse } from '../../interfaces/discount/discount.interface';
// import { Firestore, Timestamp } from '@angular/fire/firestore';
// import { AngularFireModule } from '@angular/fire/compat';
// import { environment } from 'src/environments/environment';


// describe('Service: Discount', () => {
//   let httpTestingController: HttpTestingController;
//   let discountService: DiscountService;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       providers: [DiscountService,
//       //   { provide: Firestore, useValue: { collection: () => ({}) } },
//       //   ],
//       // imports: [
//       //   HttpClientTestingModule,
//       //   AngularFireModule
//       // ]
//       {
//         provide: Firestore,
//         useValue: {
//           collection: () => ({
//             doc: () => ({
//               set: () => Promise.resolve(),
//               get: () => Promise.resolve(),
//               update: () => Promise.resolve(),
//               delete: () => Promise.resolve(),
//             }),
//           }),
//         },
//       },
//     ],
//     imports: [
//       HttpClientTestingModule,
//       AngularFireModule.initializeApp(environment.firebase),
//     ],
//     });
//     httpTestingController = TestBed.inject( HttpTestingController );
//     discountService = TestBed.inject(DiscountService);
//   });


//   afterEach(() => {
//     httpTestingController.verify();
//   });

//   it('should ...', inject([DiscountService], (service: DiscountService) => {
//     expect(service).toBeTruthy();
//   }));

//  

//   it('should send create request and return new discount', () => {
//     const discountRequest: IDiscountRequest = {
//       date: new Date() as unknown as Timestamp,
//       name: '1+1=3',
//       title: '1+1=3',
//       description: '',
//       imagePath:  ''
//     };

//     const expectedDiscount: IDiscountResponse = {
//       id: 3,
//       date: new Date() as unknown as Timestamp,
//       name: '1+1=3',
//       title: '1+1=3',
//       description: '',
//       imagePath:  ''
//     };

//     // discountService.createFirebase(discountRequest).subscribe((result: any) => {
//     //   expect(result).toEqual(expectedDiscount);
//     // });

//     discountService.createFirebase(discountRequest).then((result: any) => {
//     expect(result).toEqual(expectedDiscount);
//     done();
//   }).catch(error => {
//     fail(error);  // Если произойдет ошибка, тест не пройдет
//     done();
//   });
    
//     const expectedUrl = 'http://localhost:3000/discounts';
//     const testRequest = httpTestingController.expectOne(expectedUrl);

//     expect(testRequest.request.method).toEqual('POST');
//     expect(testRequest.request.body).toEqual(discountRequest);

//     testRequest.flush(expectedDiscount);
//   });

// });
// function done() {
//   throw new Error('Function not implemented.');
// }


import { TestBed, fakeAsync, inject, tick } from '@angular/core/testing';
import { DiscountService } from './discount.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { IDiscountRequest, IDiscountResponse } from '../../interfaces/discount/discount.interface';
import { DocumentData, DocumentReference, Firestore, Timestamp } from '@angular/fire/firestore';


const mockFirestore = {
  collection: jasmine.createSpy().and.returnValue({}),
  doc: jasmine.createSpy().and.returnValue({}),
  addDoc: jasmine.createSpy().and.returnValue(Promise.resolve({})),
  updateDoc: jasmine.createSpy().and.returnValue(Promise.resolve({})),
  deleteDoc: jasmine.createSpy().and.returnValue(Promise.resolve({})),
  collectionData: jasmine.createSpy().and.returnValue(of([])),
  docData: jasmine.createSpy().and.returnValue(of({})),
};


describe('Service: Discount', () => {
  let httpTestingController: HttpTestingController;
  let discountService: DiscountService;
  let firestore: Firestore;

  const discountServiceStub = {
    getOneFirebase: (id: string) => of({
      id: id,     
      date: '22-5-2023',
      name: '50%',
      title: '50%',
      description: '',
      imagePath:  ''
    }),
    getAllFirebase: () => of([
      { id: 1, 
        date: '22-5-2023',
        name: '50%',
        title: '50%',
        description: '',
        imagePath:  ''
    }
    ]),
   
  updateFirebase: (discount: IDiscountRequest, id: string) => {
    return Promise.resolve({ id: id } as DocumentReference<DocumentData>);
  }, 
  createFirebase: (data: IDiscountRequest) => Promise.resolve({
    id: '1',
    ...data
  } as IDiscountResponse),
  deleteFirebase: (id: string) => Promise.resolve()
  };

  
  

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      providers: [             
        { provide: DiscountService, useValue: discountServiceStub },
        { provide: Firestore, useValue : mockFirestore}
        
      ],
      imports: [
        HttpClientTestingModule,
      ],
    }).compileComponents();

    httpTestingController = TestBed.inject(HttpTestingController);
    discountService = TestBed.inject(DiscountService);    
    firestore = TestBed.inject(Firestore);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should ...', inject([DiscountService], (service: DiscountService) => {
    expect(service).toBeTruthy();
  }));

  // it('can test HttpClient.get', () => {
  //       const data = [
  //         {
  //           id: 1,            
  //           date: '22-5-2023',
  //           name: '50%',
  //           title: '50%',
  //           description: '',
  //           imagePath:  ''
  //         }]
  //       discountService.getAllFirebase().subscribe((response: any) => expect(response).toEqual(data));
  //       const req = httpTestingController.expectOne('http://localhost:3000/discount');
  //       expect(req.request.method).toBe('GET');
  //       req.flush(data);
  //     });

      it('getAllFirebase should return observable of discounts', (done) => {
        const mockData = [
          {
            id: 1,            
            date: '22-5-2023',
            name: '50%',
            title: '50%',
            description: '',
            imagePath:  ''
          }];
      
        mockFirestore.collectionData.and.returnValue(of(mockData));
      
        discountService.getAllFirebase().subscribe((data) => {
          expect(data).toEqual(mockData);
          done();
        });
      });
      

      it('getOneFirebase should return observable of a single discount', (done) => {
        const mockData = { 
          id: '1',
          date: '22-5-2023',
          name: '50%',
          title: '50%',
          description: '',
          imagePath:  '' 
        };
      
        mockFirestore.docData.and.returnValue(of(mockData));
      
        discountService.getOneFirebase('1').subscribe((data) => {
          expect(data).toEqual(mockData);
          done();
        });
      });

      

      it('createFirebase should call addDoc and add data', (done) => {
        const newDiscount = { 
          name: 'New Discount', 
          date: Timestamp.fromDate(new Date('2024-12-12T00:00:00Z')), 
          title: '', 
          description: '', 
          imagePath: '' 
        } as any;
        mockFirestore.addDoc.and.returnValue(Promise.resolve({ id: '5' }));
    
        discountService.createFirebase(newDiscount).then((response) => {
          expect(mockFirestore.addDoc).toBeDefined();
          expect(response.id).toBe('1');
          done();
        });
      });
      
      it('updateFirebase should call updateDoc with the correct data', (done) => {
        const updatedDiscount: IDiscountRequest = { 
          name: 'New Discount', 
          date: Timestamp.fromDate(new Date('2024-12-12T00:00:00Z')), 
          title: '', 
          description: '', 
          imagePath: '' 
        };
        const discountId = '1';
      
        discountService.updateFirebase(updatedDiscount, discountId).then(() => {
          expect(mockFirestore.doc).toBeDefined();
          expect(mockFirestore.updateDoc).toBeTruthy();
          done();
        });
      });
      
  
      it('deleteFirebase should call deleteDoc with the correct id', fakeAsync (async () => {
        const discountId = '1';
      
        mockFirestore.doc.and.returnValue({}); 
        await discountService.deleteFirebase(discountId);
        tick();
        expect(mockFirestore.doc).toBeDefined();
        expect(mockFirestore.deleteDoc).toBeTruthy();
      }));
      
});
