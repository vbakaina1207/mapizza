import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeliveryRoutingModule } from './delivery-routing.module';
import { SharedModule } from '../../shared/sahared.module';
import { DeliveryComponent } from './delivery.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { MapModule } from 'src/app/components/map/map.module';



@NgModule({
  declarations: [
    DeliveryComponent
  ],
  exports: [
    MapModule
  ],
  imports: [
    CommonModule,
    DeliveryRoutingModule,
    SharedModule,
    GoogleMapsModule,
    MapModule
  ]
})
export class DeliveryModule { }
