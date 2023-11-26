import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { doc, Firestore, getDoc, setDoc } from '@angular/fire/firestore';
import {FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { IProductResponse } from 'src/app/shared/interfaces/product/product.interface';
import { ITypeAdditionResponse } from 'src/app/shared/interfaces/type-addition/type-addition.interfaces';
import { AccountService } from 'src/app/shared/services/account/account.service';
import { AdditionProductService } from 'src/app/shared/services/addition-product/addition-product.service';
import { OrderService } from 'src/app/shared/services/order/order.service';
import { ProductService } from 'src/app/shared/services/product/product.service';

@Component({
  selector: 'app-auth-addition',
  templateUrl: './auth-addition.component.html',
  styleUrls: ['./auth-addition.component.scss']
})
export class AuthAdditionComponent implements OnInit {

  public currentProduct = <IProductResponse>{} ||
    null || undefined;
  public additionProducts: Array<ITypeAdditionResponse> = [];
  private eventSubscription!: Subscription;
  public additionProduct: Array<ITypeAdditionResponse> = [];
  public additionPrice: number = 0;
  public activeAddition: string = '';
  public isAddition: boolean = false;
  public isTabSouce: boolean = true;
  public isFavorite!: boolean;
  public favoriteProducts: Array<IProductResponse> = [];


  constructor(
    private router: Router,
    private accountService: AccountService,
    private additionProductService: AdditionProductService,
    private orderService: OrderService,
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
  ) { 
    this.eventSubscription = this.router.events.subscribe(event => {
    if(event instanceof NavigationEnd ) {
      this.loadProduct();
      this.activatedRoute.data.subscribe(response => {
        this.currentProduct = response['productInfo'];        
      })
    }
  })
  }

  ngOnInit() {
    this.loadTypeAddition();
    this.loadProduct();
  }

  loadTypeAddition(): void {
    // this.additionProductService.getAllFirebase().subscribe(data => {
    //   this.additionProducts = data as ITypeAdditionResponse[];
    //   console.log(this.additionProducts,'addProd1');
    // })

    this.additionProductService.getAllBySauceFirebase(this.isTabSouce).subscribe(data => {
      this.additionProducts = data as ITypeAdditionResponse[];
    })
  }

  loadProduct(): void {
    const PRODUCT_ID = this.accountService.PRODUCT_ID;
    this.productService.getOneFirebase(PRODUCT_ID).subscribe(data => {
      this.currentProduct = data as IProductResponse;
      console.log(this.currentProduct);
      this.favoriteProducts = this.accountService.favoriteProducts;      
      if (this.favoriteProducts.findIndex(prod => prod.id === this.currentProduct.id) !==-1) this.isFavorite = true;
    console.log(this.isFavorite, 'isFav', this.favoriteProducts);
    })
    
  }

  additionClick(additionName: any): void {
    this.activeAddition = additionName;
    const elem = document.querySelectorAll('.addition');
    console.log(elem);
    for (let j = 0; j < elem.length; j++) { 
      if (this.additionProducts[j]?.name == additionName) {
        elem[j].classList.toggle('active');
        if (elem[j].classList.contains('active')) {
          this.additionProduct.push(this.additionProducts[j]);
          this.additionPrice += Number(this.additionProducts[j].price);
        } else {
          let ind = this.additionProduct.indexOf(this.additionProducts[j]);
          this.additionPrice = this.additionPrice - Number(this.additionProducts[j].price);
          if (ind >= 0) this.additionProduct.splice(ind, 1);
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
    let elem = document.querySelectorAll('.addition');
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
    document.querySelectorAll('.addition').forEach((el) =>
      el.classList.remove("active"));
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
    });

    const sameEntries = (x:any, y:any) => {
      const xEntries = Object.entries(x);
      if (xEntries.length !== Object.entries(y).length) return false;
      return xEntries.every(([k, v]) => y[k] === v);
    }
    const sameArrays = (arr1: Array<ITypeAdditionResponse>, arr2:Array<ITypeAdditionResponse>) =>
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
            console.log('2', index, 'index');
          }
        }
      })
      if (idAdd) {
        basket[index].count += product.count;
        console.log(basket[index].count, 'count');
      }
      else {
        console.log(product.count, 'product count');    
        basket.push(product);
          }
    }
    else {     
      basket.push(product);       
    }
    localStorage.setItem('basket', JSON.stringify(basket));
    console.log(basket, 'basket');
    product.count = 1;
    this.orderService.changeBasket.next(true);    
    this.additionDeleteAllClick();
    product = product;
    this.isAddition = false;
    
  }

  tabSouceClick(): void {
    this.isTabSouce = true;
    this.loadTypeAddition();
  }

  tabAdditionClick(): void {
    this.isTabSouce = false;
    this.loadTypeAddition();
  }

  favoriteCheck(productName: string): void {
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

  buttonFavoriteClick(productName: string): void {
    this.isFavorite = !this.isFavorite;
    this.favoriteCheck(productName);
  }


}
