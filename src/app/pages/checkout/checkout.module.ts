import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/sahared.module';
import { CheckoutComponent } from './checkout.component';
import { CheckoutRoutingModule } from './checkout-routing.module';
import { DeliveryComponent } from '../delivery/delivery.component';
import { DeliveryModule } from '../delivery/delivery.module';
import { MapModule } from 'src/app/components/map/map.module';



@NgModule({
  declarations: [
    CheckoutComponent
  ],
  exports: [
    MapModule,
  ],
  imports: [
    CommonModule,
    CheckoutRoutingModule,
    SharedModule,
    MapModule
  ]
})
export class CheckoutModule { }
