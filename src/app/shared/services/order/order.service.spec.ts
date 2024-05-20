/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { OrderService } from './order.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Firestore } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';

describe('Service: Order', () => {
  beforeEach(async() => {
    await TestBed.configureTestingModule({
      providers: [OrderService,
      { provide: Firestore, useValue: {} },],
      imports: [
        HttpClientTestingModule,
        AngularFireStorageModule,
        
      ]
    }).compileComponents();
  });

  it('should ...', inject([OrderService], (service: OrderService) => {
    expect(service).toBeTruthy();
  }));
});
