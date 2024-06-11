/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { of, Subject } from 'rxjs';
import { BasketComponent } from './basket.component';
import { IProductResponse } from 'src/app/shared/interfaces/product/product.interface';
import { ITypeAdditionResponse } from 'src/app/shared/interfaces/type-addition/type-addition.interfaces'; 
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { OrderService } from 'src/app/shared/services/order/order.service';
import { ProductService } from 'src/app/shared/services/product/product.service';
import { Firestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { MatDialogModule } from '@angular/material/dialog';

describe('BasketComponent', () => {
  let component: BasketComponent;
  let fixture: ComponentFixture<BasketComponent>;

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
      }),
  changeBasket: new Subject<boolean>() 
  };

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

const storage: Record<string, string> = {};

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      declarations: [BasketComponent],
      imports:[
        HttpClientTestingModule,
        RouterTestingModule,
        MatDialogModule
      ],
      providers: [
        { provide: OrderService, useValue: orderServiceStub },
        { provide: ProductService, useValue: serviceStub },
        { provide: Firestore, useValue: mockFirestore },
        { provide: ToastrService, useValue: {} },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BasketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('it should change total', () => {
    const FAKE_BASKET = [
      {
        id: '1',
      category: { id: 1, name: '', path: '', imagePath: '' },
      type_product: { id: 1, name: '', path: '', imgPath: '' },
      type_addition: [{ id: 1, name: '', path: '', description: '', weight: '25', price: 25, imagePath: '', isSauce: false }],
      selected_addition: [{ id: 1, name: 'type', path: '', description: '', weight: '25', price: 25, imagePath: '', isSauce: false }],
      name: '', path: '', ingredients: ' ', weight: '', price: 12, addition_price: 0, bonus: 0, imagePath: '', count: 2
      }
    ];
    component.basket = FAKE_BASKET;
    spyOn(component, 'getTotalPrice').and.callThrough();
    component.getTotalPrice();
    expect(component.getTotalPrice).toHaveBeenCalled();
    expect(component.total).toBe(24);
    component.basket = [];
    component.getTotalPrice();
    expect(component.getTotalPrice).toHaveBeenCalled();
    expect(component.total).toBe(0);
  });

  it('add products to basket', () => {
    const product = {
      id: '1', 
        category: { id: 1, name: '', path: '', imagePath: '' },
        type_product: { id: 1, name: '', path: '', imgPath: '' },
        type_addition: [{ id: 1, name: 'type', path: '', description: '', weight: '25', price: 25, imagePath: '', isSauce: false }],
        selected_addition: [{ id: 1, name: 'type', path: '', description: '', weight: '25', price: 25, imagePath: '', isSauce: false }],
        name: 'Product Name', path: '', ingredients: 'products', weight: '', price: 12, addition_price: 0, bonus: 0, imagePath: '', count: 1
    };
  spyOn(component, 'addToBasket').and.callThrough();
  component.addToBasket(product, true);
  expect(component.addToBasket).toHaveBeenCalled();
  expect(component).toBeTruthy();
});


it('should add products to basket', () => {
  const product = {
    id: '1', 
    category: { id: 1, name: '', path: '', imagePath: '' },
    type_product: { id: 1, name: '', path: '', imgPath: '' },
    type_addition: [{ id: 1, name: 'type', path: '', description: '', weight: '25', price: 25, imagePath: '', isSauce: false }],
    selected_addition: [{ id: 1, name: 'type', path: '', description: '', weight: '25', price: 25, imagePath: '', isSauce: false }],
    name: 'Product Name', path: '', ingredients: 'products', weight: '', price: 12, addition_price: 0, bonus: 0, imagePath: '', count: 1
  };
  spyOn(component, 'addToBasket').and.callThrough();
  component.addToBasket(product, true);
  expect(component.addToBasket).toHaveBeenCalled();
  expect(component).toBeTruthy();
});

it('should remove the product from basket', () => {

  const product = {
    id: '1',
    category: { id: 1, name: '', path: '', imagePath: '' },
    type_product: { id: 1, name: '', path: '', imgPath: '' },
    type_addition: [{ id: 1, name: 'type', path: '', description: '', weight: '25', price: 25, imagePath: '', isSauce: false }],
    selected_addition: [{ id: 1, name: 'type', path: '', description: '', weight: '25', price: 25, imagePath: '', isSauce: false }],
    name: 'Product Name', path: '', ingredients: 'products', weight: '', price: 12, addition_price: 0, bonus: 0, imagePath: '', count: 1
  };
  
  const FAKE_BASKET = [product];
  localStorage.setItem('basket', JSON.stringify(FAKE_BASKET));

  const spySetItem = spyOn(localStorage, 'setItem').and.callFake((key: string, value: string) => {
    if (key === 'basket') {
      storage['basket'] = value;
    }
  });
  const spyChangeBasket = spyOn(orderServiceStub.changeBasket, 'next').and.callThrough();

  component.removeFromBasket(product as IProductResponse);

  const updatedBasket = JSON.parse(storage['basket'] || '[]');
  expect(updatedBasket.length).toBe(0); 
  expect(spySetItem).toHaveBeenCalledWith('basket', JSON.stringify([]));
  expect(spyChangeBasket).toHaveBeenCalledWith(true);
});



it('should update the basket when orderService.changeBasket emits', () => {
  const spyLoadBasket = spyOn(component, 'loadBasket').and.callThrough();
  const spySubscribe = spyOn(orderServiceStub.changeBasket, 'subscribe').and.callThrough();

  component.updateBasket();

  expect(spySubscribe).toHaveBeenCalled();
  orderServiceStub.changeBasket.next(true);
  expect(spyLoadBasket).toHaveBeenCalled();
});

it('should update the product in the basket', () => {
  const product = {
    id: '1',
    category: { id: 1, name: '', path: '', imagePath: '' },
    type_product: { id: 1, name: '', path: '', imgPath: '' },
    type_addition: [{ id: 1, name: 'type', path: '', description: '', weight: '25', price: 25, imagePath: '', isSauce: false }],
    selected_addition: [{ id: 1, name: 'type', path: '', description: '', weight: '25', price: 25, imagePath: '', isSauce: false }],
    name: 'Product Name', path: '', ingredients: 'products', weight: '', price: 12, addition_price: 0, bonus: 0, imagePath: '', count: 1
  };
  const FAKE_BASKET = [product];
  localStorage.setItem('basket', JSON.stringify(FAKE_BASKET));

  const spySetItem = spyOn(localStorage, 'setItem');
  const spyChangeBasket = spyOn(orderServiceStub.changeBasket, 'next').and.callThrough();

  component.updateProductInBasket(product as any, 0);

  const updatedBasket = JSON.parse(localStorage.getItem('basket') as string);
  expect(updatedBasket[0]).toEqual(product);
  expect(spySetItem).toHaveBeenCalledWith('basket', JSON.stringify([product]));
  expect(spyChangeBasket).toHaveBeenCalledWith(true);
});


});
