import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/sahared.module';
import { VacancyComponent } from './vacancy.component';
import { VacancyRoutingModule } from './vacancy-routing.module';




@NgModule({
  declarations: [
    VacancyComponent
  ],
  imports: [
    CommonModule,
    VacancyRoutingModule,
    SharedModule
  ]
})
export class VacancyModule { }
