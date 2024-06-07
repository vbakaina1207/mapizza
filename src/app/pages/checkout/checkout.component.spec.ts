/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CheckoutComponent } from './checkout.component';
import { OrderService } from 'src/app/shared/services/order/order.service';
import { Firestore } from '@angular/fire/firestore';
import { IProductResponse } from 'src/app/shared/interfaces/product/product.interface';
import { ITypeAdditionResponse } from 'src/app/shared/interfaces/type-addition/type-addition.interfaces';
import { ToastrService } from 'ngx-toastr';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AccountService } from 'src/app/shared/services/account/account.service';
import { IOrderRequest } from 'src/app/shared/interfaces/order/order.interface';
import { Subject, of } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireModule } from '@angular/fire/compat';

fdescribe('CheckoutComponent', () => {
  let component: CheckoutComponent;
  let fixture: ComponentFixture<CheckoutComponent>;

  const productServiceStub = {
    getOneFirebase: (id: string) => of({
      id: id,
      category: { id: 1, name: '', path: '', imagePath: '' },
      type_product: { id: 1, name: '', path: '', imgPath: '' },
      type_addition: [{ id: 1, name: '', path: '', description: '', weight: '25', price: 25, imagePath: '', isSauce: false }],
      selected_addition: [{}],
      name: '', path: '', ingredients: ' ', weight: '', price: 12, addition_price: 0, bonus: 0, imagePath: '', count: 1
    }),
    getAllByCategoryFirebase: () => of([{
      id: '1',
      category: { id: 1, name: '', path: '', imagePath: '' },
      type_product: { id: 1, name: '', path: '', imgPath: '' },
      type_addition: [{ id: 1, name: 'type', path: '', description: '', weight: '25', price: 25, imagePath: '', isSauce: false }] as ITypeAdditionResponse[],
      selected_addition: [{ id: 1, name: 'type', path: '', description: '', weight: '25', price: 25, imagePath: '', isSauce: false }] as ITypeAdditionResponse[],
      name: 'Product Name', path: '', ingredients: 'products', weight: '', price: 12, addition_price: 0, bonus: 0, imagePath: '', count: 1
    }]),
    getAllFirebase: () => of([
      {
        id: '1',
        category: { id: 1, name: '', path: '', imagePath: '' },
        type_product: { id: 1, name: '', path: '', imgPath: '' },
        type_addition: [{ id: 1, name: 'type', path: '', description: '', weight: '25', price: 25, imagePath: '', isSauce: false }] as ITypeAdditionResponse[],
        selected_addition: [{ id: 1, name: 'type', path: '', description: '', weight: '25', price: 25, imagePath: '', isSauce: false }] as ITypeAdditionResponse[],
        name: 'Product Name', path: '', ingredients: 'products', weight: '', price: 12, addition_price: 0, bonus: 0, imagePath: '', count: 1
      }
    ]),
    updateFirebase: (product: Partial<IProductResponse>, id: string) => of({
      id: id,
      ...product
    })
  };
  

  const orderServiceStub = {
    getAllFirebase: () => of([
      {
        id: 1,
        order_number: 1,
        uid: 'fhshgkszhbgkbjrhhr',
        date_order: '12/12/2024',
        total: 589,
        status: false,
        product: [{
          id: 1,
          category: { id: 1, name: 'test category', path: '', imagePath: '' },
          type_product: { id: 1, name: '', path: '', imgPath: '' },
          type_addition: [{ id: 1, name: '', path: '', description: '', weight: '25', price: 25, imagePath: '', isSauce: false }],
          selected_addition: [{}],
          name: '', path: '', ingredients: ' ', weight: '', price: 12, addition_price: 0, bonus: 0, imagePath: '', count: 1
        }],
        name: "Ivan",
        phone: '+380667894561',
        email: 'ivan@gmail.com',
        delivery_method: '',
        payment_method: '',
        cash: 0,
        isWithoutRest: false,
        at_time: false,
        delivery_date: '',
        delivery_time: '',
        self_delivery_address: '',
        city: 'Lviv',
        street: 'school',
        house: '25',
        entrance: '',
        flor: 4,
        flat: '5',
        use_bonus: false,
        summa_bonus: 0,
        promocode: '',
        action: '',
        isCall: false,
        isComment: false,
        comment: '',
        summa: 1155,
        address: []
      }]),
    createFirebase: (order: IOrderRequest) => of([
      {
        id: 1, ...order        
      }]),
     
    changeBasket: /* new Subject<boolean>() */jasmine.createSpy('changeBasket').and.returnValue(of([]))
  };

  const toastrServiceStub = {
    success: jasmine.createSpy(),
    error: jasmine.createSpy()
  };
  
  /* const mockFirestore = {
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
  }; */

  // const getSpy = jasmine.createSpy('get').and.returnValue(of([]));
  // const collectionSpy = jasmine.createSpyObj('CollectionReference', ['get']);
  // collectionSpy.get.and.returnValue(getSpy);

  // const mockFirestore = {
  //   collection: jasmine.createSpy('collection').and.returnValue(collectionSpy),
  //   // ... other Firestore methods you might need
  // };

 

  // const firestoreStub = {
  //   collection: jasmine.createSpy('collection').and.returnValue({
  //     doc: jasmine.createSpy('doc').and.returnValue({
  //       get: jasmine.createSpy('get').and.returnValue(of({
  //         id: '1', 
  //         data: () => ({            
  //           order_number: 1,
  //           uid: 'fhshgkszhbgkbjrhhr',
  //           date_order: '12/12/2024',
  //           total: 589,
  //           status: false,
  //           product: [{
  //             id: 1,
  //             category: { id: 1, name: 'test category', path: '', imagePath: '' },
  //             type_product: { id: 1, name: '', path: '', imgPath: '' },
  //             type_addition: [{ id: 1, name: '', path: '', description: '', weight: '25', price: 25, imagePath: '', isSauce: false }],
  //             selected_addition: [{}],
  //             name: '', path: '', ingredients: ' ', weight: '', price: 12, addition_price: 0, bonus: 0, imagePath: '', count: 1
  //           }],
  //           name: "Ivan",
  //           phone: '+380667894561',
  //           email: 'ivan@gmail.com',
  //           delivery_method: '',
  //           payment_method: '',
  //           cash: 0,
  //           isWithoutRest: false,
  //           at_time: false,
  //           delivery_date: '',
  //           delivery_time: '',
  //           self_delivery_address: '',
  //           city: 'Lviv',
  //           street: 'school',
  //           house: '25',
  //           entrance: '',
  //           flor: 4,
  //           flat: '5',
  //           use_bonus: false,
  //           summa_bonus: 0,
  //           promocode: '',
  //           action: '',
  //           isCall: false,
  //           isComment: false,
  //           comment: '',
  //           summa: 1155,
  //           address: []
  //         })
  //       }))
  //     })
  //   })
  // };
  
  
 
  // const accountServiceStub = {   
  //   // updateAddress: (address: string) => { },
  //   // zoneStatus$:(isGreenZone: boolean, isYellowZone: boolean) => {},
  //   updateAddress: jasmine.createSpy('updateAddress'),
  //   zoneStatus$: jasmine.createSpy('zoneStatus$')
  // };

  const accountServiceStub = {
    isUserLogin$: new Subject<boolean>(),
    changeAddress: new Subject<boolean>(),
    changeCurrentUser: new Subject<boolean>(),
    changeFavorite: new Subject<boolean>(),
    searchAddress: new Subject<string>(),
    address$: new Subject<string>().asObservable(),
    // zoneStatus$: new Subject<{ isGreenZone: boolean; isYellowZone: boolean }>().asObservable(),
    updateAddress: jasmine.createSpy('updateAddress').and.callFake((address: string) => {
      accountServiceStub.searchAddress.next(address); // Emit a value directly on the Subject instance
    }),
    // setZoneStatus: jasmine.createSpy('setZoneStatus').and.callFake((isGreenZone: boolean, isYellowZone: boolean) => {
    //   // accountServiceStub.zoneStatus$.next({ isGreenZone, isYellowZone }); // Emit a value directly on the Subject instance
    // })
    zoneStatus$: new Subject<{ isGreenZone: boolean; isYellowZone: boolean }>(), 
  setZoneStatus: jasmine.createSpy('setZoneStatus').and.callFake((isGreenZone: boolean, isYellowZone: boolean) => {
    accountServiceStub.zoneStatus$.next({ isGreenZone, isYellowZone });
  })
  };
  
  const firestoreStub = jasmine.createSpyObj('Firestore', ['collection']);
  
  beforeEach(async() => {
    await TestBed.configureTestingModule({
      declarations: [ CheckoutComponent ],
      imports: [
        HttpClientTestingModule,       
        MatDialogModule,
        AngularFireModule,
        AngularFirestoreModule
      ],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: OrderService, useValue: orderServiceStub },
        // { provide: ProductService, useValue: productServiceStub },
        { provide: Firestore, useValue: {} },
        { provide: ToastrService, useValue: toastrServiceStub },
        { provide: AccountService, useValue: accountServiceStub },     
        AngularFirestore   
      ],  
      schemas: [
        NO_ERRORS_SCHEMA,
        CUSTOM_ELEMENTS_SCHEMA
      ]    
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should initialize the form with user data', () => {
  //   expect(component.orderForm).toBeDefined();
  //   expect(component.orderForm.value.name).toBe('John');
  //   expect(component.orderForm.value.phone).toBe('123-456-7890');
  //   expect(component.orderForm.value.email).toBe('john.doe@example.com');
  // });

  // it('should call createOrder on form submit', () => {
  //   component.orderForm.setValue({
  //     order_number: 1,
  //     uid: '12345',
  //     date_order: new Date(),
  //     status: false,
  //     total: 100,
  //     product: [],
  //     name: 'John',
  //     phone: '123-456-7890',
  //     email: 'john.doe@example.com',
  //     delivery_method: 'courier',
  //     payment_method: 'cod',
  //     cash: null,
  //     isWithoutRest: true,
  //     at_time: false,
  //     delivery_date: new Date().toISOString().split('T')[0],
  //     delivery_time: null,
  //     self_delivery_address: null,
  //     city: null,
  //     street: null,
  //     house: null,
  //     entrance: null,
  //     floor: null,
  //     flat: null,
  //     use_bonus: false,
  //     summa_bonus: null,
  //     promocode: null,      
  //     action: null,
  //     isCall: false,
  //     isComment: false,
  //     comment: null,
  //     summa: 100,
  //     discount: 'null',
  //     addres: null
  //   });
  //   component.addOrder();
  //   expect(orderServiceStub.createFirebase).toHaveBeenCalled();
  // });

});
