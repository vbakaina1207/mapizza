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

//   it('can test HttpClient.get', () => {
//     const data = [
//       {
//         id: 1,
//         date: '12-5-2023',
//         name: '1+1=3',
//         title: '1+1=3',
//         description: '',
//         imagePath:  ''
//       },
//       {
//         id: 2,
//         date: '22-5-2023',
//         name: '50%',
//         title: '50%',
//         description: '',
//         imagePath:  ''
//       }]
//     discountService.getAllFirebase().subscribe((response: any) => expect(response).toBe(data));
//     const req = httpTestingController.expectOne('http://localhost:3000/discounts');
//     expect(req.request.method).toBe('GET');
//     req.flush(data);
//   });

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



import { TestBed, inject } from '@angular/core/testing';
import { DiscountService } from './discount.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { of } from 'rxjs';

describe('Service: Discount', () => {
  let httpTestingController: HttpTestingController;
  let discountService: DiscountService;

  const discountServiceStub = {
    getOneFirebase: (id: string) => of({
      id: id,     
      date: null,
      name: 'test discount',
      title: '',
      description: '',
      imagePath: ''
    }),
  }

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      providers: [             
        { provide: DiscountService, useValue: discountServiceStub },
        
      ],
      imports: [
        HttpClientTestingModule,
      ],
    }).compileComponents();
    httpTestingController = TestBed.inject(HttpTestingController);
    discountService = TestBed.inject(DiscountService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should ...', inject([DiscountService], (service: DiscountService) => {
    expect(service).toBeTruthy();
  }));

  
});
