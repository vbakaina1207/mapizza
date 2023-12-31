import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/shared/services/account/account.service';
import { OrderService } from 'src/app/shared/services/order/order.service';

@Component({
  selector: 'app-cabinet',
  templateUrl: './cabinet.component.html',
  styleUrls: ['./cabinet.component.scss']
})
export class CabinetComponent implements OnInit {

    public isOpen: boolean = false;
    public title: string = 'Особисті дані';

  constructor(
    private router: Router,
    private accountService: AccountService,
    private orderService: OrderService
  ) { }

  ngOnInit() {
  }

  openMenu():void {
    this.isOpen = !this.isOpen;
    
  }

  closeMenu(event:any):void {
    //this.isOpen = false;
    this.title = event.target.value;
  }

}
