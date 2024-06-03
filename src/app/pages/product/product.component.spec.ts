
//   it('should load products on init', () => {
//     component.ngOnInit();
//     expect(component.userProducts.length).toBeGreaterThan(0);
//   });

//   it('should get product by id', () => {
//     component.getProductById('1');
//     expect(component.userProducts[0].id).toBe('1');
//   });

//   it('should update product', () => {
//     const product = { id: '1', name: 'Updated Product' };
//     component.updateProduct(product);
//     expect(component.userProducts[0].name).toBe('Updated Product');
//   });


import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductService } from './../../shared/services/product/product.service';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ProductComponent } from './product.component';
import { TypeProductService } from './../../shared/services/type-product/type-product.service';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { ITypeAdditionResponse } from 'src/app/shared/interfaces/type-addition/type-addition.interfaces';
import { IProductResponse } from 'src/app/shared/interfaces/product/product.interface';
import { environment } from 'src/environments/environment';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { OrderService } from 'src/app/shared/services/order/order.service';
import { ToastrService } from 'ngx-toastr';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import { Firestore } from '@angular/fire/firestore';


describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;
  let productService: ProductService;
  toastr: ToastService;

  const serviceStub = {
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
    updateFirebase: ( product: Partial<IProductResponse>, id: string) => of({
      id: id,
      ...product
    })
  };

  const serviceTypeProductStub = {
    getOneFirebase: (id: string) => of({      
      id: 1, name: 'test type', path: '', imgPath: '' 
    }),
    getAllFirebase: () => of([
      { id: 1, name: 'test type', path: '', imgPath: '' }
    ])
  };


  const orderServiceStub = {
    getAllFirebase: () => of({
      order_number: 1,
      uid: 'fhshgkszhbgkbjrhhr',
      date_order: '12/12/2024',
      total: 589,
      status: false,
      product: {
        id: 1,
        category: { id: 1, name: 'test category', path: '', imagePath: '' },
        type_product: { id: 1, name: '', path: '', imgPath: '' },
        type_addition: [{ id: 1, name: '', path: '', description: '', weight: '25', price: 25, imagePath: '', isSauce: false }],
        selected_addition: [{}],
        name: '', path: '', ingredients: ' ', weight: '', price: 12, addition_price: 0, bonus: 0, imagePath: '', count: 1
      },
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
      })
  };

  // const mockFirestore = {
  //   collection: (path: string) => ({
  //     doc: (id: string) => ({
  //       get: () => of({
  //         id: id,
  //         category: { id: 1, name: '', path: '', imagePath: '' },
  //         type_product: { id: 1, name: '', path: '', imgPath: '' },
  //         type_addition: [{ id: 1, name: '', path: '', description: '', weight: '25', price: 25, imagePath: '', isSauce: false }],
  //         selected_addition: [{ id: 1, name: 'type', path: '', description: '', weight: '25', price: 25, imagePath: '', isSauce: false }],
  //         name: '', path: '', ingredients: ' ', weight: '', price: 12, addition_price: 0, bonus: 0, imagePath: '', count: 1
  //       }),
  //       update: (data: any) => of({ id: '1', ...data }),
  //       add: (data: any) => of({ id: '1', ...data })
  //     })
  //   })
  // };

//   const mockFirestore = {
//   collection: jasmine.createSpy('collection').and.returnValue({
//     doc: jasmine.createSpy('doc').and.returnValue({
//       get: jasmine.createSpy('get').and.returnValue(of({
//         id: '1',
//         data: () => ({
//           id: '1',
//           category: { id: 1, name: '', path: '', imagePath: '' },
//           type_product: { id: 1, name: '', path: '', imgPath: '' },
//           type_addition: [{ id: 1, name: '', path: '', description: '', weight: '25', price: 25, imagePath: '', isSauce: false }],
//           selected_addition: [{ id: 1, name: 'type', path: '', description: '', weight: '25', price: 25, imagePath: '', isSauce: false }],
//           name: '', path: '', ingredients: ' ', weight: '', price: 12, addition_price: 0, bonus: 0, imagePath: '', count: 1
//         })
//       }))
//     })
//   })
// };

