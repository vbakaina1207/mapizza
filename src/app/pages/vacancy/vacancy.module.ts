import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/sahared.module';
import { VacancyComponent } from './vacancy.component';
import { VacancyRoutingModule } from './vacancy-routing.module';
import { ContactModule } from '../contact/contact.module';




@NgModule({
  declarations: [
    VacancyComponent,
  ],
  exports: [
    VacancyComponent,
    ContactModule,
  ],
  imports: [
    CommonModule,
    VacancyRoutingModule,
    SharedModule,
    ContactModule
  ]
})
export class VacancyModule { }
