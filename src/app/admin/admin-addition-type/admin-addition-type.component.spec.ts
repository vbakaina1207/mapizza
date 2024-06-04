/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AdminAdditionTypeComponent } from './admin-addition-type.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrService } from 'ngx-toastr';
import { Storage } from '@angular/fire/storage';
import { AdditionProductService } from 'src/app/shared/services/addition-product/addition-product.service';
import { MatDialogModule } from '@angular/material/dialog';
import { of } from 'rxjs';

describe('AdminAdditionTypeComponent', () => {
  let component: AdminAdditionTypeComponent;
  let fixture: ComponentFixture<AdminAdditionTypeComponent>;

  const serviceAdditionProductStub = {
    getOneFirebase: (id: string) => of({      
      id: id, 
      name: 'test type',
      description: '',
      weight: '25',
      price: 5,
      imagePath: '',
      isSauce: false
    }),
    getAllFirebase: () => of([
      { id: 1, 
        name: 'test type', 
        description: '',
        weight: '25',
        price: 5,
        imagePath: '',
        isSauce: false}
    ]),
    getAllBySauceFirebase: (isSauce: boolean) => of([
      { id: 1, 
        name: 'test type', 
        description: '',
        weight: '25',
        price: 5,
        imagePath: '',
        isSauce: isSauce}
    ])
  };
  
  
    

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      declarations: [AdminAdditionTypeComponent],
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        MatDialogModule
      ],
      providers: [
        { provide: Storage, useValue: {} },
        { provide: ToastrService, useValue: {} },
        { provide: AdditionProductService, useValue: serviceAdditionProductStub }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAdditionTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