const mockFirestore = jasmine.createSpyObj('AngularFirestore', ['collection']);
const collectionStub = jasmine.createSpyObj('collection', ['doc']);
const docStub = jasmine.createSpyObj('doc', ['get']);

mockFirestore.collection.and.returnValue(collectionStub);
collectionStub.doc.and.returnValue(docStub);
docStub.get.and.returnValue(of({
  id: '1',
  data: () => ({
    id: '1',
    category: { id: 1, name: '', path: '', imagePath: '' },
    type_product: { id: 1, name: '', path: '', imgPath: '' },
    type_addition: [{ id: 1, name: '', path: '', description: '', weight: '25', price: 25, imagePath: '', isSauce: false }],
    selected_addition: [{ id: 1, name: 'type', path: '', description: '', weight: '25', price: 25, imagePath: '', isSauce: false }],
    name: '', path: '', ingredients: ' ', weight: '', price: 12, addition_price: 0, bonus: 0, imagePath: '', count: 1
  })
}));



  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductComponent],
      imports: [
        HttpClientTestingModule,
        AngularFireStorageModule,
        AngularFireModule.initializeApp(environment.firebase),
        RouterTestingModule,
        
      ],
      providers: [
        { provide: ProductService, useValue: serviceStub },
        { provide: TypeProductService,useValue: serviceTypeProductStub  },
        // { provide: AngularFirestore, useValue:  mockFirestore  },
        { provide: OrderService, useValue: orderServiceStub },
        { provide: ToastrService, useValue: {} },
      ],
    })
      .compileComponents();
  
    productService = TestBed.inject(ProductService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
    
    component.userProducts = [{
      id: 1,
      category: { id: 1, name: '', path: '', imagePath: '' },
      type_product: { id: 1, name: '', path: '', imgPath: '' },
      type_addition: [{ id: 1, name: '', path: '', description: '', weight: '25', price: 25, imagePath: '', isSauce: false }],
      selected_addition: [{id: 1, name: '', path: '', description: '', weight: '25', price: 25, imagePath: '', isSauce: false}],
      name: '', path: '', ingredients: ' ', weight: '', price: 12, addition_price: 0, bonus: 0, imagePath: '', count: 1
    }]
    fixture.detectChanges();
  });

  it('should load products on init', async () => {
    const productData: IProductResponse[] = [
      { id: '1', category: {id: 1, name: '', path: '', imagePath: ''},
      type_product: {id: 1, name: '', path: '', imgPath: ''},
      type_addition: [{id: 1, name: 'type', path: '', description: '', weight: '25', price: 25, imagePath: '', isSauce: false} ] as ITypeAdditionResponse[],     
      selected_addition: [{id: 1, name: 'type', path: '', description: '', weight: '25', price: 25, imagePath: '', isSauce: false}] as ITypeAdditionResponse[],
      name: 'Product Name', path: '', ingredients: 'products', weight: '', price: 12, addition_price: 0, bonus: 0, imagePath: '', count: 1
    }
    ];

    spyOn(productService, 'getAllByCategoryFirebase').and.returnValue(of(productData));

    // spyOn(mockFirestore.collection('products'),'doc').and.returnValue(of(productData as any as { [x: string]: string; }[]));

    await fixture.whenStable(); // Wait for asynchronous operations
    expect(component.userProducts.length).toBeGreaterThan(0);
    // expect(component.userProducts.length).toBe(1);

    
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should add items to "data"', () => {
  //    expect(component.userProducts.length).toBe(1); // since you have initialized the variable
  //     const product = {
  //     id: 2,
  //     category: { id: 1, name: '', path: '', imagePath: '' },
  //     type_product: { id: 1, name: '', path: '', imgPath: '' },
  //     type_addition: [{ id: 1, name: '', path: '', description: '', weight: '25', price: 25, imagePath: '', isSauce: false }],
  //     selected_addition: [{id: 1, name: '', path: '', description: '', weight: '25', price: 25, imagePath: '', isSauce: false}],
  //     name: 'test product', path: '', ingredients: ' ', weight: '', price: 12, addition_price: 0, bonus: 0, imagePath: '', count: 1
  //   }
  //    component.addToBasket(product, '');  // this will trigger the method
  //    expect(component.userProducts.length).toBe(2); // this will show that the entry was added in "this.data"
  // });  

  // it('should load products on init', () => {
  //   const productData: IProductResponse[] = [
  //     { id: '1', 
  //     category: {id: 1, name: 'test category', path: '', imagePath: ''},
  //     type_product: {id: 1, name: '', path: '', imgPath: ''},
  //     type_addition: [{id: 1, name: 'type', path: '', description: '', weight: '25', price: 25, imagePath: '', isSauce: false} ] as ITypeAdditionResponse[],     
  //     selected_addition: [{id: 1, name: 'type', path: '', description: '', weight: '25', price: 25, imagePath: '', isSauce: false}] as ITypeAdditionResponse[],
  //     name: 'Product Name', path: '', ingredients: 'products', weight: '', price: 12, addition_price: 0, bonus: 0, imagePath: '', count: 1
  //   }
  //   ];

  //   // Mock ProductService behavior
  //   spyOn(productService, 'getAllByCategoryFirebase').and.returnValue(of(productData));

  //   component.ngOnInit();
  //   expect(component.userProducts.length).toBeGreaterThan(0);
  // });

  // it('should get product by id', () => {
  //   const productId = '1';
  //   const productData: IProductResponse = { id: productId, category: {id: 1, name: '', path: '', imagePath: ''},
  //     type_product: {id: 1, name: '', path: '', imgPath: ''},
  //     type_addition: [{id: 1, name: 'type', path: '', description: '', weight: '25', price: 25, imagePath: '', isSauce: false} ] as ITypeAdditionResponse[],     
  //     selected_addition: [{id: 1, name: 'type', path: '', description: '', weight: '25', price: 25, imagePath: '', isSauce: false}] as ITypeAdditionResponse[],
  //     name: 'Product Name', path: '', ingredients: 'products', weight: '', price: 12, addition_price: 0, bonus: 0, imagePath: '', count: 1
  //   };

  //   // Mock ProductService behavior
  //   spyOn(productService, 'getOneFirebase').and.returnValue(of(productData));

  //   component.getProductById(productId);
  //   expect(component.userProducts[0].id).toBe(productId);
  // });

  // it('should update product', () => {
  //   const product: IProductResponse = { id: '1', name: 'Updated Product' };

  //   // Mock ProductService behavior (assuming updateProduct calls ProductService)
  //   spyOn(productService, 'updateFirebase').and.returnValue(of({}));

  //   component.updateProduct(product);
  //   // You might need to assert on specific behavior depending on your implementation
  // });

  // it('should add product to basket', () => {
  //   const product: IProductResponse = {
  //     id: '1',
  //     category: { id: 1, name: '', path: '', imagePath: '' },
  //     type_product: { id: 1, name: '', path: '', imgPath: '' },
  //     type_addition: [{ id: 1, name: 'type', path: '', description: '', weight: '25', price: 25, imagePath: '', isSauce: false }],
  //     selected_addition: [{ id: 1, name: 'type', path: '', description: '', weight: '25', price: 25, imagePath: '', isSauce: false }],
  //     name: 'Product Name',
  //     path: '',
  //     ingredients: 'products',
  //     weight: '',
  //     price: 12,
  //     addition_price: 0,
  //     bonus: 0,
  //     imagePath: '',
  //     count: 1,
  //   };
    
  //   component.addToBasket(product, '');
  //   expect(component.basket.length).toBeTruthy();
  // });
});
