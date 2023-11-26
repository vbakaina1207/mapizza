import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IOrderResponse } from 'src/app/shared/interfaces/order/order.interface';
import { IProductResponse } from 'src/app/shared/interfaces/product/product.interface';
import { OrderService } from 'src/app/shared/services/order/order.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  public userOrders: Array<IOrderResponse> = [];
  public products: Array<IProductResponse> | any = [];
  private eventSubscription!: Subscription;
  // private uid!: string;
  public currentUser: any;

  constructor(
    private orderService: OrderService,
    private router: Router
  ) {
    this.eventSubscription = this.router.events.subscribe(event => {
      if(event instanceof NavigationEnd ) {
        this.loadUser();
        this.getOrders();

      }
    })
  }

  ngOnInit() {

  }

  getOrders(): void {
    this.orderService.getUserFirebase(this.currentUser?.uid).subscribe(data => {
      this.userOrders = data as IOrderResponse[];
      console.log(this.userOrders);
    })
  }

  loadUser(): void {
    if(localStorage.length > 0 && localStorage.getItem('currentUser')){
      this.currentUser = JSON.parse(localStorage.getItem('currentUser') as string);
    }
  }
}
