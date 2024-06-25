import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AccountService } from 'src/app/shared/services/account/account.service';
import { OrderService } from 'src/app/shared/services/order/order.service';

@Component({
  selector: 'app-cabinet',
  templateUrl: './cabinet.component.html',
  styleUrls: ['./cabinet.component.scss']
})
export class CabinetComponent implements OnInit, OnDestroy {

    public isOpen: boolean = false;
    public title: string = '' ;
    private routerSubscription!: Subscription;

  constructor(
    private router: Router,
    private accountService: AccountService,
    private orderService: OrderService
  ) { 
    
  }

  ngOnInit() {
    this.setTitleBasedOnUrl(this.router.url);    
    this.routerSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.setTitleBasedOnUrl(event.urlAfterRedirects);
      }
    });
    
  }


  ngOnDestroy() {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }


  private setTitleBasedOnUrl(url: string) {
    if (url.includes('/cabinet/favorite')) {
      this.title = 'Улюблені';
    } else if (url.includes('/cabinet/personal')) {
      this.title = 'Особисті дані';
    } else if (url.includes('/cabinet/history')) {
      this.title = 'Історія замовлень';
    } else if (url.includes('/cabinet/password')) {
      this.title = 'Зміна паролю';
    }
  }

  openMenu():void {
    this.isOpen = !this.isOpen;
    
  }

  closeMenu(event:any):void {
    this.title = event.target.value;
  }

}
