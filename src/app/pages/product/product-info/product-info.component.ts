import { Component, OnInit,  OnDestroy, ElementRef, AfterContentInit, DoCheck } from '@angular/core';
import { ProductService } from 'src/app/shared/services/product/product.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { IProductResponse } from 'src/app/shared/interfaces/product/product.interface';
import { OrderService } from 'src/app/shared/services/order/order.service';
import { Subscription } from 'rxjs';
import { ICategoryResponse } from "../../../shared/interfaces/category/category.interface";
import { ITypeAdditionResponse } from 'src/app/shared/interfaces/type-addition/type-addition.interfaces';
import { AuthAdditionComponent } from 'src/app/components/aus-addition/auth-addition.component';
import { MatDialog } from '@angular/material/dialog';
import { AccountService } from 'src/app/shared/services/account/account.service';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { ToastService } from 'src/app/shared/services/toast/toast.service';


@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.scss']
})
export class ProductInfoComponent implements OnInit, DoCheck, AfterContentInit {

  public currentProduct = <IProductResponse>{} ||
    null || undefined;
  public currentCategoryName!: string;
  public currentProductCategory = <ICategoryResponse>{} || null || undefined;
  private eventSubscription!: Subscription;
  public isAddition: boolean = false;
  public activeAddition: string = '';
  public additionProduct: Array<ITypeAdditionResponse> = [];
  public additionPrice: number = 0;
  public idAdd: boolean = false;
  public isFavorite!: boolean;
  public favoriteProducts: Array<IProductResponse> = [];
  public currentUser!: any;
  public btnName: string = 'замовити';
  public isOrder: boolean = false;
  

  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private orderService: OrderService,
    private accountService: AccountService,
    private router: Router,
    public dialog: MatDialog,
    private afs: Firestore,
    private toastr: ToastService
  ) {
    this.eventSubscription = this.router.events.subscribe(event => {
    if(event instanceof NavigationEnd ) {
      this.loadProduct();
      this.loadUser();
      this.loadFavoriteProduct(); 
      this.activatedRoute.data.subscribe(response => {
        this.currentProduct = response['productInfo'];
        this.currentProductCategory = this.currentProduct?.category;
      })
    }
  })
  }

  ngOnInit(): void {
  }

  ngDoCheck(): void {
    this.loadFavoriteProduct(); 
    
  }

  ngAfterContentInit(): void {
    this.loadFavoriteProduct();    
  }

  loadFavoriteProduct(): void {
    this.favoriteProducts = this.accountService.favoriteProducts;
      if (this.favoriteProducts.findIndex(prod => prod.id === this.currentProduct.id) !== -1) {
        this.isFavorite = true;
      } else this.isFavorite = false;
    console.log(this.isFavorite, "isFavorite", this.favoriteProducts);
  }

  loadProduct(): void {
    const PRODUCT_ID = (this.activatedRoute.snapshot.paramMap.get('id') as string);
    this.accountService.PRODUCT_ID = PRODUCT_ID;
    this.productService.getOneFirebase(PRODUCT_ID).subscribe(data => {
      this.currentProduct = data as IProductResponse;
      // this.favoriteProducts = this.accountService.favoriteProducts;
      // if (this.favoriteProducts.findIndex(prod => prod.id === this.currentProduct.id) !== -1) {
      //   this.isFavorite = true;
      // } else this.isFavorite = false;
      // console.log(this.isFavorite, "isFavorite");
      
    })    
  }

  loadUser(): void {
    if(localStorage.length > 0 && localStorage.getItem('currentUser')){
      this.currentUser = JSON.parse(localStorage.getItem('currentUser') as string);
    }
  }


  equalArray(x: any, y: any): void {
      const xEntries = Object.entries(x);
      if (xEntries.length !== Object.entries(y).length) this.idAdd= false;
      this.idAdd = xEntries.every(([k, v]) => y[k] === v);
  }

  productCount(product: IProductResponse, value: boolean): void {
    if(value){
      ++product.count;
    } else if(!value && product.count > 1){
      --product.count;
    }
  }

  
  addToBasket(product: IProductResponse): void {
    let addition_price = 0;
    product.selected_addition = product.selected_addition || [];
    product.selected_addition.splice(0, product.selected_addition.length);
    this.additionProduct.forEach(function (item) {
      product.selected_addition.push(item);
      product.addition_price += Number(item.price);
    });
    const sameEntries = (x: any, y: any) => {
      const xEntries = Object.entries(x);
      if (xEntries.length !== Object.entries(y).length) return false;
      return xEntries.every(([k, v]) => y[k] === v);
    }
    const sameArrays = (arr1: Array<ITypeAdditionResponse>, arr2: Array<ITypeAdditionResponse>) =>
      arr1.length === arr2.length && arr1.every((x, i) => sameEntries(x, arr2[i]));

    let idAdd = false;
    let index = 0;
    let basket: Array<IProductResponse> = [];
    if (localStorage.length > 0 && localStorage.getItem('basket')) {
      basket = JSON.parse(localStorage.getItem('basket') as string);
      basket.forEach(function (prod) {
        if (prod.id === product.id) {
          prod.selected_addition = prod.selected_addition || [];
          if (prod.id === product.id && sameArrays(prod.selected_addition, product.selected_addition)) {
            idAdd = true;
            index = basket.findIndex(prod => prod.id === product.id && sameArrays(prod.selected_addition, product.selected_addition));
            addition_price += addition_price;
          }
        }
      })
      if (idAdd) {
        basket[index].count += product.count;
      }
      else {
        basket.push(product);
      }
      this.isOrder = true;
    }
    else {
      basket.push(product);
    }
    localStorage.setItem('basket', JSON.stringify(basket));
    this.toastr.showSuccess('', 'Піццу ' + product.name + ' успішно додано до кишику');
    product.count = 1;
    this.orderService.changeBasket.next(true);
    this.additionDeleteAllClick();
    product = product;
    this.btnName = '';
    setTimeout(() => { this.btnName = 'замовити', this.isOrder = false }, 2000 );
  }


  additionClick(additionName: any): void {    
    this.activeAddition = additionName;
    let elem = document.querySelectorAll('.ingredient');
    for (let i = 0; i < elem.length; i++) {
      if (this.currentProduct.type_addition[i].name == additionName) {
        elem[i]?.classList.toggle('active');
        if (elem[i].classList.contains('active')) {
          this.additionProduct.push(this.currentProduct.type_addition[i]);
          this.additionPrice +=  Number(this.currentProduct.type_addition[i].price);
        } else
        {
          let ind = this.additionProduct.indexOf(this.currentProduct.type_addition[i]);
          this.additionPrice = this.additionPrice - Number(this.currentProduct.type_addition[i].price);
          if (ind >= 0) this.additionProduct.splice( ind, 1);
        }
        if (this.additionProduct.length > 0) {
          this.isAddition = true;
        } else {
          this.isAddition = false;
        }
      }
    }
  }

  additionDeleteClick(additionName: any): void {
    let elem = document.querySelectorAll('.ingredient');
    for (let i = 0; i < this.additionProduct.length; i++) {
      if (this.additionProduct[i].name == additionName) {
        let ind = this.additionProduct.indexOf(this.additionProduct[i]);
        this.additionPrice = this.additionPrice - Number(this.additionProduct[i].price);
        if (ind >= 0) this.additionProduct.splice(ind, 1);
        elem[i]?.classList.remove('active');
      }
    }
    if (this.additionProduct.length > 0) {
          this.isAddition = true;
        } else {
          this.isAddition = false;
        }
  }

  additionDeleteAllClick(): void{
    this.additionProduct.splice(0, this.additionProduct.length);
    this.additionPrice = 0;
    this.isAddition = false;
    document.querySelectorAll('.ingredient').forEach((el) =>
      el.classList.remove("active"));
  }

  openAdditionDialog(): void {
      this.dialog.open(AuthAdditionComponent, {
        backdropClass: 'dialog-back',
        panelClass: 'auth-addition-dialog',
        autoFocus: false
      }).afterClosed().subscribe(result => {
        console.log(result);
        this.favoriteProducts = this.accountService.favoriteProducts;
        const ind = this.favoriteProducts.findIndex(prod => prod.id === this.currentProduct.id);
        if (ind > -1) {
          this.isFavorite = true;         
        } else this.isFavorite = false;      
      })    
  }
  
  buttonFavoriteClick(productName: string): void{
    this.isFavorite = !this.isFavorite;
    if (this.isFavorite) {
      this.favoriteProducts.push(this.currentProduct);
    } else {
      this.favoriteProducts.forEach(() => {
        let index = this.favoriteProducts.findIndex(prod => prod.name === productName);
        this.favoriteProducts.splice(index, 1);
      });
    }
    this.accountService.favoriteProducts = this.favoriteProducts;
  
  }

}
