import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthDialogComponent } from 'src/app/components/auth-dialog/auth-dialog.component';
import { IProductResponse } from 'src/app/shared/interfaces/product/product.interface';
import { ITypeAdditionResponse } from 'src/app/shared/interfaces/type-addition/type-addition.interfaces';
import { OrderService } from 'src/app/shared/services/order/order.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {
public total = 0;
  public count = 0;
  public bonus = 0;
  public basket: Array<IProductResponse> = [];
  public currentUser!: any;
  public additionProduct: Array<ITypeAdditionResponse> = [];
  public isAddition: boolean = false;

  constructor(
    private orderService: OrderService,
    private dialog: MatDialog
    ){
  }

  ngOnInit() {
    this.loadUser();
    this.loadBasket();
    this.updateBasket();
  }

  loadBasket(): void {
    if(localStorage?.length > 0 && localStorage.getItem('basket')){
      this.basket = JSON.parse(localStorage.getItem('basket') as string);
    }
    this.getTotalPrice();
  }

  getTotalPrice(): void {
    this.total = this.basket
      ?.reduce((total: number, prod: IProductResponse) =>total + prod.count *(Number(prod.price) + Number(prod.addition_price)), 0);
    this.count = this.basket
      ?.reduce((totalCount: number, prod: IProductResponse) => totalCount + prod.count, 0); 
    this.bonus = this.basket
      ?.reduce((bonus: number, prod: IProductResponse) => bonus + prod.bonus*prod.count, 0); 
  }

  loadUser(): void {
    if(localStorage.length > 0 && localStorage.getItem('currentUser')){
      this.currentUser = JSON.parse(localStorage.getItem('currentUser') as string);
    } 
  }

  updateBasket(): void {
    this.orderService.changeBasket.subscribe(() => {
      this.loadBasket();
    })
  }

  productCount(product: IProductResponse, value: boolean): void {
    if(value){
      ++product.count;
    } else if(!value && product.count > 1){
      --product.count;
    }
    this.addToBasket(product, value);
  }

  addToBasket(product: IProductResponse, value: boolean): void {
    let basket: Array<IProductResponse> = [];
    if(localStorage?.length > 0 && localStorage.getItem('basket')){
      basket = JSON.parse(localStorage.getItem('basket') as string);
      if(basket.some(prod => prod.id === product.id)){
        const index = basket.findIndex(prod => prod.id === product.id);
        if (value) basket[index].count += 1;
        if (!value && basket[index].count > 1) basket[index].count -= 1;
      } else {
        basket.push(product);
      }
    } else {
      basket.push(product);
    }
    localStorage.setItem('basket', JSON.stringify(basket));
    product.count = 1;
    this.orderService.changeBasket.next(true);
  }

  removeFromBasket(product: IProductResponse): void{
    let basket: Array<IProductResponse> = [];
    if(localStorage?.length > 0 && localStorage.getItem('basket')){
      basket = JSON.parse(localStorage.getItem('basket') as string);
      if(basket.some(prod => prod.id === product.id)){
        const index = basket.findIndex(prod => prod.id === product.id);
        basket.splice(index,1);
      }
      localStorage.setItem('basket', JSON.stringify(basket));
      this.orderService.changeBasket.next(true);
    }
  }

  openLoginDialog(): void {
    this.dialog.open(AuthDialogComponent, {
      backdropClass: 'dialog-back',
      panelClass: 'auth-dialog',
      autoFocus: false
    }).afterClosed().subscribe(result => {
      console.log(result);
    })
  }


  additionDeleteClick(product: IProductResponse, additionName: any): void {
    for (let i = 0; i < product.selected_addition.length; i++) {
      if (product.selected_addition[i].name == additionName) {
        product.addition_price = product.addition_price - Number(product.selected_addition[i].price);
        product.selected_addition.splice(i, 1);
      }
    }
  }

}

