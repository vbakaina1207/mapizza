/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AdminProductComponent } from './admin-product.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrService } from 'ngx-toastr';
import { Storage } from '@angular/fire/storage';
import { Firestore } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { IProductResponse } from 'src/app/shared/interfaces/product/product.interface';
import { of } from 'rxjs';
import { ITypeAdditionResponse } from 'src/app/shared/interfaces/type-addition/type-addition.interfaces';
import { ProductService } from 'src/app/shared/services/product/product.service';
import { CategoryService } from 'src/app/shared/services/category/category.service';
import { AdditionProductService } from 'src/app/shared/services/addition-product/addition-product.service';
import { TypeProductService } from 'src/app/shared/services/type-product/type-product.service';
import { MatDialogModule } from '@angular/material/dialog';

describe('AdminProductComponent', () => {
  let component: AdminProductComponent;
  let fixture: ComponentFixture<AdminProductComponent>;

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
    updateFirebase: ( product: Partial<IProductResponse>, id: string) => of({
      id: id,
      ...product
    })
  };
  
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
    ])
  };
  
  const serviceTypeProductStub = {
    getOneFirebase: (id: string) => of({      
      id: 1, name: 'test type', path: '', imgPath: '' 
    }),
    getAllFirebase: () => of([
      { id: 1, name: 'test type', path: '', imgPath: '' }
    ])
  };

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      declarations: [AdminProductComponent],
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        AngularFireModule,
        MatDialogModule
      ],
      providers: [
        { provide: Storage, useValue: {} },
        { provide: ToastrService, useValue: {} },
        { provide: ProductService, useValue: productServiceStub },
        { provide: CategoryService, useValue: {}},
        { provide: AdditionProductService, useValue: serviceAdditionProductStub },
        { provide: TypeProductService, useValue: serviceTypeProductStub }
        //{ provide: Firestore, useValue: {} },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
