import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './map.component';
import { SharedModule } from 'src/app/shared/sahared.module';


@NgModule({
  exports: [
    MapComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [
    MapComponent
  ]
})
export class MapModule { }
