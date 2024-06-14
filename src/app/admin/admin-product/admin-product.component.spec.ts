/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AdminProductComponent } from './admin-product.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrService } from 'ngx-toastr';
import { Storage } from '@angular/fire/storage';
import { AngularFireModule } from '@angular/fire/compat';
import { IProductRequest, IProductResponse } from 'src/app/shared/interfaces/product/product.interface';
import { of } from 'rxjs';
import { ITypeAdditionResponse } from 'src/app/shared/interfaces/type-addition/type-addition.interfaces';
import { ProductService } from 'src/app/shared/services/product/product.service';
import { CategoryService } from 'src/app/shared/services/category/category.service';
import { AdditionProductService } from 'src/app/shared/services/addition-product/addition-product.service';
import { TypeProductService } from 'src/app/shared/services/type-product/type-product.service';
import { MatDialogModule } from '@angular/material/dialog';
import { DocumentData, DocumentReference } from '@angular/fire/firestore';
import { ICategoryResponse } from 'src/app/shared/interfaces/category/category.interface';

describe('AdminProductComponent', () => {
  let component: AdminProductComponent;
  let fixture: ComponentFixture<AdminProductComponent>;
  let productService: ProductService;
  const mockProduct: IProductResponse = {
    id: '1',
    category: { id: 1, name: '', path: '', imagePath: '' },
    type_product: { id: 1, name: '', path: '', imgPath: '' },
    type_addition: [{ id: 1, name: '', path: '', description: '', weight: '25', price: 25, imagePath: '', isSauce: false }],
    selected_addition: [{ id: 1, name: '', path: '', description: '', weight: '25', price: 25, imagePath: '', isSauce: false }],
    name: 'test name', path: '', ingredients: ' ', weight: '', price: 12, addition_price: 0, bonus: 0, imagePath: '', count: 1   
  };

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
    // updateFirebase: ( product: Partial<IProductResponse>, id: string) => of({
    //   id: id,
    //   ...product
    // }),
    createFirebase: (product: IProductRequest) => {
        return Promise.resolve({ id: '1' } as DocumentReference<DocumentData>);
      },
      // createFirebase: (data: IPageRequest) => Promise.resolve({
      //   id: '2',
      //   ...data
      // } as IPageResponse),
      updateFirebase: (product: IProductRequest, id: string) => {
        return Promise.resolve({ id: id } as DocumentReference<DocumentData>);
      }, 
      deleteFirebase: (id: string) => of([{
        id: id,     
        category: { id: 1, name: '', path: '', imagePath: '' },
      type_product: { id: 1, name: '', path: '', imgPath: '' },
      type_addition: [{ id: 1, name: 'type', path: '', description: '', weight: '25', price: 25, imagePath: '', isSauce: false }] as ITypeAdditionResponse[],
      selected_addition: [{ id: 1, name: 'type', path: '', description: '', weight: '25', price: 25, imagePath: '', isSauce: false }] as ITypeAdditionResponse[],
      name: 'Product Name', path: '', ingredients: 'products', weight: '', price: 12, addition_price: 0, bonus: 0, imagePath: '', count: 1
      }]),
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
  const categoryServiceStub = {
    getOneFirebase: (id: string) =>
      of({
        id: id,
        name: 'test category',
        path: '',
        imagePath: '',
      }),
      getAllFirebase: () =>
        of([{
          id: 1,
          name: 'test category',
          path: '',
          imagePath: '',
        }])
  };

  const toastrServiceStub = {
    success: jasmine.createSpy(),
    error: jasmine.createSpy()
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
        { provide: ToastrService, useValue: toastrServiceStub },
        { provide: ProductService, useValue: productServiceStub },
        { provide: CategoryService, useValue: categoryServiceStub },
        { provide: AdditionProductService, useValue: serviceAdditionProductStub },
        { provide: TypeProductService, useValue: serviceTypeProductStub }        
      ]
    })
    .compileComponents();

    productService = TestBed.inject(ProductService) as jasmine.SpyObj<ProductService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form on ngOnInit', () => {
    component.ngOnInit();
    expect(component.productForm).toBeDefined();
    expect(component.productForm.get('page')).toBeDefined();
  });
  
  it(`should return empty list of products'`, () => {
    const fixture = TestBed.createComponent(AdminProductComponent);
    const app = fixture.componentInstance;
    let service = fixture.debugElement.injector.get(ProductService);
    spyOn(service,"getAllFirebase").and.callFake(() => {
      return of([]);
    });
    app.loadProduct();
    expect(app.adminProducts).toEqual([]);
  });

  it(`should return list of products'`, () => {
    const fixture = TestBed.createComponent(AdminProductComponent);
    const app = fixture.componentInstance;
    let service = fixture.debugElement.injector.get(ProductService);
    spyOn(service,"getAllFirebase").and.callFake (() => {
      return of([
        { 
          id: '1',     
          category: { id: 1, name: '', path: '', imagePath: '' },
          type_product: { id: 1, name: '', path: '', imgPath: '' },
          type_addition: [{ id: 1, name: '', path: '', description: '', weight: '25', price: 25, imagePath: '', isSauce: false }],
          selected_addition: [{}],
          name: '', path: '', ingredients: ' ', weight: '', price: 12, addition_price: 0, bonus: 0, imagePath: '', count: 1   
        }
      ])
    });
    app.loadProduct();
    expect(app.adminProducts.length).toEqual(1);
  });


  it('should load products on initialization', () => {
    let service = fixture.debugElement.injector.get(ProductService);
    spyOn(service,"getAllFirebase").and.callFake (() => {
      return of([
        { 
          id: '1',     
          category: { id: 1, name: '', path: '', imagePath: '' },
          type_product: { id: 1, name: '', path: '', imgPath: '' },
          type_addition: [{ id: 1, name: '', path: '', description: '', weight: '25', price: 25, imagePath: '', isSauce: false }],
          selected_addition: [{}],
          name: '', path: '', ingredients: ' ', weight: '', price: 12, addition_price: 0, bonus: 0, imagePath: '', count: 1   
        }
      ])
    });
    component.loadProduct();
    fixture.detectChanges();
    
    expect(component.adminProducts.length).toBe(1);
    expect(productService.getAllFirebase).toHaveBeenCalled();
  });
  

  it('should add a new page', fakeAsync(async () => {
    const productRequest: IProductRequest = {       
      category: { id: 1, name: '', path: '', imagePath: '' },
      type_product: { id: 1, name: '', path: '', imgPath: '' },
      type_addition: [{ id: 1, name: '', path: '', description: '', weight: '25', price: 25, imagePath: '', isSauce: false }],
      selected_addition: [{ id: 1, name: '', path: '', description: '', weight: '25', price: 25, imagePath: '', isSauce: false }],
      name: 'test name', path: '', ingredients: ' ', weight: '', price: 12, addition_price: 0, bonus: 0, imagePath: '', count: 1   
    };
    const expProduct: IProductResponse = {     
      id: '1',  
      category: { id: 1, name: '', path: '', imagePath: '' },
      type_product: { id: 1, name: '', path: '', imgPath: '' },
      type_addition: [{ id: 1, name: '', path: '', description: '', weight: '25', price: 25, imagePath: '', isSauce: false }],
      selected_addition: [{ id: 1, name: '', path: '', description: '', weight: '25', price: 25, imagePath: '', isSauce: false }],
      name: 'test name', path: '', ingredients: ' ', weight: '', price: 12, addition_price: 0, bonus: 0, imagePath: '', count: 1   
    };
  component.editStatus = false;  
  component.addProduct();
  tick();
  spyOn(productService, 'createFirebase');    
  if (!component.editStatus) {
    await productService.createFirebase(productRequest);    
      // expect(productService.createFirebase).toHaveBeenCalledWith(expProduct);  
      expect(toastrServiceStub.success).toHaveBeenCalled();
      component.productForm.reset();
      expect(component.productForm.get('name')?.value).toBeNull();
  }    
  expect(component).toBeTruthy();
  }));

  it('should edit a  page', fakeAsync(async () => {
    const productRequest: IProductRequest = {       
      category: { id: 1, name: '', path: '', imagePath: '' },
      type_product: { id: 1, name: '', path: '', imgPath: '' },
      type_addition: [{ id: 1, name: '', path: '', description: '', weight: '25', price: 25, imagePath: '', isSauce: false }],
      selected_addition: [{ id: 1, name: '', path: '', description: '', weight: '25', price: 25, imagePath: '', isSauce: false }],
      name: 'test name', path: '', ingredients: ' ', weight: '', price: 12, addition_price: 0, bonus: 0, imagePath: '', count: 1   
    };
  component.editStatus = true;
  component.currentProductId = '1';
  component.addProduct();
  tick();
  spyOn(productService, 'updateFirebase');
  if (component.editStatus) {
    await productService.updateFirebase(productRequest, '1');
  
    expect(productService.updateFirebase).toHaveBeenCalled();  
    expect(toastrServiceStub.success).toHaveBeenCalled();
    component.productForm.reset();
    expect(component.productForm.get('name')?.value).toBeNull();   
  }
  expect(component).toBeTruthy();
  }));

  // it('delete values product', () => {
   
  //   const productToDelete: IProductResponse ={
  //     id: '1',
  //     category: { id: 1, name: '', path: '', imagePath: '' },
  //     type_product: { id: 1, name: '', path: '', imgPath: '' },
  //     type_addition: [{ id: 1, name: '', path: '', description: '', weight: '25', price: 25, imagePath: '', isSauce: false }],
  //     selected_addition: [{ id: 1, name: '', path: '', description: '', weight: '25', price: 25, imagePath: '', isSauce: false }],
  //     name: 'test name', path: '', ingredients: ' ', weight: '', price: 12, addition_price: 0, bonus: 0, imagePath: '', count: 1   
  //   };
  //   // spyOn(component, 'deleteProduct').and.callThrough(); 
  //   // spyOn(window, 'confirm').and.returnValue(true);
  //   // component.deleteProduct(productToDelete);    
  //   // expect(productService.deleteFirebase).toHaveBeenCalledWith('1');
  //   const spyDeleteFirebase = spyOn(productService, 'deleteFirebase');
  // spyOn(window, 'confirm').and.returnValue(true); 

  // component.deleteProduct(productToDelete);

  // expect(spyDeleteFirebase).toHaveBeenCalledWith('1');
  // });


  // it('should call productService.deleteFirebase and show success toast on successful deletion', () => {
  //   const fixture = TestBed.createComponent(AdminProductComponent);
  //   const component = fixture.componentInstance;
  //   const productToDelete: IProductResponse = {
  //     id: '1',
  //     category: { id: 1, name: '', path: '', imagePath: '' },
  //     type_product: { id: 1, name: '', path: '', imgPath: '' },
  //     type_addition: [{ id: 1, name: '', path: '', description: '', weight: '25', price: 25, imagePath: '', isSauce: false }],
  //     selected_addition: [{ id: 1, name: '', path: '', description: '', weight: '25', price: 25, imagePath: '', isSauce: false }],
  //     name: 'test name', path: '', ingredients: ' ', weight: '', price: 12, addition_price: 0, bonus: 0, imagePath: '', count: 1   
  //   };
  //   const toastrService = TestBed.inject(ToastrService);
  //   spyOn(toastrService, 'success');
  //   spyOn(component.productService, 'deleteFirebase').and.returnValue(Promise.resolve());
  
  //   component.deleteProduct(productToDelete);
  //   fixture.detectChanges();
  
  //   expect(component.productService.deleteFirebase).toHaveBeenCalledWith('123');
  //   expect(toastrService.success).toHaveBeenCalledWith('', 'Продукт видалено'); 
  // });

  it('should call productService.updateFirebase on addProduct (edit mode)', () => {
    const mockProduct: IProductResponse = {
      id: '1',
      category: { id: 1, name: '', path: '', imagePath: '' },
      type_product: { id: 1, name: '', path: '', imgPath: '' },
      type_addition: [{ id: 1, name: '', path: '', description: '', weight: '25', price: 25, imagePath: '', isSauce: false }],
      selected_addition: [{ id: 1, name: '', path: '', description: '', weight: '25', price: 25, imagePath: '', isSauce: false }],
      name: 'test name', path: '', ingredients: ' ', weight: '', price: 12, addition_price: 0, bonus: 0, imagePath: '', count: 1   
    };
    const fixture = TestBed.createComponent(AdminProductComponent);
    const component = fixture.componentInstance;
    const productService = fixture.debugElement.injector.get(ProductService);
    spyOn(productService, 'updateFirebase');
    component.editStatus = true;
    component.currentProductId = mockProduct.id;
    component.productForm.setValue({
      category: { id: 1, name: '', path: '', imagePath: '' },
      type_product: { id: 1, name: '', path: '', imgPath: '' },
      type_addition: [{ id: 1, name: '', path: '', description: '', weight: '25', price: 25, imagePath: '', isSauce: false }],
      selected_addition: [{ id: 1, name: '', path: '', description: '', weight: '25', price: 25, imagePath: '', isSauce: false }],
      name: 'test name', path: '', ingredients: ' ', weight: '', price: 12, addition_price: 0, bonus: 0, imagePath: '', count: 1   
  });
  
    component.addProduct();
    tick();
    fixture.detectChanges();
  
    expect(productService.updateFirebase).toHaveBeenCalledWith(mockProduct, mockProduct.id as string);
  });
  
  it('should call productService.createFirebase on addProduct (add mode)', () => {
    const mockProduct = {
      id: '1',
      category: { id: 1, name: '', path: '', imagePath: '' },
      type_product: { id: 1, name: '', path: '', imgPath: '' },
      type_addition: [{ id: 1, name: '', path: '', description: '', weight: '25', price: 25, imagePath: '', isSauce: false }],
      selected_addition: [{ id: 1, name: '', path: '', description: '', weight: '25', price: 25, imagePath: '', isSauce: false }],
      name: 'test name', path: '', ingredients: ' ', weight: '', price: 12, addition_price: 0, bonus: 0, imagePath: '', count: 1   
    };
    const fixture = TestBed.createComponent(AdminProductComponent);
    const component = fixture.componentInstance;
    const productService = fixture.debugElement.injector.get(ProductService);   
    spyOn(productService, 'createFirebase');
    // component.productForm.setValue(mockProduct);
    fixture.componentInstance.productForm.setValue(mockProduct);
    component.addProduct();
    tick();
    fixture.detectChanges();
  
    expect(productService.createFirebase).toHaveBeenCalledWith(mockProduct);
  });

  it('should initialize product form on ngOnInit', () => {
    const fixture = TestBed.createComponent(AdminProductComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component.productForm).toBeDefined();
    expect(component.productForm.get('name')).toBeDefined(); 
  });

  it('should load categories on loadCategories', () => {
    const fixture = TestBed.createComponent(AdminProductComponent);
    const component = fixture.componentInstance;    
    let service = fixture.debugElement.injector.get(ProductService);    
    const mockCategories: ICategoryResponse[] = [{
      id: 1,
      name: 'test category',
      path: '',
      imagePath: '',
    }];
    spyOn(service,"getAllFirebase").and.callFake (() => {
      return of([
        mockCategories
      ])
    });
    component.loadCategories();
    fixture.detectChanges();
  
    expect(component.adminCategories.length).toEqual(1);
    expect(component.adminCategories[0]).toEqual(mockCategories[0]);
  });

  it('should set initial form values', () => {
    const fixture = TestBed.createComponent(AdminProductComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();
  
    expect(component.productForm.get('category')?.value).toBeTruthy(); 
  });
  
  // it('should update form values on editProduct', () => {
  //   const fixture = TestBed.createComponent(AdminProductComponent);
  //   const component = fixture.componentInstance;
  //   const mockProduct: IProductResponse = {
  //     id: 1,
  //     category: { id: 1, name: '', path: '', imagePath: '' },
  //     type_product: { id: 1, name: '', path: '', imgPath: '' },
  //     type_addition: [{ id: 1, name: '', path: '', description: '', weight: '25', price: 25, imagePath: '', isSauce: false }],
  //     selected_addition: [{ id: 1, name: '', path: '', description: '', weight: '25', price: 25, imagePath: '', isSauce: false }],
  //     name: 'test name', path: '', ingredients: ' ', weight: '', price: 12, addition_price: 0, bonus: 0, imagePath: '', count: 1   
  //   };
  //   fixture.detectChanges();  
  //   component.editProduct(mockProduct);
  //   expect(component.productForm.get('name')?.value).toEqual(mockProduct.name);
  // });
});
