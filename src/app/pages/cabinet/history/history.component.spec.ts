/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HistoryComponent } from './history.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { OrderService } from 'src/app/shared/services/order/order.service';
import { SharedModule } from 'src/app/shared/sahared.module';
import { FormatDatePipe } from 'src/app/shared/pipes/format-date.pipe';
import { formatDate } from '@angular/common';

describe('HistoryComponent', () => {
  let component: HistoryComponent;
  let fixture: ComponentFixture<HistoryComponent>;

  const orderServiceStub = {
    getAllFirebase: () => of([
      {
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
      name: "Viktoriia",
      phone: '+380667894561',
      email: 'user3@gmail.com',
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
      getUserFirebase: (uid: string) => of([
        {
        order_number: 1,
      uid: uid,
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
      name: "Vikroriia",
      phone: '+380667894561',
      email: 'user3@gmail.com',
      delivery_method: '',
      payment_method: '',
      cash: 0,
      isWithoutRest: false,
      at_time: false,
      delivery_date: new Date,
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
      }
    ]),
  };

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      declarations: [HistoryComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,   
        SharedModule    
      ],
      providers: [
        { provide: OrderService, useValue: orderServiceStub },
      ]
    })
    .compileComponents();

  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
