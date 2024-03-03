import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ICategoryResponse } from 'src/app/shared/interfaces/category/category.interface';
import { IProductResponse } from 'src/app/shared/interfaces/product/product.interface';
import { CategoryService } from 'src/app/shared/services/category/category.service';
import { ImageService } from 'src/app/shared/services/image/image.service';
import { ProductService } from 'src/app/shared/services/product/product.service';
import { ToastrService } from 'ngx-toastr';
import { ITypeProductResponse } from 'src/app/shared/interfaces/type-product/type-product.interface';
import { TypeProductService } from 'src/app/shared/services/type-product/type-product.service';
import { IAdditionResponse } from 'src/app/shared/interfaces/addition/addition.interfaces';
import { AdditionProductService } from 'src/app/shared/services/addition-product/addition-product.service';
import { ToastService } from 'src/app/shared/services/toast/toast.service';

@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.scss']
})
export class AdminProductComponent implements OnInit {

  public adminCategories: Array<ICategoryResponse> = [];
  public adminProducts: Array<IProductResponse> = [];
  public adminTypeProducts: Array<ITypeProductResponse> = [];
  public adminAdditionProducts: Array<IAdditionResponse> = [];
  public productForm!: FormGroup;
  public editStatus = false;
  public uploadPercent = 0;
  public isUploaded = false;
  public isOpen = false;

  public currentCategoryId!: number | string;
  public currentCategoryName = '';
  private currentProductId!: string;

  

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private productService: ProductService,
    private additionService: AdditionProductService,
    private typeProductService: TypeProductService,
    private imageService: ImageService,
    private toastr: ToastService
  ) { }

  ngOnInit(): void {
    this.initProductForm();
    this.loadCategories();
    this.loadProduct();
    this.loadTypeProduct();
    this.loadAdditionProduct();
  }

  initProductForm(): void {
    this.productForm = this.fb.group({
      category: [null, Validators.required],
      type_product: [null],    
      type_addition: [[null]],
      selected_addition: [[null]],
      name: [null, Validators.required],
      path: [null, Validators.required],
      ingredients: [null],
      weight: [null, Validators.required],
      price: [null, Validators.required],
      bonus: [null, Validators.required],
      imagePath: [null, Validators.required],
      count: [1]
    });
  }

  loadCategories(): void {
    this.categoryService.getAllFirebase().subscribe(data => {
      this.adminCategories = data as ICategoryResponse[];
      this.productForm.patchValue({
        category: this.adminCategories[0]?.id
      })
    })
  }

  loadProduct(): void {
    this.productService.getAllFirebase().subscribe(data => {
      this.adminProducts = data as IProductResponse[];
    })
  }

  loadTypeProduct(): void {
    this.typeProductService.getAllFirebase().subscribe(data =>{
      this.adminTypeProducts = data as ITypeProductResponse[];
      this.productForm.patchValue({
        type_product: this.adminTypeProducts[0]?.id
      })
    })
  }

  loadAdditionProduct(): void {
    this.additionService.getAllFirebase().subscribe(data =>{
      this.adminAdditionProducts = data as IAdditionResponse[];
      this.productForm.patchValue({
        type_addition: this.adminAdditionProducts[0]?.id
      })
    })
  }

  addProduct(): void {
    if(this.editStatus){
      this.productService.updateFirebase(this.productForm.value, this.currentProductId).then(() => {
        this.loadProduct();
        this.toastr.showSuccess('','Продукт змінено');
        // this.toastr.success('Product successfully updated');
      })
    } else {
      this.productService.createFirebase(this.productForm.value).then(() => {
        this.toastr.showSuccess('', 'Продукт додано');
      })
    }
    this.isOpen = false;
    this.editStatus = false;
    this.productForm.reset();
    this.uploadPercent = 0;
    this.isUploaded = false;
  }

  editProduct(product: IProductResponse): void {
    this.openForm();
    this.currentCategoryId = product.category.id;
    this.currentCategoryName = product.category.name;


    this.productForm.patchValue({
      category: product.category,
      type_product: product.type_product,      
      type_addition: product.type_addition,
      selected_addition: product.selected_addition,
      name: product.name,
      path: product.path,
      ingredients: product.ingredients,
      weight: product.weight,
      price: product.price,
      addition_price: product.addition_price,
      bonus: product.bonus,
      imagePath: product.imagePath,
      count:1
    });


    this.isUploaded = true;
    this.editStatus = true;
    this.currentProductId = product.id;
  }

  deleteProduct(product: IProductResponse): void {
    this.productService.deleteFirebase(product.id).then(() => {
      this.loadProduct();
      this.toastr.showSuccess('', 'Продукт видалено');
    })
  }




  openForm():void {
    this.isOpen = true;
  }

  upload(event: any): void {
    const file = event.target.files[0];
    this.imageService.uploadFile('images', file.name, file)
      .then(data => {
        this.productForm.patchValue({
          imagePath: data
        });
        this.isUploaded = true;
      })
      .catch(err => {
        console.log(err);
      })
  }

  deleteImage(): void {
    this.imageService.deleteUploadFile(this.valueByControl('imagePath'))
      .then(() => {
        this.isUploaded = false;
        this.uploadPercent = 0;
        this.productForm.patchValue({ imagePath: null });
      })
      .catch(err => {
        console.log(err);
      })
  }

  valueByControl(control: any): any {
    return this.productForm.get(control)?.value;
  }


}
